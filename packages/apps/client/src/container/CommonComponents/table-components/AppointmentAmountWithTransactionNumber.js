import React, {memo} from 'react';
import {Badge} from 'react-bootstrap';


const AppointmentAmountWithTransactionNumber = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    {props.node.data.appointmentAmount}
                </li>
                <li>
                    <span className="spec">
                    <i className="fa fa-money "></i>&nbsp;
                    {props.node.data.transactionNumber}
                    </span>
                </li>
            </ul>
        </>
    )
};

export default memo(AppointmentAmountWithTransactionNumber)
