import React from 'react';
import {CFLabel, CForm, CHybridInput, CHybridTextArea, CRadioButton} from "@frontend-appointment/ui-elements";
import {Col, Row} from "react-bootstrap";
import {AuditableEntityHoc} from '@frontend-appointment/commons'
const DetailsModal = ({departmentData}) => {
    return (
        <>
            <Container-fluid>
                {/*<Row className="pl-4 pr-4"><h5>Department Information</h5></Row>*/}

                <CForm
                    id="department-info"
                    className="mt-2 department-info">
                    <Container-fluid>
                        <Row>
                            <Col sm="12" md="6">
                                <CHybridInput
                                    id="hospital"
                                    name="hospital"
                                    placeholder="Client"
                                    value={departmentData.hospitalName}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm="12" md="6">
                                <CHybridInput
                                    id="department-name"
                                    name="name"
                                    placeholder="Department Name"
                                    value={departmentData.hospitalAlias + "-" + departmentData.name}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm="12" md="6">
                                <CHybridInput
                                    id="department-code"
                                    name="code"
                                    placeholder="Department Code"
                                    value={departmentData.code}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm="12" md="6">
                                <CFLabel labelName="Status" id="status"/>
                                <CRadioButton
                                    checked={departmentData.status === "Y"}
                                    disabled={true}
                                    readOnly={true}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                />

                                <CRadioButton
                                    checked={departmentData.status === "N"}
                                    disabled={true}
                                    readOnly={true}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                />
                            </Col>
                            {
                                departmentData.type==="MANAGE" ?
                                    <Col sm={12} md={6}>
                                        <CHybridTextArea
                                            id="department-remarks"
                                            placeholder="Remarks"
                                            value={departmentData.remarks || 'N/A'}
                                            disabled={true}
                                        />
                                    </Col>
                                    : ''
                            }
                         
                        </Row>
                        <Row className="mt-4">
                                
                                {
                              AuditableEntityHoc(departmentData)
                          }
                                </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    );
};

export default DetailsModal;
