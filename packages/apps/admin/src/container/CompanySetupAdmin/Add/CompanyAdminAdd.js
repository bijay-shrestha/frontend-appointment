import React, {memo} from 'react'
import CompanyAdminInfoForm from './CompanyAdminInfoForm'
import CompanyAdminSetupHOC from '../CompanyAdminSetupHoc'
import CompanyAdminConfirmationModal from './CompanyAdminConfirmationModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CButton} from '@frontend-appointment/ui-elements'
function CompanyAdminAdd (props) {
  const CompanyAdminAddSetup = CompanyAdminSetupHOC(
    ({adminCreateForm, commonInfo}) => (
      <div className="">
        <Container className="bg-white add-container" fluid>
          <>
            <CButton
              id="resetAdminForm"
              variant="outline-secondary"
              size="sm"
              name="Reset"
              className="mb-2  float-right"
              onClickHandler={commonInfo.resetModalState}
            >
              <>
                &nbsp;
                <i className="fa fa-refresh" />
              </>
            </CButton>
            <CompanyAdminInfoForm
              adminInfoObj={{...adminCreateForm.adminCreateData}}
              {...commonInfo}
            />
            <Row className="mt-4">
              <Col sm={12} md={{span: 3, offset: 9}}>
                <CButton
                  id="save-admin"
                  variant="primary "
                  className="float-right btn-action"
                  name="Save"
                  disabled={!adminCreateForm.adminCreateData.formValid}
                  // isLoading={!adminCreateForm.adminCreateData.formValid}
                  onClickHandler={adminCreateForm.setShowModal}
                ></CButton>
                <CompanyAdminConfirmationModal
                  showModal={adminCreateForm.showModal}
                  setShowModal={adminCreateForm.setShowModal}
                  onConfirmClick={adminCreateForm.onConfirmClick}
                  adminInfoObj={{...adminCreateForm.adminCreateData}}
                  isCreateAdminLoading={{...adminCreateForm.isCreateAdminLoading}}
                />
              </Col>
            </Row>
          </>
        </Container>
      </div>
    ),
    props,
    'A'
  )
  return <CompanyAdminAddSetup />
}

export default memo(CompanyAdminAdd)
