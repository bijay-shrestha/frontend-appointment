import React from 'react';

import {Button, Col, Container, OverlayTrigger, Row, Tooltip, Badge} from "react-bootstrap";
import {CLoading, CButton} from "@frontend-appointment/ui-elements";

import "./appointment-status.scss";
import {appointmentStatusList} from "@frontend-appointment/helpers";

const TIME_SLOT_EMPTY_ERROR_MESSAGE = "APPOINTMENTS NOT AVAILABLE";
const DAY_OFF_MESSAGE = "DAY OFF";

const AppointmentStatusDetails = ({statusDetailsData}) => {
    const {
        appointmentStatusDetails,
        errorMessageForStatusDetails,
        searchErrorMessage,
        isStatusListLoading,
        filterAppointmentDetailsByStatus,
        activeStatus
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
                                {
                                    appointmentStatusList.map(appointmentStatus => (
                                        <div>
                                            <Badge variant={appointmentStatus.variant}>&nbsp;</Badge>
                                            <a href=""
                                               className={activeStatus === appointmentStatus.value ? "active" : ''}
                                               onClick={(event) => filterAppointmentDetailsByStatus(appointmentStatus.value, event)}>
                                                {appointmentStatus.label}
                                            </a>
                                        </div>
                                    ))
                                }
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
                                        (appointmentStatusDetail.doctorTimeSlots.length ?
                                                appointmentStatusDetail.doctorTimeSlots.map((timeSlot, index) => (
                                                    <li key={'timeSlot-' + index}>
                                                        {['PA', 'A', 'C'].indexOf(timeSlot.status) >= 0 ?
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
                                                                <Button
                                                                    variant={timeSlot.status === 'PA' ? 'primary' : timeSlot.status === 'A' ? 'danger' : timeSlot.status === 'C' ? 'dark' : 'info'}
                                                                    size="lg">
                                                                    {timeSlot.appointmentTime}
                                                                </Button>
                                                            </OverlayTrigger> :
                                                            (timeSlot.status === 'V') ?
                                                                (<CButton
                                                                    variant={"success"}
                                                                    size="lg"
                                                                    id="vacant"
                                                                    name=""
                                                                >
                                                                    {timeSlot.appointmentTime}
                                                                </CButton>)
                                                                : ''
                                                        }
                                                    </li>
                                                ))
                                                : appointmentStatusDetail.dayOffStatus === 'Y' ? DAY_OFF_MESSAGE
                                                    : TIME_SLOT_EMPTY_ERROR_MESSAGE
                                        ) : appointmentStatusDetail.dayOffStatus === 'Y' ? DAY_OFF_MESSAGE
                                            : TIME_SLOT_EMPTY_ERROR_MESSAGE
                                    }
                                </ul>
                            </Col>
                        </Row>
                    ))
                    :
                    <>
                        {((!isStatusListLoading && errorMessageForStatusDetails) ?
                                    (
                                        <Row>
                                            <div className="filter-message">
                                                <div className="no-data ">
                                                    <i className="fa fa-hand-o-up"/>
                                                </div>
                                                <div
                                                    className="message text-center">{errorMessageForStatusDetails}</div>
                                            </div>
                                        </Row>
                                    ) :
                                    (!isStatusListLoading && searchErrorMessage) ?
                                        (
                                            <Row>
                                                <div className="filter-message">
                                                    <div className="no-data primary">
                                                        <i className="fa fa-file-text-o"/>
                                                    </div>
                                                    <div className="message text-center">{searchErrorMessage}</div>
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
