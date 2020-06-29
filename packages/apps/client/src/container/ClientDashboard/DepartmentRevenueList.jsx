import React, {memo} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {
  CDataTable,
  CHybridSelect,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import {
  DepartmentRevenueAppointmentAmount,
  DepartmentRevenueNoOfAppointments
} from '@frontend-appointment/commons'
//import DoctorWithSpecializationAndImage from '../CommonComponents/table-components/DoctorWithSpecializationAndImage'
//import PatientWithMobileNumber from '../CommonComponents/table-components/PatientNameWithMobileNumber'
import {
  CEnglishDatePicker,
  DepartmentNameWithRoomNumber
} from '@frontend-appointment/ui-components'

const DepartmentRevenue = props => {
  const {
    isDepartmentRevenueLoading,
    departmentRevenueData,
    departmentRevenueErrorMessage,
    totalRecords,
    queryParams,
    handlePageChange,
    hospitalDepartmentId,
    handleDepartmentChange,
    departmentDropdown,
    fromDate,
    toDate,
    handleDateChange,
    departmentTotalAppointments,
    departmentTotalRevenueAmount,
    departmentTotalFollowUp
  } = props.departmentRevenue
  return (
    <>
      <div className="doctor-revenue">
        <h5 className="title">Department Revenue</h5>
        <div className="app-log">
          <>
            <Row>
              <Col className="px-0">
                <Form className="hospital-list float-left">
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Col>
                      <div className="hospital-list-input">
                        <CHybridSelect
                          name="hospitalDepartmentId"
                          placeholder={
                            departmentDropdown.length
                              ? 'Select Hospital Department.'
                              : 'No Department(s) available.'
                          }
                          onChange={handleDepartmentChange}
                          options={departmentDropdown}
                          value={hospitalDepartmentId}
                          isDisabled={!departmentDropdown.length}
                          noOptionsMessage={() => 'No Department(s) found.'}
                        />
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>

              <Col className="date">
                <div className="">
                  <CEnglishDatePicker
                    id="from-date"
                    name="fromDate"
                    label="From Date"
                    dateFormat="yyyy-MM-dd"
                    showDisabledMonthNavigation={true}
                    selected={fromDate}
                    peekNextMonth={true}
                    showMonthDropdown={true}
                    showYearDropdown={true}
                    dropdownMode="select"
                    onChange={date => handleDateChange(date, 'fromDate')}
                  />{' '}
                  <div className="separator-date">To</div>
                  <CEnglishDatePicker
                    id="to-date"
                    name="toDate"
                    label="To Date"
                    dateFormat="yyyy-MM-dd"
                    showDisabledMonthNavigation={true}
                    selected={toDate}
                    peekNextMonth={true}
                    showMonthDropdown={true}
                    showYearDropdown={true}
                    dropdownMode="select"
                    onChange={date => handleDateChange(date, 'toDate')}
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <div className="app-queue-datatable">
                {!departmentRevenueData &&
                !departmentRevenueErrorMessage &&
                departmentRevenueData && departmentRevenueData.length ? (
                  <>
                    <CDataTable
                      classes="ag-theme-balham"
                      id="roles-table"
                      width="100%"
                      height="360px"
                      enableSorting
                      editType
                      rowHeight={50}
                      columnDefs={[
                        {
                          headerName: 'Doctor Details',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true,
                          cellRenderer: 'departmentWithRoomNumber',
                          width: 400
                        },
                        {
                          headerName: 'No of Appt',
                          // field: 'totalAppointments',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true,
                          cellRenderer: 'departmentRevenueNoOfAppointments'
                        },
                        {
                          headerName: 'No of Follow Up',
                          field: 'totalFollowUp',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true
                        },
                        {
                          headerName: 'Amount',
                          // field: 'totalRevenue',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true,
                          cellRenderer: 'departmentRevenueAppointmentAmount'
                        }
                      ]}
                      frameworkComponents={{
                        departmentWithRoomNumber: DepartmentNameWithRoomNumber,
                        departmentRevenueAppointmentAmount: DepartmentRevenueAppointmentAmount,
                        departmentRevenueNoOfAppointments: DepartmentRevenueNoOfAppointments
                      }}
                      defaultColDef={{resizable: true}}
                      rowSelection={'single'}
                      rowData={departmentRevenueData}
                      // rowModelType= "infinite"
                      // paginationPageSize={6}
                      // cacheOverflowSize={2}
                      // maxConcurrentDatasourceRequests={1}
                      // infiniteInitialRowCount={6}
                      // maxBlocksInCache={6}
                      // dataSource={()=>handlePageChange(queryParams.page++)}
                    />

                    <Row>
                      <Col className="total-left">
                        <div className="pull-left mt-3">
                          {' '}
                          <span className="label"> Total Appointment :</span>
                          <span className="rev-total">
                            {' '}
                            {departmentTotalAppointments}
                          </span>
                        </div>
                        <div className="pull-left mt-1">
                          {' '}
                          <span className="label"> Total Follow Up :</span>
                          <span className="rev-total">
                            {' '}
                            {departmentTotalFollowUp}
                          </span>
                        </div>
                      </Col>
                      <Col>
                        <span className="pull-right mt-3">
                          Total Revenue Amount :{' '}
                          <span className="rev-total">
                            {' '}
                            Rs. {departmentTotalRevenueAmount}
                          </span>
                        </span>
                      </Col>
                    </Row>

                    <CPagination
                      totalItems={totalRecords}
                      maxSize={queryParams.size}
                      currentPage={queryParams.page}
                      onPageChanged={handlePageChange}
                    />
                  </>
                ) : !isDepartmentRevenueLoading &&
                  departmentRevenueErrorMessage ? (
                  <div className="filter-message">
                    <div className="no-data">
                      <i className="fa fa-file-text-o"></i>
                    </div>
                    <div className="message">
                      {' '}
                      {departmentRevenueErrorMessage}
                    </div>
                  </div>
                ) : (
                  <CLoading />
                )}
              </div>
            </Row>
          </>
        </div>
      </div>
    </>
  )
}
export default memo(DepartmentRevenue)
