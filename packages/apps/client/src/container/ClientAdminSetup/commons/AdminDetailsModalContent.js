import React from 'react'
import {
    CFControl,
    CFLabel,
    CForm,
    CHybridInput,
    CImageDisplayAndView,
    CRadioButton
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import * as DefaultProfileImage from '../Add/picture.png'
import {AuditableEntityHoc} from '@frontend-appointment/commons'
const AdminDetailsModalContent = ({adminInfoObj, adminImage}) => {
    const images = [
        {
            src: adminImage ? adminImage : DefaultProfileImage,
            alt: 'ADMIN',
            width: 4,
            height: 3
        }
    ]
    return (
        <>
            <Container-fluid>
                {/* <Row className="pl-4 pr-4"><h5>Admin Info</h5></Row> */}

                <CForm id="department-info" className="mt-2 add-info">
                    <Container-fluid>
                        <Row>
                            <Col
                                sm={12}
                                md={12}
                                lg={3}
                                className="order-lg-last order-md-first"
                            >
                                <div className="image-upload-container">
                                    <CImageDisplayAndView images={images} className="image-box"/>
                                </div>
                            </Col>
                            <Col sm={12} md={12} lg={9}>
                                <Row>
                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridInput
                                            id="department"
                                            placeholder="Department"
                                            name="department"
                                            value={
                                                adminInfoObj.department && adminInfoObj.department.label
                                            }
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CHybridInput
                                            id="profile"
                                            placeholder="Profile"
                                            name="profile"
                                            value={adminInfoObj.profile && adminInfoObj.profile.label}
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
                                            type="email"
                                            placeholder="Email"
                                            value={adminInfoObj.email}
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
                                    {AuditableEntityHoc(adminInfoObj)}

                                    <Col sm={12} md={12} lg={6}>
                                        <CFLabel labelName="Gender" id="gender"/>
                                        <div>
                                            {adminInfoObj.genderCode === 'F' && (
                                                <CRadioButton
                                                    checked={adminInfoObj.genderCode === 'F'}
                                                    id="female"
                                                    label="Female"
                                                    type="radio"
                                                    name="genderCode"
                                                    value="F"
                                                    disabled={true}
                                                    readOnly={true}
                                                />
                                            )}

                                            {adminInfoObj.genderCode === 'M' && (
                                                <CRadioButton
                                                    checked={adminInfoObj.genderCode === 'M'}
                                                    id="male"
                                                    label="Male"
                                                    type="radio"
                                                    name="genderCode"
                                                    value="M"
                                                    disabled={true}
                                                    readOnly={true}
                                                />
                                            )}

                                            {adminInfoObj.genderCode === 'O' && (
                                                <CRadioButton
                                                    checked={adminInfoObj.genderCode === 'O'}
                                                    id="other"
                                                    label="Other"
                                                    type="radio"
                                                    name="genderCode"
                                                    value="O"
                                                    disabled={true}
                                                    readOnly={true}
                                                />
                                            )}
                                        </div>
                                    </Col>

                                    <Col sm={12} md={12} lg={6}>
                                        <CFLabel labelName="Status" id="status"/>
                                        {adminInfoObj.status === 'Y' && (
                                            <CRadioButton
                                                checked={adminInfoObj.status === 'Y'}
                                                disabled={true}
                                                id="radio1"
                                                label="Active"
                                                type="radio"
                                                readOnly
                                            />
                                        )}
                                        {adminInfoObj.status === 'N' && (
                                            <CRadioButton
                                                checked={adminInfoObj.status === 'N'}
                                                disabled={true}
                                                id="radio2"
                                                label="Inactive"
                                                type="radio"
                                                readOnly
                                            />
                                        )}
                                    </Col>

                                    <Col
                                        sm={12}
                                        md={12}
                                        lg={6}
                                        className="py-4 dash-roles-container"
                                    >
                                        {adminInfoObj.adminDashboardRequestDTOS &&
                                        adminInfoObj.adminDashboardRequestDTOS.length ? (
                                            <CFLabel labelName="Dashboard Roles" id="dashboard-role"/>
                                        ) : null}
                                        <div>
                                            {adminInfoObj &&
                                            adminInfoObj.adminDashboardRequestDTOS.length
                                                ? adminInfoObj.adminDashboardRequestDTOS.map(
                                                    (dash, ind) => {
                                                        return dash.status === 'Y' ? (
                                                            <div>
                                                                <i className=" fa fa-check"></i> &nbsp;{' '}
                                                                {dash.name}
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <i className=" fa fa-close"></i>&nbsp;{' '}
                                                                {dash.name}
                                                            </div>
                                                        )
                                                    }
                                                )
                                                : null}
                                        </div>
                                    </Col>

                                    {adminInfoObj.hasMacBinding && (
                                        <Col sm={12} md={12} lg={6}>
                                            <>
                                                <Col className="mt-4 pl-0 mb-1 fw-500">
                                                    {/* {adminInfoObj.hasMacBinding ? (
                            <i className=" fa fa-check"> </i>
                          ) : (
                            <i className=" fa fa-close"> </i>
                          )}{' '} */}
                                                    Device Filter
                                                </Col>
                                                {adminInfoObj.hasMacBinding
                                                    ? adminInfoObj.macIdList
                                                        ? adminInfoObj.macIdList.map((macId, index) => (
                                                            <>
                                                                <CFControl
                                                                    className="mb-1"
                                                                    id="macId"
                                                                    key={'macId' + index}
                                                                    value={
                                                                        macId.macId
                                                                            ? macId.macId
                                                                            : macId.macAddress
                                                                    }
                                                                    disabled={true}
                                                                    placeholder="Enter MAC Address"
                                                                />
                                                            </>
                                                        ))
                                                        : ''
                                                    : ''}
                                            </>
                                        </Col>
                                    )}
                                </Row>
                            </Col>
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default AdminDetailsModalContent
