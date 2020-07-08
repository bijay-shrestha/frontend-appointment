import React from 'react'
import {CButton, CModal} from '@frontend-appointment/ui-elements'
import {PreviewClientProfileModalContent} from '@frontend-appointment/ui-components'

const ConfirmationModal = props => {
  const {
    showConfirmModal,
    setShowConfirmModal,
    onConfirmClick,
    profileData,
    rolesJson,
    isAddLoading,
    isCloneAndAdd,
    boolFlagForCloneAndAdd
  } = props
  return (
    <>
      <CModal
        show={showConfirmModal}
        modalHeading="Client Profile Details"
        size="lg"
        bodyChildren={
          <PreviewClientProfileModalContent
            profileData={profileData}
            rolesJson={rolesJson}
          />
        }
        footerChildren={
          <>
           <CButton
              variant="light"
              size="lg"
              name={'Clone And Add'}
              className="btn-action float-right"
              isLoading={boolFlagForCloneAndAdd && isAddLoading}
              disabled={isAddLoading}
              onClickHandler={isCloneAndAdd}
            />
            <CButton
              variant="primary"
              size="lg"
              name={'Confirm'}
              className="btn-action float-right"
              isLoading={!boolFlagForCloneAndAdd && isAddLoading}
              disabled={isAddLoading}
              onClickHandler={onConfirmClick}
            />
           
          </>
        }
        onHide={setShowConfirmModal}
        centered={false}
        dialogClassName="preview-modal "
        closeButton={true}
      />
    </>
  )
}

export default ConfirmationModal
