import React, {PureComponent} from 'react'
import {Badge} from 'react-bootstrap'

class LoggingStatus extends PureComponent {
  render () {
    return (
      <>
        {this.props.node.data.status === 'Y' ? (
          <Badge variant="success">Success</Badge>
        ) : (
          <Badge variant="danger">Error</Badge>
        )}
      </>
    )
  }
}

export default LoggingStatus
