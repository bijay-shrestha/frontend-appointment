import React from 'react';
import DoctorDutyRosterShiftWiseHOC from "../DoctorDutyRosterShiftWiseHOC";
import {DoctorDutyRosterComponents} from "@frontend-appointment/ui-components";

import '../doctor-duty-roster-shift-wise.scss';
import {Col, Container, Row} from "react-bootstrap";
import {CButton} from "@frontend-appointment/ui-elements";

const DoctorDutyRosterShiftWiseAdd = (props) => {
    const DoctorDutyRosterShiftWiseAdd = DoctorDutyRosterShiftWiseHOC(
        ({
             doctorInformationFormData,
             assignNewShiftModalData,
             weekdaysRosterFormData,
             saveProps,
             overrideRosterProps
         }) => (
            <>
                <DoctorDutyRosterComponents.DoctorInformationForm
                    doctorInformationFormData={doctorInformationFormData}
                    overrideRosterProps={overrideRosterProps}
                />
                <DoctorDutyRosterComponents.ShiftInformationForm
                    doctorInformationFormData={doctorInformationFormData}
                    overrideRosterProps={overrideRosterProps}/>
                {assignNewShiftModalData.showAssignShiftToDoctorModal ?
                    <DoctorDutyRosterComponents.AssignNewShiftToDoctorModal
                        assignNewShiftModalData={assignNewShiftModalData}/>
                    : ''}
                {
                    doctorInformationFormData.isCreatingRosterAvailable && weekdaysRosterFormData.shiftDetails.length ?
                        <>
                            <DoctorDutyRosterComponents.WeekdaysRosterForm
                                type={"ADD"}
                                weekdaysRosterFormData={weekdaysRosterFormData}
                                overrideRosterProps={overrideRosterProps}/>
                            {overrideRosterProps.hasOverride === 'N' ?
                                <Container fluid>
                                    <Row className="my-4">
                                        <Col sm={12} md={{span: 3, offset: 9}}>
                                            <CButton
                                                id="save-profile-add"
                                                variant="primary-outline  "
                                                size="xl"
                                                className="btn-action  float-right"
                                                name={"Override Roster"}
                                                isLoading={saveProps.isSaveDDRWeekdaysLoading}
                                                disabled={!saveProps.formValid || saveProps.isSaveDDRWeekdaysLoading}
                                                onClickHandler={() => saveProps.onButtonClick(false)}
                                            />
                                            <CButton
                                                id="save-profile-add"
                                                variant="primary  "
                                                size="xl"
                                                className="btn-action  float-right mr-2"
                                                name={"Skip Override and Save"}
                                                isLoading={saveProps.isSaveDDRWeekdaysLoading}
                                                disabled={!saveProps.formValid || saveProps.isSaveDDRWeekdaysLoading}
                                                onClickHandler={() => saveProps.onButtonClick(true)}
                                            />
                                        </Col>
                                    </Row>
                                </Container> : ''
                            }
                        </>
                        : ''
                }

            </>), props, "ADD");

    return <DoctorDutyRosterShiftWiseAdd/>
};

export default DoctorDutyRosterShiftWiseAdd;
