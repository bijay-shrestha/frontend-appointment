import React, {memo} from 'react'
import {
  CDataTable,
  CLoading,
  CPagination
} from '@frontend-appointment/ui-elements'
//import DoctorWithSpecialization from '../CommonComponents/table-components/DoctorWithSpecialization'
import StatusLabel from '../CommonComponents/table-components/StatusLabel'
import {Row, Col} from 'react-bootstrap'
//import PreviewHandlerHoc from '../CommonComponents/table-components/hoc/PreviewHandlerHoc'
const AppointmentRefundDataTable = ({
  tableHandler,
  paginationProps,
  adminLogStatsData
}) => {
  const {
    isSearchLoading,
    searchErrorMessage,
    // previewCall,
    // previewData,
    // showModal,
    // setShowModal,
    logList
  } = tableHandler
  const {
    isLogStatsSearchSearchLoading,
    logStatsSearchData,
    logStatsSearchErrorMessage
  } = adminLogStatsData
  const {
    queryParams,
    totalRecords,
    handlePageChange,
    statsQueryParams,
    statsTotalRecord,
    handlePageChangeStats
  } = paginationProps
  return (
    <>
      <div className="manage-details">
        <Row>
          <Col>
            <h5 className="title">Admin Activity Details</h5>
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
                  field: 'logDateTime',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: '200',
                  valueFormatter: function currencyFormatter (params) {
                    return params.value.toString()
                  }
                },
                {
                  headerName: 'Username',
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
                  field: 'feature',
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
                  field: 'actionType',
                  autoSize: true,
                  width: '300'
                },
                {
                  headerName: 'Status',
                  field: 'status',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer: 'childLabelRenderer',
                  width: '120'
                },
                {
                  headerName: 'Log Description',
                  field: 'logDescription',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true
                }
              ]}
              defaultColDef={{resizable: true}}
              rowSelection={'single'}
              rowData={logList}
              frameworkComponents={{
                childLabelRenderer: StatusLabel
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

        <Row>
          <Col>
            <h5 className="title">Admin Activity Count</h5>
          </Col>
        </Row>
        {!isLogStatsSearchSearchLoading &&
        !logStatsSearchErrorMessage &&
        logStatsSearchData.length ? (
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
                  headerName: 'Feature',
                  field: 'feature',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: '200'
                },
                {
                  headerName: 'Count',
                  field: 'count',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: '140'
                }
              ]}
              defaultColDef={{resizable: true}}
              rowSelection={'single'}
              rowData={logStatsSearchData}
            />
            <CPagination
              totalItems={totalRecords}
              maxSize={queryParams.size}
              currentPage={queryParams.page}
              onPageChanged={handlePageChange}
            />
          </>
        ) : !isLogStatsSearchSearchLoading && logStatsSearchErrorMessage ? (
          <div className="filter-message">
            <div className="no-data">
              <i className="fa fa-file-text-o"></i>
            </div>
            <div className="message"> {logStatsSearchErrorMessage}</div>
          </div>
        ) : (
          ''
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
