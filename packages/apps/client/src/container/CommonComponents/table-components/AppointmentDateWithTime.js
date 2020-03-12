import React, {memo} from 'react'

const AppointmentDateWithTime = (props) => {
    return (
        <>
            <ul className="doctor-column">
                <li>
                 {props.node.data.appointmentDate},
                </li>
                <li>
                 {props.node.data.appointmentTime}
                </li>
            </ul>
        </>
    )
};

export default memo(AppointmentDateWithTime);
