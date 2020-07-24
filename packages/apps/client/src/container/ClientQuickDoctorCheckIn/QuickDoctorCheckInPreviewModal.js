import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import QuickDoctorCheckInModalContent from "./QuickDoctorCheckInModalContent";

const QuickDoctorCheckInPreviewModal = props => {
    const {showModal, setShowModal, approvalData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Checkin Details"
                    size="xl"
                    bodyChildren={<QuickDoctorCheckInModalContent approvalData={approvalData}/>}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default QuickDoctorCheckInPreviewModal;
