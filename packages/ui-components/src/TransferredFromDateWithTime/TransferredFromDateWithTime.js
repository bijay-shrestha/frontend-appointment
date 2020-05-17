import React, {memo} from 'react'

const TransferredFromDateWithTime = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    {props.node.data.transferredFromDate||'N/A'}
                </li>
                <li>
                    <span className="time">
                          <i className="fa fa-clock-o"/> &nbsp;
                        {props.node.data.transferredFromTime||'N/A'}
                     </span>
                </li>
            </ul>
        </>
    )
};

export default memo(TransferredFromDateWithTime);
