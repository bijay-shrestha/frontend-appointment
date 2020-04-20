import React, {memo} from 'react'
import {
  CDataTable,
  CLoading,
  CPagination,
  CDoughnutChart
} from '@frontend-appointment/ui-elements'
//import DoctorWithSpecialization from '../CommonComponents/table-components/DoctorWithSpecialization'
import StatusLabel from '../CommonComponents/table-components/StatusLabel'
import {Row, Col} from 'react-bootstrap'
import {LoggingStatus} from '@frontend-appointment/commons'
import './activity-log.scss'
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

  const prepareDataForChart = datas => {
    var getColor = [
      '#C6F9D2',
      '#CCCCB3',
      '#CECEFF',
      '#FFCAFF',
      '#D0CCCD',
      '#FFCC99',
      '#FFCBB9',
      '#EAEC93',
      '#D7FBE6',
      '#FFCACA',
      '#00FF00'
    ]

    let chartData = {
      data: [],
      color: [],
      label: []
    }

    datas.length &&
      datas.map((datum, index) => {
        chartData.data.push(datum.count)
        chartData.label.push(datum.feature)
        chartData.color.push(getColor[index])
      })
    return {
      datasets: [
        {data: [...chartData.data], backgroundColor: [...chartData.color]}
      ],
      labels: [...chartData.label]
    }
  }

  let chartData = null
  if (logStatsSearchData.length) {
    chartData = prepareDataForChart(logStatsSearchData)
  }
  return (
    <>
      <div className="manage-details">
      
        <h5 className="title">Activity Details</h5>
        
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
                  width: '200'
                },
                {
                  headerName: 'IP Address',
                  resizable: true,
                  sortable: true,
                  field: 'ipAddress',
                  sizeColumnsToFit: true,
                  autoSize: true,
                  autoWidth: true,
                  width: '200'
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
                  width: '180'
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
                  sizeColumnsToFit: true,
                  width: '220'
                }
              ]}
              defaultColDef={{resizable: true}}
              rowSelection={'single'}
              rowData={logList}
              frameworkComponents={{
                childLabelRenderer: LoggingStatus
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


      <Row className="activity-container">
        
     <Col md={6}>
        <div   className="activity-count ">
      <Row>
        <Col>
        <h5 className="title"> Activity Statistics</h5>
        
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
      

        </Col> 

        <Col md={6} className="pl-0">
        <div className="activity-log" >
        <Row>
        <Col>
        <h5 className="title"> Activity Statistics Diagram</h5>
        
        </Col>
        </Row>
        {chartData ? (
          <CDoughnutChart chartData={chartData} width={120} height={100} />
        ) : null}

        </div>
        </Col> 
     

        </Row>
    </>
  )
}

export default memo(AppointmentRefundDataTable)
