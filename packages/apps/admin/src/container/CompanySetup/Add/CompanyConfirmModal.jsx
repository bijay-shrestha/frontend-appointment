import React from 'react'
import DetailsModal from '../commons/DetailsModal'
import {CButton, CModal} from '@frontend-appointment/ui-elements'

const CompanyConfirmationModal = props => {
    const {showModal, setShowModal, companyData, onConfirmClick, type, isImageUploading, isCompanySaveLoading} = props;
    return (
        <>
            <CModal
                show={showModal}
                modalHeading="Company Details"
                size="xl"
                backdrop={'static'}
                bodyChildren={
                    <DetailsModal
                        companyData={companyData}
                        type={type}
                    />
                }
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={
                    <CButton
                        id="companyConfirm"
                        variant="primary"
                        size="lg"
                        isLoading={isImageUploading || isCompanySaveLoading}
                        disabled={isImageUploading || isCompanySaveLoading}
                        className="float-right btn-action"
                        onClickHandler={onConfirmClick}
                    />
                }
                closeButton={true}
            />
        </>
    )
}

export default CompanyConfirmationModal
