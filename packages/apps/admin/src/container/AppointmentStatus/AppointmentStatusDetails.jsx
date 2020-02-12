import React from 'react';

import {Button, Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {CButton, CLoading} from "@frontend-appointment/ui-elements";

import "./appointment-status.scss";

const AppointmentStatusDetails = ({statusDetailsData}) => {
    const {
        appointmentStatusDetails,
        errorMessageForStatusDetails,
        searchErrorMessage,
        isStatusListLoading,
        showTimeSlotsOfStatus,
        filterAppointmentDetailsByStatus
    } = statusDetailsData;
    return <>
        <div className="manage-details">
            <Container fluid>
                {!isStatusListLoading && !searchErrorMessage &&
                appointmentStatusDetails.length ?
                    <Row>
                        <Col className="p-0"><h5 className="title">Appointment Status Details</h5></Col>

                        <Col>
                            <div className="appointment-badge float-right">
                            <span>
                                <CButton
                                    id="all-filter"
                                    variant="secondary"
                                    size="lg"
                                    name="All"
                                    onClickHandler={() => filterAppointmentDetailsByStatus('')}
                                />
                            </span>
                                <span>
                                <CButton
                                    id="vacant"
                                    variant="success"
                                    size="lg"
                                    name="Vacant"
                                    onClickHandler={() => filterAppointmentDetailsByStatus('V')}
                                />
                            </span>
                                <span>
                                <CButton
                                    id="pending-approval"
                                    variant="warning"
                                    size="lg"
                                    name="Pending Approval"
                                    onClickHandler={() => filterAppointmentDetailsByStatus('PA')}
                                />
                            </span>
                                <span>
                                <CButton
                                    id="approved"
                                    variant="danger"
                                    size="lg"
                                    name="Approved"
                                    onClickHandler={() => filterAppointmentDetailsByStatus('A')}
                                />
                            </span>
                                <span>
                                <CButton
                                    id="cancelled"
                                    variant="dark"
                                    size="lg"
                                    name="Cancelled"
                                    onClickHandler={() => filterAppointmentDetailsByStatus('C')}
                                />
                            </span>
                            </div>
                        </Col>
                    </Row>
                    : ''
                }
                {!isStatusListLoading && !searchErrorMessage && appointmentStatusDetails.length ?
                    appointmentStatusDetails.map((appointmentStatusDetail, index) => (
                        <Row className="appointment-status-list" key={"detail-" + index}>
                            <Col sm={12}>
                                <h5 className="doctor-name">
                                    {appointmentStatusDetail.doctorName} ({appointmentStatusDetail.specializationName})
                                </h5>
                            </Col>

                            <Col sm={12} md={3} lg={3}>
                                {appointmentStatusDetail.date} ({appointmentStatusDetail.weekDayName})
                            </Col>

                            <Col sm={12} md={9} lg={9} className="time-container">
                                <ul>
                                    {appointmentStatusDetail.doctorTimeSlots ?
                                        appointmentStatusDetail.doctorTimeSlots.map((timeSlot, index) => (
                                            <li key={'timeSlot-' + index}>
                                                {['PA', 'A', 'C'].indexOf(timeSlot.status) >= 0 &&
                                                (showTimeSlotsOfStatus === timeSlot.status || showTimeSlotsOfStatus === '') ?
                                                    <OverlayTrigger
                                                        placement='top'
                                                        overlay={
                                                            <Tooltip id={timeSlot.status + "-" + index}>
                                                                App no: {timeSlot.appointmentNumber}<br>
                                                            </br>
                                                                {timeSlot.patientName} ({timeSlot.age} / {timeSlot.gender})<br>
                                                            </br>
                                                                Mobile No: {timeSlot.mobileNumber || 'N/A'}
                                                            </Tooltip>
                                                        }>
                                                        <Button variant="warning"
                                                                size="lg">
                                                            {timeSlot.appointmentTime}
                                                        </Button>
                                                    </OverlayTrigger> :
                                                    (showTimeSlotsOfStatus === timeSlot.status || showTimeSlotsOfStatus === '') ?
                                                        (<Button
                                                            variant={"success"}
                                                            size="lg">
                                                            {timeSlot.appointmentTime}
                                                        </Button>) : ''
                                                }
                                            </li>
                                        )) :
                                        'N/A'}
                                </ul>
                            </Col>
                        </Row>
                    ))
                    :
                    <>
                        {!isStatusListLoading && searchErrorMessage ?
                            (
                                <Row>
                                    <div className="filter-message">
                                        <div className="no-data primary">
                                            <i className="fa fa-file-text-o"/>
                                        </div>
                                        <div className="message text-center">{searchErrorMessage}</div>
                                    </div>
                                </Row>
                            ) : (!isStatusListLoading && errorMessageForStatusDetails ?
                                    (
                                        <Row>
                                            <div className="filter-message">
                                                <div className="no-data primary">
                                                    <i className="fa fa-hand-o-up"/>
                                                </div>
                                                <div
                                                    className="message text-center">{errorMessageForStatusDetails}</div>
                                            </div>
                                        </Row>
                                    ) :
                                    <CLoading/>
                            )
                        }
                    </>
                }

            </Container>
        </div>
    </>;
};
export default AppointmentStatusDetails;