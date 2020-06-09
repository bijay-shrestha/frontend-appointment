import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import DepartmentDutyRosterHOC from '../DepartmentDutyRosterHOC';
import {CButton, CModal} from "@frontend-appointment/ui-elements";

import ExistingDepartmentRoster from './ExistingDepartmentRoster';
import AddDepartmentInfoForm from "./AddDepartmentInfoForm";
import DepartmentAvailabilityForm from "../common/DepartmentAvailabilityForm";
import DepartmentAvailabilityOverrides from "../common/DepartmentAvailabiltyOverrides";

import "../department-duty-roster.scss";

function DepartmentDutyRosterAdd(props) {
    const DoctorDutyRosterAddSetup = DepartmentDutyRosterHOC(({
                                                                  departmentInfoFormData,
                                                                  existingRosterModalData,
                                                                  departmentAvailabilityFormData,
                                                                  departmentAvailabilityOverrideData,
                                                                  saveProps
                                                              }) =>
        <div>
            <Container className="p-0" fluid>
                <Row className="mb-2">
                    <AddDepartmentInfoForm departmentInfoFormData={departmentInfoFormData}/>
                    <DepartmentAvailabilityForm
                        departmentAvailabilityFormData={{...departmentAvailabilityFormData, type: "ADD"}}
                    />
                </Row>
                <Row>
                    <DepartmentAvailabilityOverrides
                        departmentAvailabilityOverrideData={{...departmentAvailabilityOverrideData, type: "ADD"}}/>
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
                        isLoading={saveProps.showConfirmModal}
                        disabled={!saveProps.formValid || saveProps.showConfirmModal}
                        onClickHandler={saveProps.onSaveButtonClick}>
                    </CButton>
                </Col>
            </Row>
            <CModal
                show={existingRosterModalData.showExistingRosterModal}
                modalHeading="Existing Department Duty Rosters"
                size="lg"
                bodyChildren={<ExistingDepartmentRoster existingRosterModalData={existingRosterModalData}/>}
                onHide={existingRosterModalData.handleShowExistingRoster}
                footerChildren={<CButton
                    variant="outline-secondary"
                    name={'Close'}
                    size="lg"
                    className="float-right btn-action mr-3"
                    onClickHandler={existingRosterModalData.handleShowExistingRoster}
                />}
                centered={false}
                dialogClassName="preview-modal"
                closeButton={true}/>
        </div>, props, 'ADD');
    return <DoctorDutyRosterAddSetup/>
}

export default DepartmentDutyRosterAdd;
