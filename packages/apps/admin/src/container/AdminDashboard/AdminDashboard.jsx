import React from 'react';
import { Image, Container, Row, Col ,ButtonGroup, Button, Form} from "react-bootstrap";
import { CButton, CHybridInput, CHybridSelect } from "@frontend-appointment/ui-elements";
import "./admin-dashboard.scss";
import * as Material from 'react-icons/md';
import * as Ionicons from 'react-icons/io';

import RevenueStatistics from './RevenueStatistics'
import RevenueTrend from './RevenueTrend'
import PatientStatistics from './PatientStatistics'
import AppointmentStatistics from './AppointmentStatistics'
import {CButton, CHybridInput} from '@frontend-appointment/ui-elements'

import AdminDashboardHoc from './AdminDashboardHoc'
const AdminDashboard = () => {
//   ({generateRevenue,revenueStatistics}) => (
//     <div className="dashboard-wrapper">
//       <Container fluid className="">
//         <RevenueStatistics generateRevenue={generateRevenue} />
//         <Row className="mt-1">
//           <RevenueTrend revenueStatistics={revenueStatistics} />
//           <Col lg={5} className="pr-0">
//             <PatientStatistics />
//             <AppointmentStatistics />
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   ),
//     props,
//     ''
// )

  return (
        <div className="dashboard-wrapper">

            <Container fluid className="" >
                <Row className="">
                    <Col className="px-0">
                    <div className="revenue-title-box">
                    <div className="fiscal">F<span className="slash">/</span>Y 2019<span className="slash">/</span>2020</div>
                    <h5 className="title">Revenue Statistics</h5>

                    </div>
                    </Col>
                    <Col className="px-0">

                    <Form className="hospital-list">
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="2">Hospital &nbsp;&nbsp;</Form.Label>
                        <Col sm="10">
                        <CHybridSelect
                        placeholder="Select hospital"
                        ></CHybridSelect>
                        </Col>
                    </Form.Group>




                    </Form>
                    </Col>




                </Row>

                <Row>


                    <div className="revenue-box">


                        <p>5,00,000<span>NPR</span> </p>
                        <div className="total">
                            {/* Total Revenue  */}
                            <span className="up">
                            <Ionicons.IoIosTrendingUp />&nbsp;5% from last year
                                </span>
                                </div>
                    </div>

                    <div className="revenue-box">

                        <p>1,00,000<span>NPR</span> </p>
                        <div className="up">

                        <Ionicons.IoIosTrendingUp />  5% from last month
                                </div>
                    </div>

                    <div className="revenue-box">

                        <p>50,000<span>NPR</span> </p>
                        <div className="up">

                           <Ionicons.IoIosTrendingUp /> 5%  from last week

                                </div>
                    </div>

                    <div className="revenue-box">

                        <p>9,000<span>NPR</span> </p>
                        <div className="down">
                        <Ionicons.IoIosTrendingDown/>  3% from last day
                                </div>
                    </div>

                </Row>

                <Row className="mt-1">
                    <Col  lg={7} >
                    <Row><h5 className="title">Revenue Trend</h5></Row>
                    <Row>
                    <div className="chart">
                        <Row>

                            <Col xs={12} md={8}>

                            <ButtonGroup aria-label="Basic example" size="sm"  className="mb-3">
                            <Button variant="outline-secondary">Daily</Button>
                            <Button variant="outline-secondary">Weekly</Button>
                            <Button variant="outline-secondary">Monthly</Button>
                            <Button variant="outline-secondary">Yearly</Button>
                            </ButtonGroup>


                            </Col>
                            <Col  xs={12} md={4} className="p-0">
                            <Col className="date">
                            <div>
                                <span>From :</span> 1-2-2020
                            </div>
                            <div>
                                <span>To :</span> 1-2-2020
                            </div>


                            </Col>
                            </Col>
                            </Row>

                        <Row>

                            <img src={require("./img/line-chart.png")} />
                        </Row>
                    </div>
                    </Row>

                    </Col>

                    <Col lg={5} className="pr-0">
                   <h5 className="title">Patient Statistics</h5>
                        <div className="overall-box">
                            <p>1,00,000</p>
                            <div className="title">
                                Overall Registered Patients
                             </div>
                        </div>
                      <h5 className="title">Appointment Statistics</h5>
                        <div className="appointment-box">
                         <Row>
                             <Col>
                             <ButtonGroup aria-label="Basic example" size="sm"  className="mb-3">
                            <Button variant="outline-secondary">Daily</Button>
                            <Button variant="outline-secondary">Weekly</Button>
                            <Button variant="outline-secondary">Monthly</Button>
                            <Button variant="outline-secondary">Yearly</Button>
                            </ButtonGroup>
                             </Col>
                             <Col className="date">
                            <div>
                                <span>From :</span> 1-2-2020
                            </div>
                            <div>
                                <span>To :</span> 1-2-2020
                            </div>


                            </Col>

                         </Row>
                         <Row>
                         <img src={require("./img/doughnut-chart.png")} className="doughnut-chart mx-auto"/>
                        </Row>



                             <p><br></br>1,000</p>
                                <div className="title">
                                Appointments
                                </div>
                                <hr></hr>
                                <ul>
                                    <li><span className="color-code code1">&nbsp;</span><span>200</span><br></br>New Patient</li>
                                    <li><span className="color-code code2">&nbsp;</span><span>800</span><br></br>Registered Patient</li>
                                </ul>







                        </div>
                    </Col>
                </Row>

            </Container>


            {/* <div className="unauthorized">
                <div className="filter-message">
                    <div className="message-cont">
                        <h1>COMING SOON</h1>
                        <h5 className="">Dashboard will be carefully curated as features are added into the app. </h5>
                        <h6>Good things come to those who wait.</h6>
                        <i class="fa fa-stethoscope" aria-hidden="true"></i>

                    </div>
                </div>
            </div> */}
        </div>
    );
  return <AdminDash />
}

export default memo(AdminDashboard)
