import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DoctorAppointmentCancellationModalContent from "./DoctorAppointmentCancellationModalContent";

const DoctorAppointmentCancellationPreview = props => {
    const {showModal, setShowModal, refundData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Cancellation Details"
                    size="xl"
                    bodyChildren={<DoctorAppointmentCancellationModalContent refundData={refundData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default DoctorAppointmentCancellationPreview;
