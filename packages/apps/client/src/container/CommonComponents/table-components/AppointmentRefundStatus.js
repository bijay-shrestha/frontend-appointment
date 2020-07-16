import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const AppointmentRefundStatus = props => {
  const {refundStatus} = props.node.data
  const newStatus = refundStatus
  return (
    <>
      {newStatus === 'PA' ? (
        <span>
          <Badge variant="warning">PA</Badge>
        </span>
      ) : newStatus === 'A' ? (
        <span>
          <Badge variant="primary">A</Badge>
        </span>
      ) : newStatus === 'R' ? (
        <span>
          <Badge variant="danger">R</Badge>
        </span>
      ) : //     : status === 'RE' ? (
      //   <span>
      //     <Badge variant="warning">RE</Badge>
      //   </span>
      // )
     (
        <span>
          <Badge variant="">N/A</Badge>
        </span>
      )}
    </>
  )
}
export default memo(AppointmentRefundStatus)
