import React, {PureComponent} from 'react';
import {CFControl, CFLabel, CForm, CHybridInput, CImageDisplayAndView, CRadioButton} from "@cogent/ui-elements";
import {Col, Row} from "react-bootstrap";
import * as DefaultProfileImage from "../Add/Picture.jpg";

const AdminDetailsModalContent = ({adminInfoObj, adminImage}) => {
    const images = [{
        src: adminImage ? adminImage : DefaultProfileImage,
        alt: 'ADMIN',
        width: 4,
        height: 3
    }];
    return (
        <>
            <Container-fluid>
                <Row className="pl-4 pr-4"><h5>Admin Info</h5></Row>

                <CForm
                    id="department-info"
                    className="mt-2 add-info">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={12} lg={3} className="order-lg-last order-md-first">
                                {/*TODO remove the inline style of image tag*/}
                                {/*<img alt="ADMIN IMAGE"*/}
                                {/*     onClick={this.handleViewImage}*/}
                                {/*     src={adminImage ? adminImage : DefaultProfileImage}*/}
                                {/*     style={{width: '150px'}}/>*/}
                                <CImageDisplayAndView images={images}/>
                            </Col>
                            <Col sm={12} md={12} lg={9}>
                                <Row>
                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridInput
                                            id="hospital"
                                            placeholder="Hospital"
                                            name="hospital"
                                            value={adminInfoObj.hospital && adminInfoObj.hospital.label}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridInput
                                            id="admin-name"
                                            name="fullName"
                                            placeholder="Name"
                                            value={adminInfoObj.fullName}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridInput
                                            id="admin-email"
                                            name="email"
                                            type='email'
                                            placeholder="Email"
                                            value={adminInfoObj.email}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridInput
                                            id="admin-username"
                                            name="username"
                                            placeholder="Username"
                                            value={adminInfoObj.username}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridInput
                                            id="admin-mobileNumber"
                                            name="mobileNumber"
                                            type="number"
                                            placeholder="Mobile Number"
                                            value={adminInfoObj.mobileNumber}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridInput
                                            id="adminCategory"
                                            placeholder="Admin Category"
                                            name="adminCategory"
                                            value={adminInfoObj.adminCategory && adminInfoObj.adminCategory.label}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CFLabel labelName="Status" id="status"></CFLabel>
                                        <CRadioButton
                                            checked={Boolean(adminInfoObj.status)}
                                            disabled={true}
                                            id="radio1"
                                            label="Active"
                                            type="radio"
                                            readOnly
                                        />
                                        <CRadioButton
                                            checked={Boolean(!adminInfoObj.status)}
                                            disabled={true}
                                            id="radio2"
                                            label="Inactive"
                                            type="radio"
                                            className="sr-only"
                                            readOnly
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <>
                                            <Col>
                                                {adminInfoObj.hasMacBinding === 'Y' ?
                                                    <i className=" fa fa-check"> </i> :
                                                    <i className=" fa fa-close"> </i>} Device Filter
                                            </Col>
                                            {adminInfoObj.hasMacBinding ?
                                                (adminInfoObj.macIdList ?
                                                        (adminInfoObj.macIdList.map(
                                                            (macId, index) => (
                                                                <>
                                                                    <CFControl
                                                                        id="macId"
                                                                        key={"macId" + index}
                                                                        value={macId.macId ? macId.macId : macId.macAddress}
                                                                        disabled={true}
                                                                        placeholder="Enter MAC Address"
                                                                    />
                                                                </>
                                                            )))
                                                        : ''
                                                )
                                                : ''
                                            }
                                        </>
                                    </Col>

                                    <Col sm={12} md={12} lg={12}>

                                        <CFLabel labelName="Modules" id="modules" className="mt-4"/>
                                        {adminInfoObj.moduleList && adminInfoObj.moduleList.map(module => (
                                            <>
                                                {module.isChecked &&
                                                <Row key={module.id}>
                                                    <Col sm={6}>
                                                        <i className=" fa fa-check"> </i> {module.name}
                                                    </Col>
                                                    {
                                                        module.isChecked &&
                                                        <Col>
                                                            <CHybridInput
                                                                id={"profiles" + module.id}
                                                                placeholder={"Profile"}
                                                                name={module.name + "Profiles"}
                                                                disabled={true}
                                                                value={module.profileSelected.label}
                                                            />
                                                        </Col>
                                                    }
                                                </Row>
                                                }
                                            </>
                                        ))}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    );
};

export default AdminDetailsModalContent;
