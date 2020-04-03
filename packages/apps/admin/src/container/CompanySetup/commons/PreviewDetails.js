import React,{memo} from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, companyData} = props;
    console.log('hospital Data::',companyData);
    return <>
        <CModal show={showModal}
                modalHeading="Company Details"
                size="lg"
                bodyChildren={<DetailsModal
                companyData={companyData}/>}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                closeButton={true}
                type="E"
                />
    </>
};

export default memo(PreviewDetails);

