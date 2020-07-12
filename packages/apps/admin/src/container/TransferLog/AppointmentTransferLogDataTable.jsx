import React, {memo} from 'react'
import {
    CDataTable,
    CLoading,
    CPagination
} from '@frontend-appointment/ui-elements'
import {Row, Col} from 'react-bootstrap'
import PreviewDetails from './AppointmentTransferLogPreview'
import {
    DoctorWithSpecImage,
    PatientNameWithAgeGenderPhone,
    TransferredFromDateWithTime,
    TransferredToDateWithTime,
    AppointmentNumberWithFollowUpFlag,
    TransferredToDoctorWithSpecImage
    //AppointmentStatusBadges
} from '@frontend-appointment/ui-components'
//import AppointmentDateWithTime from '../CommonComponents/table-components/AppointmentDateWithTime'
//import PatientNameWithMobileNumber from '../CommonComponents/table-components/PatientNameWithAgeAndGender'
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'
import AppointmentLogStatus from '../CommonComponents/table-components/AppointmentLogStatus'

const AppointmentTransferDataTable = ({
                                          tableHandler,
                                          // activeStatus,
                                          // handleStatusChange,
                                          paginationProps
                                      }) => {
    const {
        isSearchLoading,
        appointmentTransferList,
        searchErrorMessage,
        previewCall,
        previewData,
        showModal,
        setShowModal,
        exportExcel
    } = tableHandler

    const {queryParams, totalRecords, handlePageChange} = paginationProps
    return (
        <>
            <div className="manage-details">
                <Row>
                    <Col>
                        <h5 className="title">Transfer Log Details</h5>
                    </Col>

                    <Col>
              <CButton
                id="downloadExcel"
                name="DownloadExcel"
                 onClickHandler={props.exportExcel}
                className="float-right"
                variant="outline-secondary"
              >
                {' '}
                <i className="fa fa-download" />
              </CButton>
            </Col> 
                </Row>

                {/* <AppointmentStatusBadges
          activeStatus={activeStatus}
          handleStatusChange={handleStatusChange}
        /> */}
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
                                    width: 80,
                                    cellRenderer: 'TransferLogStatus'
                                },
                                {
                                    headerName: 'Appt. No',
                                    field: 'apptNumber',
                                    // headerClass: "fi",
                                    resizable: true,
                                    sortable: true,
                                    width: 150,
                                    sizeColumnsToFit: true,

                                    cellRenderer: 'AppointmentNumberWithFollowUpFlag'
                                },
                                {
                                    headerName: 'Patient Detail ',
                                    field: 'patientDetails',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 250,
                                    cellRenderer: 'PatientNameWithAgeGenderPhone'
                                },
                                {
                                    headerName: ' Transf. From Date/Time',
                                    //field: 'transferredFromDate',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140,
                                    cellRenderer: 'TransferredFromDateTime'
                                },
                                {
                                    headerName: 'Transf. To Date/Time',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140,
                                    cellRenderer: 'TransferredToDateTime'
                                },

                                // {
                                //   headerName: 'Esewa Id',
                                //   field: 'esewaId',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true
                                // },
                                {
                                    headerName: 'Transfer From Doctor',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 300,
                                    cellRenderer: 'DoctorWithSpecImage'
                                },
                                {
                                    headerName: 'Transfer To Doctor',
                                    //field: 'transferredToDoctor',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 300,
                                    cellRenderer: 'TransferredToDoctorWithSpecImage'
                                }
                                // {
                                //     headerName: 'Doctor Detail',
                                //     resizable: true,
                                //     sortable: true,
                                //     sizeColumnsToFit: true,
                                //     cellRenderer: 'doctorwithSpecializationRenderer'
                                // },
                                // {
                                //   headerName: 'Transf. From Amount',
                                //   field: 'transferredFromAmount',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true,
                                //   PatientNameWithAgeGenderPhone: 100,
                                //   valueFormatter: function (params) {
                                //     return params.value || 'N/A'
                                //   }
                                // },
                                // {
                                //   headerName: 'Transf. To Amount',
                                //   field: 'transferredToAmount',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true,
                                //   valueFormatter: function (params) {
                                //     return params.value || 'N/A'
                                //   }
                                // }
                            ]}
                            frameworkComponents={{
                                DoctorWithSpecImage: PreviewHandlerHoc(
                                    DoctorWithSpecImage,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                TransferredToDoctorWithSpecImage: PreviewHandlerHoc(
                                    TransferredToDoctorWithSpecImage,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                TransferredFromDateTime: PreviewHandlerHoc(
                                    TransferredFromDateWithTime,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                TransferredToDateTime: PreviewHandlerHoc(
                                    TransferredToDateWithTime,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                PatientNameWithAgeGenderPhone: PreviewHandlerHoc(
                                    PatientNameWithAgeGenderPhone,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                AppointmentNumberWithFollowUpFlag: PreviewHandlerHoc(
                                    AppointmentNumberWithFollowUpFlag,
                                    null,
                                    null,
                                    null,
                                    previewCall
                                ),
                                TransferLogStatus: PreviewHandlerHoc(
                                    AppointmentLogStatus,
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
                ) : isSearchLoading && !searchErrorMessage ? (
                    <CLoading/>
                ) : (
                    <div className="filter-message">
                        <div className="no-data">
                            <i className="fa fa-file-text-o"></i>
                        </div>
                        <div className="message"> {searchErrorMessage}</div>
                    </div>
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
