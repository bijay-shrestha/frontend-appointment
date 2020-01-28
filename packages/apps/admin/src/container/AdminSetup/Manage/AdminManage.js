import React, {PureComponent} from 'react';
import AdminSetupSearchFilter from "./AdminSetupSearchFilter";
import {ConnectHoc} from "@cogent/commons";
import {
    adminCategoryMiddleware,
    applicationModuleMiddleware,
    clearAdminSuccessErrorMessagesFromStore,
    deleteAdmin,
    editAdmin,
    fetchActiveProfileListForDropdown,
    fetchAdminList,
    fetchAdminMetaInfo,
    fetchProfileListBySubDepartmentId,
    hospitalSetupMiddleware,
    logoutUser,
    previewAdmin,
    previewProfile,
    resetPassword,
} from "@cogent/thunk-middleware";
import {AdminModuleAPIConstants} from '@cogent/web-resource-key-constants';
import AdminDetailsDataTable from "./AdminDetailsDataTable";
import {CAlert} from "@cogent/ui-elements";
import AdminEditModal from "./AdminEditModal";
import {AdminSetupUtils, EnterKeyPressUtils, ProfileSetupUtils, rolesFromJson} from "@cogent/helpers";
import PasswordResetModal from "./PasswordResetModal";
import "./../admin-setup.scss";
import PreviewRoles from "../../CommonComponents/PreviewRoles";

const {SEARCH_ADMIN, FETCH_ADMIN_DETAILS, EDIT_ADMIN, DELETE_ADMIN, FETCH_ADMIN_META_INFO, RESET_PASSWORD} =
    AdminModuleAPIConstants.adminSetupAPIConstants;
const {FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN} = AdminModuleAPIConstants.profileSetupAPIConstants;
const {FETCH_MODULES_FOR_DROPDOWN} = AdminModuleAPIConstants.applicationModuleSetupApiConstants;
const {FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID, FETCH_PROFILE_DETAILS} = AdminModuleAPIConstants.profileSetupAPIConstants;
const {FETCH_ADMIN_CATEGORY_FOR_DROPDOWN} = AdminModuleAPIConstants.adminCategoryApiConstants;
const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;

const {fetchActiveModulesForDropdown} = applicationModuleMiddleware;
const {fetchActiveAdminCategoriesForDropdown} = adminCategoryMiddleware;
const {fetchActiveHospitalsForDropdown} = hospitalSetupMiddleware;

