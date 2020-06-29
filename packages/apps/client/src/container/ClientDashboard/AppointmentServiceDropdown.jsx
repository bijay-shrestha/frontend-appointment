import React, {memo} from 'react'
import {Col, Form, Row} from 'react-bootstrap'
import {CHybridSelect} from '@frontend-appointment/ui-elements'

const AppointmentServiceDropdownList = props => {
  const {
    serviceTypeDropdown,
    appointmentServiceTypeCode,
    handleAppointmentChange
  } = props
  return (
    <Col className="px-0">
      <Form className="hospital-list">
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Col sm="12">
            <div className="hospital-list-input">
              <Form.Label className="hospital-label">Appointment Service Type</Form.Label>
              <CHybridSelect
                name="appointmentServiceTypeCode"
                placeholder="Select Appointment Service Type"
                onChange={handleAppointmentChange}
                options={serviceTypeDropdown.map(service =>({value:service.code,label:service.name}))}
                value={appointmentServiceTypeCode}
              ></CHybridSelect>
            </div>
          </Col>
        </Form.Group>
      </Form>
    </Col>
  )
}
export default memo(AppointmentServiceDropdownList)
