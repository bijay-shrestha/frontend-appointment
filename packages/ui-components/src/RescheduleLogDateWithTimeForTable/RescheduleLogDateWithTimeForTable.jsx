import React, {memo} from 'react'

const RescheduleLogDateWithTimeForTable = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    {props.node.data.rescheduleAppointmentDate}
                </li>
                <li>
                    <span className="time">
                          <i className="fa fa-clock-o"/> &nbsp;
                        {props.node.data.rescheduleAppointmentTime}
                     </span>
                </li>
            </ul>
        </>
    )
};

export default memo(RescheduleLogDateWithTimeForTable);
