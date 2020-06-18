import React from 'react'
import {CCopyToClipboard, CForm, CModal} from '@frontend-appointment/ui-elements'
import {Row} from 'react-bootstrap'

const AppointmentFastCheckInConfirm = ({
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

                                        <i className="fa fa-check">

                                        </i>
                        {Print ? <Print/> : ''}

                        {/*<Button variant="secondary"*/}
                        {/*        size="lg"*/}
                        {/*        name=""*/}
                        {/*    // onClickHandler={e =>*/}
                        {/*    //     onClick(e, props.node.data.id || props.node.data, 'C')*/}
                        {/*    // }*/}
                        {/*>*/}
                        {/*    <i className="fa fa-print"/>&nbsp;Print*/}
                        {/*</Button>*/}

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
                          {/* </div>
                          </div> */}
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
                size="sm"
                modalHeading="Appointment Checked-In Successfully"
                bodyChildren={bodyContent}
                // footerChildren={footer}
                onHide={setShowModal}
                dialogClassName="cogent-modal"
            />
        </>
    )
}

export default AppointmentFastCheckInConfirm
