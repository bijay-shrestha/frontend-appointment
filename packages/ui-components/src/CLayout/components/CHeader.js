import React, { Component } from 'react';
import { Button, Dropdown, FormControl, Image, InputGroup } from 'react-bootstrap';
import * as Material from 'react-icons/md';
import Cookies from 'js-cookie'
import { Axios } from "@frontend-appointment/core";
import { CAlert } from "@frontend-appointment/ui-elements";
import { CBreadcrumb } from '@frontend-appointment/ui-elements';


class CHeader extends Component {
    state = {
        alertMessageInfo: {
            variant: '',
            message: ''
        },
        showAlert: false
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

    logoutUser = async () => {
        if (Cookies.get('XSRF-TOKEN')) {
            try {
                await Axios.get('/cogent/logout');
                Cookies.remove('XSRF-TOKEN',{domain:process.env.REACT_APP_DOMAIN_NAME});
                localStorage.removeItem('userMenus');
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
                            breadcrumbData={this.props.dataForBreadCrumb} />


                    </div>

                    <div className="header-content-right d-flex align-items-center">


                        <Dropdown alignRight className="topbar-dropdown topbar-search">
                            <Dropdown.Toggle variant="default" id="dropdown-basic"
                                className="search-button rounded-circle">

                                {/* <Material.MdSearch className="search-icon"/> */}

                                <InputGroup className="ts-input">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="ssea">
                                            <Material.MdSearch className="search-icon" />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl
                                        placeholder="Search ..."

                                    />
                                    <InputGroup.Append>
                                        <InputGroup.Text> <Material.MdClose /></InputGroup.Text>
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

                        <Dropdown alignRight className="module-switcher">
                            <Dropdown.Toggle variant="default" id="dropdown-basic">
                                <Material.MdApps className="md-apps" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className="hide-box">
                            <ul className="clearfix">
                                <li>
                                   <a>  <Material.MdFingerprint />
                                   <span>Pharmacy</span>
                                   </a>
                                </li>
                                <li>
                                <a> <Material.MdFlightTakeoff />
                                <span>Pharmacy</span></a>
                                </li>
                                <li>
                                  <a><Material.MdTrendingFlat />
                                  <span>Pharmacy</span></a>  
                                </li>
                                <li>
                                <a> <Material.MdFlightTakeoff />
                                <span>Pharmacy</span></a>
                                </li>
                                <li>
                                  <a><Material.MdTrendingFlat />
                                  <span>Pharmacy</span></a>  
                                </li>
                               
                            </ul>
                            </div>



                            </Dropdown.Menu>
                        </Dropdown>

                        {/* end module switcher */}




                        {/* start user profile */}

                        <Dropdown alignRight className="user-profile">
                            <Dropdown.Toggle variant="default" id="dropdown-basic">


                                <Image src={require("../../img/sabu.jpg")} className="avatar" />
                                {/* <span>Sabu Shakya</span>
                                <i className='fa fa-sort-down'></i> */}

                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <div className="user-details">
                                    <Image src={require("../../img/sabu.jpg")} className="avatar" />
                                    <div className="user-name">Ssabu Shakkya</div>
                                    <div className="depart-name">Administrator</div>
                                    <div className="profile-name">ProfileOne</div>
                                    <Button variant="outline-light" className="mb-2 reset-password" >Reset Password</Button>
                                </div>

                                <div className="logout">
                                    <Button variant="primary"
                                        onClick={this.logoutUser}
                                        block><i className='fa fa-sign-out'></i> Logout</Button>
                                </div>

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
