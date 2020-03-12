import React, {memo} from 'react'

const PatientWithAge = props => {
  return (
    <>
      <ul className="doctor-column">
        <li>{props.node.data.patientName} ({props.node.data.age}/{props.node.data.gender})</li>
        <li><i className="fa fa-phone"></i>&nbsp;{props.node.data.mobileNumber} </li>
      </ul>
    </>
  )
}

export default memo(PatientWithAge)
