import React from 'react'
import {CForm, CHybridInput, CHybridTextArea} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const ApprovalContent = ({appointmentDetails}) => {
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
                            {/*        value={approvalData.hospitalName}*/}
                            {/*        disabled={true}*/}
                            {/*    />*/}
                            {/*</Col>*/}
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
                                    id="AppointmentAmount"
                                    placeholder="Appointment Amount"
                                    value={appointmentDetails.appointmentAmount || 'N/A'}
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
                                    id="registrationNumber"
                                    placeholder="Registration Number"
                                    value={appointmentDetails.registrationNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientName"
                                    placeholder="Patient Name"
                                    value={appointmentDetails.patientName || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridTextArea
                                    id="patientAddress"
                                    placeholder="Patient Address"
                                    value={`${appointmentDetails.address},${appointmentDetails.vdcOrMunicipality}, ${appointmentDetails.district}, ${appointmentDetails.province}` || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="patientType"
                                    placeholder="Patient Type"
                                    value={
                                        appointmentDetails.isRegistered === 'N'
                                            ? 'New'
                                            : 'Registered'
                                    }
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentCategory"
                                    placeholder="Appointment Category"
                                    value={appointmentDetails.isSelf === 'Y' ? 'Self' : 'Others'}
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
                                <CHybridTextArea
                                    id="clientName"
                                    placeholder="Department Details"
                                    value={(appointmentDetails.hospitalDepartmentName || 'N/A') +
                                    '(' +
                                    (appointmentDetails.roomNumber || 'N/A') +
                                    ')'}
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
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="appointmentMode"
                                    placeholder="AppointmentMode"
                                    value={appointmentDetails.appointmentMode || 'N/A'}
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

export default ApprovalContent
