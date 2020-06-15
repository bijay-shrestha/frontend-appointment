import React from 'react'
import {CCopyToClipboard, CForm, CModal} from '@frontend-appointment/ui-elements'
import {Button, Row} from 'react-bootstrap'

const AppointmentFastCheckInConfirm = ({
                                           showModal,
                                           modalHeader,
                                           setShowModal,
                                           appointmentDetails
                                       }) => {

    const bodyContent = <>
        <Container-fluid>
            <CForm className="mt-2">
                <Container-fluid>
                    <Row className="d-flex justify-content-center">

                        <Button variant="secondary"
                                size="lg"

                                name=""
                            // onClickHandler={e =>
                            //     onClick(e, props.node.data.id || props.node.data, 'C')
                            // }
                        >
                            <i className="fa fa-print"/>
                        </Button>

                        <CCopyToClipboard
                            id={"appointmentNumber"}
                            textToCopy={appointmentDetails.appointmentNumber}
                            children={
                                <span><i className="fa fa-copy"/>
                                </span>
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
                bodyChildren={bodyContent}
                // footerChildren={footer}
                onHide={setShowModal}
                dialogClassName="cogent-modal"
            />
        </>
    )
}

export default AppointmentFastCheckInConfirm
