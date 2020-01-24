import React, {PureComponent} from 'react'
import ProfileDetails from './ProfileDetails'
import {ConnectHoc, menus, TryCatchHandler} from '@frontend-appointment/commons'
import {
    clearSuccessErrorMessagesFromStore,
    deleteProfile,
    editProfile,
    fetchProfileList,
    fetchSubDepartmentsByDepartmentId,
    previewProfile
} from '@frontend-appointment/thunk-middleware'
import ProfileSetupSearchFilter from './ProfileSetupSearchFilter'
import UpdateProfileModal from "./comp/UpdateProfileModal";
import {CAlert} from "@frontend-appointment/ui-elements";
import {profileSetupAPIConstants} from '../ProfileSetupAPIConstants';
import {UserMenuUtils} from "@frontend-appointment/helpers";

const {
    FETCH_SUB_DEPARTMENT_BY_DEPARTMENT_ID,
    SEARCH_PROFILE,
    DELETE_PROFILE,
    FETCH_PROFILE_DETAILS,
    EDIT_PROFILE
} = profileSetupAPIConstants;


class ProfileManage extends PureComponent {
    state = {
        showProfileModal: false,
        showEditModal: false,
        deleteModalShow: false,
        subDepartmentsByDepartmentId: [],
        searchParameters: {
            profileName: '',
            status: {value: 'A', label: 'All'},
            selectedDepartment: null,
            selectedSubDepartment: null
        },
        queryParams: {
            page: 0,
            size: 10
        },
        deleteRequestDTO: {
            id: 0,
            remarks: '',
            status: 'D'
        },
        totalRecords: 0,
        profileUpdateData: {
            id: '',
            profileName: '',
            profileDescription: '',
            selectedDepartment: null,
            selectedSubDepartment: null,
            selectedMenus: [],
            status: 'Y',
            subDepartmentsByDepartmentId: [],
            userMenusBySubDepartment: [],
            defaultSelectedMenu: [],
            selectedUserMenusForModal: [],
            userMenuAvailabilityMessage: '',
            formValid: true,
            profileNameValid: true,
            profileDescriptionValid: true,
            errorMessageForProfileName: "Profile Name should not contain special characters",
            errorMessageForProfileDescription: 'Profile Description should contain 200 characters only.',
        },
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        showAlert: false
    };

