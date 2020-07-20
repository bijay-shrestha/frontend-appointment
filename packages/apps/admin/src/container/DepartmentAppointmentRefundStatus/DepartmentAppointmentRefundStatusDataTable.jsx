import React, {memo} from 'react'
import {
  CDataTable,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import {
  // DoctorWithSpecImage,
  PatientNameWithAgeGenderPhone,
  TableRefundStatusAmbigous,
  AppointmentCancelDateWithTime,
  DepartmentNameWithRoomNumber
} from '@frontend-appointment/ui-components'
import PreviewDetails from './DepartmentAppointmentRefundStatusPreview'
//import RejectModal from "./RejectStatusModal";
import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime'
import AppointmentRefundStatus from '../CommonComponents/table-components/AppointmentRefundStatus'
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'

const AppointmentRefundDataTable = ({tableHandler, paginationProps}) => {
  const {
    isSearchLoading,
    appointmentRefundList,
    searchErrorMessage,
    previewCall,
    previewData,
    showModal,
    setShowModal,
    // rejectModalShow,
    // rejectSubmitHandler,
    // refundRejectRemarksHandler,
    onRejectHandler,
    refundHandler,
    // refundHandleApi,
    //refundRejectError,
    // refundConfirmationModal,
    // rejectRemarks,
    totalRefundAmount
    // isRefundLoading,
    // remarks,
    // handleInputChange
    //isRejectLoading
  } = tableHandler
  const {queryParams, totalRecords, handlePageChange} = paginationProps

  return (
    <>
      <div className="manage-details">
        <h5 className="title">Appointment Refund Status Details</h5>
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
                  width: 140,
                  cellClass: 'first-class'
                },
                {
                  headerName: 'Hospital Name',
                  field: 'hospitalName',
                  headerClass: 'resizable-header header-first-class',
                  resizable: true,
                  sortable: true,
                  editable: true,
                  sizeColumnsToFit: true,
                  width: 140,
                  cellClass: 'first-class'
                },
                {
                  headerName: 'Status',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer: 'appointmentStatusBadges',
                  width: 350
                },
                {
                  headerName: 'App. DateTime',
                  field: 'appointmentDate',
                  resizable: true,
                  sortable: true,
                  cellRenderer: 'appointmentDateAndTimeRenderer',
                  sizeColumnsToFit: true,
                  width: 160
                },
                {
                  headerName: 'Cancelled DateTime',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer: 'appointmentCancelledDateWithTime',
                  width: 160
                },
                {
                  headerName: 'Reg. No',
                  field: 'registrationNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'App. No',
                  field: 'appointmentNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: 140
                },
                {
                  headerName: 'Patient Details',
                  cellRenderer: 'patientWithAgeRenderer',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: 300
                },
                {
                  headerName: 'Doctor Detail',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer: 'departmentWithRoomNumber',
                  width: 350
                },
                {
                  headerName: 'Esewa Id',
                  field: 'esewaId',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },
                {
                  headerName: 'Remarks',
                  field: 'remarks',
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
                childActionRenderer: TableRefundStatusAmbigous,
                appointmentDateAndTimeRenderer: PreviewHandlerHoc(
                  AppointmentDateWithTime,
                  null,
                  null,
                  null,
                  previewCall
                ),
                patientWithAgeRenderer: PreviewHandlerHoc(
                  PatientNameWithAgeGenderPhone,
                  null,
                  null,
                  null,
                  previewCall
                ),
                departmentWithRoomNumber: PreviewHandlerHoc(
                  DepartmentNameWithRoomNumber,
                  null,
                  null,
                  null,
                  previewCall
                ),
                appointmentStatusBadges: PreviewHandlerHoc(
                  AppointmentRefundStatus,
                  null,
                  null,
                  null,
                  previewCall
                ),
                appointmentCancelledDateWithTime: PreviewHandlerHoc(
                  AppointmentCancelDateWithTime,
                  null,
                  null,
                  null,
                  previewCall
                )
              }}
              defaultColDef={{resizable: true}}
              getSelectedRows={previewCall}
              rowSelection={'single'}
              rowData={appointmentRefundList}
            />
            <div className=" total-amount">
              <span>Total Amount :</span>
              <span>Rs {totalRefundAmount}</span>
            </div>
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
      {/* {rejectModalShow ? (
                <RejectModal
                    confirmationMessage="Are you sure you want to reject the Refund?If yes please provide remarks."
                    modalHeader="Reject Refund"
                    showModal={rejectModalShow}
                    setShowModal={setShowModal}
                    onDeleteRemarksChangeHandler={refundRejectRemarksHandler}
                    remarks={rejectRemarks}
                    onSubmitDelete={rejectSubmitHandler}
                    deleteErrorMessage={refundRejectError}
                    actionDisabled={isRejectLoading}
                />
            ) : (
                ''
            )} */}

      {/* {refundConfirmationModal ? (
        <CRemarksModal
          confirmationMessage="Provide remarks for Refund Check."
          modalHeader="Are you sure you want to Check Refund?"
          showModal={refundConfirmationModal}
          onCancel={setShowModal}
          onRemarksChangeHandler={handleInputChange}
          remarks={remarks}
          onPrimaryAction={refundHandleApi}
          primaryActionName={'Check'}
          actionDisabled={isRefundLoading}
          primaryActionLoading={isRefundLoading}
        />
      ) : (
        ''
      )} */}
    </>
  )
}

export default memo(AppointmentRefundDataTable)
