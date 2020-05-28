import React, {PureComponent} from 'react'
import ProfileDetails from './ProfileDetails'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    clearSuccessErrorMessagesFromStore,
    deleteProfile,
    UnitSetupMiddleware,
    editProfile,
    fetchAllProfileListForSearchDropdown,
    fetchProfileList,
    HospitalSetupMiddleware,
    previewProfile,
    logoutUser,
    savePinOrUnpinUserMenu
} from '@frontend-appointment/thunk-middleware'
import ProfileSetupSearchFilter from './ProfileSetupSearchFilter'
import UpdateProfileModal from "./comp/UpdateProfileModal";
import {CAlert} from "@frontend-appointment/ui-elements";
import {
    ProfileSetupUtils,
  //  adminUserMenusJson,
    clientUserMenusJson,
    UserMenuUtils,
    TryCatchHandler,
    EnvironmentVariableGetter, LocalStorageSecurity
} from "@frontend-appointment/helpers";
import {AdminModuleAPIConstants, CommonAPIConstants} from "@frontend-appointment/web-resource-key-constants";

const {
    SEARCH_PROFILE,
    DELETE_PROFILE,
    FETCH_PROFILE_DETAILS,
    EDIT_PROFILE,
    FETCH_ALL_PROFILE_LIST_FOR_SEARCH_DROPDOWN
} = AdminModuleAPIConstants.profileSetupAPIConstants;
const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;
const {FETCH_UNIT_FOR_DROPDOWN, FETCH_UNITS_FOR_DROPDOWN_BY_HOSPITAL} =
    AdminModuleAPIConstants.departmentSetupAPIConstants;

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchActiveDepartmentsForDropdown, fetchActiveDepartmentsByHospitalId} = UnitSetupMiddleware;
const {ADMIN_FEATURE} = CommonAPIConstants

