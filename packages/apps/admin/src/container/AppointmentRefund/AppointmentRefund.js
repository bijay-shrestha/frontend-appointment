import React, {PureComponent} from 'react'
import AppointmentLogSearchFilter from './AppointmentRefundSearchFilter'
import AppointmentRefundDataTable from './AppointmentRefundDataTable'
import AppointRefundApprovalHoc from './AppointmentRefundHoc'
import {Col, Container, Row} from 'react-bootstrap'

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

export default AppointmentRefundLog
