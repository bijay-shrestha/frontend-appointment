import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const AppointmentLogAction = props => {
  const {status,refundStatus} = props.node.data
  const newStatus = status||refundStatus
  return (
    <>
      {newStatus === 'PA' ? (
        <span>
          <Badge variant="warning">B</Badge>
        </span>
      ) : newStatus === 'A' ? (
        <span>
          <Badge variant="primary">CH</Badge>
        </span>
      ) : newStatus === 'C' ? (
        <span>
          <Badge variant="danger">C</Badge>
        </span>
      ) : //     : status === 'RE' ? (
      //   <span>
      //     <Badge variant="warning">RE</Badge>
      //   </span>
      // )
      newStatus === 'RE' ? (
        <span>
          <Badge variant="brown">R</Badge>
        </span>
      ) : 
      newStatus === 'R' ? (
        <span>
          <Badge variant="brown">R</Badge>
        </span>
      ):
      (
        <span>
          <Badge variant="">N/A</Badge>
        </span>
      )}
    </>
  )
}
export default memo(AppointmentLogAction)
