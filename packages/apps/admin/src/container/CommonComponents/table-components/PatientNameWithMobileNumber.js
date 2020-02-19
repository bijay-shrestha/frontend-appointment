import React, {memo} from 'react'

const PatientWithAgeAndGender = props => {
  return (
    <>
      <ul className="patient-column">
        <li>{props.node.data.patientName.toUpperCase()}</li>
        <li>({props.node.data.patientMobileNumber})</li>
      </ul>
    </>
  )
}

export default memo(PatientWithAgeAndGender)
