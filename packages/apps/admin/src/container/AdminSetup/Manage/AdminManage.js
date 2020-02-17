import React, {PureComponent} from 'react';
import AdminSetupSearchFilter from "./AdminSetupSearchFilter";
import {ConnectHoc} from "@frontend-appointment/commons";
import {
    clearAdminSuccessErrorMessagesFromStore,
    deleteAdmin,
    DepartmentSetupMiddleware,
    editAdmin,
    fetchActiveProfileListForDropdown,
    fetchActiveProfilesByDepartmentId,
    fetchAdminList,
    fetchAdminMetaInfo,
    HospitalSetupMiddleware,
    logoutUser,
    previewAdmin,
    previewProfile,
    resetPassword,
} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import AdminDetailsDataTable from "./AdminDetailsDataTable";
import {CAlert, CLoading} from "@frontend-appointment/ui-elements";
import AdminEditModal from "./AdminEditModal";
import {
    AdminSetupUtils,
    EnterKeyPressUtils,
    menuRoles,
    ProfileSetupUtils,
    TryCatchHandler
} from "@frontend-appointment/helpers";
import PasswordResetModal from "./PasswordResetModal";
import "./../admin-setup.scss";
import PreviewRoles from "../../CommonComponents/PreviewRoles";

const {SEARCH_ADMIN, FETCH_ADMIN_DETAILS, EDIT_ADMIN, DELETE_ADMIN, FETCH_ADMIN_META_INFO, RESET_PASSWORD} =
    AdminModuleAPIConstants.adminSetupAPIConstants;

const {FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN, FETCH_ACTIVE_PROFILES_BY_DEPARTMENT_ID, FETCH_PROFILE_DETAILS} =
    AdminModuleAPIConstants.profileSetupAPIConstants;

const {FETCH_DEPARTMENTS_FOR_DROPDOWN, FETCH_DEPARTMENTS_FOR_DROPDOWN_BY_HOSPITAL} =
    AdminModuleAPIConstants.departmentSetupAPIConstants;

const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;

