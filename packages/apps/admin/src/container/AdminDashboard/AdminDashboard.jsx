import React, {memo} from 'react'
import {
  Image,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
  Form
} from 'react-bootstrap'
import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import {CButton, CHybridInput} from '@frontend-appointment/ui-elements'
import './admin-dashboard.scss'
import * as Material from 'react-icons/md'
import AdminDashboardHoc from './AdminDashboardHoc'
const AdminDashboard = props => {
  const AdminDash = AdminDashboardHoc(
    ({generateRevenue,revenueStatistics}) => (
      <div className="dashboard-wrapper">
        <Container fluid className="">
          <RevenueStatistics generateRevenue={generateRevenue} />
          <Row className="mt-1">
            <RevenueTrend revenueStatistics={revenueStatistics} />
            <Col lg={5} className="pr-0">
              <PatientStatistics />
              <AppointmentStatistics />
            </Col>
          </Row>
        </Container>
      </div>
    ),
    props,
    ''
  )

  return <AdminDash />
}

export default memo(AdminDashboard)
