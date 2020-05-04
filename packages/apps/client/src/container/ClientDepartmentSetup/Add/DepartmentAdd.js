import React, {PureComponent} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import DepartmentInfoForm from "./DepartmentInfoForm";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {CAlert, CButton} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import {ConnectHoc} from "@frontend-appointment/commons";
import {DepartmentSetupMiddleware, HospitalSetupMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import DepartmentConfirmationModal from "./DepartmentConfirmationModal";
import "./../department-setup.scss";

const {CREATE_DEPARTMENT} = AdminModuleAPIConstants.departmentSetupAPIConstants;
const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;

const {createDepartment, clearDepartmentSuccessErrorMessagesFromStore} = DepartmentSetupMiddleware;

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;

class DepartmentAdd extends PureComponent {
    state = {
        name: '',
        code: '',
        status: 'Y',
        showConfirmModal: false,
        formValid: false,
        nameValid: false,
        codeValid: false,
        errorMessageForDepartmentName: "Department Name should not contain special characters",
        errorMessageForDepartmentCode: '',
        showAlert: false,
        alertMessageInfo: {
            variant: "",
            message: ""
        }
    };

    resetStateValues = () => {
        this.setState({
            name: '',
            code: '',
            status: 'Y',
            hospital: '',
            showConfirmModal: false,
            formValid: false,
            nameValid: false,
            codeValid: false,
        })
    };

    setShowConfirmModal = () => {
        this.setState({showConfirmModal: !this.state.showConfirmModal});
    };

    setStateValues = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({[key]: {value, label}})
            : this.setState({[key]: null})
            : this.setState({[key]: value, [key + "Valid"]: fieldValid});

    async bindValuesToState(event, fieldValid) {
        let fieldName = event.target.name;
        let value = event.target.value;
        let label = event.target.label;
        value = fieldName === 'code' ? value.toUpperCase() : value;

        await this.setStateValues(fieldName, value, label, fieldValid);
        this.checkFormValidity();
    }

    handleEnter = (event) => {
        EnterKeyPressUtils.handleEnter(event);
    };

    handleOnChange = async (event, fieldValid) => {
        event && await this.bindValuesToState(event, fieldValid);
    };

    handleConfirmClick = async () => {
        const {name, code, status, hospital} = this.state;
        let departmentDTO = {
            name: name,
            departmentCode: code,
            status: status,
            hospitalId: hospital && hospital.value
        };
        try {
            await this.props.createDepartment(CREATE_DEPARTMENT, departmentDTO);
            this.resetStateValues();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: this.props.DepartmentSetupReducer.successMessage
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

    checkFormValidity = () => {
        let formValidity = this.state.nameValid && this.state.name && this.state.code;

        this.setState({
            formValid: formValidity
        })
    };

    closeAlert = () => {
        this.props.clearDepartmentSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };

    fetchHospitals = async () => {
        await this.props.fetchActiveHospitalsForDropdown(FETCH_HOSPITALS_FOR_DROPDOWN);
    };

    componentDidMount() {

    }

    render() {
        const {
            name, code, status,errorMessageForDepartmentName,
            errorMessageForDepartmentCode, alertMessageInfo, showAlert, formValid, showConfirmModal
        } = this.state;

        const {isCreateDepartmentLoading} = this.props.DepartmentSetupReducer;
        return <>
            <div className="department-setup">
                <Container className="bg-white add-container " fluid>
                    <CButton
                        id="resetProfileForm"
                        variant='outline-secondary'
                        size='sm'
                        name=''
                        className="mb-2  float-right"
                        onClickHandler={this.resetStateValues}>
                        <>  <i className="fa fa-refresh"/>&nbsp;Reset</>
                    </CButton>
                    <DepartmentInfoForm
                        departmentInfoObj={{
                            name: name,
                            code: code,
                            status: status
                        }}
                        errorMessageForDepartmentName={errorMessageForDepartmentName}
                        errorMessageForDepartmentCode={errorMessageForDepartmentCode}
                        onEnterKeyPress={this.handleEnter}
                        onInputChange={this.handleOnChange}
                    />

                    <Row className="mt-4">
                        <Col
                            sm={12} md={{span: 3, offset: 9}}>
                            <CButton
                                id="save-profile-add"
                                variant="primary "
                                className="float-right btn-action"
                                name="Save"
                                disabled={!formValid || showConfirmModal}
                                isLoading={showConfirmModal}
                                onClickHandler={this.setShowConfirmModal}>

                            </CButton>
                            <DepartmentConfirmationModal
                                showModal={showConfirmModal}
                                setShowModal={this.setShowConfirmModal}
                                onConfirmClick={this.handleConfirmClick}
                                departmentData={{
                                    name: name,
                                    code: code,
                                    status: status
                                }}
                                isCreateDepartmentLoading={isCreateDepartmentLoading}
                            />
                        </Col>
                    </Row>
                    <CAlert
                        id="profile-manage"
                        variant={alertMessageInfo.variant}
                        show={showAlert}
                        onClose={this.closeAlert}
                        alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                        </> : <><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                        </>}
                        message={alertMessageInfo.message}
                    />
                </Container>
            </div>
        </>;
    }
}

export default ConnectHoc(DepartmentAdd,
    ['DepartmentSetupReducer',
        'HospitalDropdownReducer',], {
        createDepartment,
        clearDepartmentSuccessErrorMessagesFromStore,
        fetchActiveHospitalsForDropdown
    });
