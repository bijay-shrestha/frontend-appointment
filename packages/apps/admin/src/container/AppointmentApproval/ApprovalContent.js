import React from 'react'
import {CForm, CHybridInput} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
const ApprovalContent = ({approvalData}) => {
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
                  value={approvalData.hospitalName}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="appointmentDate"
                  placeholder="Appointment Date"
                  value={approvalData.appointmentDate}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="AppointmentTime"
                  placeholder="Appointment Time"
                  value={approvalData.appointmentTime}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="esewaId"
                  placeholder="Esewa Id"
                  value={approvalData.esewaId}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="registrationNumber"
                  placeholder="Registration Number"
                  value={approvalData.registrationNumber}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="patientName"
                  placeholder="Patient Name"
                  value={approvalData.patientName}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="patientType"
                  placeholder="Patient Type"
                  value={approvalData.patientType}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="Mobile Number"
                  placeholder="Mobile Number"
                  value={approvalData.mobileNumber}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id=""
                  placeholder="Patient Name"
                  value={approvalData.patientName}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="doctor-specializationName"
                  placeholder="Doctor(Specialization)"
                  value={
                    'Dr.' +
                    approvalData +
                    '(' +
                    approvalData.specializationName +
                    ')'
                  }
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="transactionNumber"
                  placeholder="Transaction Number"
                  value={approvalData.transactionNumber}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="refundAmount"
                  placeholder="Refund Amount"
                  value={approvalData.refundAmount}
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

export default ApprovalContent
