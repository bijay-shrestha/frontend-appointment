import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DepartmentAppointmentCancellationModalContent from "./DepartmentAppointmentCancellationModalContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, refundData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Cancellation Details"
                    size="xl"
                    bodyChildren={<DepartmentAppointmentCancellationModalContent refundData={refundData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewRefund;
