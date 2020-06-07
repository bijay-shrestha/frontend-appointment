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
                                              updateData,
                                              departmentChargeProps
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
        errorMessageForDescription,
        errorMessageForAppointmentCharge,
        errorMessage,
        isEditHospitalDepartmentLoading
    } = updateData;

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
            (!departmentData.hospital) : false;
    let billingModePlaceholder = activeBillingModeForDropdown.length ? "Select Billing Mode."
        : "No Billing Mode(s) available.";

    let showRemoveBillingModeChargeButton = (departmentData.departmentChargeSchemes && departmentData.departmentChargeSchemes.filter(
        deptCharge => deptCharge.status === 'Y')).length > 1;

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
                                className="multiple-select"
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
                                className="multiple-select"
                            />
                        </Col>
                        </Row>

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
                                    disabled={isAdminModule ? !departmentData.hospital || !activeBillingModeForDropdown.length
                                        : !activeBillingModeForDropdown.length}
                                    onClickHandler={handleAddDepartmentChargeScheme}
                                >
                                    <i className="fa fa-plus"/>
                                    &nbsp;Add
                                </CButton>
                            </Col>
                        </Row>

                        {
                            departmentData.departmentChargeSchemes.map((deptCharge, index) => (
                                deptCharge.status === 'Y' ?
                                <Row>
                                    <Col md={4}>
                                        <CHybridSelect
                                            id="billing-mode"
                                            name="billingMode"
                                            onKeyDown={event => handleEnterPress(event)}
                                            onChange={(event, validity) => handleChargeDataChange(event, validity, index)}
                                            label="Billing Mode"
                                            options={activeBillingModeForDropdown}
                                            value={deptCharge.billingMode}
                                            required={true}
                                            placeholder={isAdminModule ? departmentData.hospital ? billingModePlaceholder : "Select Client first." :
                                                billingModePlaceholder}
                                            isDisabled={isAdminModule ? !departmentData.hospital : false}
                                        />
                                    </Col>
                                    <Col md={4}>
                                        <CHybridInput
                                            id="appointment-charge"
                                            name="appointmentCharge"
                                            onKeyDown={(event) => handleEnterPress(event)}
                                            onChange={(event, validity) => handleChargeDataChange(event, validity, index)}
                                            placeholder="Appointment Charge"
                                            value={deptCharge.appointmentCharge}
                                            disabled={isAdminModule ? !departmentData.hospital || !activeBillingModeForDropdown.length
                                                : !activeBillingModeForDropdown.length}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={new RegExp("^\\d*(?:\\.\\d{1," + 2 + "})?$")}
                                            errorMessagePassed={errorMessageForAppointmentCharge}
                                        />
                                    </Col>

                                    <Col md={4}>
                                    <div className="charge-box">
                                        <CHybridInput
                                            id="appointment-follow-up-charge"
                                            name="followUpCharge"
                                            onKeyDown={(event) => handleEnterPress(event)}
                                            onChange={(event, validity) => handleChargeDataChange(event, validity, index)}
                                            placeholder="Follow Up Charge"
                                            value={deptCharge.followUpCharge}
                                            disabled={isAdminModule ? !departmentData.hospital || !activeBillingModeForDropdown.length
                                                : !activeBillingModeForDropdown.length}
                                            required={true}
                                            hasValidation={true}
                                            fieldValuePattern={new RegExp("^\\d*(?:\\.\\d{1," + 2 + "})?$")}
                                            errorMessagePassed={errorMessageForAppointmentCharge}
                                        />
                                        {
                                            showRemoveBillingModeChargeButton ?
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
                                        </div>
                                    </Col>


                                    </Row>
                                    : ''
                            ))
                        }

                        <Row>

                        <Col sm={12} md={6} lg={6}>
                            <CFLabel labelName="Status" id="status"/>
                            <div>
                                <CRadioButton
                                    checked={departmentData.status === 'Y'}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    onKeyDown={event => handleEnterPress(event)}
                                    onChange={event => handleInputChange(event)}
                                />

                                <CRadioButton
                                    checked={departmentData.status === 'N'}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    onKeyDown={event => handleEnterPress(event)}
                                    onChange={event => handleInputChange(event)}
                                />
                            </div>
                        </Col>

                        <Col sm={12} md={6} lg={6}>
                            <CHybridTextArea
                                id="department-remarks"
                                name="remarks"
                                // onKeyDown={(event) => handleEnterPress(event)}
                                onChange={(event, validity) => handleInputChange(event, validity)}
                                placeholder="Remarks"
                                value={departmentData.remarks}
                                required={true}
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
                size="lg"
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
