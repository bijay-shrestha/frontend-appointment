import React from 'react'
import {CForm, CHybridSelect,CHybridTextArea} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import {AuditableEntityHoc} from '@frontend-appointment/commons'

const DetailsModal = ({requestBodyData, type}) => {
  return (
    <>
      <Container-fluid>
        <CForm id="department-info" className="mt-2 department-info">
          <Container-fluid>
            <Row>
              <Col sm={4} md={4} lg={4}>
                <CHybridSelect
                  id="featureTypeId"
                  name="featureTypeId"
                  label="Feature Type"
                  value={requestBodyData.featureTypeId}
                  isDisabled={true}
                />
              </Col>

              <Col sm={8} md={8} lg={8}>
                {type === 'A' ? (
                  <CHybridSelect
                    id="requestBodys"
                    label="Request Body"
                    value={requestBodyData.requestBodys}
                    isMulti={true}
                    isDisabled={true}
                  />
                ) : (
                  <CHybridTextArea
                    id="requestBodys"
                    placeholder="Request Body"
                    value={requestBodyData.requestBodys}
                    disabled={true}
                  />
                )}
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
