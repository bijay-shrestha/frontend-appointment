import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import LogContent from "./LogContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, logData,appointmentServiceTypeCode} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Log Details"
                    size="lg"
                    bodyChildren={<LogContent logData={logData} appointmentServiceTypeCode={appointmentServiceTypeCode}/>}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewRefund;
