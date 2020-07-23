import React from 'react';
import AppointmentStatusByDepartmentHOC from "./AppointmentStatusByDepartmentHOC";
import AppointmentStatusByDepartmentSearchFilter from "./AppointmentStatusByDepartmentSearchFilter";

import "./appointment-status.scss";
import AppointmentStatusByDepartmentDetails from "./AppointmentStatusByDepartmentDetails";
import {
    AppointmentCheckInSuccessModal,
    CConfirmationModal,
    CPageOverlayLoader
} from "@frontend-appointment/ui-components";
import CheckInModalContent from "../CommonComponents/CheckInModalContent";
import {CModal} from "@frontend-appointment/ui-elements";
import {AppointmentCheckInPrint, PrintableComponent} from '@frontend-appointment/commons'

const AppointmentStatusByDepartment = props => {
    const ClientAppointmentStatusByDepartmentComponent = AppointmentStatusByDepartmentHOC(
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
                    <AppointmentStatusByDepartmentSearchFilter
                        searchHandler={searchHandler}/>
                </div>
                <div className="">
                    <AppointmentStatusByDepartmentDetails
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
export default AppointmentStatusByDepartment














