import React, {PureComponent} from 'react'
import {
  CDataTable,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import TableApproveAction from '../CommonComponents/table-components/TableApproveAction'
const AppointmentRefundDataTable = ({tableHandler, paginationProps}) => {
  const {
    isSearchLoading,
    appointmentApprovalList,
    searchErrorMessage
  } = tableHandler
  const {queryParams, totalRecords, handlePageChange} = paginationProps
  return (
    <>
      <div className="manage-details">
        <h5 className="title">Appointment Approval Details</h5>
        {!isSearchLoading &&
        !searchErrorMessage &&
        appointmentApprovalList.length ? (
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
                  headerName: 'Hospital Name',
                  field: 'hospitalName',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
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
                  headerName: 'Patient Name',
                  field: 'patientName',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
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
                  headerName: 'Doctor (Specialization)',
                  field: 'doctorName',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
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
                  field: 'refundAmount',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: '',
                  action: 'action',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer: 'childActionRenderer',
                  cellClass: 'actions-button-cell',
                  // cellRendererParams: {
                  //     onClick: function (e, id, type) {
                  //         type === 'D'
                  //             // ? props.filteredActions.find(action => action.id === 5) &&
                  //             ? props.onDeleteHandler(id)
                  //             : type === 'E'
                  //             ? props.onEditHandler(id)
                  //             : props.onPreviewHandler(id)
                  //     },
                  //     filteredAction: props.filteredActions
                  // },
                  cellStyle: {overflow: 'visible', 'z-index': '99'}
                }
              ]}
              frameworkComponents={{
                childActionRenderer: TableApproveAction
              }}
              defaultColDef={{resizable: true}}
              // getSelectedRows={
              //     // checkIfRoleExists(props.filteredActions, 4) &&
              //     props.onPreviewHandler
              // }
              rowSelection={'single'}
              rowData={appointmentApprovalList}
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
    </>
  )
}

export default AppointmentRefundDataTable
