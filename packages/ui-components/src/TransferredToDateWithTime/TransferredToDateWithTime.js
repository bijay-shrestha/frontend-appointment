import React, {memo} from 'react'

const TransferredToDateWithTime = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    {props.node.data.transferredToDate||'N/A'}
                </li>
                <li>
                    <span className="time">
                          <i className="fa fa-clock-o"/> &nbsp;
                        {props.node.data.transferredToTime||'N/A'}
                     </span>
                </li>
            </ul>
        </>
    )
};

export default memo(TransferredToDateWithTime);
