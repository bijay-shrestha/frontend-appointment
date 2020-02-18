import React, {memo} from 'react';
import AppointmentLogSearchFilter from './AppointmentRefundSearchFilter';
import AppointmentRefundDataTable from './AppointmentRefundDataTable';
import AppointRefundApprovalHoc from './AppointmentRefundHoc';

const AppointmentRefundLog = props => {
  const AppoinmentRefund = AppointRefundApprovalHoc(
    ({searchHandler, paginationProps, tableHandler}) => (
      <>
        <div>
          <AppointmentLogSearchFilter searchHandler={searchHandler} />
        </div>

        <div className="">
          <AppointmentRefundDataTable
            tableHandler={tableHandler}
            paginationProps={paginationProps}
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <AppoinmentRefund />
}

export default memo(AppointmentRefundLog)
