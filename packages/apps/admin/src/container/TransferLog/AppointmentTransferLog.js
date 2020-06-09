import React from 'react'
import AppointmentTransferSearchFilter from './AppointmentTransferLogSearchFilter'
import AppointmentTransferDataTable from './AppointmentTransferLogDataTable'
import AppointmentTransferHoc from './AppointmentTransferLogHoc'

const TransferApprovalLog = props => {
  const TransferApproval = AppointmentTransferHoc(
    ({
      searchHandler,
      paginationProps,
      tableHandler,
      activeStatus,
      handleStatusChange
    }) => (
      <>
        <div>
          <AppointmentTransferSearchFilter searchHandler={searchHandler} />
        </div>

        <div className="">
          <AppointmentTransferDataTable
            tableHandler={tableHandler}
            paginationProps={paginationProps}
            activeStatus={activeStatus}
            handleStatusChange={handleStatusChange}
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <TransferApproval />
}

export default TransferApprovalLog
