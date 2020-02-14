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
import {CDateButtonPills} from '@frontend-appointment/ui-components'
import {CLineChart, CLoading} from '@frontend-appointment/ui-elements'
const RevenueTrend = props => {
  const {
    isRevenueStatsLoading,
    revenueStatsData,
    revenueStatsErrorMessage,
    fromDate,
    toDate
  } = props.revenueStatistics
  let newLineData = [],
    newRevenueStatsData = []
  const changeObjectToArray = lineData => {
    Object.keys(lineData).map(line => {
      newLineData.push(lineData[line])
    })
    return newLineData
  }
  newLineData = [...changeObjectToArray(revenueStatsData)]
  newRevenueStatsData = Object.keys(revenueStatsData)
    ? Object.keys(revenueStatsData)
    : {}
  return (
    <Col lg={7}>
      <Row>
        <h5 className="title">Revenue Trend</h5>
      </Row>
      <Row>
        {!isRevenueStatsLoading && !revenueStatsErrorMessage ? (
          <div className="chart">
            <Row>
              <CDateButtonPills onPillsClickHandler={props.onPillsClickHandler} type="refund" variant="outline-secondary" data={props.revenueFilter} />
              <Col xs={12} md={4} className="p-0">
                <Col className="date">
                  <div>
                    <span>From :</span>
                    {fromDate.revFromDate.toLocaleDateString()}
                  </div>
                  <div>
                    <span>To :</span> {toDate.revToDate.toLocaleDateString()}
                  </div>
                </Col>
              </Col>
            </Row>

            <Row>
              <CLineChart
                lineData={newLineData}
                labels={newRevenueStatsData ? newRevenueStatsData : []}
                width={600}
                height={350}
              />
            </Row>
          </div>
        ) : isRevenueStatsLoading ? (
          <CLoading />
        ) : (
          <span>
            <p>{revenueStatsErrorMessage}</p>
          </span>
        )}
      </Row>
    </Col>
  )
}
export default memo(RevenueTrend)
