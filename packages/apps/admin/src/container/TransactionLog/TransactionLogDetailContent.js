import React from 'react'
import {CForm, CHybridInput, CHybridTextArea} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const TransactionLogDetailContent = ({logData}) => {
    return (
        <>
            <Container-fluid>
                <CForm id="refund-info" className="mt-2">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="hospitalName"
                                    placeholder="Client Name"
                                    value={logData.hospitalName}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridTextArea
                                    id="doctorName"
                                    placeholder="Doctor Name(Specialization)"
                                    value={logData.doctorName.toUpperCase() + "(" + logData.specializationName.toUpperCase() + ")"}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentDate"
                                    placeholder="Appointment Date"
                                    value={logData.appointmentDate}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="transactionDate"
                                    placeholder="Transaction Date"
                                    value={logData.transactionDate}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentTime"
                                    placeholder="Appointment Time"
                                    value={logData.appointmentTime}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="transactionTime"
                                    placeholder="Transaction Time"
                                    value={logData.transactionTime}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentNumber"
                                    placeholder="Appointment Number"
                                    value={logData.appointmentNumber}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="transactionNumber"
                                    placeholder="Transaction Number"
                                    value={logData.transactionNumber}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="esewaId"
                                    placeholder="Esewa Id"
                                    value={logData.esewaId}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="registrationNumber"
                                    placeholder="Registration Number"
                                    value={logData.registrationNumber}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientName"
                                    placeholder="Patient Name"
                                    value={logData.patientName + "(" + logData.patientAge + "/" + logData.patientGender.split("")[0].toUpperCase() + ")"}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientType"
                                    placeholder="Patient Type"
                                    value={logData.isRegistered === "Y" ? "Registered" : "New"}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="DOB"
                                    placeholder="Date of Birth"
                                    value={logData.patientDob}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="mobileNumber"
                                    placeholder="Mobile Number"
                                    value={logData.mobileNumber}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridTextArea
                                    id="address"
                                    placeholder="Address"
                                    value={logData.patientAddress}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentAmount"
                                    placeholder="Appointment Amount"
                                    value={logData.appointmentAmount}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="revenueAmount"
                                    placeholder="Revenue Amount"
                                    value={logData.revenueAmount}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="refundAmount"
                                    placeholder="Refund Amount"
                                    value={logData.refundAmount}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default TransactionLogDetailContent
