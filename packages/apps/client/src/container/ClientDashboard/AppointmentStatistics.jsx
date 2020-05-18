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
    color.push('rgba(13, 97, 147, 0.2)')
    color.push('#0d6193')
    color.push('#66a1ff')
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
              <CDateButtonPills
                onPillsClickHandler={props.onPillsClickHandler}
                type={props.type}
                variant="outline-secondary"
                data={props.appointmentFilter}
              />
              <Col className="date">
                <div>
                  <span>From :</span>{' '}
                  {new Date(fromDate.fromDate).toDateString()}
                </div>
                <div>
                  <span>To :</span> {new Date(toDate.toDate).toDateString()}
                </div>
              </Col>
            </Row>
            <Row>
              {/* <img
            src={require('./img/doughnut-chart.png')}
            className="doughnut-chart mx-auto"
          /> */}
              <div className="doughnut-chart">
                <div  className="mid-data" >
                 
                {appointmentStatsData.totalAppointment} 
                  <br/>
                  Total Appointments
                 
                </div>
                <CDoughnutChart
                  chartData={chartData}
                  width={200}
                  height={200}
                  mode={'AS'}
                />
              </div>
            </Row>
            {/* <p className="total-count">
              Appointments : {appointmentStatsData.totalAppointment}
            </p> */}
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
                    From Returning Patient
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
