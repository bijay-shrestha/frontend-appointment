import React,{memo} from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const AdminApiConfirmationModal = props => {
    const {
        integrationData,
        setCloseModal,
        adminApiSaveLoading,
        onSaveHandler,
        showConfirmationModal,
        isRequestBodyByFeatureLoading,
        requestBodyByFeatureErrorMessage
    } = props
    return (
        <>
            <CModal
                show={showConfirmationModal}
                modalHeading="Admin API Integration Details"
                size="xl"
                bodyChildren={
                    <DetailsModal
                         integrationData={integrationData}
                         isRequestBodyByFeatureLoading={isRequestBodyByFeatureLoading}
                         requestBodyByFeatureErrorMessage={requestBodyByFeatureErrorMessage}
                         type={'A'}
                         className="api-details-modal"
                    />
                }
                onHide={setCloseModal}
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
                            onClickHandler={setCloseModal}

                        />
                        <CButton
                            id="apiintegrationform"
                            variant="primary"
                            size="lg"
                            className="float-right btn-action"
                            onClickHandler={onSaveHandler}
                            isLoading={adminApiSaveLoading}
                            disabled={adminApiSaveLoading}

                        />
                    </>
                }
                closeButton={true}
            />
        </>
    )
}

export default memo(AdminApiConfirmationModal)
