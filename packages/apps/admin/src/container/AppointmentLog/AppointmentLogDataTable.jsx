import React, {memo} from 'react'
import {
  CButton,
  CDataTable,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import DoctorWithSpecialization from '../CommonComponents/table-components/DoctorWithSpecialization';
import AppointmentLogAction from '../CommonComponents/table-components/AppointmentLogStatus';
import PatientWithAgeAndGender from '../CommonComponents/table-components/PatientNameWithAgeAndGender'
import PreviewDetails from './AppointmentLogPreview';

const AppointmentRefundDataTable = ({tableHandler, paginationProps}) => {
  const {
    isSearchLoading,
    appointmentLogList,
    searchErrorMessage,
    previewCall,
    previewData,
    showModal,
    setShowModal
  } = tableHandler
  const {queryParams, totalRecords, handlePageChange} = paginationProps
  return (
    <>
      <div className="manage-details">
        {/* <Container fluid>
          <Row>
          */}
        <h5 className="title">Appointment Refund Details</h5>
        {/* </Col> */}
        {/* <Col>
              <CButton
                id="downloadExcel"
                name="DownloadExcel"
                onClickHandler={props.exportExcel}
                className="float-right"
                variant="outline-secondary"
              >
                {' '}
                <i className="fa fa-download" />
              </CButton>
            </Col> */}
        {/* </Row> */}

        <Row>
            <Col >
            <div className="appointment-badge float-right">
            <span><Badge variant="primary">PA</Badge> : Pending Approval</span>
            <span><Badge variant="success">A</Badge> : Approved</span>
            <span><Badge variant="danger">C</Badge> : Canceled</span>
            <span><Badge variant="warning">RE</Badge> : Rejected</span>
            <span><Badge variant="dark">R</Badge> : Refunded</span>
            </div>
            </Col>
            </Row>
        {!isSearchLoading &&
        !searchErrorMessage &&
        appointmentLogList.length ? (
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
                  headerName: 'SN',
                  field: 'sN',
                  headerClass: 'resizable-header header-first-class',
                  resizable: true,
                  sortable: true,
                  editable: true,
                  sizeColumnsToFit: true,
                  cellClass: 'first-class'
                },
                {
                  headerName: 'Status',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer:'statusRenderer'
                },
                {
                  headerName: 'Appointment Date',
                  field: 'appointmentDate',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Appointment Time',
                  field: 'appointmentTime',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Appointment Number',
                  field: 'appointmentNumber',
                  // headerClass: "fi",
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Esewa Id',
                  field: 'esewaId',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Registration Number',
                  field: 'registrationNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'HIS',
                  field: 'his',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Patient Name',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer:'patientRenderer'
                },
               
                {
                  headerName: 'Specialization',
                  field: 'specializationName',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Mobile Number',
                  field: 'mobileNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Address',
                  field: 'address',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Doctor(Specialization)',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer:'doctorwithSpecializationRenderer'
                },
                {
                  headerName: 'Transaction Number',
                  field: 'transactionNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Amount',
                  field: 'amount',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Amount',
                  field: 'refundAmount',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                }
              ]}
              frameworkComponents={{
                doctorwithSpecializationRenderer:DoctorWithSpecialization,
                statusRenderer:AppointmentLogAction,
                patientRenderer:PatientWithAgeAndGender
              }}
              defaultColDef={{resizable: true}}
              getSelectedRows={
                  // checkIfRoleExists(props.filteredActions, 4) &&
                  previewCall
              }
              rowSelection={'single'}
              rowData={appointmentLogList}
            />
            <CPagination
              totalItems={totalRecords}
              maxSize={queryParams.size}
              currentPage={queryParams.page}
              onPageChanged={handlePageChange}
            />
          </>
        ) : !isSearchLoading && searchErrorMessage ? (
          <div className="filter-message">
            <div className="no-data">
              <i className="fa fa-file-text-o"></i>
            </div>
            <div className="message"> {searchErrorMessage}</div>
          </div>
        ) : (
          <CLoading />
        )}
      </div>
      {showModal ? (
        <PreviewDetails
          showModal={showModal}
          setShowModal={setShowModal}
          logData={previewData}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default memo(AppointmentRefundDataTable)
