import React, {memo} from 'react'
import {CLoading} from '@frontend-appointment/ui-elements'
import {checkPositveAndNegativeIcons} from '@frontend-appointment/commons'
import {OverlayTrigger, Tooltip} from "react-bootstrap";

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

        {/* <OverlayTrigger
          className="data-tooltip"
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={
            (props) =>
              <Tooltip   {...props}>
                <div className="tl-data">
                  <span> Checked-In = <span className="amt">Rs 200</span></span>  <br></br>
                  <span>Refund  =<span className="amt">Rs 200</span> of 12 app.</span><br></br>
                  <span>Cancelled  = <span className="amt">Rs 200</span></span>  <br></br>
                  <span> Booked  =<span className="amt">Rs 200</span> of 12 app.</span> <br></br>
                </div>


              </Tooltip>}
        > */}
                <div className="revenue-box">
                {/* <div className="overlay-data">
                  <span> Checked-In =<span className="amt">Rs 200</span> of 12 app.from 4 app.</span>  <br></br>
                  <span> Refund  =<span className="amt">Rs 200</span> of 12 app. from 4 app. </span><br></br>
                  <span> Cancelled  =<span className="amt">Rs 200</span> of 12 app. from 4 app.</span>  <br></br>
                  <span> Booked  =<span className="amt">Rs 200</span> of 12 app. from 4 app.</span> <br></br>
                </div> */}
                    {!isRevenueGeneratedYearLoading &&
                    Object.keys(revenueGeneratedYearData) && !revenueGeneratedYearErrorMessage ? (
                        <>
                            {' '}
                            <p>{revenueGeneratedYearData.amount}<span>NPR</span></p>
                            <div className="total">
                                {/* Total Revenue  */}
                                <span className={"up"}>
                  {checkPositveAndNegativeIcons(
                      revenueGeneratedYearData.growthPercent
                  )}
                                    {revenueGeneratedYearData.growthPercent}% from last year
                </span>
                    <div className="tb-data">
                      <span> Checked-In = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span>Refund = <span className="amt">Rs 200</span> of 12 app.</span><br></br>
                      <span>Cancelled  = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span> Booked  = <span className="amt">Rs 200</span> of 12 app.</span> <br></br>
                    </div>
                  </div>
                        </>
                    ) : isRevenueGeneratedYearLoading ? (
                        <CLoading/>
                    ) : (
                        <span><p>{revenueGeneratedYearErrorMessage}</p></span>
                    )}
                </div>
            {/* </OverlayTrigger> */}

   

            <div className="revenue-box">
            
                {!isRevenueGeneratedMonthLoading &&
                Object.keys(revenueGeneratedMonthData) && !revenueGeneratedMonthErrorMessage ? (
                    <>
                        {' '}
                        <p>{revenueGeneratedMonthData.amount}<span>NPR</span></p>
                        <div className="">
                            {/* Total Revenue  */}
                            <span className={Number(revenueGeneratedMonthData.growthPercent) > 0 ? "up" : "down"}>
                  {checkPositveAndNegativeIcons(
                      revenueGeneratedMonthData.growthPercent
                  )}
                                {Math.abs(Number(revenueGeneratedMonthData.growthPercent))}% from last month
                </span>
                <div className="tb-data">
                      <span> Checked-In = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span>Refund  =<span className="amt">Rs 200</span> of 12 app.</span><br></br>
                      <span>Cancelled  = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span> Booked  =<span className="amt">Rs 200</span> of 12 app.</span> <br></br>
                    </div>
                        </div>
                    </>
                ) : isRevenueGeneratedMonthLoading ? (
                    <CLoading/>
                ) : (
                    <span><p>{revenueGeneratedMonthErrorMessage}</p></span>
                )}
            </div>
         

 
            <div className="revenue-box">
                {!isRevenueGeneratedWeekLoading &&
                Object.keys(revenueGeneratedWeekData) && !revenueGeneratedWeekErrorMessage ? (
                    <>
                        {' '}
                        <p>{revenueGeneratedWeekData.amount}<span>NPR</span></p>
                        <div className="">
                            {/* Total Revenue  */}
                            <span className={Number(revenueGeneratedWeekData.growthPercent) > 0 ? "up" : "down"}>
                  {checkPositveAndNegativeIcons(
                      revenueGeneratedWeekData.growthPercent
                  )}
                                {Math.abs(Number(revenueGeneratedWeekData.growthPercent))}% from last week
                </span>
                <div className="tb-data">
                      <span> Checked-In = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span>Refund  = <span className="amt">Rs 200</span> of 12 app.</span><br></br>
                      <span>Cancelled  = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span> Booked  = <span className="amt">Rs 200</span> of 12 app.</span> <br></br>
                    </div>
                        </div>
                    </>
                ) : isRevenueGeneratedWeekLoading ? (
                    <CLoading/>
                ) : (
                    <span><p>{revenueGeneratedWeekErrorMessage}</p></span>
                )}
            </div>
 
            <div className="revenue-box">
                {!isRevenueGeneratedDayLoading &&
                Object.keys(revenueGeneratedDayData) && !revenueGeneratedDayErrorMessage ? (
                    <>
                        {' '}
                        <p>{revenueGeneratedDayData.amount}<span>NPR</span></p>
                        <div className="">
                            {/* Total Revenue  */}
                            <span className={Number(revenueGeneratedDayData.growthPercent) > 0 ? "up" : "down"}>
                  {checkPositveAndNegativeIcons(
                      revenueGeneratedDayData.growthPercent
                  )}
                                {Math.abs(Number(revenueGeneratedDayData.growthPercent))}% from last day
                </span>
                <div className="tb-data">
                      <span> Checked-In = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span>Refund  = <span className="amt">Rs 200</span> of 12 app.</span><br></br>
                      <span>Cancelled  = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span> Booked  = <span className="amt">Rs 200</span> of 12 app. of 12 app.</span> <br></br>
                    </div>
                        </div>
                    </>
                ) : isRevenueGeneratedDayLoading ? (
                    <CLoading/>
                ) : (
                    <span><p>{revenueGeneratedDayErrorMessage}</p></span>
                )}
            </div>
          

        </>
    )
}

export default memo(RevenueStatistics)
