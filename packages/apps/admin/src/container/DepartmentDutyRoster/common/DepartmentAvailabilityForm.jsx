import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CCheckbox, CHybridTimePicker} from "@frontend-appointment/ui-elements";

const DepartmentAvailabilityForm = ({departmentAvailabilityFormData}) => {
    const {
        departmentAvailabilityData,
        handleDepartmentAvailabilityFormChange,
        wholeWeekOff,
        handleWholeWeekOff,
        type,
        rosterGapDuration
    } = departmentAvailabilityFormData;
    return <>
        <Col md={12} lg={7} className="">
            <div className="department-availability bg-white p-4">
                <h5 className="title">Department Availability</h5>
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
                    departmentAvailabilityData.map((day, index) => (
                        <div key={day.weekDaysName.concat("-" + index)}>
                            <Row className="main-content" key={day.weekDaysName.concat("-" + day.weekDaysId)}>
                                <Col>{day.weekDaysName}</Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"startTime".concat(day.weekDaysId)}
                                            name={"startTime".concat(day.weekDaysId)}
                                            label=""
                                            onChange={(val) => handleDepartmentAvailabilityFormChange(val, 'startTime', index)}
                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            isDisabled={day.dayOffStatus === 'Y'}
                                            value={day.dayOffStatus !== "Y" ? day.startTime : {
                                                value: "00:00",
                                                label: "00:00"
                                            }}
                                            isClearable={true}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"endTime".concat(day.weekDaysId)}
                                            name={"endTime".concat(day.weekDaysId)}
                                            label=""
                                            onChange={(val) => handleDepartmentAvailabilityFormChange(val, 'endTime', index)}
                                            duration={rosterGapDuration ? rosterGapDuration : 15}
                                            placeholder="00:00"
                                            isDisabled={day.dayOffStatus === 'Y'}
                                            value={day.dayOffStatus !== "Y" ? day.endTime : {
                                                value: "23:59",
                                                label: "23:59"
                                            }}
                                            isClearable={true}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <CCheckbox id={"dayOffStatus".concat(day.weekDaysId)}
                                               label="&nbsp;"
                                               className=" "
                                               checked={day.dayOffStatus === 'Y'}
                                               onChange={(e) => handleDepartmentAvailabilityFormChange(e, '', index)}>
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

export default DepartmentAvailabilityForm;
