import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const SpecializationConfirmationModal = props => {
  const {showModal, setShowModal, specializationData, onConfirmClick} = props
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
          />
        }
        onHide={setShowModal}
        centered={false}
        dialogClassName="preview-roles-modal"
        footerChildren={
          <CButton
            id="specializationConfirm"
            variant="primary"
            size="lg"
            className="float-right btn-action"
            onClickHandler={onConfirmClick}
          />
        }
        closeButton={true}
      />
    </>
  )
}

export default SpecializationConfirmationModal
