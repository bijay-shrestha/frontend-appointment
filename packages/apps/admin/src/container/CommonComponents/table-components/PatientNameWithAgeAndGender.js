import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const PatientWithAgeAndGender = props => {
  return (
    <>
      <span>
        {props.node.data.patientName} ({props.node.data.age}/:
        {props.node.data.genderCode})
      </span>
    </>
  )
}

export default memo(PatientWithAgeAndGender)
