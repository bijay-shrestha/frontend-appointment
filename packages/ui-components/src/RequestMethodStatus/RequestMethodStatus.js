import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const RequestMethodStatus = props => {
  // console.log('node status',this.props.node);
  return (
    <>
      {props.node.data.requestMethod === 'GET' ? (
        <Badge variant="success">GET</Badge>
      ) : props.node.data.requestMethod === 'POST' ? (
        <Badge variant="primary">POST</Badge>
      ) : props.node.data.requestMethod === 'PUT' ? (
        <Badge variant="light">PUT</Badge>
      ) : (
        (props.node.data.requestMethod = 'PATCH' ? (
          <Badge variant="warning">PATCH</Badge>
        ) : (
          (props.node.data.requestMethod = 'DELETE' ? (
            <Badge variant="danger">DELETE</Badge>
          ) : (
            <Badge variant="dark">Unknown</Badge>
          ))
        ))
      )}
    </>
  )
}

export default memo(RequestMethodStatus)
