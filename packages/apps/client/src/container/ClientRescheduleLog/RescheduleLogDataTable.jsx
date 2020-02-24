import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import DoctorWithSpecialization from '../CommonComponents/table-components/DoctorWithSpecialization';
import AppointmentLogAction from '../CommonComponents/table-components/AppointmentLogStatus';
import PatientWithAgeAndGender from '../CommonComponents/table-components/PatientNameWithAgeAndGender'

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
                                    sizeColumnsToFit: true,
                                },
                                {
                                    headerName: 'Previous Appointment Date',
                                    field: 'previousAppointmentDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },
                                {
                                    headerName: 'Reschedule Appointment Date',
                                    field: 'rescheduleAppointmentDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },
                                // {
                                //     headerName: 'Appointment Time',
                                //     field: 'appointmentTime',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true
                                // },
                                {
                                    headerName: 'Appointment Number',
                                    field: 'appointmentNumber',
                                    // headerClass: "fi",
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
                                    headerName: 'Esewa Id',
                                    field: 'esewaId',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },
                                {
                                    headerName: 'Patient Info',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'patientRenderer'
                                },
                                {
                                    headerName: 'Doctor(Specialization)',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'doctorWithSpecializationRenderer'
                                },
                                {
                                    headerName: 'Transaction Number',
                                    field: 'transactionNumber',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },
                                {
                                    headerName: 'Appointment Amount',
                                    field: 'appointmentAmount',
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
                                }
                            ]}
                            frameworkComponents={{
                                doctorWithSpecializationRenderer: DoctorWithSpecialization,
                                statusRenderer: AppointmentLogAction,
                                patientRenderer: PatientWithAgeAndGender
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
