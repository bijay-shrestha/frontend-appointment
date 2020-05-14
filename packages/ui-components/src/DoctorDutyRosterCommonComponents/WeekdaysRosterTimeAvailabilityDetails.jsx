import React from 'react';
import {Accordion, Card, Col, Row} from "react-bootstrap";
import {CCheckbox, CScrollbar} from "@frontend-appointment/ui-elements";
import WeekdayRowForm from "./WeekdayRowForm";

const WeekdaysRosterTimeAvailabilityDetails = ({
                                                   selectedShift,
                                                   weekdaysDetail,
                                                   rosterGapDuration
                                               }) => {
    return <>
        <Col md={12} lg={7} className="">
            <div className="doctor-availability bg-white p-4">
                <h5 className="title">Time Availability Details
                    for <i>{selectedShift.shiftName} Shift</i></h5>
                <CScrollbar
                    id="menus"
                    autoHide={true}
                    style={{height: 512}}>
                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Row className="header">
                                    <Col> Days</Col>
                                    <Col>
                                        Start Time
                                    </Col>
                                    <Col> End Time</Col>
                                    <Col>
                                        {/*{type === 'ADD' ?*/}
                                        <CCheckbox
                                            id="check-all-menu"
                                            label="Off"
                                            className="select-all check-all"
                                            checked={selectedShift.wholeWeekOff === 'Y'}
                                            // onChange={handleWholeWeekOff}
                                        />
                                        {/*: "Off"*/}
                                        {/*}*/}
                                    </Col>
                                    <Col> Advanced Settings</Col>
                                </Row>
                            </Card.Header>
                        </Card>
                        {
                            weekdaysDetail && weekdaysDetail.length ?
                                weekdaysDetail.map(weekdayData =>
                                    <WeekdayRowForm key={weekdayData.weekDaysId}
                                                    weekdayData={weekdayData}
                                                    rosterGapDuration={rosterGapDuration}/>
                                )
                                :
                                <div className="filter-message">
                                    <div className="no-data">
                                        <i className="fa fa-file-text-o"/>
                                    </div>
                                    <div className="message"> No weekday data available.</div>
                                </div>
                        }
                    </Accordion>
                </CScrollbar>
            </div>
        </Col>
    </>
};

export default WeekdaysRosterTimeAvailabilityDetails;
