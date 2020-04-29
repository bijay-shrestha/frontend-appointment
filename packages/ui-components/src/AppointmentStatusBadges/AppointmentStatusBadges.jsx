import React from 'react';
import {Badge, Col, Row} from "react-bootstrap";

const AppointmentStatusBadges = () => {
    return <>
        <Row>
            <Col>
                <div className="appointment-badge float-right">
                    <span><Badge variant="warning">B</Badge>  <span className="badge-data">Booked</span></span>
                    <span><Badge variant="primary">CH</Badge>  <span
                        className="badge-data">Checked-In</span> </span>
                    <span><Badge variant="danger">C</Badge>  <span className="badge-data">Canceled</span></span>
                    {/*<span><Badge variant="warning">RE</Badge>  <span className="badge-data">Rejected</span></span>*/}
                    <span><Badge variant="brown">R</Badge>  <span
                        className="badge-data">Refunded</span></span>
                </div>
            </Col>
        </Row>
    </>
};

export default AppointmentStatusBadges;
