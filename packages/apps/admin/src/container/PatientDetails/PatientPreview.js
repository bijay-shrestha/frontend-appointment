import React,{memo} from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import PatientContent from "./PatientContent";

const PatientPreview = props => {
    const {showModal, setShowModal, patientData} = props;
    return (
        <>
            <CModal show={showModal}
                    modalHeading="Patient Information Details"
                    size="xl"
                    bodyChildren={<PatientContent previewData={patientData} />}
                    onHide={setShowModal}
                    centered={false}
                    dialogClassName="preview-modal"
                    closeButton={true}
            />
        </>
    );
};

export default memo(PatientPreview);
