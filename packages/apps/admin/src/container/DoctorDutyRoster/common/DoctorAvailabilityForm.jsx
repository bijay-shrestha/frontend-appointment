import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CCheckbox, CHybridTimePicker} from "@frontend-appointment/ui-elements";
//import {CEnglishDatePicker, CTimePicker} from "@frontend-appointment/ui-components";

const DoctorAvailabilityForm = ({
                                    doctorAvailabilityData,
                                    handleDoctorAvailabilityFormChange,
                                    wholeWeekOff,
                                    handleWholeWeekOff,
                                    type,
                                    rosterGapDuration
                                }) => {
    return <>
        <Col md={12} lg={7} className="">
            <div className="doctor-availability bg-white p-4">
                <h5 className="title">Doctor Availability</h5>
                <Row className="header">
                    <Col> Days</Col>
                    <Col>
                        Start Time
                    </Col>
                    <Col> End Time</Col>
                    <Col>
                        {type === 'ADD' ?
                            <CCheckbox
                                id="check-all-menu"
                                label="Days Off"
                                className="select-all check-all"
                                checked={wholeWeekOff === 'Y'}
                                onChange={handleWholeWeekOff}
                            /> : "Days Off"
                        }
                    </Col>
                </Row>
                {
                    doctorAvailabilityData.map((day, index) => (
                        <div key={day.weekDaysName.concat("-" + index)}>
                            <Row className="main-content" key={day.weekDaysName.concat("-" + day.weekDaysId)}>
                                <Col>{day.weekDaysName}</Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"startTime".concat(day.weekDaysId)}
                                            name={"startTime".concat(day.weekDaysId)}
                                            label=""
                                            onChange={(val) => handleDoctorAvailabilityFormChange(val, 'startTime', index)}
                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            isDisabled={day.dayOffStatus === 'Y'}
                                            value={day.dayOffStatus !== "Y"?day.startTime:{value:"00:00",label:"00:00"}}
                                            isClearable={true}
                                        />
                                        {/*<CTimePicker*/}
                                        {/*    id={"startTime".concat(day.weekDaysId)}*/}
                                        {/*    name={"startTime".concat(day.weekDaysId)}*/}
                                        {/*    label="00:00"*/}
                                        {/*    onChange={(val) => handleDoctorAvailabilityFormChange(val, 'startTime', index)}*/}
                                        {/*    selected={day.startTime}*/}
                                        {/*    showTimeSelect={true}*/}
                                        {/*    showTimeSelectOnly={true}*/}
                                        {/*    timeIntervals={rosterGapDuration ? rosterGapDuration : 15}*/}
                                        {/*    timeCaption="Start Time"*/}
                                        {/*    dateFormat="h:mm aa"*/}
                                        {/*    disabled={day.dayOffStatus === 'Y'}*/}
                                        {/*    inputType="normal"*/}
                                        {/*/>*/}
                                    </div>
                                </Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"endTime".concat(day.weekDaysId)}
                                            name={"endTime".concat(day.weekDaysId)}
                                            label=""
                                            onChange={(val) => handleDoctorAvailabilityFormChange(val, 'endTime', index)}
                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            isDisabled={day.dayOffStatus === 'Y'}
                                            value={day.dayOffStatus !== "Y"?day.endTime:{value:"23:59",label:"23:59"}}
                                            isClearable={true}
                                        />
                                        {/*<CTimePicker*/}
                                        {/*    id={"endTime".concat(day.weekDaysId)}*/}
                                        {/*    name={"endTime".concat(day.weekDaysId)}*/}
                                        {/*    label="00:00"*/}
                                        {/*    onChange={(val) => handleDoctorAvailabilityFormChange(val, 'endTime', index)}*/}
                                        {/*    selected={day.endTime}*/}
                                        {/*    showTimeSelect={true}*/}
                                        {/*    showTimeSelectOnly={true}*/}
                                        {/*    timeIntervals={rosterGapDuration ? rosterGapDuration : 15}*/}
                                        {/*    timeCaption="End Time"*/}
                                        {/*    dateFormat="h:mm aa"*/}
                                        {/*    disabled={day.dayOffStatus === 'Y'}*/}
                                        {/*/>*/}
                                    </div>
                                </Col>
                                <Col>
                                    <CCheckbox id={"dayOffStatus".concat(day.weekDaysId)}
                                               label="&nbsp;"
                                               className=" "
                                               checked={day.dayOffStatus === 'Y'}
                                               onChange={(e) => handleDoctorAvailabilityFormChange(e, '', index)}>
                                    </CCheckbox>
                                </Col>
                            </Row>
                            <div>
                                {day.errorMessage ?
                                    <p className="time-error">
                                        {day.errorMessage}</p> : ''}
                            </div>
                        </div>
                    ))
                }
            </div>
        </Col>
    </>
};

export default DoctorAvailabilityForm;
