import React, {memo} from 'react';
import {Badge} from 'react-bootstrap';


const AppointmentAmountWithTransactionNumber = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                {props.node.data.transactionNumber}

                </li>
                <li>
                    <span className="spec">
                    <i className="fa fa-money "></i>&nbsp;
                   {props.node.data.revenueAmount}
                    </span>
                </li>
            </ul>
        </>
    )
};

export default memo(AppointmentAmountWithTransactionNumber)
