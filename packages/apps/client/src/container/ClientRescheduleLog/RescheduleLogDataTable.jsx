import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import AppointmentLogAction from '../CommonComponents/table-components/AppointmentLogStatus';
import {AppointmentNumberWithFollowUpFlag, PatientNameWithAgeGenderPhone,DoctorWithSpecImage} from "@frontend-appointment/ui-components";
import AppointmentDateWithTime
    from "../CommonComponents/table-components/AppointmentDateWithTime";

const RescheduleLogDataTable = ({rescheduleLogData, paginationProps}) => {
    const {
        isRescheduleLogLoading,
        rescheduleLogList,
        searchErrorMessage
    } = rescheduleLogData;
    const {queryParams, totalRecords, handlePageChange} = paginationProps;
    return (
        <>
            <div className="manage-details">
                <h5 className="title">Reschedule Log Details</h5>
                {!isRescheduleLogLoading &&
                !searchErrorMessage &&
                rescheduleLogList.length ? (
                    <>
                        <CDataTable
                            classes="ag-theme-balham"
                            id="roles-table"
                            width="100%"
                            height="460px"
                            enableSorting
                            editType
                            rowHeight="65"
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
                                    width: '140'
                                },
                                // {
                                //     headerName: 'Hospital Name',
                                //     field: 'hospitalName',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true,
                                // },
                                {
                                    headerName: 'App. Date',
                                    field: 'appointmentDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'appointmentDateAndTime'
                                },
                                {
                                    headerName: 'Reschedule Date',
                                    field: 'rescheduleAppointmentDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,

                                },
                                // {
                                //     headerName: 'Appointment Time',
                                //     field: 'appointmentTime',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true
                                // },
                                {
                                    headerName: 'App. No.',
                                    field: 'appointmentNumber',
                                    // headerClass: "fi",
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: "appNoWithFollowUp"
                                },
                                {
                                    headerName: 'Patient Info',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'patientRenderer',
                                    width: "260",
                                },
                                {
                                    headerName: 'Reg. No.',
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
                                    headerName: 'Doctor(Specialization)',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'doctorWithSpecializationRenderer',
                                    width: "260",
                                },
                                // {
                                //     headerName: 'Transaction Number',
                                //     field: 'transactionNumber',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true
                                // },
                                // {
                                //     headerName: 'Appointment Amount',
                                //     field: 'appointmentAmount',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true
                                // },
                                // {
                                //     headerName: 'Remarks',
                                //     field: 'remarks',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true
                                // }
                            ]}
                            frameworkComponents={{
                                doctorWithSpecializationRenderer: DoctorWithSpecImage,
                                statusRenderer: AppointmentLogAction,
                                patientRenderer: PatientNameWithAgeGenderPhone,
                                appointmentDateAndTime: AppointmentDateWithTime,
                                appNoWithFollowUp: AppointmentNumberWithFollowUpFlag
                            }}
                            defaultColDef={{resizable: true}}
                            // getSelectedRows={
                            //     // checkIfRoleExists(props.filteredActions, 4) &&
                            //     previewCall
                            // }
                            rowSelection={'single'}
                            rowData={rescheduleLogList}
                        />
                        <CPagination
                            totalItems={totalRecords}
                            maxSize={queryParams.size}
                            currentPage={queryParams.page}
                            onPageChanged={handlePageChange}
                        />
                    </>
                ) : !isRescheduleLogLoading && searchErrorMessage ? (
                    <div className="filter-message">
                        <div className="no-data">
                            <i className="fa fa-file-text-o"/>
                        </div>
                        <div className="message"> {searchErrorMessage}</div>
                    </div>
                ) : (
                    <CLoading/>
                )}
            </div>
        </>
    )
};

export default memo(RescheduleLogDataTable);
