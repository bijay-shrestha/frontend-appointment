import React, {memo} from 'react'
import * as Material from 'react-icons/md'
import SubDepartMentForm from './SpecializationForm'
import SpecializationConfirmationModal from './SpecializationConfirmModal'
import {Container, Row, Col} from 'react-bootstrap'
import {CAlert, CButton} from '@frontend-appointment/ui-elements'
import SpecializationHoc from '../SpecializationSetupHoc'
function SpecializationAdd (props) {
  const SpecializationAdd = SpecializationHoc(({
    specializationData,
    handleEnter,
    formValid,
    resetStateAddValues,
    errorMessageForSpecializationCode,
    errorMessageForSpecializationName,
    handleInputChange,
    setShowConfirmModal,
    showConfirmModal,
    submitAddChanges,
    alertMessageInfo,
    showAlert,
    closeAlert
  },props)=>
    <div className="">
      <Container className="bg-white add-profile " fluid>
        <CButton
          id="resetProfileForm"
          variant="outline-secondary"
          size="sm"
          name="Reset"
          className="mb-2  float-right"
          onClickHandler={resetStateAddValues}
        >
          <>
            &nbsp;
            <i className="fa fa-refresh" />
          </>
        </CButton>
        <SubDepartMentForm
          specializationInfoObj={specializationData}
          errorMessageForDepartmentName={errorMessageForSpecializationName}
          errorMessageForDepartmentCode={errorMessageForSpecializationCode}
          onEnterKeyPress={handleEnter}
          onInputChange={handleInputChange}
        />

        <Row className="mt-4">
          <Col sm={12} md={{span: 3, offset: 9}}>
            <CButton
              id="save-profile-add"
              variant="primary "
              className="float-right btn-action"
              name="Save"
              disabled={!formValid}
              onClickHandler={setShowConfirmModal}
            ></CButton>
            <SpecializationConfirmationModal
              showModal={showConfirmModal}
              setShowModal={setShowConfirmModal}
              onConfirmClick={submitAddChanges}
              specializationData={specializationData}
            />
          </Col>
        </Row>
        <CAlert
            id="profile-manage"
            variant={alertMessageInfo.variant}
            show={showAlert}
            onClose={closeAlert}
            alertType={
              alertMessageInfo.variant === 'success' ? (
                <>
                  <Material.MdDone />
                </>
              ) : (
                <>
                  <i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
                </>
              )
            }
            message={alertMessageInfo.message}
          />
      </Container>
    </div>
  )
  console.log('specializationAdd',SpecializationAdd)
  return <SpecializationAdd/>
   
  
}
// return <SpecializationAdd></SpecializationAdd>

export default SpecializationAdd
