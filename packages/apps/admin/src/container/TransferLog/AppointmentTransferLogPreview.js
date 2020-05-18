import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import TransferContent from "./TransferContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, transferData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Transfer Details"
                    size="lg"
                    bodyChildren={<TransferContent transferData={transferData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewRefund;
