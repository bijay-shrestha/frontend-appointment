import React from 'react'
import {
  CForm,
  CHybridTextArea,
  CHybridInput
} from '@frontend-appointment/ui-elements'
import {DoctorWithSpecImage} from '@frontend-appointment/ui-components'
import {Col, Row} from 'react-bootstrap'

const ApprovalContent = ({transferData}) => {
  const patientDetails = transferData.patientName
    .concat(', ')
    .concat(transferData.age)
    .concat('/')
    .concat(transferData.gender)
    .concat(',')
    .concat(transferData.mobileNumber)
  const followUp = transferData.isFollowUp !== 'N' ? '(Follow Up)' : ''
  const appointmentNumberWithFollowup =
    transferData.appointmentNumber + followUp
  const transferredToDate = transferData.transferredToDate
    ? new Date(transferData.transferredToDate).toDateString()
    : ''
  const transferredFromDate = transferData.transferredFromDate
    ? new Date(transferData.transferredFromDate).toDateString()
    : ''
  const transferredToDateAndTime =
    transferredToDate || transferData.transferredToTime
      ? transferredToDate
          .concat(' ')
          .concat(transferData.transferredToTime || '')
      : ''
  const transferredFromDateAndTime =
    transferredFromDate || transferData.transferredFromTime
      ? transferredFromDate
          .concat(' ')
          .concat(transferData.transferredFromTime || '')
      : ''
  return (
    <>
      <Container-fluid >
        <CForm id="" className="mt-2">
          <Container-fluid >
            <Row>
              {/*<Col sm={12} md={6} lg={6}>*/}
              {/*    <CHybridInput*/}
              {/*        id="clientName"*/}
              {/*        placeholder="Client Name"*/}
              {/*        value={transferData.hospitalName}*/}
              {/*        disabled={true}*/}
              {/*    />*/}
              {/*</Col>*/}

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="appointmentNumber"
                  placeholder="Appointment Number"
                  value={appointmentNumberWithFollowup || 'N/A'}
                  disabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridTextArea
                  id="patientDetails"
                  placeholder="Patient Details"
                  value={patientDetails || 'N/A'}
                  disabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="transactionNumber"
                  placeholder="Transaction Number"
                  value={transferData.transactionNumber || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="patientType"
                  placeholder="Patient Type"
                  value={
                    transferData.patientType === 'N' ? 'New' : 'Registered'
                  }
                  disabled={true}
                />
              </Col>
            
              
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="Transferred From Date"
                  placeholder="Transferred From Date/Time"
                  value={transferredFromDateAndTime || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="Transferred To Date"
                  placeholder="Transferred To Date/Time"
                  value={transferredToDateAndTime || 'N/A'}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={6} lg={6} className="transfer-log-details">
              <div className="doctor-box">
              <span className="doctor-label">Transferred From Doctor</span>
                <DoctorWithSpecImage
                  node={{
                    data: {
                      doctorName: transferData.transferredFromDoctor,
                      fileUri: transferData.transferredFromFileUri,
                      specializationName:
                        transferData.transferredFromSpecialization
                    }
                  }}
                />
                </div>
              </Col>
              <Col sm={12} md={6} lg={6} className="transfer-log-details">
              <div className="doctor-box ">
              <span className="doctor-label ">Transferred To Doctor</span>
              
                <DoctorWithSpecImage
                  node={{
                    data: {
                      doctorName: transferData.transferredToDoctor,
                      fileUri: transferData.transferredToFileUri,
                      specializationName:
                        transferData.transferredToSpecialization
                    }
                  }}
                />
                </div>
              </Col>
              <Col sm={12} md={6} lg={6} >
                <CHybridInput
                  id="Transferred From Amount "
                  placeholder="Transfer From Amount"
                  value={transferData.transferredFromAmount || 'N/A'}
                  disabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={6}>
                <CHybridInput
                  id="Transferred To Amount "
                  placeholder="Transfer To Amount"
                  value={transferData.transferredToAmount || 'N/A'}
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
