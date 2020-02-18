import React, {PureComponent} from 'react'
import AppointmentLogSearchFilter from './AppointmentLogSearchFilter'
import AppointmentLogDataTable from './AppointmentLogDataTable'
import AppointmentLogHoc from './AppointmentLogHoc'

const AppointmentRefundLog = props => {
  const AppoinmentRefund = AppointmentLogHoc(
    ({searchHandler, paginationProps, tableHandler}) => (
      <>
        <div>
          <AppointmentLogSearchFilter searchHandler={searchHandler} />
        </div>

        <div className="">
          <AppointmentLogDataTable
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

export default AppointmentRefundLog
