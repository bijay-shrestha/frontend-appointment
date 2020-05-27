import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {CEnglishDatePicker} from "@frontend-appointment/ui-components";
import {CDataTable, CFLabel, CHybridInput, CRadioButton} from "@frontend-appointment/ui-elements";
import DayOffStatusLabel from "../../CommonComponents/table-components/DayOffStatusLabel";
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";
import StartTimeDisplayForTable from "../../CommonComponents/table-components/StartTimeDisplayForTable";
import EndTimeDisplayForTable from "../../CommonComponents/table-components/EndTimeDisplayForTable";
import FromDateDisplayForTable from "../../CommonComponents/table-components/FromDateDisplayForTable";
import ToDateDisplayForTable from "../../CommonComponents/table-components/ToDateDisplayForTable";
import {AuditableEntityHoc} from '@frontend-appointment/commons'

const DepartmentDutyRosterPreviewModal = ({
                                              doctorInfoData,
                                              doctorAvailabilityData,
                                              hasOverrideDutyRoster,
                                              doctorDutyRosterOverrideRequestDTOS,
                                              type
                                          }) => {

    return <>
        <Container className="" fluid>
            <Row className="mb-3">
                <Col md={12} lg={5} className="p-0">
                    <div className="doctor-info bg-white p-4">
                        <h5 className="title mb-4">Doctor Information</h5>
                        <Form>
                            <div className="d-flex">
                                <CEnglishDatePicker
                                    id="from-date"
                                    name="fromDate"
                                    label="From Date"
                                    dateFormat="yyyy-MM-dd"
                                    minDate={0}
                                    showDisabledMonthNavigation={true}
                                    selected={doctorInfoData.fromDate}
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
                                    selected={doctorInfoData.toDate}
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
                                id="hospital"
                                label="Client"
                                name="hospital"
                                placeholder="Client"
                                value={doctorInfoData.hospital && doctorInfoData.hospital.label}
                                disabled={true}
                            />

                            <CHybridInput
                                id="specialization"
                                label="Specialization"
                                name="specialization"
                                placeholder="Specialization"
                                value={doctorInfoData.specialization && doctorInfoData.specialization.label}
                                disabled={true}
                            />
                            <CHybridInput
                                id="doctor"
                                label="Doctor"
                                name="doctor"
                                placeholder="Doctor"
                                value={doctorInfoData.doctor && doctorInfoData.doctor.label}
                                disabled={true}
                            />
                            <CHybridInput
                                id="duration"
                                label="Duration"
                                type="number"
                                name="rosterGapDuration"
                                placeholder="Duration In Minutes."
                                value={doctorInfoData.rosterGapDuration}
                                disabled={true}
                            />

                            <CFLabel labelName="Status" id="status"/>
                            <div>
                                <CRadioButton
                                    checked={doctorInfoData.status === 'Y'}
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    readOnly={true}
                                    disabled={true}
                                />
                                <CRadioButton
                                    checked={doctorInfoData.status === 'N'}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    readOnly={true}
                                    disabled={true}
                                />
                            </div>

                        </Form>
                    </div>
                </Col>

                <Col md={12} lg={7} className="pr-0">
                    <div className="doctor-availability bg-white p-4">
                        <h5 className="title">Doctor Availability</h5>
                        <Row className="header">
                            <Col> Days</Col>
                            <Col>
                                Start Time
                            </Col>
                            <Col> End Time</Col>
                            <Col>
                                Days Off

                            </Col>
                        </Row>
                        {
                            doctorAvailabilityData.map((day, index) => (
                                <Row className="main-content" key={day.weekDaysName.concat("-" + day.weekDaysId)}>
                                    <Col>{day.weekDaysName}</Col>
                                    <Col>
                                        {type === 'A' ? DateTimeFormatterUtils.convertDateToHourMinuteFormat(day.startTime) :
                                            DateTimeFormatterUtils.convertDateToHourMinuteFormat(new Date(day.startTime))}

                                    </Col>
                                    <Col>
                                        {type === 'A' ? DateTimeFormatterUtils.convertDateToHourMinuteFormat(day.endTime) :
                                            DateTimeFormatterUtils.convertDateToHourMinuteFormat(new Date(day.endTime))}

                                    </Col>
                                    <Col>
                                        {day.dayOffStatus === 'Y' ? <i className="fa fa-check-circle"/> :
                                            ''}
                                    </Col>
                                </Row>
                            ))
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                {hasOverrideDutyRoster === 'Y' ?
                    <Col className="doctor-override">
                        <h5 className="title">Overrides</h5>
                        {hasOverrideDutyRoster === 'Y' && doctorDutyRosterOverrideRequestDTOS.length ?
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
                                            headerName: 'Days Off',
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
                                    defaultColDef={{resizable: true}}
                                    rowSelection={'single'}
                                    rowData={doctorDutyRosterOverrideRequestDTOS}
                                />
                            </>
                            : (hasOverrideDutyRoster === 'Y' && !doctorDutyRosterOverrideRequestDTOS.length ?
                                <div className="filter-message">
                                    <div className="no-data">
                                        <i className="fa fa-file-text-o"/>
                                    </div>
                                    <div className="message"> No overrides added!</div>
                                </div> : '')
                        }
                    </Col>
                    : ''
                }

            </Row>

            <Row className="mt-4 doctor-availability bg-white px-2 pt-4">


                {AuditableEntityHoc(doctorInfoData.auditableDoctor, false, 4)}

            </Row>
        </Container>
    </>
};

export default DepartmentDutyRosterPreviewModal;
