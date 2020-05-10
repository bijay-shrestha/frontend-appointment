import React, {PureComponent} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import ProfileInfoForm from './ProfileInfoForm'
import ProfileMenuAssignment from './ProfileMenuAssignment'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import {ConnectHoc} from '@frontend-appointment/commons'
import {
    clearSuccessErrorMessagesFromStore,
    createProfile,
    DepartmentSetupMiddleware,
    HospitalSetupMiddleware
} from "@frontend-appointment/thunk-middleware";
import ConfirmationModal from "./ConfirmationModal";
import * as Material from 'react-icons/md';
import {
    clientUserMenusJson,
    EnterKeyPressUtils,
    EnvironmentVariableGetter,
    menuRoles,
    ProfileSetupUtils,
    TryCatchHandler, UserMenuUtils,
} from "@frontend-appointment/helpers";
import {AdminModuleAPIConstants} from "@frontend-appointment/web-resource-key-constants";

const {FETCH_DEPARTMENTS_FOR_DROPDOWN, FETCH_DEPARTMENTS_FOR_DROPDOWN_BY_HOSPITAL} = AdminModuleAPIConstants.departmentSetupAPIConstants;
const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;
const {CREATE_PROFILE} = AdminModuleAPIConstants.profileSetupAPIConstants;

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;
const {fetchActiveDepartmentsForDropdown, fetchActiveDepartmentsByHospitalId} = DepartmentSetupMiddleware;

class ProfileAdd extends PureComponent {

