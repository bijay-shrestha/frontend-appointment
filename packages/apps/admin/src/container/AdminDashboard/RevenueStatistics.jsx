import React, {memo} from 'react'
import {Row} from 'react-bootstrap'
import * as Material from 'react-icons/md'
import {CLoading} from '@frontend-appointment/ui-elements'
import {checkPositveAndNegativeIcons} from '@frontend-appointment/commons'
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
        <div className="revenue-box">
          {!isRevenueGeneratedYearLoading &&
          Object.keys(revenueGeneratedYearData) && !revenueGeneratedYearErrorMessage ? (
            <>
              {' '}
              <p>Rs. {revenueGeneratedYearData.amount}</p>
              <div className="total">
                {/* Total Revenue  */}
                <span className="up">
                  {checkPositveAndNegativeIcons(
                    revenueGeneratedYearData.growthPercent
                  )}
                  {revenueGeneratedYearData.growthPercent}% from last year
                </span>
              </div>
            </>
          ) : isRevenueGeneratedYearLoading ? (
            <CLoading />
          ) : (
            <span><p>{revenueGeneratedYearErrorMessage}</p></span>
          )}
        </div>

        <div className="revenue-box">
          {!isRevenueGeneratedMonthLoading &&
          Object.keys(revenueGeneratedMonthData) && !revenueGeneratedMonthErrorMessage? (
            <>
              {' '}
              <p>Rs. {revenueGeneratedMonthData.amount}</p>
              <div className="total">
                {/* Total Revenue  */}
                <span className="up">
                  {checkPositveAndNegativeIcons(
                    revenueGeneratedMonthData.growthPercent
                  )}
                  {revenueGeneratedMonthData.growthPercent}% from last month
                </span>
              </div>
            </>
          ) : isRevenueGeneratedMonthLoading ? (
            <CLoading />
          ) : (
            <span><p>{revenueGeneratedMonthErrorMessage}</p></span>
          )}
        </div>

        <div className="revenue-box">
          {!isRevenueGeneratedWeekLoading &&
          Object.keys(revenueGeneratedWeekData)&&!revenueGeneratedWeekErrorMessage ? (
            <>
              {' '}
              <p>Rs. {revenueGeneratedWeekData.amount}</p>
              <div className="total">
                {/* Total Revenue  */}
                <span className="up">
                  {checkPositveAndNegativeIcons(
                    revenueGeneratedWeekData.growthPercent
                  )}
                  {revenueGeneratedWeekData.growthPercent}% from last week
                </span>
              </div>
            </>
          ) : isRevenueGeneratedWeekLoading ? (
            <CLoading />
          ) : (
            <span><p>{revenueGeneratedWeekErrorMessage}</p></span>
          )}
        </div>

        <div className="revenue-box">
          {!isRevenueGeneratedDayLoading &&
          Object.keys(revenueGeneratedDayData) && !revenueGeneratedDayErrorMessage ? (
            <>
              {' '}
              <p>Rs. {revenueGeneratedDayData.amount}</p>
              <div className="total">
                {/* Total Revenue  */}
                <span className="up">
                  {checkPositveAndNegativeIcons(
                    revenueGeneratedDayData.growthPercent
                  )}
                  {revenueGeneratedDayData.growthPercent}% from last day
                </span>
              </div>
            </>
          ) : isRevenueGeneratedDayLoading ? (
            <CLoading />
          ) : (
            <span><p>{revenueGeneratedDayErrorMessage}</p></span>
          )}
        </div>
      </Row>
    </>
  )
}

export default memo(RevenueStatistics)
