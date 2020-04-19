import React, {memo} from 'react'
import {
  Row,
  Col,
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
      return newLineData
    })
    return newLineData
  }

  const mapKeysToArray = revenueStatsData => {
    let keysLabel = []
    if (Object.keys(revenueStatsData))
      keysLabel = [...Object.keys(revenueStatsData)]
      // if (props.revenueFilter === 'M') {
      //   Object.keys(revenueStatsData).map((revenueKey, index) => {
      //     if ((index) % 7 === 0) keysLabel.push(revenueKey)
      //     else{
      //       keysLabel.push("")
      //     }
      //   })
      // } else {
        
      //}

    return keysLabel
  }

  newLineData = [...changeObjectToArray(revenueStatsData)]
  newRevenueStatsData = mapKeysToArray(revenueStatsData)
  return (
    // <Col lg={7}>
    <>
    
        <h5 className="title">Revenue Trend</h5>
    
        <div className="line-chart">
          {!isRevenueStatsLoading && !revenueStatsErrorMessage ? (
            <>
              <Row>
                <Col>
                <CDateButtonPills
                  onPillsClickHandler={props.onPillsClickHandler}
                  type="refund"
                  variant="outline-secondary"
                  data={props.revenueFilter}
                />
                </Col>
                <Col xs={12} md={4} className="">
                  <Col className="date">
                    <div>
                      <span>From :</span> {fromDate.revFromDate.toDateString()}
                    </div>
                    <div>
                      <span>To :</span> {toDate.revToDate.toDateString()}
                    </div>
                  </Col>
                </Col>
              </Row>

              <Row>
                <CLineChart
                  lineData={newLineData}
                  labels={newRevenueStatsData ? newRevenueStatsData : []}
                  width={400}
                  height={320}
                  options={{ maintainAspectRatio: true }}
                  revenueFilter={props.revenueFilter}
                />
              </Row>
            </>
          ) : isRevenueStatsLoading ? (
            <CLoading />
          ) : (
            <span>
              <p>{revenueStatsErrorMessage}</p>
            </span>
          )}
        </div>
     
      </>
    // </Col>
  )
}
export default memo(RevenueTrend)
