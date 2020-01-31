import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, qualificationData} = props;
    return <>
        <CModal show={showModal}
                modalHeading="Qualification Details"
                size="lg"
                bodyChildren={<DetailsModal
                qualificationData={qualificationData}
                />}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-roles-modal"
                closeButton={true}/>
    </>
};

export default PreviewDetails;
