import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {
    CFLabel,
    CForm,
    CHybridInput,
    CRadioButton,
    CHybridSelect
} from '@frontend-appointment/ui-elements'

const QualificationForm = ({
                               qualificationInfoObj,
                               errorMessageForQualificationName,
                               onEnterKeyPress,
                               onInputChange,
                               qualificationsAliasForDropdown,
                               universitiesDropdown
                           }) => {
    return (
        <>
            <Container-fluid>
                <Row sm="12 p-0">
                    <h5 className="title">Qualification Info</h5>
                </Row>
                <CForm id="profile-info" className="mt-2">
                    <Container-fluid>
                        <Row>

                            <Col sm={12} md={4} xl={4}>
                                <CHybridSelect
                                    id="universityId"
                                    name="universityId"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={event => onInputChange(event)}
                                    value={qualificationInfoObj.universityId}
                                    options={universitiesDropdown}
                                    label="University"
                                    placeholder={universitiesDropdown.length ? "Select University" : "No University available."}
                                    isDisabled={!universitiesDropdown.length}
                                />
                            </Col>

                            <Col sm={12} md={4} lg={4}>
                                <CHybridInput
                                    id="qualification-name"
                                    name="name"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={(event, validity) => onInputChange(event, validity)}
                                    placeholder="Qualification Name"
                                    value={qualificationInfoObj.name}
                                    required={true}
                                    hasValidation={true}
                                    fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                                    errorMessagePassed={errorMessageForQualificationName}
                                />
                            </Col>

                            <Col sm={12} md={4} xl={4}>
                                <CHybridSelect
                                    id="qualificationAliasId"
                                    name="qualificationAliasId"
                                    onKeyDown={event => onEnterKeyPress(event)}
                                    onChange={event => onInputChange(event)}
                                    value={qualificationInfoObj.qualificationAliasId}
                                    options={qualificationsAliasForDropdown}
                                    label="Qualification alias"
                                    placeholder={qualificationsAliasForDropdown.length ? "Select Qualification Alias." : "No Qualification Alias available."}
                                    isDisabled={!qualificationsAliasForDropdown.length}
                                />
                            </Col>

                            <Col sm={12} md={4} lg={4}>
                                <CFLabel labelName="Status" id="status"></CFLabel>
                                <div>
                                    <CRadioButton
                                        checked={Boolean(qualificationInfoObj.status)}
                                        disabled={true}
                                        id="radio1"
                                        label="Active"
                                        type="radio"
                                        readOnly
                                    />
                                </div>
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default memo(QualificationForm)
