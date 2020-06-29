import React, {memo} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {
  CDataTable,
  CHybridSelectWithImage,
  CHybridSelect,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import {
  CEnglishDatePicker,
  DepartmentNameWithRoomNumber
} from '@frontend-appointment/ui-components'
import DoctorWithSpecializationAndImage from '../CommonComponents/table-components/DoctorWithSpecializationAndImage'
import PatientWithMobileNumber from '../CommonComponents/table-components/PatientNameWithMobileNumber'
import {CommonUtils} from '@frontend-appointment/helpers'
const {filterAppointmentServiceType} = CommonUtils
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
    handleDateChangeForAppointmentQueue,
    handleDepartmentChange,
    departmentDropdown,
    hospitalDepartmentId
  } = props.appointmentQueue
  const {appointmentServiceTypeCode}=props
  const headerName = filterAppointmentServiceType(
    appointmentServiceTypeCode,
    'DOC'
  )
    ? 'Doctor(Specialization)'
    : 'Department Details'
  const cellComponent = filterAppointmentServiceType(
    appointmentServiceTypeCode,
    'DOC'
  )
    ? DoctorWithSpecializationAndImage
    : DepartmentNameWithRoomNumber
  return (
    <>
      <div className="mt-4 appointment-queue">
        <h5 className="title">Appointment Queue</h5>
        <div className="app-log">
          <Row>
            <Col className="px-0">
              <Form className="hospital-list float-left">
                <Form.Group as={Row} controlId="formPlaintextEmail">
                  {filterAppointmentServiceType(
                    appointmentServiceTypeCode,
                    'DOC'
                  ) ? (
                    <Col sm="12">
                      <div className="hospital-list-input">
                        <CHybridSelectWithImage
                          name="doctorId"
                          placeholder={
                            doctorDropdown.length
                              ? 'Select Doctor.'
                              : 'No Doctor(s) available.'
                          }
                          onChange={e => handleDoctorChange(e, 'Q')}
                          options={doctorDropdown}
                          value={doctorId}
                          isDisabled={!doctorDropdown.length}
                          noOptionsMessage={() => 'No Doctor(s) found.'}
                        />
                      </div>
                    </Col>
                  ) : (
                    <Col sm="12">
                      <div className="hospital-list-input">
                        <CHybridSelect
                          name="hospitalDepartmentId"
                          placeholder={
                            departmentDropdown.length
                              ? 'Select Department.'
                              : 'No Departments(s) available.'
                          }
                          onChange={e => handleDepartmentChange(e, 'Q')}
                          options={departmentDropdown}
                          value={hospitalDepartmentId}
                          isDisabled={!doctorDropdown.length}
                          noOptionsMessage={() => 'No Department(s) found.'}
                        />
                      </div>
                    </Col>
                  )}
                </Form.Group>
              </Form>
            </Col>

            <Col className="date">
              <CEnglishDatePicker
                id="date"
                name="date"
                label="Date"
                dateFormat="yyyy-MM-dd"
                showDisabledMonthNavigation={true}
                peekNextMonth={true}
                showMonthDropdown={true}
                showYearDropdown={true}
                dropdownMode="select"
                selected={date}
                onChange={date =>
                  handleDateChangeForAppointmentQueue(date, 'date')
                }
              />

              {/*<div>*/}
              {/*  <span>Date :</span>{' '}*/}
              {/*  {date ? date.toDateString() : new Date().toDateString()}*/}
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
                        headerName: headerName,
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
                      doctorwithSpecializationRenderer: cellComponent,
                      mobileRender: PatientWithMobileNumber
                    }}
                    defaultColDef={{resizable: true}}
                    rowSelection={'single'}
                    rowData={appointmentQueueData}
                  />
                  <CPagination
                    totalItems={totalRecords}
                    maxSize={queryParams.size}
                    currentPage={queryParams.page}
                    onPageChanged={handlePageChange}
                  />
                </>
              ) : !isAppointmentQueueLoading && appointmentQueueErrorMessage ? (
                <div className="filter-message">
                  <div className="no-data">
                    <i className="fa fa-file-text-o"></i>
                  </div>
                  <div className="message"> {appointmentQueueErrorMessage}</div>
                </div>
              ) : (
                <CLoading />
              )}
            </div>
          </Row>
        </div>
      </div>
    </>
  )
}
export default memo(AppointmentQueue)
