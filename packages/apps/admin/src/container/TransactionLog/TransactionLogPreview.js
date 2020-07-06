import React, {memo} from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import TransactionLogDetailContent from "./TransactionLogDetailContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, logData, appointmentServiceTypeCode} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Transaction Log Details"
                    size="lg"
                    bodyChildren={<TransactionLogDetailContent logData={logData}
                                                               appointmentServiceTypeCode={appointmentServiceTypeCode}/>}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default memo(PreviewRefund);
