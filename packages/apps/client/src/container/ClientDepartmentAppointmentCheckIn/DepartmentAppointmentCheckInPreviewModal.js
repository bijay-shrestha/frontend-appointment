import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DepartmentAppointmentCheckInModalContent from "./DepartmentAppointmentCheckInModalContent";

const DepartmentAppointmentCheckInPreviewModal = props => {
    const {showModal, setShowModal, approvalData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Department Wise Checkin Details"
                    size="xl"
                    bodyChildren={<DepartmentAppointmentCheckInModalContent appointmentDetails={approvalData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default DepartmentAppointmentCheckInPreviewModal;
