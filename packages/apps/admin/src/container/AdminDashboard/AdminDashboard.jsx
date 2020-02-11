import React from 'react';
import { Image, Container, Row, Col ,ButtonGroup, Button, Form} from "react-bootstrap";
import { CButton, CHybridInput } from "@frontend-appointment/ui-elements";
import "./admin-dashboard.scss";

const AdminDashboard = () => {
    return (
        <div className="dashboard-wrapper">

            <Container fluid className="" >
                {/* <Row><h5 className="title">Revenue Generated</h5></Row> */}

                <Row>

                    <div className="revenue-box">


                        <p>Rs. 5,00,000</p>
                        <div className="total">
                            {/* Total Revenue  */}
                            <span className="up">
                            +5% from last year
                                </span>
                                </div>
                    </div>

                    <div className="revenue-box">

                        <p>Rs. 1,00,000</p>
                        <div className="up">
                            +5% from last month
                                </div>
                    </div>

                    <div className="revenue-box">

                        <p>Rs. 50,000</p>
                        <div className="up">
                            +5% from last week
                                </div>
                    </div>

                    <div className="revenue-box">

                        <p>Rs. 9,000</p>
                        <div className="down">
                          -3% from last day
                                </div>
                    </div>

                </Row>

                <Row className="mt-1">
                    <Col  lg={7} className="chart">
                        <Row>
                            <Col xs={12} md={4}>
                                <Row><h5 className="title">Revenue Statistics</h5></Row>

                            </Col>
                            <Col  xs={12} md={8} className="p-0">
                                <CButton
                                    name="Weekly"
                                    variant="outline-secondary"
                                    size="lg"
                                    className="m-0">
                                </CButton>
                                <CButton
                                    name="Monthly"
                                    variant="outline-secondary"
                                    size="lg">
                                </CButton>
                                <CButton
                                    name="Yearly"
                                    variant="outline-secondary"
                                    size="lg"
                                >
                                </CButton>
                            </Col>
                        </Row>
                        <Row>

                            <img src={require("./img/line-chart.png")} />
                        </Row>
                    </Col>

                    <Col lg={5} className="pr-0">
          
                        <div className="overall-box">
               

                            <p>1,00,000</p>
                            <div className="title">
                                Overall Registered Patients
                             </div>
                        </div>

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
};

export default AdminDashboard;
