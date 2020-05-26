import React, {memo} from 'react';
import {Col, Container, Row} from "react-bootstrap";

import {CDataTable} from "@frontend-appointment/ui-elements";
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";
import StartTimeDisplayForTable from "../../CommonComponents/table-components/StartTimeDisplayForTable";
import EndTimeDisplayForTable from "../../CommonComponents/table-components/EndTimeDisplayForTable";
import DayOffStatusLabel from "../../CommonComponents/table-components/DayOffStatusLabel";


const ExistingDepartmentRoster = ({
                             existingRosterTableData,
                             onViewDetailsExisting,
                             existingDoctorWeekDaysAvailability,
                             existingOverrides,
                         }) => {
    return <>
        <Container className="p-0" fluid>
            <Row className="">

                <Col md={12} lg={12} className="mb-2">
                    <div className="doctor-availability bg-white p-4">

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
                                        // {
                                        //     headerName: 'Created By',
                                        //     field: 'createdBy',
                                        //     resizable: true,
                                        //     sortable: true,
                                        //     sizeColumnsToFit: true,
                                        // },
                                        // {
                                        //     headerName: 'Created Date',
                                        //     field: 'createdDate',
                                        //     resizable: true,
                                        //     sortable: true,
                                        //     sizeColumnsToFit: true,
                                        // },
                                    ]}
                                    frameworkComponents={{
                                        // childActionRenderer: OverrideActions,
                                        // childLabelRenderer: DayOffStatusLabel
                                    }}
                                    defaultColDef={{resizable: true}}
                                    getSelectedRows={onViewDetailsExisting}
                                    rowSelection={'single'}
                                    // setShowModal={setShowModal} // {this.showModal}
                                    rowData={existingRosterTableData}
                                /> : ''
                        }

                    </div>
                </Col>

                {
                    existingDoctorWeekDaysAvailability.length ?
                        <Col md={12} lg={12} className="">
                            <div className="doctor-availability bg-white p-4">
                                <h5 className="title">Doctor Availability</h5>
                                <Row className="header">
                                    <Col> Days</Col>
                                    <Col> Start Time</Col>
                                    <Col> End Time</Col>
                                    <Col> Days Off</Col>
                                </Row>
                                {
                                    existingDoctorWeekDaysAvailability.map(weekDay => (
                                        <Row className="main-content mt-3">
                                            <Col> {weekDay.weekDaysName}</Col>
                                            <Col>{DateTimeFormatterUtils.convertDateToHourMinuteFormat(new Date(weekDay.startTime))}</Col>
                                            <Col>{DateTimeFormatterUtils.convertDateToHourMinuteFormat(new Date(weekDay.endTime))}</Col>
                                            <Col> {weekDay.dayOffStatus === 'Y' ? <i className="fa fa-check-circle"/> :
                                                ''}</Col>
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
                                                    // getSelectedRows={onViewDetailsExisting}
                                                    rowSelection={'single'}
                                                    // setShowModal={setShowModal} // {this.showModal}
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
