
import React, { PureComponent } from 'react';

import { Col, Container, Row, Badge, ButtonToolbar, OverlayTrigger, Tooltip, Button } from "react-bootstrap";
import { CButton, CDataTable } from "@frontend-appointment/ui-elements";

import "./appointment-status.scss";

class AppointmentStatusDataTable extends PureComponent {

    state = {
        doctorData: [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12]
    }

    render() {

        return <>
            <div className="manage-details">
                <Container fluid>
                    <Row>
                        <Col className="p-0"><h5 className="title">Appointment Status Details</h5></Col>

                        <Col>
                            <div className="appointment-badge float-right">
                                <span><CButton
                                    variant="secondary"
                                    size="lg"
                                    name="All"
                                ></CButton></span>

                                <span><CButton
                                    variant="danger"
                                    size="lg"
                                    name="Booked"
                                ></CButton></span>

                                <span><CButton
                                    variant="success"
                                    size="lg"
                                    name="Vacant"
                                ></CButton></span>

                                <span><CButton
                                    variant="dark"
                                    size="lg"
                                    name="Cancelled"
                                ></CButton></span>
                            </div>
                        </Col>
                    </Row>


                    <Row className="appointment-status-list">
                        <Col sm={12} >
                            <h5 className="doctor-name">Doctor Name(Ortho)</h5>
                        </Col>

                        <Col sm={12} md={3} lg={3}>
                            2020-2-5(Sunday)
                        </Col>

                        <Col sm={12} md={9} lg={9} className="time-container">
                            <ul>
                                {this.state.doctorData.map(data => (
                                    <li key={data}>
                                        <OverlayTrigger

                                            placement='top'
                                            overlay={
                                                <Tooltip >
                                                    App no: 123123<br>
                                                    </br>
                                                    Patient Name (24yrs /f)<br>
                                                    </br>
                                                    Mobile No: 9823411213
                                        </Tooltip>
                                            }
                                        >
                                            <Button variant="success" size="lg"> 11:00 A.M.</Button>
                                        </OverlayTrigger>

                                    </li>
                                ))
                                }

                                <li >
                                    <OverlayTrigger

                                        placement='top'
                                        overlay={
                                            <Tooltip >
                                                App no: 123123<br>
                                                </br>
                                                Patient Name (24yrs /f)<br>
                                                </br>
                                                Mobile No: 9823411213
                                        </Tooltip>
                                        }
                                    >
                                        <Button variant="danger" size="lg"> 11:00 A.M.</Button>
                                    </OverlayTrigger>

                                </li>

                                <li>
                                    <OverlayTrigger

                                        placement='top'
                                        overlay={
                                            <Tooltip >
                                                App no: 123123<br>
                                                </br>
                                                Patient Name (24yrs /f)<br>
                                                </br>
                                                Mobile No: 9823411213
                                        </Tooltip>
                                        }
                                    >
                                        <Button variant="success" size="lg"> 11:00 A.M.</Button>
                                    </OverlayTrigger>

                                </li>
                                <li>
                                    <OverlayTrigger

                                        placement='top'
                                        overlay={
                                            <Tooltip >
                                                App no: 123123<br>
                                                </br>
                                                Patient Name (24yrs /f)<br>
                                                </br>
                                                Mobile No: 9823411213
                                        </Tooltip>
                                        }
                                    >
                                        <Button variant="dark" size="lg"> 11:00 A.M.</Button>
                                    </OverlayTrigger>

                                </li>

                            </ul>
                        </Col>
                        <Col sm={12} md={3} lg={3}>
                            2020-2-5(Sunday)
                        </Col>

                        <Col sm={12} md={9} lg={9} className="time-container">
                            <ul>
                                {this.state.doctorData.map(data => (
                                    <li key={data}>
                                        <OverlayTrigger

                                            placement='top'
                                            overlay={
                                                <Tooltip >
                                                    App no: 123123<br>
                                                    </br>
                                                    Patient Name (24yrs /f)<br>
                                                    </br>
                                                    Mobile No: 9823411213
                                        </Tooltip>
                                            }
                                        >
                                            <Button variant="success" size="lg"> 11:00 A.M.</Button>
                                        </OverlayTrigger>

                                    </li>
                                ))
                                }

                                <li >
                                    <OverlayTrigger

                                        placement='top'
                                        overlay={
                                            <Tooltip >
                                                App no: 123123<br>
                                                </br>
                                                Patient Name (24yrs /f)<br>
                                                </br>
                                                Mobile No: 9823411213
                                        </Tooltip>
                                        }
                                    >
                                        <Button variant="danger" size="lg"> 11:00 A.M.</Button>
                                    </OverlayTrigger>

                                </li>

                                <li>
                                    <OverlayTrigger

                                        placement='top'
                                        overlay={
                                            <Tooltip >
                                                App no: 123123<br>
                                                </br>
                                                Patient Name (24yrs /f)<br>
                                                </br>
                                                Mobile No: 9823411213
                                        </Tooltip>
                                        }
                                    >
                                        <Button variant="success" size="lg"> 11:00 A.M.</Button>
                                    </OverlayTrigger>

                                </li>
                                <li>
                                    <OverlayTrigger

                                        placement='top'
                                        overlay={
                                            <Tooltip >
                                                App no: 123123<br>
                                                </br>
                                                Patient Name (24yrs /f)<br>
                                                </br>
                                                Mobile No: 9823411213
                                        </Tooltip>
                                        }
                                    >
                                        <Button variant="dark" size="lg"> 11:00 A.M.</Button>
                                    </OverlayTrigger>

                                </li>

                            </ul>
                        </Col>
                                 
                    </Row>
                </Container>
            </div>






        </>

    }

}
export default AppointmentStatusDataTable