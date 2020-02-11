import React from 'react'
import {CForm, CHybridInput} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
const DetailsModal = ({logData}) => {
  return (
    <>
      <Container-fluid>
        <CForm id="refund-info" className="mt-2">
          <Container-fluid>
            <Row>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="hospitalName"
                  placeholder="Hospital Name"
                  value={logData.hospitalName}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="appointmentDate"
                  placeholder="Appointment Date"
                  value={logData.appointmentDate}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="AppointmentTime"
                  placeholder="Appointment Time"
                  value={logData.appointmentTime}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="AppointmentNumber"
                  placeholder="Appointment Number"
                  value={logData.appointmentNumber}
                  disabled={true}
                />
              </Col>  
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="esewaId"
                  placeholder="Esewa Id"
                  value={logData.esewaId}
                  disabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="registrationNumber"
                  placeholder="Registration Number"
                  value={logData.registrationNumber}
                  disabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="registrationNumber"
                  placeholder="Registration Number"
                  value={logData.registrationNumber}
                  disabled={true}
                />
              </Col>
            
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="patientName"
                  placeholder="Patient Name"
                  value={logData.patientName+"("+logData.age+"yrs/"+logData.genderCode+")"}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id=""
                  placeholder="Mobile Number"
                  value={logData.mobileNumber}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id=""
                  placeholder="Address"
                  value={logData.address}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="transactionNumber"
                  placeholder="Transaction Number"
                  value={logData.transactionNumber}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="cancelledDate"
                  placeholder="Cancelled Date"
                  value={logData.cancelledDate}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="refundAmount"
                  placeholder="Refund Amount"
                  value={logData.refundAmount}
                  disabled={true}
                />
              </Col>
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default DetailsModal
