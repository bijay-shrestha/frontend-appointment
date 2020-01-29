import React, {Component} from 'react';
import {Button, Dropdown, FormControl, Image, InputGroup} from 'react-bootstrap';
import * as Material from 'react-icons/md';
import Cookies from 'js-cookie'
import {Axios} from "@frontend-appointment/core";
import {CAlert, CBreadcrumb} from "@frontend-appointment/ui-elements";
// import {moduleInfoJson} from "@frontend-appointment/helpers";

import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import CChangePasswordModal from "../../CChangePassword/CChangePasswordModal";

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
        errorOldPassword: ''
    };

    closeAlert = () => {
        this.setState({
            showAlert: !this.state.showAlert,
            alertMessageInfo: {
                variant: '',
                message: ''
            },
        });
    };

    setShowModal = () => this.setState({
        showChangePasswordModal: false,
        oldPassword:'',
        errorOldPassword:''
    });

    onChangeHandler = (event) => {
        let {name, value} = event.target;
        this.setState({
            [name]: value
        })
    };

    logoutUser = async () => {
        // TODO: call from middleware after refactoring modules when there will be no circular dependency
        let cookie = Cookies.get('XSRF-TOKEN', {'path': '/', 'domain': process.env.REACT_APP_DOMAIN_NAME});
        if (cookie) {
            try {
                await Axios.get('/cogent/logout');
                Cookies.remove('XSRF-TOKEN', {domain: process.env.REACT_APP_DOMAIN_NAME});
                // let itemsToRemove = ['userMenus', 'adminInfo', 'assignedModules'];
                // itemsToRemove.map(item => {
                //     localStorage.removeItem(item);
                // });
                localStorage.clear();
                this.props.history.push('/');
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage ? e.errorMessage : 'Something wrong in server. Could not logout.'
                    }
                })
            }
        } else {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: "Are you sure you're logged in ?"
                }
            })
        }
    };

    setLoggedInUserInfo = () => {
        let absoluteUrl = window.location.href;
        let base = absoluteUrl.split('#')[0];
        let adminInfo = JSON.parse(localStorage.getItem('adminInfo'));
        let modules = JSON.parse(localStorage.getItem('assignedModules'));
        // TODO CURRENT MODULE AND CHECK VARIABLE NAMES
        this.setState({
            userInfo: {...adminInfo},
            assignedModules: modules && [...modules],
            urlBase: base
        })
    };

    handleChangePassword = () => {
        this.setState({
            showChangePasswordModal: true
        })
    };

    changePassword = async (newPasswordObj) => {
        if (!this.state.oldPassword) {
            this.setState({
                errorOldPassword: 'OLD PASSWORD is required!'
            })
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
                        variant: "success",
                        message: 'Password Changed successfully. Logout and Login to verify.'
                    },
                    showChangePasswordModal: false
                })
            } catch (e) {
                this.setState({
                    showAlert: true,
                    alertMessageInfo: {
                        variant: "danger",
                        message: e.errorMessage ? e.errorMessage : e.messaage ? e.messaage : 'Something went wrong!!!'
                    },
                    showChangePasswordModal: false
                })
            }
        }
    };

    componentDidMount() {
        this.setLoggedInUserInfo();
        console.log(this.props);
    };

    render() {

        return (
            <React.Fragment>

                <CAlert id="profile-add"
                        variant={this.state.alertMessageInfo.variant}
                        show={this.state.showAlert}
                        onClose={this.closeAlert}
                        alertType={this.state.alertMessageInfo.variant === "success" ?
                            <><i className="fa fa-check-circle" aria-hidden="true"> </i></>
                            : <><i className="fa fa-exclamation-triangle" aria-hidden="true"> </i>
                            </>}
                        message={this.state.alertMessageInfo.message}
                />

                <header className="main-header container-fluid d-flex justify-content-between align-items-center">
                    <div className="header-content-left">
                        {/* <a href="#" className="logo">
                            <span className="logo-mini">cognent</span>
                            <span className="logo-lg">cognent</span>
                        </a> */}

                        <CBreadcrumb
                            id="cogent"
                            breadcrumbData={this.props.dataForBreadCrumb}/>


                    </div>

                    <div className="header-content-right d-flex align-items-center">


                        <Dropdown alignRight className="topbar-dropdown topbar-search">
                            <Dropdown.Toggle variant="default" id="dropdown-basic"
                                             className="search-button rounded-circle">

                                {/* <Material.MdSearch className="search-icon"/> */}

                                <InputGroup className="ts-input">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="ssea">
                                            <Material.MdSearch className="search-icon"/>
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Search ..."

                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text> <Material.MdClose/></InputGroup.Text>
                                    </InputGroup.Append>
                                </InputGroup>

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className="dropdown-details">


                                    {/* <InputGroup className="ts-input">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="ssea">
                                                <Material.MdSearch className="search-icon"/>
                                            </InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl
                                            placeholder="Search ..."

                                        />
                                         <InputGroup.Append>
                                        <InputGroup.Text> <Material.MdClose /></InputGroup.Text>
                                        </InputGroup.Append>
                                    </InputGroup> */}


                                </div>


                                <ul className="drop-down-list">
                                    <li className="">
                                        <div className="menu">Menu :</div>
                                        <div className="sub-menu"> Submenu</div>
                                    </li>
                                    <li className="">
                                        <div className="menu">Menu :</div>
                                        <div className="sub-menu"> Submenu</div>
                                    </li>
                                    <li className="">
                                        <div className="menu">No results found...</div>

                                    </li>

                                </ul>


                            </Dropdown.Menu>
                        </Dropdown>


                        {/* end search */}

                        {/* start  module switcher */}
                        {/*{this.state.assignedModules && this.state.assignedModules.length > 1 &&*/}
                        {/*<Dropdown alignRight className="module-switcher">*/}
                        {/*    <Dropdown.Toggle variant="default" id="dropdown-basic">*/}
                        {/*        <Material.MdApps className="md-apps"/>*/}
                        {/*    </Dropdown.Toggle>*/}

                        {/*    <Dropdown.Menu>*/}
                        {/*        <div className="hide-box">*/}
                        {/*            <ul className="clearfix">*/}
                        {/*                {this.state.assignedModules &&*/}
                        {/*                this.state.assignedModules.map((module, index) => (*/}
                        {/*                    Number(module.subDepartmentId) !== Number(this.state.userInfo.subDepartmentId) ?*/}
                        {/*                        Object.keys(moduleInfoJson).find(code=>code===module.subDepartmentCode) &&*/}
                        {/*                        <li key={'module' + index}>*/}
                        {/*                            <a target='_blank'*/}
                        {/*                               href={moduleInfoJson[module.subDepartmentCode].url}>*/}
                        {/*                                <i className={moduleInfoJson[module.subDepartmentCode].icon}/>*/}
                        {/*                                <span>{module.subDepartmentName}</span>*/}
                        {/*                            </a>*/}
                        {/*                        </li> : ''*/}
                        {/*                ))*/}
                        {/*                }*/}
                        {/*                /!*<li>*!/*/}
                        {/*                /!*    <a> <Material.MdFingerprint/>*!/*/}
                        {/*                /!*        <span>Pharmacy</span>*!/*/}
                        {/*                /!*    </a>*!/*/}
                        {/*                /!*</li>*!/*/}
                        {/*                /!*<li>*!/*/}
                        {/*                /!*    <a> <Material.MdFlightTakeoff/>*!/*/}
                        {/*                /!*        <span>Pharmacy</span></a>*!/*/}
                        {/*                /!*</li>*!/*/}
                        {/*                /!*<li>*!/*/}
                        {/*                /!*    <a><Material.MdTrendingFlat/>*!/*/}
                        {/*                /!*        <span>Pharmacy</span></a>*!/*/}
                        {/*                /!*</li>*!/*/}
                        {/*                /!*<li>*!/*/}
                        {/*                /!*    <a> <Material.MdFlightTakeoff/>*!/*/}
                        {/*                /!*        <span>Pharmacy</span></a>*!/*/}
                        {/*                /!*</li>*!/*/}
                        {/*                /!*<li>*!/*/}
                        {/*                /!*    <a><Material.MdTrendingFlat/>*!/*/}
                        {/*                /!*        <span>Pharmacy</span></a>*!/*/}
                        {/*                /!*</li>*!/*/}

                        {/*            </ul>*/}
                        {/*        </div>*/}


                        {/*    </Dropdown.Menu>*/}
                        {/*</Dropdown>*/}
                        {/*}*/}


                        {/* end module switcher */}


                        {/* start user profile */}

                        <Dropdown alignRight className="user-profile">
                            <Dropdown.Toggle variant="default" id="dropdown-basic">


                                <Image src={require("../../img/sabu.jpg")} className="avatar"/>
                                {/* <span>Sabu Shakya</span>
                                <i className='fa fa-sort-down'></i> */}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className="user-details">
                                    <Image src={require("../../img/sabu.jpg")} className="avatar"/>
                                    <div
                                        className="user-name"> {this.state.userInfo && this.state.userInfo.fullName}</div>
                                    {/* <div className="depart-name">
                                        <Material.MdDomain /> :
                                        <span>Module : &nbsp;</span>
                                        {this.state.userInfo && this.state.userInfo.subDepartmentName}
                                        </div>  */}
                                    <div
                                        className="profile-name">
                                        {/* <Material.MdPeopleOutline /> : */}
                                        {/* <span>&nbsp;Profile : &nbsp;</span> */}

                                        {this.state.userInfo && this.state.userInfo.profileName}</div>
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
