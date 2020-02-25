import React, {memo} from 'react';
import {
  CDataTable,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements';
import {
  ConfirmDelete,
  CConfirmationModal
} from '@frontend-appointment/ui-components';
import TableApproveAction from '../CommonComponents/table-components/TableApproveAction';
import DoctorWithSpecialization from '../CommonComponents/table-components/DoctorWithSpecialization';
import PreviewDetails from './AppointmentApprovalPreview';
import RejectModal from "./RejectModal";
const AppointmentApprovalDataTable = ({tableHandler, paginationProps}) => {
  const {
    isSearchLoading,
    appointmentApprovalList,
    searchErrorMessage,
    previewCall,
    previewData,
    showModal,
    setShowModal,
    rejectSubmitHandler,
    rejectRemarksHandler,
    onRejectHandler,
    approveHandler,
    approveHandleApi,
    rejectError,
    isAppointmentRejectLoading,
    approveConfirmationModal,
    rejectModalShow,
    remarks
  } = tableHandler;
  const {queryParams, totalRecords, handlePageChange} = paginationProps;
  return (
    <>
      <div className="manage-details">
        <h5 className="title">Appointment Checkin Details</h5>
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
              rowHeight="50"
              columnDefs={[
                {
                  headerName: 'SN',
                  field: 'sN',
                  headerClass: 'resizable-header header-first-class',
                  resizable: true,
                  sortable: true,
                  editable: true,
                  sizeColumnsToFit: true,
                  cellClass: 'first-class',
                  width: 100
                },
                // {
                //   headerName: 'Hospital Name',
                //   field: 'hospitalName',
                //   resizable: true,
                //   sortable: true,
                //   sizeColumnsToFit: true
                // },
                {
                  headerName: 'Date',
                  field: 'appointmentDate',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: 140
                },
                {
                  headerName: 'Time',
                  field: 'appointmentTime',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: 140
                },
                {
                  headerName: 'App. No',
                  field: 'appointmentNumber',
                  // headerClass: "fi",
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: 140
                },
                // {
                //   headerName: 'Esewa Id',
                //   field: 'esewaId',
                //   resizable: true,
                //   sortable: true,
                //   sizeColumnsToFit: true
                // },
                {
                  headerName: 'Registration No',
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
                  headerName: 'Mobile Number',
                  field: 'mobileNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: 140
                },
                {
                  headerName: 'Doctor(Specialization)',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer:'doctorwithSpecializationRenderer'
                },
                // {
                //   headerName: 'Transaction Number',
                //   field: 'transactionNumber',
                //   resizable: true,
                //   sortable: true,
                //   sizeColumnsToFit: true
                // },
                // {
                //   headerName: 'Amount',
                //   field: 'refundAmount',
                //   resizable: true,
                //   sortable: true,
                //   sizeColumnsToFit: true
                // },
                {
                  headerName: '',
                  action: 'action',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer: 'childActionRenderer',
                  cellClass: 'actions-button-cell',
                  width:"150",
                  cellRendererParams: {
                      onClick: function (e, id, type) {
                          type === 'D'
                              // ? props.filteredActions.find(action => action.id === 5) &&
                              ? onRejectHandler(id)
                              : approveHandler(id)
                              //: props.onPreviewHandler(id)
                      },
                     // filteredAction: props.filteredActions
                  },
                  cellStyle: {overflow: 'visible', 'z-index': '99'}
                }
              ]}
              frameworkComponents={{
                childActionRenderer: TableApproveAction,
                doctorwithSpecializationRenderer:DoctorWithSpecialization
              }}
              defaultColDef={{resizable: true}}
              getSelectedRows={
                  // checkIfRoleExists(props.filteredActions, 4) &&
                  previewCall
              }
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
      {showModal ? (
        <PreviewDetails
          showModal={showModal}
          setShowModal={setShowModal}
          approvalData={previewData}
        />
      ) : (
        ''
      )}
      {rejectModalShow ? (
        <RejectModal
          confirmationMessage="Are you sure you want to reject the Appointment?If yes please provide remarks."
          modalHeader="Reject Appointment"
          showModal={rejectModalShow}
          setShowModal={setShowModal}
          onDeleteRemarksChangeHandler={rejectRemarksHandler}
          remarks={remarks}
          onSubmitDelete={rejectSubmitHandler}
          deleteErrorMessage={rejectError}
        />
      ) : (
        ''
      )}

      {approveConfirmationModal ? (
        <CConfirmationModal
          modalHeader="Are you sure you want to approve?"
          showModal={approveConfirmationModal}
          setShowModal={setShowModal}
          remarks={remarks}
          onAccept={approveHandleApi}
          onReject={setShowModal}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default memo(AppointmentApprovalDataTable);
