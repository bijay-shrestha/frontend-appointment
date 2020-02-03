import React, {memo} from 'react'
import {
  CButton,
  CFLabel,
  CForm,
  CHybridInput,
  CModal,
  CRadioButton,
  CHybridTextArea,
  CHybridSelect
} from '@frontend-appointment/ui-elements'
import {Col, Container, Row} from 'react-bootstrap'

const DepartmentEditModal = ({
  showModal,
  setShowModal,
  onEnterKeyPress,
  onInputChange,
  qualificationData,
  errorMessageForQualificationName,
  errorMessage,
  editApiCall,
  formValid,
  qualificationsAliasForDropdown,
  universitiesDropdown
}) => {
  const bodyContent = (
    <>
      <CForm id="qualification-info" className="mt-2">
        <Row>
          <Col sm={12} md={12} lg={4}>
            <CHybridInput
              id="qualification-name"
              name="name"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={(event, validity) =>
                onInputChange(event, validity, 'E')
              }
              placeholder="Qualification Name"
              value={qualificationData.name}
              required={true}
              hasValidation={true}
              fieldValuePattern={/^[A-Za-z0-9 ]+$/}
              errorMessagePassed={errorMessageForQualificationName}
            />
          </Col>
          <Col sm={12} md={12} lg={4}>
            <CHybridSelect
              id="Qualificaiton Alias"
              name="qualificationAliasId"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={(event) =>
                onInputChange(event, '', 'E')
              }
              placeholder="Select a Qualification Alias"
              options={qualificationsAliasForDropdown}
              value={qualificationData.qualificationAliasId}
              required={true}
            />
          </Col>

          <Col sm={12} md={12} lg={4}>
            <CHybridSelect
              id="University Id"
              name="universityId"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={(event) =>
                onInputChange(event, '', 'E')
              }
              placeholder="Select a University Id"
              value={qualificationData.universityId}
              options={universitiesDropdown}
              required={true}
            />
          </Col>

          <Col sm={12} md={12} lg={4}>
            <CFLabel labelName="Status" id="status"></CFLabel>
            <CRadioButton
              checked={qualificationData.status === 'Y'}
              name="status"
              id="radio1"
              label="Active"
              type="radio"
              value="Y"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={event => onInputChange(event, '','E')}
            />
            <CRadioButton
              checked={qualificationData.status === 'N'}
              id="radio2"
              name="status"
              label="Inactive"
              type="radio"
              value="N"
              onKeyDown={event => onEnterKeyPress(event)}
              onChange={event => onInputChange(event, '','E')}
            />
          </Col>
          <Col sm={12} md={12} lg={4}>
            <CHybridTextArea
              id="Remarks"
              name="remarks"
              onChange={(event) => onInputChange(event,'E')}
              placeholder="Qualification Remarks"
              value={qualificationData.remarks}
              required={true}
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
        modalHeading="Qualification Details"
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
