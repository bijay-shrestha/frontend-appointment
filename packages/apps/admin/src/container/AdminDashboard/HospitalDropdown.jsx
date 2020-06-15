import React, {memo} from 'react'
import { Col, Form, Row} from 'react-bootstrap'
import {CHybridSelect} from '@frontend-appointment/ui-elements'

const HospitalDropdownList = props => {
    const{hospitalDropdown,hospitalId,handleHospitalChange} = props
  return (
    
      <Form className="hospital-list">
        <Form.Group controlId="formPlaintextEmail">
            <div className="hospital-list-input">
             <Form.Label className="hospital-label">
              Client
            </Form.Label>
            <CHybridSelect name="hospitalId" placeholder="Select client" onChange={handleHospitalChange} options={hospitalDropdown} value={hospitalId}></CHybridSelect>
            </div>        
        </Form.Group>
      </Form>
   
  )
}
export default memo(HospitalDropdownList);
