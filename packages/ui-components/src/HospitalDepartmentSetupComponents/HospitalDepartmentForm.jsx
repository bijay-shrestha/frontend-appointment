import React from 'react';
import {Col, Row} from "react-bootstrap";
import {
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
                                    hospitalDepartmentAddData
                                }) => {

    const {
        hospitalsForDropdown,
        departmentData,
        activeDoctorsForDropdown,
        activeRoomNumberForDropdown,
        handleEnterPress,
        handleInputChange,
        errorMessageForDepartmentName,
        errorMessageForDescription,
        errorMessageForAppointmentCharge
    } = hospitalDepartmentAddData;
    return (
        <>
            <Container-fluid>
                <Row sm="12 p-0">
                    <h5 className="title">Department Information</h5>
                </Row>
                <CForm id="doctor-info" className="mt-2 profile-info">
                    <Container-fluid>
                        <Row>
                            <Col lg={9}>
                                <Row>
                                    {
                                        EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.ADMIN_MODULE_CODE ?
                                            <>
                                                <Col sm={12} md={12} lg={6}>
                                                    <CHybridSelect
                                                        id="hospital"
                                                        name="hospital"
                                                        onKeyDown={event => handleEnterPress(event)}
                                                        onChange={(event, validity) => handleInputChange(event, validity)}
                                                        label="Client"
                                                        options={hospitalsForDropdown}
                                                        value={departmentData.hospital}
                                                        required={true}
                                                        placeholder={hospitalsForDropdown.length ? "Select Client" : "No Client(s) available."}
                                                        isDisabled={!hospitalsForDropdown.length}
                                                    />
                                                </Col>
                                                <Col sm={12} md={12} lg={6}> </Col>
                                            </>
                                            : ''
                                    }

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="department-name"
                                            name="name"
                                            onKeyDown={event => handleEnterPress(event)}
                                            onChange={(event, validity) => handleInputChange(event, validity)}
                                            placeholder="Department Name"
                                            value={departmentData.name}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                            errorMessagePassed={errorMessageForDepartmentName}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
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

                                    <Col sm={12} md={6} lg={6}>
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

                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridSelectWithImage
                                            id="doctor"
                                            name="doctorList"
                                            onKeyDown={event => handleEnterPress(event)}
                                            onChange={(event, validity) => handleInputChange(event, validity)}
                                            label="Doctors"
                                            options={activeDoctorsForDropdown}
                                            value={departmentData.doctorList}
                                            required={true}
                                            placeholder={activeDoctorsForDropdown.length ? "Select Doctors." : "No Doctors(s) available."}
                                            isDisabled={!activeDoctorsForDropdown.length}
                                            isMulti={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridSelect
                                            id="roomNumbers"
                                            name="roomList"
                                            onKeyDown={event => handleEnterPress(event)}
                                            onChange={(event, validity) => handleInputChange(event, validity)}
                                            label="Rooms"
                                            options={activeRoomNumberForDropdown}
                                            value={departmentData.roomList}
                                            required={true}
                                            placeholder={activeRoomNumberForDropdown.length ? "Select Rooms." : "No Room(s) available."}
                                            isDisabled={!activeRoomNumberForDropdown.length}
                                            isMulti={true}
                                        />
                                    </Col>


                                    <Col sm={12} md={6} lg={6} className="">
                                        <CHybridInput
                                            id="appointment-charge"
                                            name="appointmentCharge"
                                            onKeyDown={(event) => handleEnterPress(event)}
                                            onChange={(event, validity) => handleInputChange(event, validity)}
                                            placeholder="Appointment Charge"
                                            value={departmentData.appointmentCharge}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={new RegExp("^\\d*(?:\\.\\d{1," + 2 + "})?$")}
                                            errorMessagePassed={errorMessageForAppointmentCharge}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6} className="">
                                        <CHybridInput
                                            id="appointment-follow-up-charge"
                                            name="followUpCharge"
                                            onKeyDown={(event) => handleEnterPress(event)}
                                            onChange={(event, validity) => handleInputChange(event, validity)}
                                            placeholder="Appointment Follow Up Charge"
                                            value={departmentData.followUpCharge}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={new RegExp("^\\d*(?:\\.\\d{1," + 2 + "})?$")}
                                            errorMessagePassed={errorMessageForAppointmentCharge}
                                        />
                                    </Col>

                                    <Col sm={12} md={4} lg={4}>
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
                                </Row>
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    );
};

export default HospitalDepartmentForm;
