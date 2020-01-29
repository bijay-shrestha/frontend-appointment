import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import AdminDetailsModalContent from "../commons/AdminDetailsModalContent";

const PreviewAdminDetails = ({showModal, setShowModal, adminInfoObj,adminImage}) => {
    return <>
        <CModal
            show={showModal}
            modalHeading="Admin Details"
            size="xl"
            bodyChildren={<AdminDetailsModalContent adminInfoObj={adminInfoObj} adminImage={adminImage}/>}
            onHide={setShowModal}
            centered={false}
            dialogClassName="preview-modal"
            closeButton={true}
        />
    </>;
};

export default PreviewAdminDetails;
