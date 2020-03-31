import React, {memo} from 'react'
import {Col, Container, Row, Form} from 'react-bootstrap'
import HospitalDropdown from './HospitalDropdown'
import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import AdminDashboardHoc from './AdminDashboardHoc'
import AppointmentQueue from './AppointmentQueue'
import DoctorRevenueList from './DoctorRevenueList'
import {checkDashboardRole} from '@frontend-appointment/helpers'
import CheckDashboardRole from '../CommonComponents/CheckDashBoardRoleComponent'
import {CHybridSelect} from '@frontend-appointment/ui-elements'
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
        appointmentList,
        revenueFilter,
        appointmentFilter,
        appointmentQueue,
        doctorRevenue,
        specializationListHospitalWise
      }) => (
        <div className="dashboard-wrapper">
          <Container fluid className="">
            <Row className="">
              <Col className="px-0">
                {CheckDashboardRole(
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
                  </div>,
                  generateRevenue.code
                )}
              </Col>
              <HospitalDropdown
                hospitalDropdown={hospitalDropdown}
                hospitalId={hospitalId}
                handleHospitalChange={handleHospitalChange}
                className="top-hospital-list"
              />
            </Row>

            <Row>
              {CheckDashboardRole(
                <RevenueStatistics generateRevenue={generateRevenue} />,
                generateRevenue.code
              )}
            </Row>
            <Row className="mt-1">
              {CheckDashboardRole(
                <Col md={6} className="p-0">
                  <RevenueTrend
                    revenueStatistics={revenueStatistics}
                    onPillsClickHandler={onPillsClickHandler}
                    revenueFilter={revenueFilter}
                  />
                </Col>,
                revenueStatistics.code
              )}

              {CheckDashboardRole(
                <Col md={6} className="pr-0">
                  <DoctorRevenueList doctorRevenue={doctorRevenue} />
                </Col>,
                doctorRevenue.code
              )}
            </Row>

            <Row className="mt-1">
              {CheckDashboardRole(
                <Col md={6} className="p-0">
                  <AppointmentQueue
                    appointmentQueue={appointmentQueue}
                    hospitalId={hospitalId}
                  />
                </Col>,
                appointmentQueue.code
              )}

              <Col md={6} className="pr-0">
                {CheckDashboardRole(
                  <PatientStatistics registeredPatients={registeredPatients} />,
                  appointmentQueue.code
                )}

                {CheckDashboardRole(
                  <AppointmentStatistics
                    onPillsClickHandler={onPillsClickHandler}
                    type="appointment"
                    appointmentList={appointmentList}
                    appointmentFilter={appointmentFilter}
                  />,
                  appointmentList.code
                )}
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
