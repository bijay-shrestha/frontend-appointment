import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import RefundContent from "./ClientAppointmentDepartmentRefundStatusContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, refundData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Cancellation Status Details"
                    size="xl"
                    bodyChildren={<RefundContent refundData={refundData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewRefund;