    state = {
        profileDescription: '',
        profileName: '',
        selectedDepartment: null,
        selectedHospital: null,
        selectedMenus: [],
        status: 'Y',
        // subDepartmentsByDepartmentId: [],
        userMenus: [],
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
        },
        departmentListByHospital: [],
        originalTotalNoOfMenusAndRoles: ProfileSetupUtils.countTotalNoOfMenusAndRoles(
            clientUserMenusJson[EnvironmentVariableGetter.CLIENT_MODULE_CODE]),
        aliasOfHospital: '',
        isCloneAndAdd:false
    };

    closeAlert = () => {
        this.props.clearSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };

    resetStateValues = () => {
        this.setState({
            profileDescription: '',
            profileName: '',
            selectedDepartment: null,
            selectedHospital: null,
            selectedMenus: [],
            status: 'Y',
            userMenus: [],
            defaultSelectedMenu: [],
            showConfirmModal: false,
            selectedUserMenusForModal: [],
            userMenuAvailabilityMessage: '',
            formValid: false,
            profileNameValid: false,
            profileDescriptionValid: false,
            aliasOfHospital: ''
        })
    };

    resetFormData = () => {
        this.resetStateValues();
    };

    setShowConfirmModal = () => {
        this.setState({showConfirmModal: !this.state.showConfirmModal});
    };

    initialApiCalls = async () => {
        await this.fetchDepartments();
        await this.fetchHospitals();
    };

    componentDidMount() {
        TryCatchHandler.genericTryCatch(this.initialApiCalls());
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
        await TryCatchHandler.genericTryCatch(this.props.fetchActiveDepartmentsForDropdown(FETCH_DEPARTMENTS_FOR_DROPDOWN));
    };

    fetchHospitals = async () => {
        await TryCatchHandler.genericTryCatch(this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN))
    };

    fetchDepartmentsByHospitalId = async value => {
        value &&
        await this.props.fetchActiveDepartmentsByHospitalId(FETCH_DEPARTMENTS_FOR_DROPDOWN_BY_HOSPITAL, value);
        const {departmentsByHospital} = {...this.props.DepartmentSetupReducer};
        const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
        let selectedHospital = hospitalsForDropdown.find(hospital => hospital.value === value);
        await this.setState({
            selectedDepartment: null,
            userMenus:[],
            defaultSelectedMenu:[],
            selectedMenus:[],
            departmentListByHospital: [...departmentsByHospital],
            aliasOfHospital: selectedHospital.alias || '',
        });
    };

    filterMenuByDepartment = () => {
        const{selectedMenus,isCloneAndAdd}=this.state
       // const {hospitalsForDropdown,} = this.props.HospitalDropdownReducer;
        let alphabeticallySortedMenus = UserMenuUtils.sortUserMenuJson(clientUserMenusJson[EnvironmentVariableGetter.CLIENT_MODULE_CODE]);

        alphabeticallySortedMenus ?
            this.setState(prevState=>({
                userMenus:isCloneAndAdd?prevState.userMenus:[...alphabeticallySortedMenus],
                selectedMenus:isCloneAndAdd?[...selectedMenus]:[],
                defaultSelectedMenu:isCloneAndAdd?prevState.defaultSelectedMenu:alphabeticallySortedMenus[0]
            })) :
            this.setState({
                userMenus:[],
                defaultSelectedMenu:[],
                selectedMenus:[],
                userMenuAvailabilityMessage: 'No user menus available.'
            });
    };

    checkFormValidity = () => {
        let formValidity = this.state.profileNameValid && this.state.profileDescriptionValid && this.state.profileName
            && this.state.profileDescription && this.state.selectedDepartment !== null && this.state.selectedHospital !== null
            && this.state.selectedMenus.length !== 0;
        console.log("Form Validity:::",formValidity);
        this.setState({
            formValid: formValidity
        })
    };

    async bindValuesToState(event, fieldValid) {
        let fieldName = event.target.name;
        let value = event.target.type === 'checkbox' ? (event.target.checked ? 'Y' : 'N') : event.target.value;
        let label = event.target.label;
        await this.setStateValues(fieldName, value, label, fieldValid);
        switch (fieldName) {
            case 'selectedHospital':
                value ? this.fetchDepartmentsByHospitalId(value) : this.setState({
                    selectedHospital: null,
                    selectedDepartment: null,
                    userMenus: [],
                    defaultSelectedMenu: [],
                    selectedMenus: [],
                    departmentListByHospital: []
                });
                break;
            case 'selectedDepartment':
                value ? this.filterMenuByDepartment(value) : this.setState({
                    selectedDepartment: null,
                    userMenus: [],
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
            currentSelectedMenus = [...ProfileSetupUtils.prepareUserMenusAndRolesCombinationList(userMenus)];
        }

        userMenusSelected = currentSelectedMenus.length && this.setValuesForModalDisplay(
            this.state.userMenus, currentSelectedMenus);

        await this.setState({
            selectedMenus: currentSelectedMenus,
            selectedUserMenusForModal: userMenusSelected,
        });
        // console.log(this.state.selectedMenus);
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

        let userMenusSelected = this.setValuesForModalDisplay(this.state.userMenus, currentSelectedMenus);

        await this.setState({
            selectedMenus: currentSelectedMenus,
            selectedUserMenusForModal: userMenusSelected,
        });
        this.checkFormValidity();
    };
    
    isCloneAndAdd = async ()=>{
    await this.setState({
        isCloneAndAdd:true
    })
    this.handleConfirmClick('cloneAndAdd')
    }
    handleConfirmClick = async (value) => {
        const {
            profileName, profileDescription, status, selectedDepartment,
            selectedHospital, selectedMenus
        } = this.state;
        let profileDetails = {
            profileDTO: {
                name: profileName,
                description: profileDescription,
                status: status,
                departmentId: selectedDepartment && selectedDepartment.value,
                hospitalId: selectedHospital && selectedHospital.value,
            },
            profileMenuRequestDTO: selectedMenus
        };
        try {
            await this.props.createProfile(CREATE_PROFILE, profileDetails);
            // this.setShowConfirmModal();
            if(!value)
              this.resetStateValues();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: "Profile Added successfully."
                },
                showConfirmModal: false,
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
        EnterKeyPressUtils.handleEnter(event)
    };

    render() {

      //  const {departments, departmentsByHospital} = this.props.DepartmentSetupReducer;
        const {hospitalsForDropdown,} = this.props.HospitalDropdownReducer;
        const {isCreateProfileLoading} = this.props.ProfileSetupReducer;
        const {
            selectedDepartment, selectedHospital, profileDescription, profileName, status,
            errorMessageForProfileDescription, errorMessageForProfileName, userMenus, selectedMenus, defaultSelectedMenu,
            selectedUserMenusForModal, userMenuAvailabilityMessage, showConfirmModal, showAlert, alertMessageInfo, formValid,
            departmentListByHospital, aliasOfHospital,isCloneAndAdd
        } = this.state;

        return (
            <>
                <div className=" ">
                    <Container className="bg-white add-container " fluid>

                        <Row>
                            <ProfileInfoForm
                                onEnterKeyPress={this.handleEnter}
                                departmentList={departmentListByHospital}
                                hospitalList={hospitalsForDropdown}
                                onInputChange={this.handleOnChange}
                                profileInfoObj={{
                                    departmentValue: selectedDepartment,
                                    hospitalValue: selectedHospital,
                                    profileDescription: profileDescription,
                                    profileName: profileName,
                                    status: status
                                }}
                                errorMessageForProfileName={errorMessageForProfileName}
                                errorMessageForProfileDescription={errorMessageForProfileDescription}
                            />
                            {selectedDepartment &&
                            <ProfileMenuAssignment
                                userMenus={userMenus}
                                selectedMenus={selectedMenus}
                                defaultSelectedMenu={defaultSelectedMenu}
                                onCheckAllUserMenus={this.addAllMenusAndRoles}
                                onTabAndRolesChange={this.handleRolesCheck}
                                resetFormData={this.resetFormData}
                                profileData={{
                                    profileName: profileName,
                                    profileDescription: profileDescription,
                                    departmentValue: selectedDepartment,
                                    hospitalValue: selectedHospital,
                                    status: status,
                                    selectedMenus: selectedMenus,
                                    userMenus: userMenus,
                                    selectedUserMenusForModal: selectedUserMenusForModal,
                                    userMenuAvailabilityMessage: userMenuAvailabilityMessage,
                                    hospitalAlias: aliasOfHospital
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
                                    disabled={!formValid || showConfirmModal}
                                    isLoading={showConfirmModal}
                                    onClickHandler={this.setShowConfirmModal}/>
                                <ConfirmationModal
                                    showConfirmModal={showConfirmModal}
                                    setShowConfirmModal={this.setShowConfirmModal}
                                    onConfirmClick={() => this.handleConfirmClick()}
                                    isCloneAndAdd={()=>this.isCloneAndAdd()}
                                    boolFlagForCloneAndAdd ={isCloneAndAdd}
                                    isAddLoading={isCreateProfileLoading}
                                    profileData={{
                                        profileName: profileName,
                                        profileDescription: profileDescription,
                                        departmentValue: selectedDepartment,
                                        hospitalValue: selectedHospital,
                                        status: status,
                                        selectedMenus: selectedMenus,
                                        selectedUserMenusForModal: selectedUserMenusForModal,
                                        userMenus: userMenus,
                                        hospitalAlias: aliasOfHospital
                                    }}
                                    rolesJson={menuRoles}
                                />
                            </Col>
                        </Row>
                        <CAlert id="profile-manage"
                                variant={alertMessageInfo.variant}
                                show={showAlert}
                                onClose={this.closeAlert}
                                alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                                </> : <i className="fa fa-exclamation-triangle" aria-hidden="true"/>}
                                message={alertMessageInfo.message}
                        />
                    </Container>
                </div>
            </>

        );
    }
}

export default ConnectHoc(ProfileAdd,
    [
        'ProfileSetupReducer',
        'DepartmentSetupReducer',
        'HospitalDropdownReducer'
    ], {
        fetchActiveDepartmentsForDropdown,
        createProfile,
        clearSuccessErrorMessagesFromStore,
        fetchActiveHospitalsForDropdown,
        fetchActiveDepartmentsByHospitalId
    })
