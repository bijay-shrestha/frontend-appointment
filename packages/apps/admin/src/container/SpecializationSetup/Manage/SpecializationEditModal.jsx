import React, {memo} from 'react'
import {
  CButton,
  CFLabel,
  CForm,
  CHybridInput,
  CModal,
  CRadioButton,
  CHybridTextArea
} from '@frontend-appointment/ui-elements'
import {Col, Container, Row} from 'react-bootstrap'

const DepartmentEditModal = ({
  showModal,
  setShowModal,
  onEnterKeyPress,
  onInputChange,
  specializationData,
  errorMessageForSpecializationName,
  errorMessageForSpecializationCode,
  errorMessage,
  editApiCall,
  formValid
}) => {
  const bodyContent = (
    <>
      {console.log('Edit', specializationData)}
      <CForm id="specialization-info" className="mt-2">
        <Row>
          <Col sm={12} md={12} lg={4}>
            <CHybridInput
              id="specialization-name"
              name="name"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={(event, validity) =>
                onInputChange(event, validity, 'E')
              }
              placeholder="Specialization Name"
              value={specializationData.name}
              required={true}
              hasValidation={true}
              fieldValuePattern={/^[A-Za-z0-9 ]+$/}
              errorMessagePassed={errorMessageForSpecializationName}
            />
          </Col>
          <Col sm={12} md={12} lg={4}>
            <CHybridInput
              id="Specialization Code"
              name="code"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={(event, validity) =>
                onInputChange(event, validity, 'E')
              }
              placeholder="Specialization Code"
              value={specializationData.code}
              required={true}
              // hasValidation={true}
              // fieldValuePattern={/^[A-Za-z0-9 ]+$/}
              errorMessagePassed={errorMessageForSpecializationCode}
            />
          </Col>

          <Col sm={12} md={12} lg={4}>
            <CFLabel labelName="Status" id="status"></CFLabel>
            <CRadioButton
              checked={specializationData.status === 'Y'}
              name="status"
              id="radio1"
              label="Active"
              type="radio"
              value="Y"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={event => onInputChange(event, 'E')}
            />
            <CRadioButton
              checked={specializationData.status === 'N'}
              id="radio2"
              name="status"
              label="Inactive"
              type="radio"
              value="N"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={event => onInputChange(event, 'E')}
            />
          </Col>
          <Col sm={12} md={12} lg={4}>
            <CHybridTextArea
              id="Specialization Remarks"
              name="remarks"
              //onKeyDown={event => onEnterKeyPress(event)}
              onChange={(event, validity) => onInputChange(event, validity)}
              placeholder="Specialization Remarks"
              value={specializationData.remarks}
              required={true}
              // hasValidation={true}
              // fieldValuePattern={/^[A-Za-z0-9 ]+$/}
            />
          </Col>
        </Row>
      </CForm>
    </>
  )
  let footerChildren = (
    <>
      <Container fluid="true">
        <Row>
          <div className="col-md-6">
            {errorMessage ? (
              <p className="modal-error">
                <i class="fa fa-exclamation-triangle" /> &nbsp; {errorMessage}
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
        modalHeading="Specialization Details"
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

export default memo(DepartmentEditModal)
