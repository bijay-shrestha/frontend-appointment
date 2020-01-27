import React from 'react'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CRadioButton,
  CHybridTextArea,
  CImageDisplayAndView
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import * as DefaultProfileImage from '../Add/picture.png'
const DetailsModal = ({type, hospitalData}) => {
  let images, contactNumber
  if (type !== 'A') {
    images = [
      {
        src: hospitalData.fileUri ? hospitalData.fileUri : DefaultProfileImage,
        alt: 'hospital',
        width: 4,
        height: 3
      }
    ]
    contactNumber = hospitalData.contactNumberResponseDTOS
  } else {
    images = [
      {
        src: hospitalData.hospitalLogoUrl
          ? hospitalData.hospitalLogoUrl
          : DefaultProfileImage,
        alt: 'Hospital',
        width: 4,
        height: 3
      }
    ]
    contactNumber = contactNumber
  }

  return (
    <>
      <Container-fluid>
        <Row className="pl-4 pr-4">
          <h5>Hospital Info</h5>
        </Row>

        <CForm id="hospital-info" className="mt-2 department-info">
          <Container-fluid>
            <Row>
              <Col sm={4} md={4} lg={4}>
                <CImageDisplayAndView images={images} />
              </Col>
              <Col sm={4} md={4} lg={4}>
                <CHybridInput
                  id="hospital-name"
                  name="name"
                  placeholder="Hospital Name"
                  value={hospitalData.name}
                  disabled={true}
                />
              </Col>

              <Col sm={4} md={4} lg={4}>
                <CHybridInput
                  id="hospital-code"
                  name="code"
                  placeholder="Hospital Code"
                  value={hospitalData.hospitalCode}
                  disabled={true}
                />
              </Col>

              <Col sm={4} md={4} lg={4}>
                <CHybridTextArea
                  id="Address"
                  name="address"
                  placeholder="Hospital Address"
                  value={hospitalData.address}
                  disabled={true}
                />
              </Col>
              <Col sm={4} md={4} lg={4}>
                <CHybridInput
                  id="panNumber"
                  name="panNubmer"
                  placeholder="Hospital PanNumber"
                  value={hospitalData.panNumber}
                  disabled={true}
                />
              </Col>
              {type !== 'A' && (
                <Col sm={4} md={4} lg={4}>
                  <CHybridInput
                    id="hospital-remarks"
                    name="remarks"
                    placeholder="Hospital Remarks"
                    value={hospitalData.remarks}
                    disabled={true}
                  />
                </Col>
              )}
              <Col sm={4} md={4} lg={4}>
                <CFLabel labelName="Hospital Status" id="status" />
                <CRadioButton
                  checked={hospitalData.status === 'Y'}
                  disabled={true}
                  readOnly={true}
                  id="radio1"
                  label="Active"
                  type="radio"
                />
              </Col>
              <Col sm={12} md={4} lg={4}>
                <CFLabel
                  labelName="Hospital Contact Number"
                  id="hospital_contact_number"
                />
                {contactNumber.map((contNumber, idx) => {
                  return (
                    <CHybridInput
                      key={'contactInput' + idx}
                      id={'contactInput' + idx}
                      id="contactNumber"
                      name="contactNumber"
                      disabled={true}
                      readOnly={true}
                      placeholder="Contact Number"
                      value={contNumber}
                      required={true}
                      // errorMessagePassed={errorMessageForHospitalCode}
                    />

                    // </Container-fluid>
                  )
                })}
              </Col>

              {/* <CRadioButton
                  checked={specializationData.status === 'N'}
                  disabled={true}
                  readOnly={true}
                  id="radio2"
                  label="Inactive"
                  type="radio"
                /> */}
              {/* </Col> */}
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default DetailsModal
