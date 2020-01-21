import React from 'react';
import {CModal} from "@cogent/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, specializationData} = props;
    console.log('',specializationData);
    return <>
        <CModal show={showModal}
                modalHeading="Specialization Details"
                size="lg"
                bodyChildren={<DetailsModal
                specializationData={specializationData}/>}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-roles-modal"
                closeButton={true}/>
    </>
};

export default PreviewDetails;
