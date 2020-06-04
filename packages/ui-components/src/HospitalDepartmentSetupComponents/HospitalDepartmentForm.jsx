import React from 'react';
import {Col, Row} from "react-bootstrap";
import {
    CButton,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridSelectWithImage,
    CHybridTextArea,
    CRadioButton
} from "@frontend-appointment/ui-elements";
import {EnvironmentVariableGetter} from "@frontend-appointment/helpers";

const HospitalDepartmentForm = ({
                                    hospitalDepartmentAddData,
                                    departmentChargeProps
                                }) => {

    const {
        hospitalsForDropdown,
        departmentData,
        activeDoctorsForDropdown,
        availableRoomsForDropdown,
        handleEnterPress,
        handleInputChange,
        // errorMessageForDepartmentName,
        errorMessageForDescription,
        errorMessageForAppointmentCharge,

    } = hospitalDepartmentAddData;

    const {
        activeBillingModeForDropdown,
        handleAddDepartmentChargeScheme,
        handleRemoveDepartmentChargeScheme,
        handleChargeDataChange
    } = departmentChargeProps;

    let isAdminModule = EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.ADMIN_MODULE_CODE;

    let doctorPlaceholderForClient = activeDoctorsForDropdown.length ? "Select Doctors." : "No Doctors(s) available.";
    let doctorPlaceholder = isAdminModule ?
        (departmentData.hospital ? doctorPlaceholderForClient : "Select Client first.") : (doctorPlaceholderForClient);
    let doctorDropdownDisabled = isAdminModule ?
        (!activeDoctorsForDropdown.length || !departmentData.hospital) : !activeDoctorsForDropdown.length;

    let roomPlaceholderForClient = availableRoomsForDropdown.length ? "Select Rooms." : "No Room(s) available.";
    let roomPlaceholder =
        isAdminModule ?
            (departmentData.hospital ? roomPlaceholderForClient : "Select Client first.") : (roomPlaceholderForClient);
    let roomDropdownDisabled =
        isAdminModule ?
            (!availableRoomsForDropdown.length || !departmentData.hospital) : !availableRoomsForDropdown.length;

    return (
        <>
            <Container-fluid>
                <Row sm="12 p-0">
                    <h5 className="title">Department Information</h5>
                </Row>
                <CForm id="doctor-info" className="mt-2 profile-info">
                    <Container-fluid>

                        <Row>
                            {
                                isAdminModule ?
                                    <>
                                        <Col sm={12} md={12} lg={4}>
                                            <CHybridSelect
                                                id="hospital"
                                                name="hospital"
                                                onKeyDown={event => handleEnterPress(event)}
                                                onChange={(event, validity) => handleInputChange(event, validity)}
                                                label="Client"
                                                options={hospitalsForDropdown}
                                                value={departmentData.hospital}
                                                required={true}
                                                placeholder={hospitalsForDropdown.length ? "Select Client." : "No Client(s) available."}
                                                isDisabled={!hospitalsForDropdown.length}
                                            />
                                        </Col>
                                    </>
                                    : ''
                            }

                            <Col sm={12} md={6} lg={4}>
                                <CHybridInput
                                    id="department-name"
                                    name="name"
                                    onKeyDown={event => handleEnterPress(event)}
                                    onChange={(event, validity) => handleInputChange(event, validity)}
                                    placeholder="Department Name"
                                    value={departmentData.name}
                                    required={true}
                                    // hasValidation={true}
                                    // fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    // errorMessagePassed={errorMessageForDepartmentName}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={4}>
                                <CHybridInput
                                    id="department-code"
                                    name="code"
                                    onKeyDown={event => handleEnterPress(event)}
                                    onChange={(event, validity) => handleInputChange(event, validity)}
                                    placeholder="Department Code"
                                    value={departmentData.code}
                                    required={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={4}>
                                <CHybridTextArea
                                    id="department-description"
                                    name="description"
                                    onKeyDown={(event) => handleEnterPress(event)}
                                    onChange={(event, validity) => handleInputChange(event, validity)}
                                    placeholder="Department Description"
                                    value={departmentData.description}
                                    required={true}
                                    hasValidation={true}
                                    maxLength={200}
                                    errorMessagePassed={errorMessageForDescription}
                                />
                            </Col>

                            <Col sm={12} md={12} lg={4}>
                                <CHybridSelectWithImage
                                    id="doctor"
                                    name="doctorList"
                                    onKeyDown={event => handleEnterPress(event)}
                                    onChange={(event, validity) => handleInputChange(event, validity)}
                                    label="Doctors"
                                    options={activeDoctorsForDropdown}
                                    value={departmentData.doctorList}
                                    required={true}
                                    placeholder={doctorPlaceholder}
                                    isDisabled={doctorDropdownDisabled}
                                    isMulti={true}
                                    className="multiple-select"
                                />
                            </Col>

                            <Col sm={12} md={12} lg={4}>
                                <CHybridSelect
                                    id="roomNumbers"
                                    name="roomList"
                                    onKeyDown={event => handleEnterPress(event)}
                                    onChange={(event, validity) => handleInputChange(event, validity)}
                                    label="Rooms (optional)"
                                    options={availableRoomsForDropdown}
                                    value={departmentData.roomList}
                                    required={true}
                                    placeholder={roomPlaceholder}
                                    isDisabled={roomDropdownDisabled}
                                    isMulti={true}
                                    className="multiple-select"
                                />
                            </Col>

                            <Col sm={12} md={6} lg={4}>
                                <CFLabel labelName="Status" id="status"/>
                                <div>
                                    <CRadioButton
                                        checked={departmentData.status === "Y"}
                                        disabled={true}
                                        id="radio1"
                                        label="Active"
                                        type="radio"
                                        readOnly
                                    />
                                </div>
                            </Col>

                            <Row>
                                <Col>
                                    Billing Mode And Charge
                                </Col>
                                <Col>
                                    <CButton
                                        id="macBinding"
                                        name=""
                                        size="sm"
                                        variant="outline-secondary"
                                        className="float-right mb-2"
                                        onClickHandler={handleAddDepartmentChargeScheme}
                                    >
                                        <i className="fa fa-plus"/>
                                        &nbsp;Add
                                    </CButton>
                                </Col>
                            </Row>

                            {
                                departmentData.departmentChargeSchemes.map((deptCharge, index) => (
                                    <Row>
                                        <Col>
                                            <CHybridSelect
                                                id="billing-mode"
                                                name="billingMode"
                                                onKeyDown={event => handleEnterPress(event)}
                                                onChange={(event, validity) => handleChargeDataChange(event, validity, index)}
                                                label="Billing Mode"
                                                options={activeBillingModeForDropdown}
                                                value={deptCharge.billingMode}
                                                required={true}
                                                placeholder={activeBillingModeForDropdown.length ? "Select Billing Mode."
                                                    : "No Billing Mode(s) available."}
                                                // isDisabled={!activeBillingModeForDropdown.length}
                                            />
                                        </Col>
                                        <Col>
                                            <CHybridInput
                                                id="appointment-charge"
                                                name="appointmentCharge"
                                                onKeyDown={(event) => handleEnterPress(event)}
                                                onChange={(event, validity) => handleChargeDataChange(event, validity, index)}
                                                placeholder="Appointment Charge"
                                                value={deptCharge.appointmentCharge}
                                                required={true}
                                                hasValidation={true}
                                                fieldValuePattern={new RegExp("^\\d*(?:\\.\\d{1," + 2 + "})?$")}
                                                errorMessagePassed={errorMessageForAppointmentCharge}
                                            />
                                        </Col>

                                        <Col>
                                            <CHybridInput
                                                id="appointment-follow-up-charge"
                                                name="followUpCharge"
                                                onKeyDown={(event) => handleEnterPress(event)}
                                                onChange={(event, validity) => handleChargeDataChange(event, validity, index)}
                                                placeholder="Follow Up Charge"
                                                value={deptCharge.followUpCharge}
                                                required={true}
                                                hasValidation={true}
                                                fieldValuePattern={new RegExp("^\\d*(?:\\.\\d{1," + 2 + "})?$")}
                                                errorMessagePassed={errorMessageForAppointmentCharge}
                                            />
                                        </Col>
                                        {
                                            departmentData.departmentChargeSchemes && departmentData.departmentChargeSchemes.length > 1 ?
                                                <Col>
                                                    <CButton
                                                        id="macBinding"
                                                        key={'macRemove' + index}
                                                        name=""
                                                        variant="outline-danger"
                                                        className="float-right remove-mac "
                                                        onClickHandler={() => handleRemoveDepartmentChargeScheme(deptCharge, index)}
                                                    >
                                                        <i className="fa fa-close"/>
                                                    </CButton>
                                                </Col>
                                                : ''
                                        }

                                    </Row>
                                ))
                            }
                        </Row>

                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    );
};

export default HospitalDepartmentForm;
