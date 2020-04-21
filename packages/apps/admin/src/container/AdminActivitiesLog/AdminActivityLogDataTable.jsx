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
import EmailWithMobileNumber from '../CommonComponents/table-components/EmailWithMobileNumber'
import './activity-log.scss'
const AppointmentRefundDataTable = ({
  tableHandler,
  paginationProps,
  adminLogStatsData
}) => {
  const {
    isSearchLoading,
    searchErrorMessage,
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
      '#0063ff',
      '#CCCCB3',
      '#003B46',
      '#FFCAFF',
      '#A2C523',
      '#FFBB00',
      '#EAEC93',
      '#D7FBE6',
      '#D7FBE6',
      '#34675C',
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
                  width: '80',
                  cellClass: 'first-class'
                },
                {
                  headerName: 'Log Date',
                  field: 'logDate',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  width: '150'
                },
                {
                  headerName: 'Log Time',
                  field: 'logTime',
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
                  width: '150'
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
                  width: '100'
                },
                {
                  headerName: 'OS',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  field: 'os',
                  autoSize: true,
                  width: '60',
                  valueFormatter:function(params){
                    return params.value||'N/A'
                  }
                },
                {
                  headerName: 'Browsers',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  field: 'browsers',
                  autoSize: true,
                  width: '100',
                  valueFormatter:function(params){
                    return params.value||'N/A'
                  }  
                },
                {
                  headerName: 'Location',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  field: 'location',
                  autoSize: true,
                  width: '100',
                  valueFormatter:function(params){
                    return params.value||'N/A'
                  }  
                },
                {
                  headerName: 'Status',
                  field: 'status',
                  resizable: true,
                  sortable: true,
                  sizeColumnsToFit: true,
                  cellRenderer: 'childLabelRenderer',
                  width: '100'
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
                childLabelRenderer: LoggingStatus,
                EmailWithMobileNumber:EmailWithMobileNumber
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
                  headerName: 'Feature/Menu',
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
              maxSize={statsQueryParams.size}
              totalItems={statsTotalRecord}
              currentPage={statsQueryParams.page}
              onPageChanged={handlePageChangeStats}
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
          <CDoughnutChart chartData={chartData} width={160} height={100} />
        ) : null}

        <div className="legend-box clearfix">
          <p>Top Features</p>
            <ul>
              <li><span className="legend"></span> <span>Feature 1 </span></li>
              <li><span className="legend"></span><span>Feature 1 </span></li>
              <li><span className="legend"></span><span>Feature 1 </span> </li>
              <li><span className="legend"></span> <span>Feature 1 </span> </li>
              <li><span className="legend"></span><span>Feature 1 </span></li>
              <li><span className="legend"></span><span>Feature 1 </span> </li>
              <li><span className="legend"></span><span>Feature 1 </span> </li>
              <li><span className="legend"></span><span>Feature 1 </span> </li>
              <li><span className="legend"></span><span>Feature 1 </span> </li>
              <li><span className="legend"></span><span>Feature 1 </span> </li>
            </ul>
          

        </div>

        </div>
        </Col> 
     

        </Row>
    </>
  )
}

export default memo(AppointmentRefundDataTable)
