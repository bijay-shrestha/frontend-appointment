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
              props.node.data.patientType !== 'N'
                ? 'success'
                : 'primary'
            }
          >
            {props.node.data.isRegistered === 'Y' ||
            props.node.data.patientType !== 'N'
              ? 'REG'
              : 'NEW'}
            &nbsp;
          </Badge>
          ,&nbsp;<i className="fa fa-phone"></i>&nbsp;
          {props.node.data.mobileNumber}&nbsp;
        </li>
      </ul>
    </>
  )
}
export default memo(PatientNameWithAgeGenderPhone)
