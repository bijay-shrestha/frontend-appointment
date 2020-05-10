import React from 'react'
import {
    CFLabel,
    CForm,
    CHybridInput,
    CRadioButton
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import {AuditableEntityHoc} from '@frontend-appointment/commons'

const DetailsModal = ({specializationData, type}) => {
    return (
        <>
            <Container-fluid>
               

                <CForm id="department-info" className="mt-2 department-info">
                    <Container-fluid>
                        <Row>

                            <Col sm={6} md={6} lg={6}>
                                <CHybridInput
                                    id="hospital"
                                    name="hospitalId"
                                    placeholder="Client Name"
                                    value={typeof specializationData.hospitalId === 'object' ?
                                        (specializationData.hospitalId && specializationData.hospitalId.label) : specializationData.hospitalName}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={6} md={6} lg={6}>
                                <CHybridInput
                                    id="specialization-name"
                                    name="name"
                                    placeholder="Specialization Name"
                                    value={specializationData.name}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={6} md={6} lg={6}>
                                <CHybridInput
                                    id="specialization-code"
                                    name="code"
                                    placeholder="Specialization Code"
                                    value={specializationData.code}
                                    disabled={true}
                                />
                            </Col>
                            
                            {/*{type !== 'A' ? (*/}
                            {/*    <Col sm={6} md={6} lg={6}>*/}
                            {/*        <CHybridInput*/}
                            {/*            id="specialization-remarks"*/}
                            {/*            name="name"*/}
                            {/*            placeholder="Specialization Remarks"*/}
                            {/*            value={specializationData.remarks}*/}
                            {/*            disabled={true}*/}
                            {/*        />*/}
                            {/*    </Col>*/}
                            {/*) : (*/}
                            {/*    ''*/}
                            {/*)}*/}
                            <Col sm={6} md={6} lg={6}>
                                <CFLabel labelName="Specialization Status" id="status"/>
                                <CRadioButton
                                    checked={specializationData.status === 'Y'}
                                    disabled={true}
                                    readOnly={true}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                />
                                {
                                    type !== 'A' ?
                                        <CRadioButton
                                            checked={specializationData.status === 'N'}
                                            disabled={true}
                                            readOnly={true}
                                            id="radio2"
                                            label="Inactive"
                                            type="radio"
                                        />
                                        :
                                        ''
                                }
                            </Col>
                        </Row>
                        <Row className="mt-4">
                                
                                {AuditableEntityHoc(specializationData)}
                                </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default DetailsModal
