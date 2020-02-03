import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const SpecializationConfirmationModal = props => {
  const {showModal, setShowModal, specializationData, onConfirmClick,type} = props
  console.log('onConfirmClick',onConfirmClick);
  return (
    <>
      <CModal
        show={showModal}
        modalHeading="Specialization Details"
        size="lg"
        bodyChildren={
          <DetailsModal
            specializationData={specializationData}
            type={type}
          />
        }
        onHide={setShowModal}
        centered={false}
        dialogClassName="preview-modal"
        footerChildren={
          <>
          <CButton
          name="Cancel"
          id=""
          variant="outline-secondary"
          size="lg"
          className="float-right btn-action"
          onClickHandler={setShowModal}
      
        />
          <CButton
            id="specializationConfirm"
            variant="primary"
            size="lg"
            className="float-right btn-action"
            onClickHandler={onConfirmClick}
          />
          </>
        }
        closeButton={true}
      />
    </>
  )
}

export default SpecializationConfirmationModal
