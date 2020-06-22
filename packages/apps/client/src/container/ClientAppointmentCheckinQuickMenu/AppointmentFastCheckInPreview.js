import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import ApprovalFastCheckInContent from "./AppointmentFastCheckInContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, approvalData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Checkin Details"
                    size="xl"
                    bodyChildren={<ApprovalFastCheckInContent approvalData={approvalData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewRefund;
