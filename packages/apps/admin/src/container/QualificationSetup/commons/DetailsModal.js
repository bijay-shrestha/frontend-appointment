import React from 'react'
import {
  CFLabel,
  CForm,
  CHybridInput,
  CRadioButton,
  CHybridSelect
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const DetailsModal = ({qualificationData}) => {
  return (
    <>
      <Container-fluid>
        <Row className="pl-4 pr-4">
          <h5>Qualification Info</h5>
        </Row>

        <CForm id="department-info" className="mt-2 department-info">
          <Container-fluid>
            <Row>
            <Col sm={12} md={4} lg={4}>
                <CHybridInput
                  id="qualification-name"
                  name="name"
                  onKeyDown={event => onEnterKeyPress(event)}
                  onChange={(event, validity) => onInputChange(event, validity)}
                  placeholder="Qualification Name"
                  value={qualificationData.name}
                  disabled={true}
                />
              </Col>
              <Col sm={12} md={4} xl={4}>
                  <CHybridSelect
                      id="countryId"
                      name="countryId"
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => onInputChange(event)}
                      value={qualificationData.countryId}
                      isDisabled={true}
                  />
              </Col>
              <Col sm={12} md={4} xl={4}>
                  <CHybridSelect
                      id="qualificationAliasId"
                      name="qualificationAliasId"
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => onInputChange(event)}
                      value={qualificationData.qualificationAliasId}
                     isDisabled={true}
                    />
              </Col>
              <Col sm={12} md={4} xl={4}>
                  <CHybridSelect
                      id="universityId"
                      name="universityId"
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => onInputChange(event)}
                      value={qualificationData.universityId}
                      isDisabled={true}
                    />
              </Col>
              <Col sm={12} md={4} lg={4}>
                <CFLabel labelName="Status" id="status"></CFLabel>
                <CRadioButton
                  checked={Boolean(qualificationInfoObj.status)}
                  disabled={true}
                  id="radio1"
                  label="Active"
                  type="radio"
                  readOnly
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
