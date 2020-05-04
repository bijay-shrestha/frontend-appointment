import React, {Component} from 'react'
import {Button, Dropdown, Image,Tooltip,OverlayTrigger} from 'react-bootstrap'
import {Axios} from '@frontend-appointment/core'
import {CAlert, CBreadcrumb, CDoubleShiftSearch} from '@frontend-appointment/ui-elements'
import {AdminModuleAPIConstants, CommonAPIConstants} from '@frontend-appointment/web-resource-key-constants'
import CChangePasswordModal from '../../CChangePassword/CChangePasswordModal'
import {EnvironmentVariableGetter, LocalStorageSecurity} from '@frontend-appointment/helpers';
import * as Material from 'react-icons/md';

const {CHANGE_COMPANY_ADMIN_PASSWORD} = AdminModuleAPIConstants.companyAdminSetupApiConstants;
const {CHANGE_PASSWORD} = AdminModuleAPIConstants.adminSetupAPIConstants;
const {ADMIN_FEATURE} = CommonAPIConstants

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
        isPasswordChangePending: false
    }

    closeAlert = () => {
        this.setState({
            showAlert: false,
        });
    }

    setShowModal = () =>
        this.setState({
            showChangePasswordModal: false,
            oldPassword: '',
            errorOldPassword: ''
        })

    onChangeHandler = event => {
        let {name, value} = event.target
        this.setState({
            [name]: value
        })
    }

    savePinOrUnpinUserMenu = async (path, status) => {
        console.log("Status", status);
        try {
            await Axios.put(path, {isSideBarCollapse: !status ? 'Y' : 'N'})
        } catch (e) {
            return true
        }
    }

  logoutUser = async () => {
  await this.savePinOrUnpinUserMenu(
      ADMIN_FEATURE,
      Boolean(LocalStorageSecurity.localStorageDecoder('isOpen')) || false
    )
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
            this.state.userInfo.hospitalName || 'Cogent-Appointment-Admin'
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
            this.handleIsPasswordChangePending(true);
            let passwordChangeData = {
                oldPassword: this.state.oldPassword,
                newPassword: newPasswordObj.password,
                remarks: newPasswordObj.remarks,
                id: this.state.userInfo.adminId
            };

            let API_PATH = Object.is(EnvironmentVariableGetter.REACT_APP_MODULE_CODE,
                EnvironmentVariableGetter.ADMIN_MODULE_CODE) ? CHANGE_COMPANY_ADMIN_PASSWORD :
                CHANGE_PASSWORD;
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
                });
                this.handleIsPasswordChangePending(false);
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
                this.handleIsPasswordChangePending(false);
            }
        }
    }

    handleIsPasswordChangePending = async (isLoading) => {
        await this.setState({
            isPasswordChangePending: isLoading
        });
    };

    componentDidMount() {
        this.setLoggedInUserInfo()
        // document.addEventListener('keydown', this.handleKeyPress);
        // document.addEventListener("click", this.blurSearchOnMouseClick);
    }

    // componentWillUnmount() {
    //     document.removeEventListener("keydown", this.handleKeyPress);
    //     document.removeEventListener('click', this.blurSearchOnMouseClick);
    //     clearTimeout(this.clearKeyPressCount, this.clearStateOnTimeout);
    // }

    render() {
        return (
            <React.Fragment>
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
                                    <Image
                                        src={
                                            this.state.userInfo.fileUri
                                                ? this.state.userInfo.fileUri
                                                : require('../../img/sabu.jpg')
                                        }
                                        className="avatar"
                                    />
                                    <div className="user-name">
                                        {' '}
                                        {this.state.userInfo && this.state.userInfo.fullName}
                                    </div>
                                    {/* <div
                                        className="user-name"> {this.state.userInfo && this.state.userInfo.hospitalName}</div> */}
                                    <OverlayTrigger  placement="left" overlay={<Tooltip id="tooltip-disabled">Profile</Tooltip>}>
                                        <span className="d-inline-block">
                                            <div className="profile-name">
                                                <i className="fa fa-id-badge"></i> {this.state.userInfo && this.state.userInfo.profileName}
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
                                        block
                                    >
                                        <i className="fa fa-sign-out"/> Logout
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
                <CAlert
                    id="profile-manage"
                    variant={this.state.alertMessageInfo.variant}
                    show={this.state.showAlert}
                    onClose={this.closeAlert}
                    alertType={this.state.alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                    </> : <><i className="fa fa-exclamation-triangle" aria-hidden="true"/>
                    </>}
                    message={this.state.alertMessageInfo.message}
                />
            </React.Fragment>
        )
    }
}

export default CHeader