class ProfileManage extends PureComponent {
    state = {
        showProfileModal: false,
        showEditModal: false,
        deleteModalShow: false,
        subDepartmentsByDepartmentId: [],
        searchParameters: {
            profile: null,
            status: {value: 'A', label: 'All'},
            department: null,
            hospital: null
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
            selectedHospital: null,
            selectedMenus: [],
            status: 'Y',
            departmentListByHospital: [],
            userMenus: [],
            defaultSelectedMenu: [],
            selectedUserMenusForModal: [],
            userMenuAvailabilityMessage: '',
            formValid: true,
            profileNameValid: true,
            profileDescriptionValid: true,
            remarks: '',
            errorMessageForProfileName: "Profile Name should not contain special characters",
            errorMessageForProfileDescription: 'Profile Description should contain 200 characters only.',
        },
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        showAlert: false,
        previewData: {}
    };
    timer = '';

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
                selectedHospital: null,
                selectedMenus: [],
                status: 'Y',
                departmentListByHospital: [],
                userMenus: [],
                defaultSelectedMenu: [],
                selectedUserMenusForModal: [],
                userMenuAvailabilityMessage: '',
                formValid: true,
                profileNameValid: true,
                profileDescriptionValid: true,
                remarks: ''
            },
            showEditModal: false
        })
    };

    savePinOrUnpinUserMenu = async () => {
        await this.props.savePinOrUnpinUserMenu(ADMIN_FEATURE, {
            isSideBarCollapse: !(
                Boolean(LocalStorageSecurity.localStorageDecoder('isOpen')) || false
            )
        })
    }

    apiCall = async (page) => {
        const {profile, status, department, hospital} = this.state.searchParameters;
        let searchData = {
            profileId: profile ? profile.value : '',
            status: status && status.value !== 'A'
                ? status.value
                : '',
            departmentId: department
                ? department.value
                : '',
            hospitalId: hospital ? hospital.value : '',
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

    initialApiCall = async () => {
        this.apiCall();
        this.fetchHospitals();
        this.fetchDepartments();
        this.fetchProfileListForDropdown();
    };

    componentDidMount() {
        this.initialApiCall();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
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
                deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: this.props.ProfileDeleteReducer.deleteSuccessMessage ?
                        this.props.ProfileDeleteReducer.deleteSuccessMessage : "Profile deleted successfully."
                }
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
            return key;
        });

        menusSelected.forEach(menuSelected => {
            menusSelectedWithFlag.push({...menuSelected, isNew: false, isUpdated: false});
        });

        let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson(clientUserMenusJson[EnvironmentVariableGetter.CLIENT_MODULE_CODE]);

        if (profileResponseDTO) {
            await this.fetchDepartmentsByHospitalId(profileResponseDTO.hospitalId);
            this.setState({
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    id: id,
                    profileName: profileResponseDTO.name,
                    profileDescription: profileResponseDTO.description,
                    selectedHospital: {
                        value: profileResponseDTO.hospitalId,
                        label: profileResponseDTO.hospitalName
                    },
                    selectedDepartment: {
                        value: profileResponseDTO.departmentId,
                        label: profileResponseDTO.departmentName
                    },
                    status: profileResponseDTO.status,
                    selectedMenus: [...menusSelectedWithFlag],
                    departmentListByHospital: [...this.props.UnitSetupReducer.departmentsByHospital],
                    userMenus: [...alphabeticallySortedMenus],
                    defaultSelectedMenu: alphabeticallySortedMenus[0],
                    remarks: ''
                },
                showEditModal: true
            })
        }
        this.checkFormValidity();
    };

    onEditHandler = async id => {
        try {
            await this.previewApiCall(id);
            this.setDataForProfileUpdate(this.props.ProfilePreviewReducer.profilePreviewData, id);
        } catch (e) {
            //console.log(e)
        }
    };


    logoutUser = async () => {
        await this.savePinOrUnpinUserMenu()
        try {
            let logoutResponse = await this.props.logoutUser('/cogent/logout');
            if (logoutResponse) {
                this.props.history.push('/');
            }
        } catch (e) {
        }
    };

    automaticLogoutUser = () => {
        this.timer = setTimeout(() => this.logoutUser(), 10000)
    };

    checkIfEditedOwnProfileAndShowMessage = editedProfileId => {
        let variantType = '', message = '';
        let loggedInAdminInfo = LocalStorageSecurity.localStorageDecoder("adminInfo");
        if (editedProfileId === loggedInAdminInfo.profileId) {
            variantType = "warning";
            message = "You seem to have edited your own profile. Please Logout and Login to see the changes or " +
                "you'll be automatically logged out in 10s";
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: variantType,
                    message: message
                }
            });
            this.automaticLogoutUser();
        } else {
            variantType = "success";
            message = this.props.ProfileEditReducer.profileSuccessMessage;
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: variantType,
                    message: message
                }
            });
        }
    };

    editApiCall = async () => {
        const {id, selectedMenus, profileName, profileDescription, selectedHospital, selectedDepartment, remarks, status} = this.state.profileUpdateData;

        let menusToBeUpdated = selectedMenus.filter(menu => menu.isUpdated || menu.isNew);
        let editRequestDTO = {
            profileDTO: {
                description: profileDescription,
                id: id,
                name: profileName,
                remarks: remarks,
                status: status,
                departmentId: selectedDepartment && selectedDepartment.value,
                hospitalId: selectedHospital && selectedHospital.value
            },
            profileMenuRequestDTO: menusToBeUpdated.length ? [...menusToBeUpdated] : [...selectedMenus]
        };
        try {
            await this.props.editProfile(EDIT_PROFILE, editRequestDTO);
            this.resetProfileUpdateDataFromState();
            this.checkIfEditedOwnProfileAndShowMessage(editRequestDTO.profileDTO.id);
            // this.setState({
            //     showAlert: true,
            //     alertMessageInfo: {
            //         variant: "success",
            //         message: this.props.ProfileEditReducer.profileSuccessMessage
            //     }
            // });
            await this.apiCall();
        } catch (e) {

        }
    };

    handleOnChange = async (event, fieldValid) => {
        event && (await this.bindValuesToState(event, fieldValid))
    };

    fetchHospitals = async () => {
        await TryCatchHandler.genericTryCatch(this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN))
    };

    fetchDepartments = async () => {
        await TryCatchHandler.genericTryCatch(this.props.fetchActiveDepartmentsForDropdown(FETCH_UNIT_FOR_DROPDOWN));
    };

    fetchDepartmentsByHospitalId = async value => {
        return value && await this.props.fetchActiveDepartmentsByHospitalId(FETCH_UNITS_FOR_DROPDOWN_BY_HOSPITAL, value);
    };

    fetchProfileListForDropdown = async () => {
        await this.props.fetchAllProfileListForSearchDropdown(FETCH_ALL_PROFILE_LIST_FOR_SEARCH_DROPDOWN);
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
    }

    getProfileDataForUserMenus = userMenusProfile => {
        return ProfileSetupUtils.prepareProfilePreviewData(userMenusProfile.profileResponseDTO,
            userMenusProfile.profileMenuResponseDTOS, 'CLIENT');
    };

    previewApiCall = async id => {
        await this.props.previewProfile(FETCH_PROFILE_DETAILS, id)
    };

    onPreviewHandler = async id => {
        try {
            await this.previewApiCall(id);
            let previewData = await this.getProfileDataForUserMenus(this.props.ProfilePreviewReducer.profilePreviewData);
            this.setState({
                showProfileModal: true,
                previewData: previewData
            })
        } catch (e) {
            const {profilePreviewErrorMessage} = this.props.ProfilePreviewReducer;
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: profilePreviewErrorMessage ? profilePreviewErrorMessage : "Error fetching profile Details."
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
                profile: null,
                status: {value: 'A', label: 'All'},
                department: null,
                hospital: null
            }
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
            profileDescription, selectedDepartment, selectedHospital, selectedMenus,
            remarks
        } = this.state.profileUpdateData;
        let formValidity = profileNameValid
            && profileDescriptionValid
            && profileName
            && profileDescription
            && remarks
            && selectedDepartment !== null
            && selectedHospital !== null
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
        if (fieldName === 'selectedHospital') {
            if (value) {
                const {hospitalsForDropdown,} = this.props.HospitalDropdownReducer;
                let alphabeticallySortedMenus =
                    ProfileSetupUtils.getAlphabeticallySortedUserMenusByHospitalType(hospitalsForDropdown,
                        this.state.profileUpdateData.selectedHospital.value);

                let departments = await this.fetchDepartmentsByHospitalId(value);
                this.setState({
                    profileUpdateData: {
                        ...this.state.profileUpdateData,
                        selectedDepartment: null,
                        userMenus: [...alphabeticallySortedMenus],
                        defaultSelectedMenu: alphabeticallySortedMenus[0],
                        departmentListByHospital: [...departments]
                    }
                })
            } else {
                this.setState({
                    profileUpdateData: {
                        ...this.state.profileUpdateData,
                        selectedDepartment: null,
                        departmentListByHospital: []
                    }
                })
            }
        }
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
                        currentSelectedMenu.isUpdated = true;
                        return currentSelectedMenu;
                    }
                );
            }
            // FOR REMAINING CHECK IF THE ROLE AND MENU ALREADY EXISTS OR NOT AND THEN ADD NEW OBJECT TO ARRAY
            for (let menu of userMenus) {
                if (menu.childMenus.length) {
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
                                isNew: true,
                                isUpdated: false
                            })
                        })
                    }
                } else {
                    menu.roles.map(role => {
                        let alreadyExists = Boolean(currentSelectedMenusWithStatusUpdated.find(currentMenu => (
                                (Number(currentMenu.roleId) === Number(role)) && (Number(currentMenu.userMenuId) === Number(menu.id))
                            ))

                        );
                        !alreadyExists && currentSelectedMenusWithStatusUpdated.push({
                            parentId: menu.id,
                            userMenuId: menu.id,
                            roleId: role,
                            status: 'Y',
                            profileMenuId: null,
                            isNew: true,
                            isUpdated: false
                        })
                        return role
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
                    originalMenu.isUpdated = true;
                    return originalMenu
                });
                currentSelectedMenus = [...updatedMenus];
            }
        }
        await this.setState(
            {
                profileUpdateData: {
                    ...this.state.profileUpdateData,
                    selectedMenus: currentSelectedMenus,
                }
                // selectedUserMenusForModal: userMenusSelected
            });
        console.log("menusss all", this.state.profileUpdateData.selectedMenus);
        this.checkFormValidity();
    };

    handleRolesCheck = async (roles, childMenu) => {
        let currentSelectedMenus = [...this.state.profileUpdateData.selectedMenus];
        for (let role of roles) {
            if (role.isChecked) {
                // FIRST CHECK IF THE ROLE IS SELECTED ORIGINALLY, IF YES UPDATE THE STATUS ELSE ADD NEW OBJECT
                let roleIndex = currentSelectedMenus.findIndex(menu => menu.roleId === role.id
                    && Number(menu.userMenuId) === Number(childMenu.id));
                if (roleIndex >= 0) {
                    currentSelectedMenus[roleIndex].status = 'Y';
                    currentSelectedMenus[roleIndex].isUpdated = true;
                } else {
                    currentSelectedMenus.push({
                        parentId: childMenu.parentId === null ? childMenu.id : childMenu.parentId,
                        userMenuId: childMenu.id,
                        roleId: role.id,
                        status: 'Y',
                        isNew: true,
                        isUpdated: false,
                        profileMenuId: null
                    })
                }
            } else {
                // CHECK IF THE ROLE IS ALREADY SELECTED, IF YES CHECK IF IT IS NEWLY ADDED OR ORIGINAL ONE
                // IF NEWLY ADDED SPLICE IT FROM SELECTED ARRAY, ELSE CHANGE ITS STATUS TO 'N'
                let indexOfRole = currentSelectedMenus.findIndex(menu => Number(menu.roleId) === Number(role.id)
                    && Number(menu.userMenuId) === Number(childMenu.id));
                if (indexOfRole >= 0 && currentSelectedMenus[indexOfRole].isNew) {
                    currentSelectedMenus.splice(indexOfRole, 1)
                } else {
                    currentSelectedMenus[indexOfRole].status = "N";
                    currentSelectedMenus[indexOfRole].isUpdated = true;
                }
            }
        }
        await this.setState({
            profileUpdateData: {
                ...this.state.profileUpdateData,
                selectedMenus: currentSelectedMenus,
                // selectedUserMenusForModal: userMenusSelected
            }
        });
        console.log("menussss", this.state.profileUpdateData.selectedMenus);
        this.checkFormValidity();
    };

    render() {
        const {
            isSearchLoading,
            profileList,
            searchErrorMessage
        } = this.props.ProfileListReducer;

        const {profilePreviewErrorMessage} = this.props.ProfilePreviewReducer;

        const {deleteErrorMessage, isDeleteLoading} = this.props.ProfileDeleteReducer;

        const {allProfilesForDropdown} = this.props.ProfileSetupReducer;

        const {profileErrorMessage, isProfileEditLoading} = this.props.ProfileEditReducer;

        const {departments} = this.props.UnitSetupReducer;

        const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

        const {
            selectedDepartment,
            profileDescription,
            profileName,
            status,
            selectedHospital,
            departmentListByHospital,
            errorMessageForProfileName,
            errorMessageForProfileDescription,
            userMenus,
            selectedMenus,
            newSelectedMenus,
            defaultSelectedMenu,
            userMenuAvailabilityMessage,
            remarks
        } = this.state.profileUpdateData;

        return (
            <>
                {/* <Tabs/> */}
                <div className="">
                    <ProfileSetupSearchFilter
                        searchParameters={this.state.searchParameters}
                        profileList={allProfilesForDropdown}
                        hospitalList={hospitalsForDropdown}
                        departmentList={departments}
                        onInputChange={this.handleOnChange}
                        onSearchClick={() => this.apiCall(1)}
                        resetSearchForm={this.handleSearchFormReset}
                    />
                </div>
                <div className=" mb-2">
                    <ProfileDetails
                        filteredActions={this.props.filteredAction}
                        showProfileModal={this.state.showProfileModal}
                        isSearchLoading={isSearchLoading}
                        searchData={this.appendSNToTable(profileList)}
                        searchErrorMessage={searchErrorMessage}
                        setShowModal={this.setShowModal}
                        onDeleteHandler={this.onDeleteHandler}
                        onEditHandler={this.onEditHandler}
                        onPreviewHandler={this.onPreviewHandler}
                        profileData={this.state.previewData}
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
                        isDeleteLoading={isDeleteLoading}
                    />
                </div>
                {this.state.showEditModal && (
                    <UpdateProfileModal
                        showEditModal={this.state.showEditModal}
                        setShowEditModal={this.setShowModal}
                        profileInfoObj={{
                            profileName: profileName,
                            profileDescription: profileDescription,
                            hospitalValue: selectedHospital,
                            departmentValue: selectedDepartment,
                            departmentList: departmentListByHospital,
                            status: status,
                            remarks: remarks
                        }}
                        hospitalList={hospitalsForDropdown}
                        onEnterKeyPress={this.handleEnter}
                        onInputChange={this.handleUpdateFormChange}
                        editApiCall={this.editApiCall}
                        formValid={this.state.profileUpdateData.formValid}
                        errorMessageForProfileName={errorMessageForProfileName}
                        errorMessageForProfileDescription={errorMessageForProfileDescription}
                        errorMessage={profileErrorMessage}
                        isProfileEditLoading={isProfileEditLoading}
                        profileMenuAssignmentProps={
                            {
                                userMenus: userMenus,
                                selectedMenus: selectedMenus,
                                defaultSelectedMenu: defaultSelectedMenu,
                                onCheckAllUserMenus: this.addAllMenusAndRoles,
                                onTabAndRolesChange: this.handleRolesCheck,
                                profileData: {
                                    profileName: profileName,
                                    profileDescription: profileDescription,
                                    hospitalValue: selectedHospital,
                                    departmentValue: selectedDepartment,
                                    status: status,
                                    selectedMenus: selectedMenus,
                                    newSelectedMenus: newSelectedMenus,
                                    userMenus: userMenus,
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
        'ProfileEditReducer',
        'UnitSetupReducer',
        'HospitalDropdownReducer'
    ],
    {
        fetchProfileList,
        deleteProfile,
        editProfile,
        previewProfile,
        clearSuccessErrorMessagesFromStore,
        fetchActiveHospitalsForDropdown,
        fetchActiveDepartmentsByHospitalId,
        fetchActiveDepartmentsForDropdown,
        fetchAllProfileListForSearchDropdown,
        logoutUser,
        savePinOrUnpinUserMenu
    }
)
