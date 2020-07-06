import React, {memo} from 'react'
import {Col, Container, Row} from 'react-bootstrap'
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
import AppointmentServiceDropdown from './AppointmentServiceDropdown'
//import {CHybridSelectWithImage} from '@frontend-appointment/ui-elements'
const AdminDashboard = props => {
  const AdminDash = AdminDashboardHoc(
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
      //specializationListHospitalWise,
      appointmentServiceTypeList,
      appointmentServiceTypeCode,
      handleAppointmentServiceTypeChange
    }) => {
      const RevenuStats = (
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
      )
      return (
        <div className="dashboard-wrapper">
          <Container fluid className="">
            <Row className="">
              <Col className="px-0">{RevenuStats}</Col>

              <Col className="px-0">
                {checkDashboardRole(generateRevenue.code) ||
                checkDashboardRole(appointmentQueue.code) ||
                checkDashboardRole(appointmentList.code) ? (
                  <AppointmentServiceDropdown
                    serviceTypeDropdown={appointmentServiceTypeList}
                    appointmentServiceTypeCode={ appointmentServiceTypeCode}
                    handleAppointmentChange={handleAppointmentServiceTypeChange}
                    className="top-hospital-list"
                  />
                ) : null}
                {checkDashboardRole(generateRevenue.code) ||
                checkDashboardRole(appointmentQueue.code) ||
                checkDashboardRole(appointmentList.code) ? (
                  <HospitalDropdown
                    hospitalDropdown={hospitalDropdown}
                    hospitalId={hospitalId}
                    handleHospitalChange={handleHospitalChange}
                    className="top-hospital-list mr-4"
                  />
                ) : null}
              </Col>
            </Row>

            <Row>
              {
                <CheckDashboardRole
                  component={
                    <RevenueStatistics generateRevenue={generateRevenue} />
                  }
                  code={generateRevenue.code}
                />
              }
            </Row>
            <Row className="mt-1">
              <CheckDashboardRole
                component={
                  <Col md={6} className="p-0">
                    <RevenueTrend
                      revenueStatistics={revenueStatistics}
                      onPillsClickHandler={onPillsClickHandler}
                      revenueFilter={revenueFilter}
                    />
                  </Col>
                }
                code={revenueStatistics.code}
              />

              <CheckDashboardRole
                component={
                  <Col md={6} className="pr-0">
                    <DoctorRevenueList doctorRevenue={doctorRevenue} />
                  </Col>
                }
                code={doctorRevenue.code}
              />
            </Row>

            <Row className="mt-1">
              <CheckDashboardRole
                component={
                  <Col md={6} className="p-0">
                    <AppointmentQueue
                      appointmentQueue={appointmentQueue}
                      hospitalId={hospitalId}
                    />
                  </Col>
                }
                code={appointmentQueue.code}
              />

              <Col md={6} className="pr-0">
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
    },
    props,
    ''
  )

  return <AdminDash />
}

export default memo(AdminDashboard)