const {fetchActiveDepartmentsByHospitalId, fetchActiveDepartmentsForDropdown} = DepartmentSetupMiddleware;

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
            hospital: '',
            department: '',
            profile: '',
            genderCode: '',
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
            department: null,
            profile: null,
            fullName: '',
            username: '',
            email: '',
            password: '',
            mobileNumber: '',
            genderCode: '',
            status: 'Y',
            hasMacBinding: '',
            macIdList: [],
            adminAvatar: null,
            adminAvatarUrl: '',
            adminAvatarUrlNew: '',
            formValid: false,
            remarks: '',
            fullNameValid: true,
            emailValid: true,
            mobileNumberValid: true,
            departmentList: [],
            profileList: []
        },
        errorMessageForAdminName: 'Admin Name should not contain special characters.',
        errorMessageForAdminMobileNumber: 'Mobile number should be of 10 digits.',
        showImageUploadModal: false,
        updatedMacIdList: [],
        adminImage: '',
        adminImageCroppedUrl: '',
        adminFileCropped: '',
        adminMetaInfos: [],
        profileData: {},
        showProfileDetailModal: false,
        errorMessage: ''
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
                adminAvatarUrlNew: ''
            },
            adminImage: '',
            adminImageCroppedUrl: '',
            adminFileCropped: '',
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
            id, hospital, department, profile, fullName, username, email, mobileNumber, adminCategory, genderCode, status,
            hasMacBinding, macIdList, adminAvatar, remarks, adminAvatarUrl
        } = adminData;

        console.log("Admin url", adminData);
        await this.setState({
            showAdminModal: true,
            showAlert: false,
            adminUpdateData: {
                ...this.state.adminUpdateData,
                id: id,
                hospital: {...hospital},
                department: {...department},
                profile: {...profile},
                fullName: fullName,
                username: username,
                email: email,
                mobileNumber: mobileNumber,
                adminCategory: {...adminCategory},
                genderCode: genderCode,
                status: status,
                hasMacBinding: hasMacBinding,
                macIdList: [...macIdList],
                adminAvatar: adminAvatar,
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
            hospital, department, profile, fullName, username, email, mobileNumber, genderCode, fullNameValid,
            emailValid, mobileNumberValid, remarks
        } = this.state.adminUpdateData;

        let formValidity = hospital && department && profile && fullNameValid && fullName && username && emailValid
            && email && mobileNumberValid && mobileNumber && remarks && genderCode;

        this.setState({
            adminUpdateData: {
                ...this.state.adminUpdateData,
                formValid: Boolean(formValidity)
            }
        })
    };

    checkIfDeletingOwnProfile = async deletedAdminId => {
        let loggedInAdminInfo = JSON.parse(localStorage.getItem("adminInfo"));
        if (loggedInAdminInfo && deletedAdminId === loggedInAdminInfo.adminId) {
            await this.logoutUser();
            this.props.history.push('/');
        }
        return false;
    };

    checkIfSelfEditAndShowMessage = async editedAdminId => {
        let variantType = '', message = '';
        let loggedInAdminInfo = JSON.parse(localStorage.getItem("adminInfo"));
        if (loggedInAdminInfo && editedAdminId === loggedInAdminInfo.adminId) {
            variantType = "warning";
            message = "You seem to have edited yourself. Please Logout and Login to see the changes or " +
                "you'll be automatically logged out in 10s";
            this.automaticLogoutUser();
        } else {
            variantType = "success";
            message = this.props.AdminEditReducer.adminSuccessMessage;
        }
        this.setState({
            showAlert: true,
            alertMessageInfo: {
                variant: variantType,
                message: message
            }
        });

    };

    automaticLogoutUser = () => {
        setTimeout(() => this.logoutUser(), 10000)
    };

    logoutUser = async () => {
        try {
            let logoutResponse = await this.props.logoutUser('/cogent/logout');
            if (logoutResponse) {
                this.props.history.push('/');
            }
        } catch (e) {

        }
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
                hospital: null,
                department: null,
                profile: null,
                genderCode: null,
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
            switch (fieldName) {
                case "hospital":
                    this.actionsOnHospitalChange(value);
                    break;
                case "department":
                    this.actionsOnDepartmentChange(value);
                    break;
                case "hasMacBinding":
                    this.addMacIdObjectToMacIdList(value);
                    break;
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
                errorMessage: e.errorMessage ? e.errorMessage : 'Error viewing profile details.'
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
            let selfDelete = await this.checkIfDeletingOwnProfile(this.state.deleteRequestDTO.id);
            if (!selfDelete) {
                await this.setState({
                    deleteModalShow: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
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

    fetchHospitals = async () => {
        await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN);
    };

    fetchDepartments = async () => {
        await TryCatchHandler.genericTryCatch(this.props.fetchActiveDepartmentsForDropdown(FETCH_DEPARTMENTS_FOR_DROPDOWN));
    };

    fetchDepartmentsByHospitalId = async value => {
        value && await this.props.fetchActiveDepartmentsByHospitalId(FETCH_DEPARTMENTS_FOR_DROPDOWN_BY_HOSPITAL, value);
    };

    fetchProfilesByDepartmentId = async value => {
        value && await this.props.fetchActiveProfilesByDepartmentId(FETCH_ACTIVE_PROFILES_BY_DEPARTMENT_ID, value);
    };

    fetchActiveProfileLists = async () => {
        await this.props.fetchActiveProfileListForDropdown(FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN);
    };

    fetchAdminMetaInfosForDropdown = async () => {
        await this.props.fetchAdminMetaInfo(FETCH_ADMIN_META_INFO);
    };

    previewApiCall = async id => {
        await this.props.previewAdmin(FETCH_ADMIN_DETAILS, id);
    };

    searchAdmins = async (page) => {
        const {metaInfo, hospital, department, profile, genderCode, status,} = this.state.searchParameters;
        let searchData = {
            adminMetaInfoId: metaInfo && metaInfo.value,
            hospitalId: hospital && hospital.value,
            departmentId: department && department.value,
            profileId: profile && profile.value,
            genderCode: genderCode && genderCode.value,
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
            id, hospital, profile, fullName, email, mobileNumber, adminCategory, status, hasMacBinding,
            adminAvatar, remarks, adminAvatarUrlNew, genderCode
        } = this.state.adminUpdateData;
        const {updatedMacIdList} = this.state;

        let macAddressList = [];
        if (updatedMacIdList.length) {
            macAddressList = updatedMacIdList.map(value => {
                return {
                    id: value.id,
                    macAddress: value.macId,
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
            genderCode,
            hasMacBinding: hasMacBinding ? 'Y' : 'N',
            hospitalId: hospital.value,
            profileId: profile.value,
            remarks: remarks,
            macAddressUpdateInfo: [...macAddressList],
            isAvatarUpdate: adminAvatarUrlNew ? 'Y' : 'N'
        };

        let formData = new FormData();
        adminAvatarUrlNew !== '' && formData.append('file', adminAvatar);
        try {
            await this.props.editAdmin(EDIT_ADMIN, adminUpdateRequestDTO, formData);
            this.resetAdminUpdateDataFromState();
            this.checkIfSelfEditAndShowMessage(adminUpdateRequestDTO.id);
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

    actionsOnHospitalChange = async value => {
        if (value) {
            await this.fetchDepartmentsByHospitalId(value);
            const {departmentsByHospital} = this.props.DepartmentSetupReducer;
            this.setState({
                adminUpdateData: {
                    ...this.state.adminUpdateData,
                    department: null,
                    profile: null,
                    departmentList: departmentsByHospital ? departmentsByHospital : [],
                    profileList: []
                }

            })
        } else {
            this.setState({
                adminUpdateData: {
                    ...this.state.adminUpdateData,
                    department: null,
                    profile: null,
                    departmentList: [],
                    profileList: []
                }
            })
        }
    };

    actionsOnDepartmentChange = async value => {
        if (value) {
            await this.fetchProfilesByDepartmentId(value);
            const {activeProfilesByDepartmentId} = this.props.ProfileSetupReducer;
            this.setState({
                adminUpdateData: {
                    ...this.state.adminUpdateData,
                    profile: null,
                    profileList: activeProfilesByDepartmentId ? activeProfilesByDepartmentId : [],
                }
            })
        } else {
            this.setState({
                adminUpdateData: {
                    ...this.state.adminUpdateData,
                    profile: null,
                    profileList: []
                }
            })
        }
    };

    prepareDataForPreview = adminData => {
        let macIDs = [];
        if (adminData) {
            const {
                id, hospitalName, hospitalId, departmentId, departmentName, profileId, profileName, fullName, username,
                email, mobileNumber, gender, status, hasMacBinding, fileUri, adminMacAddressInfo, remarks
            } = adminData;

            if (adminMacAddressInfo && adminMacAddressInfo.length) {
                macIDs = AdminSetupUtils.getMacAddresses(adminMacAddressInfo);
            }

            return {
                id: id,
                hospital: {label: hospitalName, value: hospitalId},
                department: {label: departmentName, value: departmentId},
                profile: {label: profileName, value: profileId},
                fullName: fullName,
                username: username,
                email: email,
                mobileNumber: mobileNumber,
                genderCode: gender === "FEMALE" ? "F" : gender === "MALE" ? "M" : "O",
                status: status,
                hasMacBinding: hasMacBinding === 'Y' ? true : false,
                macIdList: [...macIDs],
                adminAvatar: '',
                remarks: remarks,
                adminAvatarUrl: fileUri,
                adminAvatarUrlNew: ''
            };
        }

    };

    prepareDataForEdit = async (adminData) => {
        let adminInfoObj = this.prepareDataForPreview(adminData);

        const {
            id, hospital, department, profile, fullName, username, email, mobileNumber, genderCode, status,
            hasMacBinding, macIdList, adminAvatar, remarks, adminAvatarUrl
        } = adminInfoObj;

        await this.fetchDepartmentsByHospitalId(hospital.value);
        await this.fetchProfilesByDepartmentId(department.value);

        this.setState({
            showEditModal: true,
            adminUpdateData: {
                ...this.state.adminUpdateData,
                id: id,
                hospital: hospital,
                department: department,
                profile: profile,
                fullName: fullName,
                username: username,
                email: email,
                mobileNumber: mobileNumber,
                status: status,
                genderCode: genderCode,
                hasMacBinding: hasMacBinding === 'Y',
                macIdList: [...macIdList],
                adminAvatar: adminAvatar,
                adminAvatarUrl: adminAvatarUrl,
                hospitalList: [...this.props.HospitalDropdownReducer.hospitalsForDropdown],
                departmentList: [...this.props.DepartmentSetupReducer.departmentsByHospital],
                profileList: [...this.props.ProfileSetupReducer.activeProfilesByDepartmentId],
                remarks: ''
            },
            updatedMacIdList: [...macIdList],
        });
    };

    initialAPICalls = () => {
        this.fetchAdminMetaInfosForDropdown();
        this.fetchActiveProfileLists();
        this.fetchHospitals();
        this.fetchDepartments();
        this.searchAdmins();
    };

    componentDidMount() {
        this.initialAPICalls()
    }


    componentWillUnmount() {
        clearTimeout(this.automaticLogoutUser);
    }

    render() {
        const {
            adminUpdateData, searchParameters, deleteRequestDTO, showAdminModal, deleteModalShow,
            totalRecords, queryParams, showEditModal, errorMessageForAdminName,
            errorMessageForAdminMobileNumber, showImageUploadModal, adminImage, adminImageCroppedUrl,
            showPasswordResetModal, passwordResetDTO, passwordResetError, showProfileDetailModal,
            profileData, errorMessage
        } = this.state;

        const {activeProfilesForDropdown} = this.props.ProfileSetupReducer;

        const {
            isSearchLoading,
            adminList,
            searchErrorMessage
        } = this.props.AdminListReducer;

        const {adminErrorMessage, isAdminEditLoading} = this.props.AdminEditReducer;

        const {deleteErrorMessage} = this.props.AdminDeleteReducer;

        const {adminMetaInfoForDropdown} = this.props.AdminSetupReducer;

        const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;

        const {departments, departmentsByHospital} = this.props.DepartmentSetupReducer;

        return <>
            <div className="">
                <AdminSetupSearchFilter
                    onInputChange={this.handleSearchFormChange}
                    searchParameters={searchParameters}
                    resetSearchForm={this.handleSearchFormReset}
                    hospitalList={hospitalsForDropdown}
                    departmentList={departments}
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
                errorMessage={adminErrorMessage || errorMessage}
                viewProfileDetails={this.handleViewProfileDetails}
                isAdminEditLoading={isAdminEditLoading}
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
                    rolesJson={menuRoles}/>
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
        'HospitalDropdownReducer',
        'DepartmentSetupReducer',
        'ProfileSetupReducer',
        'ProfilePreviewReducer',
        'logoutReducer',
    ],
    {
        clearAdminSuccessErrorMessagesFromStore,
        fetchAdminList,
        previewAdmin,
        deleteAdmin,
        editAdmin,
        fetchActiveHospitalsForDropdown,
        fetchActiveDepartmentsByHospitalId,
        fetchActiveDepartmentsForDropdown,
        fetchActiveProfilesByDepartmentId,
        fetchActiveProfileListForDropdown,
        fetchAdminMetaInfo,
        resetPassword,
        logoutUser,
        previewProfile
    });
