import React, {memo} from 'react'
import {
  Row,
  Col
} from 'react-bootstrap';
import {CDateButtonPills} from '@frontend-appointment/ui-components';


const AppointmentStatistics = props => {
    const {onPillsClickHandler,previousFromDate,currentToDate,chartData} =props
  return(
    <>
      <div className="appointment-box">
        <Row>
          <CDateButtonPills onPillsClickHandler={onPillsClickHandler}/>
          <Col className="date">
            <div>
              <span>From :</span>{previousFromDate} 
            </div>
            <div>
              <span>To :</span>{currentToDate}
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
