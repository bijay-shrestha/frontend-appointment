import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import AppointmentCheckInModalContent from "./AppointmentCheckInModalContent";

const AppointmentCheckInPreviewModal = props => {
    const {showModal, setShowModal, approvalData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Checkin Details"
                    size="xl"
                    bodyChildren={<AppointmentCheckInModalContent approvalData={approvalData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default AppointmentCheckInPreviewModal;
