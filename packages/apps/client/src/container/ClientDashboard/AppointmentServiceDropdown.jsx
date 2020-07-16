import React, {memo} from 'react'
import {Form} from 'react-bootstrap'
import {CHybridSelect} from '@frontend-appointment/ui-elements'

const AppointmentServiceDropdownList = props => {
  const {
    serviceTypeDropdown,
    appointmentServiceTypeCode,
    handleAppointmentChange
  } = props
  return (  
      <Form className="hospital-list service-list">
        <Form.Group  controlId="formPlaintextEmail">    
            <div className="hospital-list-input">
              <Form.Label className="hospital-label">Appointment Service Type</Form.Label>
              <CHybridSelect
                name="appointmentServiceTypeCode"
                placeholder="Select Appointment Type"
                onChange={handleAppointmentChange}
                options={serviceTypeDropdown.map(service =>({value:service.code,label:service.name}))}
                value={appointmentServiceTypeCode}
              ></CHybridSelect>
            </div>      
        </Form.Group>
      </Form>
  )
}
export default memo(AppointmentServiceDropdownList)
