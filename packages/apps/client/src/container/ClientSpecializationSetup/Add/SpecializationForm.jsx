import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {CFLabel, CForm, CHybridInput, CRadioButton} from '@frontend-appointment/ui-elements'

const SpecializationForm = ({
                                specializationInfoObj,
                                errorMessageForSpecializationName,
                                errorMessageForSpecializationCode,
                                onEnterKeyPress,
                                onInputChange,
                            }) => {
    return (
        <>
            <Container-fluid>
                <Row sm="12 p-0">
                    <h5 className="title">Specialization Information</h5>
                </Row>
                <CForm id="profile-info" className="mt-2 profile-info specialization-form">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={6} lg={4}>
                                <CHybridInput
                                    id="specialization-name"
                                    name="name"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Specialization Name"
                                    value={specializationInfoObj.name}
                                    required={true}
                                    // hasValidation={true}
                                    // fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    // errorMessagePassed={errorMessageForSpecializationName}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={4}>
                                <CHybridInput
                                    id="sub-department-code"
                                    name="code"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Specialization Code"
                                    value={specializationInfoObj.code}
                                    required={true}
                                    errorMessagePassed={errorMessageForSpecializationCode}
                                />
                            </Col>

                            <Col sm={12} md={6} lg={4}>
                                <CFLabel labelName="Status" id="status"></CFLabel>
                                <div>
                                    <CRadioButton
                                        checked={Boolean(specializationInfoObj.status)}
                                        disabled={true}
                                        id="radio1"
                                        label="Active"
                                        type="radio"
                                        readOnly
                                    />
                                    {/* <CRadioButton
                  checked={!Boolean(specializationInfoObj.status)}
                  disabled={true}
                  readOnly={true}
                  id="radio2"
                  label="Inactive"
                  type="radio"
                /> */}
                                </div>
                            </Col>

                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
};

export default memo(SpecializationForm);
