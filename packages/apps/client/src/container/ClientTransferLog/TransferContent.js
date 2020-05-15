import React from 'react'
import {CForm, CHybridInput} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const ApprovalContent = ({transferData}) => {
    return (
        <>
            <Container-fluid>
                <CForm id="refund-info" className="mt-2">
                    <Container-fluid>
                        <Row>
                            {/*<Col sm={12} md={6} lg={6}>*/}
                            {/*    <CHybridInput*/}
                            {/*        id="clientName"*/}
                            {/*        placeholder="Client Name"*/}
                            {/*        value={transferData.hospitalName}*/}
                            {/*        disabled={true}*/}
                            {/*    />*/}
                            {/*</Col>*/}
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentDate"
                                    placeholder="Appointment Date"
                                    value={transferData.appointmentDate || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentTime"
                                    placeholder="Appointment Time"
                                    value={transferData.appointmentTime || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentAmount"
                                    placeholder="Appointment Amount"
                                    value={transferData.appointmentAmount || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="esewaId"
                                    placeholder="Esewa Id"
                                    value={transferData.esewaId || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="registrationNumber"
                                    placeholder="Registration Number"
                                    value={transferData.registrationNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientName"
                                    placeholder="Patient Name"
                                    value={transferData.patientName || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientType"
                                    placeholder="Patient Type"
                                    value={transferData.isRegistered === 'N' ? 'New' : 'Registered'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentCategory"
                                    placeholder="Appointment Category"
                                    value={transferData.isSelf === 'Y' ? 'Self' : 'Others'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="Mobile Number"
                                    placeholder="Mobile Number"
                                    value={transferData.mobileNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="doctor-specializationName"
                                    placeholder="Doctor(Specialization)"
                                    value={
                                        transferData.doctorName && transferData.specialization ? 'Dr.' +
                                            transferData.doctorName.toUpperCase() +
                                            '(' +
                                            transferData.specializationName.toUpperCase() +
                                            ')' : 'N/A'
                                    }
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="transactionNumber"
                                    placeholder="Transaction Number"
                                    value={transferData.transactionNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentMode"
                                    placeholder="AppointmentMode"
                                    value={transferData.appointmentMode || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            {/*<Col sm={12} md={6} lg={6}>*/}
                            {/*    <CHybridInput*/}
                            {/*        id="refundAmount"*/}
                            {/*        placeholder="Refund Amount"*/}
                            {/*        value={transferData.refundAmount}*/}
                            {/*        disabled={true}*/}
                            {/*    />*/}
                            {/*</Col>*/}
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default ApprovalContent
