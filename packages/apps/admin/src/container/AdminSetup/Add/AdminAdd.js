import React, {PureComponent} from 'react'
import AdminInfoForm from './AdminInfoForm'
import {AdminSetupUtils, EnterKeyPressUtils, menuRoles, ProfileSetupUtils, LocalStorageSecurity} from '@frontend-appointment/helpers'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    clearAdminSuccessErrorMessagesFromStore,
    createAdmin,
    DashboardDetailsMiddleware,
    UnitSetupMiddleware,
    fetchActiveProfilesByDepartmentId,
    HospitalSetupMiddleware,
    previewProfile
} from '@frontend-appointment/thunk-middleware'
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import {Col, Container, Row} from 'react-bootstrap'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import * as Material from 'react-icons/md'
import AdminConfirmationModal from './AdminConfirmationModal'
import './../admin-setup.scss'
import {PreviewClientProfileRoles} from "@frontend-appointment/ui-components";


const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware
const {fetchActiveDepartmentsByHospitalId} = UnitSetupMiddleware
const {fetchDashboardFeatures} = DashboardDetailsMiddleware
const {
    FETCH_HOSPITALS_FOR_DROPDOWN
} = AdminModuleAPIConstants.hospitalSetupApiConstants
const {
    FETCH_PROFILE_DETAILS,
    FETCH_ACTIVE_PROFILES_BY_UNIT_ID
} = AdminModuleAPIConstants.profileSetupAPIConstants
const {
    FETCH_UNITS_FOR_DROPDOWN_BY_HOSPITAL
} = AdminModuleAPIConstants.departmentSetupAPIConstants
const {CREATE_ADMIN} = AdminModuleAPIConstants.adminSetupAPIConstants
const {DASHBOARD_FEATURE} = AdminModuleAPIConstants.DashboardApiConstant

class AdminAdd extends PureComponent {
    state = {
        hospital: null,
        department: null,
        profile: null,
        fullName: '',
        // username: '',
        email: '',
        mobileNumber: '',
        status: 'N',
        hasMacBinding: false,
        genderCode: '',
        macIdList: [],
        departmentList: [],
        adminDashboardRequestDTOS: [],
        profileList: [],
        errorMessageForAdminName:
            'Admin Name should not contain special characters.',
        errorMessageForAdminMobileNumber: 'Mobile number should be of 10 digits.',
        showImageUploadModal: false,
        showConfirmModal: false,
        adminAvatar: null,
        adminAvatarURL: '',
        showAlert: false,
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        adminImage: '',
        adminImageCroppedUrl: '',
        adminFileCropped: '',
        fullNameValid: false,
        emailValid: false,
        mobileNumberValid: false,
        profileData: {},
        showProfileDetailModal: false
    }

    resetStateValues = () => {
        this.setState({
            hospital: null,
            department: null,
            profile: null,
            fullName: '',
            // username: '',
            email: '',
            password: '',
            mobileNumber: '',
            genderCode: '',
            status: 'N',
            hasMacBinding: '',
            macIdList: [],
            departmentList: [],
            profileList: [],
            adminDashboardRequestDTOS: [
                ...this.props.DashboardFeaturesReducer.dashboardFeatureData
            ],
            showImageUploadModal: false,
            showConfirmModal: false,
            adminImage: '',
            adminImageCroppedUrl: '',
            adminFileCropped: '',
            adminAvatar: null,
            adminAvatarUrl: '',
            fullNameValid: false,
            emailValid: false,
            mobileNumberValid: false
        })
    }

    closeProfileDetailsViewModal = () => {
        this.setState({
            showProfileDetailModal: false
        })
    }

    setMacIdListInState = macIds => this.setState({macIdList: [...macIds]})

    setStateValues = (key, value, label, fieldValid) =>
        label
            ? value
            ? this.setState({[key]: {value, label}})
            : this.setState({[key]: null})
            : this.setState({[key]: value, [key + 'Valid']: fieldValid})

    setShowModal = () =>
        this.setState({showImageUploadModal: !this.state.showImageUploadModal})

    setShowConfirmModal = () =>
        this.setState({showConfirmModal: !this.state.showConfirmModal})

    addMacIdObjectToMacIdList = hasMacBinding => {
        let tempArray = AdminSetupUtils.addRemoveMacAddressObject(
            hasMacBinding,
            this.state.macIdList
        )
        this.setMacIdListInState(tempArray)
    }

