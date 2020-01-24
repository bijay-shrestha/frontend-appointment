import React,{memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CRadioButton
} from '@frontend-appointment/ui-elements'

const HospitalForm = ({
  hospitalInfoObj,
  errorMessageForHospitalName,
  errorMessageForHospitalCode,
  onEnterKeyPress,
  onInputChange
}) => {
  return (
    <>
     <Container-fluid>
      <Row sm="12 p-0">
        <h5 className="title">Hospital Info</h5>
      </Row>
        <CForm id="profile-info" className="mt-2 profile-info">
        <Container-fluid>
          <Row>
            <Col sm={12} md={4} lg={4}>
              <CHybridInput
                id="hospital-name"
                name="name"
                onKeyDown={event => onEnterKeyPress(event)}
                onChange={(event, validity) => onInputChange(event, validity)}
                placeholder="Sub Department Name"
                value={hospitalInfoObj.name}
                required={true}
                hasValidation={true}
                fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                errorMessagePassed={errorMessageForHospitalName}
              />
            </Col>

            <Col sm={12} md={4} lg={4}>
              <CHybridInput
                id="hospital-code"
                name="code"
                onKeyDown={event => onEnterKeyPress(event)}
                onChange={(event, validity) => onInputChange(event, validity)}
                placeholder="Hospital Code"
                value={hospitalInfoObj.code}
                required={true}
                errorMessagePassed={errorMessageForHospitalCode}
              />
            </Col>
            <Col sm={12} md={4} lg={4}>
              <CHybridInput
                id="hospital-code"
                name="code"
                onKeyDown={event => onEnterKeyPress(event)}
                onChange={(event, validity) => onInputChange(event, validity)}
                placeholder="Hospital Code"
                value={hospitalInfoObj.code}
                required={true}
                errorMessagePassed={errorMessageForHospitalCode}
              />
            </Col>
            <Col sm={12} md={4} lg={4}>
              <CFLabel labelName="Status" id="status"></CFLabel>
            
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
              </Col>
          </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default memo(HospitalForm);