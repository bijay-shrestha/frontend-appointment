import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DoctorAppointmentCancellationStatusModalContent from "./DoctorAppointmentCancellationStatusModalContent";

const DoctorAppointmentCancellationStatusPreview = props => {
    const {showModal, setShowModal, refundData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Refund Status Details"
                    size="xl"
                    bodyChildren={<DoctorAppointmentCancellationStatusModalContent refundData={refundData}/>}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default DoctorAppointmentCancellationStatusPreview;
