import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, doctorData} = props;
    console.log('Doctor Data::',doctorData);
    return <>
        <CModal show={showModal}
                modalHeading="Doctor Details"
                size="lg"
                bodyChildren={<DetailsModal
                doctorData={doctorData}
                type="M"
                />}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                closeButton={true}
               
                />
    </>
};

export default PreviewDetails;
