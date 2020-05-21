import React,{memo} from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const ClientApiConfirmationModal = props => {
    const {
        integrationData,
        setCloseModal,
        isHospitalApiSaveLoading,
        onSaveHandler
    } = props
    return (
        <>
            <CModal
                show={setCloseModal}
                modalHeading="API Integration Details"
                size="lg"
                bodyChildren={
                    <DetailsModal
                         integrationData={integrationData}
                         type={'A'}
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
