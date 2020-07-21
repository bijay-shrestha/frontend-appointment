import React, {memo} from 'react'
import {CDataTable, CLoading, CPagination} from '@frontend-appointment/ui-elements'
import PreviewDetails from './PatientPreview'
import PatientEditModal from './PatientEditModal'
import {
    CExcelDownload,
    PatientNameWithAgeGenderPhone,
    StatusLabel,
    TableAction
} from '@frontend-appointment/ui-components';
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'
import {Col, Row} from 'react-bootstrap'

const PatientDataList = ({tableHandler, paginationProps}) => {
    const {
        isSearchLoading,
        patientSearchList,
        searchErrorMessage,
        setShowModal,
        showModal,
        previewCall,
        previewData,
        editHandler,
        isPatientEditLoading,
        patientEditErrorMessage,
        patientUpdate,
        editModal,
        errorMessageForMobileNumber,
        errorMessageForName,
        formValid,
        handleEnter,
        editChange,
        editHandleApi,
        downloadExcel
    } = tableHandler
    const {queryParams, totalRecords, handlePageChange} = paginationProps
    return (
        <>
            <div className="manage-details">
                <Row>
                    <Col>
                        <h5 className="title">Patient Details</h5>
                    </Col>
                    <Col>
                        <CExcelDownload onClickHandler={downloadExcel}/>
                    </Col>
                </Row>
                {!isSearchLoading && !searchErrorMessage && patientSearchList.length ? (
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
                                    width: 130,
                                    sizeColumnsToFit: true,
                                    cellClass: 'first-class'
                                },
                                {
                                    headerName: 'Patient Details',
                                    field: 'name',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'PatientNameWitheAgeGenderPhone',
                                    width: "260"
                                },
                                // {
                                //   headerName: 'Name',
                                //   field: 'name',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true,
                                //   width:"260"
                                // },
                                // {
                                //   headerName: 'Address',
                                //   field: 'address',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true
                                // },
                                // {
                                //   headerName: 'Date of Birth',
                                //   field: 'dateOfBirth',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true
                                // },
                                // {
                                //   headerName: 'Email',
                                //   field: 'email',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true
                                // },
                                {
                                    headerName: 'Reg No',
                                    field: 'registrationNumber',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 140,
                                },
                                // {
                                //   headerName: 'Mobile No',
                                //   field: 'mobileNumber',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true
                                // },
                                {
                                    headerName: 'Esewa Id',
                                    field: 'esewaId',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },
                                // {
                                //   headerName: 'Age',
                                //   field: 'age',
                                //   resizable: true,
                                //   sortable: true,
                                //   sizeColumnsToFit: true
                                // },
                                {
                                    headerName: 'Status',
                                    cellRenderer: 'tableStatusRenderer',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: 120,
                                },
                                {
                                    headerName: 'Hospital No',
                                    field: 'hospitalNumber',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true
                                },

                                {
                                    headerName: 'Client',
                                    field: 'hospitalName',
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
                                    width: "120",
                                    cellRendererParams: {
                                        onClick: function (e, id, type) {
                                            editHandler(id)
                                        },
                                        filteredAction: [{id: 3, 'name': "Edit"}]
                                    },
                                    cellStyle: {overflow: 'visible', 'z-index': '99'}
                                }
                            ]}
                            defaultColDef={{resizable: true}}
                            getSelectedRows={
                                // checkIfRoleExists(props.filteredActions, 4) &&
                                previewCall
                            }
                            frameworkComponents={{
                                childActionRenderer: TableAction,
                                tableStatusRenderer: PreviewHandlerHoc(StatusLabel, null, null, null, previewCall),
                                PatientNameWitheAgeGenderPhone: PreviewHandlerHoc(PatientNameWithAgeGenderPhone, null, null, null, previewCall)
                            }}
                            rowSelection={'single'}
                            rowData={patientSearchList}
                            getRowHeight={(params) => function (params) {
                                return params.data.rowHeight
                            }}
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
                    patientData={previewData}
                />
            ) : (
                ''
            )}
            {editModal ? (
                <PatientEditModal
                    showModal={editModal}
                    setShowModal={setShowModal}
                    patientData={patientUpdate}
                    isPatientEditLoading={isPatientEditLoading}
                    patientEditErrorMessage={patientEditErrorMessage}
                    errorMessageForName={errorMessageForName}
                    formValid={formValid}
                    handleEnterPress={handleEnter}
                    errorMessageForMobileNumber={errorMessageForMobileNumber}
                    onInputChange={editChange}
                    editApiCall={editHandleApi}
                />
            ) : (
                ''
            )}
        </>
    )
}

export default memo(PatientDataList)
