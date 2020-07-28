import React from 'react'
import {CForm, CHybridInput, CHybridTextArea} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const DepartmentAppointmentCheckInModalContent = ({approvalData}) => {
    return (
        <>
            <Container-fluid>
                <CForm id="refund-info" className="mt-2">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="clientName"
                                    placeholder="Client"
                                    value={approvalData.hospitalName || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentDate"
                                    placeholder="Appointment Date"
                                    value={approvalData.appointmentDate || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentTime"
                                    placeholder="Appointment Time"
                                    value={approvalData.appointmentTime || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="AppointmentAmount"
                                    placeholder="Appointment Amount"
                                    value={approvalData.appointmentAmount || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="esewaId"
                                    placeholder="Esewa Id"
                                    value={approvalData.esewaId || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="registrationNumber"
                                    placeholder="Registration Number"
                                    value={approvalData.registrationNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientName"
                                    placeholder="Patient Name"
                                    value={approvalData.patientName || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridTextArea
                                    id="patientAddress"
                                    placeholder="Patient Address"
                                    value={`${approvalData.address},${approvalData.vdcOrMunicipality}, ${approvalData.district}, ${approvalData.province}` || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientType"
                                    placeholder="Patient Type"
                                    value={
                                        approvalData.isRegistered === 'N' ? 'New' : 'Registered'
                                    }
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentCategory"
                                    placeholder="Appointment Category"
                                    value={approvalData.isSelf === 'Y' ? 'Self' : 'Others'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="Mobile Number"
                                    placeholder="Mobile Number"
                                    value={approvalData.mobileNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="department-name"
                                    placeholder="Department Name(RoomNumber)"
                                    value={
                                        (approvalData.hospitalDepartmentName || 'N/A') +
                                        '(' +
                                        (approvalData.roomNumber || 'N/A') +
                                        ')'
                                    }
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="transactionNumber"
                                    placeholder="Transaction Number"
                                    value={approvalData.transactionNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentMode"
                                    placeholder="AppointmentMode"
                                    value={approvalData.appointmentMode || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            {/*<Col sm={12} md={6} lg={6}>*/}
                            {/*    <CHybridInput*/}
                            {/*        id="refundAmount"*/}
                            {/*        placeholder="Refund Amount"*/}
                            {/*        value={approvalData.refundAmount}*/}
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

export default DepartmentAppointmentCheckInModalContent