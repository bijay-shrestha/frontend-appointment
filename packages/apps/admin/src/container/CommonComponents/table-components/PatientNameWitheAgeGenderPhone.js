import React, {memo} from 'react'

const PatientWithAge = props => {
  return (
    <>
      <ul>
        <li>{props.node.data.patientName.toUpperCase()} ({props.node.data.age}/{props.node.data.gender}){props.node.data.mobileNumber} </li>
        <li>{props.node.data.mobileNumber}</li>
      </ul>
    </>
  )
}

export default memo(PatientWithAge)
