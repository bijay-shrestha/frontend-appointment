import React, {PureComponent} from 'react';
import {ConnectHoc} from "@frontend-appointment/commons";
import {CompanyProfileSetupMiddleware} from '@frontend-appointment/thunk-middleware';
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    adminUserMenusJson,
    EnterKeyPressUtils,
    EnvironmentVariableGetter,
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
            showProfileModal: false,
            showEditModal: false,
            deleteModalShow: false,
            subDepartmentsByDepartmentId: [],
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
            totalRecords: 0,
            //TODO remove it
            companyList: []
        };

        alertTimer = '';

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
            })
        };


        handleEnter = (event) => {
            EnterKeyPressUtils.handleEnter(event)
        };

        handleInputChange = async (event, fieldValid) => {
            event && await this.bindValuesToState(event, fieldValid);
        };

        handleSearchFormChange = async (event)=>{
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

        handleRolesCheck = async (roles, childMenu) => {
            let currentSelectedMenus = [...this.state.selectedMenus];
            for (let role of roles) {
                role.isChecked ?
                    !currentSelectedMenus.find(menu => menu.roleId === role.id && menu.userMenuId === childMenu.id) && currentSelectedMenus.push({
                        parentId: childMenu.parentId === null ? childMenu.id : childMenu.parentId,
                        //IN CASE OF PARENT WITH NO CHILD SET PARENT ID TO ITS OWN ID
                        userMenuId: childMenu.id,
                        roleId: role.id,
                        status: 'Y'
                    })
                    :
                    currentSelectedMenus.splice(currentSelectedMenus.findIndex(menu => menu.roleId === role.id && menu.userMenuId === childMenu.id), 1);
            }

            let userMenusSelected = this.setValuesForModalDisplay(this.state.userMenus, currentSelectedMenus);

            await this.setState({
                selectedMenus: currentSelectedMenus,
                selectedUserMenusForModal: userMenusSelected
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

        fetchCompanyProfileListForDropdown = async ()=>{
            await this.props.fetchCompanyProfileListForDropdown(FETCH_COMPANY_PROFILE_FOR_DROPDOWN);
        };

        addAllMenusAndRoles = async (userMenus, checkedAllUserMenus) => {
            let currentSelectedMenus = [],
                userMenusSelected;

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

            await this.setState({
                selectedMenus: currentSelectedMenus,
                selectedUserMenusForModal: userMenusSelected
            });
            console.log(this.state.selectedMenus);
            this.checkFormValidity();
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
                selectedMenus
            } = this.state;
            let formValidity = profileNameValid
                && profileDescriptionValid && profileName
                && profileDescription
                && company !== null
                && selectedMenus.length !== 0;

            this.setState({
                formValid: formValidity
            })
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
            if (type==="MANAGE"){
                this.fetchCompanyProfileListForDropdown();
                this.searchCompanyProfile(1);
            }
            // await this.setUserMenusAlphabetically();
        };

        componentDidMount() {
            TryCatchHandler.genericTryCatch(this.initialApiCalls());
        }

        componentWillUnmount() {
            clearTimeout(this.alertTimer)
        }

        render() {
            const {
                profileDescription, profileName, company, status,
                errorMessageForProfileDescription, errorMessageForProfileName,
                userMenus, selectedMenus, defaultSelectedMenu, selectedUserMenusForModal, userMenuAvailabilityMessage,
                alertMessageInfo, showAlert, showConfirmModal, formValid,
                searchParameters,totalRecords,queryParams
            } = this.state;
            const {activeCompanyProfileListForDropdown, dropdownErrorMessage} = this.props.CompanyProfileDropdownReducer;
            const {createCompanyProfileLoading} = this.props.CompanyProfileCreateReducer;
            const {searchCompanyProfileLoading,searchCompanyProfileErrorMessage,companyProfileList} = this.props.CompanyProfileSearchReducer;
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
                            status
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
                            onCheckAllUserMenus: this.addAllMenusAndRoles,
                            onTabAndRolesChange: this.handleRolesCheck,
                            resetFormData: this.resetStateValues,
                            profileData: {
                                profileName: profileName,
                                profileDescription: profileDescription,
                                company: company,
                                status: status,
                                selectedMenus: selectedMenus,
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
                        companyProfileList:activeCompanyProfileListForDropdown,
                        companyList:this.state.companyList,
                        onInputChange:this.handleSearchFormChange,
                        onSearchClick: this.searchCompanyProfile,
                        resetSearchForm:this.handleSearchFormReset,
                    }}
                    tableData={{
                        filteredActions:this.props.filteredAction,
                        searchCompanyProfileLoading:searchCompanyProfileLoading,
                        searchCompanyProfileErrorMessage:searchCompanyProfileErrorMessage,
                        companyProfileList:companyProfileList,
                        totalItems:totalRecords,
                        maxSize:queryParams.size,
                        currentPage:queryParams.page,
                        handlePageChange:this.handlePageChange
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
            fetchCompany
        }
    )
};

export default CompanyProfileSetupHOC;
