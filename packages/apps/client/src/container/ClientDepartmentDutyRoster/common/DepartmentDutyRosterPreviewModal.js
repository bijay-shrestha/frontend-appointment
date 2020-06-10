import React from 'react';
import { Col, Container, Form, Row } from "react-bootstrap";
import {
    CEnglishDatePicker,
    DayOffStatusLabel,
    EndTimeDisplayForTable,
    FromDateDisplayForTable,
    StartTimeDisplayForTable,
    ToDateDisplayForTable
} from "@frontend-appointment/ui-components";
import { CDataTable, CFLabel, CHybridInput, CHybridTextArea, CRadioButton } from "@frontend-appointment/ui-elements";
import { DateTimeFormatterUtils } from "@frontend-appointment/helpers";
import { AuditableEntityHoc } from '@frontend-appointment/commons'

const DepartmentDutyRosterPreviewModal = ({
    departmentInfoData,
    departmentAvailabilityData,
    hasOverrideDutyRoster,
    departmentDutyRosterOverrideRequestDTOS,
    type
}) => {

    return <>
        <Container className="" fluid>
            <Row className="mb-3">
                <Col md={12} lg={4} className="p-0">
                    <div className="doctor-info bg-white p-4">
                        <h5 className="title mb-4">General Information</h5>
                        <Form>
                            <div className="d-flex">
                                <CEnglishDatePicker
                                    id="from-date"
                                    name="fromDate"
                                    label="From Date"
                                    dateFormat="yyyy-MM-dd"
                                    minDate={0}
                                    showDisabledMonthNavigation={true}
                                    selected={departmentInfoData.fromDate}
                                    peekNextMonth={true}
                                    showMonthDropdown={true}
                                    showYearDropdown={true}
                                    dropdownMode="select"
                                    disabled={true}
                                    onChange={() => {
                                    }}
                                />
                                &nbsp;&nbsp;
                                <CEnglishDatePicker
                                    id="to-date"
                                    name="toDate"
                                    label="To Date"
                                    dateFormat="yyyy-MM-dd"
                                    minDate={0}
                                    showDisabledMonthNavigation={true}
                                    selected={departmentInfoData.toDate}
                                    peekNextMonth={true}
                                    showMonthDropdown={true}
                                    showYearDropdown={true}
                                    dropdownMode="select"
                                    disabled={true}
                                    onChange={() => {
                                    }}
                                />
                            </div>

                            <CHybridInput
                                id="department"
                                name="department"
                                placeholder="Department"
                                value={departmentInfoData.department && departmentInfoData.department.label}
                                disabled={true}
                            />

                            <div className="room-check">

                                <i className={departmentInfoData.isRoomEnabled === 'Y' ?
                                    "fa fa-check" : "fa fa-close"} /> <CFLabel id={"isRoomEnabled"}
                                        labelName={"Enable Room"} />

                                {
                                    departmentInfoData.isRoomEnabled === 'Y' ?
                                        <CHybridInput
                                            id="room"
                                            name="room"
                                            placeholder="room"
                                            value={departmentInfoData.room && departmentInfoData.room.label}
                                            disabled={true}
                                        /> : ''

                                }
                            </div>

                            <CHybridInput
                                id="duration"
                                label="Duration"
                                type="number"
                                name="rosterGapDuration"
                                placeholder="Duration In Minutes."
                                value={departmentInfoData.rosterGapDuration}
                                disabled={true}
                            />

                            <CFLabel labelName="Status" id="status" />
                            <div>
                                <CRadioButton
                                    checked={departmentInfoData.status === 'Y'}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    readOnly={true}
                                    disabled={true}
                                />
                                <CRadioButton
                                    checked={departmentInfoData.status === 'N'}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    readOnly={true}
                                    disabled={true}
                                />
                            </div>
                            {
                                type === 'ADD' ?
                                    '' :
                                    <CHybridTextArea
                                        id="remarks"
                                        className="mt-3"
                                        name="remarks"
                                        placeholder="Remarks"
                                        disabled={true}
                                        value={departmentInfoData.remarks || 'N/A'}
                                    />
                            }


                        </Form>
                    </div>
                </Col>

                <Col md={12} lg={8} className="pr-0">
                    <div className="department-availability bg-white p-4">
                        <h5 className="title">Department Availability</h5>
                        <Row className="header">
                            <Col> Days</Col>
                            <Col>
                                Start Time
                            </Col>
                            <Col> End Time</Col>
                            <Col>
                                Off
                            </Col>
                            <Col>
                                Available Doctors
                            </Col>
                        </Row>
                        {
                            departmentAvailabilityData.map((day, index) => (
                                <Row className="main-content" key={day.weekDaysName.concat("-" + day.weekDaysId)}>
                                    <Col>{day.weekDaysName}</Col>

                                    <Col>
                                        {type === 'ADD' ? DateTimeFormatterUtils.convertDateToHourMinuteFormat(day.startTime) :
                                            DateTimeFormatterUtils.convertDateToHourMinuteFormat(new Date(day.startTime))}

                                    </Col>
                                    <Col>
                                        {type === 'ADD' ? DateTimeFormatterUtils.convertDateToHourMinuteFormat(day.endTime) :
                                            DateTimeFormatterUtils.convertDateToHourMinuteFormat(new Date(day.endTime))}

                                    </Col>
                                    <Col>
                                        {day.dayOffStatus === 'Y' ? <i className="fa fa-check-circle" /> :
                                            ''}
                                    </Col>
                                    <Col>
                                        {day.dayOffStatus !== 'Y' ?
                                            <ul className="doctor-list">
                                                {day.weekDaysDoctorInfo && day.weekDaysDoctorInfo.map(doctor => (
                                                    <li className="">
                                                        {doctor.fileUri ?
                                                            <img src={doctor.fileUri} alt={doctor.label[0].toUpperCase()} /> :
                                                            <div className="anchor-icon">
                                                                {doctor.label.charAt(0).toUpperCase()}
                                                            </div>}
                                                        {doctor.label}
                                                    </li>
                                                ))}
                                            </ul>
                                            : ''}
                                    </Col>
                                </Row>
                            ))
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                {hasOverrideDutyRoster === 'Y' ?
                    <Col className="department-override">
                        <h5 className="title">Overrides</h5>
                        {hasOverrideDutyRoster === 'Y' && departmentDutyRosterOverrideRequestDTOS.length ?
                            <>
                                <CDataTable
                                    classes="ag-theme-balham"
                                    id="roles-table"
                                    width="100%"
                                    height="260px"
                                    enableSorting
                                    editType
                                    columnDefs={[
                                        {
                                            headerName: 'From Date',
                                            field: 'fromDate',
                                            cellRenderer: 'fromDateRenderer',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true
                                        },
                                        {
                                            headerName: 'To Date',
                                            field: 'toDate',
                                            cellRenderer: 'toDateRenderer',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true
                                        },
                                        {
                                            headerName: 'Start Time',
                                            field: 'startTime',
                                            cellRenderer: 'startTimeRenderer',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true
                                        },
                                        {
                                            headerName: 'End Time',
                                            field: 'endTime',
                                            cellRenderer: 'endTimeRenderer',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true,
                                        },
                                        {
                                            headerName: 'Off',
                                            field: 'dayOffStatus',
                                            cellRenderer: 'childLabelRenderer',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true,
                                        },
                                        {
                                            headerName: 'Remarks',
                                            field: 'remarks',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true,
                                        },

                                    ]}
                                    frameworkComponents={{
                                        // childActionRenderer: OverrideActions,
                                        startTimeRenderer: StartTimeDisplayForTable,
                                        endTimeRenderer: EndTimeDisplayForTable,
                                        childLabelRenderer: DayOffStatusLabel,
                                        fromDateRenderer: FromDateDisplayForTable,
                                        toDateRenderer: ToDateDisplayForTable
                                    }}
                                    defaultColDef={{ resizable: true }}
                                    rowSelection={'single'}
                                    rowData={departmentDutyRosterOverrideRequestDTOS}
                                />
                            </>
                            : (hasOverrideDutyRoster === 'Y' && !departmentDutyRosterOverrideRequestDTOS.length ?
                                <div className="filter-message">
                                    <div className="no-data">
                                        <i className="fa fa-file-text-o" />
                                    </div>
                                    <div className="message"> No overrides added!</div>
                                </div> : '')
                        }
                    </Col>
                    : ''
                }

            </Row>

            {type !== "ADD" ?
                <Row className="mt-4 department-availability bg-white px-2 pt-4">
                    {AuditableEntityHoc(departmentInfoData.auditableDepartment, false, 4)}
                </Row> :
                ''
            }
        </Container>
    </>
};

export default DepartmentDutyRosterPreviewModal;
