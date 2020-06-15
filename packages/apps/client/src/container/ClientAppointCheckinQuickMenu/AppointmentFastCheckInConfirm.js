import React from 'react'
import {CForm, CHybridInput,CButton} from '@frontend-appointment/ui-elements'
import {Col, Row,Button} from 'react-bootstrap'

const AppointmentFastCheckInConfirm = () => {
    return (
        <>
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
                                            <i className="fa fa-print"></i>
                                        </Button>
                           
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default AppointmentFastCheckInConfirm
