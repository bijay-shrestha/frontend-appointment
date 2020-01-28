import React, { PureComponent } from 'react';
import { Col, Container, Row ,Form} from "react-bootstrap";
import "./../doctor-duty-roster.scss";
import {CFLabel, CForm, CHybridInput,
     CHybridSelect, CRadioButton, CInputGroup, 
     CDataTable,
    CButton, CCheckbox,CModal} 
    from "@frontend-appointment/ui-elements";
    import "./ExistingRoster";
import ExistingRooster from './ExistingRoster';


class DoctorDutyRoosterAdd extends PureComponent {
    state={show:false}
    handleShow=()=>{
        this.setState(prevState =>({
            show:!prevState.show
        }))
    }
    render() {
        const modalBody=(<ExistingRooster/>)
        return ( <>
            <Container className="p-0" fluid>

                <Row className="mb-2">
                <Col md={12} lg={5} className="info-container">
                    <div className="doctor-info bg-white p-4">
                        <h5 className="title">Doctor Info</h5>
                        <Form>
                            <Form.Label>Date</Form.Label>
                                <div className="d-flex">
                                <CHybridInput placeholder="From" />
                                &nbsp;&nbsp;
                                <CHybridInput placeholder="To" />
                                </div>

                            <CHybridSelect
                                id="hospital"
                                label="Hospital"
                                name="hospital"
                                placeholder="Select hospital."
                            />

                            <CHybridSelect
                                id="specialization"
                                label="Specialization"
                                name="specialization"
                                placeholder="Select specialization."
                            />

                            <CHybridSelect
                                id="doctor"
                                label="Doctor"
                                name="doctor"
                                placeholder="Select doctor"
                            />

                           

                            <CHybridInput
                             id="duration"
                                label="Duration"
                                type="number"
                                placeholder="Enter Duration In Minutes"
                            />                
                        </Form>

                        <CButton href="" variant="link" size="lg"  onClickHandler={this.handleShow} name="">*Existing Availability</CButton>
                    </div>
                </Col>

                <Col md={12} lg={7} className="">
                    <div className="doctor-availability bg-white p-4">
                    <h5 className="title">Doctor Availability</h5>
                        <Row className="header">
                            <Col> Days</Col>
                            <Col> Start Time</Col>
                            <Col> End Time</Col>
                            <Col>  <CCheckbox id="check-all-menu"
                                       label="Days Off"
                                       className="select-all check-all"/>
                                       </Col>
                        </Row>
                        <Row className="main-content mt-3">
                            <Col> Sunday</Col>
                            <Col> Start Time</Col>
                            <Col> End Time</Col>
                            <Col> <CCheckbox id="check"
                            label="&nbsp;"
                            className=" ">
                                </CCheckbox>
                            </Col>
                        </Row>
                        <Row className="main-content">
                            <Col> Monday</Col>
                            <Col> Start Time</Col>
                            <Col> End Time</Col>
                            <Col> <CCheckbox id="check"
                            label="&nbsp;"
                            className=" ">
                                </CCheckbox>
                            </Col>
                        </Row>
                        <Row className="main-content">
                            <Col> Tuesday</Col>
                            <Col> Start Time</Col>
                            <Col> End Time</Col>
                            <Col> <CCheckbox id="check"
                            label="&nbsp;"
                            className=" ">
                                </CCheckbox>
                            </Col>
                        </Row>
                        <Row className="main-content">
                            <Col> Wednesday</Col>
                            <Col> Start Time</Col>
                            <Col> End Time</Col>
                            <Col> <CCheckbox id="check"
                            label="&nbsp;"
                            className=" ">
                                </CCheckbox>
                            </Col>
                        </Row>
                        <Row className="main-content">
                            <Col> Thursday</Col>
                            <Col> Start Time</Col>
                            <Col> End Time</Col>
                            <Col> <CCheckbox id="check"
                            label="&nbsp;"
                            className=" ">
                                </CCheckbox>
                            </Col>
                        </Row>
                        <Row className="main-content">
                            <Col> Friday</Col>
                            <Col> Start Time</Col>
                            <Col> End Time</Col>
                            <Col> <CCheckbox id="check"
                            label="&nbsp;"
                            className=" ">
                                </CCheckbox>
                            </Col>
                        </Row>
                        <Row className="main-content">
                            <Col> Saturday</Col>
                            <Col> Start Time</Col>
                            <Col> End Time</Col>
                            <Col> <CCheckbox id="check"
                            label="&nbsp;"
                            className=" ">
                                </CCheckbox>
                            </Col>
                        </Row>
                    
                    </div>
               

                </Col>
                </Row>

                <Row>
                    <Col>
                    <div className="doctor-override bg-white mt-2">
                        <Row>
                            <Col> <CCheckbox id="check--override"
                                       label="Override"
                                       className="select-all check-all"/>
                             </Col>
                             <Col>
                             <CButton
                             id="add-override"
                             variant='outline-secondary'
                             size='lg'
                             name='Add More'
                             className="pull-right"
                             >
                             </CButton>
                             </Col>
                        </Row>

                       

                                       
                    </div>

                
                    </Col>
                </Row>
            </Container>

       

 
  

    <CModal 
        show={this.state.show}
                modalHeading="Existing Doctor Roster"
                size="lg"
                bodyChildren={modalBody}
                onHide={this.handleShow}
                centered={false}
                dialogClassName="preview-modal"
                // footerChildren={<CButton
                //     id="departmentConfirm"
                //     variant="primary"
                //     size="lg"
                //     className="float-right btn-action"
                //     onClickHandler={onConfirmClick}/>}
                closeButton={true}></CModal>
        </>)
    }

}

export default DoctorDutyRoosterAdd