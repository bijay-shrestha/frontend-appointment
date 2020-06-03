import React from 'react'
import RequestBodyForm from './RequestBodyForm'
import RequestBodyConfirmationModal from './RequestBodyConfirmationModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CButton} from '@frontend-appointment/ui-elements'
import RequestBodyApiIntegrationHOC from '../RequestBodyApiIntegrationHOC'

function RequestBodyAddHoc (props) {
  const RequestBodyAdd = RequestBodyApiIntegrationHOC(
    ({commonHandler, addHandler}) => (
      <div className="">
        <Container className="bg-white add-container " fluid>
          <CButton
            id="resetProfileForm"
            variant="outline-secondary"
            size="sm"
            name=""
            className="mb-2  float-right"
            onClickHandler={commonHandler.resetRequestBodyData}
          >
            <>
              <i className="fa fa-refresh" /> &nbsp;Reset
            </>
          </CButton>
          <RequestBodyForm {...commonHandler} {...addHandler} />

          <Row className="mt-4">
            <Col sm={12} md={{span: 3, offset: 9}}>
              <CButton
                id="save-profile-add"
                variant="primary "
                className="float-right btn-action"
                name="Save"
                disabled={!commonHandler.formValid}
                isLoading={addHandler.isrequestBodyApiSaveLoading}
                onClickHandler={commonHandler.setShowConfirmModal}
              />
              <RequestBodyConfirmationModal
                showModal={addHandler.showConfirmModal}
                setShowModal={commonHandler.setShowConfirmModal}
                onConfirmClick={addHandler.handleConfirmClick}
                requestBodyData={commonHandler.requestBodyData}
                isLoading={addHandler.isrequestBodyApiSaveLoading}
                type="A"
              />
            </Col>
          </Row>
        </Container>
      </div>
    ),
    props,
    'A'
  )
  return <RequestBodyAdd />
}

// return <SpecializationAdd></SpecializationAdd>

export default RequestBodyAddHoc
