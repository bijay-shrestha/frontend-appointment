import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import DepartmentDutyRosterHOC from '../DepartmentDutyRosterHOC';
import {CButton, CModal} from "@frontend-appointment/ui-elements";

import ExistingDepartmentRoster from './ExistingDepartmentRoster';
import AddDepartmentInfoForm from "./AddDepartmentInfoForm";
import DepartmentAvailabilityForm from "../common/DepartmentAvailabilityForm";
import DoctorAvailabilityOverrides from "../common/DepartmentAvailabiltyOverrides";

import "../department-duty-roster.scss";

function DepartmentDutyRosterAdd(props) {
    const DoctorDutyRosterAddSetup = DepartmentDutyRosterHOC(({
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
                                                                  hospitalList,
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
                    <AddDepartmentInfoForm
                        doctorInfoData={doctorInfoData}
                        hospitalList={hospitalList}
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
                    <DepartmentAvailabilityForm
                        doctorAvailabilityData={doctorAvailabilityData}
                        rosterGapDuration={doctorInfoData.rosterGapDuration}
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
                        name={"Save"}
                        isLoading={showConfirmModal}
                        disabled={!formValid || showConfirmModal}
                        onClickHandler={onSaveButtonClick}>
                    </CButton>
                </Col>
            </Row>
            <CModal
                show={showExistingRosterModal}
                modalHeading="Existing Doctor Roster"
                size="lg"
                bodyChildren={<ExistingDepartmentRoster
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

export default DepartmentDutyRosterAdd;
