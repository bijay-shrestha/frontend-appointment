import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CFLabel, CForm, CHybridInput, CHybridSelect, CRadioButton} from "@frontend-appointment/ui-elements";

const UnitInfoForm = ({
                                departmentInfoObj,
                                errorMessageForDepartmentName,
                                errorMessageForDepartmentCode,
                                onEnterKeyPress,
                                onInputChange,
                                hospitalList
                            }) => {
    return (
        <>
            <Col sm="6 p-0"><h5 className="title">Unit Information</h5></Col>
            <Col sm="12" className="p-0">

                <CForm
                    id="profile-info"
                    className="mt-2 add-info">
                    <Row>
                        <Col sm={12} md={4} lg={4}>
                            <CHybridSelect
                                id="hospital"
                                label="Client"
                                name="hospital"
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event) => onInputChange(event)}
                                options={hospitalList}
                                value={departmentInfoObj.hospital}
                                isDisabled={!hospitalList.length}
                                placeholder={hospitalList.length ? "Select Client." : "No Client(s) available."}
                            />
                        </Col>
                        <Col sm={12} md={4} lg={4}>
                            <CHybridInput
                                id="department-name"
                                name="name"
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event, validity) => onInputChange(event, validity)}
                                placeholder="Unit Name"
                                value={departmentInfoObj.name}
                                required={true}
                                hasValidation={true}
                                fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                errorMessagePassed={errorMessageForDepartmentName}
                            />
                        </Col>

                        <Col sm={12} md={4} lg={4}>
                            <CHybridInput
                                id="department-code"
                                name="code"
                                onKeyDown={(event) => onEnterKeyPress(event)}
                                onChange={(event, validity) => onInputChange(event, validity)}
                                placeholder="Unit Code"
                                value={departmentInfoObj.code}
                                required={true}
                                // hasValidation={true}
                                // fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                errorMessagePassed={errorMessageForDepartmentCode}
                            />

                        </Col>

                        <Col sm={12} md={4} lg={4}>
                            <CFLabel labelName="Status" id="status"/>
                            <div>
                                <CRadioButton
                                    checked={Boolean(departmentInfoObj.status)}
                                    disabled={true}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    readOnly
                                />
                                <CRadioButton
                                    checked={Boolean(!departmentInfoObj.status)}
                                    disabled={true}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    className="sr-only"
                                    readOnly
                                />
                            </div>
                        </Col>
                    </Row>
                </CForm>

            </Col>
        </>
    );
};

export default UnitInfoForm;
