import React, {memo} from 'react'

const AppointmentAmountWithTransactionNumber = props => {
    return (
        <>
            <ul className="doctor-column">
                <li>{props.node.data.transactionNumber || 'N/A'}</li>
                <li>
          <span className="spec">
            <i className="fa fa-money "></i>&nbsp;
              {/* <span className="fa-money">NPR &nbsp;</span> */}
              {props.node.data.revenueAmount || props.node.data.refundAmount || props.node.data.appointmentAmount}
          </span>
                </li>
            </ul>
        </>
    )
}

export default memo(AppointmentAmountWithTransactionNumber)
