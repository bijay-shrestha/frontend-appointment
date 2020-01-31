import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CCheckbox} from "@frontend-appointment/ui-elements";

const DoctorAvailabilityForm = ({}) => {
    return <>
        <Col md={12} lg={7} className="">
            <div className="doctor-availability bg-white p-4">
                <h5 className="title">Doctor Availability</h5>
                <Row className="header">
                    <Col> Days</Col>
                    <Col> Start Time</Col>
                    <Col> End Time</Col>
                    <Col> <CCheckbox id="check-all-menu"
                                     label="Days Off"
                                     className="select-all check-all"/>
                    </Col>
                </Row>
                <Row className="main-content mt-3">
                    <Col> Sunday</Col>
                    <Col> Start Time</Col>
                    <Col> End Time</Col>
                    <Col> <CCheckbox id="check"
                                     label="&nbsp;"
                                     className=" ">
                    </CCheckbox>
                    </Col>
                </Row>
                <Row className="main-content">
                    <Col> Monday</Col>
                    <Col> Start Time</Col>
                    <Col> End Time</Col>
                    <Col> <CCheckbox id="check"
                                     label="&nbsp;"
                                     className=" ">
                    </CCheckbox>
                    </Col>
                </Row>
                <Row className="main-content">
                    <Col> Tuesday</Col>
                    <Col> Start Time</Col>
                    <Col> End Time</Col>
                    <Col> <CCheckbox id="check"
                                     label="&nbsp;"
                                     className=" ">
                    </CCheckbox>
                    </Col>
                </Row>
                <Row className="main-content">
                    <Col> Wednesday</Col>
                    <Col> Start Time</Col>
                    <Col> End Time</Col>
                    <Col> <CCheckbox id="check"
                                     label="&nbsp;"
                                     className=" ">
                    </CCheckbox>
                    </Col>
                </Row>
                <Row className="main-content">
                    <Col> Thursday</Col>
                    <Col> Start Time</Col>
                    <Col> End Time</Col>
                    <Col> <CCheckbox id="check"
                                     label="&nbsp;"
                                     className=" ">
                    </CCheckbox>
                    </Col>
                </Row>
                <Row className="main-content">
                    <Col> Friday</Col>
                    <Col> Start Time</Col>
                    <Col> End Time</Col>
                    <Col> <CCheckbox id="check"
                                     label="&nbsp;"
                                     className=" ">
                    </CCheckbox>
                    </Col>
                </Row>
                <Row className="main-content">
                    <Col> Saturday</Col>
                    <Col> Start Time</Col>
                    <Col> End Time</Col>
                    <Col> <CCheckbox id="check"
                                     label="&nbsp;"
                                     className=" ">
                    </CCheckbox>
                    </Col>
                </Row>

            </div>
        </Col>
    </>
};

export default DoctorAvailabilityForm;
