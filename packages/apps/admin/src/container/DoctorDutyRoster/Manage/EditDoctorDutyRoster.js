import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import "./../doctor-duty-roster.scss";

import {CHybridInput, CHybridTextArea} from "@frontend-appointment/ui-elements";
import {CEnglishDatePicker, ConfirmDelete} from "@frontend-appointment/ui-components";
import DoctorAvailabilityForm from "../common/DoctorAvailabilityForm";
import DoctorAvailabilityOverrides from "../common/DoctorAvailabiltyOverrides";


const EditDoctorDutyRoster = ({
                                  updateDoctorDutyRosterData,
                                  onEnterKeyPress,
                                  onInputChange,
                                  overrideData,
                                  handleDoctorAvailabilityFormChange,
                                  handleOverrideDutyRoster,
                                  showAddOverrideModal,
                                  handleOverrideFormInputChange,
                                  addOverride,
                                  setShowAddOverrideModal,
                                  overrideUpdateErrorMessage,
                                  onModifyOverride,
                                  isModifyOverride,
                                  setShowDeleteOverrideModal,
                                  showDeleteOverrideModal,
                                  remarksHandler,
                                  remarks,
                                  onRemoveOverride,
                                  deleteOverride,
                                  deleteOverrideErrorMessage,
                              }) => {
    return <>
        <Container className="p-0" fluid>
            <Row className="">
                <Col md={12} lg={5} className="">
                    <div className="doctor-info bg-white p-4">
                        <h5 className="title mb-4">Doctor Info</h5>
                        <Form>
                            <div className="d-flex">
                                <CEnglishDatePicker
                                    id="from-date"
                                    name="fromDate"
                                    label="From Date"
                                    dateFormat="yyyy-MM-dd"
                                    minDate={0}
                                    showDisabledMonthNavigation={true}
                                    selected={updateDoctorDutyRosterData.fromDate}
                                    peekNextMonth={true}
                                    showMonthDropdown={true}
                                    showYearDropdown={true}
                                    dropdownMode="select"
                                    disabled={true}
                                    onChange={() => {
                                    }}
                                />
                                &nbsp;&nbsp;
                                <CEnglishDatePicker
                                    id="to-date"
                                    name="toDate"
                                    label="To Date"
                                    dateFormat="yyyy-MM-dd"
                                    minDate={0}
                                    showDisabledMonthNavigation={true}
                                    selected={updateDoctorDutyRosterData.toDate}
                                    peekNextMonth={true}
                                    showMonthDropdown={true}
                                    showYearDropdown={true}
                                    dropdownMode="select"
                                    disabled={true}
                                    onChange={() => {
                                    }}
                                />
                            </div>

                            <CHybridInput
                                id="hospital"
                                label="Hospital"
                                name="hospital"
                                placeholder="Hospital"
                                value={updateDoctorDutyRosterData.hospital && updateDoctorDutyRosterData.hospital.label}
                                disabled={true}
                            />

                            <CHybridInput
                                id="specialization"
                                label="Specialization"
                                name="specialization"
                                placeholder="Specialization"
                                value={updateDoctorDutyRosterData.specialization && updateDoctorDutyRosterData.specialization.label}
                                disabled={true}
                            />
                            <CHybridInput
                                id="doctor"
                                label="Doctor"
                                name="doctor"
                                placeholder="Doctor"
                                value={updateDoctorDutyRosterData.doctor && updateDoctorDutyRosterData.doctor.label}
                                disabled={true}
                            />
                            <CHybridInput
                                id="duration"
                                label="Duration"
                                type="number"
                                name="rosterGapDuration"
                                placeholder="Duration In Minutes."
                                value={updateDoctorDutyRosterData.rosterGapDuration}
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event) => onInputChange(event)}
                            />

                            <CHybridTextArea
                                onChange={onInputChange}
                                id="remarks"
                                name="remarks"
                                placeholder="Remarks"
                                value={updateDoctorDutyRosterData.remarks}
                            />
                        </Form>
                    </div>
                </Col>
                <DoctorAvailabilityForm
                    doctorAvailabilityData={updateDoctorDutyRosterData.weekDaysDutyRosterUpdateRequestDTOS}
                    handleDoctorAvailabilityFormChange={handleDoctorAvailabilityFormChange}
                    rosterGapDuration={updateDoctorDutyRosterData.rosterGapDuration}
                    type="MANAGE"
                />
            </Row>

            <Row>
                <DoctorAvailabilityOverrides
                    hasOverrideDutyRoster={updateDoctorDutyRosterData.hasOverrideDutyRoster}
                    overrideData={overrideData}
                    doctorDutyRosterOverrideRequestDTOS={updateDoctorDutyRosterData.overridesUpdate}
                    onEnterKeyPress={onEnterKeyPress}
                    handleOverrideDutyRoster={handleOverrideDutyRoster}
                    showAddOverrideModal={showAddOverrideModal}
                    handleOverrideFormInputChange={handleOverrideFormInputChange}
                    addOverride={addOverride}
                    setShowAddOverrideModal={setShowAddOverrideModal}
                    overrideUpdateErrorMessage={overrideUpdateErrorMessage}
                    onModify={onModifyOverride}
                    isModifyOverride={isModifyOverride}
                    onRemove={onRemoveOverride}
                />
                {showDeleteOverrideModal ? (
                    <ConfirmDelete
                        confirmationMessage="Are you sure you want to delete this Override? If yes please provide remarks."
                        modalHeader="Delete Override"
                        showModal={showDeleteOverrideModal}
                        setShowModal={setShowDeleteOverrideModal}
                        onDeleteRemarksChangeHandler={remarksHandler}
                        remarks={remarks}
                        onSubmitDelete={deleteOverride}
                        deleteErrorMessage={deleteOverrideErrorMessage}
                    />
                ) : (
                    ''
                )}

            </Row>
        </Container>
    </>
};

export default EditDoctorDutyRoster
