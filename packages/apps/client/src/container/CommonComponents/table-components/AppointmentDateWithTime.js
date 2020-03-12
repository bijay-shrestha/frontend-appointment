import React, {memo} from 'react'

const AppointmentDateWithTime = props => {
  return (
    <>
      <ul className="doctor-column">
        <li>
          {props.node.data.appointmentDate} ({props.node.data.appointmentTime})
        </li>
        <li></li>
      </ul>
    </>
  )
}

export default memo(AppointmentDateWithTime)
