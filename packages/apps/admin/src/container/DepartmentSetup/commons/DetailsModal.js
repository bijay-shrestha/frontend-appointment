import React from 'react';
import {CFLabel, CForm, CHybridInput, CRadioButton} from "@frontend-appointment/ui-elements";
import {Col, Row} from "react-bootstrap";

const DetailsModal = ({departmentData}) => {
    return (
        <>
            <Container-fluid>
                <Row className="pl-4 pr-4"><h5>Department Info</h5></Row>

                <CForm
                    id="department-info"
                    className="mt-2 department-info">
                    <Container-fluid>
                        <Row>
                            <Col sm="12" md="6" >
                                <CHybridInput
                                    id="hospital"
                                    name="hospital"
                                    placeholder="Client"
                                    value={departmentData.hospitalName}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm="12" md="6" >
                                <CHybridInput
                                    id="department-name"
                                    name="name"
                                    placeholder="Department Name"
                                    value={departmentData.name}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm="12" md="6" >
                                <CHybridInput
                                    id="department-code"
                                    name="code"
                                    placeholder="Department Code"
                                    value={departmentData.code}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm="12" md="6" >
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
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    );
};

export default DetailsModal;
