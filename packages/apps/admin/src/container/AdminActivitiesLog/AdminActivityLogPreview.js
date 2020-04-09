import React,{memo} from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import LogContent from "./AdminActivityLogContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, logData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Log Details"
                    size="lg"
                    bodyChildren={<LogContent logData={logData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewRefund;
