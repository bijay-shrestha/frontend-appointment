import React, {memo} from 'react'
import {
  CButton,
  CFLabel,
  CForm,
  CHybridInput,
  CModal,
  CRadioButton,
  CHybridSelect,
  CHybridTextArea
} from '@cogent/ui-elements'
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
  departmentList
}) => {
  const bodyContent = (
    <>
      <CForm id="specialization-info" className="mt-2">
        <Row>
          <Col sm={12} md={12} lg={4}>
            <CHybridInput
              id="specialization-name"
              name="name"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={(event, validity) => onInputChange(event, validity)}
              placeholder="Specialization Name"
              value={specializationData.name}
              required={true}
              hasValidation={true}
              fieldValuePattern={/^[A-Za-z0-9 ]+$/}
              errorMessagePassed={errorMessageForDepartmentName}
            />
          </Col>
          <Col sm={12} md={12} lg={4}>
            <CHybridInput
              id="Specialization Code"
              name="code"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={(event, validity) => onInputChange(event, validity)}
              placeholder="Specialization Code"
              value={specializationData.code}
              required={true}
              // hasValidation={true}
              // fieldValuePattern={/^[A-Za-z0-9 ]+$/}
              errorMessagePassed={errorMessageForDepartmentCode}
            />
          </Col>
          <Col sm={12} md={4} lg={4}>
            <CHybridSelect
              id="department"
              label="Department"
              name="departmentId"
              onChange={event => onInputChange(event)}
              onKeyDown={event => onEnterKeyPress(event)}
              options={departmentList}
              value={departmentData.departmentId}
              required={true}
              placeholder={'Select Department'}
            />
          </Col>
      
          <Col sm={12} md={12} lg={4}>
            <CFLabel labelName="Status" id="status"></CFLabel>
            <CRadioButton
              checked={departmentData.status === 'Y'}
              name="status"
              id="radio1"
              label="Active"
              type="radio"
              value="Y"
              onChange={event => onInputChange(event)}
            />
            <CRadioButton
              checked={departmentData.status === 'N'}
              id="radio2"
              name="status"
              label="Inactive"
              type="radio"
              value="N"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={event => onInputChange(event)}
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
              disabled={!departmentData.formValid}
              name="Update Department"
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
        modalHeading="Department Details"
        size="lg"
        bodyChildren={bodyContent}
        onHide={setShowModal}
        centered={false}
        dialogClassName="preview-roles-modal"
        footerChildren={footerChildren}
        closeButton={true}
      />
    </>
  )
}

export default memo(DepartmentEditModal)
