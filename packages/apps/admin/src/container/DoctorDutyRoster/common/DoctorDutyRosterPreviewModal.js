import React from 'react';
import {Col, Container, Form, Row} from "react-bootstrap";
import {CEnglishDatePicker} from "@frontend-appointment/ui-components";
import {CDataTable, CHybridInput} from "@frontend-appointment/ui-elements";
import DayOffStatusLabel from "../../CommonComponents/table-components/DayOffStatusLabel";
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";

const DoctorDutyRosterPreviewModal = ({
                                          doctorInfoData,
                                          doctorAvailabilityData,
                                          hasOverrideDutyRoster,
                                          doctorDutyRosterOverrideRequestDTOS
                                      }) => {

    return <>
        <Container className="p-0" fluid>
            <Row className="mb-2">
                <Col md={12} lg={5} className="info-container">
                    <div className="doctor-info bg-white p-4">
                        <h5 className="title">Doctor Info</h5>
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
                                label="Hospital"
                                name="hospital"
                                placeholder="Hospital"
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
                        </Form>
                    </div>
                </Col>

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
                                Days Off
                                {/*<CCheckbox*/}
                                {/*    id="check-all-menu"*/}
                                {/*    label="Days Off"*/}
                                {/*    className="select-all check-all"*/}
                                {/*    checked={wholeWeekOff === 'Y'}*/}
                                {/*/>*/}
                            </Col>
                        </Row>
                        {
                            doctorAvailabilityData.map((day, index) => (
                                <Row className="main-content" key={day.weekDaysName.concat("-" + day.weekDaysId)}>
                                    <Col>{day.weekDaysName}</Col>
                                    <Col>
                                        {DateTimeFormatterUtils.convertDateToHourMinuteFormat(day.startTime)}
                                        {/*<div className="time-picker">*/}
                                        {/*    <CEnglishDatePicker*/}
                                        {/*        id={"startTime".concat(day.weekDaysId)}*/}
                                        {/*        name={"startTime".concat(day.weekDaysId)}*/}
                                        {/*        label="Start Time"*/}
                                        {/*        onChange={() => {*/}
                                        {/*        }}*/}
                                        {/*        selected={day.startTime}*/}
                                        {/*        showTimeSelect={true}*/}
                                        {/*        showTimeSelectOnly={true}*/}
                                        {/*        timeIntervals={15}*/}
                                        {/*        timeCaption="Start Time"*/}
                                        {/*        dateFormat="h:mm aa"*/}
                                        {/*        disabled={true}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                    </Col>
                                    <Col>
                                        {DateTimeFormatterUtils.convertDateToHourMinuteFormat(day.endTime)}
                                        {/*<div className="time-picker">*/}
                                        {/*    <CEnglishDatePicker*/}
                                        {/*        id={"endTime".concat(day.weekDaysId)}*/}
                                        {/*        name={"endTime".concat(day.weekDaysId)}*/}
                                        {/*        label="End Time"*/}
                                        {/*        onChange={() => {*/}
                                        {/*        }}*/}
                                        {/*        selected={day.endTime}*/}
                                        {/*        showTimeSelect={true}*/}
                                        {/*        showTimeSelectOnly={true}*/}
                                        {/*        timeIntervals={15}*/}
                                        {/*        timeCaption="End Time"*/}
                                        {/*        dateFormat="h:mm aa"*/}
                                        {/*        disabled={true}*/}
                                        {/*    />*/}
                                        {/*</div>*/}
                                    </Col>
                                    <Col>
                                        {day.dayOffStatus === 'Y' ? <i className="fa fa-check"/> :
                                            <i className="fa fa-close"/>}
                                        {/*<CCheckbox id={"dayOffStatus".concat(day.weekDaysId)}*/}
                                        {/*           label="&nbsp;"*/}
                                        {/*           className=" "*/}
                                        {/*           checked={day.dayOffStatus === 'Y'}*/}
                                        {/*>*/}
                                        {/*</CCheckbox>*/}
                                    </Col>
                                </Row>
                            ))
                        }
                    </div>
                </Col>
            </Row>
            <Row>
                {hasOverrideDutyRoster === 'Y' && doctorDutyRosterOverrideRequestDTOS.length ?
                    <>
                        <CDataTable
                            classes="ag-theme-balham"
                            id="roles-table"
                            width="100%"
                            height="460px"
                            enableSorting
                            editType
                            columnDefs={[
                                {
                                    headerName: 'From Date',
                                    field: 'fromDateDisplay',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },
                                {
                                    headerName: 'To Date',
                                    field: 'toDateDisplay',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },
                                {
                                    headerName: 'Start Time',
                                    field: 'startTimeDisplay',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },
                                {
                                    headerName: 'End Time',
                                    field: 'endTimeDisplay',
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
                                // {
                                //     headerName: '',
                                //     action: 'action',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true,
                                //     cellRenderer: 'childActionRenderer',
                                //     cellClass: 'actions-button-cell',
                                //     cellRendererParams: {
                                //         onClick: function (e, data, index, type) {
                                //             type === 'R'
                                //                 ? onRemove(data, index)
                                //                 : onModify(data, index)
                                //         }
                                //     },
                                //     cellStyle: {overflow: 'visible', 'z-index': '99'}
                                // }
                            ]}
                            frameworkComponents={{
                                // childActionRenderer: OverrideActions,
                                childLabelRenderer: DayOffStatusLabel
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
                        </div> : '')}
            </Row>
        </Container>
    </>
};

export default DoctorDutyRosterPreviewModal;
