import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DepartmentCheckInModalContent from "./DepartmentCheckInModalContent";

const DepartmentCheckInPreviewModal = props => {
    const {showModal, setShowModal, approvalData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Department Wise Checkin Details"
                    size="xl"
                    bodyChildren={<DepartmentCheckInModalContent appointmentDetails={approvalData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default DepartmentCheckInPreviewModal;
