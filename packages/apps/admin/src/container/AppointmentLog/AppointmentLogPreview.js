import React,{memo} from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import LogContent from "./LogContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, logData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Refund Details"
                    size="xl"
                    bodyChildren={<LogContent refundData={logData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewRefund;
