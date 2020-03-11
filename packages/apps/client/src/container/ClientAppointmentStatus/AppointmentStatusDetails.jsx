import React from 'react';

import {Badge, Button, Col, Container, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {CButton, CLoading} from "@frontend-appointment/ui-elements";

import "./appointment-status.scss";
import {appointmentStatusList} from "@frontend-appointment/helpers";

const TIME_SLOT_EMPTY_ERROR_MESSAGE = "APPOINTMENTS NOT AVAILABLE";
const DAY_OFF_MESSAGE = "DAY OFF";

const AppointmentStatusDetails = ({statusDetailsData}) => {
    const {
        appointmentStatusDetails,
        doctorInfoList,
        errorMessageForStatusDetails,
        searchErrorMessage,
        isStatusListLoading,
        filterAppointmentDetailsByStatus,
        activeStatus,
        getPatientDetails,
        handleCheckIn,
        showCheckInModal,
        handleViewAppointmentDetails
    } = statusDetailsData;
    return <>
        <div className="manage-details">
            <Container fluid>
                {!isStatusListLoading && !searchErrorMessage &&
                appointmentStatusDetails.length ?
                    <Row>
                        <Col className="p-0" lg={4}><h5 className="title">Appointment Status Details</h5></Col>

                        <Col lg={8}>
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
                    appointmentStatusDetails.map((appointmentStatusDetail, rowIndex) => (
                        <Row className="appointment-status-list" key={"detail-" + rowIndex}>
                            <Col md={2} className="d-flex  flex-column justify-content-start">
                                <h5 className="title">Doctor Details</h5>
                                <div className="doctor-image">
                                    {doctorInfoList.map(doctorData => (
                                        doctorData.value === appointmentStatusDetail.doctorId ?
                                            doctorData.fileUri ?
                                                <img
                                                    src={doctorData.fileUri}
                                                    alt={"DOCTOR"}/> :
                                                <img src={require("./img/picture.png")}
                                                     alt={"DOCTOR"}/> : ''
                                    ))}

                                </div>
                                <p className="doctor-details">
                                    <span>{appointmentStatusDetail.doctorName}</span>
                                    <br/>{appointmentStatusDetail.specializationName}
                                </p>
                            </Col>


                            <Col sm={12} md={8} lg={8} className="time-container">
                                <h5 className="title">Appointment Slots</h5><br></br>
                                <p className="time-details">
                                    {appointmentStatusDetail.date},{appointmentStatusDetail.weekDayName}
                                    {
                                        appointmentStatusDetail.doctorTimeSlots ?
                                            appointmentStatusDetail.doctorTimeSlots.length ?
                                                <span className="time">
                                                    {appointmentStatusDetail.doctorTimeSlots[0].appointmentTime} -&nbsp;
                                                    {appointmentStatusDetail.doctorTimeSlots[
                                                    appointmentStatusDetail.doctorTimeSlots.length - 1].appointmentTime}</span>
                                                : '' : ''
                                    }
                                </p>
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
                                                                    id={timeSlot.appointmentTime + "-" + rowIndex + index}
                                                                    onClick={() => getPatientDetails(timeSlot,
                                                                        appointmentStatusDetail.date, rowIndex, index)}
                                                                    variant={timeSlot.status === 'PA' ? 'warning'
                                                                        : timeSlot.status === 'A' ? 'danger'
                                                                            : timeSlot.status === 'C' ? 'dark'
                                                                                : 'info'}
                                                                    size="lg block"
                                                                    className="time-button">
                                                                    <i className="fa fa-check-circle"></i>{timeSlot.appointmentTime}

                                                                </Button>
                                                            </OverlayTrigger> :
                                                            (timeSlot.status === 'V') ?
                                                                (<CButton
                                                                    id={timeSlot.appointmentTime + "-" + rowIndex + index}
                                                                    variant={"success"}
                                                                    size="lg"
                                                                    // id="vacant"
                                                                    name=""
                                                                    onClickHandler={() => getPatientDetails(timeSlot,
                                                                        appointmentStatusDetail.date, rowIndex, index)}
                                                                >
                                                                    {timeSlot.appointmentTime}
                                                                </CButton>)
                                                                : ''
                                                        }
                                                    </li>
                                                ))

                                                : appointmentStatusDetail.dayOffStatus === 'Y' ?
                                                    <div className="day-off"><i
                                                        className='fa  fa-calendar-times-o'/>{DAY_OFF_MESSAGE}</div>
                                                    : <div className="day-off"><i
                                                        className='fa  fa-calendar-times-o'/>{TIME_SLOT_EMPTY_ERROR_MESSAGE}
                                                    </div>

                                        ) : appointmentStatusDetail.dayOffStatus === 'Y' ? <div className="day-off"><i
                                                className='fa fa-calendar-times-o'/>{DAY_OFF_MESSAGE}</div>
                                            : <div className="day-off"><i
                                                className='fa  fa-calendar-times-o'/>{TIME_SLOT_EMPTY_ERROR_MESSAGE}
                                            </div>
                                    }
                                </ul>
                            </Col>
                            {
                                appointmentStatusDetail.patientDetails ?
                                    <Col sm={12} md={2} lg={2}>
                                        <h5 className="title">Patients Details </h5><br></br>
                                        <div className="patient-details">
                                            <div className="label">Appointment No.</div>
                                            <div className="data">
                                                {appointmentStatusDetail.patientDetails.appointmentNumber}
                                            </div>
                                        </div>

                                        <div className="patient-details">
                                            <div className="label">Appointment Category</div>
                                            <div className="data">
                                                {appointmentStatusDetail.patientDetails.isSelf === 'Y' ? 'Self' : 'Others'}
                                            </div>
                                        </div>


                                        <div className="patient-details">
                                            <div className="label">Name</div>
                                            <div className="data">
                                                {appointmentStatusDetail.patientDetails.name }<br/>
                                                {" ("
                                                + appointmentStatusDetail.patientDetails.age + " / "
                                                + appointmentStatusDetail.patientDetails.gender + ")"}
                                            </div>
                                        </div>

                                        <div className="patient-details">
                                            <div className="label">Contact No.</div>
                                            <div className="data">
                                                {appointmentStatusDetail.patientDetails.mobileNumber}
                                            </div>
                                        </div>

                                        <div className="patient-details">
                                            <div className="label">Address</div>
                                            <div className="data">
                                                {appointmentStatusDetail.patientDetails.address}
                                            </div>
                                        </div>


                                        <CButton
                                            name=""
                                            variant="outline-primary"
                                            size="sm" block
                                            onClickHandler={() => handleViewAppointmentDetails(appointmentStatusDetail)}
                                            // className="btn-checkin"
                                        >
                                            <i className="fa fa-eye"/> &nbsp;View Details
                                        </CButton>

                                        {appointmentStatusDetail.patientDetails.showCheckInButton ?
                                            <CButton
                                                name=""
                                                vairant="primary "
                                                size="sm"
                                                className="btn-checkin"
                                                onClickHandler={() => handleCheckIn(appointmentStatusDetail)}
                                                disabled={!appointmentStatusDetail.patientDetails.canCheckIn
                                                || showCheckInModal}
                                            >
                                                <i className="fa fa-sign-in"/> &nbsp;{showCheckInModal ?
                                                'Checking-In' : 'Check-In'}
                                            </CButton>
                                            : ''
                                        }

                                    </Col>
                                    : ''
                            }
                        </Row>
                    ))
                    :
                    <>
                        {((!isStatusListLoading && errorMessageForStatusDetails) ?
                            (
                                <Row>
                                    <Col>
                                        <div className="filter-message">
                                            <div className="no-data ">
                                                <i className="fa fa-hand-o-up"/>
                                            </div>
                                            <div
                                                className="message text-center">{errorMessageForStatusDetails}</div>
                                        </div>
                                    </Col>
                                </Row>
                            ) :
                            (!isStatusListLoading && searchErrorMessage) ?
                                (
                                    <Row>
                                        <Col>
                                            <div className="filter-message">
                                                <div className="no-data primary">
                                                    <i className="fa fa-file-text-o"/>
                                                </div>
                                                <div className="message text-center">{searchErrorMessage}</div>
                                            </div>
                                        </Col>
                                    </Row>
                                ) :
                                <CLoading/>)}
                    </>
                }

            </Container>
        </div>
    </>;
};
export default AppointmentStatusDetails;
