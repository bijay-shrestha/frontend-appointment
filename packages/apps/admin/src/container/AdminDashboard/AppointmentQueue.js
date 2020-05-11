import React, {memo} from 'react'
import {Row, Col, Form} from 'react-bootstrap'
import {
    CDataTable,
    //CHybridSelect, 
    CHybridSelectWithImage,
    CLoading,
    CPagination
} from '@frontend-appointment/ui-elements'
import DoctorWithSpecializationAndImage from '../CommonComponents/table-components/DoctorWithSpecializationAndImage'
import PatientWithMobileNumber from '../CommonComponents/table-components/PatientNameWithMobileNumber'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'

const AppointmentQueue = props => {
    const {
        isAppointmentQueueLoading,
        appointmentQueueData,
        appointmentQueueErrorMessage,
        totalRecords,
        queryParams,
        handlePageChange,
        doctorId,
        date,
        handleDoctorChange,
        doctorDropdown,
        handleDateChangeForAppointmentQueue
    } = props.appointmentQueue;
    return (
        <>
            <div className="mt-4 appointment-queue">
                <h5 className="title">Appointment Queue</h5>
                <div className="app-log">
                    {props.hospitalId.value && props.hospitalId.value !== 'A' ? (
                            <>
                                <Row>
                                    <Col className="px-0">
                                        <Form className="hospital-list float-left">
                                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                                <Col sm="12">
                                                    <div className="hospital-list-input">
                                                        <CHybridSelectWithImage
                                                            name="doctorId"
                                                            placeholder={doctorDropdown.length ? "Select Doctor." : "No Doctor(s) available."}
                                                            onChange={e => handleDoctorChange(e, 'Q')}
                                                            options={doctorDropdown}
                                                            value={doctorId}
                                                            isDisabled={!doctorDropdown.length}
                                                            noOptionsMessage={() => "No Doctor(s) found."}
                                                        />
                                                    </div>
                                                </Col>
                                            </Form.Group>
                                        </Form>
                                    </Col>

                                    <Col className="date">
                                        <CEnglishDatePicker
                                            id="appointment-queueDate"
                                            name="appointmentQueueDate"
                                            label="Appointment Date"
                                            dateFormat="yyyy-MM-dd"
                                            showDisabledMonthNavigation={true}
                                            peekNextMonth={true}
                                            showMonthDropdown={true}
                                            showYearDropdown={true}
                                            dropdownMode="select"
                                            selected={date}
                                            onChange={date => handleDateChangeForAppointmentQueue(date, 'date')}
                                        />
                                        {/*<div>*/}
                                        {/*    <span>Date :</span> {date ? date.toDateString() : new Date().toDateString()}*/}
                                        {/*</div>*/}
                                    </Col>
                                </Row>
                                <Row>
                                    <div className="app-queue-datatable">
                                        {!isAppointmentQueueLoading &&
                                        !appointmentQueueErrorMessage &&
                                        appointmentQueueData.length ? (
                                            <>
                                                <CDataTable
                                                    classes="ag-theme-balham"
                                                    id="roles-table"
                                                    width="100%"
                                                    height="555px"
                                                    enableSorting
                                                    editType
                                                    rowHeight={50}
                                                    columnDefs={[
                                                        {
                                                            headerName: 'Doctor(Specialization)',
                                                            resizable: true,
                                                            sortable: true,
                                                            sizeColumnsToFit: true,
                                                            cellRenderer: 'doctorwithSpecializationRenderer',
                                                            width: '300'
                                                        },

                                                        {
                                                            headerName: 'Patient(Mobile Number)',
                                                            resizable: true,
                                                            sortable: true,
                                                            sizeColumnsToFit: true,
                                                            cellRenderer: 'mobileRender'
                                                        },
                                                        {
                                                            headerName: 'Appointment Time',
                                                            field: 'appointmentTime',
                                                            resizable: true,
                                                            sortable: true,
                                                            sizeColumnsToFit: true
                                                        }
                                                    ]}
                                                    frameworkComponents={{
                                                        doctorwithSpecializationRenderer: DoctorWithSpecializationAndImage,
                                                        mobileRender: PatientWithMobileNumber
                                                    }}
                                                    defaultColDef={{resizable: true}}
                                                    rowSelection={'single'}
                                                    rowData={appointmentQueueData}
                                                    // rowModelType= "infinite"
                                                    // paginationPageSize={6}
                                                    // cacheOverflowSize={2}
                                                    // maxConcurrentDatasourceRequests={1}
                                                    // infiniteInitialRowCount={6}
                                                    // maxBlocksInCache={6}
                                                    // dataSource={()=>handlePageChange(queryParams.page++)}
                                                />

                                                <CPagination
                                                    totalItems={totalRecords}
                                                    maxSize={queryParams.size}
                                                    currentPage={queryParams.page}
                                                    onPageChanged={handlePageChange}
                                                />
                                            </>
                                        ) : !isAppointmentQueueLoading &&
                                        appointmentQueueErrorMessage ? (
                                            <div className="filter-message">
                                                <div className="no-data">
                                                    <i className="fa fa-file-text-o"></i>
                                                </div>
                                                <div className="message"> {appointmentQueueErrorMessage}</div>
                                            </div>
                                        ) : (
                                            <CLoading/>
                                        )}
                                    </div>
                                </Row>
                            </>
                        )
                        :
                        <div className="filter-message">
                            <div className="no-data">
                                <i className="fa fa-hand-o-up"></i>
                            </div>
                            <div className="message">Please select client!</div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
};
export default memo(AppointmentQueue)
