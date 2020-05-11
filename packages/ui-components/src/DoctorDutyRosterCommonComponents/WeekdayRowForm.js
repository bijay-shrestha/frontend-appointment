import React from 'react';
import {Accordion, Card, Col, Row} from "react-bootstrap";
import {CCheckbox, CHybridTimePicker} from "@frontend-appointment/ui-elements";

const WeekdayRowForm = ({weekdayData,}) => {
    return <>
        <Card
            key={"weekday" + weekdayData.weekDaysId}>
            <div key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                <Row className="main-content" key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                    <Col>{weekdayData.weekDaysName}</Col>
                    <Col>
                        <div className="time-picker">
                            <CHybridTimePicker
                                id={"startTime".concat(weekdayData.weekDaysId)}
                                name={"startTime".concat(weekdayData.weekDaysId)}
                                label=""
                                onChange={(val) => {}}
                                duration={15}
                                placeholder="00:00"
                                // isDisabled={weekdayData.weekdayOffStatus === 'Y'}
                                value={weekdayData.startTime}
                                isClearable={true}
                            />
                        </div>
                    </Col>
                    <Col>
                        <div className="time-picker">
                            time
                            {/*<CHybridTimePicker*/}
                            {/*    id={"endTime".concat(weekdayData.weekDaysId)}*/}
                            {/*    name={"endTime".concat(weekdayData.weekDaysId)}*/}
                            {/*    label=""*/}
                            {/*    // onChange={(val) => handleDoctorAvailabilityFormChange(val, 'endTime', index)}*/}
                            {/*    // duration={rosterGapDuration ? rosterGapDuration : 15}*/}
                            {/*    placeholder="00:00"*/}
                            {/*    isDisabled={weekdayData.weekdayOffStatus === 'Y'}*/}
                            {/*    value={weekdayData.endTime}*/}
                            {/*    isClearable={true}*/}
                            {/*/>*/}
                        </div>
                    </Col>
                    <Col>
                        <CCheckbox id={"weekdayOffStatus".concat(weekdayData.weekDaysId)}
                                   label="&nbsp;"
                                   className=" "
                            // checked={weekdayData.weekdayOffStatus === 'Y'}
                            // onChange={(e) => handleDoctorAvailabilityFormChange(e, '', index)}
                        >
                        </CCheckbox>
                    </Col>
                    <Col>
                        <Accordion.Toggle
                            eventKey={weekdayData.weekDaysId}
                            key={weekdayData.weekDaysId}
                            as={Card.Header}
                            // className={
                            //     (activeShiftKey ? activeShiftKey
                            //         : weekdaysDataOfSelectedShift[0].shiftId) === weekdayData.weekDaysId ?
                            //         'activeParent' : ''
                            // }
                            // onClick={() => this.handleShiftAccordionSelect(weekdayData)}
                        >
                            <i className="fa fa-chevron-down"/>
                        </Accordion.Toggle>
                    </Col>
                </Row>
                <div>
                    {weekdayData.errorMessage ?
                        <p className="time-error">
                            {weekdayData.errorMessage}</p> : ''}
                </div>
            </div>
        </Card>

    </>
};

export default WeekdayRowForm;
