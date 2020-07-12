import React, {memo} from 'react'

const CancelDateWithTime = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    {props.node.data.cancelledDate || 'N/A'}
                </li>
                <li>
                    <span className="time">
                          <i className="fa fa-clock-o"/> &nbsp;
                        {props.node.data.cancelledTime || 'N/A'}
                     </span>
                </li>
            </ul>
        </>
    )
};

export default memo(CancelDateWithTime);
