import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import CompanyAdminDetailsModalContent from "../commons/CompanyAdminDetailsModalContent";

const CompanyAdminConfirmationModal = ({showModal, setShowModal, adminInfoObj, onConfirmClick, adminImage, isCreateAdminLoading}) => {
    return <>
        <CModal
            show={showModal}
            modalHeading="Admin Details"
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
                disabled={isCreateAdminLoading.isCreateAdminLoading}
                isLoading={isCreateAdminLoading.isCreateAdminLoading}
                className="float-right btn-action"
                onClickHandler={onConfirmClick}/>}
            closeButton={true}
        />
    </>;
};

export default CompanyAdminConfirmationModal;
