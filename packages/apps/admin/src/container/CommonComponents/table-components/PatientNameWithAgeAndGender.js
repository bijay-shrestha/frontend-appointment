import React, {memo} from 'react'

const PatientWithAgeAndGender = props => {
  return (
    <>
      <ul>
        <li>{props.node.data.patientName.toUpperCase()}</li>
        <li>
          ({props.node.data.patientAge}/
          {props.node.data.patientGender.split('')[0].toUpperCase()})
        </li>
      </ul>
    </>
  )
}

export default memo(PatientWithAgeAndGender)
