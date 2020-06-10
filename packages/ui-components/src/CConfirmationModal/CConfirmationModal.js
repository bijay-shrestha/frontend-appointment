import React from 'react'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const ConfirmationModal = ({
                               onConfirm,
                               onCancel,
                               showModal,
                               modalHeader,
                               modalBody,
                               setShowModal,
                               isConfirming,
                               isDisabled,
                               Print
                           }) => {
    let footer = (
        <>
            <div className="modal-buttons">
                <CButton
                    variant="primary"
                    size="lg"
                    className="float-right  btn-action ml-1"
                    disabled={isConfirming||isDisabled}
                    isLoading={isConfirming}
                    name={"Confirm"}
                    onClickHandler={onConfirm}
                />
                {Print?<Print/>:null}
                <CButton
                    variant="light"
                    size="lg"
                    className="float-right btn-action ml-1"
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
