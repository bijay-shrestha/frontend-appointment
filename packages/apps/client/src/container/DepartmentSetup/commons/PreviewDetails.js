import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, departmentData} = props;
    return <>
        <CModal show={showModal}
                modalHeading="Department Details"
                size="lg"
                bodyChildren={<DetailsModal
                    departmentData={departmentData}/>}
                onHide={setShowModal}
                centered={true}
                dialogClassName="preview-modal"
                closeButton={true}/>
    </>
};

export default PreviewDetails;
