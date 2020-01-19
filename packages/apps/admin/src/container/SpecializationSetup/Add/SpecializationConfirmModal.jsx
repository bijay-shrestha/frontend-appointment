import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@cogent/ui-elements'

const DepartmentConfirmationModal = props => {
  const {showModal, setShowModal, specializationData, onConfirmClick} = props
  return (
    <>
      <CModal
        show={showModal}
        modalHeading="Department Details"
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
            id="departmentConfirm"
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

export default DepartmentConfirmationModal
