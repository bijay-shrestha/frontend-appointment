import React, {memo} from 'react'

const EmailWithMobileNumber = props => {
  return (
    <>
      <ul className="patient-column">
        <li>{props.node.data.email}</li>
        <li><i className="fa fa-phone"></i>&nbsp;{props.node.data.mobileNumber}</li>
      </ul>
    </>
  )
}

export default memo(EmailWithMobileNumber)
