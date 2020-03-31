import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {CompanyProfileSetupMiddleware, logoutUser} from '@frontend-appointment/thunk-middleware';
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    adminUserMenusJson,
    EnterKeyPressUtils,
    EnvironmentVariableGetter, ProfileSetupUtils,
    TryCatchHandler
} from "@frontend-appointment/helpers";
import * as UserMenuUtils from "@frontend-appointment/helpers/src/utils/UserMenuUtils";
import {CAlert} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';

const {
    clearSuccessErrorMessageFromStore,
    createCompanyProfile,
    deleteCompanyProfile,
    editCompanyProfile,
    fetchCompanyProfileListForDropdown,
    previewCompanyProfileById,
    searchCompanyProfiles,
    //TODO REMOVE it
    fetchCompany
} = CompanyProfileSetupMiddleware;

const {
    CREATE_COMPANY_PROFILE,
    DELETE_COMPANY_PROFILE,
    EDIT_COMPANY_PROFILE,
    FETCH_COMPANY_PROFILE_FOR_DROPDOWN,
    PREVIEW_COMPANY_PROFILE,
    SEARCH_COMPANY_PROFILE
} = AdminModuleAPIConstants.companyProfileSetupApiConstants;

const CompanyProfileSetupHOC = (ComposedComponent, props, type) => {
        class CompanyProfileSetupHOC extends PureComponent {

            state = {
                id: '',
                profileDescription: '',
                profileName: '',
                company: null,
                selectedMenus: [],
                status: 'Y',
                remarks: '',
                userMenus: [],
                defaultSelectedMenu: [],
                showConfirmModal: false,
                selectedUserMenusForModal: [],
                userMenuAvailabilityMessage: '',
                formValid: false,
                profileNameValid: false,
                profileDescriptionValid: false,
                errorMessageForProfileName: "Profile Name should not contain special characters",
                errorMessageForProfileDescription: 'Profile Description should contain 200 characters only.',
                showAlert: false,
                alertMessageInfo: {
                    variant: "",
                    message: ""
                },
                departmentListByHospital: [],
                showPreviewModal: false,
                showEditModal: false,
                showDeleteModal: false,
                searchParameters: {
                    profile: null,
                    status: {value: 'A', label: 'All'},
                    company: null
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
                previewData: {},
                totalRecords: 0,
                newSelectedMenus: [],
                //TODO remove it
                companyList: []
            };

            alertTimer = '';
            logoutTimer = '';

            setStateValues = (key, value, label, fieldValid) =>
                label ? value ?
                    this.setState({[key]: {value, label}})
                    : this.setState({[key]: null})
                    : this.setState({[key]: value, [key + "Valid"]: fieldValid});

            setUserMenusAlphabetically = async () => {
                let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson(adminUserMenusJson[
                    EnvironmentVariableGetter.ADMIN_MODULE_CODE]);

                alphabeticallySortedMenus ?
                    await this.setState({
                        userMenus: [...alphabeticallySortedMenus],
                        selectedMenus: [],
                        defaultSelectedMenu: {...alphabeticallySortedMenus[0]}
                    }) :
                    await this.setState({
                        userMenus: [],
                        defaultSelectedMenu: [],
                        selectedMenus: [],
                        userMenuAvailabilityMessage: 'No user menus available.'
                    });
            };

            setValuesForModalDisplay = (userMenus, selectedMenuAndRoles) => {
                let selectedParentMenus = new Set(),
                    selectedChildMenus = new Set(),
                    selectedUserMenus;

                selectedMenuAndRoles.forEach(selectedMenu => {
                    let parent = userMenus.find(userMenu => userMenu.id === selectedMenu.parentId);
                    parent && selectedParentMenus.add(parent);
                    let child = parent && parent.childMenus.length && parent.childMenus.find(
                        childMenu => childMenu.id === selectedMenu.userMenuId);
                    child && selectedChildMenus.add(child);
                });

                selectedUserMenus = Array.from(selectedParentMenus).map(parent => {
                    let data = {
                        id: parent.id,
                        name: parent.name,
                        icon: parent.icon,
                        parentId: parent.parentId,
                        childMenus: [],
                        roles: [...parent.roles]
                    };
                    let childrenOfParent = Array.from(selectedChildMenus).filter(child => {
                        return child.parentId === parent.id && {
                            id: child.id,
                            name: child.name,
                            icon: child.icon,
                            parentId: child.parentId,
                            roles: [...child.roles],
                            childMenus: [...child.childMenus]
                        }
                    });
                    data.childMenus = [...childrenOfParent];
                    return data;
                });
                return selectedUserMenus;
            };

            setShowConfirmModal = () => {
                this.setState({showConfirmModal: !this.state.showConfirmModal});
            };

            setDataForProfileUpdate = async (profileData, profileId) => {
                let menusSelected = [], menusSelectedWithFlag = [];
                const {profileMenuResponseDTOS, profileResponseDTO} = profileData;
                profileMenuResponseDTOS &&
                Object.keys(profileMenuResponseDTOS).map(key => {
                    menusSelected = menusSelected.concat(profileMenuResponseDTOS[key]);
                });

                menusSelected.forEach(menuSelected => {
                    menusSelectedWithFlag.push({...menuSelected, isNew: false, isUpdated: false});
                });

                let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson(
                    [...adminUserMenusJson[EnvironmentVariableGetter.ADMIN_MODULE_CODE]]);

                if (profileResponseDTO) {
                    this.setState({
                        id: profileId,
                        profileName: profileResponseDTO.name,
                        profileDescription: profileResponseDTO.description,
                        remarks: '',
                        company: {
                            value: profileResponseDTO.companyId,
                            label: profileResponseDTO.companyName
                        },
                        status: profileResponseDTO.status,
                        selectedMenus: [...menusSelectedWithFlag],
                        userMenus: [...alphabeticallySortedMenus],
                        defaultSelectedMenu: alphabeticallySortedMenus[0],
                        showEditModal: true,
                        profileNameValid: true,
                        profileDescriptionValid: true,
                    })
                }
            };

            closeModal = () => {
                this.setState({
                    showPreviewModal: false,
                    showDeleteModal: false,
                    showEditModal: false
                })
            };

            resetStateValues = () => {
                this.setState({
                    profileDescription: '',
                    profileName: '',
                    company: null,
                    selectedMenus: [],
                    status: 'Y',
                    userMenus: [],
                    defaultSelectedMenu: [],
                    showConfirmModal: false,
                    selectedUserMenusForModal: [],
                    userMenuAvailabilityMessage: '',
                    formValid: false,
                    profileNameValid: false,
                    profileDescriptionValid: false,
                    showEditModal: false
                })
            };

            handleEnter = (event) => {
                EnterKeyPressUtils.handleEnter(event)
            };

            handleInputChange = async (event, fieldValid) => {
                event && await this.bindValuesToState(event, fieldValid);
            };

            handleSearchFormChange = async (event) => {
                let key = event.target.name;
                let value = event.target.value;
                let label = event.target.label;

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
            };

            handleAddAllMenusAndRoles = async (userMenus, checkedAllUserMenus) => {
                let currentSelectedMenus, userMenusSelected = [];
                switch (type) {
                    case 'ADD':
                        const returnedObject = this.actionOnAddCheckAll(checkedAllUserMenus, userMenus);
                        currentSelectedMenus = returnedObject.currentSelectedMenus;
                        userMenusSelected = returnedObject.userMenusSelected;
                        break;
                    case "MANAGE":
                        currentSelectedMenus = this.actionOnManageCheckAll(checkedAllUserMenus, userMenus);
                        break;
                    default:
                        break;
                }

                await this.setState({
                    selectedMenus: currentSelectedMenus,
                    selectedUserMenusForModal: userMenusSelected
                });

                this.checkFormValidity();
            };

            handleRolesCheck = async (roles, childMenu) => {
                let currentSelectedMenus = [...this.state.selectedMenus];
                let userMenusForModalDisplay = [];

                switch (type) {
                    case "ADD":
                        userMenusForModalDisplay = this.actionOnAddRolesCheck(roles, currentSelectedMenus, childMenu);
                        break;
                    case "MANAGE":
                        currentSelectedMenus = this.actionOnManageRoleCheck(currentSelectedMenus, roles, childMenu);
                        break;
                    default:
                        break;

                }
                await this.setState({
                    selectedMenus: currentSelectedMenus,
                    selectedUserMenusForModal: [userMenusForModalDisplay]
                });
                this.checkFormValidity();
            };

            handleSearchFormReset = async () => {
                await this.setState({
                    searchParameters: {
                        ...this.state.searchParameters,
                        profile: null,
                        company: null,
                        status: {value: 'A', label: 'All'},
                    }
                });
                this.searchCompanyProfile(1)
            };

            handlePageChange = async newPage => {
                await this.setState({
                    queryParams: {
                        ...this.state.queryParams,
                        page: newPage
                    }
                });
                this.searchCompanyProfile();
            };

            handleCompanyProfilePreview = async id => {
                try {
                    await this.previewCompanyProfile(id);
                    const previewDataDetail = {
                        profileResponseDTO: this.props.CompanyProfilePreviewReducer.companyProfileDetail.companyProfileInfo,
                        profileMenuResponseDTOS: this.props.CompanyProfilePreviewReducer.companyProfileDetail.companyProfileMenuInfo
                    };
                    let previewData = ProfileSetupUtils.prepareProfilePreviewData(previewDataDetail, 'COMPANY');
                    this.setState({
                        showPreviewModal: true,
                        previewData: previewData
                    })
                } catch (e) {
                    const {profilePreviewErrorMessage} = this.props.CompanyProfilePreviewReducer;
                    this.showAlertMessage("danger", profilePreviewErrorMessage
                        ? profilePreviewErrorMessage : "Error fetching profile Details.");
                }
            };

            handleDeleteRemarksChange = event => {
                const {name, value} = event.target;
                let deleteRequest = {...this.state.deleteRequestDTO};
                deleteRequest[name] = value;
                this.setState({
                    deleteRequestDTO: deleteRequest
                })
            };

            handleDeleteProfile = async id => {
                this.props.clearSuccessErrorMessageFromStore();
                let deleteRequestDTO = {...this.state.deleteRequestDTO};
                deleteRequestDTO['id'] = id;
                await this.setState({
                    deleteRequestDTO: deleteRequestDTO,
                    showDeleteModal: true
                })
            };

            handleProfileEdit = async id => {
                try {
                    await this.previewCompanyProfile(id);
                    const previewDataDetail = {
                        profileResponseDTO: this.props.CompanyProfilePreviewReducer.companyProfileDetail.companyProfileInfo,
                        profileMenuResponseDTOS: this.props.CompanyProfilePreviewReducer.companyProfileDetail.companyProfileMenuInfo
                    };
                    this.setDataForProfileUpdate(previewDataDetail, id);
                    this.checkFormValidity();
                } catch (e) {
                    //console.log(e)
                }
            };

            editCompanyProfile = async () => {
                const {
                    id,
                    selectedMenus,
                    profileName,
                    profileDescription,
                    company,
                    remarks,
                    status
                } = this.state;

                let menusToBeUpdated = selectedMenus.filter(menu => menu.isUpdated || menu.isNew);
                let editRequestDTO = {
                    companyProfileInfo: {
                        description: profileDescription,
                        id: id,
                        name: profileName,
                        remarks: remarks,
                        status: status,
                        companyId: company && company.value,
                    },
                    profileMenuInfo: menusToBeUpdated.length ? [...menusToBeUpdated] : [...selectedMenus]
                };
                try {
                    await this.props.editCompanyProfile(EDIT_COMPANY_PROFILE, editRequestDTO);
                    this.resetStateValues();
                    this.checkIfEditedOwnProfileAndShowMessage(editRequestDTO.companyProfileInfo.id);
                    await this.searchCompanyProfile();
                } catch (e) {

                }
            };

            deleteCompanyProfile = async () => {
                try {
                    await this.props.deleteCompanyProfile(DELETE_COMPANY_PROFILE, this.state.deleteRequestDTO);
                    await this.setState({
                        showDeleteModal: false,
                        deleteRequestDTO: {id: 0, remarks: '', status: 'D'}
                    });
                    await this.showAlertMessage("success",
                        this.props.CompanyProfileDeleteReducer.deleteCompanyProfileSuccessMessage);
                    await this.searchCompanyProfile();
                } catch (e) {
                    this.setState({
                        showDeleteModal: true,
                    });
                }
            };

            previewCompanyProfile = async companyProfileId => {
                await this.props.previewCompanyProfileById(PREVIEW_COMPANY_PROFILE, companyProfileId);
            };

            saveCompanyProfile = async () => {
                const {profileName, profileDescription, status, company, selectedMenus} = this.state;
                let profileDetails = {
                    companyProfileInfo: {
                        name: profileName,
                        description: profileDescription,
                        status: status,
                        companyId: company && company.value
                    },
                    profileMenuInfo: selectedMenus
                };
                try {
                    await this.props.createCompanyProfile(CREATE_COMPANY_PROFILE, profileDetails);
                    this.resetStateValues();
                    this.showAlertMessage("success",
                        this.props.CompanyProfileCreateReducer.createCompanyProfileSuccessMessage)
                } catch (e) {
                    await this.setShowConfirmModal();
                    this.showAlertMessage("danger",
                        this.props.CompanyProfileCreateReducer.createCompanyProfileErrorMessage)
                }
            };

            searchCompanyProfile = async (page) => {
                const {searchParameters, queryParams} = this.state;
                const {profile, status, company} = searchParameters;
                let searchData = {
                    name: profile ? profile.value : '',
                    status: status && status.value !== 'A'
                        ? status.value
                        : '',
                    companyId: company ? company.value : '',
                };

                let updatedPage =
                    queryParams.page === 0 ? 1 : (page ? page : queryParams.page);
                await this.props.searchCompanyProfiles(
                    SEARCH_COMPANY_PROFILE,
                    {
                        page: updatedPage,
                        size: queryParams.size
                    },
                    searchData,
                );

                await this.setState({
                    totalRecords: this.props.CompanyProfileSearchReducer.companyProfileList.length
                        ? this.props.CompanyProfileSearchReducer.companyProfileList[0].totalItems
                        : 0,
                    queryParams: {
                        ...queryParams,
                        page: updatedPage
                    }
                })
            };

            fetchCompanyListForDropdown = async () => {
                const response = await this.props.fetchCompany('/api/v1/company/active/min');
                this.setState({
                    companyList: [...response]
                })
            };

            fetchCompanyProfileListForDropdown = async () => {
                await this.props.fetchCompanyProfileListForDropdown(FETCH_COMPANY_PROFILE_FOR_DROPDOWN);
            };

            actionOnManageCheckAll = (checkedAllUserMenus, userMenus) => {
                let currentSelectedMenus = [...this.state.selectedMenus];
                let currentSelectedMenusWithStatusUpdated = [];

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
                return currentSelectedMenus;
            };

            actionOnAddCheckAll = (checkedAllUserMenus, userMenus) => {
                let currentSelectedMenus = [], userMenusSelected;
                if (checkedAllUserMenus) {
                    for (let menu of userMenus) {
                        if (menu.childMenus.length) {
                            for (let child of menu.childMenus) {
                                child.roles.map(role => {
                                    currentSelectedMenus.push({
                                        parentId: menu.id,
                                        userMenuId: child.id,
                                        roleId: role,
                                        status: 'Y'
                                    })
                                })
                            }
                        } else {
                            menu.roles.map(role => {
                                currentSelectedMenus.push({
                                    parentId: menu.id,
                                    userMenuId: menu.id,
                                    roleId: role,
                                    status: 'Y'
                                })
                            })
                        }
                    }
                }
                userMenusSelected = currentSelectedMenus.length && this.setValuesForModalDisplay(
                    this.state.userMenus, currentSelectedMenus);
                return {currentSelectedMenus, userMenusSelected};
            };

            actionOnManageRoleCheck = (currentSelectedMenus, roles, childMenu) => {
                currentSelectedMenus = [...this.state.selectedMenus];
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
                return currentSelectedMenus;
            };

            actionOnAddRolesCheck = (roles, currentSelectedMenus, childMenu) => {
                for (let role of roles) {
                    role.isChecked ?
                        !currentSelectedMenus.find(menu => menu.roleId === role.id && menu.userMenuId === childMenu.id)
                        && currentSelectedMenus.push({
                            parentId: childMenu.parentId === null ? childMenu.id : childMenu.parentId,
                            //IN CASE OF PARENT WITH NO CHILD SET PARENT ID TO ITS OWN ID
                            userMenuId: childMenu.id,
                            roleId: role.id,
                            status: 'Y'
                        })
                        :
                        currentSelectedMenus.splice(currentSelectedMenus.findIndex(menu => menu.roleId === role.id && menu.userMenuId === childMenu.id), 1);
                }

                let userMenusForModalDisplay = this.setValuesForModalDisplay(this.state.userMenus, currentSelectedMenus);
                return userMenusForModalDisplay;
            };

            automaticLogoutUser = () => {
                this.logoutTimer = setTimeout(async () => {
                    try {
                        let logoutResponse = await this.props.logoutUser('/cogent/logout');
                        if (logoutResponse) {
                            this.props.history.push('/');
                        }
                    } catch (e) {
                    }
                }, 10000)
            };

            bindValuesToState = async (event, fieldValid) => {
                let fieldName = event.target.name;
                let value = event.target.value;
                let label = event.target.label;
                await this.setStateValues(fieldName, value, label, fieldValid);
                if (fieldName === 'company') {
                    value ? this.setUserMenusAlphabetically() :
                        this.setState({
                            userMenus: [],
                            defaultSelectedMenu: [],
                            userMenuAvailabilityMessage: '',
                            selectedMenus: []
                        });
                }

                this.checkFormValidity();
            };

            checkFormValidity = () => {
                const {
                    profileNameValid,
                    profileDescriptionValid,
                    profileName,
                    profileDescription,
                    company,
                    selectedMenus,
                    remarks
                } = this.state;
                let formValidity = profileNameValid
                    && profileDescriptionValid && profileName
                    && profileDescription
                    && company !== null
                    && selectedMenus.length !== 0;

                formValidity = type === "MANAGE" ? (formValidity && remarks) : formValidity;

                this.setState({
                    formValid: Boolean(formValidity)
                })
            };

            checkIfEditedOwnProfileAndShowMessage = editedProfileId => {
                let message = '';
                let loggedInAdminInfo = JSON.parse(localStorage.getItem("adminInfo"));
                if (editedProfileId === loggedInAdminInfo.profileId) {
                    message = "You seem to have edited your own profile. Please Logout and Login to see the changes or " +
                        "you'll be automatically logged out in 10s";
                    this.showAlertMessage("warning", message);
                    this.automaticLogoutUser();
                } else {
                    this.showAlertMessage("success",
                        this.props.CompanyProfileEditReducer.editCompanyProfileSuccessMessage)
                }
            };

            closeAlert = () => {
                this.props.clearSuccessErrorMessageFromStore();
                this.setState({
                    showAlert: !this.state.showAlert
                });
            };

            clearAlertOnTimeOut = () => {
                this.alertTimer = setTimeout(() =>
                    this.setState({
                        showAlert: false,
                        alertMessageInfo: {
                            ...this.state.alertMessageInfo,
                            variant: "",
                            message: ""
                        },
                    }), 5000)
            };

            showAlertMessage = (type, message) => {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: type,
                        message: message
                    }
                });
                this.clearAlertOnTimeOut();
            };

            initialApiCalls = async () => {
                await this.fetchCompanyListForDropdown();
                if (type === "MANAGE") {
                    this.fetchCompanyProfileListForDropdown();
                    this.searchCompanyProfile(1);
                }
                // await this.setUserMenusAlphabetically();
            };

            componentDidMount() {
                TryCatchHandler.genericTryCatch(this.initialApiCalls());
            }

            componentWillUnmount() {
                clearTimeout(this.alertTimer, this.logoutTimer);
            }

            render() {
                const {
                    profileDescription, profileName, company, status, remarks,
                    errorMessageForProfileDescription, errorMessageForProfileName,
                    userMenus, selectedMenus, defaultSelectedMenu, selectedUserMenusForModal, userMenuAvailabilityMessage,
                    alertMessageInfo, showAlert, showConfirmModal, formValid,
                    searchParameters, totalRecords, queryParams,
                    showPreviewModal, previewData,
                    showDeleteModal, deleteRequestDTO, showEditModal,
                    newSelectedMenus
                } = this.state;

                const {activeCompanyProfileListForDropdown, dropdownErrorMessage} = this.props.CompanyProfileDropdownReducer;

                const {createCompanyProfileLoading} = this.props.CompanyProfileCreateReducer;

                const {searchCompanyProfileLoading, searchCompanyProfileErrorMessage, companyProfileList} =
                    this.props.CompanyProfileSearchReducer;

                const {
                    previewCompanyProfileLoading,
                    previewCompanyProfileErrorMessage
                } = this.props.CompanyProfilePreviewReducer;

                const {deleteCompanyProfileErrorMessage} = this.props.CompanyProfileDeleteReducer;
                const {editCompanyProfileErrorMessage, editCompanyProfileLoading} = this.props.CompanyProfileEditReducer;

                return <>
                    <ComposedComponent
                        profileInfoFormData={{
                            handleEnter: this.handleEnter,
                            companyListForDropdown: this.state.companyList,
                            dropdownErrorMessage: dropdownErrorMessage,
                            profileInfoObj: {
                                profileDescription,
                                profileName,
                                company,
                                status,
                                remarks
                            },
                            errorMessageForProfileName,
                            errorMessageForProfileDescription,
                            handleInputChange: this.handleInputChange
                        }}
                        profileMenuAssignmentData={
                            {
                                userMenus: userMenus,
                                selectedMenus: selectedMenus,
                                defaultSelectedMenu: defaultSelectedMenu,
                                onCheckAllUserMenus: this.handleAddAllMenusAndRoles,
                                onTabAndRolesChange: this.handleRolesCheck,
                                resetFormData: this.resetStateValues,
                                profileData: {
                                    profileName: profileName,
                                    profileDescription: profileDescription,
                                    company: company,
                                    status: status,
                                    selectedMenus: selectedMenus,
                                    newSelectedMenus: newSelectedMenus,
                                    userMenus: userMenus,
                                    selectedUserMenusForModal: selectedUserMenusForModal,
                                    userMenuAvailabilityMessage: userMenuAvailabilityMessage
                                }
                            }
                        }
                        addFormData={{
                            setShowConfirmModal: this.setShowConfirmModal,
                            showConfirmModal: showConfirmModal,
                            handleConfirmClick: this.saveCompanyProfile,
                            createCompanyProfileLoading
                        }}
                        commonData={{
                            formValid: formValid
                        }}
                        searchData={{
                            searchParameters: searchParameters,
                            companyProfileList: activeCompanyProfileListForDropdown,
                            companyList: this.state.companyList,
                            onInputChange: this.handleSearchFormChange,
                            onSearchClick: this.searchCompanyProfile,
                            resetSearchForm: this.handleSearchFormReset,
                        }}
                        tableData={{
                            filteredActions: props.filteredAction,
                            searchCompanyProfileLoading: searchCompanyProfileLoading,
                            searchCompanyProfileErrorMessage: searchCompanyProfileErrorMessage,
                            companyProfileList: companyProfileList,
                            totalItems: totalRecords,
                            maxSize: queryParams.size,
                            currentPage: queryParams.page,
                            handlePageChange: this.handlePageChange,
                            // PREVIEW MODAL PROPS
                            showPreviewModal,
                            closeModal: this.closeModal,
                            previewData: previewData,
                            profilePreviewLoading: previewCompanyProfileLoading,
                            profilePreviewErrorMessage: previewCompanyProfileErrorMessage,
                            onPreviewHandler: this.handleCompanyProfilePreview,
                            //
                            // DELETE MODAL PROPS
                            showDeleteModal: showDeleteModal,
                            onDeleteHandler: this.handleDeleteProfile,
                            remarksHandler: this.handleDeleteRemarksChange,
                            remarks: deleteRequestDTO.remarks,
                            onSubmitDelete: this.deleteCompanyProfile,
                            deleteErrorMsg: deleteCompanyProfileErrorMessage,
                            //
                            onEditHandler: this.handleProfileEdit
                        }}
                        updateData={{
                            showEditModal: showEditModal,
                            closeModal: this.closeModal,
                            editApiCall: this.editCompanyProfile,
                            errorMessage: editCompanyProfileErrorMessage,
                            editCompanyProfileLoading
                        }}
                    />
                    <CAlert id="profile-manage"
                            variant={alertMessageInfo.variant}
                            show={showAlert}
                            onClose={this.closeAlert}
                            alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                            </> : <i className="fa fa-exclamation-triangle" aria-hidden="true"/>}
                            message={alertMessageInfo.message}
                    />
                </>
            }
        }

        return ConnectHoc(
            CompanyProfileSetupHOC,
            [
                'CompanyProfileCreateReducer',
                'CompanyProfileEditReducer',
                'CompanyProfileDeleteReducer',
                'CompanyProfilePreviewReducer',
                'CompanyProfileSearchReducer',
                'CompanyProfileDropdownReducer'
            ],
            {
                clearSuccessErrorMessageFromStore,
                createCompanyProfile,
                deleteCompanyProfile,
                editCompanyProfile,
                fetchCompanyProfileListForDropdown,
                previewCompanyProfileById,
                searchCompanyProfiles,
                fetchCompany,
                logoutUser
            }
        )
    }
;

export default CompanyProfileSetupHOC;
