import React from 'react'
import AdminApiIntegrationForm from './AdminApiIntegrationForm'
import AdminApiConfirmationModal from './AdminApiConfirmationModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CButton} from '@frontend-appointment/ui-elements'
import AdminApiIntegrationHoc from '../AdminApiIntegrationHoc'

function AdminApiIntegarationAdd (props) {
  const AdminApiIntegration = AdminApiIntegrationHoc(
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
          <AdminApiIntegrationForm {...addHandler} {...commonHandler} />

          <Row className="mt-4">
            <Col sm={12} md={{span: 3, offset: 9}}>
              <CButton
                id="save-profile-add"
                variant="primary "
                className="float-right btn-action"
                name="Save"
                disabled={!commonHandler.formValid}
                onClickHandler={addHandler.onConfirmHandler}
              />
              <AdminApiConfirmationModal {...commonHandler} {...addHandler} />
            </Col>
          </Row>
        </Container>
      </div>
    ),
    props,
    'A'
  )
  return <AdminApiIntegration />
}
export default AdminApiIntegarationAdd
