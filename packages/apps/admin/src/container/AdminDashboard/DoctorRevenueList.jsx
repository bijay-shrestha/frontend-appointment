import React, {memo} from 'react'
import {Row, Col, Form} from 'react-bootstrap'
import {
  CDataTable,
  CHybridSelect,
  CHybridInput,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import DoctorWithSpecializationAndImage from '../CommonComponents/table-components/DoctorWithSpecializationAndImage'
//import PatientWithMobileNumber from '../CommonComponents/table-components/PatientNameWithMobileNumber'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components';
const DoctorRevenueList = props => {
  const {
    isDoctorRevenueLoading,
    doctorRevenueData,
    doctorRevenueErrorMessage,
    totalRecords,
    queryParams,
    handlePageChange,
    doctorId,
    handleDoctorChange,
    doctorDropdown,
    fromDate,
    toDate,
    handleDateChange,
    hospitalId,
    handleSpecializationChange,
    specializationId,
    specializationListHospitalWise
  } = props.doctorRevenue
  return (
    <>
      {hospitalId.value ? (
        <Row className="mt-4">
          <h5 className="title">Doctor Revenue</h5>
          <div className="app-log">
            <Row>
              <Col className="px-0">
                <Form className="hospital-list float-left">
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Col sm="12">
                      <div className="hospital-list-input">
                        <CHybridSelect
                          name="doctorId"
                          placeholder="Select Doctor"
                          onChange={handleDoctorChange}
                          options={doctorDropdown}
                          value={doctorId}
                        ></CHybridSelect>
                      </div>
                      <div className="d-flex">
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
                          onKeyDown={event => this.handleEnter(event)}
                          onChange={date =>
                            handleDateChange(date, 'fromDate')
                          }
                        />{' '}
                        &nbsp;&nbsp;
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
                        <CHybridSelect
                          name="specializationId"
                          label='Select Specialization'
                          onChange={handleSpecializationChange}
                          options={specializationListHospitalWise}
                          disabled={specializationListHospitalWise.length}
                          value={specializationId}
                        />
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>

              <Col className="date">
                <div>
                  <span>Date :</span> {new Date().toDateString()}
                </div>
              </Col>
            </Row>
            <Row>
              <div className="app-queue-datatable">
                {!isDoctorRevenueLoading &&
                !doctorRevenueErrorMessage &&
                doctorRevenueData.length ? (
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
                          headerName: 'Doctor(Specialization)',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true,
                          cellRenderer: 'doctorwithSpecializationRenderer'
                        },
                        {
                          headerName: 'No of Appointments',
                          field: 'totalAppointmentCount',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true
                        },
                        {
                          headerName: 'Revenue Amout',
                          field: 'revenueAmount',
                          resizable: true,
                          sortable: true,
                          sizeColumnsToFit: true
                        }
                      ]}
                      frameworkComponents={{
                        doctorwithSpecializationRenderer: DoctorWithSpecializationAndImage,
                      }}
                      defaultColDef={{resizable: true}}
                      rowSelection={'single'}
                      rowData={doctorRevenueData}
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
                ) : !isDoctorRevenueLoading &&
                    doctorRevenueErrorMessage ? (
                  <div className="filter-message">
                    <div className="no-data">
                      <i className="fa fa-file-text-o"></i>
                    </div>
                    <div className="message">
                      {' '}
                      {doctorRevenueErrorMessage}
                    </div>
                  </div>
                ) : (
                  <CLoading />
                )}
              </div>
            </Row>
          </div>
        </Row>
      ) : (
        ''
      )}
    </>
  )
}
export default memo(DoctorRevenueList)
