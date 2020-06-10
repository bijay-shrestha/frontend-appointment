import React from 'react';
import {Col, Row} from "react-bootstrap";
import {CCheckbox, CHybridSelectWithImage, CHybridTimePicker} from "@frontend-appointment/ui-elements";

const DepartmentAvailabilityForm = ({departmentAvailabilityFormData}) => {
    const {
        departmentAvailabilityData,
        handleDepartmentAvailabilityFormChange,
        wholeWeekOff,
        handleWholeWeekOff,
        type,
        rosterGapDuration,
        activeDoctorsByDepartment
    } = departmentAvailabilityFormData;
    return <>
        <Col md={12} lg={8} className="">
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
                                label="Off"
                                className="select-all check-all"
                                checked={wholeWeekOff === 'Y'}
                                onChange={handleWholeWeekOff}
                            /> : "Off"
                        }
                    </Col>
                    <Col>Available Doctors</Col>

                </Row>
                {
                    departmentAvailabilityData.map((day, index) => (
                        <div key={day.weekDaysName.concat("-" + index)}>
                            <Row className="main-content" key={day.weekDaysName.concat("-" + day.weekDaysId)}>
                                <Col>{(day.weekDaysName.slice(0,3).toUpperCase())}</Col>

                                <Col>
                                    <div className="time-picker">
                                        <CHybridTimePicker
                                            id={"startTime".concat(day.weekDaysId)}
                                            name={"startTime"}
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
                                            name={"endTime"}
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
                                               name="dayOffStatus"
                                               label="&nbsp;"
                                               className=" "
                                               checked={day.dayOffStatus === 'Y'}
                                               onChange={(e) => handleDepartmentAvailabilityFormChange(e, '', index)}>
                                    </CCheckbox>
                                </Col>
                                <Col>
                                    <CHybridSelectWithImage
                                        id={"doctor".concat(day.weekDaysId)}
                                        name="weekDaysDoctorInfo"
                                        onChange={(event) => handleDepartmentAvailabilityFormChange(event, '', index)}
                                        label=""
                                        options={activeDoctorsByDepartment}
                                        value={day.weekDaysDoctorInfo}
                                        required={true}
                                        placeholder={activeDoctorsByDepartment.length ? "Select Doctor(s)." : "No Doctor(s) available."}
                                        isDisabled={!activeDoctorsByDepartment.length || day.dayOffStatus === 'Y'}
                                        isMulti={true}
                                        className="multiple-select"
                                    />
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
