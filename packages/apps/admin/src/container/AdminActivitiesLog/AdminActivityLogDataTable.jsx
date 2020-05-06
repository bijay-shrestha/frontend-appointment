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
import DateWithTime from '../CommonComponents/table-components/DateWithTime'
import BrowserIconComponent from '../CommonComponents/table-components/BrowserIconComponent'
import './activity-log.scss'
import {DateTimeFormatterUtils} from "@frontend-appointment/helpers";

const AdminActivityLogDataTable = ({
                                       tableHandler,
                                       paginationProps,
                                       adminLogStatsData,
                                       adminDiagramStatsData,
                                       fromDate,
                                       toDate
                                   }) => {
    const {isSearchLoading, searchErrorMessage, logList} = tableHandler
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

    const {
        logDiagramSearchData,
        isLogDiagramSearchLoading,
        logDiagramSearchErrorMessage,
        totalCounts
    } = adminDiagramStatsData
    let newFromDate=DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(fromDate.toString());
    let newToDate= DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(toDate.toString());
    const prepareDataForChart = datas => {
        var getColor = [
            '#80b1ff',
            '#0277BD',
            '#fff26b',
            '#FFCAFF',
            '#A2C523',
            '#FFBB00',
            '#EAEC93',
            '#D7FBE6',
            '#34675C',
            '#673451'
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
    if (logDiagramSearchData.length) {
        chartData = prepareDataForChart(logDiagramSearchData)
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
                            height="554px"
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
                                    headerName: 'Log Date/Time',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    width: '130',
                                    cellRenderer: 'LogDateAndTime'
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
                                    headerName: 'Email/Mobile',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    cellRenderer: 'EmailWithMobileNumber',
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
                                    valueFormatter: function (params) {
                                        return params.value || 'Unknown'
                                    }
                                },
                                {
                                    headerName: 'Browsers',
                                    resizable: true,
                                    sortable: true,
                                    sizeColumnsToFit: true,
                                    autoSize: true,
                                    cellRenderer: 'browserIcon',
                                    width: '100'
                                },

                                {
                                  headerName: 'Nearby Location',
                                  resizable: true,
                                  sortable: true,
                                  sizeColumnsToFit: true,
                                  field: 'location',
                                  autoSize: true,
                                  width: '100',
                                  valueFormatter: function (params) {
                                    return params.value || 'Unknown'
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
                                EmailWithMobileNumber: EmailWithMobileNumber,
                                LogDateAndTime: DateWithTime,
                                browserIcon: BrowserIconComponent
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

            <Row className="activity-container">
                <Col md={6}>
                    <div className="activity-count ">
                        <Row>
                            <Col>
                                {/*{console.log("romdate", fromDate.toDateString())}*/}
                                <h5 className="title"> Activity Statistics </h5>
                                <span>as of {newFromDate}
                                    -
                                    {newToDate}</span>
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
                                            headerName: 'Hits',
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
                          <CLoading/>
                        )}
                    </div>
                </Col>

                <Col md={6} className="pl-0">
                    <div className="activity-log">
                        <Row>
                            <Col>
                                <h5 className="title"> Statistics Diagram </h5>
                                <span>as of {newFromDate}
                                    -
                                    {newToDate}</span>
                            </Col>
                        </Row>
                        {logDiagramSearchData.length &&
                        !isLogDiagramSearchLoading &&
                        !logDiagramSearchErrorMessage ? (
                            <>
                                <div className="doughnut-chart">
                                <div  className="mid-data" >
                               {totalCounts}<br/>
                               Total Hits
                               </div>
                                <CDoughnutChart
                                    chartData={chartData}
                                    width={160}
                                    height={100}
                                />
                                </div>
                               
                                <div className="legend-box clearfix">

                                    <p>Top Features</p>
                                    <ul>
                                        {chartData.labels.length &&
                                        chartData.labels.map((datum, index) => {
                                            return (
                                                <li key={'datum' + index}>
                                                    <span className="legend"></span>
                                                    <span className="legend-label">{datum} <span
                                                        className="data"> - {parseFloat(Math.round((chartData.datasets[0].data[index] * 100) / totalCounts))}%</span></span>
                                                    {/* <span className="data">-{parseFloat(Math.round((chartData.datasets[0].data[index]*100)/totalCounts))}%</span> */}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </>
                        ) : !isLogDiagramSearchLoading && logDiagramSearchErrorMessage ? (
                            <div className="filter-message">
                                <div className="no-data">
                                    <i className="fa fa-file-text-o"></i>
                                </div>
                                <div className="message"> {logDiagramSearchErrorMessage}</div>
                            </div>
                        ) : (
                            <CLoading/>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    )
}

export default memo(AdminActivityLogDataTable)
