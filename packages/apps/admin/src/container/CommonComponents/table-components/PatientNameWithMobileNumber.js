import React, {memo} from 'react'

const PatientWithMobileNumber = props => {
  return (
    <>
      <ul className="patient-column">
        <li>{props.node.data.patientName},</li>
        <li><i className="fa fa-phone"></i>&nbsp;{props.node.data.patientMobileNumber}</li>
      </ul>
    </>
  )
}

export default memo(PatientWithMobileNumber)
