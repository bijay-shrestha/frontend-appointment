import React, {memo} from 'react'

const TransactionDateWithTime = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    {props.node.data.transactionDate},
                </li>
                <li>
                      <span className="time">
                          <i className="fa fa-clock-o"/> &nbsp;
                          {props.node.data.transactionTime || 'N/A'}
                     </span>
                </li>
            </ul>
        </>
    )
};

export default memo(TransactionDateWithTime);
