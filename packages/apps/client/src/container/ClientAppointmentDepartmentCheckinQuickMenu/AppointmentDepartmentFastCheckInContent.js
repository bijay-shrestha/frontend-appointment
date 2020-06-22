import React from 'react'
import {
  CForm,
  CHybridInput,
  CHybridTextArea
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const DepartmentApprovalContent = ({approvalData}) => {
  return (
    <>
      <Container-fluid>
        <CForm id="refund-info" className="mt-2">
          <Container-fluid>
            <Row>
              <Col sm={12} md={6} lg={6}>
            
                <CHybridTextArea
                  id="clientName"
                  placeholder="Department Details"
                  value={`${approvalData.hospitalDepartmentName}(${approvalData.vdcOrMunicipality}, ${approvalData.address}, ${approvalData.district}, ${approvalData.province})`}
                  disabled={true}
                />
              </Col>
              {approvalData.roomNumber?<Col sm={12} md={6} lg={6}>
            
                <CHybridInput
                  id="roomNumber"
                  placeholder="Room Number"
                  value={`${approvalData.roomNumber}`}
                  disabled={true}
                />
              </Col>:null}

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="Billing Mode"
                  placeholder="Billing Mode"
                  value={approvalData.billingModeName || 'N/A'}
                  disabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="appointmentDate"
                  placeholder="Appointment Date"
                  value={approvalData.appointmentDate || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="AppointmentTime"
                  placeholder="Appointment Time"
                  value={approvalData.appointmentTime || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="AppointmentAmount"
                  placeholder="Appointment Amount"
                  value={approvalData.appointmentAmount || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="esewaId"
                  placeholder="Esewa Id"
                  value={approvalData.esewaId || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="registrationNumber"
                  placeholder="Registration Number"
                  value={approvalData.registrationNumber || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="patientName"
                  placeholder="Patient Name"
                  value={approvalData.patientName || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="patientType"
                  placeholder="Patient Type"
                  value={
                    approvalData.isRegistered === 'N' ? 'New' : 'Registered'
                  }
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="appointmentCategory"
                  placeholder="Appointment Category"
                  value={approvalData.isSelf === 'Y' ? 'Self' : 'Others'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="Mobile Number"
                  placeholder="Mobile Number"
                  value={approvalData.mobileNumber || 'N/A'}
                  disabled={true}
                />
              </Col>
              {/* <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="doctor-specializationName"
                  placeholder="Doctor(Specialization)"
                  value={
                    approvalData.doctorName && approvalData.specialization
                      ? 'Dr.' +
                        approvalData.doctorName.toUpperCase() +
                        '(' +
                        approvalData.specializationName.toUpperCase() +
                        ')'
                      : 'N/A'
                  }
                  disabled={true}
                />
              </Col> */}
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="transactionNumber"
                  placeholder="Transaction Number"
                  value={approvalData.transactionNumber || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="appointmentMode"
                  placeholder="AppointmentMode"
                  value={approvalData.appointmentMode || 'N/A'}
                  disabled={true}
                />
              </Col>

              {/*<Col sm={12} md={6} lg={6}>*/}
              {/*    <CHybridInput*/}
              {/*        id="refundAmount"*/}
              {/*        placeholder="Refund Amount"*/}
              {/*        value={approvalData.refundAmount}*/}
              {/*        disabled={true}*/}
              {/*    />*/}
              {/*</Col>*/}
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default DepartmentApprovalContent
