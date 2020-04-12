import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, hospitalData} = props;
    console.log('hospital Data::',hospitalData);
    return <>
        <CModal show={showModal}
                modalHeading="Client Details"
                size="lg"
                bodyChildren={<DetailsModal
                hospitalData={hospitalData}/>}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                closeButton={true}
                type="E"
                />
    </>
};

export default PreviewDetails;
