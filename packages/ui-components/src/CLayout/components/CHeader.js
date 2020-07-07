import React, {Component} from 'react'
import {Button, Dropdown, Image, OverlayTrigger, Tooltip} from 'react-bootstrap'
import {Axios} from '@frontend-appointment/core'
import {CAlert, CBreadcrumb, CDoubleShiftSearch} from '@frontend-appointment/ui-elements'
import {CFavourites, CImageUploadAndCropModal} from '@frontend-appointment/ui-components'

import {AdminModuleAPIConstants, CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import CChangePasswordModal from '../../CChangePassword/CChangePasswordModal'
import {
    EnvironmentVariableGetter,
    FileUploadLocationUtils,
    LocalStorageSecurity,
    menuRoles,
    ProfileSetupUtils
} from '@frontend-appointment/helpers'
import * as Material from 'react-icons/md'
import CompanyProfilePreviewRoles from '../../CompanyProfilePreviewRoles'
import PreviewClientProfileRoles from '../../PreviewClientProfileRoles'
import {MinioMiddleware, uploadLoggedInAdminImage} from '@frontend-appointment/thunk-middleware'

const {
    CHANGE_COMPANY_ADMIN_PASSWORD
} = AdminModuleAPIConstants.companyAdminSetupApiConstants
const {CHANGE_PASSWORD} = AdminModuleAPIConstants.adminSetupAPIConstants
const {FETCH_PROFILE_DETAILS} = AdminModuleAPIConstants.profileSetupAPIConstants
const {
    PREVIEW_COMPANY_PROFILE
} = AdminModuleAPIConstants.companyProfileSetupApiConstants
const {ADMIN_FEATURE, LOGOUT_API} = CommonAPIConstants

const {uploadImageInMinioServer} = MinioMiddleware

class CHeader extends Component {
    state = {
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        userInfo: {},
        assignedModules: [],
        urlBase: '',
        showAlert: false,
        showChangePasswordModal: false,
        oldPassword: '',
        errorOldPassword: '',
        keyPressCount: 0,
        isPasswordChangePending: false,
        profileData: {},
        showProfileDetailModal: false,
        isLogoutPending: false,
        showImageUploadModal: false,
        adminImage: '',
        adminImageCroppedUrl: '',
        adminFileCropped: '',
        adminAvatar: null,
        adminAvatarUrl: '',
        isImageUploading: false,
        loggedInAdminImageUrl: ''
    }

    alertTimer = ''

    closeAlert = () => {
        this.setState({
            showAlert: false
        })
    }

    clearAlertOnTimeOut = () => {
        this.alertTimer = setTimeout(
            () =>
                this.setState({
                    showAlert: false,
                    alertMessageInfo: {
                        ...this.state.alertMessageInfo,
                        variant: '',
                        message: ''
                    }
                }),
            5000
        )
    }

    setShowModal = () =>
        this.setState({
            showChangePasswordModal: false,
            oldPassword: '',
            errorOldPassword: ''
        })

    showAlertMessage = (type, message) => {
        this.setState({
            showAlert: true,
            alertMessageInfo: {
                variant: type,
                message: message
            }
        })
        this.clearAlertOnTimeOut()
    }

    onChangeHandler = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    savePinOrUnpinUserMenu = async (path, status) => {
        console.log('Status', status)
        try {
            await Axios.put(path, {isSideBarCollapse: !status ? 'Y' : 'N'})
        } catch (e) {
            return true
        }
    }
    logoutApi = async path => {
        this.setState({isLogoutPending: true})
        try {
            await Axios.get(path)
            this.setState({isLogoutPending: false})
        } catch (e) {
            this.setState({isLogoutPending: false})
            return true
        }

    }

    logoutUser = async () => {
        await this.savePinOrUnpinUserMenu(
            ADMIN_FEATURE,
            Boolean(LocalStorageSecurity.localStorageDecoder('isOpen')) || false
        )

        await this.logoutApi(LOGOUT_API)
        localStorage.clear()
        sessionStorage.clear()

        this.props.history.push('/')
    }

    setLoggedInUserInfo = async () => {
        let absoluteUrl = window.location.href
        let base = absoluteUrl.split('#')[0]
        let adminInfo = LocalStorageSecurity.localStorageDecoder('adminInfo')
        // let modules = JSON.parse(localStorage.getItem('assignedModules'));
        // TODO CURRENT MODULE AND CHECK VARIABLE NAMES

        await this.setState({
            userInfo: {...adminInfo},
            // assignedModules: modules && [...modules],
            urlBase: base
        })
        document.title =
            this.state.userInfo.hospitalName || 'e-appointments'
        // const a = document.getElementById('favIcon')
        // console.log(a)
        document.getElementById('favIcon').href = this.state.userInfo.hospitalLogo
    }

    handleChangePassword = () => {
        this.setState({
            showChangePasswordModal: true
        })
    }

    changePassword = async newPasswordObj => {
        if (!this.state.oldPassword) {
            this.setState({
                errorOldPassword: 'OLD PASSWORD is required!'
            })
        } else {
            this.handleIsPasswordChangePending(true)
            let passwordChangeData = {
                oldPassword: this.state.oldPassword,
                newPassword: newPasswordObj.password,
                remarks: newPasswordObj.remarks,
                id: this.state.userInfo.adminId
            }

            let API_PATH = Object.is(
                EnvironmentVariableGetter.REACT_APP_MODULE_CODE,
                EnvironmentVariableGetter.ADMIN_MODULE_CODE
            )
                ? CHANGE_COMPANY_ADMIN_PASSWORD
                : CHANGE_PASSWORD
            try {
                await Axios.put(API_PATH, passwordChangeData)
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message:
                            'Password Changed successfully. Logout and Login to verify.'
                    },
                    showChangePasswordModal: false
                })
                this.handleIsPasswordChangePending(false)
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: e.errorMessage
                            ? e.errorMessage
                            : e.message
                                ? e.message
                                : 'Something went wrong!!!'
                    },
                    showChangePasswordModal: false
                })
                this.handleIsPasswordChangePending(false)
            }
        }
    }

    handleIsPasswordChangePending = async isLoading => {
        await this.setState({
            isPasswordChangePending: isLoading
        })
    }

    handleViewProfileDetails = async () => {
        try {
            let API_PATH = Object.is(
                EnvironmentVariableGetter.REACT_APP_MODULE_CODE,
                EnvironmentVariableGetter.ADMIN_MODULE_CODE
            )
                ? PREVIEW_COMPANY_PROFILE
                : FETCH_PROFILE_DETAILS
            let response = await Axios.getWithPathVariables(
                API_PATH,
                this.state.userInfo.profileId
            )

            const profilePreviewData = response.data
            let profileData

            if (API_PATH === PREVIEW_COMPANY_PROFILE) {
                profileData =
                    profilePreviewData &&
                    (await ProfileSetupUtils.prepareProfilePreviewData(
                        profilePreviewData.companyProfileInfo,
                        profilePreviewData.companyProfileMenuInfo,
                        'COMPANY'
                    ))
            } else {
                profileData =
                    profilePreviewData &&
                    (await ProfileSetupUtils.prepareProfilePreviewData(
                        profilePreviewData.profileResponseDTO,
                        profilePreviewData.profileMenuResponseDTOS,
                        'CLIENT'
                    ))
            }

            this.setState({
                profileData,
                showProfileDetailModal: true
            })
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: 'danger',
                    message: e.errorMessage
                        ? e.errorMessage
                        : 'Sorry, Internal Server Problem occurred.'
                }
            })
        }
    }

    /*****************************IMAGE UPLOAD***************************************************/
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
        let adminInfo = LocalStorageSecurity.localStorageDecoder('adminInfo')
        // let croppedImage = this.state.adminImageCroppedUrl
        // await this.setState({
        //     adminAvatar: new File([croppedImageFile], 'adminAvatar.jpeg'),
        //     adminAvatarUrl: croppedImage,
        //     showImageUploadModal: false
        // })
        let imagePathLogo = ''
        try {
            this.setImageLoading(true)
            imagePathLogo = await this.uploadImageToServer(new File([croppedImageFile], 'adminAvatar.jpeg'), adminInfo);
            await uploadLoggedInAdminImage(CommonAPIConstants.UPLOAD_ADMIN_IMAGE, {
                adminId: adminInfo.adminId || '',
                avatar: imagePathLogo
            })
            this.setImageLoading(false)
            this.showAlertMessage('success', "Admin Image updated successfully.")
            this.showImageUploadModal()
            this.setLoggedInUserInfo()
        } catch (e) {
            this.setImageLoading(false)
            this.showAlertMessage('danger', e.errorMessage ? e.errorMessage : e.message || 'Sorry,error occurred while updating image.')
            this.showImageUploadModal()
        }
    }

    setImageLoading = (value) => {
        this.setState({
            isImageUploading: value
        })
    }

    showImageUploadModal = () => {
        this.setState({
            showImageUploadModal: !this.state.showImageUploadModal
        })
    }
    uploadImageToServer = async (adminAvatar, adminInfo) => {
        let fileToUpload, fileLocation;


        if (EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.CLIENT_MODULE_CODE) {
            const {fullName, hospitalCode} = adminInfo
            fileToUpload = new File([adminAvatar], (fullName + new Date().getTime()).concat('.jpeg'))
            fileLocation = FileUploadLocationUtils.getLocationPathForClientAdminFileUpload(hospitalCode, fullName)
        } else {
            const {fullName, companyCode} = adminInfo

            fileToUpload = new File([adminAvatar], (fullName + new Date().getTime()).concat('.jpeg'))
            fileLocation = FileUploadLocationUtils.getLocationPathForCompanyAdminFileUpload(companyCode, fullName)
        }
        return await uploadImageInMinioServer(fileToUpload, fileLocation)
    }
    /*********************************************************************************************/

    handleQuickLinkClick = () => {
        EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.CLIENT_MODULE_CODE ?
            this.props.history.push('/quickMenu/departmentCheckIn') :
            this.props.history.push('/admin/quickMenu/departmentCheckIn');
    }

    closeProfileDetailsViewModal = () => {
        this.setState({
            showProfileDetailModal: false
        })
    }

    componentDidMount() {
        this.setLoggedInUserInfo()
    }

    render() {
        return (
            <React.Fragment>
                <div className="d-flex flex-column container-fluid">
                    <header className="main-header container-fluid d-flex justify-content-between align-items-center">
                        <div className="header-content-left">
                            <CBreadcrumb
                                id="cogent"
                                breadcrumbData={this.props.dataForBreadCrumb}
                            />
                        </div>
                        {/*search start*/}
                        <div className="header-content-right d-flex align-items-center">
                            <CDoubleShiftSearch/>

                            {/* end search */}

                            <div className="fav-links">
                                <CFavourites
                                    //  {...this.props}
                                />
                            </div>


                            {/* start user profile */}
                            <Dropdown alignRight className="user-profile">
                                <Dropdown.Toggle variant="default" id="dropdown-basic">
                                    <Image
                                        src={
                                            this.state.userInfo.fileUri
                                                ? this.state.userInfo.fileUri
                                                : require('../../img/picture.png')
                                        }
                                        className="avatar"
                                    />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div className="user-details">
                                        <div className="avatar" onClick={this.showImageUploadModal}>
                                        <Image
                                            src={
                                                this.state.userInfo.fileUri
                                                    ? this.state.userInfo.fileUri
                                                    : require('../../img/picture.png')
                                            }
                                            className=""
                                        />
                                         </div>
                                        <div className="user-name">
                                            {' '}
                                            {this.state.userInfo && this.state.userInfo.fullName}
                                        </div>
                                        {/* <div
                                        className="user-name"> {this.state.userInfo && this.state.userInfo.hospitalName}</div> */}
                                        <OverlayTrigger
                                            placement="left"
                                            overlay={<Tooltip id="tooltip-disabled">Profile</Tooltip>}
                                        >
                                            <span className="d-inline-block">
                                                <div
                                                    className="profile-name"
                                                    onClick={this.handleViewProfileDetails}
                                                >
                                                    <i className="fa fa-id-badge"></i>{' '}
                                                    {this.state.userInfo && this.state.userInfo.profileName}
                                                </div>
                                                {/* <Button variant="secondary">Tooltip on {placement}</Button> */}
                                            </span>
                                        </OverlayTrigger>

                                        {/*{this.state.userInfo.isCompany === 'Y' ? (*/}
                                        {/*    <div>*/}
                                        {/*        <Badge variant="primary">Cogent Admin</Badge>*/}
                                        {/*    </div>*/}
                                        {/*) : (*/}
                                        {/*    ''*/}
                                        {/*)}*/}
                                        <Button
                                            variant="outline-light"
                                            className="mb-2 reset-password"
                                        >
                                            Reset Password
                                        </Button>
                                    </div>

                                    <div className="logout">
                                        <Button
                                            variant="outline-primary"
                                            onClick={this.handleChangePassword}
                                            block
                                        >
                                            <i className="fa fa-lock"/> Change Password
                                        </Button>
                                        <Button
                                            variant="outline-primary"
                                            onClick={this.logoutUser}
                                            disabled={this.state.isLogoutPending}
                                            block
                                        >
                                            <i className="fa fa-sign-out"/>&nbsp;
                                            {this.state.isLogoutPending ?
                                                <span className="saving"> Loging Out <img
                                                    alt="three-dots"
                                                    src={require("../../img/three-dots.svg")}/></span> :
                                                "Logout"
                                            }


                                        </Button>
                                    </div>
                                    {this.state.showChangePasswordModal && (
                                        <CChangePasswordModal
                                            showPasswordChangeModal={this.state.showChangePasswordModal}
                                            setShowModal={this.setShowModal}
                                            oldPassword={this.state.oldPassword}
                                            oldPasswordError={this.state.errorOldPassword}
                                            onChangeHandler={this.onChangeHandler}
                                            changePassword={this.changePassword}
                                            isPasswordChangePending={this.state.isPasswordChangePending}
                                        />
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* end user profile */}
                        </div>
                    </header>
                </div>


                {/* <!--end header-wrapper--> */}
                {this.state.showProfileDetailModal ? (
                    EnvironmentVariableGetter.REACT_APP_MODULE_CODE ===
                    EnvironmentVariableGetter.ADMIN_MODULE_CODE ? (
                        <CompanyProfilePreviewRoles
                            showModal={this.state.showProfileDetailModal}
                            setShowModal={this.closeProfileDetailsViewModal}
                            profileData={this.state.profileData}
                            rolesJson={menuRoles}
                        />
                    ) : (
                        <PreviewClientProfileRoles
                            showModal={this.state.showProfileDetailModal}
                            setShowModal={this.closeProfileDetailsViewModal}
                            profileData={this.state.profileData}
                            rolesJson={menuRoles}
                        />
                    )
                ) : (
                    ''
                )}
                {this.state.showImageUploadModal ?
                    <CImageUploadAndCropModal
                        showModal={this.state.showImageUploadModal}
                        setShowModal={this.showImageUploadModal}
                        ruleOfThirds={true}
                        handleImageUpload={this.handleImageUpload}
                        imageSrc={this.state.adminImage}
                        croppedImageSrc={this.state.adminImageCroppedUrl}
                        circularCrop={true}
                        onImageSelect={this.handleImageSelect}
                        onImageCrop={data => this.handleCropImage(data)}
                        isLoading={this.state.isImageUploading}
                    />
                    : ''
                }
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
                                <i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                            </>
                        )
                    }
                    message={this.state.alertMessageInfo.message}
                />
            </React.Fragment>
        )
    }
}

export default CHeader
