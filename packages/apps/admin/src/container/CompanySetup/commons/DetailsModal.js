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
  let images, contactNumber
  if (type !== 'A') {
    images = [
      {
        src: companyData.companyLogo
          ? companyData.companyLogo
          : DefaultProfileImage,
        alt: 'LOGO',
        width: 4,
        height: 3
      }
    ]
    // bannerImages = [
    //   {
    //     src: companyData.hospitalBanner ? companyData.hospitalBanner : '',
    //     alt: 'BANNER',
    //     width: 4,
    //     height: 3
    //   }
    // ]
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
    // bannerImages = [
    //   {
    //     src: companyData.hospitalBannerUrl ? companyData.hospitalBannerUrl : '',
    //     alt: 'BANNER',
    //     width: 4,
    //     height: 3
    //   }
    // ]
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
                  <div className="image-upload-container hospital-container">
                    <CImageDisplayAndView
                      images={images}
                      className="hospital-logo"
                    />
                 
                </div>
              </Col>
              <Col lg={12}>
                <Row>
                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="hospital-name"
                      name="name"
                      placeholder="Company Name"
                      value={companyData.name}
                      disabled={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="hospital-code"
                      name="code"
                      placeholder="Company Code"
                      value={companyData.companyCode}
                      disabled={true}
                    />
                  </Col>

                  <Col sm={12} md={6} lg={6}>
                    <CHybridTextArea
                      id="Address"
                      name="address"
                      placeholder="Company Address"
                      value={companyData.address}
                      disabled={true}
                    />
                  </Col>
                  <Col sm={12} md={6} lg={6}>
                    <CHybridInput
                      id="panNumber"
                      name="panNubmer"
                      placeholder="Company PanNumber"
                      value={companyData.panNumber}
                      disabled={true}
                    />
                  </Col>

                  {type !== 'A' && companyData.remarks && (
                    <Col sm={12} md={6} lg={6}>
                      <CHybridInput
                        id="hospital-remarks"
                        name="remarks"
                        placeholder="Company Remarks"
                        value={companyData.remarks}
                        disabled={true}
                      />
                    </Col>
                  )}

                  <Col sm={12} md={6} lg={6}>
                    <CFLabel labelName="Company Status" id="status" />
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
