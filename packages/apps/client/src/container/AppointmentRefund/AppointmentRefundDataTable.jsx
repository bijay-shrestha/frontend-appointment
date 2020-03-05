import React, {memo} from 'react'
import {
  CDataTable,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import {
  ConfirmDelete,
  CConfirmationModal
} from '@frontend-appointment/ui-components'
import TableRefundStatus from '../CommonComponents/table-components/TableRefundStatus'
import PreviewDetails from './AppointmentRefundPreview'
import RejectModal from "./RejectModal";
import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime';
import PatientWithAge from '../CommonComponents/table-components/PatientNameWitheAgeGenderPhone';
const AppointmentRefundDataTable = ({tableHandler, paginationProps}) => {
  const {
    isSearchLoading,
    appointmentRefundList,
    searchErrorMessage,
    previewCall,
    previewData,
    showModal,
    setShowModal,
    rejectModalShow,
    rejectSubmitHandler,
    refundRejectRemarksHandler,
    onRejectHandler,
    refundHandler,
    refundHandleApi,
    refundRejectError,
    refundConfirmationModal,
    remarks
  } = tableHandler
  const {queryParams, totalRecords, handlePageChange} = paginationProps

  return (
    <>
      <div className="manage-details">
        <h5 className="title">Appointment Refund Details</h5>
        {!isSearchLoading &&
        !searchErrorMessage &&
        appointmentRefundList.length ? (
          <>
            <CDataTable
              classes="ag-theme-balham"
              id="roles-table"
              width="100%"
              height="460px"
              enableSorting
              editType
              rowHeight={50}
              columnDefs={[
                {
                  headerName: 'SN',
                  field: 'sN',
                  headerClass: 'resizable-header header-first-class',
                  resizable: true,
                  sortable: true,
                  editable: true,
                  sizeColumnsToFit: true,
                  width:140,
                  cellClass: 'first-class'
                  //   cellClass: function(params) { return ['my-class-1','my-class-2']; }
                },
                // {
                //   headerName: 'Hospital Name',
                //   field: 'hospitalName',
                //   resizable: true,
                //   sortable: true,
                //   sizeColumnsToFit: true
                // },
                {
                  headerName: 'App. No',
                  field: 'appointmentNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width:140,
                },
                {
                  headerName: 'App. Date(Time)',
                  field: 'appointmentDate',
                  resizable: true,
                  sortable: true,
                  cellRenderer: 'appointmentDateAndTimeRenderer',
                  sizeColumnsToFit: true,
                  width:160,
                },
                {
                  headerName: 'Cancel Date',
                  field: 'cancelledDate',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Reg. No',
                  field: 'registrationNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Patient Name',
                  cellRenderer: 'patientWithAgeRenderer',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Doctor',
                  field: 'doctorName',
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

                // {
                //   headerName: 'Esewa Id',
                //   field: 'esewaId',
                //   resizable: true,
                //   sortable: true,
                //   sizeColumnsToFit: true
                // },
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
                // {
                //   headerName: 'Remarks',
                //   field: 'remarks',
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
                  width: 140,
                  cellRendererParams: {
                    onClick: function (e, id, type) {
                      type === 'D'
                        ? // ? props.filteredActions.find(action => action.id === 5) &&
                          onRejectHandler(id)
                        : refundHandler(id)
                    }
                   // filteredAction: props.filteredActions
                  },
                  cellStyle: {overflow: 'visible', 'z-index': '99'}
                }
              ]}
              frameworkComponents={{
                childActionRenderer: TableRefundStatus,
                appointmentDateAndTimeRenderer:AppointmentDateWithTime,
                patientWithAgeRenderer:PatientWithAge
              }}
              defaultColDef={{resizable: true}}
              getSelectedRows={previewCall}
              rowSelection={'single'}
              rowData={appointmentRefundList}
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
          refundData={previewData}
        />
      ) : (
        ''
      )}
      {rejectModalShow ? (
        <RejectModal
          confirmationMessage="Are you sure you want to reject the Refund?If yes please provide remarks."
          modalHeader="Reject Refund"
          showModal={rejectModalShow}
          setShowModal={setShowModal}
          onDeleteRemarksChangeHandler={refundRejectRemarksHandler}
          remarks={remarks}
          onSubmitDelete={rejectSubmitHandler}
          deleteErrorMessage={refundRejectError}
        />
      ) : (
        ''
      )}

      {refundConfirmationModal ? (
        <CConfirmationModal
          modalHeader="Are you sure you want to refund?"
          showModal={refundConfirmationModal}
          setShowModal={setShowModal}
          remarks={remarks}
          onConfirm={refundHandleApi}
          onCancel={setShowModal}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default memo(AppointmentRefundDataTable)
