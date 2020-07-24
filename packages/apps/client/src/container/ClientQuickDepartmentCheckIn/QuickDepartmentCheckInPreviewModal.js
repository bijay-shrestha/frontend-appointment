import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import QuickDepartmentCheckInModalContent from "./QuickDepartmentCheckInModalContent";

const QuickDepartmentCheckInPreviewModal = props => {
    const {showModal, setShowModal, approvalData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Department Wise Checkin Details"
                    size="xl"
                    bodyChildren={<QuickDepartmentCheckInModalContent approvalData={approvalData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default QuickDepartmentCheckInPreviewModal;
