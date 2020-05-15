import React from 'react';
import AppointmentTransferSearchFilter from './AppointmentTransferLogSearchFilter';
import AppointmentTransferDataTable from './AppointmentTransferLogDataTable';
import AppointmentTransferHoc from './AppointmentTransferHoc';

const TransferApprovalLog = props => {
  const TransferApproval = AppointmentTransferHoc(
    ({searchHandler, paginationProps, tableHandler}) => (
      <>
        <div>
          <AppointmentTransferSearchFilter searchHandler={searchHandler} />
        </div>

        <div className="">
          <AppointmentTransferDataTable
            tableHandler={tableHandler}
            paginationProps={paginationProps}

          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <TransferApproval/>
}

export default TransferApprovalLog
