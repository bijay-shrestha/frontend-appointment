import React, {memo} from 'react'
import {CForm, CHybridInput} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const DetailsModal = ({previewData}) => {
    return (
        <>
            <Container-fluid>
                <CForm id="refund-info" className="mt-2">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="name"
                                    placeholder="Name"
                                    value={previewData.name || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="DOB"
                                    placeholder="Date of Birth"
                                    value={previewData.dateOfBirth || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="age"
                                    placeholder="Age"
                                    value={previewData.age || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                           
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="email"
                                    placeholder="Email"
                                    value={previewData.email || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="mobileNumber"
                                    placeholder="Mobile Number"
                                    value={previewData.mobileNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="address"
                                    placeholder="Address"
                                    value={previewData.address || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="registrationNumber"
                                    placeholder="Registration Number"
                                    value={previewData.registrationNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="esewaId"
                                    placeholder="Esewa Id"
                                    value={previewData.esewaId || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            
                         
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="status"
                                    placeholder="Status"
                                    value={previewData.status==='Y'?'Active':'Inactive'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="hospitalNumber"
                                    placeholder="Hospital Number"
                                    value={previewData.hospitalNumber || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            

                            {/* <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="category_appointment"
                                    placeholder="Appointment Category"
                                    value={previewData.isSelf ? 'Self' : 'Other'}
                                    disabled={true}
                                />
                            </Col> */}
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="type_patient"
                                    placeholder="Patient Type"
                                    value={previewData.isRegistered === 'Y' ? 'Registered' : 'Not Registered'}
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

export default memo(DetailsModal)
