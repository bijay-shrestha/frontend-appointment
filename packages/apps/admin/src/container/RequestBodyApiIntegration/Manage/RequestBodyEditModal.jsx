import React, {memo} from 'react'
import {CButton, CForm, CHybridSelect, CHybridTextArea, CModal} from '@frontend-appointment/ui-elements'
import {Col, Container, Row} from 'react-bootstrap'

const DepartmentEditModal = ({
    formValid,
    editRequestBodyErrorMessage,
    isEditRequestBodyIntegrationLoading,
    showEditModal,
    editHandler,
    handleOnChange,
    featureTypeDropdownData,
    requestBodyDropdownData,
    requestBodyData,
    onEnterKeyPress,
    setShowModal
}) => {
  const bodyContent = (
    <>
      <CForm id="profile-info spec" className="mt-2 profile-info">
        <Container-fluid>
          <Row>
            <Col sm={12} md={5} lg={5}>
              <CHybridSelect
                id="featureTypeId"
                label="Feature Type"
                name="featureTypeId"
                onKeyDown={onEnterKeyPress}
                onChange={(event) => handleOnChange(event,'E')}
                isDisabled={!featureTypeDropdownData.length}
                options={featureTypeDropdownData}
                value={requestBodyData.featureTypeId}
                placeholder={
                  featureTypeDropdownData.length
                    ? 'Select Feature.'
                    : 'No Feature Type(s) Found'
                }
              />
            </Col>

            <Col sm={12} md={7} lg={7} className="mb-3">
              <CHybridSelect
                id="requestBodysId"
                label="Request Body"
                name="requestBodys"
                onKeyDown={onEnterKeyPress}
                onChange={(event) => handleOnChange(event,'E')}
                options={requestBodyDropdownData}
                isDisabled={!requestBodyDropdownData.length}
                value={requestBodyData.requestBodys}
                isMulti={true}
                placeholder={
                  requestBodyDropdownData.length
                    ? 'Select Request Body'
                    : 'No Request Body(ies) Found'
                }
              />
            </Col>
            <Col sm={12} md={12} lg={12}>
              <CHybridTextArea
                id="remarks"
                placeholder="Remarks"
                name="remarks"
                onKeyDown={onEnterKeyPress}
                onChange={(event) => handleOnChange(event,'E')}
                value={requestBodyData.remarks}
              />
            </Col>
          </Row>
        </Container-fluid>
      </CForm>
    </>
  )
  let footerChildren = (
    <>
      <Container fluid="true">
        <Row>
          <div className="col-md-6">
            {editRequestBodyErrorMessage ? (
              <p className="modal-error">
                <i class="fa fa-exclamation-triangle" /> &nbsp; {editRequestBodyErrorMessage}
              </p>
            ) : (
              ''
            )}
          </div>
          <div className="col-md-6">
            <CButton
              id="submit-update-button"
              disabled={!formValid}
              isLoading={isEditRequestBodyIntegrationLoading}
              name="Update"
              size="lg"
              className="btn-action  float-right"
              onClickHandler={editHandler}
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
        show={showEditModal}
        modalHeading="Request Body Details"
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
