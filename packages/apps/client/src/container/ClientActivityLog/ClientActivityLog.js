import React from 'react'
import AdminActivityLogSearchFilter from './ClientActivityLogSearchFilter'
import AdminActivityLogDataTable from './ClientActivityLogDataTable'
import ClientActivityLogHoc from './ClientActivityLogHoc'

const ClientActivityLog = props => {
  const AcitivityLog = ClientActivityLogHoc(
    ({
      searchHandler,
      paginationProps,
      adminLogData,
      adminLogStatsData,
      adminDiagramStatsData
    }) => (
      <>
        <div>
          <AdminActivityLogSearchFilter searchHandler={searchHandler} />
        </div>

        <div className="">
          <AdminActivityLogDataTable
            tableHandler={adminLogData}
            paginationProps={paginationProps}
            adminLogStatsData={adminLogStatsData}
            adminDiagramStatsData={adminDiagramStatsData}
            fromDate ={searchHandler.searchParameters.fromDate}
            toDate ={searchHandler.searchParameters.toDate}
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <AcitivityLog />
}

export default ClientActivityLog;
