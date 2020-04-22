import React, {PureComponent} from 'react'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    CompanyAdminSetupMiddleware,
    CompanyProfileSetupMiddleware,
    CompanySetupMiddleware,
    DashboardDetailsMiddleware,
    logoutUser,
    resetPassword,
    savePinOrUnpinUserMenu
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants, CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {
    AdminSetupUtils,
    EnterKeyPressUtils, EnvironmentVariableGetter,
    LocalStorageSecurity,
    menuRoles,
    ProfileSetupUtils
} from '@frontend-appointment/helpers'
// import * as UserMenuUtils from "@frontend-appointment/helpers/src/utils/UserMenuUtils";
import {CAlert} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'
import PreviewRoles from '../CommonComponents/PreviewRoles'
import PasswordResetModal from './commons/PasswordResetModal'
import './admin-setup.scss'

const {
    clearAdminSuccessErrorMessagesFromStore,
    createCompanyAdmin,
    deleteCompanyAdmin,
    editCompanyAdmin,
    fetchCompanyAdminList,
    fetchCompanyAdminMetaInfo,
    previewCompanyAdmin,
    fetchCompanyAdminMetaInfoById
} = CompanyAdminSetupMiddleware
const {
    fetchActiveCompanyProfileListByCompanyIdForDropdown,
    previewCompanyProfileById,
    fetchCompanyProfileListForDropdown,
    clearSuccessErrorMessageFromStore
} = CompanyProfileSetupMiddleware
const {
    fetchDashboardFeatures,
    fetchDashboardFeaturesByAdmin
} = DashboardDetailsMiddleware
const {companyDropdown} = CompanySetupMiddleware

const {
    FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN,
    PREVIEW_COMPANY_PROFILE,
    FETCH_COMPANY_PROFILE_FOR_DROPDOWN
} = AdminModuleAPIConstants.companyProfileSetupApiConstants

const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant

