import React, {PureComponent} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import ProfileInfoForm from './ProfileInfoForm'
import ProfileMenuAssignment from './ProfileMenuAssignment'
import {CAlert, CButton, CNavTabs} from '@frontend-appointment/ui-elements'
import {menus, rolesFromJson, TabsHOC, TryCatchHandler} from '@frontend-appointment/commons'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    clearSuccessErrorMessagesFromStore,
    createProfile,
    fetchDepartments,
    fetchSubDepartmentsByDepartmentId
} from "@frontend-appointment/thunk-middleware";
import ConfirmationModal from "./ConfirmationModal";
import * as Material from 'react-icons/md';
import {profileSetupAPIConstants} from '../ProfileSetupAPIConstants';
import {UserMenuUtils} from "@frontend-appointment/helpers";

const {
    FETCH_DEPARTMENTS_FOR_DROPDOWN,
    FETCH_SUB_DEPARTMENT_BY_DEPARTMENT_ID,
    CREATE_PROFILE
} = profileSetupAPIConstants;

class Add extends PureComponent {

    state = {
        isSubDepartmentDisabled: true,
        profileDescription: '',
        profileName: '',
        selectedDepartment: null,
        selectedSubDepartment: null,
        selectedMenus: [],
        status: 'Y',
        subDepartmentsByDepartmentId: [],
        userMenusBySubDepartment: [],
        defaultSelectedMenu: [],
        showConfirmModal: false,
        selectedUserMenusForModal: [],
        userMenuAvailabilityMessage: '',
        formValid: false,
        profileNameValid: false,
        profileDescriptionValid: false,
        errorMessageForProfileName: "Profile Name should not contain special characters",
        errorMessageForProfileDescription: 'Profile Description should contain 200 characters only.',
        showAlert: false,
        alertMessageInfo: {
            variant: "",
            message: ""
        }
    };

    closeAlert = () => {
        this.props.clearSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };

    resetStateValues = () => {
        this.setState({
            isSubDepartmentDisabled: true,
            profileDescription: '',
            profileName: '',
            selectedDepartment: null,
            selectedSubDepartment: null,
            selectedMenus: [],
            status: 'Y',
            subDepartmentsByDepartmentId: [],
            userMenusBySubDepartment: [],
            defaultSelectedMenu: [],
            showConfirmModal: false,
            selectedUserMenusForModal: [],
            userMenuAvailabilityMessage: '',
            formValid: false,
            profileNameValid: false,
            profileDescriptionValid: false,
        })
    };

    resetFormData = () => {
        this.resetStateValues();
    };

    setShowConfirmModal = () => {
        this.setState({showConfirmModal: !this.state.showConfirmModal});
    };

    componentDidMount() {
        TryCatchHandler.genericTryCatch(this.fetchDepartments());
    }

    handleOnChange = async (event, fieldValid) => {
        event && await this.bindValuesToState(event, fieldValid);
    };

    setStateValues = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({[key]: {value, label}})
            : this.setState({[key]: null})
            : this.setState({[key]: value, [key + "Valid"]: fieldValid});

    fetchDepartments = async () => {
        await TryCatchHandler.genericTryCatch(this.props.fetchDepartments(FETCH_DEPARTMENTS_FOR_DROPDOWN));
    };

    fetchSubDepartments = async departmentId => {
        let response = await TryCatchHandler.genericTryCatch(this.props.fetchSubDepartmentsByDepartmentId(
            FETCH_SUB_DEPARTMENT_BY_DEPARTMENT_ID, departmentId));
        this.setState({subDepartmentsByDepartmentId: response});
    };

    fetchSubDepartmentAndResetSubDepartment = (value) => {
        this.setState({
            isSubDepartmentDisabled: !this.state.selectedDepartment,
            selectedSubDepartment: null,
            subDepartmentsByDepartmentId: [],
            userMenusBySubDepartment: [],
            defaultSelectedMenu: [],
            selectedMenus: [],
            userMenuAvailabilityMessage: ''
        });
        return this.fetchSubDepartments(value);
    };

    filterMenuBySubDepartment = subDepartmentId => {
        let selectedSubDept = this.state.subDepartmentsByDepartmentId.filter(subDepartment =>
            subDepartment.value === subDepartmentId);
        let menusForSubDept = [...menus[selectedSubDept[0].code]];
        let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson([...menusForSubDept]);
        alphabeticallySortedMenus ?
            this.setState({
                userMenusBySubDepartment: [...alphabeticallySortedMenus],
                // defaultSelectedMenu: menus[selectedSubDept[0].code][0],
                selectedMenus: []
            }) :
            this.setState({
                userMenusBySubDepartment: [],
                defaultSelectedMenu: [],
                selectedMenus: [],
                userMenuAvailabilityMessage: 'No user menus available.'
            });
    };

    checkFormValidity = () => {
        let formValidity = this.state.profileNameValid && this.state.profileDescriptionValid && this.state.profileName
            && this.state.profileDescription && this.state.selectedDepartment !== null && this.state.selectedSubDepartment !== null
            && this.state.selectedMenus.length !== 0;

        this.setState({
            formValid: formValidity
        })
    };

