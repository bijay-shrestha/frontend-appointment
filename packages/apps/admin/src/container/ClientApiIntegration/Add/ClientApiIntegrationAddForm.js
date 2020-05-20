import React from 'react'
import ClientApiIntegrationForm from './ClientApiIntegrationForm'
import ClientApiConfirmationModal from './ClientApiConfirmationModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CButton} from '@frontend-appointment/ui-elements'
import ClientApiIntegrationHoc from '../ClientApiIntegrationHoc'

function ClientApiIntegarationAdd (props) {
  const ClientApiIntegration = ClientApiIntegrationHoc(
    ({commonHandler, addHandler}) => (
      <div className="">
        <Container className="bg-white add-container " fluid>
          <CButton
            id="resetApiForm"
            variant="outline-secondary"
            size="sm"
            name=""
            className="mb-2  float-right"
            onClickHandler={commonHandler.resetIntegrationData}
          >
            <>
              <i className="fa fa-refresh" /> &nbsp;Reset
            </>
          </CButton>
          <ClientApiIntegrationForm {...addHandler} {...commonHandler} />

          <Row className="mt-4">
            <Col sm={12} md={{span: 3, offset: 9}}>
              <CButton
                id="save-profile-add"
                variant="primary "
                className="float-right btn-action"
                name="Save"
                loading={!commonHandler.formValid || !isHospitalApiSaveLoading}
                disabled={!commonHandler.formValid || !isHospitalApiSaveLoading}
                onClickHandler={addHandler.onConfirmHandler}
              />
              <ClientApiConfirmationModal {...commonHandler} {...addHandler} />
            </Col>
          </Row>
        </Container>
      </div>
    ),
    props,
    'A'
  )
  return <ClientApiIntegration />
}
export default ClientApiIntegarationAdd
