import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import CompanyAdminDetailsModalContent from "../commons/CompanyAdminDetailsModalContent";

const PreviewAdminDetails = ({showModal, setShowModal, adminInfoObj,adminImage}) => {
    return <>
        <CModal
            show={showModal}
            modalHeading="Company Admin Details"
            size="xl"
            bodyChildren={<CompanyAdminDetailsModalContent adminInfoObj={adminInfoObj} adminImage={adminImage}/>}
            onHide={setShowModal}
            centered={false}
            dialogClassName="preview-modal"
            closeButton={true}
        />
    </>;
};

export default PreviewAdminDetails;
