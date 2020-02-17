import React, {memo} from 'react';
import PatientDetailsSearchFilter from './PatientDetailsSearchFilter';
import AppointmentRefundDataTable from './AppointmentRefundDataTable';
import AppointRefundApprovalHoc from './AppointmentRefundHoc';

const AppointmentRefundLog = props => {
  const AppoinmentRefund = AppointRefundApprovalHoc(
    ({searchHandler, paginationProps, tableHandler}) => (
      <>
        <div>
          <PatientDetailsSearchFilter searchHandler={searchHandler} />
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
