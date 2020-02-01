import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, qualificationData,type} = props;
    return <>
        <CModal show={showModal}
                modalHeading="Qualification Details"
                size="lg"
                bodyChildren={<DetailsModal
                qualificationData={qualificationData}
                type={type}
                />}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-roles-modal"
                closeButton={true}
               
                />
    </>
};

export default PreviewDetails;
