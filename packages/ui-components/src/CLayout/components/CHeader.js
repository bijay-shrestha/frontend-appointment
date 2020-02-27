import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Badge, Button, Dropdown, Form, Image} from 'react-bootstrap';
import {Axios} from '@frontend-appointment/core';
import {CBreadcrumb, CDoubleShiftSearch} from '@frontend-appointment/ui-elements';

import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import CChangePasswordModal from '../../CChangePassword/CChangePasswordModal';
import {Link} from "react-router-dom";


const {CHANGE_PASSWORD} = AdminModuleAPIConstants.adminSetupAPIConstants;

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
    };

    setShowModal = () =>
        this.setState({
            showChangePasswordModal: false,
            oldPassword: '',
            errorOldPassword: ''
        });

    onChangeHandler = event => {
        let {name, value} = event.target;
        this.setState({
            [name]: value
        });
    };

    logoutUser = async () => {
        localStorage.clear();
        this.props.history.push('/');
    };

    setLoggedInUserInfo = () => {
        let absoluteUrl = window.location.href;
        let base = absoluteUrl.split('#')[0];
        let adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        // let modules = JSON.parse(localStorage.getItem('assignedModules'));
        // TODO CURRENT MODULE AND CHECK VARIABLE NAMES
        this.setState({
            userInfo: {...adminInfo},
            // assignedModules: modules && [...modules],
            urlBase: base
        });
    };

    handleChangePassword = () => {
        this.setState({
            showChangePasswordModal: true
        });
    };

    changePassword = async (newPasswordObj) => {
        if (!this.state.oldPassword) {
            this.setState({
                errorOldPassword: 'OLD PASSWORD is required!'
            });
        } else {
            let passwordChangeData = {
                oldPassword: this.state.oldPassword,
                newPassword: newPasswordObj.password,
                remarks: newPasswordObj.remarks,
                id: this.state.userInfo.adminId
            };
            try {
                await Axios.put(CHANGE_PASSWORD, passwordChangeData);
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'success',
                        message: 'Password Changed successfully. Logout and Login to verify.'
                    },
                    showChangePasswordModal: false
                });
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: 'danger',
                        message: e.errorMessage ? e.errorMessage : e.message ? e.message : 'Something went wrong!!!'
                    },
                    showChangePasswordModal: false
                });
            }
        }
    };

    componentDidMount() {
        this.setLoggedInUserInfo();
        // document.addEventListener('keydown', this.handleKeyPress);
        // document.addEventListener("click", this.blurSearchOnMouseClick);
    };

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
                            breadcrumbData={this.props.dataForBreadCrumb}/>
                    </div>

                    {/*search start*/}
                    <div className="header-content-right d-flex align-items-center">
                        <CDoubleShiftSearch/>


                        {/* end search */}

                        {/* start user profile */}
                        <Dropdown alignRight className="user-profile">
                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                <Image src={this.state.userInfo.fileUri ? this.state.userInfo.fileUri
                                    : require('../../img/sabu.jpg')} className="avatar"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <div className="user-details">
                                    <Image
                                        src={this.state.userInfo.fileUri ? this.state.userInfo.fileUri
                                            : require('../../img/sabu.jpg')}
                                        className="avatar"/>
                                    <div
                                        className="user-name"> {this.state.userInfo && this.state.userInfo.fullName}</div>
                                    <div
                                        className="profile-name">
                                        {this.state.userInfo && this.state.userInfo.profileName}</div>
                                    {
                                        this.state.userInfo.isCogentAdmin === 'Y' ?
                                            <div>
                                                <Badge variant="primary">Cogent Admin</Badge>
                                            </div> :
                                            ''
                                    }
                                    <Button variant="outline-light" className="mb-2 reset-password">Reset
                                        Password</Button>
                                </div>

                                <div className="logout">
                                    <Button variant="outline-primary"
                                            onClick={this.handleChangePassword}
                                            block><i className='fa fa-lock'/> Change Password</Button>
                                    <Button variant="outline-primary"
                                            onClick={this.logoutUser}
                                            block><i className='fa fa-sign-out'/> Logout</Button>
                                </div>
                                {this.state.showChangePasswordModal &&
                                <CChangePasswordModal
                                    showPasswordChangeModal={this.state.showChangePasswordModal}
                                    setShowModal={this.setShowModal}
                                    oldPassword={this.state.oldPassword}
                                    oldPasswordError={this.state.errorOldPassword}
                                    onChangeHandler={this.onChangeHandler}
                                    changePassword={this.changePassword}
                                />
                                }
                            </Dropdown.Menu>
                        </Dropdown>
                        {/* end user profile */}
                    </div>

                </header>

            </React.Fragment>
        );

    }
}

export default CHeader;
