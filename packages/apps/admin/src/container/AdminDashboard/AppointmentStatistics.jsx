import React, {memo} from 'react'
import {Row, Col} from 'react-bootstrap'
import {CDateButtonPills} from '@frontend-appointment/ui-components'
import {CLoading, CDoughnutChart} from '@frontend-appointment/ui-elements'
const AppointmentStatistics = props => {
  const {
    isAppointmentStatsLoading,
    appointmentStatsData,
    appointmentStatsErrorMessage,
    fromDate,
    toDate
  } = props.appointmentList
  let data = [],
    color = [],
    label = [],
    chartData = {}
  if (appointmentStatsData) {
    const {
      newPatient,
      registeredPatient,
      totalAppointment,
      followUpPatient
    } = appointmentStatsData
    const newPatientPercent = (newPatient / totalAppointment).toFixed(2) * 100
    const registeredPatientPercent =
      (registeredPatient / totalAppointment).toFixed(2) * 100
    const followUpPercent =
      (followUpPatient / totalAppointment).toFixed(2) * 100
    data.push(newPatientPercent)
    data.push(registeredPatientPercent)
    data.push(followUpPercent)
    color.push('rgba(0, 99, 255, 0.2)')
    color.push('#0063ff')
    color.push('#0d61fe')
    label.push('From New Patients')
    label.push('From Registered Patients')
    label.push('From FollowUp Patient')
    chartData = {
      datasets: [{data: [...data], backgroundColor: [...color]}],
      labels: [...label]
    }
  }
  return (
    <>
      <h5 className="title">Patient Appointment Trend</h5>
      <div className="appointment-box">
        {!isAppointmentStatsLoading && !appointmentStatsErrorMessage ? (
          <>
            {' '}
            <Row>
              <Col className="date-group">
                <CDateButtonPills
                  onPillsClickHandler={props.onPillsClickHandler}
                  type={props.type}
                  variant="outline-secondary"
                  data={props.appointmentFilter}
                />
              </Col>
              <Col className="date">
                <div>
                  <span>From :</span> {fromDate.fromDate.toDateString()}
                </div>
                <div>
                  <span>To :</span> {toDate.toDate.toDateString()}
                </div>
              </Col>
            </Row>
            <Row>
              {/* <img
            src={require('./img/doughnut-chart.png')}
            className="doughnut-chart mx-auto"
          /> */}
              <div className="doughnut-chart">
                <CDoughnutChart
                  chartData={chartData}
                  width={200}
                  height={200}
                  mode="AS"
                />
              </div>
            </Row>
            <p className="total-count">
              Appointments:{appointmentStatsData.totalAppointment}
            </p>
            <div className="legend-box clearfix">
              <ul>
                <li>
                  <span className="legend"></span>
                  <span>
                    From New Patient
                    <span className="data">
                      {' '}
                      - {appointmentStatsData.newPatient}
                    </span>
                  </span>
                </li>
                <li>
                  <span className="legend"></span>
                  <span>
                    From Registered Patient
                    <span className="data">
                      {' '}
                      - {appointmentStatsData.registeredPatient}
                    </span>
                  </span>
                </li>
                <li>
                  <span className="legend"></span>
                  <span>
                    From FollowUp Patient
                    <span className="data">
                      {' '}
                      - {appointmentStatsData.followUpPatient}
                    </span>
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : isAppointmentStatsLoading ? (
          <CLoading />
        ) : (
          <span>
            <p>{appointmentStatsErrorMessage}</p>
          </span>
        )}
      </div>
    </>
  )
}
export default memo(AppointmentStatistics)
