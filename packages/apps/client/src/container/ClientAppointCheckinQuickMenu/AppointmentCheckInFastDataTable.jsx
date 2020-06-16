import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import PreviewDetails from './AppointmentFastCheckInPreview'
import AppointmentFastCheckInConfirm from './AppointmentFastCheckInConfirm'

import {
    AppointmentQuickCheckInOption, CPageOverlayLoader,
    DoctorWithSpecImage,
    PatientNameWithAgeGenderPhoneAddress
} from '@frontend-appointment/ui-components'
import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime'
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'
import {ActionFilterUtils} from '@frontend-appointment/helpers'

const {checkIfRoleExists} = ActionFilterUtils
const AppointmentApprovalDataTable = ({tableHandler, paginationProps, filteredActions}) => {
    const {
        isSearchLoading,
        appointmentApprovalList,
        searchErrorMessage,
        previewCall,
        previewData,
        showModal,
        setShowModal,
        approveHandler,
        // approveHandleApi,
        approveConfirmationModal,
        appointmentDetails,
        approveSuccessMessage,
        isConfirming,
        onCopyAppointmentNumber,
        copySuccessMessage
    } = tableHandler
    const {queryParams, totalRecords, handlePageChange} = paginationProps
    return (
        <>
            <div className="manage-details">
                <h5 className="title">Appointment Checkin Details</h5>
                {!isSearchLoading &&
                !searchErrorMessage &&
                appointmentApprovalList.length ? (
                    <>
                        <CDataTable
                            classes="ag-theme-balham quick-checkin-table"
                            id="roles-table"
                            width="100%"
                            height="460px"
                            enableSorting
                            editType
                            rowHeight={70}
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
                                    width: 80
                                },
                                {
                                    headerName: 'App. No',
                                    field: 'appointmentNumber',
                                    // headerClass: "fi",
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 120,
                                },
                                {
                                    headerName: 'Appt. Date & Time',
                                    field: 'name',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'AppointmentDateWithTime',
                                    width: "160"
                                },
                                {
                                    headerName: 'Patient Detail ',
                                    field: 'patientDetails',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: "260",
                                    height: "600",
                                    cellRenderer: 'PatientNameWithMobileNumber'
                                },

                                {
                                    headerName: 'Doctor Detail',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'doctorwithSpecializationRenderer'
                                },

                                // {
                                //     headerName: 'App. Amount',
                                //     field: 'appointmentAmount',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true
                                // },

                                {
                                    headerName: 'Action',
                                    action: 'action',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'childActionRenderer',
                                    cellClass: 'actions-button-cell',
                                    width: '140',
                                    cellRendererParams: {
                                        onClick: function (e, id, type) {
                                            approveHandler(id)
                                            //: props.onPreviewHandler(id)
                                        },
                                        filteredAction: filteredActions,
                                        isConfirming
                                    },
                                    cellStyle: {overflow: 'visible', 'z-index': '99'}
                                }
                            ]}
                            frameworkComponents={{
                                childActionRenderer: AppointmentQuickCheckInOption,
                                doctorwithSpecializationRenderer: PreviewHandlerHoc(
                                    DoctorWithSpecImage,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                AppointmentDateWithTime: PreviewHandlerHoc(
                                    AppointmentDateWithTime,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                PatientNameWithMobileNumber: PreviewHandlerHoc(
                                    PatientNameWithAgeGenderPhoneAddress,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                )
                            }}
                            defaultColDef={{resizable: true}}
                            getSelectedRows={
                                checkIfRoleExists(filteredActions, 4) &&
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
                    <CLoading/>
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
            {/* {rejectModalShow ? (
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
            )} */}
            {approveConfirmationModal ? (
                <AppointmentFastCheckInConfirm
                    modalHeader={approveSuccessMessage}
                    showModal={approveConfirmationModal}
                    setShowModal={setShowModal}
                    onCopyAppointmentNumber={onCopyAppointmentNumber}
                    copySuccessMessage={copySuccessMessage}
                    appointmentDetails={appointmentDetails}
                />
            ) : (
                ''
            )}
            {
                isConfirming ?
                    <CPageOverlayLoader
                        showModal={isConfirming}
                        modalHeader={"Appointment Check-In in process."}
                    /> : ''
            }
        </>
    )
}

export default memo(AppointmentApprovalDataTable)
