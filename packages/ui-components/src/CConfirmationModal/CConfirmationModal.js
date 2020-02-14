import React from 'react'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const ConfirmationModal = props => {
  let footer = (
    <>
      <div>
        <CButton
          variant="danger "
          size="lg"
          className="float-right  btn-action ml-2"
          name="Accept"
          onClickHandler={props.onAccept}
        />

        <CButton
          variant="light "
          size="lg"
          className="float-right btn-action "
          name="Reject"
          onClickHandler={props.onReject}
        />
      </div>
    </>
  )

  return (
    <>
      <CModal
        show={props.showModal}
        modalHeading={props.modalHeader}
        size="lg"
        footerChildren={footer}
        onHide={props.setShowModal}
        dialogClassName="cogent-modal"
      />
    </>
  )
}

export default ConfirmationModal
