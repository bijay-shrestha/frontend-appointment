import React, {memo} from 'react'
import {
    CButton,
    CDataTable,
    CLoading,
    CPagination
} from '@frontend-appointment/ui-elements'
import DoctorWithSpecialization from '../CommonComponents/table-components/DoctorWithSpecialization';
import AppointmentLogAction from '../CommonComponents/table-components/AppointmentLogStatus';
import PatientWithAgeAndGender from '../CommonComponents/table-components/PatientNameWithAgeAndGender';
import PatientNameWitheAgeGenderPhone from '../CommonComponents/table-components/PatientNameWitheAgeGenderPhone'
import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime'
import PreviewDetails from './AppointmentLogPreview';
import {Row, Col, Badge} from 'react-bootstrap';

const AppointmentRefundDataTable = ({tableHandler, paginationProps}) => {
    const {
        isSearchLoading,
        appointmentLogList,
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
                
          <Row>
          <Col>
                <h5 className="title">Appointment Log Details</h5>
            </Col>  
              
              {/* <Col>
              <CButton
                id="downloadExcel"
                name="DownloadExcel"
                // onClickHandler={props.exportExcel}
                className="float-right"
                variant="outline-secondary"
              >
                {' '}
                <i className="fa fa-download" />
              </CButton>
            </Col>  */}
                </Row>

                <Row>
                    <Col>
                        <div className="appointment-badge float-right">
                            <span><Badge variant="warning">B</Badge>  <span className="badge-data">Booked</span></span>
                            <span><Badge variant="danger">CI</Badge>  <span
                                className="badge-data">Checked-In</span> </span>
                            <span><Badge variant="dark">C</Badge>  <span className="badge-data">Canceled</span></span>
                            {/*<span><Badge variant="warning">RE</Badge>  <span className="badge-data">Rejected</span></span>*/}
                            <span><Badge variant="secondary">R</Badge>  <span
                                className="badge-data">Refunded</span></span>
                        </div>
                    </Col>
                </Row>
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
                                    width: "150",
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
                                    headerName: 'App. DateTime',
                                    field: 'appointmentDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: "200",
                                    cellRenderer : "AppointmentDateWithTime"
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
                                    headerName: 'App. No',
                                    field: 'appointmentNumber',
                                    // headerClass: "fi",
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: "140"
                                },
                                {
                                    headerName: 'Doctor(Specialization)',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'doctorwithSpecializationRenderer',
                                    autoSize: true,
                                    autoWidth: true,
                                    width: "300"
                                },
                           
                                {
                                    headerName: 'Reg. No',
                                    field: 'registrationNumber',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: "180"
                                },
                                {
                                    headerName: 'Patient Details',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'PatientNameWitheAgeGenderPhone',
                                    autoSize: true,
                                    width: "300"
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
                                
                            ]}
                            frameworkComponents={{
                                doctorwithSpecializationRenderer: DoctorWithSpecialization,
                                statusRenderer: AppointmentLogAction,
                                patientRenderer: PatientWithAgeAndGender,
                                PatientNameWitheAgeGenderPhone: PatientNameWitheAgeGenderPhone,
                                AppointmentDateWithTime : AppointmentDateWithTime
                            }}
                            defaultColDef={{resizable: true}}
                            getSelectedRows={
                                // checkIfRoleExists(props.filteredActions, 4) &&
                                previewCall
                            }
                            rowSelection={'single'}
                            rowData={appointmentLogList}

                        />
                        <div className="my-4 ml-0 mr-4">
                            Total Amount : Rs 40000
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
                    logData={previewData}
                />
            ) : (
                ''
            )}
        </>
    )
}

export default memo(AppointmentRefundDataTable)
