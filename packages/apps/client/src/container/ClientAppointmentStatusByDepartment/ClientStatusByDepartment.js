import React from 'react';
import ClientAppointmentStatusByDepartmentHOC from "./ClientAppointmentStatusByDepartmentHOC";
import ClientAppointmentStatusByDepartmentSearchFilter from "./ClientAppointmentStatusByDepartmentSearchFilter";

import "./appointment-status.scss";
import ClientAppointmentStatusByDepartmentDetails from "./ClientAppointmentStatusByDepartmentDetails";
import {CConfirmationModal} from "@frontend-appointment/ui-components";
import CheckInModalContent from "../CommonComponents/CheckInModalContent";
import {CModal} from "@frontend-appointment/ui-elements";

const ClientAppointmentStatusByDepartment = props => {
    const ClientAppointmentStatusByDepartmentComponent = ClientAppointmentStatusByDepartmentHOC(
        ({
             searchHandler,
             statusDetailsData,
             checkInModalData
         }) =>
            <>
                <div>
                    <ClientAppointmentStatusByDepartmentSearchFilter
                        searchHandler={searchHandler}/>
                </div>
                <div className="">
                    <ClientAppointmentStatusByDepartmentDetails
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
    return <ClientAppointmentStatusByDepartmentComponent/>
};
export default ClientAppointmentStatusByDepartment














