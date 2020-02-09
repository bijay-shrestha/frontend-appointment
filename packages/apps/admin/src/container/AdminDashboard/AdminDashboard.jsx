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


                        <p><img src={require('./img/paper-money.svg')} /> <br></br>5,00,000</p>
                        <div>
                            Total Revenue
                                </div>
                    </div>

                    <div className="revenue-box">

                        <p><img src={require('./img/paper-money.svg')} /> <br></br>1,00,000</p>
                        <div className="up">
                            <i className="fa fa-chevron-up"></i> 5% from last month
                                </div>
                    </div>

                    <div className="revenue-box">

                        <p><img src={require('./img/paper-money.svg')} /> <br></br>50,000</p>
                        <div className="up">
                            <i className="fa fa-chevron-up"></i> 5% from last week
                                </div>
                    </div>

                    <div className="revenue-box">

                        <p><img src={require('./img/paper-money.svg')} /> <br></br>9,000</p>
                        <div className="down">
                            <i className="fa fa-chevron-down"></i> -3% from last day
                                </div>
                    </div>

                </Row>

                <Row className="mt-1">
                    <Col lg={7} className="chart">
                        <Row>
                            <Col >
                                <Row><h5 className="title">Revenue Statistics</h5></Row>

                            </Col>
                            <Col className="p-0">
                                <CButton
                                    name="Weekly"
                                    varianty="primary"
                                    size="lg"
                                    className="m-0">
                                </CButton>
                                <CButton
                                    name="Monthly"
                                    varianty="primary"
                                    size="lg">
                                </CButton>
                                <CButton
                                    name="Yearly"
                                    varianty="primary"
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
               

                            <p>< i className="fa fa-users"></i> <br></br>1,00,000</p>
                            <div className="title">
                                Overall Registered Patients
                             </div>
                        </div>

                        <div className="appointment-box">
                        <ButtonGroup aria-label="Basic example" size="sm"  className="mb-3">
                        <Button variant="secondary">Daily</Button>
                        <Button variant="secondary">Weekly</Button>
                        <Button variant="secondary">Monthly</Button>
                        <Button variant="secondary">Yearly</Button>
                        </ButtonGroup>
                        <Row>
                            <Col className="date">
                            <CHybridInput></CHybridInput>
                            </Col>
                            <Col className="date">
                          
                               <CHybridInput></CHybridInput>
                               
                          
                         
                            </Col>

                        </Row>
                        


                            <p>< i className="fa fa-calendar"></i> <br></br>1,000</p>
                            <div >
                               Appointments
                            </div>
                             <hr></hr>
                             <ul>
                                 <li>200<br></br>New Patient</li>
                                 <li>200<br></br>New Patient</li>
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
