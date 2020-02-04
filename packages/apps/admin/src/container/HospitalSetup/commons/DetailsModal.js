import React from 'react'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CRadioButton,
  CHybridTextArea,
  CImageDisplayAndView,
  CFControl
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import * as DefaultProfileImage from '../img/default-logo.png'
const DetailsModal = ({type, hospitalData}) => {
  const getOnlyContactNumber =(contactsResponse) =>{
    let contacts =[];
    contactsResponse.map(contactNumber=>{contacts.push(contactNumber.contactNumber)})
    return contacts
  }
  let images, contactNumber;
  if (type !== 'A') {
    images = [
      {
        src: hospitalData.fileUri ? hospitalData.fileUri : DefaultProfileImage,
        alt: 'hospital',
        width: 4,
        height: 3
      }
    ]
    contactNumber =getOnlyContactNumber(hospitalData.contactNumberResponseDTOS)
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
              
              <Col sm={12} md={12} lg={3} className= "order-md-first order-lg-last">
                <CImageDisplayAndView images={images} />
              </Col>
              <Col lg={9}>
                <Row>
                <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="hospital-name"
                  name="name"
                  placeholder="Hospital Name"
                  value={hospitalData.name}
                  disabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="hospital-code"
                  name="code"
                  placeholder="Hospital Code"
                  value={hospitalData.hospitalCode}
                  disabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridTextArea
                  id="Address"
                  name="address"
                  placeholder="Hospital Address"
                  value={hospitalData.address}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="panNumber"
                  name="panNubmer"
                  placeholder="Hospital PanNumber"
                  value={hospitalData.panNumber}
                  disabled={true}
                />
              </Col>
              {type !== 'A' && (
                <Col sm={12} md={6} lg={6}>
                  <CHybridInput
                    id="hospital-remarks"
                    name="remarks"
                    placeholder="Hospital Remarks"
                    value={hospitalData.remarks}
                    disabled={true}
                  />
                </Col>
              )}
              <Col sm={12} md={6} lg={6}>
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
              <Col sm={12} md={6} lg={6}>
                {/* <CFLabel
                  labelName="Contact Number"
                  id="hospital_contact_number"
                /> */}
                    <CHybridTextArea
                      key={'contactInput'}
                      id={'contactInput' }
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
