import React from 'react';
import {Accordion, Card, Col} from "react-bootstrap";
import {CScrollbar} from "@frontend-appointment/ui-elements";

const WeekdaysRosterShift = ({
                                 shiftDetails,
                                 activeShiftKey,
                                 handleShiftAccordionSelect
                             }) => {
    return <>
        <Col md={12} lg={5} className="info-container">
            <div className="doctor-info bg-white p-4">
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
                                <Accordion
                                    className="menu-accordion"
                                    activeKey={activeShiftKey ? activeShiftKey : shiftDetails[0].shiftId}>
                                    {shiftDetails.map(shift =>
                                        <Card
                                            key={"shift" + shift.shiftId}>
                                            <Accordion.Toggle
                                                eventKey={shift.shiftId}
                                                key={shift.shiftId}
                                                as={Card.Header}
                                                className={
                                                    (activeShiftKey ? activeShiftKey
                                                        : shiftDetails[0].shiftId) === shift.shiftId ?
                                                        'activeParent' : ''
                                                }
                                                onClick={() => handleShiftAccordionSelect(shift)}>
                                                <span>{shift.shiftName}</span>
                                            </Accordion.Toggle>
                                        </Card>
                                    )}
                                </Accordion> :
                                ''
                        }

                    </CScrollbar>
                </div>
            </div>
        </Col>
    </>
};

export default WeekdaysRosterShift;
