import React,{memo} from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import PatientContent from "./PatientContent";

const PreviewRefund = props => {
    const {showModal, setShowModal, patientData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Appointment Log Details"
                    size="xl"
                    bodyChildren={<PatientContent patientData={patientData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default PreviewRefund;
