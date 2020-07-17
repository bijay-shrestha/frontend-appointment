import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements';
import {Col, Row} from 'react-bootstrap';
import AppointmentLogAction from '../CommonComponents/table-components/AppointmentLogStatus'
import {
    AppointmentNumberWithFollowUpFlag,
    AppointmentStatusBadges,
    CExcelDownload,
    DepartmentNameWithRoomNumberAndBillingMode,
    DoctorWithSpecImage,
    PatientNameWithAgeGenderPhone
} from '@frontend-appointment/ui-components'
import {CommonUtils} from '@frontend-appointment/helpers'
import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime'
import PreviewDetails from './AppointmentLogPreview'
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'
import AppointmentAmountWithTransactionNumber
    from '../CommonComponents/table-components/AppointmentAmountWithTransactionNumber'

const {filterAppointmentServiceType} = CommonUtils
const AppointmentRefundDataTable = ({
                                        tableHandler,
                                        paginationProps,
                                        activeStatus,
                                        handleStatusChange
                                    }) => {
    const {
        isSearchLoading,
        appointmentLogList,
        searchErrorMessage,
        previewCall,
        previewData,
        showModal,
        setShowModal,
        appointmentServiceTypeCode,
        downloadExcel
    } = tableHandler
    const headerNameForDoctorOrDepartment = filterAppointmentServiceType(
        appointmentServiceTypeCode,
        'DOC'
    )
        ? 'Doctor Details'
        : 'Department Details'
    const componentRendererDoctorOrDepartment = filterAppointmentServiceType(
        appointmentServiceTypeCode,
        'DOC'
    )
        ? 'doctorwithSpecializationRenderer'
        : 'departmentWithRoomNumberAndBillingMode'
    const {queryParams, totalRecords, handlePageChange} = paginationProps
    return (
        <>
            <div className="manage-details">

                <Row>
                    <Col>
                        <h5 className="title">Appointment Log Details</h5>
                    </Col>
                    {
                        !isSearchLoading &&
                        !searchErrorMessage &&
                        appointmentLogList.length ?
                            <Col>
                                <CExcelDownload onClickHandler={downloadExcel}/>
                            </Col>
                            : ''}
                </Row>

                <AppointmentStatusBadges
                    activeStatus={activeStatus}
                    handleStatusChange={handleStatusChange}
                />

                {!isSearchLoading &&
                !searchErrorMessage &&
                appointmentLogList.length ? (
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
                                    width: '150',
                                    cellClass: 'first-class'
                                },
                                {
                                    headerName: 'Status',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    supprestSizeToFit: false,
                                    width: 120,
                                    cellRenderer: 'statusRenderer'
                                },
                                // {
                                //   headerName: 'Hospital Name',
                                //   field:'hospitalName',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true,
                                // },
                                {
                                    headerName: 'App. No',
                                    field: 'appointmentNumber',
                                    // headerClass: "fi",
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: '140',
                                    cellRenderer: 'appointmentNumberWithFollowUpFlag'
                                },
                                {
                                    headerName: 'App. DateTime',
                                    field: 'appointmentDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: '200',
                                    cellRenderer: 'AppointmentDateWithTime'
                                },
                                // {
                                //     headerName: 'App. Time',
                                //     field: 'appointmentTime',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true,
                                //     width: "140"
                                // },
                                {
                                    headerName: 'Patient Details',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'PatientNameWitheAgeGenderPhone',
                                    autoSize: true,
                                    width: '300'
                                },
                                {
                                    headerName: 'Reg. No',
                                    field: 'registrationNumber',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: '180'
                                },

                                // {
                                //     headerName: 'DOB',
                                //     field: 'patientDob',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true,
                                //     width: '180'

                                // },
                                // {
                                //     headerName: 'Mobile No.',
                                //     field: 'mobileNumber',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true,
                                //     width: "140",
                                // },
                                {
                                    headerName: 'Address',
                                    field: 'patientAddress',
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
                                    autoSize: true,
                                    autoWidth: true,
                                    width: '300'
                                },
                                {
                                    headerName: 'Txn. Detail (No/Amount)',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'transactionDetail',
                                    autoSize: true,
                                    autoWidth: true,
                                    width: '180'
                                }
                                // {
                                //     headerName: 'Txn. Date',
                                //     field: 'transactionDate',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true
                                // },
                            ]}
                            frameworkComponents={{
                                doctorwithSpecializationRenderer: PreviewHandlerHoc(
                                    DoctorWithSpecImage,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                departmentWithRoomNumberAndBillingMode: PreviewHandlerHoc(
                                    DepartmentNameWithRoomNumberAndBillingMode,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                statusRenderer: PreviewHandlerHoc(
                                    AppointmentLogAction,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                PatientNameWitheAgeGenderPhone: PreviewHandlerHoc(
                                    PatientNameWithAgeGenderPhone,
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
                                transactionDetail: PreviewHandlerHoc(
                                    AppointmentAmountWithTransactionNumber,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                appointmentNumberWithFollowUpFlag: PreviewHandlerHoc(
                                    AppointmentNumberWithFollowUpFlag,
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
                            rowData={appointmentLogList}
                        />

                        {/*<div className=" total-amount">*/}
                        {/*<span>*/}
                        {/*Total Amount :*/}
                        {/*</span>*/}
                        {/*    <span> Rs {totalAmount}</span>*/}
                        {/*</div>*/}
                        <CPagination
                            totalItems={totalRecords}
                            maxSize={queryParams.size}
                            currentPage={queryParams.page}
                            onPageChanged={handlePageChange}
                        />
                    </>
                ) : isSearchLoading && !searchErrorMessage ? (
                    <CLoading/>
                ) : (
                    <div className="filter-message">
                        <div className="no-data">
                            <i className="fa fa-file-text-o"></i>
                        </div>
                        <div className="message">
                            {' '}
                            {searchErrorMessage || 'No Appointment(s) Found'}
                        </div>
                    </div>
                )}
            </div>
            {showModal ? (
                <PreviewDetails
                    appointmentServiceTypeCode={appointmentServiceTypeCode}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    logData={previewData}
                />
            ) : (
                ''
            )}
        </>
    )
}

export default memo(AppointmentRefundDataTable)
