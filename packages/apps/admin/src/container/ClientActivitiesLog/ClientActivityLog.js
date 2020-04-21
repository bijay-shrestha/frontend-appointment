import React from 'react'
import AdminActivityLogSearchFilter from './ClientActivityLogSearchFilter'
import AdminActivityLogDataTable from './ClientActivityLogDataTable'
import AdminActivityLogHoc from './AdminActivityLogHoc'

const AdminActivityLog = props => {
  const AcitivityLog = AdminActivityLogHoc(
    ({searchHandler, paginationProps, adminLogData,adminLogStatsData}) => (
      <>
        <div>
          <AdminActivityLogSearchFilter searchHandler={searchHandler}  />
        </div>

        <div className="">
          <AdminActivityLogDataTable
            tableHandler={adminLogData}
            paginationProps={paginationProps}
            adminLogStatsData={adminLogStatsData}
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <AcitivityLog/>
}

export default AdminActivityLog;
