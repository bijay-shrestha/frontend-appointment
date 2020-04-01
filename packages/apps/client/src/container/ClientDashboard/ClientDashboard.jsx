import React, {memo} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import ClientDashboardHoc from './ClientDashboardHoc'
import AppointmentQueue from './AppointmentQueue'
import DoctorRevenueList from './DoctorRevenueList'
import CheckDashboardRole from '../CommonComponents/CheckDashBoardRoleComponent'
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
                <CheckDashboardRole
                  component={
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
                  }
                  code={generateRevenue.code}
                />
              </Col>
            </Row>
            <CheckDashboardRole
              component={
                <RevenueStatistics generateRevenue={generateRevenue} />
              }
              code={generateRevenue.code}
            />
            <Row className="mt-1">
              <Col lg={7}>
                <CheckDashboardRole
                  component={
                    <RevenueTrend
                      revenueStatistics={revenueStatistics}
                      onPillsClickHandler={onPillsClickHandler}
                      revenueFilter={revenueFilter}
                    />
                  }
                  code={revenueStatistics.code}
                />
                <CheckDashboardRole
                  component={
                    <AppointmentQueue appointmentQueue={appointmentQueue} />
                  }
                  code={appointmentQueue.code}
                />
                <CheckDashboardRole
                  component={
                    <DoctorRevenueList doctorRevenue={doctorRevenue} />
                  }
                  code={doctorRevenue.code}
                />
              </Col>
              <Col lg={5} className="pr-0">
                <CheckDashboardRole
                  component={
                    <PatientStatistics
                      registeredPatients={registeredPatients}
                    />
                  }
                  code={registeredPatients.code}
                />
                <CheckDashboardRole
                  component={
                    <AppointmentStatistics
                      onPillsClickHandler={onPillsClickHandler}
                      type="appointment"
                      appointmentList={appointmentList}
                      appointmentFilter={appointmentFilter}
                    />
                  }
                  code={appointmentList.code}
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
