import React from 'react'
import {
    CFLabel,
    CForm,
    CHybridInput, CHybridSelect,
    CHybridTextArea,
    CImageDisplayAndView,
    CRadioButton
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import * as DefaultProfileImage from '../img/default-logo.png'
import {AuditableEntityHoc} from '@frontend-appointment/commons'

const DetailsModal = ({
                          type,
                          hospitalData,
                          activeBillingModeForDropdown,
                          activeAppointmentServiceTypeForDropdown,
                          appointmentServiceTypeListForPrimary
                      }) => {
    const getOnlyContactNumber = (contactsResponse) => {
        let contacts = [];
        contactsResponse.map(contactNumber => {
            contacts.push(contactNumber.contactNumber);
            return contacts
        });
        return contacts
    };
    let images, contactNumber, bannerImages;
    if (type !== 'A') {
        images = [
            {
                src: hospitalData.hospitalLogo ? hospitalData.hospitalLogo : DefaultProfileImage,
                alt: 'LOGO',
                width: 4,
                height: 3
            }
        ];
        bannerImages = [
            {
                src: hospitalData.hospitalBanner
                    ? hospitalData.hospitalBanner
                    : '',
                alt: 'BANNER',
                width: 4,
                height: 3
            }
        ];
        contactNumber = getOnlyContactNumber(hospitalData.contactNumberResponseDTOS)
    } else {
        images = [
            {
                src: hospitalData.hospitalLogoUrl
                    ? hospitalData.hospitalLogoUrl
                    : DefaultProfileImage,
                alt: 'LOGO',
                width: 4,
                height: 3
            }
        ];
        bannerImages = [
            {
                src: hospitalData.hospitalBannerUrl
                    ? hospitalData.hospitalBannerUrl
                    : '',
                alt: 'BANNER',
                width: 4,
                height: 3
            }
        ];
        contactNumber = hospitalData.contactNumber
    }

    return (
        <>
            <Container-fluid>
                {/* <Row className="pl-4 pr-4">
          <h5>Hospital Info</h5>
        </Row> */}

                <CForm id="hospital-info" className="mt-2">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={12} lg={12} className="">
                                <div className="hospital-banner-container preview-banner">
                                    <div className="image-upload-container hospital-container">
                                        <CImageDisplayAndView images={images} className="hospital-logo"/>
                                    </div>
                                    {
                                        type !== 'A' ? (
                                                hospitalData.hospitalBanner ?
                                                    <CImageDisplayAndView images={bannerImages}
                                                                          className="hospital-banner"/> : ''
                                            ) :
                                            (hospitalData.hospitalBannerUrl ?
                                                    <CImageDisplayAndView images={bannerImages}
                                                                          className="hospital-banner"/> :
                                                    ''
                                            )

                                    }
                                </div>
                            </Col>
                            <Col lg={12}>
                                <Row>
                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="hospital-name"
                                            name="name"
                                            placeholder="Client Name"
                                            value={hospitalData.name}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="hospital-code"
                                            name="code"
                                            placeholder="Esewa Merchant Code"
                                            value={hospitalData.esewaMerchantCode}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="hospital-code"
                                            name="code"
                                            placeholder="Alias"
                                            value={hospitalData.alias}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridTextArea
                                            id="Address"
                                            name="address"
                                            placeholder="Client Address"
                                            value={hospitalData.address}
                                            disabled={true}
                                        />
                                    </Col>
                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="panNumber"
                                            name="panNubmer"
                                            placeholder="Client PAN Number"
                                            value={hospitalData.panNumber}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="refundPercentage"
                                            name="refundPercentage"
                                            placeholder="Refund Percentage"
                                            value={hospitalData.refundPercentage}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="numberOfAdmins"
                                            name="numberOfAdmins"
                                            placeholder="Number Of Admins"
                                            value={hospitalData.numberOfAdmins}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="numberOfFollowUps"
                                            name="numberOfFollowUps"
                                            placeholder="Number Of Follow Ups"
                                            value={hospitalData.numberOfFollowUps}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridInput
                                            id="followUpIntervalDays"
                                            name="followUpIntervalDays"
                                            placeholder="Follow Up Interval Days"
                                            value={hospitalData.followUpIntervalDays}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridSelect
                                            id="billing-mode"
                                            name="billingMode"
                                            label="Billing Mode (optional)"
                                            options={activeBillingModeForDropdown}
                                            value={hospitalData.billingMode}
                                            required={true}
                                            placeholder={activeBillingModeForDropdown.length ? "Select Billing Mode."
                                                : "No Billing Mode(s) available."}
                                            isDisabled={true}
                                            isMulti={true}
                                            className="multiple-select"
                                        />
                                    </Col>


                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridSelect
                                            id="appt-service-type"
                                            name="appointmentServiceType"
                                            label="Appointment Service Type"
                                            options={activeAppointmentServiceTypeForDropdown}
                                            value={hospitalData.appointmentServiceType}
                                            required={true}
                                            placeholder={activeAppointmentServiceTypeForDropdown.length ?
                                                "Select Appointment Service Type."
                                                : "No Appointment Service Type(s) available."}
                                            isDisabled={true}
                                            isMulti={true}
                                            className="multiple-select"
                                        />
                                    </Col>
                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridSelect
                                            id="primary-appt-service-type"
                                            name="primaryAppointmentServiceType"
                                            label="Primary Appointment Service Type"
                                            options={appointmentServiceTypeListForPrimary}
                                            value={hospitalData.primaryAppointmentServiceType}
                                            required={true}
                                            placeholder={activeAppointmentServiceTypeForDropdown.length ?
                                                "Select Primary Appointment Service Type."
                                                : "No Appointment Service Type(s) available."}
                                            isDisabled={!activeAppointmentServiceTypeForDropdown.length}
                                        />
                                    </Col>

                                    {type !== 'A' && (
                                        hospitalData.remarks &&
                                        <Col sm={12} md={6} lg={6}>
                                            <CHybridTextArea
                                                id="hospital-remarks"
                                                name="remarks"
                                                placeholder="Remarks"
                                                value={hospitalData.remarks}
                                                disabled={true}
                                            />
                                        </Col>
                                    )}

                                    {/*{hospitalData.isCompany &&*/}
                                    {/*    <Col sm={12} md={6} lg={6}>*/}

                                    {/*        {hospitalData.isCompany === 'Y' ? <i className="fa fa-check" />*/}
                                    {/*            : <i className="fa fa-crosshairs" />}&nbsp; F1soft Group of Companies*/}

                                    {/*</Col>*/}
                                    {/*}*/}


                                    <Col sm={12} md={6} lg={6}>
                                        <CFLabel labelName="Status" id="status"/>
                                        <CRadioButton
                                            checked={hospitalData.status === 'Y'}
                                            disabled={true}
                                            readOnly={true}
                                            id="radio1"
                                            label="Active"
                                            type="radio"
                                        />
                                    </Col>
                                    <Col sm={12} md={6} lg={6}>
                                        <CHybridTextArea
                                            key={'contactNumber'}
                                            id="contactNumber"
                                            name="contactNumber"
                                            disabled={true}
                                            readOnly={true}
                                            placeholder="Contact Number"
                                            value={contactNumber.join(", ")}
                                            required={true}
                                            // errorMessagePassed={errorMessageForHospitalCode}
                                        />
                                    </Col>
                                </Row>
                            </Col>


                        </Row>
                        <Row className="mt-4">

                            {AuditableEntityHoc(hospitalData)}
                        </Row>
                    </Container-fluid>
                </CForm>
            </Container-fluid>
        </>
    )
}

export default DetailsModal