    async bindValuesToState(event, fieldValid) {
        let fieldName = event.target.name;
        let value = event.target.value;
        let label = event.target.label;
        await this.setStateValues(fieldName, value, label, fieldValid);
        switch (fieldName) {
            case 'selectedDepartment':
                value ? this.fetchSubDepartmentAndResetSubDepartment(value) : this.setState({
                    isSubDepartmentDisabled: !this.state.selectedDepartment,
                    selectedSubDepartment: null,
                    subDepartmentsByDepartmentId: [],
                    userMenusBySubDepartment: [],
                    defaultSelectedMenu: [],
                    selectedMenus: []
                });
                break;
            case 'selectedSubDepartment':
                value ? this.filterMenuBySubDepartment(value) : this.setState({
                    selectedSubDepartment: null,
                    userMenusBySubDepartment: [],
                    defaultSelectedMenu: [],
                    userMenuAvailabilityMessage: '',
                    selectedMenus: []
                });
                break;
            default:
                break;
        }

        this.checkFormValidity();
    }

    setValuesForModalDisplay = (userMenus, selectedMenuAndRoles) => {
        let selectedParentMenus = new Set(),
            selectedChildMenus = new Set(),
            selectedUserMenus;

        selectedMenuAndRoles.forEach(selectedMenu => {
            let parent = userMenus.find(userMenu => userMenu.id === selectedMenu.parentId);
            parent && selectedParentMenus.add(parent);
            let child = parent && parent.childMenus.length && parent.childMenus.find(
                childMenu => childMenu.id === selectedMenu.userMenuId);
            child && selectedChildMenus.add(child);
        });

        selectedUserMenus = Array.from(selectedParentMenus).map(parent => {
            let data = {
                id: parent.id,
                name: parent.name,
                icon: parent.icon,
                parentId: parent.parentId,
                childMenus: [],
                roles: [...parent.roles]
            };
            let childrenOfParent = Array.from(selectedChildMenus).filter(child => {
                return child.parentId === parent.id && {
                    id: child.id,
                    name: child.name,
                    icon: child.icon,
                    parentId: child.parentId,
                    roles: [...child.roles],
                    childMenus: [...child.childMenus]
                }
            });
            data.childMenus = [...childrenOfParent];
            return data;
        });
        return selectedUserMenus;
    };

    addAllMenusAndRoles = async (userMenus, checkedAllUserMenus) => {
        let currentSelectedMenus = [],
            userMenusSelected;

        if (checkedAllUserMenus) {
            for (let menu of userMenus) {
                if (menu.childMenus.length) {
                    for (let child of menu.childMenus) {
                        child.roles.map(role => {
                            currentSelectedMenus.push({
                                parentId: menu.id,
                                userMenuId: child.id,
                                roleId: role,
                                status: 'Y'
                            })
                        })
                    }
                } else {
                    menu.roles.map(role => {
                        currentSelectedMenus.push({
                            parentId: menu.id,
                            userMenuId: menu.id,
                            roleId: role,
                            status: 'Y'
                        })
                    })
                }
            }
        }

        userMenusSelected = currentSelectedMenus.length && this.setValuesForModalDisplay(
            this.state.userMenusBySubDepartment, currentSelectedMenus);

        await this.setState({
            selectedMenus: currentSelectedMenus,
            selectedUserMenusForModal: userMenusSelected
        });
        console.log(this.state.selectedMenus);
        this.checkFormValidity();
    };

    handleRolesCheck = async (roles, childMenu) => {
        let currentSelectedMenus = [...this.state.selectedMenus];
        for (let role of roles) {
            role.isChecked ?
                !currentSelectedMenus.find(menu => menu.roleId === role.id && menu.userMenuId === childMenu.id) && currentSelectedMenus.push({
                    parentId: childMenu.parentId === null ? childMenu.id : childMenu.parentId,
                    //IN CASE OF PARENT WITH NO CHILD SET PARENT ID TO ITS OWN ID
                    userMenuId: childMenu.id,
                    roleId: role.id,
                    status: 'Y'
                })
                :
                currentSelectedMenus.splice(currentSelectedMenus.findIndex(menu => menu.roleId === role.id && menu.userMenuId === childMenu.id), 1);
        }

        let userMenusSelected = this.setValuesForModalDisplay(this.state.userMenusBySubDepartment, currentSelectedMenus);

        await this.setState({
            selectedMenus: currentSelectedMenus,
            selectedUserMenusForModal: userMenusSelected
        });
        this.checkFormValidity();
    };

