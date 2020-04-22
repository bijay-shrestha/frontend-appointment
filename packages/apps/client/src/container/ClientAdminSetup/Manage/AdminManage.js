import React, {PureComponent} from 'react'
import AdminSetupSearchFilter from './AdminSetupSearchFilter'
import {ConnectHoc} from '@frontend-appointment/commons'
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
    DashboardDetailsMiddleware,
    savePinOrUnpinUserMenu
} from '@frontend-appointment/thunk-middleware'
import {
    AdminModuleAPIConstants,
    CommonAPIConstants
} from '@frontend-appointment/web-resource-key-constants'
import AdminDetailsDataTable from './AdminDetailsDataTable'
import {CAlert} from '@frontend-appointment/ui-elements'
import AdminEditModal from './AdminEditModal'
import {
    AdminSetupUtils,
    EnterKeyPressUtils, EnvironmentVariableGetter,
    LocalStorageSecurity,
    menuRoles,
    ProfileSetupUtils,
    TryCatchHandler
} from '@frontend-appointment/helpers'
import PasswordResetModal from './PasswordResetModal'
import './../admin-setup.scss'
import PreviewRoles from '../../CommonComponents/PreviewRoles'

const {
    SEARCH_ADMIN,
    FETCH_ADMIN_DETAILS,
    EDIT_ADMIN,
    DELETE_ADMIN,
    FETCH_ADMIN_META_INFO,
    RESET_PASSWORD
} = AdminModuleAPIConstants.adminSetupAPIConstants

const {
    FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN,
    FETCH_ACTIVE_PROFILES_BY_DEPARTMENT_ID,
    FETCH_PROFILE_DETAILS
} = AdminModuleAPIConstants.profileSetupAPIConstants

const {
    FETCH_DEPARTMENTS_FOR_DROPDOWN,
    FETCH_DEPARTMENTS_FOR_DROPDOWN_BY_HOSPITAL
} = AdminModuleAPIConstants.departmentSetupAPIConstants

const {
    FETCH_HOSPITALS_FOR_DROPDOWN
} = AdminModuleAPIConstants.hospitalSetupApiConstants

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware

const {
    fetchActiveDepartmentsByHospitalId,
    fetchActiveDepartmentsForDropdown
} = DepartmentSetupMiddleware

const {
    fetchDashboardFeatures,
    fetchDashboardFeaturesByAdmin
} = DashboardDetailsMiddleware
const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant
const {ADMIN_FEATURE} = CommonAPIConstants

class AdminManage extends PureComponent {
    state = {
        showAdminModal: false,
        showEditModal: false,
        deleteModalShow: false,
        showPasswordResetModal: false,
        isPasswordResetPending: false,
        passwordResetDTO: {
            email: '',
            password: '',
            remarks: '',
            id: ''
        },
        passwordResetError: '',
        searchParameters: {
            metaInfo: '',
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
            department: null,
            profile: null,
            fullName: '',
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
            profileList: [],
            adminDashboardRequestDTOS: []
        },
        adminDashBoardRole: [],
        errorMessageForAdminName:
            'Admin Name should not contain special characters.',
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
    }

    timer = ''

    resetAdminUpdateDataFromState = () => {
        this.setState({
            adminUpdateData: {
                ...this.state.departmentUpdateData,
                fullName: '',
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
                adminDashboardRequestDTOS: []
            },
            adminImage: '',
            adminImageCroppedUrl: '',
            adminFileCropped: '',
            showEditModal: false,
            updatedMacIdList: [],
            updatedModulesAndProfiles: []
        })
    }

    resetImageIfSelectedOnCloseOrCancel = () => {
        this.setState({
            adminUpdateData: {
                ...this.state.adminUpdateData,
                adminAvatarUrlNew: ''
            },
            showEditModal: false
        })
    }

    closeProfileDetailsViewModal = () => {
        this.setState({
            showProfileDetailModal: false
        })
    }

