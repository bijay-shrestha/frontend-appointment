import React, {memo} from 'react'
import {Badge} from 'react-bootstrap'

const RequestMethodStatus = props => {
  // console.log('node status',this.props.node);
  return (
    <>
    <div className="request-method">
      {props.node.data.requestMethod === 'GET' ? (
        <Badge variant="primary">GET</Badge>
      ) : props.node.data.requestMethod === 'POST' ? (
        <Badge variant="success">POST</Badge>
      ) : props.node.data.requestMethod === 'PUT' ? (
        <Badge variant="warning">PUT</Badge>
      ) : (
        (props.node.data.requestMethod = 'PATCH' ? (
          <Badge variant="info">PATCH</Badge>
        ) : (
          (props.node.data.requestMethod = 'DELETE' ? (
            <Badge variant="danger">DELETE</Badge>
          ) : (
            <Badge variant="dark">Unknown</Badge>
          ))
        ))
      )}
      </div>
    </>
  )
}

export default memo(RequestMethodStatus)
