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
      <Row>
        <h5 className="title">Revenue Trend</h5>
      </Row>


      <Row>
        <div className="chart">
          {!isRevenueStatsLoading && !revenueStatsErrorMessage ? (
            <>
              <Row>
                <CDateButtonPills
                  onPillsClickHandler={props.onPillsClickHandler}
                  type="refund"
                  variant="outline-secondary"
                  data={props.revenueFilter}
                />
                <Col xs={12} md={4} className="p-0">
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
                  width={600}
                  height={350}
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
      </Row>
      </>
    // </Col>
  )
}
export default memo(RevenueTrend)
