import React, {PureComponent} from 'react'
import AppointmentLogSearchFilter from './AppointmentLogSearchFilter'
import AppointmentLogDataTable from './AppointmentLogDataTable'
import AppointmentLogHoc from './AppointmentLogHoc'
import { Table} from 'react-bootstrap';

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
        <div className="revenue-details">
          <h5 className="title">Revenue Details </h5>
          <Table >
            <thead>
              <tr>

                <th>Status</th>
                <th>Revenue</th>
                <th>App. Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>

                <td>Checked-In</td>
                <td>NPR 2000</td>
                <td>10</td>
              </tr>
              <tr>

                <td>Refunded Percentage</td>
                <td>NPR 2000</td>
                <td>10</td>
              </tr>

              <tr>

                <td>Cancelled</td>
                <td>NPR 2000</td>
                <td>10</td>
              </tr>

              <tr>
                <td>Booked</td>
                <td>NPR 2000</td>
                <td>10</td>
              </tr>

              <tr>
                <td>Refunded</td>
                <td>- NPR 2000</td>
                <td>10</td>
              </tr>

              <tr className="total">

                <td >Total</td>
                <td>NPR 300000</td>
                <td>30</td>
              </tr>
            </tbody>
          </Table>
        </div>


      <div className="revenue-breakdown">
        <h5>Revenue Breakdown</h5>
        <p>Client Revenue Amount = Revenue from Checked-In+ Revenue from Refund + Revenue from Cancelled </p>
      <p>Client Revenue Amount (Including Booked Appointments) = Revenue from Checked-In+ Revenue from Refund + Revenue from Cancelled +Revenue from Booked</p>
  </div>
                   
      </>
    ),
    props,
    ''
  )

  return <AppoinmentRefund />
}

export default AppointmentRefundLog
