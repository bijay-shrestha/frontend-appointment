import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const DoctorWithSpecialization = (props) => {
  return (
    <>
      <span>
        Dr. {props.node.data.doctorName.toUpperCase()} ({props.node.data.specializationName.toUpperCase()})
      </span>
    </>
  )
};

export default memo(DoctorWithSpecialization)
