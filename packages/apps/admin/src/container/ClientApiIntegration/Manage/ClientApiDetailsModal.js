import React,{memo} from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const ClientApiPreviewModal = props => {
    const {
        showModal,
        integrationData,
        setCloseModal,
        isRequestBodyByFeatureLoading,
        requestBodyByFeatureErrorMessage
    } = props
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="API Integration Details"
                size="xl"
                bodyChildren={
                    <DetailsModal
                         integrationData={integrationData}
                         isRequestBodyByFeatureLoading={isRequestBodyByFeatureLoading}
                         requestBodyByFeatureErrorMessage={requestBodyByFeatureErrorMessage}
                         type="P"
                         className="api-details-modal"
                    />
                }
                onHide={setCloseModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={
                    <>
                        <CButton
                            name="Close"
                            id=""
                            variant="primary"
                            size="lg"
                            className="float-right btn-action"
                            onClickHandler={setCloseModal}

                        />
                    </>
                }
                closeButton={true}
            />
        </>
    )
}

export default memo(ClientApiPreviewModal)
