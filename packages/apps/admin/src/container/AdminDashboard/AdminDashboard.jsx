import React, {memo} from 'react'
import {Col, Container, Row,Form } from 'react-bootstrap'
import HospitalDropdown from './HospitalDropdown'
import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import AdminDashboardHoc from './AdminDashboardHoc'
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
        appointmentFilter
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
              <HospitalDropdown
                hospitalDropdown={hospitalDropdown}
                hospitalId={hospitalId}
                handleHospitalChange={handleHospitalChange}
              />
            </Row>
            <RevenueStatistics generateRevenue={generateRevenue} />

            <Row className="mt-1">
              <Col lg={7}>
                <RevenueTrend
                revenueStatistics={revenueStatistics}
                onPillsClickHandler={onPillsClickHandler}
                revenueFilter={revenueFilter}
              />

             <Row className="mt-4" >
             <h5 className="title">Appointment Queue</h5>
             <div className="app-log">
               <Row>
               
               <Col className="px-0">
                <Form className="hospital-list">
                  <Form.Group as={Row} controlId="formPlaintextEmail">
                  
                    <Col sm="12">
                      <div className="hospital-list-input"> 
                  
                      <CHybridSelect name="hospitalId" placeholder="Select hospital" onChange={handleHospitalChange} options={hospitalDropdown} value={hospitalId}></CHybridSelect>
                      </div>
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
                 
               <Col className="date">
                  <div>
                    <span>Date :</span> Sun 22 Feb 2020
                  </div>
                 
                </Col>

               </Row>
               <Row>
                 <h1> Data grid </h1>
               </Row>

             </div>
               </Row>          
             
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

  return <AdminDash />
}

export default memo(AdminDashboard)
