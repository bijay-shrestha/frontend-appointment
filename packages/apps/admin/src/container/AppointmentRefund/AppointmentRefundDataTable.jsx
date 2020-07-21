import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import {
    CancelDateWithTime,
    CRemarksModal,
    DoctorWithSpecImage,
    PatientNameWithAgeGenderPhone,
    TableRefundStatus
} from '@frontend-appointment/ui-components'
import PreviewDetails from './AppointmentRefundPreview'
import RejectModal from './RejectModal'
import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime'
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'
import AppointmentAmountWithTransactionNumber
    from '../CommonComponents/table-components/AppointmentAmountWithTransactionNumber'

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
        //isRefundLoading,
        refundConfirmationModal,
        rejectRemarks,
        totalRefundAmount,
        isRefundLoading,
        remarks,
        isRejectLoading,
        handleInputChange
    } = tableHandler
    const {queryParams, totalRecords, handlePageChange} = paginationProps

    return (
        <>
            <div className="manage-details">
                <h5 className="title">Appointment Cancellation Details</h5>
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
                                    headerName: 'App. No',
                                    field: 'appointmentNumber',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140
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
                                    headerName: 'Cancel Date',
                                    field: 'cancelledDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'cancelDateWithTime'
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
                                    headerName: 'Reg. No',
                                    field: 'registrationNumber',
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
                                    headerName: 'Doctor Detail',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'doctorWithSpecializationRenderer',
                                    width: 300
                                },
                                {
                                    headerName: 'Transaction Details(No/Amount)',
                                    field: 'refundAmount',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'refundAmtWithTxnNumberRenderer'
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
                                childActionRenderer: TableRefundStatus,
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
                                doctorWithSpecializationRenderer: PreviewHandlerHoc(
                                    DoctorWithSpecImage,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                refundAmtWithTxnNumberRenderer: PreviewHandlerHoc(
                                    AppointmentAmountWithTransactionNumber,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                cancelDateWithTime:
                                    PreviewHandlerHoc(
                                        CancelDateWithTime,
                                        null,
                                        null,
                                        null,
                                        previewCall
                                    ),
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
                    <CLoading/>
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
                    remarks={rejectRemarks}
                    onSubmitDelete={rejectSubmitHandler}
                    deleteErrorMessage={refundRejectError}
                    actionDisabled={isRejectLoading}
                />
            ) : (
                ''
            )}

            {refundConfirmationModal ? (
                <CRemarksModal
                    confirmationMessage="Provide remarks for refund."
                    modalHeader="Are you sure you want to refund?"
                    showModal={refundConfirmationModal}
                    onCancel={setShowModal}
                    onRemarksChangeHandler={handleInputChange}
                    remarks={remarks}
                    onPrimaryAction={refundHandleApi}
                    primaryActionName={"Confirm"}
                    actionDisabled={isRefundLoading}
                    primaryActionLoading={isRefundLoading}/>
            ) : (
                ''
            )}
        </>
    )
}

export default memo(AppointmentRefundDataTable)
