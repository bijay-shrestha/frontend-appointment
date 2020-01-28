import React from 'react';
import {CButton, CModal} from "@cogent/ui-elements";
import AdminDetailsModalContent from "../commons/AdminDetailsModalContent";

const AdminConfirmationModal = ({showModal, setShowModal, adminInfoObj, onConfirmClick,adminImage}) => {
    return <>
        <CModal
            show={showModal}
            modalHeading="Admin Details"
            size="lg"
            bodyChildren={<AdminDetailsModalContent adminInfoObj={adminInfoObj} adminImage={adminImage}/>}
            onHide={setShowModal}
            centered={false}
            dialogClassName="preview-modal"
            footerChildren={<CButton
                id="adminConfirm"
                variant="primary"
                size="xl"
                className="float-right btn-action"
                onClickHandler={onConfirmClick}/>}
            closeButton={true}
        />
    </>;
};

export default AdminConfirmationModal;
