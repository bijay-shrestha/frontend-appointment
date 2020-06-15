import React from 'react'
import {CCopyToClipboard, CForm, CModal,CButton} from '@frontend-appointment/ui-elements'
import {Button, Row} from 'react-bootstrap'

const AppointmentFastCheckInConfirm = ({
                                           showModal,
                                           modalHeader,
                                           setShowModal,
                                           appointmentDetails
                                       }) => {

    const bodyContent = <>
        <Container-fluid>
            <CForm id ="quick-checkin" className="mt-2">
                <Container-fluid>
                    <Row className="d-flex justify-content-center">

                        <Button variant="secondary"
                                size="lg"
                                name=""
                            // onClickHandler={e =>
                            //     onClick(e, props.node.data.id || props.node.data, 'C')
                            // }
                        >
                            <i className="fa fa-print"/>&nbsp;Print
                        </Button>

                        <CCopyToClipboard
                       
                            id={"appointmentNumber"}
                            textToCopy={appointmentDetails.appointmentNumber}
                            children={
                                <button className="btn btn-primary btn-clip"><i className="fa fa-copy"/>Copy Appt. Number
                                </button>
                            }
                        />
                    </Row>
                </Container-fluid>
            </CForm>
        </Container-fluid>
    </>
    return (
        <>
            <CModal
                show={showModal}
                modalHeading={modalHeader}
                size="lg"
                modalHeading="Appointment Checked-In Successfully"
                bodyChildren={bodyContent}
                // footerChildren={footer}
                onHide={setShowModal}
                dialogClassName="cogent-modal"
                size="lg"
            />
        </>
    )
}

export default AppointmentFastCheckInConfirm
