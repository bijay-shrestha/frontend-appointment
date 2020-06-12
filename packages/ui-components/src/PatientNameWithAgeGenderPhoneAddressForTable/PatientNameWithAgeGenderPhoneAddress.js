import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const PatientNameWithAgeGenderPhone = props => {
  return (
    <>
      <ul className="patient-column">
        <li>
          {props.node.data.patientName} , {props.node.data.age}/
          {props.node.data.gender}
        </li>
        <li>
          {' '}
          <Badge
            variant={
              props.node.data.isRegistered === 'Y' ||
              props.node.data.patientType === 'R'
                ? 'success'
                : 'primary'
            }
          >
            {props.node.data.isRegistered === 'Y' ||
            props.node.data.patientType === 'R'
              ? 'REG'
              : 'NEW'}
            &nbsp;
          </Badge>
          ,&nbsp;<i className="fa fa-phone"></i>&nbsp;
          {props.node.data.mobileNumber}&nbsp;
        </li>
        <li>
          <i className="fa fa-address-card"></i>&nbsp;
          {props.node.data.address||'N/A'}
        </li>
      </ul>
    </>
  )
}
export default memo(PatientNameWithAgeGenderPhone)
