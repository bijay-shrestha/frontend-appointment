import React, {PureComponent} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import UnitInfoForm from "./UnitInfoForm";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";
import {CAlert, CButton} from "@frontend-appointment/ui-elements";
import * as Material from 'react-icons/md';
import {ConnectHoc} from "@frontend-appointment/commons";
import {UnitSetupMiddleware, HospitalSetupMiddleware} from "@frontend-appointment/thunk-middleware";
import {AdminModuleAPIConstants} from '@frontend-appointment/web-resource-key-constants';
import UnitConfirmationModal from "./UnitConfirmationModal";
import "../unit-setup.scss";

const {CREATE_UNIT} = AdminModuleAPIConstants.departmentSetupAPIConstants;
const {FETCH_HOSPITALS_FOR_DROPDOWN} = AdminModuleAPIConstants.hospitalSetupApiConstants;

const {createDepartment, clearDepartmentSuccessErrorMessagesFromStore} = UnitSetupMiddleware;

const {fetchActiveHospitalsForDropdown} = HospitalSetupMiddleware;

class UnitAdd extends PureComponent {
    state = {
        name: '',
        code: '',
        status: 'Y',
        hospital: '',
        showConfirmModal: false,
        formValid: false,
        nameValid: false,
        codeValid: false,
        errorMessageForDepartmentName: "Unit Name should not contain special characters",
        errorMessageForDepartmentCode: '',
        showAlert: false,
        alertMessageInfo: {
            variant: "",
            message: ""
        },
        hospitalAlias: ''
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
        if (fieldName === "hospital") {
            const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
            let selectedHospital = hospitalsForDropdown.find(hospital => hospital.value === value);
            this.setState({
                hospitalAlias: selectedHospital.alias || ''
            })
        }
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
            await this.props.createDepartment(CREATE_UNIT, departmentDTO);
            this.resetStateValues();
            this.setState({
                showAlert: true,
                alertMessageInfo: {
                    variant: "success",
                    message: this.props.UnitSetupReducer.successMessage
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
        this.fetchHospitals();
    }

    render() {
        const {
            name, code, status, hospital, errorMessageForDepartmentName,
            errorMessageForDepartmentCode, alertMessageInfo, showAlert, formValid, showConfirmModal,
            hospitalAlias
        } = this.state;

        const {hospitalsForDropdown} = this.props.HospitalDropdownReducer;
        const {isCreateDepartmentLoading} = this.props.UnitSetupReducer;

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
                        <>  <i className="fa fa-refresh"/>  &nbsp;Reset</>
                    </CButton>
                    <UnitInfoForm
                        departmentInfoObj={{
                            name: name,
                            code: code,
                            status: status,
                            hospital: hospital
                        }}
                        errorMessageForDepartmentName={errorMessageForDepartmentName}
                        errorMessageForDepartmentCode={errorMessageForDepartmentCode}
                        onEnterKeyPress={this.handleEnter}
                        onInputChange={this.handleOnChange}
                        hospitalList={hospitalsForDropdown}
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
                            <UnitConfirmationModal
                                showModal={showConfirmModal}
                                isCreateDepartmentLoading={isCreateDepartmentLoading}
                                setShowModal={this.setShowConfirmModal}
                                onConfirmClick={this.handleConfirmClick}
                                departmentData={{
                                    name: name,
                                    code: code,
                                    status: status,
                                    hospitalName: typeof hospital == "object" ? hospital.label : hospital,
                                    hospitalAlias: hospitalAlias
                                }}
                            />
                        </Col>
                    </Row>
                    <CAlert
                        id="profile-manage"
                        variant={alertMessageInfo.variant}
                        show={showAlert}
                        onClose={this.closeAlert}
                        alertType={alertMessageInfo.variant === "success" ? <><Material.MdDone/>
                        </> : <><i class="fa fa-exclamation-triangle" aria-hidden="true"/>
                        </>}
                        message={alertMessageInfo.message}
                    />
                </Container>
            </div>
        </>;
    }
}

export default ConnectHoc(UnitAdd,
    ['UnitSetupReducer',
        'HospitalDropdownReducer',], {
        createDepartment,
        clearDepartmentSuccessErrorMessagesFromStore,
        fetchActiveHospitalsForDropdown
    });