class AdminManage extends PureComponent {
    state = {
        showAdminModal: false,
        showEditModal: false,
        deleteModalShow: false,
        showPasswordResetModal: false,
        passwordResetDTO: {
            username: '',
            password: '',
            remarks: ''
        },
        passwordResetError: '',
        searchParameters: {
            metaInfo: '',
            adminCategory: '',
            profile: '',
            status: {value: 'A', label: 'All'}
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
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        showAlert: false,
        adminUpdateData: {
            id: '',
            hospital: null,
            fullName: '',
            username: '',
            email: '',
            password: '',
            mobileNumber: '',
            adminCategory: null,
            status: 'Y',
            hasMacBinding: '',
            macIdList: [],
            moduleList: [],
            adminAvatar: null,
            adminAvatarUrl: '',
            adminAvatarUrlNew: '',
            formValid: true,
            remarks: '',
            fullNameValid: true,
            emailValid: true,
            mobileNumberValid: true
        },
        modules: [],// all modules
        errorMessageForAdminName: 'Admin Name should not contain special characters.',
        errorMessageForAdminMobileNumber: 'Mobile number should be of 10 digits.',
        showImageUploadModal: false,
        updatedMacIdList: [],
        updatedModulesAndProfiles: [],
        adminImage: '',
        adminImageCroppedUrl: '',
        adminFileCropped: '',
        adminMetaInfos: [],
        profileData: {},
        showProfileDetailModal: false
    };

    resetAdminUpdateDataFromState = () => {
        this.setState({
            adminUpdateData: {
                ...this.state.departmentUpdateData,
                hospital: null,
                fullName: '',
                username: '',
                email: '',
                password: '',
                mobileNumber: '',
                adminCategory: null,
                status: 'Y',
                hasMacBinding: '',
                macIdList: [],
                moduleList: [],
                adminAvatar: null,
                adminAvatarUrl: '',
            },
            showEditModal: false,
            updatedMacIdList: [],
            updatedModulesAndProfiles: []
        })
    };

    resetImageIfSelectedOnCloseOrCancel = () => {
        this.setState({
            adminUpdateData: {
                ...this.state.adminUpdateData,
                adminAvatarUrlNew: ''
            },
            showEditModal: false
        })
    };

    closeProfileDetailsViewModal = () => {
        this.setState({
            showProfileDetailModal: false
        })
    };

    setShowModal = () => {
        this.setState({
            showAdminModal: false,
            deleteModalShow: false,
            showEditModal: false,
            showPasswordResetModal: false
        })
    };

    setImageShowModal = () => this.setState({showImageUploadModal: !this.state.showImageUploadModal});

    setStateValuesForSearch = (key, value, label) => {
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

    setUpdatedValuesInState = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({
                adminUpdateData: {
                    ...this.state.adminUpdateData,
                    [key]: {value, label}
                }
            })
            : this.setState({
                adminUpdateData: {
                    ...this.state.adminUpdateData,
                    [key]: null
                }
            })
            : this.setState({
                adminUpdateData: {
                    ...this.state.adminUpdateData,
                    [key]: value, [key + "Valid"]: fieldValid
                }
            });

    setMacIdListInState = (macIds, updatedMacIds) => this.setState({
        adminUpdateData: {
            ...this.state.adminUpdateData,
            macIdList: [...macIds]
        },
        updatedMacIdList: [...updatedMacIds]
    });

    setModulesInState = (modules, updatedModules) => this.setState({
        adminUpdateData: {
            ...this.state.adminUpdateData,
            moduleList: [...modules]
        },
        updatedModulesAndProfiles: [...updatedModules]
    });

    setDataForPreview = async (adminData) => {
        const {
            id, hospital, fullName, username, email, mobileNumber, adminCategory, status,
            hasMacBinding, macIdList, moduleList, adminAvatar, remarks, adminAvatarUrl
        } = adminData;

        console.log("Admin url", adminData);
        await this.setState({
            showAdminModal: true,
            showAlert: false,
            adminUpdateData: {
                ...this.state.adminUpdateData,
                id: id,
                hospital: {...hospital},
                fullName: fullName,
                username: username,
                email: email,
                mobileNumber: mobileNumber,
                adminCategory: {...adminCategory},
                status: status,
                hasMacBinding: hasMacBinding,
                macIdList: [...macIdList],
                adminAvatar: adminAvatar,
                moduleList: [...moduleList],
                remarks: remarks,
                adminAvatarUrl: adminAvatarUrl,
                adminAvatarUrlNew: ''
            }
        });
    };

    closeAlert = () => {
        this.props.clearAdminSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };

    validateMacId = (macId) => {
        let macIdPattern = /^([0-9a-fA-F]{2}[:.-]){5}[0-9a-fA-F]{2}$/;
        return macIdPattern.test(macId);
    };

    checkFormValidity = () => {
        const {
            hospital, fullName, username, email, mobileNumber, adminCategory, moduleList, fullNameValid,
            emailValid, mobileNumberValid
        } = this.state.adminUpdateData;

        let moduleSelected = moduleList.filter(module => module.isChecked);
        let formValidity = hospital && fullNameValid && fullName && username && emailValid && email && mobileNumberValid
            && mobileNumber && adminCategory && moduleSelected.length;

        moduleSelected.map(mod => {
            formValidity = formValidity && mod.profileSelected
        });

        this.setState({
            formValid: Boolean(formValidity)
        })
    };

    checkIfDeletingOwnProfile = async deletedAdminId => {
        let loggedInAdminInfo = JSON.parse(localStorage.getItem("adminInfo"));
        if (deletedAdminId === loggedInAdminInfo.adminId) {
            let logoutResponse = await this.props.logoutUser('/cogent/logout');
            if (logoutResponse) {
                this.props.history.push('/');
            }
        }
        return false;
    };

    handleSearchFormChange = async (event) => {
        if (event) {
            let fieldName = event.target.name;
            let value = event.target.value;
            let label = event.target.label;
            await this.setStateValuesForSearch(fieldName, value, label);
        }
    };

    handleSearchFormReset = async () => {
        await this.setState({
            searchParameters: {
                ...this.state.searchParameters,
                metaInfo: null,
                adminCategory: '',
                profile: '',
                status: {value: 'A', label: 'All'}
            },
        });
        this.searchAdmins();
    };

    handlePageChange = async newPage => {
        await this.setState({
            queryParams: {
                ...this.state.queryParams,
                page: newPage
            }
        });
        this.searchAdmins();
    };

    handleEnter = (event) => {
        EnterKeyPressUtils.handleEnter(event);
    };

    handleOnChange = async (event, fieldValid) => {
        if (event) {
            let fieldName = event.target.name;
            let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            let label = event.target.label;
            await this.setUpdatedValuesInState(fieldName, value, label, fieldValid);
            if (fieldName === "hasMacBinding") {
                this.addMacIdObjectToMacIdList(value);
            }
            this.checkFormValidity();
        }
    };

    handleMacIdChange = (event, index) => {
        let macIdValue = event.target.value;
        let macIds = [...this.state.adminUpdateData.macIdList];
        let currentUpdatedMacIds = [...this.state.updatedMacIdList];
        let macIdAlreadyExists = macIds.length > 0 && macIds.find(macId => macId.macId === macIdValue);
        macIds[index].macId = macIdValue;
        currentUpdatedMacIds[index].macId = macIdValue;
        macIds[index].errorMessage = macIdValue && (!this.validateMacId(macIdValue) ? "Invalid MAC Id."
            : (macIdAlreadyExists ? 'MAC Id Already added.' : ''));
        this.setMacIdListInState(macIds, currentUpdatedMacIds);
    };

    handleAddMoreMacId = () => {
        this.addMacIdObjectToMacIdList(true);
    };

    handleRemoveMacId = (macId, index) => {
        let macIds = [...this.state.adminUpdateData.macIdList];
        let currentMacIds = [...this.state.updatedMacIdList];
        if (!macIds[index].isNew) {
            let removedIndex = currentMacIds.findIndex(currentMacId => currentMacId.id === macIds[index].id);
            currentMacIds[removedIndex].status = 'N'
        } else {
            currentMacIds.splice(index, 1);
        }
        macIds.splice(index, 1);
        this.setMacIdListInState(macIds, currentMacIds);
    };

    handleModuleChange = async (subDepartmentId, index) => {
        let modules = [...this.state.adminUpdateData.moduleList];
        let currentUpdatedModules = [...this.state.updatedModulesAndProfiles];
        modules[index].isChecked = !modules[index].isChecked;
        currentUpdatedModules[index].isChecked = !currentUpdatedModules[index].isChecked;
        if (modules[index].isChecked) {
            if (!modules[index].isNew) {
                currentUpdatedModules[index].status = 'Y';
                modules[index].profileList = currentUpdatedModules[index].profileList;
                modules[index].profileSelected = currentUpdatedModules[index].profileSelected;
            } else {
                currentUpdatedModules[index].status = 'Y';
                let profileList = currentUpdatedModules[index].profileList.length ?
                    currentUpdatedModules[index].profileList : await this.fetchProfileListByModule(subDepartmentId);
                modules[index].profileList = profileList ? [...profileList] : [];
                currentUpdatedModules[index].profileList = currentUpdatedModules[index].profileList.length && [...profileList]
            }
        } else {
            currentUpdatedModules[index].status = 'N';
            modules[index].profileList = [];
            modules[index].profileSelected = null;
        }
        await this.setModulesInState(modules, currentUpdatedModules);
        this.checkFormValidity();
    };

    handleProfileChange = (event, index) => {
        let modules = [...this.state.adminUpdateData.moduleList];
        let currentUpdatedModulesAndProfile = [...this.state.updatedModulesAndProfiles];
        if (event.target.value) {
            let profileObj = {
                label: event.target.label,
                value: event.target.value
            };
            modules[index].profileSelected = {...profileObj};
            currentUpdatedModulesAndProfile[index].profileSelected = {...profileObj}
        } else {
            modules[index].profileSelected = null;
            currentUpdatedModulesAndProfile[index].profileSelected = null;
        }
        this.setModulesInState(modules, currentUpdatedModulesAndProfile);
        this.checkFormValidity();
    };

    handleImageSelect = imageUrl => {
        imageUrl && this.setState({adminImage: imageUrl})
    };

    handleCropImage = (croppedImageUrl) => {
        croppedImageUrl && this.setState({
            adminImageCroppedUrl: croppedImageUrl
        });
    };

    handleImageUpload = async (croppedImageFile) => {
        let croppedImage = this.state.adminImageCroppedUrl;
        await this.setState({
            adminUpdateData: {
                ...this.state.adminUpdateData,
                adminAvatar:
                    new File([croppedImageFile], "adminAvatar.jpeg"),
                adminAvatarUrlNew: croppedImage,
            },
            showImageUploadModal: false
        })
    };

    handleViewProfileDetails = async (profileId) => {
        try {
            await this.fetchProfileDetails(profileId);
            const {
                profilePreviewData,
            } = this.props.ProfilePreviewReducer;

            let profileData = profilePreviewData && await ProfileSetupUtils.prepareProfilePreviewData(profilePreviewData);
            this.setState({
                profileData,
                showProfileDetailModal: true
            });
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.ProfilePreviewReducer.profilePreviewErrorMessage,
                }
            })
        }
    };

    fetchProfileDetails = async (profileId) => {
        await this.props.previewProfile(FETCH_PROFILE_DETAILS, profileId);
    };

    onDeleteHandler = async id => {
        this.props.clearAdminSuccessErrorMessagesFromStore();
        let deleteRequestDTO = {...this.state.deleteRequestDTO};
        deleteRequestDTO['id'] = id;
        await this.setState({
            deleteRequestDTO: deleteRequestDTO,
            deleteModalShow: true
        })
    };

    onPreviewHandler = async adId => {
        try {
            await this.previewApiCall(adId);
            let adminData = this.prepareDataForPreview(this.props.AdminPreviewReducer.adminPreviewData);
            this.setDataForPreview(adminData);
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.AdminPreviewReducer.adminPreviewErrorMessage
                    // e.errorMessage ? e.errorMessage: e.message
                }
            })
        }
    };

    onEditHandler = async id => {
        try {
            await this.previewApiCall(id);
            await this.prepareDataForEdit(this.props.AdminPreviewReducer.adminPreviewData);
        } catch (e) {
            console.log(e)
        }
    };

    onSubmitDeleteHandler = async () => {
        try {
            await this.props.deleteAdmin(
                DELETE_ADMIN,
                this.state.deleteRequestDTO
            );
            if (!this.checkIfDeletingOwnProfile(this.state.deleteRequestDTO.id)) {
                await this.setState({
                    deleteModalShow: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'}
                });
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "success",
                        message: this.props.AdminDeleteReducer.deleteSuccessMessage
                    }
                });
                await this.searchAdmins();
            }
        } catch (e) {
            this.setState({
                deleteModalShow: true,
            });
        }
    };

    onPasswordReset = async (id, username) => {
        this.props.clearAdminSuccessErrorMessagesFromStore();
        await this.setState({
            passwordResetDTO: {
                ...this.state.passwordResetDTO,
                username: username,
            },
            showPasswordResetModal: true
        })
    };

    resetPassword = async passwordObj => {
        let passwordResetObj = {
            username: this.state.passwordResetDTO.username,
            password: passwordObj.password,
            remarks: passwordObj.remarks
        };

        try {
            await this.props.resetPassword(RESET_PASSWORD, passwordResetObj);
            this.setState({
                alertMessageInfo: {
                    variant: 'success',
                    message: `Reset password successfully for ${passwordResetObj.username}.`
                },
                showPasswordResetModal: false,
                showAlert: true
            })
        } catch (e) {
            this.setState({
                passwordResetError: e.errorMessage ? e.errorMessage : `Error resetting password for ${passwordResetObj.username}.`
            })
        }
    };


    deleteRemarksHandler = event => {
        const {name, value} = event.target;
        let deleteRequest = {...this.state.deleteRequestDTO};
        deleteRequest[name] = value;
        this.setState({
            deleteRequestDTO: deleteRequest
        })
    };

    fetchActiveProfileLists = async () => {
        await this.props.fetchActiveProfileListForDropdown(FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN);
    };

    fetchProfileListByModule = async (moduleId) => {
        return await this.props.fetchProfileListBySubDepartmentId(FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID, moduleId);
    };

    fetchAdminCategories = async () => {
        await this.props.fetchActiveAdminCategoriesForDropdown(FETCH_ADMIN_CATEGORY_FOR_DROPDOWN);
    };

    fetchHospitals = async () => {
        await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN);
    };

    fetchModules = async () => {
        await this.props.fetchActiveModulesForDropdown(FETCH_MODULES_FOR_DROPDOWN);
        const {modulesForDropdown} = this.props.ApplicationModuleSetupReducer;
        let modules = [...modulesForDropdown];
        let modifiedModules = modules.map(moduleObj => (
            {
                ...moduleObj,
                isChecked: false,
                profileList: [],
                profileSelected: null,
                adminProfileId: '',
                isNew: true,
                status: 'Y'
            }
        ));
        this.setState({
            modules: [...modifiedModules]
        });
    };

    fetchAdminMetaInfosForDropdown = async () => {
        await this.props.fetchAdminMetaInfo(FETCH_ADMIN_META_INFO);
    };

    previewApiCall = async id => {
        await this.props.previewAdmin(FETCH_ADMIN_DETAILS, id);
    };

    searchAdmins = async (page) => {
        const {adminCategory, profile, status, metaInfo} = this.state.searchParameters;
        let searchData = {
            adminMetaInfoId: metaInfo && metaInfo.value,
            adminCategoryId: adminCategory && adminCategory.value,
            profileId: profile && profile.value,
            status: status && status.value !== 'A'
                ? status.value
                : ''
        };

        let updatedPage =
            this.state.queryParams.page === 0 ? 1 : (page ? page : this.state.queryParams.page);
        await this.props.fetchAdminList(
            SEARCH_ADMIN,
            {
                page: updatedPage,
                size: this.state.queryParams.size
            },
            searchData
        );

        await this.setState({
            totalRecords: this.props.AdminListReducer.adminList.length
                ? this.props.AdminListReducer.adminList[0].totalItems
                : 0,
            queryParams: {
                ...this.state.queryParams,
                page: updatedPage
            }
        })
    };

    editApiCall = async () => {
        const {
            id, hospital, fullName, email, mobileNumber, adminCategory, status, hasMacBinding,
            adminAvatar, remarks, adminAvatarUrlNew
        } = this.state.adminUpdateData;
        const {updatedMacIdList, updatedModulesAndProfiles} = this.state;

        let macAddressList = [], moduleProfileList = [];
        if (updatedMacIdList.length) {
            macAddressList = updatedMacIdList.map(value => {
                return {
                    id: value.id,
                    macAddress: value.macId,
                    status: value.status
                }
            })
        }

        if (updatedModulesAndProfiles.length) {
            moduleProfileList = updatedModulesAndProfiles.filter(module => module.isChecked).map(value => {
                return {
                    adminProfileId: value.adminProfileId,
                    profileId: value.profileSelected.value,
                    applicationModuleId: value.id,
                    status: value.status
                }
            })
        }
        let adminUpdateRequestDTO = {
            id,
            fullName,
            email,
            mobileNumber,
            status,
            hasMacBinding: hasMacBinding ? 'Y' : 'N',
            adminCategoryId: adminCategory.value,
            hospitalId: hospital.value,
            remarks: remarks,
            macAddressInfoUpdateRequestDTOS: [...macAddressList],
            adminProfileUpdateRequestDTOS: [...moduleProfileList],
            isAvatarUpdate: adminAvatarUrlNew ? 'Y' : 'N'
        };

        let formData = new FormData();
        adminAvatarUrlNew !== '' && formData.append('file', adminAvatar);
        try {
            await this.props.editAdmin(EDIT_ADMIN, adminUpdateRequestDTO, formData);
            this.resetAdminUpdateDataFromState();
            // this.checkIfEditedSelfAndShowMessage(adminUpdateRequestDTO.id);
            await this.searchAdmins();
        } catch (e) {

        }
    };

    appendSNToTable = adminList =>
        adminList.map((prof, index) => ({
            ...prof, sN: index + 1
        }));

    addMacIdObjectToMacIdList = (hasMacBinding) => {
        let tempArray = AdminSetupUtils.addRemoveMacAddressObject(hasMacBinding, this.state.adminUpdateData.macIdList);
        if (hasMacBinding) {
            this.setMacIdListInState(tempArray, tempArray);
        } else {
            let currentSelectedMacIds = [...this.state.updatedMacIdList];
            let updateMacIds = currentSelectedMacIds.map(currentSelectedMacId => currentSelectedMacId.status = 'N');
            this.setMacIdListInState(tempArray, updateMacIds);
        }
    };

    prepareDataForPreview = adminData => {
        let moduleAndProfileData = [], macIDs = [];
        if (adminData) {
            const {
                id, hospitalName, hospitalId, fullName, username, email, mobileNumber, adminCategoryName,
                adminCategoryId, status, hasMacBinding, fileUri, adminProfileResponseDTOS,
                macAddressInfoResponseDTOS, remarks
            } = adminData;

            if (adminProfileResponseDTOS && adminProfileResponseDTOS.length) {
                moduleAndProfileData = AdminSetupUtils.getModuleAndProfileData(adminProfileResponseDTOS);
            }
            if (macAddressInfoResponseDTOS && macAddressInfoResponseDTOS.length) {
                macIDs = AdminSetupUtils.getMacAddresses(macAddressInfoResponseDTOS);
            }
            return {
                id: id,
                hospital: {label: hospitalName, value: hospitalId},
                fullName: fullName,
                username: username,
                email: email,
                mobileNumber: mobileNumber,
                adminCategory: {label: adminCategoryName, value: adminCategoryId},
                status: status,
                hasMacBinding: hasMacBinding,
                macIdList: [...macIDs],
                adminAvatar: '',
                moduleList: [...moduleAndProfileData],
                remarks: remarks,
                adminAvatarUrl: fileUri,
                adminAvatarUrlNew: ''
            };
        }

    };

    prepareDataForEdit = async (adminData) => {
        let adminInfoObj = this.prepareDataForPreview(adminData);

        const {
            id, hospital, fullName, username, email, mobileNumber, adminCategory, status,
            hasMacBinding, macIdList, moduleList, adminAvatar, remarks, adminAvatarUrl
        } = adminInfoObj;

        const modulesWithProfileListAdded = JSON.stringify(
            [...await this.addProfileListToModuleList([...moduleList])]);

        this.setState({
            showEditModal: true,
            adminUpdateData: {
                ...this.state.adminUpdateData,
                id: id,
                hospital: hospital,
                fullName: fullName,
                username: username,
                email: email,
                mobileNumber: mobileNumber,
                adminCategory: adminCategory,
                status: status,
                hasMacBinding: hasMacBinding === 'Y',
                macIdList: [...macIdList],
                moduleList: JSON.parse(modulesWithProfileListAdded),
                adminAvatar: adminAvatar,
                adminAvatarUrl: adminAvatarUrl,
                adminCategoryList: [...this.props.AdminCategoryReducer.adminCategoriesForDropdown],
                hospitalList: [...this.props.HospitalSetupReducer.hospitalsForDropdown],
                remarks: remarks
            },
            updatedMacIdList: [...macIdList],
            updatedModulesAndProfiles: JSON.parse(modulesWithProfileListAdded),
        });
    };

    addProfileListToModuleList = async moduleList => {
        let selectedModules = [...moduleList];

        let modulesToAdd = this.state.modules.map(module => {
            let moduleToAdd = {...module};
            let moduleSelected = selectedModules.find(selectedMod => selectedMod.id === module.id);
            if (moduleSelected) {
                moduleToAdd.isChecked = moduleSelected.isChecked;
                moduleToAdd.profileList = moduleSelected.profileList;
                moduleToAdd.profileSelected = moduleSelected.profileSelected;
                moduleToAdd.adminProfileId = moduleSelected.adminProfileId;
                moduleToAdd.status = moduleSelected.isChecked ? 'Y' : 'N';
                moduleToAdd.isNew = false;
            }
            return moduleToAdd;
        });

        let modulesData = modulesToAdd.map(async module => {
            let profileList = [];
            if (module.isChecked) {
                profileList = await this.fetchProfileListByModule(module.id);
            }
            return {
                ...module,
                profileList: [...profileList]
            }
        });
        return Promise.all(modulesData);
    };

    initialAPICalls = () => {
        this.fetchAdminMetaInfosForDropdown();
        this.fetchActiveProfileLists();
        this.fetchAdminCategories();
        this.fetchHospitals();
        this.fetchModules();
        this.searchAdmins();
    };

    componentDidMount() {
        this.initialAPICalls()
    }

    render() {
        const {
            adminUpdateData, searchParameters, deleteRequestDTO, showAdminModal, deleteModalShow,
            totalRecords, queryParams, showEditModal, errorMessageForAdminName,
            errorMessageForAdminMobileNumber, showImageUploadModal, adminImage, adminImageCroppedUrl,
            showPasswordResetModal, passwordResetDTO, passwordResetError, adminMetaInfos, showProfileDetailModal,
            profileData
        } = this.state;

        const {adminCategoriesForDropdown} = this.props.AdminCategoryReducer;

        const {activeProfilesForDropdown} = this.props.ProfileSetupReducer;

        const {
            isSearchLoading,
            adminList,
            searchErrorMessage
        } = this.props.AdminListReducer;

        const {adminErrorMessage} = this.props.AdminEditReducer;

        const {deleteErrorMessage} = this.props.AdminDeleteReducer;

        const {adminMetaInfoForDropdown} = this.props.AdminSetupReducer;
        return <>
            <div className="">
                <AdminSetupSearchFilter
                    onInputChange={this.handleSearchFormChange}
                    searchParameters={searchParameters}
                    resetSearchForm={this.handleSearchFormReset}
                    adminCategoryList={adminCategoriesForDropdown}
                    profileList={activeProfilesForDropdown}
                    adminMetaInfos={adminMetaInfoForDropdown}
                    onSearchClick={() => this.searchAdmins(1)}
                />
            </div>

            <div className=" mb-2">
                <AdminDetailsDataTable
                    filteredActions={this.props.filteredAction}
                    showAdminModal={showAdminModal}
                    isSearchLoading={isSearchLoading}
                    searchData={this.appendSNToTable(adminList)}
                    searchErrorMessage={searchErrorMessage}
                    setShowModal={this.setShowModal}
                    onDeleteHandler={this.onDeleteHandler}
                    onEditHandler={this.onEditHandler}
                    onPreviewHandler={this.onPreviewHandler}
                    onPasswordReset={this.onPasswordReset}
                    adminPreviewData={adminUpdateData}
                    totalItems={totalRecords}
                    maxSize={queryParams.size}
                    currentPage={queryParams.page}
                    handlePageChange={this.handlePageChange}
                    deleteModalShow={deleteModalShow}
                    onSubmitDelete={this.onSubmitDeleteHandler}
                    remarksHandler={this.deleteRemarksHandler}
                    remarks={deleteRequestDTO.remarks}
                    deleteErrorMsg={deleteErrorMessage}
                />
            </div>
            {showEditModal &&
            <AdminEditModal
                adminUpdateData={adminUpdateData}
                onEnterKeyPress={this.handleEnter}
                onInputChange={this.handleOnChange}
                onMacIdChange={this.handleMacIdChange}
                onAddMoreMacId={this.handleAddMoreMacId}
                onRemoveMacId={this.handleRemoveMacId}
                onModuleChange={this.handleModuleChange}
                onProfileChange={this.handleProfileChange}
                errorMessageForAdminName={errorMessageForAdminName}
                errorMessageForAdminMobileNumber={errorMessageForAdminMobileNumber}
                showModal={showEditModal}
                showImageUploadModal={showImageUploadModal}
                setImageShowModal={this.setImageShowModal}
                setShowModal={this.resetImageIfSelectedOnCloseOrCancel}
                onImageUpload={(data) => this.handleImageUpload(data)}
                adminImage={adminImage}
                adminCroppedImage={adminImageCroppedUrl}
                onImageSelect={this.handleImageSelect}
                onImageCrop={this.handleCropImage}
                editApiCall={this.editApiCall}
                errorMessage={adminErrorMessage}
                viewProfileDetails={this.handleViewProfileDetails}
            />
            }
            {showPasswordResetModal &&
            <PasswordResetModal
                showPasswordResetModal={showPasswordResetModal}
                setShowModal={this.setShowModal}
                resetPassword={this.resetPassword}
                passwordResetData={passwordResetDTO}
                errorMessage={passwordResetError}
            />
            }
            {
                showProfileDetailModal &&
                <PreviewRoles
                    showModal={showProfileDetailModal}
                    setShowModal={this.closeProfileDetailsViewModal}
                    profileData={profileData}
                    rolesJson={rolesFromJson}/>
            }
            <CAlert id="admin-manage"
                    variant={this.state.alertMessageInfo.variant}
                    show={this.state.showAlert}
                    onClose={this.closeAlert}
                    alertType={this.state.alertMessageInfo.variant === "success" ?
                        <><i className="fa fa-check-circle" aria-hidden="true"> </i></>
                        : <><i className="fa fa-exclamation-triangle" aria-hidden="true"> </i>
                        </>}
                    message={this.state.alertMessageInfo.message}
            />
        </>
    }

}

export default ConnectHoc(AdminManage,
    [
        'AdminSetupReducer',
        'AdminListReducer',
        'AdminDeleteReducer',
        'AdminEditReducer',
        'AdminPreviewReducer',
        'AdminCategoryReducer',
        'ProfileSetupReducer',
        'HospitalSetupReducer',
        'ApplicationModuleSetupReducer',
        'logoutReducer',
        'ProfilePreviewReducer'
    ],
    {
        clearAdminSuccessErrorMessagesFromStore,
        fetchAdminList,
        fetchActiveProfileListForDropdown,
        fetchActiveModulesForDropdown,
        previewAdmin,
        deleteAdmin,
        editAdmin,
        fetchProfileListBySubDepartmentId,
        fetchActiveAdminCategoriesForDropdown,
        fetchActiveHospitalsForDropdown,
        resetPassword,
        fetchAdminMetaInfo,
        logoutUser,
        previewProfile
    });
