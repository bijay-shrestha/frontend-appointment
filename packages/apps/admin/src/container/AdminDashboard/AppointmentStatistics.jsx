import React, {memo} from 'react'
import {
  Image,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form
} from 'react-bootstrap'

const AppointmentStatistics = props => {
  return (
    <>
      <h5 className="title">Appointment Statistics</h5>
      <div className="appointment-box">
        <Row>
          <Col>
            <ButtonGroup aria-label="Basic example" size="sm" className="mb-3">
              <Button variant="outline-secondary">Daily</Button>
              <Button variant="outline-secondary">Weekly</Button>
              <Button variant="outline-secondary">Monthly</Button>
              <Button variant="outline-secondary">Yearly</Button>
            </ButtonGroup>
          </Col>
          <Col className="date">
            <div>
              <span>From :</span> 1-2-2020
            </div>
            <div>
              <span>To :</span> 1-2-2020
            </div>
          </Col>
        </Row>
        <Row>
          <img
            src={require('./img/doughnut-chart.png')}
            className="doughnut-chart mx-auto"
          />
        </Row>
        <p>
          <br></br>1,000
        </p>
        <div className="title">Appointments</div>
        <hr></hr>
        <ul>
          <li>
            <span className="color-code code1">&nbsp;</span>
            <span>200</span>
            <br></br>New Patient
          </li>
          <li>
            <span className="color-code code2">&nbsp;</span>
            <span>800</span>
            <br></br>Registered Patient
          </li>
        </ul>
      </div>
    </>
  )
}
export default memo(AppointmentStatistics)
