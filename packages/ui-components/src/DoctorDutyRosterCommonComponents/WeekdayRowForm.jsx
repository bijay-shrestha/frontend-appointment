import React from 'react';
import {Accordion, Card, Col, Row, Button} from "react-bootstrap";
import {CButton, CCheckbox, CHybridSelect, CHybridTimePicker} from "@frontend-appointment/ui-elements";

const WeekdayRowForm = ({weekdayData,rosterGapDuration}) => {
    return <>
        <Card
            key={"weekday" + weekdayData.weekDaysId}>
            <Card.Header>
                <div key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                    <Row className="main-content" key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                        <Col>{weekdayData.weekDaysName}</Col>
                        <Col>
                            <div className="time-picker">
                                <CHybridTimePicker
                                    id={"startTime".concat(weekdayData.weekDaysId)}
                                    name={"startTime".concat(weekdayData.weekDaysId)}
                                    label=""
                                    onChange={(val) => {
                                    }}
                                    duration={rosterGapDuration ? rosterGapDuration:15}
                                    placeholder="00:00"
                                    // isDisabled={weekdayData.weekdayOffStatus === 'Y'}
                                    value={weekdayData.startTime}
                                    isClearable={true}
                                />
                            </div>
                        </Col>
                        <Col>
                            <div className="time-picker">
                                <CHybridTimePicker
                                    id={"endTime".concat(weekdayData.weekDaysId)}
                                    name={"endTime".concat(weekdayData.weekDaysId)}
                                    label=""
                                    // onChange={(val) => handleDoctorAvailabilityFormChange(val, 'endTime', index)}
                                    duration={rosterGapDuration ? rosterGapDuration:15}
                                    // duration={rosterGapDuration ? rosterGapDuration : 15}
                                    placeholder="00:00"
                                    isDisabled={weekdayData.weekdayOffStatus === 'Y'}
                                    value={weekdayData.endTime}
                                    isClearable={true}
                                />
                            </div>
                        </Col>
                        <Col>
                            <CCheckbox id={"weekdayOffStatus".concat(weekdayData.weekDaysId)}
                                       label="&nbsp;"
                                       className=" "
                                // checked={weekdayData.weekdayOffStatus === 'Y'}
                                // onChange={(e) => handleDoctorAvailabilityFormChange(e, '', index)}
                            />

                        </Col>
                        <Col>
                            <Accordion.Toggle as={Button} variant="link" eventKey={weekdayData.weekDaysId}>
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
            </Card.Header>
            <Accordion.Collapse eventKey={weekdayData.weekDaysId}>
                <Card.Body>
                    {weekdayData.breakDetail.length ?
                        <div key={weekdayData.breakDetail.id}>
                            <Row className="main-content"
                                 key={weekdayData.breakDetail.id}>
                                <Col>
                                    <CHybridSelect
                                        id="break-type"/>
                                </Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"startTime".concat(weekdayData.weekDaysId)}
                                            name={"startTime".concat(weekdayData.weekDaysId)}
                                            label=""
                                            onChange={(val) => {
                                            }}
                                            duration={rosterGapDuration ? rosterGapDuration:15}
                                            placeholder="00:00"
                                            // isDisabled={weekdayData.weekdayOffStatus === 'Y'}
                                            // value={weekdayData.startTime}
                                            isClearable={true}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"endTime".concat(weekdayData.weekDaysId)}
                                            name={"endTime".concat(weekdayData.weekDaysId)}
                                            label=""
                                            // onChange={(val) => handleDoctorAvailabilityFormChange(val, 'endTime', index)}
                                            duration={rosterGapDuration ? rosterGapDuration:15}
                                            // duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            // isDisabled={weekdayData.weekdayOffStatus === 'Y'}
                                            // value={weekdayData.endTime}
                                            isClearable={true}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                </Col>
                                <Col>
                                    <i className="fa fa-plus"/>
                                </Col>
                            </Row>
                            <div>
                                {weekdayData.errorMessage ?
                                    <p className="time-error">
                                        {weekdayData.errorMessage}</p> : ''}
                            </div>
                        </div>
                        :
                        <div key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                            <Row className="main-content"
                                 key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                                <CButton
                                    id="add-break"
                                    name="Add Break"
                                    onClickHandler={() => {
                                    }}
                                />
                            </Row>
                        </div>
                    }
                </Card.Body>
            </Accordion.Collapse>
        </Card>

    </>
};

export default WeekdayRowForm;
