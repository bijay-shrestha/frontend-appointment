import React from 'react'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CRadioButton,
  
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const DetailsModal = ({type,hospitalData}) => {
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
                  {hospitalData.contactNumber.map((contNumber, idx) => {
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
