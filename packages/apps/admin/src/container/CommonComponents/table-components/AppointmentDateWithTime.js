import React, {memo} from 'react'

const AppointmentDateWithTime = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                    {props.node.data.appointmentDate},
                </li>
                <li>
                    <span className="time">
                          <i className="fa fa-clock-o"/> &nbsp;
                        {props.node.data.appointmentTime}
                     </span>
                </li>
            </ul>
        </>
    )
};

export default memo(AppointmentDateWithTime);
