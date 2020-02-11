import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const DoctorWithSpecialization = () => {
  return (
    <>
      <span>
        Dr. {props.node.data.doctorName} {props.node.data.specializationName}
      </span>
    </>
  )
}

export default memo(DoctorWithSpecialization)
