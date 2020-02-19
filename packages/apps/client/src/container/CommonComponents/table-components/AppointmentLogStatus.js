import React, {memo} from 'react'
import {Badge} from 'react-bootstrap';

const AppointmentLogAction = props => {
  const {status} = props.node.data
  return (
    <>
      {status === 'PA' ? (
        <span>
          <Badge variant="primary">PA</Badge>
        </span>
      ) : status === 'A' ? (
        <span>
          <Badge variant="success">A</Badge>
        </span>
      ) : status === 'C' ? (
        <span>
          <Badge variant="danger">C</Badge>
        </span>
      ) : status === 'RE' ? (
        <span>
          <Badge variant="warning">RE</Badge>
        </span>
      ) : (
        <span>
          <Badge variant="dark">R</Badge>
        </span>
      )}
    </>
  )
}
export default memo(AppointmentLogAction);
