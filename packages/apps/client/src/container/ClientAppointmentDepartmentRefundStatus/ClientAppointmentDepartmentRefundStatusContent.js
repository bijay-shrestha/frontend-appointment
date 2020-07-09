import React from 'react'
import {CForm, CHybridInput} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const DetailsModal = ({refundData}) => {
    return (
        <>
            <Container-fluid>
                <CForm id="refund-info" className="mt-2">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentDate"
                                    placeholder="Appointment Date"
                                    value={refundData.appointmentDate}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="cancelledDate"
                                    placeholder="Cancelled Date"
                                    value={refundData.cancelledDate}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentTime"
                                    placeholder="Appointment Time"
                                    value={refundData.appointmentTime}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="registrationNumber"
                                    placeholder="Registration Number"
                                    value={refundData.registrationNumber}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientName"
                                    placeholder="Patient Name"
                                    value={refundData.patientName}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="esewaId"
                                    placeholder="Esewa Id"
                                    value={refundData.esewaId}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id=""
                                    placeholder="Department Name"
                                    value={refundData.hospitalDepartmentName}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id=""
                                    placeholder="Specialization Name"
                                    value={refundData.roomNumber}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="transactionNumber"
                                    placeholder="Transaction Number"
                                    value={refundData.transactionNumber}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentCharge"
                                    placeholder="Appointment Charge"
                                    value={refundData.appointmentCharge}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="refundAmount"
                                    placeholder="Refund Amount"
                                    value={refundData.refundAmount}
                                    disabled={true}
                                />
                            </Col>
                             <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentMode"
                                    placeholder="AppointmentMode"
                                    value={refundData.appointmentMode || 'N/A'}
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

export default DetailsModal
