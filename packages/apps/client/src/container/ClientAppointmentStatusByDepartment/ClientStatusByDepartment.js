import React from 'react';
import ClientAppointmentStatusByDepartmentHOC from "./ClientAppointmentStatusByDepartmentHOC";
import ClientAppointmentStatusByDepartmentSearchFilter from "./ClientAppointmentStatusByDepartmentSearchFilter";

import "./appointment-status.scss";
import ClientAppointmentStatusByDepartmentDetails from "./ClientAppointmentStatusByDepartmentDetails";
import {
    AppointmentCheckInSuccessModal,
    CConfirmationModal,
    CPageOverlayLoader
} from "@frontend-appointment/ui-components";
import CheckInModalContent from "../CommonComponents/CheckInModalContent";
import {CModal} from "@frontend-appointment/ui-elements";
import {AppointmentCheckInPrint, PrintableComponent} from '@frontend-appointment/commons'

const ClientAppointmentStatusByDepartment = props => {
    const ClientAppointmentStatusByDepartmentComponent = ClientAppointmentStatusByDepartmentHOC(
        ({
             searchHandler,
             statusDetailsData,
             checkInModalData
         }) => {
            const {
                showCheckInSuccessModal,
                approveSuccessMessage,
                closeCheckInSuccessModal,
                onCopyAppointmentNumber,
                copySuccessMessage,
                appointmentDetailsForCheckIn,
                isConfirming
            } = checkInModalData
            return <>
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
                {showCheckInSuccessModal ? (
                    <AppointmentCheckInSuccessModal
                        modalHeader={approveSuccessMessage}
                        showModal={showCheckInSuccessModal}
                        setShowModal={closeCheckInSuccessModal}
                        onCopyAppointmentNumber={onCopyAppointmentNumber}
                        copySuccessMessage={copySuccessMessage}
                        appointmentDetails={appointmentDetailsForCheckIn}
                        Print={PrintableComponent(AppointmentCheckInPrint, appointmentDetailsForCheckIn)}
                    />
                ) : (
                    ''
                )}
                {
                    isConfirming ?
                        <CPageOverlayLoader
                            showModal={isConfirming}
                            modalHeader={"Appointment Check-In in process."}
                        /> : ''
                }

            </>
        },
        props, '');
    return <ClientAppointmentStatusByDepartmentComponent/>
};
export default ClientAppointmentStatusByDepartment














