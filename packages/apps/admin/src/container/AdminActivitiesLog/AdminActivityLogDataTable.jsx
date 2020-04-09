import React, {memo} from 'react'
import {
  CButton,
  CDataTable,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
//import DoctorWithSpecialization from '../CommonComponents/table-components/DoctorWithSpecialization'
import AppointmentLogAction from '../CommonComponents/table-components/AppointmentLogStatus'
import {Row, Col, Badge} from 'react-bootstrap'
import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'
const AppointmentRefundDataTable = ({tableHandler, paginationProps}) => {
  const {
    isSearchLoading,
    logList,
    searchErrorMessage,
    previewCall,
    previewData,
    showModal,
    setShowModal,
    logList
  } = tableHandler
  const {
    isLogStatsSearchSearchLoading,
    logStatsSearchData,
    logStatsSearchErrorMessage
  } = adminLogStatsData
  const {queryParams, totalRecords, handlePageChange} = paginationProps
  return (
    <>
      <div className="manage-details">
        <Row>
          <Col>
            <h5 className="title">Appointment Activity Details</h5>
          </Col>
        </Row>
        {!isSearchLoading && !searchErrorMessage && logList.length ? (
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
                  headerName: 'Log Date & Time',
                  field: 'dateTime',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: '200'
                },
                {
                  headerName: 'Log Username',
                  field: 'userName',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: '140'
                },
                {
                  headerName: 'IP Address',
                  resizable: true,
                  sortable: true,
                  field: 'ipAddress',
                  sizeColumnsToFit: true,
                  autoSize: true,
                  autoWidth: true,
                  width: '300'
                },

                {
                  headerName: 'Features/Menu',
                  field: 'features',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: '180'
                },
                {
                  headerName: 'Action/Type',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  field: 'action',
                  autoSize: true,
                  width: '300'
                },
                {
                  headerName: 'Log Description',
                  field: 'logDescription',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                }
              ]}
              frameworkComponents={{
                statusRenderer: PreviewHandlerHoc(
                  AppointmentLogAction,
                  null,
                  null,
                  null,
                  previewCall
                )
              }}
              defaultColDef={{resizable: true}}
              //getSelectedRows={
              //}
              rowSelection={'single'}
              rowData={logList}
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
      {/* 
            {showModal ? (
                <PreviewDetails
                    showModal={showModal}
                    setShowModal={setShowModal}
                    logData={previewData}
                />
            ) : (
                ''
            )} */}
    </>
  )
}

export default memo(AppointmentRefundDataTable)
