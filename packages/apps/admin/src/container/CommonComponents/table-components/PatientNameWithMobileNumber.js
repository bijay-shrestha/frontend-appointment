import React, {memo} from 'react'

const PatientWithMobileNumber = props => {
  return (
    <>
      <ul className="patient-column">
        <li>{props.node.data.patientName},</li>
        <li>{props.node.data.patientMobileNumber}</li>
      </ul>
    </>
  )
}

export default memo(PatientWithMobileNumber)
