import React, {memo} from 'react'
import {Row,Col,Form} from 'react-bootstrap'
import {CDataTable,CHybridSelect,CLoading,CPagination} from '@frontend-appointment/ui-elements'
import DoctorWithSpecializationAndImage from '../CommonComponents/table-components/DoctorWithSpecializationAndImage';
import PatientWithMobileNumber from '../CommonComponents/table-components/PatientNameWithMobileNumber'
const AppointmentQueue = props => {
  const {
    isAppointmentQueueLoading,
    appointmentQueueData,
    appointmentQueueErrorMessage,
    totalRecords,
    queryParams,
    handlePageChange,
    doctorId,
    handleDoctorChange,
    doctorDropdown
  } = props.appointmentQueue;
 return ( 
<>
  {props.hospitalId.value?
   <Row className="mt-4">
    <h5 className="title">Appointment Queue</h5>
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
                    onChange={(e)=>handleDoctorChange(e,'Q')}
                    options={doctorDropdown}
                    value={doctorId}
                  ></CHybridSelect>
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
                  cellRenderer:'doctorwithSpecializationRenderer'
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
    </div>
  </Row>:''}
 </> 
 )
}
export default memo(AppointmentQueue)
