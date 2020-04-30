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
                <Row className="pl-4 pr-4">
                    <h5>Specialization Info</h5>
                </Row>

                <CForm id="department-info" className="mt-2 department-info">
                    <Container-fluid>
                        <Row>

                            <Col sm={4} md={4} lg={4}>
                                <CHybridInput
                                    id="hospital"
                                    name="hospitalId"
                                    placeholder="Client Name"
                                    value={typeof specializationData.hospitalId === 'object' ?
                                        (specializationData.hospitalId && specializationData.hospitalId.label) : specializationData.hospitalName}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={4} md={4} lg={4}>
                                <CHybridInput
                                    id="specialization-name"
                                    name="name"
                                    placeholder="Specialization Name"
                                    value={specializationData.name}
                                    disabled={true}
                                />
                            </Col>

                            <Col sm={4} md={4} lg={4}>
                                <CHybridInput
                                    id="specialization-code"
                                    name="code"
                                    placeholder="Specialization Code"
                                    value={specializationData.code}
                                    disabled={true}
                                />
                            </Col>
                            {AuditableEntityHoc(specializationData,false,4)}
                            {/*{type !== 'A' ? (*/}
                            {/*    <Col sm={4} md={4} lg={4}>*/}
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
                            <Col sm={4} md={4} lg={4}>
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
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default DetailsModal
