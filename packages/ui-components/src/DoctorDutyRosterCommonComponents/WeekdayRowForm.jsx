import React from 'react';
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {CButton, CCheckbox, CHybridSelect, CHybridTimePicker} from "@frontend-appointment/ui-elements";

const WeekdayRowForm = ({
                            weekDayRowFormProps
                        }) => {
    const {
        selectedShift,
        weekdaysDetail,
        rosterGapDuration,
        handleWeekdaysFormChange
    } = weekDayRowFormProps;
    return <>
        {
            weekdaysDetail &&
            weekdaysDetail.map((weekdayData, weekdayIndex) =>
                <Card
                    key={"weekday" + weekdayData.weekDaysId}>
                    <Card.Header>
                        <div key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                            <Row className="main-content"
                                 key={weekdayData.weekDaysName.concat("-" + weekdayData.weekDaysId)}>
                                <Col>{weekdayData.weekDaysName}</Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"startTime".concat(weekdayData.weekDaysId)}
                                            name={"startTime"}
                                            label=""
                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            onChange={(event) => handleWeekdaysFormChange(event, selectedShift, weekdayIndex)}
                                            isDisabled={selectedShift.wholeWeekOff === 'Y' || weekdayData.dayOffStatus === 'Y'}
                                            value={weekdayData.startTime}
                                            isClearable={true}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"endTime".concat(weekdayData.weekDaysId)}
                                            name={"endTime"}
                                            label=""
                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            onChange={(event) => handleWeekdaysFormChange(event, selectedShift, weekdayIndex)}
                                            isDisabled={selectedShift.wholeWeekOff === 'Y' || weekdayData.dayOffStatus === 'Y'}
                                            value={weekdayData.endTime}
                                            isClearable={true}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <CCheckbox
                                        id={"weekdayOffStatus".concat(weekdayData.weekDaysId)}
                                        label="&nbsp;"
                                        name="dayOffStatus"
                                        className=" "
                                        checked={weekdayData.dayOffStatus === 'Y'}
                                        onChange={(event) => handleWeekdaysFormChange(event, selectedShift, weekdayIndex)}
                                    />

                                </Col>
                                <Col>
                                    <Accordion.Toggle
                                        as={Button}
                                        variant="link"
                                        eventKey={weekdayData.weekDaysId}
                                        className={weekdayData.breakDetail.length ?'':"inactive"}>
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
                                                    duration={rosterGapDuration ? rosterGapDuration : 15}
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
                                                    duration={rosterGapDuration ? rosterGapDuration : 15}
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
            )

        }


    </>
};

export default WeekdayRowForm;
