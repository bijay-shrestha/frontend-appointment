import React, {PureComponent} from 'react';
import AdminInfoForm from "./AdminInfoForm";
import {AdminSetupUtils, EnterKeyPressUtils, ProfileSetupUtils, rolesFromJson} from "@cogent/helpers";
import {ConnectHoc} from "@cogent/commons";
import {
    adminCategoryMiddleware,
    applicationModuleMiddleware,
    clearAdminSuccessErrorMessagesFromStore,
    createAdmin,
    fetchProfileListBySubDepartmentId,
    hospitalSetupMiddleware,
    previewProfile
} from "@cogent/thunk-middleware";
import {AdminModuleAPIConstants} from "@cogent/web-resource-key-constants";
import {Col, Container, Row} from "react-bootstrap";
import {CAlert, CButton} from "@cogent/ui-elements";
import * as Material from 'react-icons/md';
import AdminConfirmationModal from "./AdminConfirmationModal";
import "./../admin-setup.scss";
import PreviewRoles from "../../CommonComponents/PreviewRoles";

const {fetchActiveAdminCategoriesForDropdown} = adminCategoryMiddleware;
const {fetchActiveHospitalsForDropdown} = hospitalSetupMiddleware;
const {fetchActiveModulesForDropdown} = applicationModuleMiddleware;

const {FETCH_ADMIN_CATEGORY_FOR_DROPDOWN} = AdminModuleAPIConstants.adminCategoryApiConstants;
const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;
const {FETCH_MODULES_FOR_DROPDOWN} = AdminModuleAPIConstants.applicationModuleSetupApiConstants;
const {FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID, FETCH_PROFILE_DETAILS} = AdminModuleAPIConstants.profileSetupAPIConstants;
const {CREATE_ADMIN} = AdminModuleAPIConstants.adminSetupAPIConstants;

class AdminAdd extends PureComponent {

    state = {
        hospital: null,
        fullName: '',
        username: '',
        email: '',
        mobileNumber: '',
        adminCategory: null,
        status: 'Y',
        hasMacBinding: '',
        macIdList: [],
        moduleList: [],
        errorMessageForAdminName: 'Admin Name should not contain special characters.',
        errorMessageForAdminMobileNumber: 'Mobile number should be of 10 digits.',
        showImageUploadModal: false,
        showConfirmModal: false,
        adminAvatar: null,
        adminAvatarURL: '',
        showAlert: false,
        alertMessageInfo: {
            variant: "",
            message: ""
        },
        adminImage: '',
        adminImageCroppedUrl: '',
        adminFileCropped: '',
        fullNameValid: false,
        emailValid: false,
        mobileNumberValid: false,
        profileData: {},
        showProfileDetailModal: false
    };

    resetStateValues = () => {
        let modules = [...this.state.moduleList];
        let modulesReset = modules.map(module => {
            module.isChecked = false;
            module.profileList = [];
            module.profileSelected = null;
            return module
        });
        this.setState({
            hospital: null,
            fullName: '',
            username: '',
            email: '',
            password: '',
            mobileNumber: '',
            adminCategory: null,
            status: 'Y',
            hasMacBinding: '',
            macIdList: [],
            moduleList: [...modulesReset],
            showImageUploadModal: false,
            showConfirmModal: false,
            adminAvatar: null,
            adminAvatarURL: '',
            adminImage: '',
            adminImageCroppedUrl: '',
            adminFileCropped: '',
            fullNameValid: false,
            emailValid: false,
            mobileNumberValid: false,
        })
    };

    closeProfileDetailsViewModal = () => {
        this.setState({
            showProfileDetailModal: false
        })
    };

    setMacIdListInState = macIds => this.setState({macIdList: [...macIds]});

    setStateValues = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({[key]: {value, label}})
            : this.setState({[key]: null})
            : this.setState({[key]: value, [key + "Valid"]: fieldValid});

    setShowModal = () => this.setState({showImageUploadModal: !this.state.showImageUploadModal});

    setShowConfirmModal = () => this.setState({showConfirmModal: !this.state.showConfirmModal});

    addMacIdObjectToMacIdList = (hasMacBinding) => {
        let tempArray = AdminSetupUtils.addRemoveMacAddressObject(hasMacBinding, this.state.macIdList);
        this.setMacIdListInState(tempArray);
    };

    checkFormValidity = () => {
        const {
            hospital, fullName, username, email, mobileNumber, adminCategory, moduleList, fullNameValid,
            emailValid, mobileNumberValid
        } = this.state;

        let moduleSelected = moduleList.filter(module => module.isChecked);
        let formValidity = hospital && fullNameValid && fullName && username && emailValid && email && mobileNumberValid
            && mobileNumber && adminCategory && moduleSelected.length;

        moduleSelected.map(mod => {
            formValidity = formValidity && mod.profileSelected
        });

        this.setState({
            formValid: Boolean(formValidity)
        })
    };

    closeAlert = () => {
        this.props.clearAdminSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };

    validateMacId = (macId) => {
        let macIdPattern = /^([0-9a-fA-F]{2}[:.-]){5}[0-9a-fA-F]{2}$/;
        return macIdPattern.test(macId);
    };

