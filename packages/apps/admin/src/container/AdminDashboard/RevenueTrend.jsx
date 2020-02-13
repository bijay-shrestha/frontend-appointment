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
const RevenueTrend = props => {
  return (
    <Col lg={7}>
      <Row>
        <h5 className="title">Revenue Trend</h5>
      </Row>
      <Row>
        <div className="chart">
          <Row>
            <Col xs={12} md={8}>
              <ButtonGroup
                aria-label="Basic example"
                size="sm"
                className="mb-3"
              >
                <Button variant="outline-secondary">Daily</Button>
                <Button variant="outline-secondary">Weekly</Button>
                <Button variant="outline-secondary">Monthly</Button>
                <Button variant="outline-secondary">Yearly</Button>
              </ButtonGroup>
            </Col>
            <Col xs={12} md={4} className="p-0">
              <Col className="date">
                <div>
                  <span>From :</span> 1-2-2020
                </div>
                <div>
                  <span>To :</span> 1-2-2020
                </div>
              </Col>
            </Col>
          </Row>

          <Row>
            <img src={require('./img/line-chart.png')} />
          </Row>
        </div>
      </Row>
    </Col>
  )
}
export default memo(RevenueTrend)
