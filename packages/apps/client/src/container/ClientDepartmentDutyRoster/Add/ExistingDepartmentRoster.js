import React, {memo} from 'react';
import {Col, Container, Row} from "react-bootstrap";

import {CDataTable} from "@frontend-appointment/ui-elements";
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";
import {DayOffStatusLabel, EndTimeDisplayForTable, StartTimeDisplayForTable} from "@frontend-appointment/ui-components";


const ExistingDepartmentRoster = ({
                                      existingRosterModalData,
                                  }) => {
    const {
        existingRosterTableData,
        onViewDetailsExisting,
        existingDepartmentWeekDaysAvailability,
        existingOverrides,
        existingRostersDetailErrorMessage
    } = existingRosterModalData;
    return <>
        <Container className="p-0" fluid>
            <Row className="">

                <Col md={12} lg={12} className="mb-2">
                    <div className="department-availability bg-white">
                        {
                            existingRosterTableData.length ?
                                <CDataTable
                                    classes="ag-theme-balham"
                                    id="roster-table"
                                    width="100%"
                                    height="260px"
                                    enableSorting
                                    editType
                                    columnDefs={[
                                        {
                                            headerName: 'From Date',
                                            field: 'fromDate',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true
                                        },
                                        {
                                            headerName: 'To Date',
                                            field: 'toDate',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true
                                        },
                                        {
                                            headerName: 'Time Duration',
                                            field: 'rosterGapDuration',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true,
                                        },
                                        {
                                            headerName: 'Room Number',
                                            field: 'roomNumber',
                                            resizable: true,
                                            sortable: true,
                                            sizeColumnsToFit: true,
                                        },
                                    ]}
                                    defaultColDef={{resizable: true}}
                                    getSelectedRows={onViewDetailsExisting}
                                    rowSelection={'single'}
                                    rowData={existingRosterTableData}
                                /> : ''
                        }

                    </div>
                    <div>
                        {existingRostersDetailErrorMessage ? <p className="error-message">
                            <i className="fa fa-exclamation-triangle"/>&nbsp;{existingRostersDetailErrorMessage}
                        </p> : ''}
                    </div>
                </Col>

                {
                    existingDepartmentWeekDaysAvailability.length ?
                        <Col md={12} lg={12} className="">
                            <div className="department-availability bg-white p-4">
                                <h5 className="title">Department Availability</h5>
                                <Row className="header">
                                    <Col> Days</Col>
                                    <Col> Start Time</Col>
                                    <Col> End Time</Col>
                                    <Col> Off</Col>
                                    <Col> Doctors</Col>
                                </Row>
                                {
                                    existingDepartmentWeekDaysAvailability.map(weekDay => (
                                        <Row className="main-content mt-3">
                                            <Col> {weekDay.weekDaysName}</Col>
                                            <Col>{DateTimeFormatterUtils.convertDateToHourMinuteFormat(new Date(weekDay.startTime))}</Col>
                                            <Col>{DateTimeFormatterUtils.convertDateToHourMinuteFormat(new Date(weekDay.endTime))}</Col>
                                            <Col> {weekDay.dayOffStatus === 'Y' ?
                                                <i className="fa fa-check-circle"/> : ''}</Col>

                                            <Col>

                                            <ul className="doctor-list">
                                                {weekDay.weekDaysDoctorInfo && weekDay.weekDaysDoctorInfo.map(doctor => (
                                                    <li>
                                                        {doctor.fileUri ?
                                                            <img src={doctor.fileUri}
                                                                 alt={doctor.label[0].toUpperCase()}/> :
                                                            <div className="anchor-icon">
                                                                {doctor.label.charAt(0).toUpperCase()}
                                                            </div>}
                                                        {doctor.label}
                                                    </li>
                                                ))}
                                                </ul>

                                            </Col>
                                        </Row>
                                    ))
                                }
                            </div>
                        </Col> : ''
                }
            </Row>

            <Row>
                <Col>
                    {existingOverrides.length ?
                        <div className="doctor-override bg-white mt-2">
                            <Row>
                                <Col md={12} lg={12}>
                                    <i className="fa fa-check"/> Override
                                    {/*<CCheckbox id="check--override"*/}
                                    {/*           label="Override"*/}
                                    {/*           className="select-all check-all"/>*/}
                                </Col>

                                <Col md={12} lg={12} className="">
                                    <div className="doctor-availability ">
                                        {
                                            existingOverrides.length ?
                                                <CDataTable
                                                    classes="ag-theme-balham"
                                                    id="override-table"
                                                    width="100%"
                                                    height="460px"
                                                    enableSorting
                                                    editType
                                                    columnDefs={[
                                                        {
                                                            headerName: 'From Date',
                                                            field: 'fromDate',
                                                            resizable: true,
                                                            sortable: true,
                                                            sizeColumnsToFit: true
                                                        },
                                                        {
                                                            headerName: 'To Date',
                                                            field: 'toDate',
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
                                                            sizeColumnsToFit: true
                                                        },
                                                        {
                                                            headerName: 'Day Off Status',
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
                                                        startTimeRenderer: StartTimeDisplayForTable,
                                                        endTimeRenderer: EndTimeDisplayForTable,
                                                        childLabelRenderer: DayOffStatusLabel
                                                    }}
                                                    defaultColDef={{resizable: true}}
                                                    rowSelection={'single'}
                                                    rowData={existingOverrides}
                                                /> : ''
                                        }

                                    </div>
                                </Col>
                            </Row>
                        </div> : ''
                    }
                </Col>
            </Row>
        </Container>
    </>
};

export default memo(ExistingDepartmentRoster)
