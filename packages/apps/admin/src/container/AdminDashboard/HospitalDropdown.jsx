import React, {memo} from 'react'
import { Col, Form, Row} from 'react-bootstrap'
import {CHybridSelect} from '@frontend-appointment/ui-elements'

const HospitalDropdownList = props => {
    const{hospitalDropdown,hospitalId} = props
  return (
    <Col className="px-0">
      <Form className="hospital-list">
        <Form.Group as={Row} controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Hospital &nbsp;&nbsp;
          </Form.Label>
          <Col sm="10">
            <CHybridSelect placeholder="Select hospital" options={hospitalDropdown} value={hospitalId}></CHybridSelect>
          </Col>
        </Form.Group>
      </Form>
    </Col>
  )
}
export default memo(HospitalDropdownList);