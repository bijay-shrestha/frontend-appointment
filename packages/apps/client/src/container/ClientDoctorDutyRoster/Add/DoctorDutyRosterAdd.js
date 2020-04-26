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
                                                              addOverride,
                                                              dateErrorMessage,
                                                              doctorAvailabilityData,
                                                              doctorDropdownErrorMessage,
                                                              doctorDutyRosterOverrideRequestDTOS,
                                                              doctorInfoData,
                                                              doctorList,
                                                              existingDoctorWeekDaysAvailability,
                                                              existingOverrides,
                                                              existingRosterTableData,
                                                              formValid,
                                                              getExistingRoster,
                                                              handleDoctorAvailabilityFormChange,
                                                              handleEnter,
                                                              handleInputChange,
                                                              handleOverrideDutyRoster,
                                                              handleOverrideFormInputChange,
                                                              handleShowExistingRoster,
                                                              handleWholeWeekOff,
                                                              hasOverrideDutyRoster,
                                                              isModifyOverride,
                                                              onModifyOverride,
                                                              onRemoveOverride,
                                                              onSaveButtonClick,
                                                              onViewDetailsExisting,
                                                              overrideData,
                                                              setShowAddOverrideModal,
                                                              showAddOverrideModal,
                                                              showConfirmModal,
                                                              showExistingRosterModal,
                                                              specializationDropdownError,
                                                              activeSpecializationListByHospital,
                                                              wholeWeekOff,
                                                              overrideFormValid
                                                          }) =>
        <div>
            <Container className="p-0" fluid>
                <Row className="mb-2">
                    <AddDoctorInfoForm
                        doctorInfoData={doctorInfoData}
                        specializationList={activeSpecializationListByHospital}
                        specializationDropdownError={specializationDropdownError}
                        doctorList={doctorList}
                        doctorDropdownErrorMessage={doctorDropdownErrorMessage}
                        onEnterKeyPress={handleEnter}
                        onInputChange={handleInputChange}
                        getExistingRoster={getExistingRoster}
                        existingRosterTableData={existingRosterTableData}
                        onViewDetailsExisting={onViewDetailsExisting}
                        existingDoctorWeekDaysAvailability={existingDoctorWeekDaysAvailability}
                        existingOverrides={existingOverrides}
                        dateErrorMessage={dateErrorMessage}
                    />
                    <DoctorAvailabilityForm
                        doctorAvailabilityData={doctorAvailabilityData}
                        handleDoctorAvailabilityFormChange={handleDoctorAvailabilityFormChange}
                        wholeWeekOff={wholeWeekOff}
                        handleWholeWeekOff={handleWholeWeekOff}
                        rosterGapDuration={doctorInfoData.rosterGapDuration}
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
                        doctorInfoData={doctorInfoData}
                        overrideFormValid={overrideFormValid}
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
