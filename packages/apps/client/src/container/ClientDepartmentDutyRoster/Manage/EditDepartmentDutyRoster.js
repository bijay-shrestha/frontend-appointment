import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import "../department-duty-roster.scss";

import {
    CCheckbox,
    CFLabel,
    CHybridInput,
    CHybridSelect,
    CHybridTextArea,
    CRadioButton
} from "@frontend-appointment/ui-elements";
import {CEnglishDatePicker, ConfirmDelete} from "@frontend-appointment/ui-components";
import DoctorAvailabilityForm from "../common/DepartmentAvailabilityForm";
import DoctorAvailabilityOverrides from "../common/DepartmentAvailabiltyOverrides";


const EditDepartmentDutyRoster = ({editRosterProps, departmentAvailabilityFormData, departmentAvailabilityOverrideData}) => {
    const {
        departmentList,
        roomList,
        updateDoctorDutyRosterData,
        onEnterKeyPress,
        onInputChange,
        setShowDeleteOverrideModal,
        showDeleteOverrideModal,
        remarksHandler,
        remarks,
        deleteOverride,
        deleteOverrideErrorMessage,
        isDeleteOverrideLoading,
        dateErrorMessage,
        specializationDropdownError,
    } = editRosterProps;
    return <>
        <Container className="p-0" fluid>
            <Row className="">
                <Col md={12} lg={5} className="">
                    <div className="doctor-info bg-white p-4">
                        <h5 className="title mb-4">General Information</h5>
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
                                    invalid={!!dateErrorMessage}
                                    disabled={!updateDoctorDutyRosterData.isCloneAndAdd}
                                    onChange={(date) => onInputChange(date, "fromDate")}
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
                                    invalid={!!dateErrorMessage}
                                    disabled={!updateDoctorDutyRosterData.isCloneAndAdd}
                                    onChange={(date) => onInputChange(date, "toDate")}
                                />
                            </div>
                            <div>
                                {dateErrorMessage ?
                                    <p className="date-error">
                                        {dateErrorMessage}</p> : ''}
                            </div>

                            <CHybridSelect
                                id="department"
                                label="Department"
                                name="department"
                                isDisabled={!updateDoctorDutyRosterData.isCloneAndAdd}
                                options={departmentList}
                                placeholder={departmentList.length ? "Select Department." : "No Department(s) available."}
                                noOptionsMessage={() => specializationDropdownError}
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event) => onInputChange(event, '')}
                                value={updateDoctorDutyRosterData.department}
                            />

                            <div className="room-check">
                            <CCheckbox
                                id="enable-room"
                                label="Enable Room"
                                name="isRoomEnabled"
                                className="select-all check-all"
                                checked={updateDoctorDutyRosterData.isRoomEnabled === 'Y'}
                                onChange={(event) => onInputChange(event, '')}
                            >
                            </CCheckbox>

                            {
                                updateDoctorDutyRosterData.isRoomEnabled === 'Y' ?
                                    <CHybridSelect
                                        id="room"
                                        label="Room Number"
                                        name="room"
                                        isDisabled={!updateDoctorDutyRosterData.department || !roomList.length}
                                        placeholder={!updateDoctorDutyRosterData.department ? "Select Department first."
                                            : roomList.length ? "Select Room Number." : "No Room Number(s) available."}
                                        options={roomList}
                                        onKeyDown={(event) => onEnterKeyPress(event)}
                                        onChange={(event) => onInputChange(event, '')}
                                        value={updateDoctorDutyRosterData.room}
                                    /> :
                                    ''
                            }

                            </div>

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

                            <CFLabel labelName="Status" id="status"/>
                            <div>
                                <CRadioButton
                                    checked={updateDoctorDutyRosterData.status === 'Y'}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={event => onInputChange(event)}
                                />

                                <CRadioButton
                                    checked={updateDoctorDutyRosterData.status === 'N'}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={event => onInputChange(event)}
                                />

                            </div>


                            {
                                updateDoctorDutyRosterData.isCloneAndAdd ?
                                    '' :
                                    <CHybridTextArea
                                        className="mt-3"
                                        onChange={onInputChange}
                                        id="remarks"
                                        name="remarks"
                                        placeholder="Remarks"
                                        value={updateDoctorDutyRosterData.remarks}
                                    />
                            }

                        </Form>
                    </div>
                </Col>
                <DoctorAvailabilityForm departmentAvailabilityFormData={departmentAvailabilityFormData}/>
            </Row>

            <Row>
                <DoctorAvailabilityOverrides
                    departmentAvailabilityOverrideData={departmentAvailabilityOverrideData}/>
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
                        isLoading={isDeleteOverrideLoading}
                    />
                ) : (
                    ''
                )}

            </Row>
        </Container>
    </>
};

export default EditDepartmentDutyRoster
