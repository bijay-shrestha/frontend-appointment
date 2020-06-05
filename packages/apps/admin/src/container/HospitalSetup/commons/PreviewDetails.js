import React from 'react';
import {CModal} from "@frontend-appointment/ui-elements";
import DetailsModal from "./DetailsModal";

const PreviewDetails = props => {
    const {showModal, setShowModal, hospitalData} = props;
    // console.log('hospital Data::',hospitalData);
    const {hospitalAppointmentServiceTypeDetail} = hospitalData;
    let appointmentServiceTypeList = hospitalAppointmentServiceTypeDetail
        && hospitalAppointmentServiceTypeDetail.map(serviceType => (
            {
                label: serviceType.appointmentServiceTypeName,
                value: serviceType.appointmentServiceTypeId
            }));

    let primaryServiceType = hospitalAppointmentServiceTypeDetail && hospitalAppointmentServiceTypeDetail.find(serviceType => serviceType.isPrimary === "Y");
    return <>
        <CModal show={showModal}
                modalHeading="Client Details"
                size="lg"
                bodyChildren={
                    <DetailsModal
                        hospitalData={{
                            ...hospitalData,
                            appointmentServiceType: appointmentServiceTypeList ? appointmentServiceTypeList : [],
                            primaryAppointmentServiceType: primaryServiceType ? {
                                label: primaryServiceType.appointmentServiceTypeName,
                                value: primaryServiceType.appointmentServiceTypeId
                            } : null
                        }}
                        activeBillingModeForDropdown={props.activeBillingModeForDropdown}
                        activeAppointmentServiceTypeForDropdown={props.activeAppointmentServiceTypeForDropdown}
                        appointmentServiceTypeListForPrimary={props.appointmentServiceTypeListForPrimary}
                    />}
                onHide={setShowModal}
                centered={false}
                dialogClassName="preview-modal"
                closeButton={true}
                type="E"
        />
    </>
};

export default PreviewDetails;
