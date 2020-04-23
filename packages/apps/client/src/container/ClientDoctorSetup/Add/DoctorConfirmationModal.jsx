import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const HospitalConfirmationModal = props => {
    const {showModal, setShowModal, doctorData, onConfirmClick, type, createConsultantLoading} = props
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Doctor Details"
                size="xl"
                bodyChildren={
                    <DetailsModal
                        doctorData={doctorData}
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
                        className="float-right btn-action"
                        onClickHandler={onConfirmClick}
                        disabled={createConsultantLoading}
                        name={createConsultantLoading ? <span className="saving">Confirming <img
                            src={require("../../../images/three-dots.svg")}/></span> : "Confirm"}
                    />
                }
                closeButton={true}
            />
        </>
    )
}

export default HospitalConfirmationModal
