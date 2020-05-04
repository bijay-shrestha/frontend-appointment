import React from 'react'
import {Col, Container} from 'react-bootstrap'

const RevenueDetailsTotalBlock = ({appointmentStatistics}) => {
  return (
    <>
      <Container className="revenue-details" fluid>
        <div className="row">
          <h5 className="rd-title">Revenue Details</h5>
        </div>
        <div className="row rd-container">
          <Col md={4} className="p-0  mt-4">
            <div className="rd-card book">
              <div className="icon">B</div>
              <div className="rd-content ">
                <div className="label"> Booked</div>
                <div>
                  {' '}
                  <span className="amt">
                    {' '}
                    NPR{' '}
                    {appointmentStatistics.bookedInfo
                      ? appointmentStatistics.bookedInfo.bookedAmount
                      : 0}
                  </span>{' '}
                  from
                  <span className="apt">
                    {' '}
                    {appointmentStatistics.bookedInfo
                      ? appointmentStatistics.bookedInfo.bookedCount
                      : 0}{' '}
                  </span>
                  Appt.
                </div>
                {appointmentStatistics.bookedInfo &&
                appointmentStatistics.bookedInfo.followUpCount ? (
                  <div className="follow-up">
                    <i className="fa fa-tag" />
                    <span className="fl-label"> Follow-up </span>{' '}
                    <span className="amt">
                      {' '}
                      NPR{' '}
                      {appointmentStatistics.bookedInfo
                        ? appointmentStatistics.bookedInfo.followUpAmount
                        : 0}
                    </span>{' '}
                    from
                    <span className="apt">
                      {' '}
                      {appointmentStatistics.bookedInfo
                        ? appointmentStatistics.bookedInfo.followUpCount
                        : 0}{' '}
                    </span>
                    Appt.
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>

          <Col md={4} className="p-0  mt-4">
            <div className="rd-card checkin">
              <div className="icon">CH</div>
              <div className="rd-content ">
                <div>
                  <span className="label">Checked-In</span>
                </div>
                <div>
                  {' '}
                  <span className="amt">
                    {' '}
                    NPR{' '}
                    {appointmentStatistics.checkedInInfo
                      ? appointmentStatistics.checkedInInfo.checkedInAmount
                      : 0}
                  </span>{' '}
                  from
                  <span className="apt">
                    {' '}
                    {appointmentStatistics.checkedInInfo
                      ? appointmentStatistics.checkedInInfo.checkedInCount
                      : 0}{' '}
                  </span>
                  Appt.
                </div>
                {appointmentStatistics.checkedInInfo &&
                appointmentStatistics.checkedInInfo.followUpCount ? (
                  <div className="follow-up">
                    <i className="fa fa-tag"></i>
                    <span className="fl-label"> Follow-up </span>{' '}
                    <span className="amt">
                      {' '}
                      NPR{' '}
                      {appointmentStatistics.checkedInInfo
                        ? appointmentStatistics.checkedInInfo.followUpAmount
                        : 0}
                    </span>{' '}
                    from
                    <span className="apt">
                      {' '}
                      {appointmentStatistics.checkedInInfo
                        ? appointmentStatistics.checkedInInfo.followUpCount
                        : 0}{' '}
                    </span>
                    Appt.
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>

          <Col md={4} className="p-0  mt-4">
            <div className="rd-card cancel">
              <div className="icon">C</div>
              <div className="rd-content ">
                <div>
                  <span className="label">Cancelled</span>
                </div>
                <div>
                  {' '}
                  <span className="amt">
                    {' '}
                    NPR{' '}
                    {appointmentStatistics.cancelledInfo
                      ? appointmentStatistics.cancelledInfo.cancelAmount
                      : 0}
                  </span>{' '}
                  from{' '}
                  <span className="apt">
                    {' '}
                    {appointmentStatistics.checkedInInfo
                      ? appointmentStatistics.cancelledInfo.cancelledCount
                      : 0}
                  </span>{' '}
                  Appt.
                </div>
                {appointmentStatistics.cancelledInfo &&
                appointmentStatistics.cancelledInfo.followUpCount ? (
                  <div className="follow-up">
                    <i className="fa fa-tag"></i>
                    <span className="fl-label"> Follow-up </span>{' '}
                    <span className="amt">
                      {' '}
                      NPR{' '}
                      {appointmentStatistics.cancelledInfo
                        ? appointmentStatistics.cancelledInfo.followUpAmount
                        : 0}
                    </span>{' '}
                    from
                    <span className="apt">
                      {' '}
                      {appointmentStatistics.checkedInInfo
                        ? appointmentStatistics.cancelledInfo.followUpCount
                        : 0}{' '}
                    </span>{' '}
                    Appt.
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>

          <Col md={4} className="p-0  mt-4">
            <div className="rd-card refund">
              <div className="icon">R</div>
              <div className="rd-content ">
                <div>
                  <span className="label">Refunded</span>
                </div>
                <div>
                  {' '}
                  <span className="amt">
                    {' '}
                    NPR{' '}
                    {appointmentStatistics.revenueFromRefundInfo
                      ? appointmentStatistics.revenueFromRefundInfo
                          .revenueFromRefundAmount
                      : 0}
                  </span>{' '}
                  from
                  <span className="apt">
                    {' '}
                    {appointmentStatistics.revenueFromRefundInfo
                      ? appointmentStatistics.revenueFromRefundInfo
                          .revenueFromRefundCount
                      : 0}{' '}
                  </span>
                  Appt.
                </div>
                {appointmentStatistics.revenueFromRefundInfo &&
                appointmentStatistics.revenueFromRefundInfo.followUpCount ? (
                  <div className="follow-up">
                    <i className="fa fa-tag"></i>
                    <span className="fl-label"> Follow-up </span>{' '}
                    <span className="amt">
                      {' '}
                      NPR{' '}
                      {appointmentStatistics.revenueFromRefundInfo
                        ? appointmentStatistics.revenueFromRefundInfo
                            .followUpAmount
                        : 0}
                    </span>{' '}
                    from
                    <span className="apt">
                      {' '}
                      {appointmentStatistics.revenueFromRefundInfo
                        ? appointmentStatistics.revenueFromRefundInfo
                            .followUpCount
                        : 0}{' '}
                    </span>
                    Appt.
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>

          <Col md={4} className="p-0  mt-4">
            <div className="rd-card refund-client">
              <div className="icon">RE</div>
              <div className="rd-content">
                <div>
                  <span className="label">Refunded Amount to Client </span>
                </div>
                <div>
                  {' '}
                  <span className="amt">
                    {' '}
                    NPR{' '}
                    {appointmentStatistics.refundInfo
                      ? appointmentStatistics.refundInfo.refundedAmount
                      : 0}
                  </span>{' '}
                  from
                  <span className="apt">
                    {' '}
                    {appointmentStatistics.refundInfo
                      ? appointmentStatistics.refundInfo.refundedCount
                      : 0}{' '}
                  </span>
                  Appt.
                </div>
                {appointmentStatistics.refundInfo &&
                appointmentStatistics.refundInfo.followUpCount ? (
                  <div className="follow-up">
                    <i className="fa fa-tag"></i>
                    <span className="fl-label"> Follow-up </span>{' '}
                    <span className="amt">
                      {' '}
                      NPR{' '}
                      {appointmentStatistics.refundInfo
                        ? appointmentStatistics.refundInfo.followUpAmount
                        : 0}
                    </span>{' '}
                    from
                    <span className="apt">
                      {' '}
                      {appointmentStatistics.refundInfo
                        ? appointmentStatistics.refundInfo.followUpCount
                        : 0}{' '}
                    </span>
                    Appt.
                  </div>
                ) : (
                  ''
                )}
              </div>
            </div>
          </Col>
          {/* <Col md={4} className="p-0  mt-4">
    <div className="rd-card follow-up">
        <div className="icon">
            F
        </div>
        <div className="rd-content">
            <span>   <span className="label">Follow Up</span> </span>
            <span> <span
                className="amt"> NPR {appointmentStatistics.followUpAmount || 0}</span> from
    <span
        className="apt"> {appointmentStatistics.followUpCount || 0}</span> Appointments</span>
        </div>
    </div>

</Col> */}

          <Col md={4} className="p-0  mt-4">
            <div className="rd-card total">
              <div className="icon">&nbsp;</div>
              <div className="rd-content ">
                <span>
                  {' '}
                  <span className="amt">
                    {' '}
                    NPR {appointmentStatistics.totalAmount || 0}
                  </span>{' '}
                  from
                  <span className="apt">
                    &nbsp;{appointmentStatistics.totalRecords || 0}&nbsp;
                  </span>
                  Appt.
                </span>
                <span>
                  {' '}
                  <span className="label">
                    Total Revenue Amount from Client <br></br>
                    <span className="inc">
                      (Incl. Booked Appts. revenue)
                    </span>{' '}
                  </span>{' '}
                </span>
              </div>
            </div>
          </Col>
        </div>
      </Container>
    </>
  )
}

export default RevenueDetailsTotalBlock