const {
    //CHANGE_COMPANY_ADMIN_PASSWORD,
    CREATE_COMPANY_ADMIN,
    DELETE_COMPANY_ADMIN,
    EDIT_COMPANY_ADMIN,
    FETCH_COMPANY_ADMIN_META_INFO,
    // FETCH_COMPANY_ADMIN_FOR_DROPDOWN,
    // GET_LOGGED_IN_COMPANY_ADMIN_INFO,
    PREVIEW_COMPANY_ADMIN,
    RESET_PASSWORD,
    //SAVE_COMPANY_ADMIN_PASSWORD,
    SEARCH_COMPANY_ADMIN,
    // UPDATE_COMPANY_ADMIN_AVATAR,
    // UPDATE_COMPANY_ADMIN_PASSWORD,
    // VERIFY_COMPANY_ADMIN
    FETCH_ADMIN_META_INFO_BY_COMPANY_ID
} = AdminModuleAPIConstants.companyAdminSetupApiConstants
const {DROPDOWN_COMPANY} = AdminModuleAPIConstants.CompanyApiConstant
const {ADMIN_FEATURE} = CommonAPIConstants
const CompanyAdminSetupHOC = (ComposedComponent, props, type) => {
    class CompanyAdminSetup extends PureComponent {
        state = {
            adminUpdateData: {
                id: '',
                company: null,
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
                profileList: [],
                moduleList: [],
                adminDashboardRequestDTOS: []
            },
            errorMessageForAdminName:
                'Admin Name should not contain special characters.',
            errorMessageForAdminMobileNumber: 'Mobile number should be of 10 digits.',
            showImageUploadModal: false,
            showConfirmModal: false,
            showAlert: false,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
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
                company: '',
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
            adminImage: '',
            adminImageCroppedUrl: '',
            adminFileCropped: '',
            profileData: {},
            showProfileDetailModal: false,
            errorMessage: '',
            updatedModulesAndProfiles: [],
            adminDashBoardRole: []
        }

        timer = ''

        resetAdminUpdateDataFromState = () => {
            this.setState({
                adminUpdateData: {
                    id: '',
                    company: null,
                    profile: null,
                    fullName: '',
                    username: '',
                    email: '',
                    password: '',
                    mobileNumber: '',
                    genderCode: '',
                    status: 'Y',
                    hasMacBinding: '',
                    adminDashboardRequestDTOS: [
                        ...this.props.DashboardFeaturesReducer.dashboardFeatureData
                    ],

                    macIdList: [],
                    adminAvatar: null,
                    adminAvatarUrl: '',
                    adminAvatarUrlNew: '',
                    formValid: false,
                    remarks: '',
                    fullNameValid: true,
                    emailValid: true,
                    mobileNumberValid: true,
                    profileList: [],
                    moduleList: []
                },
                adminDashBoardRole: [...this.props.DashboardFeaturesReducer.dashboardFeatureData],
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
                company,
                profile,
                fullName,
                username,
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
            await this.setState({
                showAdminModal: true,
                showAlert: false,
                adminUpdateData: {
                    id: id,
                    company: {...company},
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
                company,
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
                company &&
                profile &&
                fullNameValid &&
                fullName &&
                emailValid &&
                email &&
                mobileNumberValid &&
                mobileNumber &&
                genderCode
            if (type !== 'A') {
                formValidity = formValidity && remarks
            }
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
                props.history.push('/')
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
                message = this.props.CompanyAdminEditReducer.adminEditSuccessMessage
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
                    props.history.push('/')
                }
            } catch (e) {
            }
        }

        handleSearchFormChange = async event => {
            if (event) {
                let fieldName = event.target.name
                let value = event.target.value
                let label = event.target.label
                if(fieldName="company"){
                    this.props.clearAdminSuccessErrorMessagesFromStore();
                    this.props.clearSuccessErrorMessageFromStore();
                    this.fetchProfilesByCompanyId(value);
                    this.fetchAdminMetaInfosForDropdown(value);
                }
                await this.setStateValuesForSearch(fieldName, value, label)
            }
        }

        handleSearchFormReset = async () => {
            await this.setState({
                searchParameters: {
                    ...this.state.searchParameters,
                    metaInfo: null,
                    company: null,
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
            console.log("==comp",event)
            if (event) {
                let fieldName = event.target.name
                let value =
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value
                let label = event.target.label
                await this.setUpdatedValuesInState(fieldName, value, label, fieldValid)
                switch (fieldName) {
                    case 'company':
                        this.actionsOnCompanyChange(value)
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
                    adminAvatar: new File([croppedImageFile], 'companyAdminAvatar.jpeg'),
                    adminAvatarUrlNew: croppedImage
                },
                showImageUploadModal: false
            })
        }

        handleViewProfileDetails = async profileId => {
            try {
                await this.fetchProfileDetails(profileId)
                const {companyProfileDetail} = this.props.CompanyProfilePreviewReducer
                const {
                    companyProfileInfo,
                    companyProfileMenuInfo
                } = companyProfileDetail
                let profileData =
                    companyProfileDetail &&
                    (await ProfileSetupUtils.prepareProfilePreviewData(
                        {
                            profileResponseDTO: companyProfileInfo,
                            profileMenuResponseDTOS: companyProfileMenuInfo
                        },
                        'COMPANY'
                    ))
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
            await this.props.previewCompanyProfileById(
                PREVIEW_COMPANY_PROFILE,
                profileId
            )
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
            const response = await this.props.fetchDashboardFeaturesByAdmin(
                DASHBOARD_FEATURE,
                adId
            )
            try {
                await this.previewApiCall(adId)
                let adminData = this.prepareDataForPreview(
                    this.props.CompanyAdminPreviewReducer.adminPreviewData
                )
                this.setDataForPreview(adminData, response.data)
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.CompanyAdminPreviewReducer
                            .adminPreviewErrorMessage
                        // e.errorMessage ? e.errorMessage: e.message
                    }
                })
            }
        }

        onEditHandler = async id => {
            const response = await this.props.fetchDashboardFeaturesByAdmin(
                DASHBOARD_FEATURE,
                id
            )
            try {
                await this.previewApiCall(id)
                await this.prepareDataForEdit(
                    this.props.CompanyAdminPreviewReducer.adminPreviewData,
                    response.data
                )
            } catch (e) {
                console.log(e)
            }
        }

        onSubmitDeleteHandler = async () => {
            try {
                await this.props.deleteCompanyAdmin(
                    DELETE_COMPANY_ADMIN,
                    this.state.deleteRequestDTO
                )
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
                            message: this.props.CompanyAdminDeleteReducer
                                .adminDeleteSuccessMessage
                        }
                    })
                    this.setShowModal()
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
            });

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

        fetchCompany = async () => {
            await this.props.companyDropdown(DROPDOWN_COMPANY)
        }

        fetchProfilesByCompanyId = async value => {
            value &&
            (await this.props.fetchActiveCompanyProfileListByCompanyIdForDropdown(
                FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN,
                value
            ))
        }

        fetchActiveProfileLists = async () => {
            await this.props.fetchCompanyProfileListForDropdown(
                FETCH_COMPANY_PROFILE_FOR_DROPDOWN
            )
        }

        fetchAdminMetaInfosForDropdown = async (value) => {
            await this.props.fetchCompanyAdminMetaInfoById(FETCH_ADMIN_META_INFO_BY_COMPANY_ID,value)
        }

        previewApiCall = async id => {
            this.props.clearAdminSuccessErrorMessagesFromStore()
            await this.props.previewCompanyAdmin(PREVIEW_COMPANY_ADMIN, id)
        }

        searchAdmins = async page => {
            const {
                metaInfo,
                company,
                profile,
                genderCode,
                status
            } = this.state.searchParameters
            let searchData = {
                adminMetaInfoId: metaInfo && metaInfo.value,
                companyId: company && company.value,
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
            await this.props.fetchCompanyAdminList(
                SEARCH_COMPANY_ADMIN,
                {
                    page: updatedPage,
                    size: this.state.queryParams.size
                },
                searchData
            )

            await this.setState({
                totalRecords: this.props.CompanyAdminListReducer.adminList.length
                    ? this.props.CompanyAdminListReducer.adminList[0].totalItems
                    : 0,
                queryParams: {
                    ...this.state.queryParams,
                    page: updatedPage
                }
            })
        }

        editApiCall = async () => {
            this.props.clearAdminSuccessErrorMessagesFromStore()
            const {
                id,
                company,
                profile,
                fullName,
                email,
                mobileNumber,
                adminCategory,
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
                companyId: company ? company.value : '',
                adminDashboardRequestDTOS: adminDashboardRequestDTOS.map(adminDash => ({
                    id: adminDash.id,
                    status: adminDash.status
                })),
                baseUrl: EnvironmentVariableGetter.ADMIN_EMAIL_REDIRECT_URL
            }

            let formData = new FormData()
            adminAvatarUrlNew !== '' && formData.append('file', adminAvatar)
            try {
                await this.props.editCompanyAdmin(
                    EDIT_COMPANY_ADMIN,
                    adminUpdateRequestDTO,
                    formData
                )
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

        actionsOnCompanyChange = async value => {
            if (value) {
                // await this.props.fetchActiveCompanyProfileListByCompanyIdForDropdown(FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN,value)
                await this.fetchProfilesByCompanyId(value)
                const {
                    activeCompanyProfileListByCompanyIdForDropdown
                } = this.props.CompanyProfileDropdownReducer
                this.setState({
                    adminUpdateData: {
                        ...this.state.adminUpdateData,
                        profile: null,
                        profileList: activeCompanyProfileListByCompanyIdForDropdown
                            ? activeCompanyProfileListByCompanyIdForDropdown
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
                    companyName,
                    companyId,
                    departmentId,
                    departmentName,
                    profileId,
                    profileName,
                    fullName,
                    username,
                    email,
                    mobileNumber,
                    gender,
                    status,
                    hasMacBinding,
                    fileUri,
                    adminMacAddressInfo,
                    remarks,
                } = adminData

                if (adminMacAddressInfo && adminMacAddressInfo.length) {
                    macIDs = AdminSetupUtils.getMacAddresses(adminMacAddressInfo)
                }

                return {
                    id: id,
                    company: {label: companyName, value: companyId},
                    department: {label: departmentName, value: departmentId},
                    profile: {label: profileName, value: profileId},
                    fullName: fullName,
                    username: username,
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
                    adminDashboardRequestDTOS:
                        value && value.length
                            ? [...value.map(val => ({...val, status: 'Y'}))]
                            : []
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
            const {adminDashBoardRole} = this.state
            let dashForAdmin = this.prepareDataForDashboardRole(
                adminDashBoardRole,
                dashData
            )

            const {
                id,
                company,
                profile,
                fullName,
                username,
                email,
                mobileNumber,
                genderCode,
                status,
                hasMacBinding,
                macIdList,
                adminAvatar,
                remarks,
                adminAvatarUrl,
                adminDashboardRequestDTOS
            } = adminInfoObj

            //await this.fetchDepartmentsByHospitalId(hospital.value)
            await this.fetchProfilesByCompanyId(company.value)

            await this.setState({
                showEditModal: true,
                adminUpdateData: {
                    id: id,
                    company: company,
                    profile: profile,
                    fullName: fullName,
                    username: username,
                    email: email,
                    mobileNumber: mobileNumber,
                    status: status,
                    mobileNumberValid: mobileNumber.length === 10 ? true : false,
                    emailValid: email || false,
                    fullNameValid: fullName || false,
                    genderCode: genderCode,
                    hasMacBinding: hasMacBinding,
                    macIdList: [...macIdList],
                    adminAvatar: adminAvatar,
                    adminAvatarUrl: adminAvatarUrl,
                    companyList: [
                        ...this.props.companyDropdownReducer.companyDropdownData
                    ],
                    profileList: [
                        ...this.props.CompanyProfileDropdownReducer
                            .activeCompanyProfileListByCompanyIdForDropdown
                    ],
                    remarks: '',
                    adminDashboardRequestDTOS: [...dashForAdmin]
                },
                updatedMacIdList: [...macIdList]

            })
            this.checkFormValidity();
        }

        handleConfirmClick = async () => {
            const {
                company,
                profile,
                fullName,
                email,
                mobileNumber,
                genderCode,
                status,
                hasMacBinding,
                macIdList,
                adminAvatar,
                adminDashboardRequestDTOS
            } = this.state.adminUpdateData

            const {companyDropdownData} = this.props.companyDropdownReducer

            const newAdminDashboardRequest = this.filterOnlyActiveStatusDashboardRole(
                adminDashboardRequestDTOS
            )

            let baseUrlForEmail = AdminSetupUtils.getBaseUrlForEmail(
                companyDropdownData,
                company
            )

            let adminRequestDTO = {
                email,
                fullName,
                hasMacBinding: hasMacBinding ? 'Y' : 'N',
                companyId: company.value,
                mobileNumber,
                status,
                genderCode: genderCode,
                profileId: profile.value,
                adminDashboardRequestDTOS: [...newAdminDashboardRequest],
                macAddressInfo: macIdList.length
                    ? macIdList.map(macId => {
                        return macId.macId
                    })
                    : [],
                baseUrl: baseUrlForEmail
            }

            let formData = new FormData()
            formData.append(
                'file',
                new File([adminAvatar], email.concat('-picture.jpeg'))
            )
            try {
                await this.props.createCompanyAdmin(
                    CREATE_COMPANY_ADMIN,
                    adminRequestDTO,
                    formData
                )
                await this.resetAdminUpdateDataFromState()
                await this.setShowConfirmModal()
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: this.props.CompanyAdminSetupReducer
                            .adminCreateSuccessMessage
                    }
                })
            } catch (e) {
                await this.setShowConfirmModal()
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: this.props.CompanyAdminSetupReducer.adminCreateErrorMessage
                            ? this.props.CompanyAdminSetupReducer.adminCreateErrorMessage
                            : e.message
                    }
                })
            }
        }

        setShowConfirmModal = () =>
            this.setState({showConfirmModal: !this.state.showConfirmModal})

        initialAPICalls = () => {
            this.fetchCompany()
            if (type !== 'A') {
                this.fetchActiveProfileLists()
              //  this.fetchAdminMetaInfosForDropdown()
                this.searchAdmins()
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
            let adminDashboardList = [
                ...this.state.adminUpdateData.adminDashboardRequestDTOS
            ]
            let newDash = {...dash}
            newDash.status = newDash.status === 'Y' ? 'N' : 'Y'

            adminDashboardList = this.findAndChangeStatusofDashBoardRole(
                adminDashboardList,
                newDash
            )
            let newAdminUpdate = {...this.state.adminUpdateData}
            newAdminUpdate['adminDashboardRequestDTOS'] = adminDashboardList
            this.setState({
                adminUpdateData: {...newAdminUpdate}
            })
        }

        filterOnlyActiveStatusDashboardRole = dashList => {
            return (
                dashList &&
                dashList.length &&
                dashList
                    .filter(dash => dash.status === 'Y')
                    .map(dashBoard => ({id: dashBoard.id, status: dashBoard.status}))
            )
        }
        formDashBoardData = data => {
            return (
                data &&
                data.length &&
                data.map(datum => {
                    return {
                        ...datum,
                        status: 'N'
                    }
                })
            )
        }

        fetchDashBoardFeatures = async () => {
            try {
                const response = await this.props.fetchDashboardFeatures(
                    DASHBOARD_FEATURE
                )
                let adminUpdateData = {...this.state.adminUpdateData}
                adminUpdateData['adminDashboardRequestDTOS'] = this.formDashBoardData(
                    response.data
                )
                let dashList = this.formDashBoardData(response.data);
                await this.setState({
                    adminUpdateData: {...adminUpdateData},
                    adminDashBoardRole: [...dashList]
                })
            } catch (e) {
                console.log(e)
            }
        }

        componentDidMount() {
            this.initialAPICalls()
            this.fetchDashBoardFeatures()
        }

        componentWillUnmount() {
            clearTimeout(this.timer)
        }

        render() {
            const {
                activeCompanyProfileListByCompanyIdForDropdown,
                // activeCompanyProfileListForDropdown,
                dropdownErrorMessage
            } = this.props.CompanyProfileDropdownReducer
            const {companyDropdownData} = this.props.companyDropdownReducer
            const {
                companyAdminMetaInfoByCompanyIdForDropdown
            } = this.props.CompanyAdminMetaInfoByCompanyIdReducer
            const {
                isAdminSearchLoading,
                adminList,
                adminSearchErrorMessage
            } = this.props.CompanyAdminListReducer
            const {
                isAdminEditLoading,
                adminEditErrorMessage
            } = this.props.CompanyAdminEditReducer
            const {
                isDeleteCompanyLoading,
                adminDeleteErrorMessage
            } = this.props.CompanyAdminDeleteReducer
            const {isCreateAdminLoading} = this.props.CompanyAdminSetupReducer
            const {
                isDashboardFeatureLoading,
                dashboardFeatureErrorMessage
            } = this.props.DashboardFeaturesReducer
            const {
                adminUpdateData,
                errorMessageForAdminMobileNumber,
                errorMessageForAdminName,
                passwordResetError,
                alertMessageInfo,
                showAlert,
                adminImage,
                adminImageCroppedUrl,
                deleteModalShow,
                deleteRequestDTO,
                errorMessage,
                passwordResetDTO,
                profileData,
                queryParams,
                searchParameters,
                showAdminModal,
                showConfirmModal,
                showEditModal,
                showImageUploadModal,
                showPasswordResetModal,
                showProfileDetailModal,
                totalRecords,
                isPasswordResetPending
            } = this.state;
            return (
                <>
                    <ComposedComponent
                        props
                        adminCreateForm={{
                            adminCreateData: {...adminUpdateData},
                            isCreateAdminLoading: {isCreateAdminLoading},
                            showModal: showConfirmModal,
                            setShowModal: this.setShowConfirmModal,
                            onConfirmClick: this.handleConfirmClick
                        }}
                        commonInfo={{
                            onEnterKeyPress: this.handleEnter,
                            onInputChange: this.handleOnChange,
                            onMacIdChange: this.handleMacIdChange,
                            onAddMoreMacId: this.handleAddMoreMacId,
                            onRemoveMacId: this.handleRemoveMacId,
                            companyList: companyDropdownData,
                            profileList:this.state.adminUpdateData.profileList,
                            setShowModal: this.setShowModal,
                            profileData: profileData,
                            onImageUpload: this.handleImageUpload,
                            errorMessageForAdminName: errorMessageForAdminName,
                            errorMessageForAdminMobileNumber: errorMessageForAdminMobileNumber,
                            errorMessageForProfileDropdown: dropdownErrorMessage,
                            showImageUploadModal: showImageUploadModal,
                            adminImage: adminImage,
                            adminCroppedImage: adminImageCroppedUrl,
                            onImageSelect: this.handleImageSelect,
                            onImageCrop: this.handleCropImage,
                            viewProfileDetails: this.handleViewProfileDetails,
                            onPasswordReset: this.onPasswordReset,
                            resetModalState: this.resetAdminUpdateDataFromState,
                            setImageShowModal: this.setImageShowModal,
                            isDashboardFeatureLoading: isDashboardFeatureLoading,
                            dashboardFeatureData: adminUpdateData.adminDashboardRequestDTOS,
                            dashboardFeatureErrorMessage: dashboardFeatureErrorMessage,
                            onChangeDashBoardRole: this.onChangeDashBoardRole
                        }}
                        searchFilter={{
                            onInputChange: this.handleSearchFormChange,
                            searchParameters: searchParameters,
                            resetSearchForm: this.handleSearchFormReset,
                            companyList: companyDropdownData,
                            profileList: activeCompanyProfileListByCompanyIdForDropdown,
                            adminMetaInfos: companyAdminMetaInfoByCompanyIdForDropdown,
                            onSearchClick: () => this.searchAdmins(1)
                        }}
                        tableData={{
                            filteredActions: this.props.filteredAction,
                            isSearchLoading: isAdminSearchLoading,
                            searchData: this.appendSNToTable(adminList),
                            searchErrorMessage: adminSearchErrorMessage,
                            totalItems: totalRecords,
                            maxSize: queryParams.size,
                            currentPage: queryParams.page,
                            handlePageChange: this.handlePageChange
                        }}
                        deleteInfo={{
                            deleteModalShow: deleteModalShow,
                            onSubmitDelete: this.onSubmitDeleteHandler,
                            remarksHandler: this.deleteRemarksHandler,
                            remarks: deleteRequestDTO.remarks,
                            deleteErrorMsg: adminDeleteErrorMessage,
                            onDeleteHandler: this.onDeleteHandler
                        }}
                        previewInfo={{
                            showAdminModal: showAdminModal,
                            onPreviewHandler: this.onPreviewHandler,
                            adminPreviewData: adminUpdateData
                        }}
                        editInfo={{
                            adminUpdateData: {...adminUpdateData},
                            showModal: showEditModal,
                            adminImage: adminImage,
                            adminCroppedImage: adminImageCroppedUrl,
                            editApiCall: this.editApiCall,
                            onEditHandler: this.onEditHandler,
                            errorMessage: adminEditErrorMessage || errorMessage,
                            isAdminEditLoading: isAdminEditLoading
                        }}
                    />
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
                        id="profile-manage"
                        variant={alertMessageInfo.variant}
                        show={showAlert}
                        onClose={this.closeAlert}
                        alertType={
                            alertMessageInfo.variant === 'success' ? (
                                <>
                                    <Material.MdDone/>
                                </>
                            ) : (
                                <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                            )
                        }
                        message={alertMessageInfo.message}
                    />
                </>
            )
        }
    }

    return ConnectHoc(
        CompanyAdminSetup,
        [
            'CompanyProfileDropdownReducer',
            'companyDropdownReducer',
            'CompanyAdminDeleteReducer',
            'CompanyAdminEditReducer',
            'CompanyAdminListReducer',
            'CompanyAdminPreviewReducer',
            'CompanyAdminSetupReducer',
            'CompanyAdminMetaInfoByCompanyIdReducer',
            'CompanyProfilePreviewReducer',
            'DashboardFeaturesReducer'
        ],
        {
            fetchActiveCompanyProfileListByCompanyIdForDropdown,
            companyDropdown,
            logoutUser,
            clearAdminSuccessErrorMessagesFromStore,
            createCompanyAdmin,
            deleteCompanyAdmin,
            editCompanyAdmin,
            fetchCompanyAdminList,
            fetchCompanyAdminMetaInfo,
            previewCompanyAdmin,
            previewCompanyProfileById,
            fetchCompanyProfileListForDropdown,
            resetPassword,
            fetchDashboardFeatures,
            fetchDashboardFeaturesByAdmin,
            savePinOrUnpinUserMenu,
            fetchCompanyAdminMetaInfoById,
            clearSuccessErrorMessageFromStore
        }
    )
}
export default CompanyAdminSetupHOC