    handleEnter = (event) => {
        EnterKeyPressUtils.handleEnter(event);
    };

    handleOnChange = async (event, fieldValid) => {
        if (event) {
            let fieldName = event.target.name;
            let value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
            let label = event.target.label;
            await this.setStateValues(fieldName, value, label, fieldValid);
            if (fieldName === "hasMacBinding") {
                this.addMacIdObjectToMacIdList(value);
            }
            this.checkFormValidity();
        }
    };

    handleMacIdChange = (event, index) => {
        let macIdValue = event.target.value;
        let macIds = [...this.state.macIdList];
        let macIdAlreadyExists = macIds.length > 0 && macIds.find(macId => macId.macId === macIdValue);
        macIds[index].macId = macIdValue;
        macIds[index].errorMessage = macIdValue && (!this.validateMacId(macIdValue) ? "Invalid MAC Id."
            : (macIdAlreadyExists ? 'MAC Id Already added.' : ''));
        this.setMacIdListInState(macIds);
    };

    handleAddMoreMacId = () => {
        this.addMacIdObjectToMacIdList(true);
    };

    handleRemoveMacId = (macId, index) => {
        let macIds = [...this.state.macIdList];
        macIds.splice(index, 1);
        this.setMacIdListInState(macIds);
    };

    handleModuleChange = async (subDepartmentId, index) => {
        let modules = [...this.state.moduleList];
        modules[index].isChecked = !modules[index].isChecked;
        if (modules[index].isChecked) {
            let profileList = await this.fetchProfileListByModule(subDepartmentId);
            modules[index].profileList = profileList ? profileList : [];
        } else {
            modules[index].profileList = [];
            modules[index].profileSelected = null;
        }
        await this.setState({
            moduleList: [...modules]
        });
        this.checkFormValidity();
    };

    handleProfileChange = (event, index) => {
        let modules = [...this.state.moduleList];
        modules[index].profileSelected = event.target.value ? {
            label: event.target.label,
            value: event.target.value
        } : null;
        this.setState({
            moduleList: [...modules]
        });
        this.checkFormValidity();
    };

    handleImageSelect = imageUrl => {
        imageUrl && this.setState({adminImage: imageUrl})
    };

    handleCropImage = (croppedImageUrl) => {
        croppedImageUrl && this.setState({
            adminImageCroppedUrl: croppedImageUrl
        });
    };

    handleImageUpload = async (croppedImageFile) => {
        let croppedImage = this.state.adminImageCroppedUrl;
        await this.setState({
            adminAvatar: new File([croppedImageFile], "adminAvatar.jpeg"),
            adminAvatarUrl: croppedImage,
            showImageUploadModal: false
        })
    };

