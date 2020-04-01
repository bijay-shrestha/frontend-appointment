import React, {memo} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import ClientDashboardHoc from './ClientDashboardHoc'
import AppointmentQueue from './AppointmentQueue'
import DoctorRevenueList from './DoctorRevenueList'

const ClientDashboard = props => {
  const ClientDashboard = ClientDashboardHoc(
    memo(
      ({
        generateRevenue,
        revenueStatistics,
        registeredPatients,
        onPillsClickHandler,
        appointmentList,
        revenueFilter,
        appointmentFilter,
        appointmentQueue,
        doctorRevenue
      }) => (
        <div className="dashboard-wrapper">
          <Container fluid className="">
            <Row className="">
              <Col className="px-0">
                <div className="revenue-title-box">
                  <div className="fiscal">
                    Fiscal Year{' '}
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
            </Row>
            <RevenueStatistics generateRevenue={generateRevenue} />
            <Row className="mt-1">
              <Col lg={7}>
                <RevenueTrend
                  revenueStatistics={revenueStatistics}
                  onPillsClickHandler={onPillsClickHandler}
                  revenueFilter={revenueFilter}
                />
                <AppointmentQueue appointmentQueue={appointmentQueue} />
                <DoctorRevenueList doctorRevenue={doctorRevenue} />
              </Col>
              <Col lg={5} className="pr-0">
                <PatientStatistics registeredPatients={registeredPatients} />
                <AppointmentStatistics
                  onPillsClickHandler={onPillsClickHandler}
                  type="appointment"
                  appointmentList={appointmentList}
                  appointmentFilter={appointmentFilter}
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

  return <ClientDashboard />
}

export default memo(ClientDashboard)
