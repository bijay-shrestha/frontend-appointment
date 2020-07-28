import React from 'react';
import DoctorAppointmentStatusHOC from "./DoctorAppointmentStatusHOC";
import AppointmentStatusSearchFilter from "./DoctorAppointmentStatusSearchFilter";

import "./doctor-appointment-status.scss";
import DoctorAppointmentStatusDetails from "./DoctorAppointmentStatusDetails";
import {CConfirmationModal} from "@frontend-appointment/ui-components";
import CheckInModalContent from "../CommonComponents/CheckInModalContent";
import {CModal} from "@frontend-appointment/ui-elements";

const DoctorAppointmentStatus = props => {
    const AppointmentStatus = DoctorAppointmentStatusHOC(
        ({
             searchHandler,
             statusDetailsData,
             checkInModalData
         }) =>
            <>
                <div>
                    <AppointmentStatusSearchFilter
                        searchHandler={searchHandler}/>
                </div>
                <div className="">
                    <DoctorAppointmentStatusDetails
                        statusDetailsData={statusDetailsData}
                        showAppointmentDetailModal={checkInModalData.showAppointmentDetailModal}/>
                </div>
                <CConfirmationModal
                    modalHeader="Confirm Check-In?"
                    modalBody={<CheckInModalContent appointmentDetails={checkInModalData.appointmentDetails}/>}
                    showModal={checkInModalData.showCheckInModal}
                    setShowModal={checkInModalData.setShowModal}
                    onConfirm={() => checkInModalData.checkInAppointment(checkInModalData.appointmentDetails.appointmentId)}
                    onCancel={checkInModalData.setShowModal}
                    isConfirming={checkInModalData.isConfirming}
                />

                {
                    checkInModalData.showAppointmentDetailModal ?
                        <CModal
                            modalHeading={"Appointment Details"}
                            show={checkInModalData.showAppointmentDetailModal}
                            size="lg"
                            bodyChildren={<CheckInModalContent
                                appointmentDetails={checkInModalData.appointmentDetails}/>}
                            onHide={checkInModalData.closeAppointmentDetailModal}
                            dialogClassName="cogent-modal"/>
                        : ''
                }
            </>,
        props, '');
    return <AppointmentStatus/>
};
export default DoctorAppointmentStatus














