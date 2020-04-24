import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const QualificationConfirmationModal = props => {
    const {showModal, setShowModal, qualificationData, onConfirmClick, createQualificationLoading} = props
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Qualification Details"
                size="lg"
                bodyChildren={<DetailsModal qualificationData={qualificationData}/>}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={
                    <CButton
                        id="specializationConfirm"
                        variant="primary"
                        size="lg"
                        className="float-right btn-action"
                        name={"Confirm"}
                        disabled={createQualificationLoading}
                        isLoading={createQualificationLoading}
                        onClickHandler={onConfirmClick}
                    />
                }
                closeButton={true}
            />
        </>
    )
}

export default QualificationConfirmationModal
