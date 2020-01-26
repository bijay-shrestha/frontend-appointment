import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CRadioButton,
  CButton
} from '@frontend-appointment/ui-elements'

const HospitalForm = ({
  hospitalInfoObj,
  errorMessageForHospitalName,
  errorMessageForHospitalCode,
  onEnterKeyPress,
  onInputChange,
  addContactNumber,
  removeContactNumber,
  editContactNumber,
  contactLength
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
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="hospital-name"
                  name="name"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={(event, validity) => onInputChange(event, validity)}
                  placeholder="Hospital Name"
                  value={hospitalInfoObj.name}
                  required={true}
                  hasValidation={true}
                  fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                  errorMessagePassed={errorMessageForHospitalName}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="hospital-code"
                  name="hospitalCode"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={(event, validity) => onInputChange(event, validity)}
                  placeholder="Hospital Code"
                  value={hospitalInfoObj.hospitalCode}
                  required={true}
                  errorMessagePassed={errorMessageForHospitalCode}
                />
              </Col>

              <Col sm={12} md={8} lg={8}>
                {contactLength != hospitalInfoObj.contactNumber.length && (
                  <CButton
                    id={'add-contact-numbers'}
                    variant="outline-primary"
                    onClickHandler={() => addContactNumber('contactNumber', '')}
                    name="Add"
                  />
                )}
                {hospitalInfoObj.contactNumber.map((contNumber, idx) => {
                  return (
                    <Container-fluid key={'contactForm' + idx}>
                    <Row>
                    
                      <CHybridInput
                        key={'contactInput' + idx}
                        id={'contactInput' + idx}
                        id="contactNumber"
                        name="contactNumber"
                        onKeyDown={event => onEnterKeyPress(event)}
                        onChange={e =>
                          editContactNumber(
                            'contactNumber',
                            e.target.value,
                            idx
                          )
                        }
                        placeholder="Contact Number"
                        value={contNumber}
                        required={true}
                        errorMessagePassed={errorMessageForHospitalCode}
                      />
                      <CButton
                        key={'removecontact' + idx}
                        id={'removecontact' + idx}
                        variant="outline-danger"
                        onClickHandler={() =>
                          removeContactNumber('contactNumber', idx)
                        }
                        name="Remove"
                        size="sm"
                      ></CButton>
                    </Row>
                    </Container-fluid>
                  )
                })}
              </Col>

              <Col sm={12} md={4} lg={4}>
                <CFLabel labelName="Status" id="status"></CFLabel>
                <CRadioButton
                  checked={Boolean(hospitalInfoObj.status)}
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

export default memo(HospitalForm)
