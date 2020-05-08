import React from 'react';
import {CButton, CForm, CHybridInput, CHybridSelect, CModal} from "@frontend-appointment/ui-elements";
import {Col, Container, Row} from "react-bootstrap";

const AssignNewShiftToDoctorModal = ({assignNewShiftModalData}) => {
    const {
        showAssignShiftToDoctorModal,
        closeModal,
        activeShiftByHospitalIdForDropdown,
        onInputChange,
        doctorInformationData,
        errorMessage,
        assignShiftsToDoctor,
        isAssignShiftsToDoctorLoading
    } = assignNewShiftModalData;

    let shiftIdsAssigned = doctorInformationData.doctorShifts && doctorInformationData.doctorShifts.map(doctorShift => Number(doctorShift.value));
    let notAssignedShiftList = activeShiftByHospitalIdForDropdown && activeShiftByHospitalIdForDropdown.length
        ? activeShiftByHospitalIdForDropdown.filter(shiftByHospital =>
            !shiftIdsAssigned.includes(Number(shiftByHospital.value))) : [];

    const bodyContent = <>
        <CForm
            id="department-info"
            className="mt-2">
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                        id="selectedDoctor"
                        placeholder="Doctor"
                        value={doctorInformationData.doctor.label}
                        disabled={true}
                    />
                </Col>
            </Row>
            <Row>
                <Col sm={12} md={6} lg={6}>
                    <CHybridSelect
                        id="shifts"
                        name="newDoctorShifts"
                        onChange={onInputChange}
                        label="Shifts"
                        options={notAssignedShiftList}
                        value={doctorInformationData.newDoctorShifts}
                        required={true}
                        isMulti={true}
                        placeholder={notAssignedShiftList.length
                            ? "Select Shifts." : "No Shift(s) available."}
                        isDisabled={!notAssignedShiftList.length}
                    />
                </Col>
            </Row>
        </CForm>
    </>;

    const footerContent = <>
        <Container fluid="true">
            <Row>
                <div className="col-md-6">
                    {errorMessage ? (
                        <p className="modal-error">
                            <i class="fa fa-exclamation-triangle"/> &nbsp; {errorMessage}
                        </p>
                    ) : (
                        ''
                    )}
                </div>
                <div className="col-md-6">
                    <CButton
                        id="submit-update-button"
                        disabled={!doctorInformationData.newDoctorShifts.length || isAssignShiftsToDoctorLoading}
                        isLoading={isAssignShiftsToDoctorLoading}
                        name={"Add"}
                        variant="primary"
                        size="lg"
                        className="btn-action  float-right"
                        onClickHandler={assignShiftsToDoctor}
                    />
                </div>
            </Row>
        </Container>
    </>;
    return <>
        <CModal
            id="assignNewShift"
            show={showAssignShiftToDoctorModal}
            modalHeading="Assign New Shift"
            size="md"
            bodyChildren={bodyContent}
            footerChildren={footerContent}
            onHide={closeModal}
            centered={false}
            dialogClassName="preview-modal"
            closeButton={true}
        />
    </>;
};

export default AssignNewShiftToDoctorModal;
