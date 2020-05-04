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
      return line;
    })
    return newLineData
  }
  newLineData = [...changeObjectToArray(revenueStatsData)]
  newRevenueStatsData = Object.keys(revenueStatsData)
    ? Object.keys(revenueStatsData)
    : {}
  return (
    <>
     
        <h5 className="title">Revenue Trend</h5>
      
        <Col className="line-chart">
        {!isRevenueStatsLoading && !revenueStatsErrorMessage ? (
        <>
            <Row>
            <Col>
              <CDateButtonPills
               onPillsClickHandler={props.onPillsClickHandler}
                type="refund" 
               variant="outline-secondary" 
               data={props.revenueFilter} />
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
                revenueFilter={props.revenueFilter}
                labels={newRevenueStatsData ? newRevenueStatsData : []}
                width={400}
                  height={320}
                backgroundColor='rgba(13, 97, 147, 0.2)'
                fillColor= 'rgba(0, 99, 255, 0.2)'
                borderColor= '#0d6193'
                borderWidth= {2}
                pointColor= 'rgba(13, 97, 147, 1)'
                pointStrokeColor= "#fff"
                pointHighlightFill="#fff"
                pointHighlightStroke= 'rgba(0, 99, 255, 0.2)'
                scaleGridLineColor= 'rgba(0,0,0,.05)'
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
        </Col>
     
   </>
  )
}
export default memo(RevenueTrend)