    setShowModal = () => {
        this.setState({
            showAdminModal: false,
            deleteModalShow: false,
            showEditModal: false,
            showPasswordResetModal: false
        })
    }

    setImageShowModal = () =>
        this.setState({showImageUploadModal: !this.state.showImageUploadModal})

    setStateValuesForSearch = (key, value, label) => {
        label
            ? value
            ? this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    [key]: {value, label}
                }
            })
            : this.setState({
                searchParameters: {...this.state.searchParameters, [key]: null}
            })
            : this.setState({
                searchParameters: {...this.state.searchParameters, [key]: value}
            })
    }

    savePinOrUnpinUserMenu = async () => {
        await this.props.savePinOrUnpinUserMenu(ADMIN_FEATURE, {
            isSideBarCollapse: !(
                Boolean(LocalStorageSecurity.localStorageDecoder('isOpen')) || false
            )
        })
    }

    setUpdatedValuesInState = (key, value, label, fieldValid) =>
        label
            ? value
            ? this.setState({
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
                    [key]: value,
                    [key + 'Valid']: fieldValid
                }
            })

    setMacIdListInState = (macIds, updatedMacIds) =>
        this.setState({
            adminUpdateData: {
                ...this.state.adminUpdateData,
                macIdList: [...macIds]
            },
            updatedMacIdList: [...updatedMacIds]
        })

    setModulesInState = (modules, updatedModules) =>
        this.setState({
            adminUpdateData: {
                ...this.state.adminUpdateData,
                moduleList: [...modules]
            },
            updatedModulesAndProfiles: [...updatedModules]
        })

    setDataForPreview = async (adminData, value) => {
        const {
            id,
            department,
            profile,
            fullName,
            email,
            mobileNumber,
            adminCategory,
            genderCode,
            status,
            hasMacBinding,
            macIdList,
            adminAvatar,
            remarks,
            adminAvatarUrl
        } = adminData

        console.log('Admin url', adminData)
        await this.setState({
            showAdminModal: true,
            showAlert: false,
            adminUpdateData: {
                ...this.state.adminUpdateData,
                id: id,
                department: {...department},
                profile: {...profile},
                fullName: fullName,
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
                adminAvatarUrlNew: '',
                adminDashboardRequestDTOS:
                    value && value.length
                        ? [...value.map(val => ({...val, status: 'Y'}))]
                        : []
            }
        })
    }

    closeAlert = () => {
        this.props.clearAdminSuccessErrorMessagesFromStore()
        this.setState({
            showAlert: !this.state.showAlert
        })
    }

    validateMacId = macId => {
        let macIdPattern = /^([0-9a-fA-F]{2}[:.-]){5}[0-9a-fA-F]{2}$/
        return macIdPattern.test(macId)
    }

    checkFormValidity = () => {
        const {
            department,
            profile,
            fullName,
            email,
            mobileNumber,
            genderCode,
            fullNameValid,
            emailValid,
            mobileNumberValid,
            remarks
        } = this.state.adminUpdateData

        let formValidity =
            department &&
            profile &&
            fullNameValid &&
            fullName &&
            emailValid &&
            email &&
            mobileNumberValid &&
            mobileNumber &&
            remarks &&
            genderCode

        this.setState({
            adminUpdateData: {
                ...this.state.adminUpdateData,
                formValid: Boolean(formValidity)
            }
        })
    }

    checkIfDeletingOwnProfile = async deletedAdminId => {
        let loggedInAdminInfo = LocalStorageSecurity.localStorageDecoder(
            'adminInfo'
        )
        if (loggedInAdminInfo && deletedAdminId === loggedInAdminInfo.adminId) {
            await this.logoutUser()
            this.props.history.push('/')
        }
        return false
    }

    checkIfSelfEditAndShowMessage = async editedAdminId => {
        let variantType = '',
            message = ''
        let loggedInAdminInfo = LocalStorageSecurity.localStorageDecoder(
            'adminInfo'
        )
        if (loggedInAdminInfo && editedAdminId === loggedInAdminInfo.adminId) {
            variantType = 'warning'
            message =
                'You seem to have edited yourself. Please Logout and Login to see the changes or ' +
                "you'll be automatically logged out in 10s"
            this.automaticLogoutUser()
        } else {
            variantType = 'success'
            message = this.props.AdminEditReducer.adminSuccessMessage
        }
        this.setState({
            showAlert: true,
            alertMessageInfo: {
                variant: variantType,
                message: message
            }
        })
    }

    automaticLogoutUser = () => {
        this.timer = setTimeout(() => this.logoutUser(), 10000)
    }

    logoutUser = async () => {
        try {
            await this.savePinOrUnpinUserMenu()
            let logoutResponse = await this.props.logoutUser('/cogent/logout')
            if (logoutResponse) {
                this.props.history.push('/')
            }
        } catch (e) {
        }
    }

    handleSearchFormChange = async event => {
        if (event) {
            let fieldName = event.target.name
            let value = event.target.value
            let label = event.target.label
            await this.setStateValuesForSearch(fieldName, value, label)
        }
    }

    handleSearchFormReset = async () => {
        await this.setState({
            searchParameters: {
                ...this.state.searchParameters,
                metaInfo: null,
                department: null,
                profile: null,
                genderCode: null,
                status: {value: 'A', label: 'All'}
            }
        })
        this.searchAdmins()
    }

    handlePageChange = async newPage => {
        await this.setState({
            queryParams: {
                ...this.state.queryParams,
                page: newPage
            }
        })
        this.searchAdmins()
    }

    handleEnter = event => {
        EnterKeyPressUtils.handleEnter(event)
    }

    handleOnChange = async (event, fieldValid) => {
        if (event) {
            let fieldName = event.target.name
            let value =
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value
            let label = event.target.label
            await this.setUpdatedValuesInState(fieldName, value, label, fieldValid)
            switch (fieldName) {
                case 'department':
                    this.actionsOnDepartmentChange(value)
                    break
                case 'hasMacBinding':
                    this.addMacIdObjectToMacIdList(value)
                    break
            }
            this.checkFormValidity()
        }
    }

    handleMacIdChange = (event, index) => {
        let macIdValue = event.target.value
        let macIds = [...this.state.adminUpdateData.macIdList]
        let currentUpdatedMacIds = [...this.state.updatedMacIdList]
        let macIdAlreadyExists =
            macIds.length > 0 && macIds.find(macId => macId.macId === macIdValue)
        macIds[index].macId = macIdValue
        currentUpdatedMacIds[index].macId = macIdValue
        macIds[index].errorMessage =
            macIdValue &&
            (!this.validateMacId(macIdValue)
                ? 'Invalid MAC Id.'
                : macIdAlreadyExists
                    ? 'MAC Id Already added.'
                    : '')
        this.setMacIdListInState(macIds, currentUpdatedMacIds)
    }

    handleAddMoreMacId = () => {
        this.addMacIdObjectToMacIdList(true)
    }

    handleRemoveMacId = (macId, index) => {
        let macIds = [...this.state.adminUpdateData.macIdList]
        let currentMacIds = [...this.state.updatedMacIdList]
        if (!macIds[index].isNew) {
            let removedIndex = currentMacIds.findIndex(
                currentMacId => currentMacId.id === macIds[index].id
            )
            currentMacIds[removedIndex].status = 'N'
        } else {
            currentMacIds.splice(index, 1)
        }
        macIds.splice(index, 1)
        this.setMacIdListInState(macIds, currentMacIds)
    }

    handleModuleChange = async (subDepartmentId, index) => {
        let modules = [...this.state.adminUpdateData.moduleList]
        let currentUpdatedModules = [...this.state.updatedModulesAndProfiles]
        modules[index].isChecked = !modules[index].isChecked
        currentUpdatedModules[index].isChecked = !currentUpdatedModules[index]
            .isChecked
        if (modules[index].isChecked) {
            if (!modules[index].isNew) {
                currentUpdatedModules[index].status = 'Y'
                modules[index].profileList = currentUpdatedModules[index].profileList
                modules[index].profileSelected =
                    currentUpdatedModules[index].profileSelected
            } else {
                currentUpdatedModules[index].status = 'Y'
                let profileList = currentUpdatedModules[index].profileList.length
                    ? currentUpdatedModules[index].profileList
                    : await this.fetchProfileListByModule(subDepartmentId)
                modules[index].profileList = profileList ? [...profileList] : []
                currentUpdatedModules[index].profileList = currentUpdatedModules[index]
                    .profileList.length && [...profileList]
            }
        } else {
            currentUpdatedModules[index].status = 'N'
            modules[index].profileList = []
            modules[index].profileSelected = null
        }
        await this.setModulesInState(modules, currentUpdatedModules)
        this.checkFormValidity()
    }

    handleProfileChange = (event, index) => {
        let modules = [...this.state.adminUpdateData.moduleList]
        let currentUpdatedModulesAndProfile = [
            ...this.state.updatedModulesAndProfiles
        ]
        if (event.target.value) {
            let profileObj = {
                label: event.target.label,
                value: event.target.value
            }
            modules[index].profileSelected = {...profileObj}
            currentUpdatedModulesAndProfile[index].profileSelected = {...profileObj}
        } else {
            modules[index].profileSelected = null
            currentUpdatedModulesAndProfile[index].profileSelected = null
        }
        this.setModulesInState(modules, currentUpdatedModulesAndProfile)
        this.checkFormValidity()
    }

    handleImageSelect = imageUrl => {
        imageUrl && this.setState({adminImage: imageUrl})
    }

    handleCropImage = croppedImageUrl => {
        croppedImageUrl &&
        this.setState({
            adminImageCroppedUrl: croppedImageUrl
        })
    }

    handleImageUpload = async croppedImageFile => {
        let croppedImage = this.state.adminImageCroppedUrl
        await this.setState({
            adminUpdateData: {
                ...this.state.adminUpdateData,
                adminAvatar: new File([croppedImageFile], 'adminAvatar.jpeg'),
                adminAvatarUrlNew: croppedImage
            },
            showImageUploadModal: false
        })
    }

    handleViewProfileDetails = async profileId => {
        try {
            await this.fetchProfileDetails(profileId)
            const {profilePreviewData} = this.props.ProfilePreviewReducer

            let profileData =
                profilePreviewData &&
                (await ProfileSetupUtils.prepareProfilePreviewData(profilePreviewData))
            this.setState({
                profileData,
                showProfileDetailModal: true
            })
        } catch (e) {
            this.setState({
                errorMessage: e.errorMessage
                    ? e.errorMessage
                    : 'Error viewing profile details.'
            })
        }
    }

    fetchProfileDetails = async profileId => {
        await this.props.previewProfile(FETCH_PROFILE_DETAILS, profileId)
    }

    onDeleteHandler = async id => {
        this.props.clearAdminSuccessErrorMessagesFromStore()
        let deleteRequestDTO = {...this.state.deleteRequestDTO}
        deleteRequestDTO['id'] = id
        await this.setState({
            deleteRequestDTO: deleteRequestDTO,
            deleteModalShow: true
        })
    }

    onPreviewHandler = async adId => {
        this.props.clearAdminSuccessErrorMessagesFromStore()
        const response = await this.props.fetchDashboardFeaturesByAdmin(
            DASHBOARD_FEATURE,
            adId
        )
        try {
            await this.previewApiCall(adId)
            let adminData = this.prepareDataForPreview(
                this.props.AdminPreviewReducer.adminPreviewData
            )
            this.setDataForPreview(adminData, response.data)
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: 'danger',
                    message: this.props.AdminPreviewReducer.adminPreviewErrorMessage
                    // e.errorMessage ? e.errorMessage: e.message
                }
            })
        }
    }

    onEditHandler = async id => {
        this.props.clearAdminSuccessErrorMessagesFromStore()
        const response = await this.props.fetchDashboardFeaturesByAdmin(
            DASHBOARD_FEATURE,
            id
        )
        try {
            await this.previewApiCall(id)
            await this.prepareDataForEdit(
                this.props.AdminPreviewReducer.adminPreviewData,
                response.data
            )
        } catch (e) {
            console.log(e)
        }
    }

    onSubmitDeleteHandler = async () => {
        try {
            await this.props.deleteAdmin(DELETE_ADMIN, this.state.deleteRequestDTO)
            let selfDelete = await this.checkIfDeletingOwnProfile(
                this.state.deleteRequestDTO.id
            )
            if (!selfDelete) {
                await this.setState({
                    deleteModalShow: false,
                    deleteRequestDTO: {id: 0, remarks: '', status: 'D'},
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.AdminDeleteReducer.deleteSuccessMessage
                    }
                })
                await this.searchAdmins()
            }
        } catch (e) {
            this.setState({
                deleteModalShow: true
            })
        }
    }

    onPasswordReset = async (id, data) => {
        this.props.clearAdminSuccessErrorMessagesFromStore()
        await this.setState({
            passwordResetDTO: {
                ...this.state.passwordResetDTO,
                email: data.email,
                id: id
            },
            showPasswordResetModal: true
        })
    }

    resetPassword = async passwordObj => {
        let passwordResetObj = {
            password: passwordObj.password,
            remarks: passwordObj.remarks,
            id: this.state.passwordResetDTO.id
        };

        this.setState({
            isPasswordResetPending: true
        })

        try {
            await this.props.resetPassword(RESET_PASSWORD, passwordResetObj)
            this.setState({
                alertMessageInfo: {
                    variant: 'success',
                    message: `Reset password successfully for ${this.state.passwordResetDTO.email}.`
                },
                showPasswordResetModal: false,
                showAlert: true,
                isPasswordResetPending: false
            })
        } catch (e) {
            this.setState({
                passwordResetError: e.errorMessage
                    ? e.errorMessage
                    : `Error resetting password for ${this.state.passwordResetDTO.email}.`,
                isPasswordResetPending: false
            })
        }
    }

    deleteRemarksHandler = event => {
        const {name, value} = event.target
        let deleteRequest = {...this.state.deleteRequestDTO}
        deleteRequest[name] = value
        this.setState({
            deleteRequestDTO: deleteRequest
        })
    }

    fetchHospitals = async () => {
        await this.props.fetchActiveHospitalsForDropdown(
            FETCH_HOSPITALS_FOR_DROPDOWN
        )
    }

    fetchDepartments = async () => {
        await TryCatchHandler.genericTryCatch(
            this.props.fetchActiveDepartmentsForDropdown(
                FETCH_DEPARTMENTS_FOR_DROPDOWN
            )
        )
    }

    fetchProfilesByDepartmentId = async value => {
        value &&
        (await this.props.fetchActiveProfilesByDepartmentId(
            FETCH_ACTIVE_PROFILES_BY_DEPARTMENT_ID,
            value
        ))
    }

    fetchActiveProfileLists = async () => {
        await this.props.fetchActiveProfileListForDropdown(
            FETCH_ACTIVE_PROFILE_LIST_FOR_DROPDOWN
        )
    }

    fetchAdminMetaInfosForDropdown = async () => {
        await this.props.fetchAdminMetaInfo(FETCH_ADMIN_META_INFO)
    }

    previewApiCall = async id => {
        await this.props.previewAdmin(FETCH_ADMIN_DETAILS, id)
    }

    searchAdmins = async page => {
        const {
            metaInfo,
            department,
            profile,
            genderCode,
            status
        } = this.state.searchParameters
        let searchData = {
            adminMetaInfoId: metaInfo && metaInfo.value,
            departmentId: department && department.value,
            profileId: profile && profile.value,
            genderCode: genderCode && genderCode.value,
            status: status && status.value !== 'A' ? status.value : ''
        }

        let updatedPage =
            this.state.queryParams.page === 0
                ? 1
                : page
                ? page
                : this.state.queryParams.page
        await this.props.fetchAdminList(
            SEARCH_ADMIN,
            {
                page: updatedPage,
                size: this.state.queryParams.size
            },
            searchData
        )

        await this.setState({
            totalRecords: this.props.AdminListReducer.adminList.length
                ? this.props.AdminListReducer.adminList[0].totalItems
                : 0,
            queryParams: {
                ...this.state.queryParams,
                page: updatedPage
            }
        })
    }

    editApiCall = async () => {
        const {
            id,
            profile,
            fullName,
            email,
            mobileNumber,
            status,
            hasMacBinding,
            adminAvatar,
            remarks,
            adminAvatarUrlNew,
            genderCode,
            adminDashboardRequestDTOS
        } = this.state.adminUpdateData
        const {updatedMacIdList} = this.state

        let macAddressList = []
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
            profileId: profile.value,
            remarks: remarks,
            macAddressUpdateInfo: [...macAddressList],
            isAvatarUpdate: adminAvatarUrlNew ? 'Y' : 'N',
            adminDashboardRequestDTOS: adminDashboardRequestDTOS.map(adminDash => ({
                id: adminDash.id,
                status: adminDash.status
            })),
            baseUrl: EnvironmentVariableGetter.CLIENT_EMAIL_REDIRECT_URL
        };

        let formData = new FormData()
        adminAvatarUrlNew !== '' && formData.append('file', adminAvatar)
        try {
            await this.props.editAdmin(EDIT_ADMIN, adminUpdateRequestDTO, formData)
            this.resetAdminUpdateDataFromState()
            this.checkIfSelfEditAndShowMessage(adminUpdateRequestDTO.id)
            await this.searchAdmins()
        } catch (e) {
        }
    }

    appendSNToTable = adminList =>
        adminList.map((prof, index) => ({
            ...prof,
            sN: index + 1
        }))

    addMacIdObjectToMacIdList = hasMacBinding => {
        let tempArray = AdminSetupUtils.addRemoveMacAddressObject(
            hasMacBinding,
            this.state.adminUpdateData.macIdList
        )
        if (hasMacBinding) {
            this.setMacIdListInState(tempArray, tempArray)
        } else {
            let currentSelectedMacIds = [...this.state.updatedMacIdList]
            let updateMacIds = currentSelectedMacIds.map(currentSelectedMacId => {
                currentSelectedMacId.status = 'N'
                return currentSelectedMacId
            })
            this.setMacIdListInState(tempArray, updateMacIds)
        }
    }

    actionsOnHospitalChange = async value => {
        if (value) {
            await this.fetchDepartmentsByHospitalId(value)
            const {departmentsByHospital} = this.props.DepartmentSetupReducer
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
    }

    actionsOnDepartmentChange = async value => {
        if (value) {
            await this.fetchProfilesByDepartmentId(value)
            const {activeProfilesByDepartmentId} = this.props.ProfileSetupReducer
            this.setState({
                adminUpdateData: {
                    ...this.state.adminUpdateData,
                    profile: null,
                    profileList: activeProfilesByDepartmentId
                        ? activeProfilesByDepartmentId
                        : []
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
    }

    prepareDataForPreview = (adminData, value) => {
        let macIDs = []
        if (adminData) {
            const {
                id,
                departmentId,
                departmentName,
                profileId,
                profileName,
                fullName,
                email,
                mobileNumber,
                gender,
                status,
                hasMacBinding,
                fileUri,
                adminMacAddressInfo,
                remarks
            } = adminData

            if (adminMacAddressInfo && adminMacAddressInfo.length) {
                macIDs = AdminSetupUtils.getMacAddresses(adminMacAddressInfo)
            }

            return {
                id: id,
                department: {label: departmentName, value: departmentId},
                profile: {label: profileName, value: profileId},
                fullName: fullName,
                email: email,
                mobileNumber: mobileNumber,
                genderCode: gender === 'FEMALE' ? 'F' : gender === 'MALE' ? 'M' : 'O',
                status: status,
                hasMacBinding: hasMacBinding === 'Y' ? true : false,
                macIdList: [...macIDs],
                adminAvatar: '',
                remarks: remarks,
                adminAvatarUrl: fileUri,
                adminAvatarUrlNew: '',
                adminDashboardRequestDTOS: this.state.adminUpdateData
                    .adminDashboardRequestDTOS
            }
        }
    }

    prepareDataForDashboardRole = (adminDashBoardRole, dashData) => {
        let adminDashRole = []

        adminDashBoardRole &&
        adminDashBoardRole.length &&
        adminDashBoardRole.map(adminDash => {
            let flag = false
            dashData &&
            dashData.length &&
            dashData.map(dash => {
                if (dash.code === adminDash.code) {
                    flag = true
                }
            })
            if (flag) adminDashRole.push({...adminDash, status: 'Y'})
            else adminDashRole.push({...adminDash, status: 'N'})
        })
        return adminDashRole
    }

    prepareDataForEdit = async (adminData, dashData) => {
        let adminInfoObj = this.prepareDataForPreview(adminData)
        const {
            id,
            department,
            profile,
            fullName,
            email,
            mobileNumber,
            genderCode,
            status,
            hasMacBinding,
            macIdList,
            adminAvatar,
            adminAvatarUrl
        } = adminInfoObj

        // await this.fetchDepartments();
        const {adminDashBoardRole} = this.state
        await this.fetchProfilesByDepartmentId(department.value)
        let dashForAdmin = this.prepareDataForDashboardRole(
            adminDashBoardRole,
            dashData
        )
        await this.setState({
            showEditModal: true,
            adminUpdateData: {
                ...this.state.adminUpdateData,
                id: id,
                department: department,
                profile: profile,
                fullName: fullName,
                email: email,
                mobileNumber: mobileNumber,
                emailValid: email || false,
                fullNameValid: fullName || false,
                mobileNumberValid: mobileNumber.length == 10 ? true : false,
                status: status,
                genderCode: genderCode,
                hasMacBinding: hasMacBinding === 'Y',
                macIdList: [...macIdList],
                adminAvatar: adminAvatar,
                adminAvatarUrl: adminAvatarUrl,
                departmentList: [...this.props.DepartmentSetupReducer.departments],
                profileList: [
                    ...this.props.ProfileSetupReducer.activeProfilesByDepartmentId
                ],
                remarks: '',
                adminDashboardRequestDTOS: dashForAdmin
            },
            updatedMacIdList: [...macIdList]
        })
        this.checkFormValidity()
    }

    fetchDashBoardFeatures = async () => {
        try {
            const response = await this.props.fetchDashboardFeatures(
                DASHBOARD_FEATURE
            )
            await this.setState({
                adminDashBoardRole: response.data
            })
        } catch (e) {
            console.log(e)
        }
    }
    findAndChangeStatusofDashBoardRole = (adminDashboardList, dash) => {
        return adminDashboardList.map(adminDash => {
            if (dash.code === adminDash.code)
                return {...adminDash, status: dash.status}
            else return {...adminDash}
        })
    }
    onChangeDashBoardRole = (event, dash) => {
        let adminDashboardList = {...this.state.adminUpdateData}
        let newDash = {...dash}
        newDash.status = newDash.status === 'Y' ? 'N' : 'Y'

        adminDashboardList[
            'adminDashboardRequestDTOS'
            ] = this.findAndChangeStatusofDashBoardRole(
            adminDashboardList.adminDashboardRequestDTOS,
            newDash
        )
        this.setState({
            adminUpdateData: adminDashboardList
        })
    }

    initialAPICalls = () => {
        this.fetchAdminMetaInfosForDropdown()
        this.fetchActiveProfileLists()
        if(LocalStorageSecurity.localStorageDecoder('adminDashRole'))
        this.fetchDashBoardFeatures()
        this.fetchDepartments()
        this.searchAdmins()
    }

    componentDidMount() {
        this.initialAPICalls()
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        const {
            adminUpdateData,
            searchParameters,
            deleteRequestDTO,
            showAdminModal,
            deleteModalShow,
            totalRecords,
            queryParams,
            showEditModal,
            errorMessageForAdminName,
            errorMessageForAdminMobileNumber,
            showImageUploadModal,
            adminImage,
            adminImageCroppedUrl,
            showPasswordResetModal,
            passwordResetDTO,
            passwordResetError,
            showProfileDetailModal,
            profileData,
            errorMessage,
            isPasswordResetPending
        } = this.state

        const {activeProfilesForDropdown} = this.props.ProfileSetupReducer

        const {
            isSearchLoading,
            adminList,
            searchErrorMessage
        } = this.props.AdminListReducer

        const {adminErrorMessage, isAdminEditLoading} = this.props.AdminEditReducer

        const {deleteErrorMessage} = this.props.AdminDeleteReducer

        const {adminMetaInfoForDropdown} = this.props.AdminSetupReducer

        const {
            departments,
            departmentsByHospital
        } = this.props.DepartmentSetupReducer

        return (
            <>
                <div className="">
                    <AdminSetupSearchFilter
                        onInputChange={this.handleSearchFormChange}
                        searchParameters={searchParameters}
                        resetSearchForm={this.handleSearchFormReset}
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
                {showEditModal && (
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
                        onImageUpload={data => this.handleImageUpload(data)}
                        adminImage={adminImage}
                        adminCroppedImage={adminImageCroppedUrl}
                        onImageSelect={this.handleImageSelect}
                        onImageCrop={this.handleCropImage}
                        editApiCall={this.editApiCall}
                        errorMessage={adminErrorMessage || errorMessage}
                        viewProfileDetails={this.handleViewProfileDetails}
                        isAdminEditLoading={isAdminEditLoading}
                        onChangeDashBoardRole={this.onChangeDashBoardRole}
                    />
                )}
                {showPasswordResetModal && (
                    <PasswordResetModal
                        showPasswordResetModal={showPasswordResetModal}
                        setShowModal={this.setShowModal}
                        resetPassword={this.resetPassword}
                        passwordResetData={passwordResetDTO}
                        errorMessage={passwordResetError}
                        isPasswordResetPending={isPasswordResetPending}
                    />
                )}
                {showProfileDetailModal && (
                    <PreviewRoles
                        showModal={showProfileDetailModal}
                        setShowModal={this.closeProfileDetailsViewModal}
                        profileData={profileData}
                        rolesJson={menuRoles}
                    />
                )}
                <CAlert
                    id="admin-manage"
                    variant={this.state.alertMessageInfo.variant}
                    show={this.state.showAlert}
                    onClose={this.closeAlert}
                    alertType={
                        this.state.alertMessageInfo.variant === 'success' ? (
                            <>
                                <i className="fa fa-check-circle" aria-hidden="true">
                                    {' '}
                                </i>
                            </>
                        ) : (
                            <>
                                <i className="fa fa-exclamation-triangle" aria-hidden="true">
                                    {' '}
                                </i>
                            </>
                        )
                    }
                    message={this.state.alertMessageInfo.message}
                />
            </>
        )
    }
}

export default ConnectHoc(
    AdminManage,
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
        'DashboardFeaturesReducer',
        'DashboardFeaturesByAdminReducer'
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
        previewProfile,
        fetchDashboardFeaturesByAdmin,
        fetchDashboardFeatures,
        savePinOrUnpinUserMenu
    }
)
