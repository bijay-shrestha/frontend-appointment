import React, {memo} from 'react'

const AppointmentAmountWithTransactionNumber = props => {
    return (
        <>
            <ul className="doctor-column">
                <li>{props.node.data.transactionNumber}</li>
                <li>
          <span className="spec">
            <i className="fa fa-money "></i>&nbsp;
              {props.node.data.revenueAmount || props.node.data.refundAmount}
          </span>
                </li>
            </ul>
        </>
    )
}

export default memo(AppointmentAmountWithTransactionNumber)
