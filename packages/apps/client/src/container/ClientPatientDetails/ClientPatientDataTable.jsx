import React, {memo} from 'react'
import {
  CDataTable,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
import TableAction from '../CommonComponents/table-components/TableAction'
import TableStatus from '../CommonComponents/table-components/StatusLabel'
import PreviewDetails from './ClientPatientPreview'
import PatientEditModal from './ClientPatientEditModal'
import PatientNameWithAgeGenderPhone from '../CommonComponents/table-components/PatientNameWitheAgeGenderPhone'; 

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
    editHandleApi
  } = tableHandler
  const {queryParams, totalRecords, handlePageChange} = paginationProps
  return (
    <>
      <div className="manage-details">
        <h5 className="title">Patient Details</h5>
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
                  width:"260"
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
                  width:140,
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
                  width:120,
                },
                {
                  headerName: 'Hospital No',
                  field: 'hospitalNumber',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                },

                // {
                //   headerName: 'Hospital Name',
                //   field: 'hospitalName',
                //   resizable: true,
                //   sortable: true,
                //   sizeColumnsToFit: true
                // },
               
                {
                  headerName: '',
                  action: 'action',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer: 'childActionRenderer',
                  cellClass: 'actions-button-cell',
                  width:"120",
                  cellRendererParams: {
                    onClick: function (e, id, type) {
                      editHandler(id)
                    },
                    byPass: true,
                    onlyEdit: true
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
                tableStatusRenderer: TableStatus,
                PatientNameWitheAgeGenderPhone:PatientNameWithAgeGenderPhone
              }}
              rowSelection={'single'}
              rowData={patientSearchList}
              getRowHeight={(params)=>function (params) {
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
          <CLoading />
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
