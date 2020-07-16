import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const HospitalConfirmationModal = props => {
    const {showModal, setShowModal, doctorData, onConfirmClick, type, createConsultantLoading, salutationList, isImageUploading} = props
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Doctor Details"
                size="xl"
                backdrop='static'
                bodyChildren={
                    <DetailsModal
                        doctorData={{...doctorData, salutationList: salutationList}}
                        type={type}
                    />
                }
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={
                    <CButton
                        id="hospitalConfirm"
                        variant="primary"
                        size="lg"
                        name={"Confirm"}
                        className="float-right btn-action"
                        onClickHandler={onConfirmClick}
                        disabled={createConsultantLoading || isImageUploading}
                        isLoading={createConsultantLoading || isImageUploading}
                    />
                }
                closeButton={true}
            />
        </>
    )
}

export default HospitalConfirmationModal
