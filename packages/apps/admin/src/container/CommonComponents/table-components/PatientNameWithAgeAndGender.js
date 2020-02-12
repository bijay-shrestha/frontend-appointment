import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const PatientWithAgeAndGender = props => {
  return (
    <>
      <span>
        {props.node.data.patientName.toUpperCase()} ({props.node.data.patientAge}/
        {props.node.data.patientGender.split('')[0].toUpperCase()})
      </span>
    </>
  )
}

export default memo(PatientWithAgeAndGender)
