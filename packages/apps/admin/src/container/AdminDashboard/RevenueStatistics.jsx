import React, {memo} from 'react'
import {Row} from 'react-bootstrap'
import * as Material from 'react-icons/md'
import {CLoading} from '@frontend-appointment/ui-elements'

const RevenueStatistics = props => {
  const {
    isRevenueGeneratedDayLoading,
    revenueGeneratedDayData,
    revenueGeneratedDayErrorMessage,
    isRevenueGeneratedMonthLoading,
    revenueGeneratedMonthData,
    revenueGeneratedMonthErrorMessage,
    isRevenueGeneratedWeekLoading,
    revenueGeneratedWeekData,
    revenueGeneratedWeekErrorMessage,
    isRevenueGeneratedYearLoading,
    revenueGeneratedYearData,
    revenueGeneratedYearErrorMessage
  } = props.generateRevenue
  return (
    <>
      <Row>
        <h5 className="title">Revenue Statistics</h5>
      </Row>
      <Row>
        <div className="revenue-box">
          {!isRevenueGeneratedYearLoading &&
          Object.keys(revenueGeneratedYearData) ? (
            <>
              {' '}
              <p>Rs. {revenueGeneratedYearData.amount}</p>
              <div className="total">
                {/* Total Revenue  */}
                <span className="up">
                  <Material.MdExpandLess /> 
                  {revenueGeneratedYearData.growthPercent}% from last year
                </span>
              </div>
            </>
          ) : isRevenueGeneratedYearLoading ? (
            <CLoading />
          ) : (
            <span>{revenueGeneratedYearErrorMessage}</span>
          )}
        </div>

        <div className="revenue-box">
          {!isRevenueGeneratedMonthLoading &&
          Object.keys(revenueGeneratedMonthData) ? (
            <>
              {' '}
              <p>Rs. {revenueGeneratedMonthData.amount}</p>
              <div className="total">
                {/* Total Revenue  */}
                <span className="up">
                  <Material.MdExpandLess /> 
                  {revenueGeneratedMonthData.growthPercent}% from last month
                </span>
              </div>
            </>
          ) : isRevenueGeneratedMonthLoading ? (
            <CLoading />
          ) : (
            <span>{revenueGeneratedMonthErrorMessage}</span>
          )}
        </div>

        <div className="revenue-box">
          {!isRevenueGeneratedWeekLoading &&
          Object.keys(revenueGeneratedWeekData) ? (
            <>
              {' '}
              <p>Rs. {revenueGeneratedWeekData.amount}</p>
              <div className="total">
                {/* Total Revenue  */}
                <span className="up">
                  <Material.MdExpandLess /> 
                  {revenueGeneratedWeekData.growthPercent}% from last week
                </span>
              </div>
            </>
          ) : isRevenueGeneratedWeekLoading ? (
            <CLoading />
          ) : (
            <span>{revenueGeneratedWeekErrorMessage}</span>
          )}
        </div>

        <div className="revenue-box">
          {!isRevenueGeneratedDayLoading &&
          Object.keys(revenueGeneratedDayData) ? (
            <>
              {' '}
              <p>Rs. {revenueGeneratedDayData.amount}</p>
              <div className="total">
                {/* Total Revenue  */}
                <span className="up">
                  <Material.MdExpandLess />
                  {revenueGeneratedDayData.growthPercent}% from last day
                </span>
              </div>
            </>
          ) : isRevenueGeneratedDayLoading ? (
            <CLoading />
          ) : (
            <span>{revenueGeneratedDayErrorMessage}</span>
          )}
        </div>
      </Row>
    </>
  )
}

export default memo(RevenueStatistics)
