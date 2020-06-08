import React,{memo} from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const ClientApiConfirmationModal = props => {
    const {
        integrationData,
        setCloseModal,
        isHospitalApiSaveLoading,
        onSaveHandler,
        showConfirmationModal
    } = props
    return (
        <>
            <CModal
                show={showConfirmationModal}
              
                modalHeading="Client API Integration Details"
                size="xl"
                bodyChildren={
                    <DetailsModal
                         integrationData={integrationData}
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
                            isLoading={isHospitalApiSaveLoading}
                            disabled={isHospitalApiSaveLoading}
                            
                        />
                    </>
                }
                closeButton={true}
            />
        </>
    )
}

export default memo(ClientApiConfirmationModal)
