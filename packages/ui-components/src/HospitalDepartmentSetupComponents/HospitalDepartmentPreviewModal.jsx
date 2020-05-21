import React from 'react'
import {
    CButton,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect,
    CModal,
    CRadioButton
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import {AuditableEntityHoc} from "@frontend-appointment/commons"
import {EnvironmentVariableGetter} from "@frontend-appointment/helpers";

const HospitalDepartmentPreviewModal = ({departmentPreviewData}) => {
    const {
        departmentData,
        type,
        showPreviewModal,
        setShowModal,
        onConfirmClick,
        isSaveHospitalDepartmentLoading
    } = departmentPreviewData;
    const bodyContent = <>
        <Container-fluid>
            <CForm id="department-info" className="mt-2 add-info">
                <Container-fluid>
                    <Row>
                        <Col sm={12} md={12} lg={9}>
                            <Row>
                                {
                                    EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.ADMIN_MODULE_CODE ?
                                        <>
                                            <Col sm={12} md={6} lg={6}>
                                                <CHybridInput
                                                    id="hospital"
                                                    placeholder="Client"
                                                    name="hospital"
                                                    value={
                                                        departmentData.hospital && departmentData.hospital.label
                                                    }
                                                    disabled={true}
                                                />
                                            </Col>
                                            <Col sm={12} md={6} lg={6}> </Col>
                                        </> : ''
                                }

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="name"
                                        placeholder="Department Name"
                                        name="name"
                                        value={departmentData.name}
                                        disabled={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="code"
                                        placeholder="Department Code"
                                        name="code"
                                        value={departmentData.code}
                                        disabled={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="description"
                                        placeholder="Department Description"
                                        name="description"
                                        value={departmentData.description}
                                        disabled={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridSelect
                                        id="doctor"
                                        placeholder="Doctors"
                                        name="doctors"
                                        value={departmentData.doctors}
                                        disabled={true}
                                        isMulti={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridSelect
                                        id="rooms"
                                        placeholder="Rooms"
                                        name="rooms"
                                        value={departmentData.rooms}
                                        disabled={true}
                                        isMulti={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="appointmentCharge"
                                        placeholder="Appointment Charge"
                                        name="appointmentCharge"
                                        value={departmentData.appointmentCharge}
                                        disabled={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={6}>
                                    <CHybridInput
                                        id="followUpCharge"
                                        placeholder="Follow Up Charge"
                                        name="followUpCharge"
                                        value={departmentData.followUpCharge}
                                        disabled={true}
                                    />
                                </Col>

                                <Col sm={12} md={12} lg={4}>
                                    <CFLabel labelName="Status" id="status"/>
                                    <CRadioButton
                                        checked={departmentData.status === 'Y'}
                                        name="status"
                                        id="radio1"
                                        label="Active"
                                        type="radio"
                                        readOnly={true}
                                        disabled={true}
                                    />
                                    <CRadioButton
                                        checked={departmentData.status === 'N'}
                                        id="radio2"
                                        name="status"
                                        label="Inactive"
                                        type="radio"
                                        readOnly={true}
                                        disabled={true}
                                    />
                                </Col>
                            </Row>
                            {
                                type === "MANAGE" ?
                                    <Row className="mt-4">
                                        {/*  */}
                                        {AuditableEntityHoc(departmentData)}
                                    </Row>
                                    : ''
                            }

                        </Col>
                    </Row>
                </Container-fluid>
            </CForm>
        </Container-fluid>
    </>;

    const footerContent = <>
        <CButton
            variant="primary"
            size="lg"
            name={'Confirm'}
            className="float-right"
            isLoading={isSaveHospitalDepartmentLoading}
            disabled={isSaveHospitalDepartmentLoading}
            onClickHandler={onConfirmClick}
        />
    </>;
    return (
        <CModal
            show={showPreviewModal}
            modalHeading="Department Details"
            size="lg"
            bodyChildren={bodyContent}
            footerChildren={type === "ADD" ? footerContent : ''}
            onHide={setShowModal}
            centered={false}
            dialogClassName="preview-modal"
            closeButton={true}
        />
    )
};

export default HospitalDepartmentPreviewModal
