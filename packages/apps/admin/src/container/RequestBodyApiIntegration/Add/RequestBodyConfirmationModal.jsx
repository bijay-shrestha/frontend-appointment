import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const RequestBodyConfirmationModal = props => {
    const {showModal, setShowModal, requestBodyData, onConfirmClick,isLoading, type} = props
    console.log('onConfirmClick', onConfirmClick);
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Request Body Details"
                size="lg"
                bodyChildren={
                    <DetailsModal
                        requestBodyData={requestBodyData}
                        type={type}
                    />
                }
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={
                    <>
                        <CButton
                            name="Cancel"
                            id=""
                            variant="light"
                            size="lg"
                            className="float-right btn-action"
                            onClickHandler={setShowModal}

                        />
                        <CButton
                            id="specializationConfirm"
                            variant="primary"
                            size="lg"
                            className="float-right btn-action"
                            onClickHandler={onConfirmClick}
                            isLoading={isLoading}
                        />
                    </>
                }
                closeButton={true}
            />
        </>
    )
}

export default RequestBodyConfirmationModal
