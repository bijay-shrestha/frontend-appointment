import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import AppointmentLogAction from '../CommonComponents/table-components/AppointmentLogStatus';
import {
    AppointmentNumberWithFollowUpFlag,
    PatientNameWithAgeGenderPhone,
    RescheduleLogDateWithTimeForTable,
    DoctorWithSpecImage, DepartmentNameWithRoomNumberAndBillingMode,
    CExcelDownload
} from '@frontend-appointment/ui-components';
import AppointmentDateWithTime from "../CommonComponents/table-components/AppointmentDateWithTime";
import {CommonUtils} from '@frontend-appointment/helpers'
import {Col,Row} from 'react-bootstrap'
const {filterAppointmentServiceType} = CommonUtils

const RescheduleLogDataTable = ({rescheduleLogData, paginationProps}) => {
    const {
        isRescheduleLogLoading,
        rescheduleLogList,
        searchErrorMessage, appointmentServiceTypeCode,
        downloadExcel
    } = rescheduleLogData;
    const {queryParams, totalRecords, handlePageChange} = paginationProps;
    const headerNameForDoctorOrDepartment = filterAppointmentServiceType(
        appointmentServiceTypeCode,
        'DEP'
    )
        ? 'Department Details' : 'Doctor Details'

    const componentRendererDoctorOrDepartment = filterAppointmentServiceType(
        appointmentServiceTypeCode,
        'DEP'
    )
        ? 'departmentWithRoomNumberAndBillingMode' : 'doctorWithSpecializationRenderer'

    return (
        <>
            <div className="manage-details">
                <Row>
                <Col><h5 className="title">Reschedule Log Details</h5></Col>
                <Col><CExcelDownload onClickHandler={downloadExcel}/></Col>
                </Row>
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
                                    width: '140'
                                },
                                {
                                    headerName: 'App. No.',
                                    field: 'appointmentNumber',
                                    // headerClass: "fi",
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: "appNoWithFollowUp"
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
                                    cellRenderer: 'rescheduleDateAndTime'
                                },
                                // {
                                //     headerName: 'Appointment Time',
                                //     field: 'appointmentTime',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true
                                // },

                                {
                                    headerName: 'Patient Details',
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
                                    headerName: headerNameForDoctorOrDepartment,
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: componentRendererDoctorOrDepartment,
                                    width: '300'
                                }
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
                                departmentWithRoomNumberAndBillingMode: DepartmentNameWithRoomNumberAndBillingMode,
                                statusRenderer: AppointmentLogAction,
                                patientRenderer: PatientNameWithAgeGenderPhone,
                                appointmentDateAndTime: AppointmentDateWithTime,
                                rescheduleDateAndTime: RescheduleLogDateWithTimeForTable,
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
