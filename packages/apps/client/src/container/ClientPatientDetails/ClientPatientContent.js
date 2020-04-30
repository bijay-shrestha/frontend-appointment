import React, {memo} from 'react'
import {CForm, CHybridInput} from '@frontend-appointment/ui-elements'
import {Col, Row, Badge} from 'react-bootstrap'
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";
import {AuditableEntityHoc} from "@frontend-appointment/commons";
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
                                    id="address"
                                    placeholder="Address"
                                    value={previewData.address || 'N/A'}
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
                                    id="mobileNumber"
                                    placeholder="Mobile Number"
                                    value={previewData.mobileNumber || 'N/A'}
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
                                    id="patientType"
                                    placeholder="Patient Type"
                                    value={previewData.isRegistered === 'N' ? 'New' : 'Registered' || 'N/A'}
                                    disabled={true}
                                />
                            </Col>
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="status"
                                    placeholder="Status"
                                    value={previewData.status ? 'Active' : 'Inactive'}
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
                            {AuditableEntityHoc(previewData)}
                            {/* <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="hospitalName"
                  placeholder="Client"
                  value={previewData.hospitalName||'N/A'}
                  disabled={true}
                />
              </Col> */}
                            <Col sm={12} md={6} lg={6}>
                                <CHybridInput
                                    id="DOB"
                                    placeholder="Date of Birth"
                                    value={DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(previewData.dateOfBirth) || 'N/A'}
                                    disabled={true}
                                />
                            </Col>

                            {/* <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="category_Patient"
                  placeholder="Patient Category"
                  value={previewData.isSelf ? 'Self' : 'Other'}
                  disabled={true}
                />
              </Col> */}
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default memo(DetailsModal)
