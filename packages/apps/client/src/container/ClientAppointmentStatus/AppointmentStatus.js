import React from 'react';
import AppointmentStatusHOC from "./AppointmentStatusHOC";
import AppointmentStatusSearchFilter from "./AppointmentStatusSearchFilter";

import "./appointment-status.scss";
import AppointmentStatusDetails from "./AppointmentStatusDetails";
import {CConfirmationModal} from "@frontend-appointment/ui-components";
import CheckInModalContent from "../CommonComponents/CheckInModalContent";

const AppointmentStatus = props => {
    const AppointmentStatus = AppointmentStatusHOC(
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
                    <AppointmentStatusDetails
                        statusDetailsData={statusDetailsData}/>
                </div>
                <CConfirmationModal
                    modalHeader="Confirm Check-In?"
                    modalBody={<CheckInModalContent appointmentDetails={checkInModalData.appointmentDetails}/>}
                    showModal={checkInModalData.showCheckInModal}
                    setShowModal={checkInModalData.setShowModal}
                    onConfirm={()=>checkInModalData.checkInAppointment(checkInModalData.appointmentDetails.appointmentId)}
                    onCancel={checkInModalData.setShowModal}
                    isConfirming={checkInModalData.isConfirming}
                />
            </>,
        props, '');
    return <AppointmentStatus/>
};
export default AppointmentStatus














