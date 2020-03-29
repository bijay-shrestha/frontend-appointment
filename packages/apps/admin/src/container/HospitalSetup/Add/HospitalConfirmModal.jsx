import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const HospitalConfirmationModal = ({
                                       showModal,
                                       setShowModal,
                                       hospitalData,
                                       onConfirmClick,
                                       type,
                                       createHospitalLoading
                                   }) => {
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Client Details"
                size="lg"
                bodyChildren={
                    <DetailsModal
                        hospitalData={hospitalData}
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
                        disabled={createHospitalLoading}
                        name={createHospitalLoading ? 'Confirming' : "Confirm"}
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

export default HospitalConfirmationModal
