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
                                                                  departmentInfoFormData,
                                                                  addOverride,
                                                                  departmentDutyRosterOverrideRequestDTOS,
                                                                  departmentInfoData,
                                                                  handleEnter,
                                                                  handleOverrideDutyRoster,
                                                                  handleOverrideFormInputChange,
                                                                  departmentAvailabilityData,
                                                                  handleDoctorAvailabilityFormChange,
                                                                  wholeWeekOff,
                                                                  handleWholeWeekOff,
                                                                  hasOverrideDutyRoster,
                                                                  isModifyOverride,
                                                                  onModifyOverride,
                                                                  onRemoveOverride,
                                                                  onSaveButtonClick,
                                                                  showConfirmModal,
                                                                  formValid,
                                                                  overrideData,
                                                                  setShowAddOverrideModal,
                                                                  showAddOverrideModal,
                                                                  showExistingRosterModal,
                                                                  handleShowExistingRoster,
                                                                  onViewDetailsExisting,
                                                                  existingDepartmentWeekDaysAvailability,
                                                                  existingOverrides,
                                                                  existingRosterTableData,
                                                                  overrideFormValid
                                                              }) =>
        <div>
            <Container className="p-0" fluid>
                <Row className="mb-2">
                    <AddDepartmentInfoForm departmentInfoFormData={departmentInfoFormData}/>
                    <DepartmentAvailabilityForm
                        departmentAvailabilityData={departmentAvailabilityData}
                        rosterGapDuration={departmentInfoFormData.departmentInfoData.rosterGapDuration}
                        handleDoctorAvailabilityFormChange={handleDoctorAvailabilityFormChange}
                        wholeWeekOff={wholeWeekOff}
                        handleWholeWeekOff={handleWholeWeekOff}
                        type="ADD"/>
                </Row>
                <Row>
                    {/*<DoctorAvailabilityOverrides*/}
                    {/*    hasOverrideDutyRoster={hasOverrideDutyRoster}*/}
                    {/*    overrideData={overrideData}*/}
                    {/*    departmentDutyRosterOverrideRequestDTOS={departmentDutyRosterOverrideRequestDTOS}*/}
                    {/*    handleOverrideDutyRoster={handleOverrideDutyRoster}*/}
                    {/*    showAddOverrideModal={showAddOverrideModal}*/}
                    {/*    setShowAddOverrideModal={setShowAddOverrideModal}*/}
                    {/*    handleOverrideFormInputChange={handleOverrideFormInputChange}*/}
                    {/*    onEnterKeyPress={handleEnter}*/}
                    {/*    addOverride={addOverride}*/}
                    {/*    onRemove={onRemoveOverride}*/}
                    {/*    onModify={onModifyOverride}*/}
                    {/*    isModifyOverride={isModifyOverride}*/}
                    {/*    departmentInfoData={departmentInfoData}*/}
                    {/*    overrideFormValid={overrideFormValid}*/}
                    {/*/>*/}
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
                modalHeading="Existing Department Duty Rosters"
                size="lg"
                bodyChildren={<ExistingDepartmentRoster
                    existingRosterTableData={existingRosterTableData}
                    onViewDetailsExisting={onViewDetailsExisting}
                    existingDepartmentWeekDaysAvailability={existingDepartmentWeekDaysAvailability}
                    existingOverrides={existingOverrides}/>}
                onHide={handleShowExistingRoster}
                centered={false}
                dialogClassName="preview-modal"
                closeButton={true}/>
        </div>, props, 'ADD');
    return <DoctorDutyRosterAddSetup/>
}

export default DepartmentDutyRosterAdd;