    closeAlert = () => {
        this.props.clearSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
        });
    };

    setShowModal = () => {
        this.setState({
            showProfileModal: false,
            deleteModalShow: false,
            showEditModal: false
        })
    };

    resetProfileUpdateDataFromState = () => {
        this.setState({
            profileUpdateData: {
                ...this.state.profileUpdateData,
                id: '',
                profileName: '',
                profileDescription: '',
                selectedDepartment: null,
                selectedSubDepartment: null,
                selectedMenus: [],
                status: 'Y',
                subDepartmentsByDepartmentId: [],
                userMenusBySubDepartment: [],
                defaultSelectedMenu: [],
                selectedUserMenusForModal: [],
                userMenuAvailabilityMessage: '',
                formValid: true,
                profileNameValid: true,
                profileDescriptionValid: true,
            },
            showEditModal: false
        })
    };

    apiCall = async (page) => {
        const {profileName, status, selectedSubDepartment} = this.state.searchParameters;
        let searchData = {
            name: profileName,
            status: status && status.value !== 'A'
                ? status.value
                : '',
            subDepartmentId: selectedSubDepartment
                ? selectedSubDepartment.value
                : ''
        };

        let updatedPage =
            this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);
        await this.props.fetchProfileList(
            SEARCH_PROFILE,
            {
                page: updatedPage,
                size: this.state.queryParams.size
            },
            searchData
        );

        await this.setState({
            totalRecords: this.props.ProfileListReducer.profileList.length
                ? this.props.ProfileListReducer.profileList[0].totalItems
                : 0,
            queryParams: {
                ...this.state.queryParams,
                page: updatedPage
            }
        })
    };

    componentDidMount() {
        this.apiCall()
    }

    appendSNToTable = profileList =>
        profileList.map((prof, index) => ({...prof, sN: index + 1}));

    onSubmitDeleteHandler = async () => {
        try {
            await this.props.deleteProfile(
                DELETE_PROFILE,
                this.state.deleteRequestDTO
            );
            await this.setState({
                deleteModalShow: false,
                deleteRequestDTO: {id: 0, remarks: '', status: 'D'}
            });
            await this.apiCall();

        } catch (e) {
            this.setState({
                deleteModalShow: true,
            });
        }
    };

    onDeleteHandler = async id => {
        this.props.clearSuccessErrorMessagesFromStore();
        let deleteRequestDTO = {...this.state.deleteRequestDTO};
        deleteRequestDTO['id'] = id;
        await this.setState({
            deleteRequestDTO: deleteRequestDTO,
            deleteModalShow: true
        })
    };

    setDataForProfileUpdate = async (profileData, id) => {
        let menusSelected = [], menusSelectedWithFlag = [];
        const {profileMenuResponseDTOS, profileResponseDTO} = profileData;
        profileMenuResponseDTOS &&
        Object.keys(profileMenuResponseDTOS).map(key => {
            menusSelected = menusSelected.concat(profileMenuResponseDTOS[key]);
        });

        menusSelected.forEach(menuSelected => {
            menusSelectedWithFlag.push({...menuSelected, isNew: false});
        });

        let menusForSubDept = [...menus[profileResponseDTO.subDepartmentCode]];
        let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson([...menusForSubDept]);

        if (profileResponseDTO) {
            let subDeptList = await this.fetchSubDepartments(profileResponseDTO.departmentId);
            this.setState({
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    id: id,
                    profileName: profileResponseDTO.name,
                    profileDescription: profileResponseDTO.description,
                    selectedDepartment: {
                        value: profileResponseDTO.departmentId,
                        label: profileResponseDTO.departmentName
                    },
                    selectedSubDepartment: {
                        value: profileResponseDTO.subDepartmentId,
                        label: profileResponseDTO.subDepartmentName
                    },
                    status: profileResponseDTO.status,
                    selectedMenus: [...menusSelectedWithFlag],
                    subDepartmentsByDepartmentId: [...subDeptList],
                    userMenusBySubDepartment: [...alphabeticallySortedMenus],
                    defaultSelectedMenu: alphabeticallySortedMenus[0]
                },
                showEditModal: true
            })
        }
    };

    onEditHandler = async id => {
        try {
            await this.previewApiCall(id);
            this.setDataForProfileUpdate(this.props.ProfilePreviewReducer.profilePreviewData, id);
        } catch (e) {
            //console.log(e)
        }
    };

    editApiCall = async () => {
        const {id, selectedMenus, profileName, profileDescription, selectedSubDepartment, status} = this.state.profileUpdateData;

        let editRequestDTO = {
            profileDTO: {
                description: profileDescription,
                id: id,
                name: profileName,
                remarks: "",
                status: status,
                subDepartmentId: selectedSubDepartment && selectedSubDepartment.value
            },
            profileMenuRequestDTO: [...selectedMenus]
        };
        try {
            await this.props.editProfile(EDIT_PROFILE, editRequestDTO);
            this.resetProfileUpdateDataFromState();

            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: this.props.ProfileEditReducer.profileSuccessMessage
                }
            });
            await this.apiCall();
        } catch (e) {
            //     this.setState({
            //         showAlert: true,
            //         alertMessageInfo: {
            //             variant: "danger",
            //             message: e.errorMessage
            //         }
            //     })
        }
    };

    handleOnChange = async (event, fieldValid) => {
        event && (await this.bindValuesToState(event, fieldValid))
    };

    fetchSubDepartments = async departmentId => {
        return await TryCatchHandler.genericTryCatch(
            this.props.fetchSubDepartmentsByDepartmentId(
                FETCH_SUB_DEPARTMENT_BY_DEPARTMENT_ID,
                departmentId
            )
        );
    };

    fetchSubDepartmentAndResetSubDepartment = async value => {
        let subDepartmentByDept = this.fetchSubDepartments(value);
        this.setState({
            selectedSubDepartment: null,
            subDepartmentsByDepartmentId: [...subDepartmentByDept instanceof Promise ? await subDepartmentByDept : subDepartmentByDept],
            profileUpdateData: {
                ...this.state.profileUpdateData,
                selectedSubDepartment: null,
                subDepartmentsByDepartmentId: [],
                userMenusBySubDepartment: [],
                defaultSelectedMenu: [],
                userMenuAvailabilityMessage: ''
            }
        });
        // await this.setState({subDepartmentsByDepartmentId: [...this.fetchSubDepartments(value)]});
    };

    fetchSubDepartmentForUpdate = async value => {
        this.setState({
            profileUpdateData: {
                ...this.state.profileUpdateData,
                selectedSubDepartment: null,
                subDepartmentsByDepartmentId: [],
                userMenusBySubDepartment: [],
                defaultSelectedMenu: [],
                userMenuAvailabilityMessage: ''
            }
        });

        let updatedSubDept = await this.fetchSubDepartments(value);
        let updateInSelectedMenus = [...this.state.profileUpdateData.selectedMenus];
        const {profileResponseDTO} = this.props.ProfilePreviewReducer.profilePreviewData;

        if (profileResponseDTO.departmentId !== value) {
            let dataSelected = updateInSelectedMenus.map(data => {
                data.status = 'N';
                return data;
            });
            updateInSelectedMenus = [...dataSelected];
        }

        if (updatedSubDept)
            await this.setState({
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    subDepartmentsByDepartmentId: [...updatedSubDept],
                    selectedMenus: [...updateInSelectedMenus]
                }
            });
        console.log("Selected", this.state.profileUpdateData.selectedMenus);
    };

    filterMenuBySubDepartment = subDepartmentId => {
        //IN CASE OF UPDATE SUB-DEPARTMENT LIST IS ALREADY FETCHED
        let selectedSubDept = this.state.profileUpdateData.subDepartmentsByDepartmentId.filter(subDepartment =>
            subDepartment.value === subDepartmentId);
        const {profileResponseDTO} = this.props.ProfilePreviewReducer.profilePreviewData;
        let updatedSelectedMenus = (profileResponseDTO.subDepartmentId === subDepartmentId) ?
            [...this.changeStatusOfSelectedMenusOnDepartmentSubDepartmentChange(true)]
            :
            [...this.changeStatusOfSelectedMenusOnDepartmentSubDepartmentChange(false)];

        let menusForSubDept = menus[selectedSubDept[0].code];
        let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson([...menusForSubDept]);
        menusForSubDept ?
            this.setState({
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    userMenusBySubDepartment: [...alphabeticallySortedMenus],
                    defaultSelectedMenu: alphabeticallySortedMenus[0],
                    selectedMenus: [...updatedSelectedMenus]
                }
            }) :
            this.setState({
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    userMenusBySubDepartment: [],
                    defaultSelectedMenu: [],
                    userMenuAvailabilityMessage: 'No user menus available.'
                }
            });
    };

    deleteRemarksHandler = event => {
        const {name, value} = event.target
        let deleteRequest = {...this.state.deleteRequestDTO}
        deleteRequest[name] = value
        this.setState({
            deleteRequestDTO: deleteRequest
        })
    };

    async bindValuesToState(event) {
        let fieldName = event.target.name;
        let value = event.target.value;
        let label = event.target.label;
        await this.setStateValues(fieldName, value, label);
        switch (fieldName) {
            case 'selectedDepartment':
                value
                    ? this.fetchSubDepartmentAndResetSubDepartment(value)
                    : this.setState({
                        selectedSubDepartment: null,
                        subDepartmentsByDepartmentId: []
                    });
                break;
            case 'selectedSubDepartment':
                !value &&
                this.setState({
                    selectedSubDepartment: null,
                    userMenusBySubDepartment: []
                });
                break;
            default:
                break
        }
    }

    getProfileDataForUserMenus = userMenusProfile => {
        let filteredProfiles = {};
        let selectedMenus = [],
            selectedUserMenusForModal = [];

        const {profileResponseDTO, profileMenuResponseDTOS} = userMenusProfile;

        userMenusProfile.hasOwnProperty('profileMenuResponseDTOS') &&
        Object.keys(profileMenuResponseDTOS).map((parentMenuId, idx) => {
            // For each parent menu's selected menus
            const userMenusBySubDepartment =
                menus[profileResponseDTO.subDepartmentCode];
            const selectedUserMenus = profileMenuResponseDTOS[parentMenuId];
            let selectedParentMenus = new Set();
            let selectedChildMenus = new Set();

            selectedUserMenus &&
            selectedUserMenus.map((selectedMenu, indx) => {
                //filter out the selected unique parent menu and child menus
                selectedMenus.push({...selectedMenu});
                let parent = userMenusBySubDepartment && userMenusBySubDepartment.find(
                    userMenu => Number(userMenu.id) === Number(selectedMenu.parentId)
                );
                parent && selectedParentMenus.add(parent);
                let child = parent && parent.childMenus.length && parent.childMenus.find(
                    childMenu =>
                        Number(childMenu.id) === Number(selectedMenu.userMenuId)
                );
                child && selectedChildMenus.add(child)
            });
            selectedUserMenusForModal = selectedUserMenusForModal.concat(Array.from(selectedParentMenus).map(
                // add filtered out child to their respective filtered out parent menu.
                parent => {
                    let data = {
                        id: parent.id,
                        name: parent.name,
                        icon: parent.icon,
                        parentId: parent.parentId,
                        roles: [...parent.roles],
                        childMenus: []
                    };
                    let childrenOfParent = Array.from(selectedChildMenus).filter(
                        child => {
                            return (
                                child.parentId === parent.id && {
                                    id: child.id,
                                    name: child.name,
                                    icon: child.icon,
                                    parentId: child.parentId,
                                    roles: child.roles,
                                    childMenus: []
                                }
                            )
                        }
                    );
                    data.childMenus = [...childrenOfParent];
                    return data
                }
            ));
            filteredProfiles = {
                selectedMenus,
                selectedUserMenusForModal
            }
        });
        if (profileResponseDTO)
            filteredProfiles = {
                ...filteredProfiles,
                profileName: profileResponseDTO.name,
                profileDescription: profileResponseDTO.description,
                departmentValue: {
                    value: profileResponseDTO.departmentId,
                    label: profileResponseDTO.departmentName
                },
                subDepartmentValue: {
                    value: profileResponseDTO.subDepartmentId,
                    label: profileResponseDTO.subDepartmentName
                },
                status: profileResponseDTO.status
            };
        return filteredProfiles
    };

    previewApiCall = async id => {
        await this.props.previewProfile(FETCH_PROFILE_DETAILS, id)
    };

    onPreviewHandler = async id => {
        try {
            await this.previewApiCall(id);
            this.setState({
                showProfileModal: true
            })
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: "Error fetching profile Details."
                    // e.errorMessage ? e.errorMessage: e.message
                }
            })
            //console.log(e)
        }
    };

    setStateValues = (key, value, label) => {
        label ? (value ? this.setState({
                    searchParameters: {
                        ...this.state.searchParameters,
                        [key]: {value, label}
                    }
                }) : this.setState({
                    searchParameters: {...this.state.searchParameters, [key]: null}
                })
            )
            : this.setState({
                searchParameters: {...this.state.searchParameters, [key]: value}
            });
        console.log(this.state.searchParameters);
    };

    handleSearchFormReset = async () => {
        await this.setState({
            searchParameters: {
                ...this.state.searchParameters,
                profileName: '',
                status: {value: 'A', label: 'All'},
                selectedDepartment: null,
                selectedSubDepartment: null
            },
            subDepartmentsByDepartmentId: []
        });
        this.apiCall()
    };

    handlePageChange = async newPage => {
        await this.setState({
            queryParams: {
                ...this.state.queryParams,
                page: newPage
            }
        });
        this.apiCall();
    };

    handleEnter = (event) => {
        let increment = 1;
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            increment = event.currentTarget.children.length ? 2 : 1;
            form.elements[index + increment].focus();
            if (increment !== 2)
                event.preventDefault();
        }
    };

    checkFormValidity = () => {
        const {
            profileNameValid,
            profileDescriptionValid,
            profileName,
            profileDescription, selectedDepartment, selectedSubDepartment, selectedMenus
        } = this.state.profileUpdateData;
        let formValidity = profileNameValid
            && profileDescriptionValid
            && profileName
            && profileDescription
            && selectedDepartment !== null
            && selectedSubDepartment !== null
            && selectedMenus.length !== 0;

        this.setState({
            profileUpdateData: {
                ...this.state.profileUpdateData,
                formValid: formValidity
            }
        })
    };

    setUpdatedValuesInState = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    [key]: {value, label}
                }
            })
            : this.setState({
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    [key]: null
                }
            })
            : this.setState({
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    [key]: value, [key + "Valid"]: fieldValid
                }
            });

    changeStatusOfSelectedMenusOnDepartmentSubDepartmentChange = status => {
        let updateInSelectedMenus = this.state.profileUpdateData.selectedMenus.filter(menu => !menu.isNew);
        return updateInSelectedMenus.map(data => {
            data.status = status === true ? 'Y' : 'N';
            return data;
        });
    };

    bindUpdatedFormValuesToState = async (event, fieldValid) => {
        let fieldName = event.target.name;
        let value = event.target.value;
        let label = event.target.label;
        await this.setUpdatedValuesInState(fieldName, value, label, fieldValid);
        switch (fieldName) {
            case 'selectedDepartment':
                if (value) {
                    await this.fetchSubDepartmentForUpdate(value);
                    this.setState({
                        profileUpdateData: {
                            ...this.state.profileUpdateData,
                        }
                    })
                } else {
                    this.setState({
                        profileUpdateData: {
                            ...this.state.profileUpdateData,
                            selectedSubDepartment: null,
                            subDepartmentsByDepartmentId: [],
                            userMenusBySubDepartment: [],
                            defaultSelectedMenu: [],
                            selectedMenus:
                                [...this.changeStatusOfSelectedMenusOnDepartmentSubDepartmentChange(Boolean(value))]
                        }
                    });
                }
                break;
            case 'selectedSubDepartment':
                value ? this.filterMenuBySubDepartment(value) : this.setState({
                    profileUpdateData: {
                        ...this.state.profileUpdateData,
                        selectedSubDepartment: null,
                        userMenusBySubDepartment: [],
                        defaultSelectedMenu: [],
                        userMenuAvailabilityMessage: '',
                        selectedMenus:
                            [...this.changeStatusOfSelectedMenusOnDepartmentSubDepartmentChange(Boolean(value))]
                    }
                });
                break;
            default:
                break;
        }

        console.log(this.state.profileUpdateData.selectedMenus);
        this.checkFormValidity();
    };

    handleUpdateFormChange = async (event, fieldValid) => {
        event && await this.bindUpdatedFormValuesToState(event, fieldValid);
    };

    addAllMenusAndRoles = async (userMenus, checkedAllUserMenus) => {
        let currentSelectedMenus = [...this.state.profileUpdateData.selectedMenus],
            currentSelectedMenusWithStatusUpdated = [];

        if (checkedAllUserMenus) {
            if (currentSelectedMenus.length > 0) {
                // FOR ALL ALREADY EXISTING MENUS, CHANGE STATUS TO 'Y'
                currentSelectedMenusWithStatusUpdated = currentSelectedMenus.map(currentSelectedMenu => {
                        currentSelectedMenu.status = 'Y';
                        return currentSelectedMenu;
                    }
                );
            }
            // FOR REMAINING CHECK IF THE ROLE AND MENU ALREADY EXISTS OR NOT AND THEN ADD NEW OBJECT TO ARRAY
            for (let menu of userMenus) {
                for (let child of menu.childMenus) {
                    child.roles.forEach(role => {
                        let alreadyExists = Boolean(currentSelectedMenusWithStatusUpdated.find(menu => Number(menu.roleId) === Number(role)
                            && Number(menu.userMenuId) === Number(child.id)));
                        !alreadyExists && currentSelectedMenusWithStatusUpdated.push({
                            parentId: menu.id,
                            userMenuId: child.id,
                            roleId: role,
                            status: 'Y',
                            profileMenuId: null,
                            isNew: true
                        })
                    })
                }
            }
            currentSelectedMenus = [...currentSelectedMenusWithStatusUpdated];
        } else {
            let menuToUpdate = [...currentSelectedMenus];
            let originalMenus = menuToUpdate.filter(menu => !menu.isNew);
            if (originalMenus.length > 0) {
                let updatedMenus = originalMenus.map(originalMenu => {
                    originalMenu.status = 'N';
                    return originalMenu
                });
                currentSelectedMenus = [...updatedMenus];
            }
        }
        // let userMenusSelected = this.setValuesForModalDisplay(this.state.userMenusBySubDepartment, currentSelectedMenus);
        await this.setState(
            {
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    selectedMenus: currentSelectedMenus,
                }
                // selectedUserMenusForModal: userMenusSelected
            });
        this.checkFormValidity();
    };

    handleRolesCheck = async (roles, childMenu) => {
        let currentSelectedMenus = [...this.state.profileUpdateData.selectedMenus];
        for (let role of roles) {
            if (role.isChecked) {
                // FIRST CHECK IF THE ROLE IS SELECTED ORIGINALLY, IF YES UPDATE THE STATUS ELSE ADD NEW OBJECT
                let roleIndex = currentSelectedMenus.findIndex(menu => menu.roleId === role.id
                    && Number(menu.userMenuId) === Number(childMenu.id));
                roleIndex >= 0 ? currentSelectedMenus[roleIndex].status = 'Y' : currentSelectedMenus.push({
                    parentId: childMenu.parentId === null ? childMenu.id : childMenu.parentId,
                    userMenuId: childMenu.id,
                    roleId: role.id,
                    status: 'Y',
                    isNew: true,
                    profileMenuId: null
                })
            } else {
                // CHECK IF THE ROLE IS ALREADY SELECTED, IF YES CHECK IF IT IS NEWLY ADDED OR ORIGINAL ONE
                // IF NEWLY ADDED SPLICE IT FROM SELECTED ARRAY, ELSE CHANGE ITS STATUS TO 'N'
                let indexOfRole = currentSelectedMenus.findIndex(menu => Number(menu.roleId) === Number(role.id)
                    && Number(menu.userMenuId) === Number(childMenu.id));
                indexOfRole >= 0 &&
                currentSelectedMenus[indexOfRole].isNew ? currentSelectedMenus.splice(indexOfRole, 1) :
                    currentSelectedMenus[indexOfRole].status = "N";
            }
        }
        // let userMenusSelected = this.setValuesForModalDisplay(this.state.userMenusBySubDepartment, currentSelectedMenus);
        await this.setState({
            profileUpdateData: {
                ...this.state.profileUpdateData,
                selectedMenus: currentSelectedMenus,
                // selectedUserMenusForModal: userMenusSelected
            }
        });
        this.checkFormValidity();
    };

    render() {
        const {
            isSearchLoading,
            profileList,
            searchErrorMessage
        } = this.props.ProfileListReducer;

        const {
            profilePreviewData,
            profilePreviewErrorMessage,
            // profilePreviewOpen
        } = this.props.ProfilePreviewReducer;

        const {
            deleteErrorMessage
        } = this.props.ProfileDeleteReducer;

        const {departments} = this.props.ProfileSetupReducer;

        const {profileErrorMessage} = this.props.ProfileEditReducer;

        const {
            selectedDepartment,
            profileDescription,
            profileName,
            status,
            subDepartmentsByDepartmentId,
            selectedSubDepartment,
            errorMessageForProfileName,
            errorMessageForProfileDescription,
            userMenusBySubDepartment,
            selectedMenus,
            newSelectedMenus,
            defaultSelectedMenu,
            userMenuAvailabilityMessage
        } = this.state.profileUpdateData;

        // const Tabs = TabsHOC(CNavTabs, this.props.userMenus, this.props.path, 6);

        return (
            <>
                {/* <Tabs/> */}
                <div className="">
                    <ProfileSetupSearchFilter
                        searchParameters={this.state.searchParameters}
                        departmentList={this.props.ProfileSetupReducer.departments}
                        subDepartmentList={this.state.subDepartmentsByDepartmentId}
                        onInputChange={this.handleOnChange}
                        onSearchClick={() => this.apiCall(1)}
                        resetSearchForm={this.handleSearchFormReset}
                    />
                </div>
                <div className=" mb-2">
                    <ProfileDetails
                        showProfileModal={this.state.showProfileModal}
                        isSearchLoading={isSearchLoading}
                        searchData={this.appendSNToTable(profileList)}
                        searchErrorMessage={searchErrorMessage}
                        setShowModal={this.setShowModal}
                        onDeleteHandler={this.onDeleteHandler}
                        onEditHandler={this.onEditHandler}
                        onPreviewHandler={this.onPreviewHandler}
                        profileData={this.getProfileDataForUserMenus(profilePreviewData)}
                        profilePreviewErrorMessage={profilePreviewErrorMessage}
                        totalItems={this.state.totalRecords}
                        maxSize={this.state.queryParams.size}
                        currentPage={this.state.queryParams.page}
                        handlePageChange={this.handlePageChange}
                        deleteModalShow={this.state.deleteModalShow}
                        onSubmitDelete={this.onSubmitDeleteHandler}
                        remarksHandler={this.deleteRemarksHandler}
                        remarks={this.state.deleteRequestDTO.remarks}
                        deleteErrorMsg={deleteErrorMessage}
                    />
                </div>
                {this.state.showEditModal && (
                    <UpdateProfileModal
                        showEditModal={this.state.showEditModal}
                        setShowEditModal={this.setShowModal}
                        profileInfoObj={{
                            departmentValue: selectedDepartment,
                            profileDescription: profileDescription,
                            profileName: profileName,
                            status: status,
                            subDepartmentList: subDepartmentsByDepartmentId,
                            subDepartmentValue: selectedSubDepartment,
                        }}
                        departments={departments}
                        onEnterKeyPress={this.handleEnter}
                        onInputChange={this.handleUpdateFormChange}
                        editApiCall={this.editApiCall}
                        formValid={this.state.profileUpdateData.formValid}
                        errorMessageForProfileName={errorMessageForProfileName}
                        errorMessageForProfileDescription={errorMessageForProfileDescription}
                        errorMessage={profileErrorMessage}
                        profileMenuAssignmentProps={
                            {
                                userMenus: userMenusBySubDepartment,
                                selectedMenus: selectedMenus,
                                defaultSelectedMenu: defaultSelectedMenu,
                                onCheckAllUserMenus: this.addAllMenusAndRoles,
                                onTabAndRolesChange: this.handleRolesCheck,
                                profileData: {
                                    profileName: profileName,
                                    profileDescription: profileDescription,
                                    departmentValue: selectedDepartment,
                                    subDepartmentValue: selectedSubDepartment,
                                    status: status,
                                    selectedMenus: selectedMenus,
                                    newSelectedMenus: newSelectedMenus,
                                    userMenusBySubDepartment: userMenusBySubDepartment,
                                    userMenuAvailabilityMessage: userMenuAvailabilityMessage
                                }
                            }
                        }
                    />
                )}
                <CAlert id="profile-add"
                        variant={this.state.alertMessageInfo.variant}
                        show={this.state.showAlert}
                        onClose={this.closeAlert}
                        alertType={this.state.alertMessageInfo.variant === "success" ?
                            <><i className="fa fa-check-circle" aria-hidden="true"> </i></>
                            : <><i className="fa fa-exclamation-triangle" aria-hidden="true"> </i>
                            </>}
                        message={this.state.alertMessageInfo.message}
                />
                {/* <Alert variant="success">
                    <Alert.Heading className=""><i class="fa fa-check-circle" aria-hidden="true"></i>
                        &nbsp; &nbsp;Success</Alert.Heading>
                </Alert> */}
            </>
        )
    }
}

export default ConnectHoc(
    ProfileManage,
    [
        'ProfileListReducer',
        'ProfilePreviewReducer',
        'ProfileSetupReducer',
        'ProfileDeleteReducer',
        'ProfileEditReducer'
    ],
    {
        fetchProfileList,
        deleteProfile,
        editProfile,
        previewProfile,
        fetchSubDepartmentsByDepartmentId,
        clearSuccessErrorMessagesFromStore
    }
)
