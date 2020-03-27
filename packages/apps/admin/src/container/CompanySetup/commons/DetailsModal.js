import React from 'react'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CHybridTextArea,
  CImageDisplayAndView,
  CRadioButton
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import * as DefaultProfileImage from '../img/default-logo.png'

const DetailsModal = ({type, companyData}) => {
  const getOnlyContactNumber = contactsResponse => {
    let contacts = []
    contactsResponse.map(contactNumber => {
      contacts.push(contactNumber.contactNumber)
      return contacts
    })
    return contacts
  }
  let images, contactNumber, bannerImages
  if (type !== 'A') {
    images = [
      {
        src: companyData.hospitalLogo
          ? companyData.hospitalLogo
          : DefaultProfileImage,
        alt: 'LOGO',
        width: 4,
        height: 3
      }
    ]
    bannerImages = [
      {
        src: companyData.hospitalBanner ? companyData.hospitalBanner : '',
        alt: 'BANNER',
        width: 4,
        height: 3
      }
    ]
    contactNumber = getOnlyContactNumber(companyData.contactNumberResponseDTOS)
  } else {
    images = [
      {
        src: companyData.hospitalLogoUrl
          ? companyData.hospitalLogoUrl
          : DefaultProfileImage,
        alt: 'LOGO',
        width: 4,
        height: 3
      }
    ]
    bannerImages = [
      {
        src: companyData.hospitalBannerUrl ? companyData.hospitalBannerUrl : '',
        alt: 'BANNER',
        width: 4,
        height: 3
      }
    ]
    contactNumber = companyData.contactNumber
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
                    <CImageDisplayAndView
                      images={images}
                      className="hospital-logo"
                    />
                  </div>
                  {type !== 'A' ? (
                    companyData.hospitalBanner ? (
                      <CImageDisplayAndView
                        images={bannerImages}
                        className="hospital-banner"
                      />
                    ) : (
                      ''
                    )
                  ) : companyData.hospitalBannerUrl ? (
                    <CImageDisplayAndView
                      images={bannerImages}
                      className="hospital-banner"
                    />
                  ) : (
                    ''
                  )}
                </div>
              </Col>
              <Col lg={12}>
                <Row>
                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="hospital-name"
                      name="name"
                      placeholder="Hospital Name"
                      value={companyData.name}
                      disabled={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="hospital-code"
                      name="code"
                      placeholder="Hospital Code"
                      value={companyData.hospitalCode}
                      disabled={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridTextArea
                      id="Address"
                      name="address"
                      placeholder="Hospital Address"
                      value={companyData.address}
                      disabled={true}
                    />
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="panNumber"
                      name="panNubmer"
                      placeholder="Hospital PanNumber"
                      value={companyData.panNumber}
                      disabled={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="refundPercentage"
                      name="refundPercentage"
                      placeholder="Refund Percentage"
                      value={companyData.refundPercentage}
                      disabled={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="numberOfAdmins"
                      name="numberOfAdmins"
                      placeholder="Number Of Admins"
                      value={companyData.numberOfAdmins}
                      disabled={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="numberOfFreeFollowUps"
                      name="numberOfFreeFollowUps"
                      placeholder="Number Of Free Follow Ups"
                      value={companyData.numberOfFreeFollowUps}
                      disabled={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="followUpIntervalDays"
                      name="followUpIntervalDays"
                      placeholder="Follow Up Interval Days"
                      value={companyData.followUpIntervalDays}
                      disabled={true}
                    />
                  </Col>

                  {type !== 'A' &&
                    companyData.remarks && (
                      <Col sm={12} md={6} lg={6}>
                        <CHybridInput
                          id="hospital-remarks"
                          name="remarks"
                          placeholder="Hospital Remarks"
                          value={companyData.remarks}
                          disabled={true}
                        />
                      </Col>
                    )}

                  {companyData.isCogentAdmin && (
                    <Col sm={12} md={6} lg={6}>
                      {companyData.isCogentAdmin === 'Y' ? (
                        <i className="fa fa-check" />
                      ) : (
                        <i className="fa fa-crosshairs" />
                      )}
                      &nbsp; Only for Cogent Admin
                    </Col>
                  )}

                  <Col sm={12} md={6} lg={6}>
                    <CFLabel labelName="Hospital Status" id="status" />
                    <CRadioButton
                      checked={companyData.status === 'Y'}
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
                      value={contactNumber.join(', ')}
                      required={true}
                      // errorMessagePassed={errorMessageForHospitalCode}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default DetailsModal
