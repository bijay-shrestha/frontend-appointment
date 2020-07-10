import React from 'react'
import {CCopyToClipboard, CForm, CModal} from '@frontend-appointment/ui-elements'
import {Row} from 'react-bootstrap'

const AppointmentCheckInSuccessModal = ({
                                           showModal,
                                           modalHeader,
                                           setShowModal,
                                           appointmentDetails,
                                           onCopyAppointmentNumber,
                                           copySuccessMessage,
                                           Print
                                       }) => {


    const bodyContent = <>
        <Container-fluid>
            <CForm id="quick-checkin" className="mt-2">

                <Row className="clip">

                    <i className="fa fa-check-circle"></i>
                    <h2>Appointment Checked-In Successfully</h2>
                    <div className="btn-container">
                        {Print ? <Print /> : ''}
                        &nbsp;&nbsp;

                        <CCopyToClipboard
                            id={"appointmentNumber"}
                            textToCopy={appointmentDetails.appointmentNumber}
                            children={
                                <button className="btn btn-primary btn-lg btn-action"><i className="fa fa-copy"/>&nbsp;Copy Appt.
                                    Number
                                </button>
                            }
                            onCopy={onCopyAppointmentNumber}
                            copiedMessage={copySuccessMessage}
                        />

                    </div>
                </Row>

            </CForm>
        </Container-fluid>
    </>
    return (
        <>
            <CModal
                id={"confirm-quick-checkin"}
                backdrop="static"
                show={showModal}
                // modalHeading={modalHeader}
                size="lg"
                modalHeading=""
                bodyChildren={bodyContent}
                // footerChildren={footer}
                onHide={setShowModal}
                dialogClassName="cogent-modal quick-confirm"
                closeButton={true}
            />
        </>
    )
}

export default AppointmentCheckInSuccessModal
