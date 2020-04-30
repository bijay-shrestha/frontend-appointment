import React from 'react';
import {CFLabel, CForm, CHybridInput, CHybridTextArea, CModal, CRadioButton} from "@frontend-appointment/ui-elements";
import {Col, Row} from "react-bootstrap";
import {AuditableEntityHoc} from '@frontend-appointment/commons';
const UniversityDetails = ({closeModal, universityData, showPreviewModal}) => {
    const detailContents = <>
        <Container-fluid>
            <CForm id="refund-info" className="mt-2">
                <Container-fluid>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <CHybridInput
                                id="name"
                                placeholder="University Name"
                                value={universityData.name || 'N/A'}
                                disabled={true}
                            />
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <CHybridInput
                                id="address"
                                placeholder="Address"
                                value={universityData.address || 'N/A'}
                                disabled={true}
                            />
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <CHybridInput
                                id="country"
                                placeholder="Country"
                                value={universityData.countryName || 'N/A'}
                                disabled={true}
                            />
                        </Col>
                        {AuditableEntityHoc(universityData)}
                        <Col sm="12" md="6">
                            <CFLabel labelName="Status" id="status"/>
                            <CRadioButton
                                checked={universityData.status === "Y"}
                                disabled={true}
                                readOnly={true}
                                id="radio1"
                                label="Active"
                                type="radio"
                            />

                            <CRadioButton
                                checked={universityData.status === "N"}
                                disabled={true}
                                readOnly={true}
                                id="radio2"
                                label="Inactive"
                                type="radio"
                            />
                        </Col>
                        {
                            universityData.remarks ?
                                <Col sm={12} md={6} lg={6}>
                                    <CHybridTextArea
                                        id="remarks"
                                        placeholder="Remarks"
                                        value={universityData.remarks || 'N/A'}
                                        disabled={true}
                                    />
                                </Col>
                                : ''
                        }
                    </Row>
                </Container-fluid>
            </CForm>
        </Container-fluid>
    </>;

    return <>
        <CModal
            modalHeading={"University Details"}
            size="xl"
            show={showPreviewModal}
            bodyChildren={detailContents}
            onHide={closeModal}
            centered={false}
            dialogClassName="preview-modal"
            closeButton={true}
        />
    </>

};

export default UniversityDetails;