    handleConfirmClick = async () => {
        let profileDetails = {
            profileDTO: {
                name: this.state.profileName,
                description: this.state.profileDescription,
                status: this.state.status,
                subDepartmentId: this.state.selectedSubDepartment.value
            },
            profileMenuRequestDTO: this.state.selectedMenus
        };
        try {
            await this.props.createProfile(CREATE_PROFILE, profileDetails);
            // this.setShowConfirmModal();
            this.resetStateValues();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: "Profile Added successfully."
                }
            })
        } catch (e) {
            await this.setShowConfirmModal();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: e.errorMessage ? e.errorMessage : e.message
                }
            })
        }

    };

    handleEnter = (event) => {
        let increment = 1;
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            increment = event.currentTarget.children.length ? 2 : 1;
            form.elements[index + increment].focus();
            if (increment !== 2)
                event.preventDefault();
        }
    };

    render() {
        // const Tabs = TabsHOC(CNavTabs, this.props.userMenus, this.props.path, 1)
        return (
            <>
                {/* <Tabs/> */}

                <div className=" ">
                    <Container className="bg-white add-profile " fluid>

                        <Row>
                            <ProfileInfoForm
                                onEnterKeyPress={this.handleEnter}
                                departmentList={this.props.ProfileSetupReducer.departments}
                                onInputChange={this.handleOnChange}
                                profileInfoObj={{
                                    departmentValue: this.state.selectedDepartment,
                                    isSubDepartmentDisabled: this.state.isSubDepartmentDisabled,
                                    profileDescription: this.state.profileDescription,
                                    profileName: this.state.profileName,
                                    status: this.state.status,
                                    subDepartmentList: this.state.subDepartmentsByDepartmentId,
                                    subDepartmentValue: this.state.selectedSubDepartment,
                                }}
                                errorMessageForProfileName={this.state.errorMessageForProfileName}
                                errorMessageForProfileDescription={this.state.errorMessageForProfileDescription}
                            />
                            {this.state.selectedSubDepartment &&
                            <ProfileMenuAssignment
                                userMenus={this.state.userMenusBySubDepartment}
                                selectedMenus={this.state.selectedMenus}
                                defaultSelectedMenu={this.state.defaultSelectedMenu}
                                onCheckAllUserMenus={this.addAllMenusAndRoles}
                                onTabAndRolesChange={this.handleRolesCheck}
                                resetFormData={this.resetFormData}
                                profileData={{
                                    profileName: this.state.profileName,
                                    profileDescription: this.state.profileDescription,
                                    departmentValue: this.state.selectedDepartment,
                                    subDepartmentValue: {...this.state.selectedSubDepartment},
                                    status: this.state.status,
                                    selectedMenus: this.state.selectedMenus,
                                    userMenusBySubDepartment: this.state.userMenusBySubDepartment,
                                    selectedUserMenusForModal: this.state.selectedUserMenusForModal,
                                    userMenuAvailabilityMessage: this.state.userMenuAvailabilityMessage
                                }}/>
                            }
                        </Row>

                        <Row className="mt-4">
                            <Col sm={12} md={{span: 3, offset: 9}}>
                                <CButton
                                    id="save-profile-add"
                                    variant="primary "
                                    className="float-right btn-action"
                                    name="Save"
                                    disabled={!this.state.formValid}
                                    onClickHandler={this.setShowConfirmModal}>

                                </CButton>
                                <ConfirmationModal
                                    showConfirmModal={this.state.showConfirmModal}
                                    setShowConfirmModal={this.setShowConfirmModal}
                                    onConfirmClick={() => this.handleConfirmClick()}
                                    profileData={{
                                        profileName: this.state.profileName,
                                        profileDescription: this.state.profileDescription,
                                        departmentValue: this.state.selectedDepartment,
                                        subDepartmentValue: this.state.selectedSubDepartment,
                                        status: this.state.status,
                                        selectedMenus: this.state.selectedMenus,
                                        selectedUserMenusForModal: this.state.selectedUserMenusForModal,
                                        userMenusBySubDepartment: this.state.userMenusBySubDepartment
                                    }}
                                    rolesJson={rolesFromJson}
                                />
                            </Col>
                        </Row>
                        <CAlert id="profile-manage"
                                variant={this.state.alertMessageInfo.variant}
                                show={this.state.showAlert}
                                onClose={this.closeAlert}
                                alertType={this.state.alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                                </> : <><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                </>}
                                message={this.state.alertMessageInfo.message}
                        />
                        {/* <Alert variant="success">
                    <div className="icon">
                    <i class="fa fa-times-circle" aria-hidden="true"></i>
                    </div>
                        <div className="message">
                            <h4>Success</h4>
                            <p>thias sfasdfasdflasdjfasdf</p>
                        </div>

                </Alert> */}
                        {/* <Alert variant="warning">
                    <Alert.Heading className=""><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        &nbsp; &nbsp;Some error occured</Alert.Heading>
                           <p>message</p>
                </Alert> */}
                        {/* <Alert variant="success">
                    <Alert.Heading className=""><i class="fa fa-check-circle" aria-hidden="true"></i>
                        &nbsp; &nbsp;Success</Alert.Heading>
                           <p>message</p>
                </Alert> */}

                    </Container>
                </div>
            </>

        );
    }
}

export default ConnectHoc(Add, ['ProfileSetupReducer'], {
  fetchDepartments,
  fetchSubDepartmentsByDepartmentId,
  createProfile,
  clearSuccessErrorMessagesFromStore
})
