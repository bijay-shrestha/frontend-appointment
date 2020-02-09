import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import DoctorDutyRosterHOC from '../DoctorDutyRosterHOC';
import {CButton, CModal} from "@frontend-appointment/ui-elements";

import ExistingRooster from './ExistingRoster';
import AddDoctorInfoForm from "./AddDoctorInfoForm";
import DoctorAvailabilityForm from "../common/DoctorAvailabilityForm";
import DoctorAvailabilityOverrides from "../common/DoctorAvailabiltyOverrides";

import "./../doctor-duty-roster.scss";

function DoctorDutyRosterAdd(props) {
    const DoctorDutyRosterAddSetup = DoctorDutyRosterHOC(({
                                                              showExistingRosterModal,
                                                              doctorInfoData,
                                                              hospitalList,
                                                              specializationList,
                                                              doctorList,
                                                              doctorDropdownErrorMessage,
                                                              specializationDropdownError,
                                                              handleInputChange,
                                                              handleDateChange,
                                                              handleEnter,
                                                              getExistingRoster,
                                                              handleShowExistingRoster,
                                                              doctorAvailabilityData,
                                                              handleDoctorAvailabilityFormChange,
                                                              wholeWeekOff,
                                                              handleWholeWeekOff,
                                                              hasOverrideDutyRoster,
                                                              overrideData,
                                                              doctorDutyRosterOverrideRequestDTOS,
                                                              handleOverrideDutyRoster,
                                                              showAddOverrideModal,
                                                              setShowAddOverrideModal,
                                                              handleOverrideFormInputChange,
                                                              addOverride,
                                                              onModifyOverride,
                                                              onRemoveOverride,
                                                              isModifyOverride,
                                                              formValid,
                                                              showConfirmModal,
                                                              onSaveButtonClick,
                                                              existingRosterTableData,
                                                              onViewDetailsExisting,
                                                              existingDoctorWeekDaysAvailability,
                                                              existingOverrides,
                                                          }) =>
        <div>
            <Container className="p-0" fluid>
                <Row className="mb-2">
                    <AddDoctorInfoForm
                        doctorInfoData={doctorInfoData}
                        hospitalList={hospitalList}
                        specializationList={specializationList}
                        specializationDropdownError={specializationDropdownError}
                        doctorList={doctorList}
                        doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                        onEnterKeyPress={handleEnter}
                        onInputChange={handleInputChange}
                        onDateChange={handleDateChange}
                        getExistingRoster={getExistingRoster}
                        existingRosterTableData={existingRosterTableData}
                        onViewDetailsExisting={onViewDetailsExisting}
                        existingDoctorWeekDaysAvailability={existingDoctorWeekDaysAvailability}
                        existingOverrides={existingOverrides}
                    />
                    <DoctorAvailabilityForm
                        doctorAvailabilityData={doctorAvailabilityData}
                        handleDoctorAvailabilityFormChange={handleDoctorAvailabilityFormChange}
                        wholeWeekOff={wholeWeekOff}
                        handleWholeWeekOff={handleWholeWeekOff}
                        type="ADD"/>
                </Row>
                <Row>
                    <DoctorAvailabilityOverrides
                        hasOverrideDutyRoster={hasOverrideDutyRoster}
                        overrideData={overrideData}
                        doctorDutyRosterOverrideRequestDTOS={doctorDutyRosterOverrideRequestDTOS}
                        handleOverrideDutyRoster={handleOverrideDutyRoster}
                        showAddOverrideModal={showAddOverrideModal}
                        setShowAddOverrideModal={setShowAddOverrideModal}
                        handleOverrideFormInputChange={handleOverrideFormInputChange}
                        onEnterKeyPress={handleEnter}
                        addOverride={addOverride}
                        onRemove={onRemoveOverride}
                        onModify={onModifyOverride}
                        isModifyOverride={isModifyOverride}
                    />
                </Row>
            </Container>

            <Row className="my-4">
                <Col
                    sm={12} md={{span: 3, offset: 9}}>
                    <CButton
                        id="save-profile-add"
                        variant="primary  "
                        size="xl"
                        className="float-right btn-action"
                        name={showConfirmModal ? "Saving" : "Save"}
                        disabled={!formValid || showConfirmModal}
                        onClickHandler={onSaveButtonClick}>
                    </CButton>
                </Col>
            </Row>
            <CModal
                show={showExistingRosterModal}
                modalHeading="Existing Doctor Roster"
                size="lg"
                bodyChildren={<ExistingRooster
                    existingRosterTableData={existingRosterTableData}
                    onViewDetailsExisting={onViewDetailsExisting}
                    existingDoctorWeekDaysAvailability={existingDoctorWeekDaysAvailability}
                    existingOverrides={existingOverrides}/>}
                onHide={handleShowExistingRoster}
                centered={false}
                dialogClassName="preview-modal"
                closeButton={true}/>
        </div>, props, 'ADD');
    return <DoctorDutyRosterAddSetup/>
}

export default DoctorDutyRosterAdd;
