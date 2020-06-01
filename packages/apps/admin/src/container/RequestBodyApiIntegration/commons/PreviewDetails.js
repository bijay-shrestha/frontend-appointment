import React from 'react'
import {CModal} from '@frontend-appointment/ui-elements'
import DetailsModal from './DetailsModal'

const PreviewDetails = props => {
  const {showModal, setShowModal, requestBodyData} = props
  return (
    <>
      <CModal
        show={showModal}
        modalHeading="Request Body Details"
        size="lg"
        bodyChildren={<DetailsModal requestBodyData={requestBodyData} />}
        onHide={setShowModal}
        centered={false}
        dialogClassName="preview-modal"
        closeButton={true}
      />
    </>
  )
}

export default PreviewDetails
