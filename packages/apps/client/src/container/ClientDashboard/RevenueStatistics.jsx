import React, {memo} from 'react'
import {CLoading} from '@frontend-appointment/ui-elements'
import {checkPositveAndNegativeIcons} from '@frontend-appointment/commons'
//import {OverlayTrigger, Tooltip} from "react-bootstrap";

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
            <div className="revenue-box">
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
                            {/* <div className="tb-data">
                      <span> Checked-In = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span>Refund = <span className="amt">Rs 200</span> of 12 app.</span><br></br>
                      <span>Cancelled  = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span> Booked  = <span className="amt">Rs 200</span> of 12 app.</span> <br></br>
                    </div> */}
                        </div>
                        <div className="rdb-container">
                            <div className="rdb-total">
                                {revenueGeneratedYearData.amount}<span>NPR</span>
                            </div>
                            <div className="revenue-details-box">

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-warning">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Booked</p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedYearData.appointmentStatistics.bookedAmount || 0}
                                            </span>
                                            &nbsp;from&nbsp;
                                            <span className="appt">
                                                {revenueGeneratedYearData.appointmentStatistics.bookedAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-primary">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Checked-In</p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedYearData.appointmentStatistics.checkedInAmount || 0}
                                            </span>
                                            &nbsp;from&nbsp;
                                            <span className="appt">
                                                {revenueGeneratedYearData.appointmentStatistics.checkedInAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-danger">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Cancelled </p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedYearData.appointmentStatistics.cancelAmount || 0}
                                            </span>&nbsp;from&nbsp;
                                            <span className="appt">
                                                 {revenueGeneratedYearData.appointmentStatistics.cancelAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-brown">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Refunded </p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedYearData.appointmentStatistics.revenueFromRefundedAmount || 0}
                                            </span>&nbsp;from&nbsp;
                                            <span className="appt">
                                                 {revenueGeneratedYearData.appointmentStatistics.revenueFromRefundedAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </>
                ) : isRevenueGeneratedYearLoading ? (
                    <CLoading/>
                ) : (
                    <span><p>{revenueGeneratedYearErrorMessage}</p></span>
                )}
            </div>

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
                            {/* <div className="tb-data">
                      <span> Checked-In = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span>Refund  =<span className="amt">Rs 200</span> of 12 app.</span><br></br>
                      <span>Cancelled  = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span> Booked  =<span className="amt">Rs 200</span> of 12 app.</span> <br></br>
                    </div> */}
                        </div>
                        <div className="rdb-container">
                            <div className="rdb-total">
                                {revenueGeneratedMonthData.amount}<span>NPR</span>
                            </div>
                            <div className="revenue-details-box">

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-warning">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Booked</p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedMonthData.appointmentStatistics.bookedAmount || 0}
                                            </span>
                                            &nbsp;from&nbsp;
                                            <span className="appt">
                                                {revenueGeneratedMonthData.appointmentStatistics.bookedAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-primary">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Checked-In</p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedMonthData.appointmentStatistics.checkedInAmount || 0}
                                            </span>
                                            &nbsp;from&nbsp;
                                            <span className="appt">
                                                {revenueGeneratedMonthData.appointmentStatistics.checkedInAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-danger">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Cancelled </p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedMonthData.appointmentStatistics.cancelAmount || 0}
                                            </span>&nbsp;from&nbsp;
                                            <span className="appt">
                                                 {revenueGeneratedMonthData.appointmentStatistics.cancelAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-brown">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Refunded </p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedMonthData.appointmentStatistics.revenueFromRefundedAmount || 0}
                                            </span>&nbsp;from&nbsp;
                                            <span className="appt">
                                                 {revenueGeneratedMonthData.appointmentStatistics.revenueFromRefundedAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>


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

                        </div>
                        <div className="rdb-container">
                            <div className="rdb-total">
                                {revenueGeneratedWeekData.amount}<span>NPR</span>
                            </div>
                            <div className="revenue-details-box">

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-warning">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Booked</p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedWeekData.appointmentStatistics.bookedAmount || 0}
                                            </span>
                                            &nbsp;from&nbsp;
                                            <span className="appt">
                                                {revenueGeneratedWeekData.appointmentStatistics.bookedAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-primary">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Checked-In</p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedWeekData.appointmentStatistics.checkedInAmount || 0}
                                            </span>
                                            &nbsp;from&nbsp;
                                            <span className="appt">
                                                {revenueGeneratedWeekData.appointmentStatistics.checkedInAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-danger">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Cancelled </p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedWeekData.appointmentStatistics.cancelAmount || 0}
                                            </span>&nbsp;from&nbsp;
                                            <span className="appt">
                                                 {revenueGeneratedWeekData.appointmentStatistics.cancelAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-brown">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Refunded </p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedWeekData.appointmentStatistics.revenueFromRefundedAmount || 0}
                                            </span>&nbsp;from&nbsp;
                                            <span className="appt">
                                                 {revenueGeneratedWeekData.appointmentStatistics.revenueFromRefundedAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>


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
                            {/* <div className="tb-data">
                      <span> Checked-In = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span>Refund  = <span className="amt">Rs 200</span> of 12 app.</span><br></br>
                      <span>Cancelled  = <span className="amt">Rs 200</span> of 12 app.</span>  <br></br>
                      <span> Booked  = <span className="amt">Rs 200</span> of 12 app. of 12 app.</span> <br></br>
                    </div> */}
                        </div>
                        <div className="rdb-container">
                            <div className="rdb-total">
                                {revenueGeneratedDayData.amount}<span>NPR</span>
                            </div>
                            <div className="revenue-details-box">

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-warning">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Booked</p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedDayData.appointmentStatistics.bookedAmount || 0}
                                            </span>
                                            &nbsp;from&nbsp;
                                            <span className="appt">
                                                {revenueGeneratedDayData.appointmentStatistics.bookedAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-primary">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Checked-In</p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedDayData.appointmentStatistics.checkedInAmount || 0}
                                            </span>
                                            &nbsp;from&nbsp;
                                            <span className="appt">
                                                {revenueGeneratedDayData.appointmentStatistics.checkedInAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-danger">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Cancelled </p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedDayData.appointmentStatistics.cancelAmount || 0}
                                            </span>&nbsp;from&nbsp;
                                            <span className="appt">
                                                 {revenueGeneratedDayData.appointmentStatistics.cancelAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>

                                <div className="rd-row">
                                    <div className="rd-col rd-col-1">
                                        <span className="badge badge-brown">&nbsp;</span>
                                    </div>
                                    <div className="rd-col rd-col-2">
                                        <p> Refunded </p>
                                        <p>
                                            <span className="amount">
                                                <i className="fa fa-money"/>&nbsp;
                                                {revenueGeneratedDayData.appointmentStatistics.revenueFromRefundedAmount || 0}
                                            </span>&nbsp;from&nbsp;
                                            <span className="appt">
                                                 {revenueGeneratedDayData.appointmentStatistics.revenueFromRefundedAppointmentsCount || 0}
                                            </span>&nbsp;appt.
                                        </p>
                                    </div>
                                </div>


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
