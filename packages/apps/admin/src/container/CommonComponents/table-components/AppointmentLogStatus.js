import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const AppointmentLogAction = props => {
  const {status} = props.node.data
  return (
    <>
      {status === 'PA' ? (
        <span>
          <Badge variant="warning">B</Badge>
        </span>
      ) : status === 'A' ? (
        <span>
          <Badge variant="primary">CH</Badge>
        </span>
      ) : status === 'C' ? (
        <span>
          <Badge variant="danger">C</Badge>
        </span>
      ) : //     : status === 'RE' ? (
      //   <span>
      //     <Badge variant="warning">RE</Badge>
      //   </span>
      // )
      status === 'RE' ? (
        <span>
          <Badge variant="brown">RE</Badge>
        </span>
      ) : (
        <span>
          <Badge variant="">N/A</Badge>
        </span>
      )}
    </>
  )
}
export default memo(AppointmentLogAction)
