import React, {memo} from 'react'
import {Row,Col,Form} from 'react-bootstrap'
import {CDataTable,CHybridSelect,CLoading,CPagination} from '@frontend-appointment/ui-elements'
import DoctorWithSpecializationAndImage from '../CommonComponents/table-components/DoctorWithSpecializationAndImage';
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
    doctorDropdown
  } = props.appointmentQueue;
 return ( 
<>
 
   <div className="mt-4 appointment-queue">
    <h5 className="title">Appointment Queue</h5>
    <div className="app-log">
    {props.hospitalId.value?
      <><Row>
        <Col className="px-0">
          <Form className="hospital-list float-left">
            <Form.Group as={Row} controlId="formPlaintextEmail">
              <Col sm="12">
                <div className="hospital-list-input">
                  <CHybridSelect
                    name="doctorId"
                    placeholder="Select Doctor"
                    onChange={(e)=>handleDoctorChange(e,'Q')}
                    options={doctorDropdown}
                    value={doctorId}
                  ></CHybridSelect>
                </div>
              </Col>
            </Form.Group>
          </Form>
        </Col>

        {/*<Col className="date">*/}

        {/*<CEnglishDatePicker*/}
        {/*    id="date"*/}
        {/*    name="date"*/}
        {/*    label="Date"*/}
        {/*    dateFormat="yyyy-MM-dd"*/}
        {/*    maxDate={0}*/}
        {/*    showDisabledMonthNavigation={true}*/}
        {/*    peekNextMonth={true}*/}
        {/*    showMonthDropdown={true}*/}
        {/*    showYearDropdown={true}*/}
        {/*    dropdownMode="select"*/}
        {/*    selected={date}*/}
        {/*    // onKeyDown={event => handleEnter(event)}*/}
        {/*    // onChange={date =>*/}
        {/*    //     handleSearchFormChange(date, 'fromDate')*/}
        {/*    // }*/}
        {/*/>*/}
        {/*  /!* <div>*/}
        {/*    <span>Date :</span> {new Date().toDateString()}*/}
        {/*  </div> *!/*/}
        {/*</Col>*/}
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
                  cellRenderer:'doctorwithSpecializationRenderer',
                  width:"300"
                },
                
                {
                  headerName: 'Patient(Mobile Number)',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer:'mobileRender'
                },
                {
                  headerName: 'Appointment Time',
                  field: 'appointmentTime',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
              ]}
              frameworkComponents={{
                doctorwithSpecializationRenderer:DoctorWithSpecializationAndImage,
                mobileRender:PatientWithMobileNumber
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
    </>
    :<div className="filter-message">
    <div className="no-data">
        <i class="fa fa-hand-o-up"></i>
    </div>
    <div className="message">Please select hosptial!.</div>
</div>
}
    </div>
  </div>
 </> 
 )
}
export default memo(AppointmentQueue)
