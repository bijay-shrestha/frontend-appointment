import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {
    CButton,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CHybridSelectWithImage,
    CHybridTextArea, CModal,
    CRadioButton
} from "@frontend-appointment/ui-elements";
import {EnvironmentVariableGetter} from "@frontend-appointment/helpers";

const HospitalDepartmentSetupEditModal = ({
                                              updateData
                                          }) => {

    const {
        showEditModal,
        hospitalsForDropdown,
        departmentData,
        formValid,
        editApiCall,
        closeModal,
        activeDoctorsForDropdown,
        availableRoomsForDropdown,
        handleEnterPress,
        handleInputChange,
        errorMessageForDepartmentName,
        errorMessageForDescription,
        errorMessageForAppointmentCharge,
        errorMessage,
        isEditHospitalDepartmentLoading
    } = updateData;

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
            (!departmentData.hospital) : false;

    let bodyContent =
        <Container-fluid>
            <CForm id="doctor-info" className="mt-2 profile-info">
                <Container-fluid>

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
                                            isDisabled={true}
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
                                id="doctors"
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
                            />
                        </Col>

                        <Col sm={12} md={12} lg={6}>
                            <CHybridSelect
                                id="roomNumbers"
                                name="roomList"
                                onKeyDown={event => handleEnterPress(event)}
                                onChange={(event, validity) => handleInputChange(event, validity)}
                                label="Rooms"
                                options={availableRoomsForDropdown}
                                value={departmentData.roomList}
                                required={true}
                                placeholder={roomPlaceholder}
                                isDisabled={roomDropdownDisabled}
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

                        <Col sm={12} md={6} lg={6}>
                            <CHybridTextArea
                                id="department-remarks"
                                name="remarks"
                                onKeyDown={(event) => handleEnterPress(event)}
                                onChange={(event, validity) => handleInputChange(event, validity)}
                                placeholder="Remarks"
                                value={departmentData.remarks}
                                required={true}
                                // hasValidation={true}
                                // maxLength={200}
                                // errorMessagePassed={""}
                            />
                        </Col>

                    </Row>

                </Container-fluid>
            </CForm>
        </Container-fluid>;

    let footerChildren = <>
        <Container fluid="true">
            <Row>
                <div className="col-md-6">
                    {errorMessage ?
                        <p className="modal-error"><i class="fa fa-exclamation-triangle"/> &nbsp;  {errorMessage}
                        </p> : ''}
                </div>
                <div className="col-md-6">
                    <CButton
                        id="submit-update-button"
                        disabled={!formValid || isEditHospitalDepartmentLoading}
                        isLoading={isEditHospitalDepartmentLoading}
                        name={"Update"}
                        size="lg"
                        className="btn-action  float-right"
                        onClickHandler={editApiCall}/>
                    <CButton id="cancel-update-profile"
                             variant="light"
                             size="lg"
                             className="btn-action  float-right mr-2"
                             name="Cancel"
                             disabled={isEditHospitalDepartmentLoading}
                             onClickHandler={closeModal}
                    />

                </div>
            </Row>
        </Container>

    </>;
    return (
        <>
            <CModal
                show={showEditModal}
                modalHeading="Update Department Details"
                size="xl"
                bodyChildren={bodyContent}
                footerChildren={footerChildren}
                onHide={closeModal}
                centered={false}
                dialogClassName="preview-modal"
                closeButton={true}
            />
        </>
    );
};

export default HospitalDepartmentSetupEditModal;
