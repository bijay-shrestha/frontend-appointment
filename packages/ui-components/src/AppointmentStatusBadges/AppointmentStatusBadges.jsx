import React from 'react'
import {Badge, Col, Row, Button} from 'react-bootstrap'
import {appointmentStatusListForAppontmentAndTransaction} from '@frontend-appointment/helpers'
const AppointmentStatusBadges = props => {
  const {activeStatus, handleStatusChange} = props
  console.log('handle', handleStatusChange)
  return (
    <>
      <Row>
        <Col>
          <div className="appointment-badge float-right">
            {appointmentStatusListForAppontmentAndTransaction.map(atList => {
              return (
                <span>
                  <Badge variant={atList.variant}>
                    &nbsp;{atList.value === 'PA' ? 'B' : atList.value}
                  </Badge>
                  &nbsp;
                  <Button
                    variant="link"
                    className={activeStatus === atList.value ? 'active' : ''}
                    onClick={event => handleStatusChange(event, atList.value)}
                  >
                    {atList.label}
                  </Button>
                </span>
              )
            })}
          </div>
        </Col>
      </Row>
    </>
  )
}

export default AppointmentStatusBadges
