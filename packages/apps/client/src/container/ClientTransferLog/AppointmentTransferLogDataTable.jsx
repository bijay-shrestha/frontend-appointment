import React, {memo} from 'react'
import {
    CDataTable,
    CLoading,
    CPagination
} from '@frontend-appointment/ui-elements'
import PreviewDetails from './AppointmentTransferLogPreview'
import {DoctorWithSpecImage} from '@frontend-appointment/ui-components'
import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime'
import PatientNameWithMobileNumber from '../CommonComponents/table-components/PatientNameWithMobileNumber'
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'

const AppointmentTransferDataTable = ({tableHandler, paginationProps}) => {
    const {
        isSearchLoading,
        appointmentTransferList,
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
                <h5 className="title">Appointment Transfer Details</h5>
                {!isSearchLoading &&
                !searchErrorMessage &&
                appointmentTransferList.length ? (
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
                                    cellClass: 'first-class',
                                    width: 100
                                },
                                {
                                    headerName: 'Status',
                                    field: 'status',
                                    // headerClass: "fi",
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 60,
                                    valueFormatter:function(params){
                                        return params.value ==='PA'?'CH':'N/A'
                                    }
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
                                    headerName: 'App. No',
                                    field: 'apptNumber',
                                    // headerClass: "fi",
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 120
                                },

                                {
                                    headerName: 'Transferred From Date',
                                    field: 'transferredFromDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140
                                },
                                {
                                    headerName: 'Transferred To Date',
                                    field: 'transferredToDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140
                                },
                                {
                                    headerName: 'Transferred From Time',
                                    field: 'transferredFromTime',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 100
                                },
                                {
                                    headerName: 'Transferred To Time',
                                    field: 'transferredToTime',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 100
                                },
                            
                                // {
                                //   headerName: 'Esewa Id',
                                //   field: 'esewaId',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true
                                // },
                                {
                                    headerName: 'Tranferred From Doctor',
                                    field: 'transferredFromDoctor',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140
                                },
                                {
                                    headerName: 'Transferred To Doctor',
                                    field: 'transferredToDoctor',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140
                                },
                                // {
                                //     headerName: 'Doctor Detail',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true,
                                //     cellRenderer: 'doctorwithSpecializationRenderer'
                                // },
                                {
                                    headerName: 'Transferred from Amount',
                                    field: 'transferredFromAmount',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    valueFormatter:function(params){
                                        return params.value||'N/A'
                                    }
                                },
                                {
                                    headerName: 'Transferred To Amount',
                                    field: 'transferredToAmount',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    valueFormatter:function(params){
                                        return params.value||'N/A'
                                    }
                                },
                            ]}
                            frameworkComponents={{
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
                                    PatientNameWithMobileNumber,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                )
                            }}
                            defaultColDef={{resizable: true}}
                            getSelectedRows={
                                // checkIfRoleExists(props.filteredActions, 4) &&
                                previewCall
                            }
                            rowSelection={'single'}
                            rowData={appointmentTransferList}
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
            {showModal && (
                <PreviewDetails
                    showModal={showModal}
                    setShowModal={setShowModal}
                    transferData={previewData}
                />
            )} 
        </>
    )
}

export default memo(AppointmentTransferDataTable)
