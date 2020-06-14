import React from 'react'
import {CButton, CCopyToClipboard, CModal} from '@frontend-appointment/ui-elements'
import {Button} from 'react-bootstrap'

const ConfirmationModal = ({
                               onConfirm,
                               onCancel,
                               showModal,
                               modalHeader,
                               modalBody,
                               setShowModal,
                               isConfirming,
                               isDisabled,
                               appointmentDetails
                           }) => {
    let footer = (
        <>
            <div>
                <CCopyToClipboard
                    id="appointmentNumber"
                    textToCopy={appointmentDetails.appointmentNumber}
                    children={
                        <Button
                            variant="primary"
                            size="lg"
                            className="float-right  btn-action ml-2"
                            disabled={isConfirming || isDisabled}
                            isLoading={isConfirming}
                            name={"Confirm"}
                            onClickHandler={onConfirm}
                        />
                    }/>
                <CButton
                    variant="light"
                    size="lg"
                    className="float-right btn-action"
                    name="Cancel"
                    onClickHandler={onCancel}
                    disabled={isConfirming}
                />
            </div>
        </>
    );

    return (
        <>
            <CModal
                show={showModal}
                modalHeading={modalHeader}
                size="lg"
                bodyChildren={modalBody}
                footerChildren={footer}
                onHide={setShowModal}
                dialogClassName="cogent-modal"
            />
        </>
    )
};

export default ConfirmationModal