    handleConfirmClick = async () => {
        const {
            hospital, fullName, username, email, mobileNumber, adminCategory,
            status, hasMacBinding, macIdList, adminAvatar, moduleList,
        } = this.state;

        let adminRequestDTO = {
            adminCategoryId: adminCategory.value,
            adminProfileRequestDTO: moduleList.length ? moduleList.filter(
                module => module.isChecked).map(module => {
                return {
                    applicationModuleId: module.id,
                    profileId: module.profileSelected.value
                }
            }) : [],
            email,
            fullName,
            hasMacBinding: hasMacBinding ? 'Y' : 'N',
            hospitalId: hospital.value,
            macAddressInfoRequestDTOS: macIdList.length ? macIdList.map(macId => {
                return macId.macId
            }) : [],
            mobileNumber,
            status,
            username
        };

        let formData = new FormData();
        formData.append('file', new File([adminAvatar], username.concat('-picture.jpeg')));
        try {
            await this.props.createAdmin(CREATE_ADMIN, adminRequestDTO, formData);
            this.resetStateValues();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: this.props.AdminSetupReducer.successMessage
                }
            })
        } catch (e) {
            await this.setShowConfirmModal();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.AdminSetupReducer.errorMessage ? this.props.AdminSetupReducer.errorMessage : e.message
                }
            })
        }

    };

    handleViewProfileDetails = async (profileId) => {
        try {
            await this.fetchProfileDetails(profileId);
            const {
                profilePreviewData,
            } = this.props.ProfilePreviewReducer;

            let profileData = profilePreviewData && await ProfileSetupUtils.prepareProfilePreviewData(profilePreviewData);
            this.setState({
                profileData,
                showProfileDetailModal: true
            });
        } catch (e) {
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "danger",
                    message: this.props.ProfilePreviewReducer.profilePreviewErrorMessage,
                }
            })
        }
    };

    fetchProfileDetails = async (profileId) => {
        await this.props.previewProfile(FETCH_PROFILE_DETAILS, profileId);
    };

    fetchProfileListByModule = async (moduleId) => {
        return await this.props.fetchProfileListBySubDepartmentId(FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID, moduleId);
    };

    fetchAdminCategories = async () => {
        await this.props.fetchActiveAdminCategoriesForDropdown(FETCH_ADMIN_CATEGORY_FOR_DROPDOWN);
    };

    fetchHospitals = async () => {
        await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN);
    };

    fetchModules = async () => {
        await this.props.fetchActiveModulesForDropdown(FETCH_MODULES_FOR_DROPDOWN);
        const {modulesForDropdown} = this.props.ApplicationModuleSetupReducer;
        let modules = [...modulesForDropdown];
        let modifiedModules = modules.map(moduleObj => (
            {
                ...moduleObj,
                isChecked: false,
                profileList: [],
                profileSelected: null
            }
        ));
        this.setState({
            moduleList: [...modifiedModules]
        });
    };

    initialAPICalls = () => {
        this.fetchAdminCategories();
        this.fetchHospitals();
        this.fetchModules();
    };

    componentDidMount() {
        this.initialAPICalls();
    }

    render() {
        const {
            hospital, fullName, username, email, password, mobileNumber, adminCategory,
            status, hasMacBinding, macIdList, adminAvatar, adminAvatarUrl, moduleList, errorMessageForAdminMobileNumber,
            errorMessageForAdminName, showImageUploadModal, adminImage, adminImageCroppedUrl, showProfileDetailModal,
            profileData
        } = this.state;

        const {adminCategoriesForDropdown} = this.props.AdminCategoryReducer;
        const {hospitalsForDropdown} = this.props.HospitalSetupReducer;
        const {dropdownErrorMessage} = this.props.ProfileSetupReducer;

        return <>
            <div className=" ">
                <Container className="bg-white add-container" fluid>

                    <CButton
                        id="resetAdminForm"
                        variant='outline-secondary'
                        size='sm'
                        name='Reset'
                        className="mb-2  float-right"
                        onClickHandler={this.resetStateValues}>
                        <>&nbsp;<i className='fa fa-refresh'/></>
                    </CButton>
                    <AdminInfoForm
                        adminInfoObj={{
                            hospital: hospital,
                            fullName: fullName,
                            username: username,
                            email: email,
                            password: password,
                            mobileNumber: mobileNumber,
                            adminCategory: adminCategory,
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
                        onModuleChange={this.handleModuleChange}
                        onProfileChange={this.handleProfileChange}
                        adminCategoryList={adminCategoriesForDropdown}
                        hospitalList={hospitalsForDropdown}
                        moduleList={moduleList}
                        errorMessageForAdminName={errorMessageForAdminName}
                        errorMessageForAdminMobileNumber={errorMessageForAdminMobileNumber}
                        errorMessageForProfileDropdown={dropdownErrorMessage}
                        showModal={showImageUploadModal}
                        setShowModal={this.setShowModal}
                        onImageUpload={this.handleImageUpload}
                        adminImage={adminImage}
                        adminCroppedImage={adminImageCroppedUrl}
                        onImageSelect={this.handleImageSelect}
                        onImageCrop={this.handleCropImage}
                        viewProfileDetails={this.handleViewProfileDetails}
                    />
                    <Row className="mt-4">
                        <Col
                            sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save-admin"
                                variant="primary "
                                className="float-right btn-action"
                                name="Save"
                                disabled={!this.state.formValid}
                                onClickHandler={this.setShowConfirmModal}>
                            </CButton>
                            <AdminConfirmationModal
                                showModal={this.state.showConfirmModal}
                                setShowModal={this.setShowConfirmModal}
                                onConfirmClick={this.handleConfirmClick}
                                adminInfoObj={{
                                    hospital: hospital,
                                    fullName: fullName,
                                    username: username,
                                    email: email,
                                    password: password,
                                    mobileNumber: mobileNumber,
                                    adminCategory: adminCategory,
                                    status: status,
                                    hasMacBinding: hasMacBinding,
                                    macIdList: macIdList,
                                    adminAvatar: adminAvatar,
                                    adminAvatarUrl: adminAvatarUrl,
                                    moduleList: moduleList
                                }}
                                adminImage={adminImageCroppedUrl}
                            />
                        </Col>
                    </Row>
                    {
                        showProfileDetailModal &&
                        <PreviewRoles
                            showModal={showProfileDetailModal}
                            setShowModal={this.closeProfileDetailsViewModal}
                            profileData={profileData}
                            rolesJson={rolesFromJson}/>
                    }
                    <CAlert
                        id="profile-manage"
                        variant={this.state.alertMessageInfo.variant}
                        show={this.state.showAlert}
                        onClose={this.closeAlert}
                        alertType={this.state.alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                        </> : <><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        </>}
                        message={this.state.alertMessageInfo.message}
                    />
                </Container>
            </div>
        </>;
    }
}

export default ConnectHoc(AdminAdd,
    [
        'AdminCategoryReducer',
        'ApplicationModuleSetupReducer',
        'HospitalSetupReducer',
        'ProfileSetupReducer',
        'AdminSetupReducer',
        'ProfilePreviewReducer'
    ],
    {
        fetchActiveAdminCategoriesForDropdown,
        fetchActiveHospitalsForDropdown,
        fetchActiveModulesForDropdown,
        fetchProfileListBySubDepartmentId,
        createAdmin,
        clearAdminSuccessErrorMessagesFromStore,
        previewProfile
    });
