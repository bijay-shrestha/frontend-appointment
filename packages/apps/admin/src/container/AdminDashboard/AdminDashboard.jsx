import React, {memo} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import HospitalDropdown from './HospitalDropdown'
import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import AdminDashboardHoc from './AdminDashboardHoc'
const AdminDashboard = props => {
  const AdminDash = AdminDashboardHoc(
    memo(
      ({
        generateRevenue,
        revenueStatistics,
        registeredPatients,
        hospitalDropdown,
        hospitalId,
        handleHospitalChange,
        onPillsClickHandler,
        appointmentList
      }) => (
        <div className="dashboard-wrapper">
          <Container fluid className="">
            <Row className="">
              <Col className="px-0">
                <div className="revenue-title-box">
                  <div className="fiscal">
                    F<span className="slash">/</span>Y{' '}
                    {generateRevenue &&
                    generateRevenue.revenueGeneratedDayData &&
                    generateRevenue.revenueGeneratedDayData.fiscalYear
                      ? generateRevenue.revenueGeneratedDayData.fiscalYear.split(
                          '/'
                        )[0]
                      : ''}
                    <span className="slash">/</span>
                    {generateRevenue &&
                    generateRevenue.revenueGeneratedDayData &&
                    generateRevenue.revenueGeneratedDayData.fiscalYear
                      ? generateRevenue.revenueGeneratedDayData.fiscalYear.split(
                          '/'
                        )[1]
                      : ''}
                  </div>
                  <h5 className="title">Revenue Statistics</h5>
                </div>
              </Col>
              <HospitalDropdown
                hospitalDropdown={hospitalDropdown}
                hospitalId={hospitalId}
                handleHospitalChange={handleHospitalChange}
              />
            </Row>
            <RevenueStatistics generateRevenue={generateRevenue} />

            <Row className="mt-1">
              <RevenueTrend
                revenueStatistics={revenueStatistics}
                onPillsClickHandler={onPillsClickHandler}
              />

              <Col lg={5} className="pr-0">
                <PatientStatistics registeredPatients={registeredPatients} />
                <AppointmentStatistics
                  onPillsClickHandler={onPillsClickHandler}
                  type="appointment"
                  appointmentList={appointmentList}
                />
              </Col>
            </Row>
          </Container>
        </div>
      )
    ),
    props,
    ''
  )

  return <AdminDash />
}

export default memo(AdminDashboard)
