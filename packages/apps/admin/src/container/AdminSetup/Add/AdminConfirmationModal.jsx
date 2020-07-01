import React from 'react';
import {CButton, CModal} from "@frontend-appointment/ui-elements";
import AdminDetailsModalContent from "../commons/AdminDetailsModalContent";

const AdminConfirmationModal = ({showModal, setShowModal, adminInfoObj, onConfirmClick, adminImage, isCreateAdminLoading, isImageLoading}) => {
    return <>
        <CModal
            show={showModal}
            modalHeading="Client Admin Details"
            size="lg"
            bodyChildren={<AdminDetailsModalContent adminInfoObj={adminInfoObj} adminImage={adminImage}/>}
            onHide={setShowModal}
            centered={false}
            dialogClassName="preview-modal"
            footerChildren={
                <CButton
                    id="adminConfirm"
                    variant="primary"
                    size="xl"
                    name="Confirm"
                    disabled={isCreateAdminLoading || isImageLoading}
                    isLoading={isCreateAdminLoading || isImageLoading}
                    className="float-right btn-action"
                    onClickHandler={onConfirmClick}/>}
            closeButton={true}
        />
    </>;
};

export default AdminConfirmationModal;
