import React from 'react'
import {Badge, Col, Row, Button} from 'react-bootstrap'
import {appointmentRefundStatusList} from '@frontend-appointment/helpers'
const AppointmentStatusBadges = props => {
  const {activeStatus, handleStatusChange} = props
  // console.log('handle', handleStatusChange)
  return (
    <>
      <Row>
        <Col>
          <div className="appointment-badge float-right">
            {appointmentRefundStatusList.map(
              (atList, index) => {
                return (
                  <span key={'app-status-badges' + atList.value + index}>
                    <Badge variant={atList.variant}>
                      { atList.value === 'All'
                        ? ''
                        : atList.value}
                    </Badge>
                    &nbsp;
                    <Button
                      id="status-link-button"
                      variant="link"
                      className={activeStatus === atList.value ? 'active' : ''}
                      onClick={event => handleStatusChange(event, atList.value)}
                    >
                      {atList.label}
                    </Button>
                  </span>
                )
              }
            )}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AppointmentStatusBadges
