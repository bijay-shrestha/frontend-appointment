import React, {memo} from 'react';
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements';
import {CConfirmationModal, DoctorWithSpecImage} from '@frontend-appointment/ui-components';
import TableApproveAction from '../CommonComponents/table-components/TableApproveAction';
import PreviewDetails from './AppointmentApprovalPreview';
import RejectModal from "./RejectModal";
import CheckInModalContent from "../CommonComponents/CheckInModalContent";
import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime';
import PatientNameWithMobileNumber from '../CommonComponents/table-components/PatientNameWithMobileNumber';
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc';


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
        //onRejectHandler,
        approveHandler,
        approveHandleApi,
        rejectError,
        //isAppointmentRejectLoading,
        approveConfirmationModal,
        rejectModalShow,
        remarks,
        appointmentDetails,
        isConfirming,
        transferHandler
        // filteredActions
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
                                {
                                    headerName: 'App. Date & Time',
                                    field: 'name',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'AppointmentDateWithTime',
                                    width:"260"
                                  },
                                {
                                    headerName: 'App. No',
                                    field: 'appointmentNumber',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 120,
                                },
                                {
                                    headerName: 'Patient Detail ',
                                    field: 'patientDetails',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140,
                                    cellRenderer: 'PatientNameWithMobileNumber'
                                },
                                {
                                    headerName: 'Reg  No',
                                    field: 'registrationNumber',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140
                                },
                                {
                                    headerName: 'Doctor Detail',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'doctorwithSpecializationRenderer',
                                    width: 300
                                },
                                // {
                                //   headerName: 'Transaction Number',
                                //   field: 'transactionNumber',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true
                                // },
                                {
                                    headerName: 'App. Amount',
                                    field: 'appointmentAmount',
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
                                    width: "100",
                                    cellRendererParams: {
                                        onClick: function (e, id, type) {
                                            type === 'P'
                                                // ? props.filteredActions.find (action => action.id === 5) &&
                                                ? transferHandler(id)
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
                                // appointmentNumberRenderer: AppointmentNumberWithCopyToClipboardForTable,
                                doctorwithSpecializationRenderer: PreviewHandlerHoc(DoctorWithSpecImage, null, null, null, previewCall),
                                AppointmentDateWithTime: PreviewHandlerHoc(AppointmentDateWithTime, null, null, null, previewCall),
                                PatientNameWithMobileNumber: PreviewHandlerHoc(PatientNameWithMobileNumber, null, null, null, previewCall),
                                // appointmentNumberRenderer:PreviewHandlerHoc(AppointmentNumberWithCopyToClipboardForTable,null,null,null,previewCall)
                            }}
                            defaultColDef={{resizable: true}}
                            getSelectedRows={
                                //     // checkIfRoleExists(props.filteredActions, 4) &&
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
                    modalHeader="Confirm Check-In?"
                    appointmentDetails={appointmentDetails}
                    modalBody={<CheckInModalContent appointmentDetails={appointmentDetails}/>}
                    showModal={approveConfirmationModal}
                    setShowModal={setShowModal}
                    remarks={remarks}
                    onConfirm={approveHandleApi}
                    onCancel={setShowModal}
                    isConfirming={isConfirming}
                />
            ) : (
                ''
            )}
        </>
    )
};

export default memo(AppointmentApprovalDataTable);