    checkFormValidity = () => {
        const {
            hospital,
            department,
            profile,
            fullName,
            // username,
            email,
            mobileNumber,
            genderCode,
            fullNameValid,
            emailValid,
            mobileNumberValid
        } = this.state

        let formValidity =
            hospital &&
            department &&
            profile &&
            fullNameValid &&
            fullName &&
            // username &&
            emailValid &&
            email &&
            mobileNumberValid &&
            mobileNumber &&
            genderCode

        this.setState({
            formValid: Boolean(formValidity)
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

    actionsOnHospitalChange = async value => {
        if (value) {
            await this.fetchDepartmentsByHospitalId(value)
            const {departmentsByHospital} = this.props.UnitSetupReducer
            this.setState({
                department: null,
                profile: null,
                departmentList: departmentsByHospital ? departmentsByHospital : [],
                profileList: []
            })
        } else {
            this.setState({
                department: null,
                profile: null,
                departmentList: [],
                profileList: []
            })
        }
    }

    actionsOnDepartmentChange = async value => {
        if (value) {
            await this.fetchProfilesByDepartmentId(value)
            const {activeProfilesByDepartmentId} = this.props.ProfileSetupReducer
            this.setState({
                profile: null,
                profileList: activeProfilesByDepartmentId
                    ? activeProfilesByDepartmentId
                    : []
            })
        } else {
            this.setState({
                profile: null,
                profileList: []
            })
        }
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
            await this.setStateValues(fieldName, value, label, fieldValid)
            switch (fieldName) {
                case 'hospital':
                    this.actionsOnHospitalChange(value)
                    break
                case 'department':
                    this.actionsOnDepartmentChange(value)
                    break
                case 'hasMacBinding':
                    this.addMacIdObjectToMacIdList(value)
                    break
                default:break;
            }
            this.checkFormValidity()
        }
    }

    handleMacIdChange = (event, index) => {
        let macIdValue = event.target.value
        let macIds = [...this.state.macIdList]
        let macIdAlreadyExists =
            macIds.length > 0 && macIds.find(macId => macId.macId === macIdValue)
        macIds[index].macId = macIdValue
        macIds[index].errorMessage =
            macIdValue &&
            (!this.validateMacId(macIdValue)
                ? 'Invalid MAC Id.'
                : macIdAlreadyExists
                    ? 'MAC Id Already added.'
                    : '')
        this.setMacIdListInState(macIds)
    }

    handleAddMoreMacId = () => {
        this.addMacIdObjectToMacIdList(true)
    }

    handleRemoveMacId = (macId, index) => {
        let macIds = [...this.state.macIdList]
        macIds.splice(index, 1)
        this.setMacIdListInState(macIds)
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
            adminAvatar: new File([croppedImageFile], 'adminAvatar.jpeg'),
            adminAvatarUrl: croppedImage,
            showImageUploadModal: false
        })
    }
    findAndChangeStatusofDashBoardRole = (adminDashboardList, dash) => {
        return adminDashboardList.map(adminDash => {
            if (dash.code === adminDash.code)
                return {...adminDash, status: dash.status}
            else return {...adminDash}
        })
    }
    onChangeDashBoardRole = (event, dash) => {
        let adminDashboardList = [...this.state.adminDashboardRequestDTOS]
        let newDash = {...dash}
        newDash.status = newDash.status === 'Y' ? 'N' : 'Y'

        adminDashboardList = this.findAndChangeStatusofDashBoardRole(
            adminDashboardList,
            newDash
        )
        this.setState({
            adminDashboardRequestDTOS: [...adminDashboardList]
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

    handleConfirmClick = async () => {
        const {
            hospital,
            profile,
            fullName,
            // username,
            email,
            mobileNumber,
            genderCode,
            status,
            hasMacBinding,
            macIdList,
            adminAvatar,
            adminDashboardRequestDTOS
        } = this.state
        const newAdminDashboardRequest = this.filterOnlyActiveStatusDashboardRole(
            adminDashboardRequestDTOS
        )
        const {hospitalsForDropdown} = this.props.HospitalDropdownReducer

        let baseUrlForEmail = AdminSetupUtils.getBaseUrlForEmail(
            hospitalsForDropdown,
            hospital
        )

        let adminRequestDTO = {
            email,
            fullName,
            // username,
            hasMacBinding: hasMacBinding ? 'Y' : 'N',
            hospitalId: hospital.value,
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

        let formData = new FormData();
        adminAvatar &&
        formData.append(
            'file',
            new File([adminAvatar], fullName.concat('-picture.jpeg'))
        );
        try {
            await this.props.createAdmin(CREATE_ADMIN, adminRequestDTO, formData)
            await this.resetStateValues()
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: 'success',
                    message: this.props.AdminSetupReducer.successMessage
                }
            })
        } catch (e) {
            await this.setShowConfirmModal()
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: 'danger',
                    message: this.props.AdminSetupReducer.errorMessage
                        ? this.props.AdminSetupReducer.errorMessage
                        : e.message
                }
            })
        }
    }

    handleViewProfileDetails = async profileId => {
        try {
            await this.fetchProfileDetails(profileId)
            const {profilePreviewData} = this.props.ProfilePreviewReducer

            let profileData =
                profilePreviewData &&
                (await ProfileSetupUtils.prepareProfilePreviewData(profilePreviewData.profileResponseDTO,
                    profilePreviewData.profileMenuResponseDTOS,'CLIENT'))
            this.setState({
                profileData,
                showProfileDetailModal: true
            })
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: 'danger',
                    message: this.props.ProfilePreviewReducer.profilePreviewErrorMessage
                }
            })
        }
    }

    fetchProfileDetails = async profileId => {
        await this.props.previewProfile(FETCH_PROFILE_DETAILS, profileId)
    }

    fetchHospitals = async () => {
        await this.props.fetchActiveHospitalsForDropdown(
            FETCH_HOSPITALS_FOR_DROPDOWN
        )
    }

    fetchDepartmentsByHospitalId = async value => {
        value &&
        (await this.props.fetchActiveDepartmentsByHospitalId(
            FETCH_UNITS_FOR_DROPDOWN_BY_HOSPITAL,
            value
        ))
    }

    fetchProfilesByDepartmentId = async value => {
        value &&
        (await this.props.fetchActiveProfilesByDepartmentId(
            FETCH_ACTIVE_PROFILES_BY_UNIT_ID,
            value
        ))
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
            await this.setState({
                adminDashboardRequestDTOS: this.formDashBoardData(response.data)
            })
        } catch (e) {
            console.log(e)
        }
    }

    initialAPICalls = () => {
        this.fetchHospitals()
        if(LocalStorageSecurity.localStorageDecoder('adminDashRole'))
          this.fetchDashBoardFeatures()
    }

    componentDidMount() {
        this.initialAPICalls()
    }

    render() {
        const {
            hospital,
            department,
            profile,
            fullName,
            // username,
            email,
            genderCode,
            mobileNumber,
            status,
            hasMacBinding,
            macIdList,
            departmentList,
            profileList,
            adminAvatar,
            adminAvatarUrl,
            errorMessageForAdminMobileNumber,
            errorMessageForAdminName,
            showImageUploadModal,
            adminImage,
            adminImageCroppedUrl,
            showProfileDetailModal,
            profileData,
            adminDashboardRequestDTOS
        } = this.state

        const {hospitalsForDropdown} = this.props.HospitalDropdownReducer
        const {dropdownErrorMessage} = this.props.ProfileSetupReducer
        const {isCreateAdminLoading} = this.props.AdminSetupReducer
        const {
            isDashboardFeatureLoading,
            dashboardFeatureErrorMessage
        } = this.props.DashboardFeaturesReducer
        return (
            <>
                <div className=" ">
                    <Container className="bg-white add-container" fluid>
                        <>
                            <CButton
                                id="resetAdminForm"
                                variant="outline-secondary"
                                size="sm"
                                name=""
                                className="mb-2  float-right"
                                onClickHandler={this.resetStateValues}
                            >
                                <>

                                    <i className="fa fa-refresh"/>  &nbsp;Reset
                                </>
                            </CButton>
                            <AdminInfoForm
                                adminInfoObj={{
                                    hospital: hospital,
                                    department: department,
                                    profile: profile,
                                    fullName: fullName,
                                    // username: username,
                                    email: email,
                                    genderCode: genderCode,
                                    mobileNumber: mobileNumber,
                                    status: status,
                                    hasMacBinding: hasMacBinding,
                                    macIdList: macIdList,
                                    adminAvatar: adminAvatar,
                                    adminAvatarUrl: adminAvatarUrl
                                }}
                                onEnterKeyPress={this.handleEnter}
                                onInputChange={this.handleOnChange}
                                onMacIdChange={this.handleMacIdChange}
                                onAddMoreMacId={this.handleAddMoreMacId}
                                onRemoveMacId={this.handleRemoveMacId}
                                hospitalList={hospitalsForDropdown}
                                departmentList={departmentList}
                                profileList={profileList}
                                errorMessageForAdminName={errorMessageForAdminName}
                                errorMessageForAdminMobileNumber={
                                    errorMessageForAdminMobileNumber
                                }
                                errorMessageForProfileDropdown={dropdownErrorMessage}
                                showModal={showImageUploadModal}
                                setShowModal={this.setShowModal}
                                onImageUpload={this.handleImageUpload}
                                adminImage={adminImage}
                                adminCroppedImage={adminImageCroppedUrl}
                                onImageSelect={this.handleImageSelect}
                                onImageCrop={this.handleCropImage}
                                viewProfileDetails={this.handleViewProfileDetails}
                                isCreateAdminLoading={isCreateAdminLoading}
                                isDashboardFeatureLoading={isDashboardFeatureLoading}
                                dashboardFeatureData={adminDashboardRequestDTOS}
                                dashboardFeatureErrorMessage={dashboardFeatureErrorMessage}
                                onChangeDashBoardRole={this.onChangeDashBoardRole}
                            />
                            <Row className="mt-4">
                                <Col sm={12} md={{span: 3, offset: 9}}>
                                    <CButton
                                        id="save-admin"
                                        variant="primary "
                                        className="float-right btn-action"
                                        name="Save"
                                        disabled={!this.state.formValid || this.state.showConfirmModal}
                                        isLoading={this.state.showConfirmModal}
                                        onClickHandler={this.setShowConfirmModal}
                                    />
                                    <AdminConfirmationModal
                                        showModal={this.state.showConfirmModal}
                                        setShowModal={this.setShowConfirmModal}
                                        onConfirmClick={this.handleConfirmClick}
                                        adminInfoObj={{
                                            hospital: hospital,
                                            department: department,
                                            profile: profile,
                                            fullName: fullName,
                                            // username: username,
                                            email: email,
                                            genderCode: genderCode,
                                            mobileNumber: mobileNumber,
                                            status: status,
                                            hasMacBinding: hasMacBinding,
                                            macIdList: macIdList,
                                            adminAvatar: adminAvatar,
                                            adminAvatarUrl: adminAvatarUrl,
                                            adminDashboardRequestDTOS: adminDashboardRequestDTOS
                                                ? adminDashboardRequestDTOS.length
                                                    ? [...adminDashboardRequestDTOS]
                                                    : []
                                                : []
                                        }}
                                        adminImage={adminImageCroppedUrl}
                                        isCreateAdminLoading={isCreateAdminLoading}
                                    />
                                </Col>
                            </Row>
                        </>

                        {showProfileDetailModal && (
                            <PreviewClientProfileRoles
                                showModal={showProfileDetailModal}
                                setShowModal={this.closeProfileDetailsViewModal}
                                profileData={profileData}
                                rolesJson={menuRoles}
                            />
                        )}
                        <CAlert
                            id="profile-manage"
                            variant={this.state.alertMessageInfo.variant}
                            show={this.state.showAlert}
                            onClose={this.closeAlert}
                            alertType={
                                this.state.alertMessageInfo.variant === 'success' ? (
                                    <>
                                        <Material.MdDone/>
                                    </>
                                ) : (
                                    <>
                                        <i
                                            class="fa fa-exclamation-triangle"
                                            aria-hidden="true"
                                        />
                                    </>
                                )
                            }
                            message={this.state.alertMessageInfo.message}
                        />
                    </Container>
                </div>
            </>
        )
    }
}

export default ConnectHoc(
    AdminAdd,
    [
        'HospitalDropdownReducer',
        'ProfileSetupReducer',
        'AdminSetupReducer',
        'ProfilePreviewReducer',
        'UnitSetupReducer',
        'DashboardFeaturesReducer'
    ],
    {
        fetchActiveHospitalsForDropdown,
        createAdmin,
        clearAdminSuccessErrorMessagesFromStore,
        previewProfile,
        fetchActiveDepartmentsByHospitalId,
        fetchActiveProfilesByDepartmentId,
        fetchDashboardFeatures
    }
)
