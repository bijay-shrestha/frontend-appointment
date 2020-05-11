import React from 'react';
import {Accordion, Card, Col, Container, Row} from "react-bootstrap";
import {CButton, CScrollbar} from "@frontend-appointment/ui-elements";

const WeekdaysRosterForm = ({weekdaysRosterFormData}) => {
    const {shiftDetails} = weekdaysRosterFormData;
    return <>
        <div className=" ">
            <Container className="bg-white add-container " fluid>

                <Row>
                    <Col sm={12} md={6} lg={3} className="menu-list-wrapper">
                        <h5 className="title">&nbsp;</h5>
                        <div className="assign-menu">
                            <div className="am-header">
                                <span className="am-title">
                                    Shifts
                                </span>
                            </div>
                            <CScrollbar
                                id="menus"
                                autoHide={true}
                                style={{height: 312}}>
                                {
                                    shiftDetails.length ?
                                        <Accordion className="menu-accordion"
                                                   // activeKey={this.state.activeKey ? this.state.activeKey : this.props.defaultSelectedMenu.id}
                                        >
                                            {shiftDetails.map(shift =>
                                                <Card
                                                    key={shift.id}>
                                                    <Accordion.Toggle
                                                        eventKey={shift.shiftId}
                                                        key={shift.shiftId}
                                                        as={Card.Header}
                                                        // className={
                                                        //     (this.state.activeKey ? this.state.activeKey
                                                        //     : this.props.defaultSelectedMenu.id) === shift.id ?
                                                        //     'activeParent' : ''
                                                        // }
                                                        // onClick={() => this.handleAccordionSelect(shift)}
                                                    >
                                                        <span>{shift.shiftName}</span>
                                                    </Accordion.Toggle>
                                                </Card>
                                            )}
                                        </Accordion> :
                                        ''

                                }

                            </CScrollbar>
                        </div>
                    </Col>

                    <Col sm={12} md={6} lg={5} className="roles-wrapper">
                        <div className="assign-previledge">
                            <div className="am-header">
                                <span className="am-title">
                                    Availability
                                </span>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="mt-4">
                    <Col sm={12} md={{span: 3, offset: 9}}>
                        <CButton
                            id="save"
                            name="Save"/>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
};

export default WeekdaysRosterForm;
