import React from 'react'
import AppointmentLogSearchFilter from './AppointmentLogSearchFilter'
import AppointmentLogDataTable from './AppointmentLogDataTable'
import AppointmentLogHoc from './AppointmentLogHoc'
import {Table, Container, Col} from 'react-bootstrap';

const AppointmentRefundLog = props => {
    const AppoinmentRefund = AppointmentLogHoc(
        ({searchHandler, paginationProps, tableHandler, appointmentStatistics}) => (
            <>
                <div>
                    <AppointmentLogSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <AppointmentLogDataTable
                        tableHandler={tableHandler}
                        paginationProps={paginationProps}
                    />
                </div>

                <Container className="revenue-details" fluid>

                    <div className="row">
                        <h5 className="rd-title">Revenue Details</h5>
                    </div>
                    <div className="row rd-container">


                        <Col md={4} className="p-0  mt-4">
                            <div className="rd-card book">
                                <div className="icon">
                                    B
                                </div>
                                <div className="rd-content ">
                                    <span>   <span className="label">Booked</span> </span>
                                    <span> <span
                                        className="amt"> NPR {appointmentStatistics.bookedAmount}</span> from<span
                                        className="apt">  {appointmentStatistics.bookedAppointmentsCount} </span>Appointments</span>
                                </div>
                            </div>

                        </Col>

                        <Col md={4} className="p-0  mt-4">
                            <div className="rd-card checkin">
                                <div className="icon">
                                    CH
                                </div>
                                <div className="rd-content ">
                                    <span>   <span className="label">Checked-In</span> </span>
                                    <span> <span className="amt"> NPR {appointmentStatistics.checkedInAmount}</span> from<span
                                        className="apt"> {appointmentStatistics.checkedInAppointmentsCount} </span>Appointments</span>
                                </div>
                            </div>

                        </Col>

                        <Col md={4} className="p-0  mt-4">
                            <div className="rd-card cancel">
                                <div className="icon">
                                    C
                                </div>
                                <div className="rd-content ">
                                    <span>   <span className="label">Cancel</span> </span>
                                    <span> <span
                                        className="amt"> NPR {appointmentStatistics.cancelAmount}</span> from <span
                                        className="apt"> {appointmentStatistics.cancelAppointmentsCount} </span>Appointments</span>
                                </div>
                            </div>

                        </Col>

                        <Col md={4} className="p-0  mt-4">
                            <div className="rd-card refund">
                                <div className="icon">
                                    R
                                </div>
                                <div className="rd-content ">
                                    <span>   <span className="label">Refund</span></span>
                                    <span> <span
                                        className="amt"> NPR {appointmentStatistics.revenueFromRefundedAmount}</span> from
               <span className="apt">  {appointmentStatistics.revenueFromRefundedAppointmentsCount} </span>Appointments</span>
                                </div>
                            </div>

                        </Col>

                        <Col md={4} className="p-0  mt-4">
                            <div className="rd-card refund-client">
                                <div className="icon">
                                    RF
                                </div>
                                <div className="rd-content">
                                    <span>   <span className="label">Refunded Amount to Client </span> </span>
                                    <span> <span className="amt"> NPR {appointmentStatistics.refundedAmount}</span> from
               <span className="apt"> {appointmentStatistics.refundedAppointmentsCount} </span>Appointments</span>
                                </div>
                            </div>

                        </Col>

                        <Col md={4} className="p-0  mt-4">
                            <div className="rd-card total">
                                <div className="icon">
                                    T
                                </div>
                                <div className="rd-content ">
                                    <span>   <span className="label">Total Revenue Amount from Client <br></br><span
                                        className="inc">(Incl. Booked Appts. revenue)</span> </span> </span>
                                    <span> <span className="amt"> NPR {appointmentStatistics.totalAmount}</span> from
                                    <span className="apt"> {appointmentStatistics.bookedAppointmentsCount +
                                    appointmentStatistics.checkedInAppointmentsCount +
                                    appointmentStatistics.cancelAppointmentsCount +
                                    appointmentStatistics.revenueFromRefundedAppointmentsCount} </span>Appointments</span>
                                </div>
                            </div>

                        </Col>
                    </div>
                </Container>

            </>
        ),
        props,
        ''
    );

    return <AppoinmentRefund/>
};

export default AppointmentRefundLog
