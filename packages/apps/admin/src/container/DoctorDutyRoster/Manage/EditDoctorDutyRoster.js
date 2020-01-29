import React, { PureComponent } from 'react';
import { Col, Container, Row, Form } from "react-bootstrap";
import "./../doctor-duty-roster.scss";

import {
    CFLabel, CForm, CHybridInput,
    CHybridSelect, CRadioButton, CInputGroup,
    CDataTable,
    CButton, CCheckbox, CModal
}
    from "@frontend-appointment/ui-elements";


class ExistingRooster extends PureComponent {


        state={show:false}
    handleShow=()=>{
        this.setState(prevState =>({
            show:!prevState.show
        }))
    }

    render() {
    const modalBody=(<h1>hi</h1>)

        return <>
            <Container className="p-0" fluid>
                <Row className="">

                    <Col md={12} lg={12} className="">
                        <div className="doctor-availability bg-white p-4">
                            <h5 className="title">Doctor Availability</h5>
                            <Row className="header">
                                <Col> Days</Col>
                                <Col> Start Time</Col>
                                <Col> End Time</Col>
                                <Col>  <CCheckbox id="check-all-menu"
                                    label="Days Off"
                                    className="select-all check-all" />
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
                                    className="select-all check-all" />
                                </Col>
                                <Col>
                                    <CButton
                                        id="add-override"
                                        variant='outline-secondary'
                                        size='lg'
                                        name='Add More'
                                        className="pull-right"
                                        onClickHandler={this.handleShow}
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
                modalHeading="Add Override"
                size="lg"
                bodyChildren={modalBody}
                onHide={this.handleShow}
                centered={false}
                dialogClassName="preview-modal"
                footerChildren={<CButton
                 name="Save"
                 size="lg"
                 />}
                //     id="departmentConfirm"
                //     variant="primary"
                //     size="lg"
                //     className="float-right btn-action"
                //     onClickHandler={onConfirmClick}/>}
                closeButton={true}></CModal>

        </>
    }
}

export default ExistingRooster