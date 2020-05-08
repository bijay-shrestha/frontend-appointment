import React,{memo} from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import ApprovalContent from "./ApprovalContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, approvalData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Check-In Details"
                    size="xl"
                    bodyChildren={<ApprovalContent approvalData={approvalData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default memo(PreviewRefund);
