import React from 'react'
import {
    CButton,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect, CHybridTextArea,
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
        closeModal,
        onConfirmClick,
        isSaveHospitalDepartmentLoading
    } = departmentPreviewData;
    let departmentChargeSchemes;
    if (type === "MANAGE") {
        const {billingModeChargeResponseList} = departmentData;
        departmentChargeSchemes = billingModeChargeResponseList.map(billMode => ({
            ...billMode,
            billingMode: {label: billMode.billingMode, value: billMode.id},
        }))
    } else {
        departmentChargeSchemes = departmentData.departmentChargeSchemes
    }
    const bodyContent = <>
        <Container-fluid>
            <CForm id="department-info" className="mt-2 add-info">
                <Container-fluid>

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
                                                departmentData.hospital ? departmentData.hospital.label :
                                                    departmentData.hospitalName
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
                            <CHybridTextArea
                                id="description"
                                placeholder="Department Description"
                                name="description"
                                value={departmentData.description}
                                disabled={true}
                            />
                        </Col>

                        <Col sm={12} md={12} lg={6}>
                            <CHybridSelect
                                label="Doctors"
                                id="doctor"
                                placeholder="Doctors"
                                name="doctorList"
                                value={departmentData.doctorList}
                                isDisabled={true}
                                isMulti={true}
                                className="multiple-select"
                            />
                        </Col>

                        <Col sm={12} md={12} lg={6}>
                            {
                                departmentData.roomList && departmentData.roomList.length ?
                                    <CHybridSelect
                                        id="rooms"
                                        label="Rooms"
                                        placeholder="Rooms"
                                        name="roomList"
                                        value={departmentData.roomList}
                                        isDisabled={true}
                                        isMulti={true}
                                        className="multiple-select"
                                    /> :
                                    <CHybridInput
                                        id="room"
                                        placeholder={"Rooms"}
                                        name="room"
                                        value={"N/A"}
                                        disabled={true}
                                        className="multiple-select"
                                    />
                            }
                        </Col>

                        <Row>
                            Billing Mode And Charge
                        </Row>
                        {
                            departmentChargeSchemes && departmentChargeSchemes.map(deptCharge => (
                                <Row>
                                    <Col>
                                        <CHybridSelect
                                            id="billing-mode"
                                            name="billingMode"
                                            label="Billing Mode"
                                            value={deptCharge.billingMode}
                                            required={true}
                                            placeholder={"Select Billing Mode."}
                                            isDisabled={true}
                                        />
                                    </Col>
                                    <Col>
                                        <CHybridInput
                                            id="appointment-charge"
                                            name="appointmentCharge"
                                            placeholder="Appointment Charge"
                                            value={deptCharge.appointmentCharge}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col>
                                        <CHybridInput
                                            id="appointment-follow-up-charge"
                                            name="followUpCharge"
                                            placeholder="Follow Up Charge"
                                            value={deptCharge.followUpCharge}
                                            disabled={true}
                                        />
                                    </Col>
                                </Row>
                            ))
                        }

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

                        {
                            type === "MANAGE" ?
                                <Col sm={12} md={12} lg={6}>
                                    <CHybridTextArea
                                        id="department-remarks"
                                        name="remark"
                                        placeholder="Remarks"
                                        value={departmentData.remarks || 'N/A'}
                                        required={true}
                                        disabled={true}
                                    />
                                </Col>
                                : ''
                        }
                    </Row>
                    {
                        type === "MANAGE" ?
                            <Row className="mt-4">
                                {/*  */}
                                {AuditableEntityHoc(departmentData)}
                            </Row>
                            : ''
                    }


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
            onHide={closeModal}
            centered={false}
            dialogClassName="preview-modal"
            closeButton={true}
        />
    )
};

export default HospitalDepartmentPreviewModal
