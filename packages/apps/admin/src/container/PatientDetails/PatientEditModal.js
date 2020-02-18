import React, {memo} from 'react'
import {
  CButton,
  CFLabel,
  CForm,
  CHybridInput,
  CModal,
  CRadioButton,
  CHybridTextArea,

} from '@frontend-appointment/ui-elements'
import {Col, Container, Row} from 'react-bootstrap'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components';

const PatientEditModal = ({
  showModal,
  setShowModal,
  patientData,
  // isPatientEditLoading,
  patientEditErrorMessage,
  errorMessageForMobileNumber,
  onInputChange,
  errorMessageForName,
  handleEnterPress,
  formValid,
  editApiCall
}) => {
  const bodyContent = (
    <>
      {/* <h5 className="title">Edit Hospital Setup</h5> */}
      <CForm id="patient-info" className="mt-2 add-info">
        <Row>
          {/* <Col sm={12} md={12} lg={9}>
            <Row> */}
              <Col sm={12} md={12} lg={6}>
                <CHybridInput
                  id="patient-name"
                  name="name"
                  type="text"
                  onKeyDown={event => handleEnterPress(event)}
                  onChange={(event, validity) =>
                    onInputChange(event, validity, 'E')
                  }
                  placeholder="Patient Name"
                  value={patientData.name}
                  required={true}
                  hasValidation={true}
                  fieldValuePattern={/^[A-Za-z0-9 ]+$/}
                  errorMessagePassed={errorMessageForName}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CFLabel labelName="Gender" id="gender"></CFLabel>
                <div>
                  <CRadioButton
                    checked={patientData.gender === 'M'}
                    onKeyDown={event => handleEnterPress(event)}
                    onChange={(event, validity) =>
                      onInputChange(event, validity, 'E')
                    }
                    name="gender"
                    id="radio1"
                    label="Male"
                    type="radio"
                    value="M"
                  />
                
                  <CRadioButton
                    checked={patientData.gender === 'F'}
                    onKeyDown={event => handleEnterPress(event)}
                    onChange={(event, validity) =>
                      onInputChange(event, validity, 'E')
                    }
                    name="gender"
                    id="radio2"
                    label="Female"
                    type="radio"
                    value="F"
                  />
                  <CRadioButton
                    checked={patientData.gender === 'O'}
                    onKeyDown={event => handleEnterPress(event)}
                    onChange={(event, validity) =>
                      onInputChange(event, validity, 'E')
                    }
                    name="gender"
                    id="radio3"
                    label="Other"
                    type="radio"
                    value="O"
                  />
                </div>
              </Col>
              <Col sm={12} md={6} xl={6}>
                  <div className="d-flex">
                      <CEnglishDatePicker
                        id="dateOfBirth"
                        name="dateOfBirth"
                        label="Date Of Birth"
                        dateFormat="yyyy-MM-dd"
                        maxDate={0}
                        showDisabledMonthNavigation={true}
                        peekNextMonth={true}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        dropdownMode="select"
                        selected={patientData.dateOfBirth}
                        onKeyDown={event => handleEnterPress(event)}
                        onChange={date =>
                          onInputChange(date,'','','dateOfBirth')
                        }
                      />
                      </div>
                   </Col>   
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="hospitalNumber"
                  name="hospitalNumber"
                  onKeyDown={event => handleEnterPress(event)}
                  onChange={(event, validity) =>
                    onInputChange(event, validity, 'E')
                  }
                  placeholder="Hospital Number"
                  value={patientData.hospitalNumber}
                  required={true}
                />
              </Col>
              
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="patient-email"
                  name="email"
                  onKeyDown={event => handleEnterPress(event)}
                  onChange={(event, validity) =>
                    onInputChange(event, validity, 'E')
                  }
                  placeholder="Patient Email"
                  value={patientData.email}
                  type="email"
                  required={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="mobileNumber"
                  name="mobileNumber"
                  onKeyDown={event => handleEnterPress(event)}
                  onChange={(event, validity) =>
                    onInputChange(event, validity, 'E')
                  }
                  placeholder="Patient Phone Number"
                  value={patientData.mobileNumber}
                  required={true}
                  hasValidation={true}
                  fieldValuePattern={/^\d{10}$/}
                  errorMessagePassed={errorMessageForMobileNumber}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="patient-address"
                  name="address"
                  onKeyDown={event => handleEnterPress(event)}
                  onChange={(event, validity) =>
                    onInputChange(event, validity, 'E')
                  }
                  placeholder="Patient Address"
                  value={patientData.address}
                  type="text"
                  required={true}
                />
              </Col>
              <Col sm={12} md={12} lg={6}>
                <CFLabel labelName="Status" id="status"></CFLabel>
                <CRadioButton
                  checked={patientData.status === 'Y'}
                  onKeyDown={event => handleEnterPress(event)}
                  onChange={(event, validity) =>
                    onInputChange(event, validity, 'E')
                  }
                  id="radio1"
                  label="Active"
                  type="radio"
                  name="status"
                  value="Y"
                />
                <CRadioButton
                  checked={patientData.status === 'N'}
                  onKeyDown={event => handleEnterPress(event)}
                  id="radio2"
                  label="Inactive"
                  type="radio"
                  name="status"
                  value="N"
                  onChange={event => onInputChange(event, '', 'E')}
                />
              </Col>

              <Col sm={12} md={12} lg={6}>
                <CHybridTextArea
                  id="remarks"
                  name="remarks"
                  onKeyDown={event => handleEnterPress(event)}
                  onChange={(event, validity) =>
                    onInputChange(event, validity, 'E')
                  }
                  placeholder="Remarks"
                  value={patientData.remarks}
                  max={200}
                  required={true}
                />
              </Col>
            {/* </Row>
          </Col> */}
        </Row>
      </CForm>
    </>
  )
  let footerChildren = (
    <>
      <Container fluid="true">
        <Row>
          <div className="col-md-6">
            {patientEditErrorMessage ? (
              <p className="modal-error">
                <i class="fa fa-exclamation-triangle" /> &nbsp;{' '}
                {patientEditErrorMessage}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="col-md-6">
            <CButton
              id="submit-update-button"
              disabled={!formValid}
              name="Update"
              variant="primary"
              size="lg"
              className="btn-action  float-right"
              onClickHandler={editApiCall}
            />
            <CButton
              id="cancel-update-profile"
              variant="light"
              size="lg"
              className="btn-action  float-right mr-2"
              name="Cancel"
              onClickHandler={setShowModal}
            />
          </div>
        </Row>
      </Container>
    </>
  )
  return (
    <>
      <CModal
        show={showModal}
        modalHeading="Patient Details"
        size="lg"
        bodyChildren={bodyContent}
        onHide={setShowModal}
        centered={false}
        dialogClassName="preview-modal"
        footerChildren={footerChildren}
        closeButton={true}
      />
    </>
  )
}

export default memo(PatientEditModal)
