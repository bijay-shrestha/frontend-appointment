import React from 'react';
import {CModal} from "@cogent/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, subDepartmentData} = props;
    console.log('preveuw subdepartment',subDepartmentData);
    return <>
        <CModal show={showModal}
                modalHeading="Department Details"
                size="lg"
                bodyChildren={<DetailsModal
                subDepartmentData={subDepartmentData}/>}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-roles-modal"
                closeButton={true}/>
    </>
};

export default PreviewDetails;
