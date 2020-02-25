import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Badge, Button, Dropdown, Image} from 'react-bootstrap';
import {Axios} from '@frontend-appointment/core';
import {CBreadcrumb, CMenuSearch} from '@frontend-appointment/ui-elements';

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
        searchKeyword: '',
        searchResult: [],
        showResults: false
    };

    formControl = React.createRef();
    searchDropdown = React.createRef();
    dropdownToggler = React.createRef();
    keyPressCount = 0;

    setKeyPressCount = value => {
        this.keyPressCount = value
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

    clearCount = async () => {
        // await this.setState({
        //     keyPressCount: 0
        // });
        this.setKeyPressCount(0)
    };

    clearCountDom = () => {
        let searchClass = ReactDOM.findDOMNode(this.formControl.current).className
        if (!searchClass.includes('active')) {
            this.formControl.current && this.formControl.current.focus()
        } else {
            this.formControl.current && this.blurAndHideResults()
        }
    };

    clearKeyPressCount = () => {
        setTimeout(() => this.clearCount(), 300)
    };

    blurAndHideResults = async () => {
        this.formControl.current.blur();
        await this.setState({
            showResults: false
        })
    };

    handleKeyPress = event => {
        let keyCount = this.keyPressCount;
        if (event.keyCode === 16) {
            if (!keyCount || keyCount === 2) {
                keyCount += 1;
                this.setKeyPressCount(keyCount)
                this.clearKeyPressCount()
            } else if (keyCount === 1) {
                keyCount += 1;
                this.setKeyPressCount(keyCount)
                this.clearKeyPressCount()
                this.clearCountDom()
            } else if (keyCount === 3) {
                this.formControl.current && this.formControl.current.blur()
                this.clearCount()
            }
        } else if (event.keyCode === 40) {
            this.dropdownToggler.current.click();
        }
    };

    componentDidMount() {
        this.setLoggedInUserInfo();
        document.addEventListener('keyup', this.handleKeyPress);
        // document.addEventListener('keyup', this.handleKeyPress);
    };

    componentWillUnmount() {
        document.removeEventListener("keyup", this.handleKeyPress);
        // document.removeEventListener("keyup", this.handleKeyPress);
        clearTimeout(this.clearKeyPressCount, this.clearStateOnTimeout);
    }

    resetState = () => {
        this.setState({
            searchKeyword: '',
            // searchResult: [],
            showResults: false
        })
    };

    clearStateOnTimeout = () => {
        setTimeout(() => this.resetState(), 300);
    };

    handleSearchOnBlur = (event) => {
        if (event.keyCode === 40) {
            this.formControl.current.focus();
        } else {
            this.clearStateOnTimeout();
            ReactDOM.findDOMNode(this.formControl.current).classList.remove('active');
        }
    };

    handleSearchOnFocus = () => {
        ReactDOM.findDOMNode(this.formControl.current).classList.add('active');
        this.searchDropdown.current.focus();
    };

    searchUserMenus = (event) => {
        let BASE_PATH = process.env.REACT_APP_BASE_PATH_CODE ? process.env.REACT_APP_BASE_PATH_CODE : '';
        let keyWord = event.target.value;
        let menusMatchingKeyWord = [];
        let userMenus = JSON.parse(localStorage.getItem('userMenus'));

        if (keyWord !== '') {
            keyWord = keyWord.toLowerCase();
            userMenus.map(
                userMenu => {
                    if (!userMenu.childMenus.length) {
                        if ((userMenu.name).toLowerCase().includes(keyWord)) {
                            // IF PARENT MATCHES THE KEYWORD,ADD PARENT
                            let displayData = {
                                id: userMenu.id,
                                name: userMenu.name,
                                path: BASE_PATH.concat(userMenu.path),
                                breadcrumb: userMenu.name,
                                iCharacter: userMenu.name.charAt(0).toUpperCase()
                            };
                            menusMatchingKeyWord.push(displayData);
                        }
                    } else {
                        // IF PARENT DID NOT MATCH CHECK CHILDREN, IF ANY  CHILD MATCHED ADD  PARENT AND CHILD
                        let childrenMatchingKeyWord = userMenu.childMenus.filter(
                            child => (child.name).toLowerCase().includes(keyWord));
                        if (childrenMatchingKeyWord.length > 0) {
                            childrenMatchingKeyWord.map(child => {
                                let displayData = {
                                    id: child.id,
                                    name: child.name,
                                    path: BASE_PATH.concat(child.path),
                                    breadcrumb: userMenu.name.concat("/".concat(child.name)),
                                    iCharacter: child.name.charAt(0).toUpperCase()
                                };
                                menusMatchingKeyWord.push(displayData);
                            });
                        }
                    }
                }
            )
        } else {
            menusMatchingKeyWord = [];
        }

        this.setState({
            searchKeyword: event.target.value,
            searchResult: [...menusMatchingKeyWord],
            showResults: true
        });
    };

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
                        <Dropdown
                            ref={this.searchDropdown}
                            alignRight
                            className="topbar-dropdown topbar-search"
                            show={this.state.showResults}
                        >
                            <Dropdown.Toggle variant="default" id="dropdown-basic"
                                             className="search-button rounded-circle"
                                             ref={this.dropdownToggler}>
                                <CMenuSearch
                                    id="searchMenu"
                                    setRef={this.formControl}
                                    onChange={this.searchUserMenus}
                                    value={this.state.searchKeyword}
                                    handleOnBlur={this.handleSearchOnBlur}
                                    handleOnFocus={this.handleSearchOnFocus}
                                />
                            </Dropdown.Toggle>
                            <Dropdown.Menu className="drop-down-list">
                                {this.state.showResults ?
                                    //<ul className="drop-down-list">
                                    // {
                                    this.state.searchResult.length ?
                                        this.state.searchResult.map(value => (
                                            <Dropdown.Item
                                                key={'menu-li' + value.id}
                                                as={Link}
                                                to={value.path}
                                                className="menu-box">
                                                <div className="anchor-icon">
                                                    {value.iCharacter}
                                                </div>
                                                <div className="menu-box">
                                                    <div className="menu">{value.name}</div>
                                                    <div className="sub-menu">{value.breadcrumb}</div>
                                                </div>
                                            </Dropdown.Item>
                                            // <li className="" key={'menu-li' + value.id}>
                                            //     <div className="" key={value.id}>
                                            //         <Link
                                            //             key={'menu-link' + value.id}
                                            //             to={value.path}
                                            //             className="menu-link">
                                            //             <div className="anchor-icon">
                                            //                 {value.iCharacter}
                                            //             </div>
                                            //             <div className="menu-box">
                                            //                 <div className="menu">{value.name}</div>
                                            //                 <div className="sub-menu">{value.breadcrumb}</div>
                                            //             </div>
                                            //         </Link>
                                            //     </div>
                                            // </li>
                                        ))
                                        :
                                        <li className="">
                                            <div className="">
                                                No result(s) found.
                                            </div>
                                        </li>
                                    //     }
                                    // </ul>
                                    : ''
                                }
                            </Dropdown.Menu>
                        </Dropdown>


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
