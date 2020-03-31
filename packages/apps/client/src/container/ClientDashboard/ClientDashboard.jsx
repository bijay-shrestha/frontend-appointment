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

            <Row>
              <RevenueStatistics generateRevenue={generateRevenue} />
            </Row>
            <Row className="mt-1">
              {/* <CheckDashboardRole
                component={ */}
              <Col md={6} className="p-0">
                <RevenueTrend
                  revenueStatistics={revenueStatistics}
                  onPillsClickHandler={onPillsClickHandler}
                  revenueFilter={revenueFilter}
                />
              </Col>
              {/* }
                code={revenueStatistics.code}
              /> */}
              {/* 
              <CheckDashboardRole
                component={ */}
              <Col md={6} className="pr-0">
                <DoctorRevenueList doctorRevenue={doctorRevenue} />
              </Col>
              {/* }
                code={doctorRevenue.code}
              /> */}
            </Row>

            <Row className="mt-1">
              {/* <CheckDashboardRole
                component={ */}
              <Col md={6} className="p-0">
                <AppointmentQueue
                  appointmentQueue={appointmentQueue}
                />
              </Col>
              {/* }
                code={appointmentQueue.code}
              /> */}

              <Col md={6} className="pr-0">
                {/* <CheckDashboardRole
                  component={ */}
                <PatientStatistics registeredPatients={registeredPatients} />
                {/* }
                  code={appointmentQueue.code}
                /> */}

                {/* <CheckDashboardRole
                  component={ */}
                <AppointmentStatistics
                  onPillsClickHandler={onPillsClickHandler}
                  type="appointment"
                  appointmentList={appointmentList}
                  appointmentFilter={appointmentFilter}
                />
                {/* }
                  code={appointmentList.code}
                /> */}
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
