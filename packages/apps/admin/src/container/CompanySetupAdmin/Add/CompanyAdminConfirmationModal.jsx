import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import CompanyAdminDetailsModalContent from "../commons/CompanyAdminDetailsModalContent";

const CompanyAdminConfirmationModal = ({showModal, setShowModal, adminInfoObj, onConfirmClick, adminImage, isCreateAdminLoading, isImageUploading}) => {
    return <>
        <CModal
            show={showModal}
            modalHeading="Admin Details"
            backdrop={'static'}
            size="lg"
            bodyChildren={<CompanyAdminDetailsModalContent adminInfoObj={adminInfoObj} adminImage={adminImage}/>}
            onHide={setShowModal}
            centered={false}
            dialogClassName="preview-modal"
            footerChildren={<CButton
                id="adminConfirm"
                variant="primary"
                size="xl"
                name="Confirm"
                disabled={isCreateAdminLoading.isCreateAdminLoading || isImageUploading}
                isLoading={isCreateAdminLoading.isCreateAdminLoading || isImageUploading}
                className="float-right btn-action"
                onClickHandler={onConfirmClick}/>}
            closeButton={true}
        />
    </>;
};

export default CompanyAdminConfirmationModal;
