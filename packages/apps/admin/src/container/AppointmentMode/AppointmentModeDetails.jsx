import React from 'react';
import {
    CFLabel,
    CForm,
    CHybridInput,
    CHybridTextArea,
    CModal,
    CRadioButton,
    CToggle
} from "@frontend-appointment/ui-elements";
import {Col, Row} from "react-bootstrap";
import {AuditableEntityHoc} from "@frontend-appointment/commons"
const AppointmentModeDetails = ({closeModal, appointmentModeData, showPreviewModal}) => {
    const detailContents = <>
        <Container-fluid>
            <CForm id="refund-info" className="mt-2">
                <Container-fluid>
                    <Row>
                        <Col sm={12} md={6} lg={6}>
                            <CHybridInput
                                id="name"
                                placeholder="Appointment Mode Name"
                                value={appointmentModeData.name || 'N/A'}
                                disabled={true}
                            />
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <CHybridInput
                                id="code"
                                placeholder="Code"
                                value={appointmentModeData.code || 'N/A'}
                                disabled={true}
                            />
                        </Col>
                        <Col sm={12} md={6} lg={6}>
                            <CHybridTextArea
                                id="description"
                                placeholder="Description"
                                value={appointmentModeData.description || 'N/A'}
                                disabled={true}
                            />
                        </Col>

                        <Col sm={12} md={6} lg={6}>
                            <CToggle
                                onLabel={"Yes"}
                                offLabel={"No"}
                                checked={appointmentModeData.isEditable}
                                disabled={true}
                            />
                        </Col>
                        {AuditableEntityHoc(appointmentModeData)}

                        <Col sm="12" md="6">
                            <CFLabel labelName="Status" id="status"/>
                            <CRadioButton
                                checked={appointmentModeData.status === "Y"}
                                disabled={true}
                                readOnly={true}
                                id="radio1"
                                label="Active"
                                type="radio"
                            />

                            <CRadioButton
                                checked={appointmentModeData.status === "N"}
                                disabled={true}
                                readOnly={true}
                                id="radio2"
                                label="Inactive"
                                type="radio"
                            />
                        </Col>
                        {
                            appointmentModeData.remarks ?
                                <Col sm={12} md={6} lg={6}>
                                    <CHybridTextArea
                                        id="remarks"
                                        placeholder="Remarks"
                                        value={appointmentModeData.remarks || 'N/A'}
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
            modalHeading={"Appointment Mode Details"}
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

export default AppointmentModeDetails;
