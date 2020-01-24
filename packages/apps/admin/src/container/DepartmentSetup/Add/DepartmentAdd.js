import React, { PureComponent } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import DepartmentInfoForm from "./DepartmentInfoForm";
import { EnterKeyPressUtils } from "@frontend-appointment/helpers";
import { CAlert, CButton } from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import { ConnectHoc } from "@frontend-appointment/commons";
import { departmentSetupMiddleware } from "@frontend-appointment/thunk-middleware";
import { AdminModuleAPIConstants } from '@frontend-appointment/web-resource-key-constants';
import DepartmentConfirmationModal from "./DepartmentConfirmationModal";
import "./../department-setup.scss";

const { CREATE_DEPARTMENT } = AdminModuleAPIConstants.departmentSetupAPIConstants;

const { createDepartment, clearDepartmentSuccessErrorMessagesFromStore } = departmentSetupMiddleware;

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
            showConfirmModal: false,
            formValid: false,
            nameValid: false,
            codeValid: false,
        })
    };

    handleEnter = (event) => {
        EnterKeyPressUtils.handleEnter(event);
    };

    handleOnChange = async (event, fieldValid) => {
        event && await this.bindValuesToState(event, fieldValid);
    };

    async bindValuesToState(event, fieldValid) {
        let fieldName = event.target.name;
        let value = event.target.value;
        let label = event.target.label;
        value = fieldName === 'code' ? value.toUpperCase() : value;

        await this.setStateValues(fieldName, value, label, fieldValid);
        this.checkFormValidity();
    }

    setStateValues = (key, value, label, fieldValid) =>
        label ? value ?
            this.setState({ [key]: { value, label } })
            : this.setState({ [key]: null })
            : this.setState({ [key]: value, [key + "Valid"]: fieldValid });

    checkFormValidity = () => {
        let formValidity = this.state.nameValid && this.state.name && this.state.code;

        this.setState({
            formValid: formValidity
        })
    };

    setShowConfirmModal = () => {
        this.setState({ showConfirmModal: !this.state.showConfirmModal });
    };

    handleConfirmClick = async () => {
        let departmentDTO = {
            name: this.state.name,
            code: this.state.code,
            status: this.state.status
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

    closeAlert = () => {
        this.props.clearDepartmentSuccessErrorMessagesFromStore();
        this.setState({
            showAlert: !this.state.showAlert
        });
    };


    render() {
        return <>
            <div className=" ">
                <Container className="bg-white add-container " fluid>

                    {/* <Col sm={12} md={6} lg={5} className=""> */}


                        <CButton
                            id="resetProfileForm"
                            variant='outline-secondary'
                            size='sm'
                            name='Reset'
                            className="mb-2  float-right"
                            onClickHandler={this.resetStateValues}>
                            <>&nbsp;<i className='fa fa-refresh' /></>
                        </CButton>



                    {/* </Col> */}

                    <DepartmentInfoForm
                        departmentInfoObj={{
                            name: this.state.name,
                            code: this.state.code,
                            status: this.state.status
                        }}
                        errorMessageForDepartmentName={this.state.errorMessageForDepartmentName}
                        errorMessageForDepartmentCode={this.state.errorMessageForDepartmentCode}
                        onEnterKeyPress={this.handleEnter}
                        onInputChange={this.handleOnChange}
                    />



                    <Row className="mt-4">
                        <Col
                            sm={12} md={{ span: 3, offset: 9 }}>
                            <CButton
                                id="save-profile-add"
                                variant="primary "
                                className="float-right btn-action"
                                name="Save"
                                disabled={!this.state.formValid}
                                onClickHandler={this.setShowConfirmModal}>

                            </CButton>
                            <DepartmentConfirmationModal
                                showModal={this.state.showConfirmModal}
                                setShowModal={this.setShowConfirmModal}
                                onConfirmClick={this.handleConfirmClick}
                                departmentData={{
                                    name: this.state.name,
                                    code: this.state.code,
                                    status: this.state.status,
                                }}
                            />
                        </Col>
                    </Row>
                    <CAlert
                        id="profile-manage"
                        variant={this.state.alertMessageInfo.variant}
                        show={this.state.showAlert}
                        onClose={this.closeAlert}
                        alertType={this.state.alertMessageInfo.variant === "success" ? <><Material.MdDone />
                        </> : <><i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                            </>}
                        message={this.state.alertMessageInfo.message}
                    />
                </Container>
            </div>
        </>;
    }
}

export default ConnectHoc(DepartmentAdd, ['DepartmentSetupReducer'], {
    createDepartment,
    clearDepartmentSuccessErrorMessagesFromStore
});
