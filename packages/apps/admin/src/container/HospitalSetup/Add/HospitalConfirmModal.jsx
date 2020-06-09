import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const HospitalConfirmationModal = ({
                                       showModal,
                                       setShowModal,
                                       hospitalData,
                                       onConfirmClick,
                                       type,
                                       createHospitalLoading,
                                       activeBillingModeForDropdown,
                                       activeAppointmentServiceTypeForDropdown,
                                       appointmentServiceTypeListForPrimary
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
                        activeBillingModeForDropdown={activeBillingModeForDropdown}
                        activeAppointmentServiceTypeForDropdown={activeAppointmentServiceTypeForDropdown}
                        appointmentServiceTypeListForPrimary={appointmentServiceTypeListForPrimary}
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
                        isLoading={createHospitalLoading}
                        name={'Confirm'}
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
