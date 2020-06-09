import React, {memo} from 'react';
import {
    CButton,
    CFLabel,
    CForm,
    CHybridInput,
    CHybridSelect, CHybridTextArea,
    CModal,
    CRadioButton
} from "@frontend-appointment/ui-elements";
import {Col, Container, Row} from "react-bootstrap";

const UnitEditModal = ({
                                 showModal,
                                 setShowModal,
                                 onEnterKeyPress,
                                 onInputChange,
                                 departmentData,
                                 errorMessageForDepartmentName,
                                 errorMessageForDepartmentCode,
                                 errorMessage,
                                 editApiCall,
                                 hospitalList,
                                 isDepartmentEditLoading
                             }) => {

    const bodyContent = <>
        <CForm
            id="department-info"
            className="mt-2">
            <Row>
                <Col sm={12} md={6}>
                    <CHybridSelect
                        id="hospital"
                        label="Client"
                        name="hospital"
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event) => onInputChange(event)}
                        options={hospitalList}
                        value={departmentData.hospital}
                        placeholder="Select Client."
                        isDisabled={true}
                    />
                </Col>
                <Col sm={12} md={6}>
                    <CHybridInput
                        id="department-name"
                        name="name"
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event, validity) => onInputChange(event, validity)}
                        placeholder="Unit Name"
                        value={departmentData.name}
                        required={true}
                        hasValidation={true}
                        fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                        errorMessagePassed={errorMessageForDepartmentName}
                    />
                </Col>
                <Col sm={12} md={6}>
                    <CHybridInput
                        id="department-code"
                        name="code"
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event, validity) => onInputChange(event, validity)}
                        placeholder="Unit Code"
                        value={departmentData.code}
                        required={true}
                        disabled={true}
                        // hasValidation={true}
                        // fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                        errorMessagePassed={errorMessageForDepartmentCode}
                    />
                </Col>
                <Col sm={12} md={6}>

                    <CFLabel labelName="Status" id="status"/>
                    <CRadioButton
                        checked={departmentData.status === "Y"}
                        name="status"
                        disabled={true}
                        id="radio1"
                        label="Active"
                        type="radio"
                        value="Y"
                        onChange={(event) => onInputChange(event)}
                    />
                    <CRadioButton
                        checked={departmentData.status === "N"}
                        disabled={true}
                        id="radio2"
                        name="status"
                        label="Inactive"
                        type="radio"
                        value="N"
                        onChange={(event) => onInputChange(event)}
                    />
                </Col>

                <Col sm={12} md={6}>
                    <CHybridTextArea
                        id="department-remarks"
                        name="remarks"
                        onKeyDown={(event) => onEnterKeyPress(event)}
                        onChange={(event, validity) => onInputChange(event, validity)}
                        placeholder="Remarks"
                        value={departmentData.remarks}
                        max={200}
                        required={true}
                    />
                </Col>
            </Row>
        </CForm>


    </>;
    let footerChildren = <>
        <Container fluid="true">
            <Row>
                <div className="col-md-6">
                    {errorMessage ?
                        <p className="modal-error"><i class="fa fa-exclamation-triangle"/> &nbsp;  {errorMessage}
                        </p> : ''}
                </div>
                <div className="col-md-6">
                    <CButton
                        id="submit-update-button"
                        disabled={!departmentData.formValid || isDepartmentEditLoading}
                        isLoading={isDepartmentEditLoading}
                        name="Update"
                        size="lg"
                        className="btn-action  float-right"
                        onClickHandler={editApiCall}/>
                    <CButton id="cancel-update-profile"
                             variant="light"
                             size="lg"
                             className="btn-action  float-right mr-2"
                             name="Cancel"
                             disabled={isDepartmentEditLoading}
                             onClickHandler={setShowModal}
                    />

                </div>
            </Row>
        </Container>

    </>;
    return <>
        <CModal show={showModal}
                modalHeading="Unit Details"
                size="lg"
                bodyChildren={bodyContent}
                onHide={setShowModal}
                centered={true}
                dialogClassName="preview-modal"
                footerChildren={footerChildren}
                closeButton={true}
        />
    </>;
};

export default memo(UnitEditModal);
