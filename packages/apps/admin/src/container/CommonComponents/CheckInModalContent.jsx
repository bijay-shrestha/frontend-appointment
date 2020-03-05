import React from 'react'
import {CForm, CHybridInput} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const CheckInModalContent = ({appointmentDetails}) => {
    return (
        <>
            <Container-fluid>
                <CForm id="refund-info" className="mt-2">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="hospitalName"
                                    placeholder="Hospital Name"
                                    value={appointmentDetails.hospitalName || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="doctor-specializationName"
                                    placeholder="Doctor(Specialization)"
                                    value={
                                        'Dr.' +
                                        appointmentDetails.doctorName +
                                        '(' +
                                        appointmentDetails.specializationName +
                                        ')'
                                    }
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentDate"
                                    placeholder="Appointment Date"
                                    value={appointmentDetails.appointmentDate || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentTime"
                                    placeholder="Appointment Time"
                                    value={appointmentDetails.appointmentTime || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="Appointment Amount"
                                    placeholder="Appointment Amount"
                                    value={appointmentDetails.appointmentAmount || '0'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id=""
                                    placeholder="Patient Name"
                                    value={appointmentDetails.patientName || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="esewaId"
                                    placeholder="Esewa Id"
                                    value={appointmentDetails.esewaId || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientType"
                                    placeholder="Patient Type"
                                    value={appointmentDetails.patientType === 'N' ? 'New' : 'Registered'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="registrationNumber"
                                    placeholder="Registration Number"
                                    value={appointmentDetails.registrationNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="Mobile Number"
                                    placeholder="Mobile Number"
                                    value={appointmentDetails.mobileNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="transactionNumber"
                                    placeholder="Transaction Number"
                                    value={appointmentDetails.transactionNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
};

export default CheckInModalContent;
