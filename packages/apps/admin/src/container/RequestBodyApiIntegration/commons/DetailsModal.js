import React from 'react'
import {CForm, CHybridSelect} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import {AuditableEntityHoc} from '@frontend-appointment/commons'

const DetailsModal = ({requestBodyData, type}) => {
    
  return (
    <>
      <Container-fluid>
        <CForm id="department-info" className="mt-2 department-info">
          <Container-fluid>
            <Row>
              <Col sm={6} md={6} lg={6}>
                <CHybridSelect
                  id="featureTypeId"
                  name="featureTypeId"
                  label="Feature Type"
                  value={requestBodyData.featureTypeId}
                  isDisabled={true}
                />
              </Col>

              <Col sm={6} md={6} lg={6}>
                <CHybridSelect
                  id="requestBodys"
                  label="Request Body"
                  value={requestBodyData.requestBodys}
                  isMulti={true}
                  isDisabled={true}
                />
              </Col>
            </Row>
            <Row className="mt-4">{AuditableEntityHoc(requestBodyData)}</Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default DetailsModal
