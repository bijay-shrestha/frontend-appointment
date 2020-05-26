import React, {memo} from 'react'
import {
  CForm,
  CHybridInput,
  CHybridTextArea,
  CHybridSelect
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
//import {AuditableEntityHoc} from '@frontend-appointment/commons'

const DetailsModal = ({integrationData, type}) => {
  return (
    <>
      <Container-fluid>
        <CForm id="department-info" className="mt-2 department-info">
          <Container-fluid>
            <Row>
              <Col sm={6} md={6} lg={6}>
                <CHybridSelect
                  id="hospital"
                  label="Hospital"
                  value={integrationData.clientId}
                  isDisabled={true}
                />
              </Col>

              <Col sm={6} md={6} lg={6}>
                <CHybridSelect
                  id="featureType"
                  name="name"
                  label="Feature Type"
                  value={integrationData.featureType}
                  isDisabled={true}
                />
              </Col>

              <Col sm={6} md={6} lg={6}>
                <CHybridSelect
                  id="requestMethod"
                  name="requestmethod"
                  label="Request Method"
                  value={integrationData.requestMethod}
                  isDisabled={true}
                />
              </Col>

              <Col sm={6} md={6} lg={6}>
                <CHybridInput
                  placeholder="Request Url"
                  value={integrationData.apiUrl}
                  isDisabled={true}
                />
              </Col>

              <Col sm={12} md={6} lg={4}>
                {integrationData.headers.map((header, ind) => {
                  return (
                    <div key={'header' + ind} id="header">
                      {Object.keys(header).map((headerKey, index) => {
                        return (
                          <>
                            <CHybridInput
                              key={'header-' + headerKey + index}
                              id={'header-' + headerKey + index}
                              name={headerKey}
                              value={header[headerKey]}
                              placeholder={'Enter a ' + headerKey}
                              required={true}
                              disabled={true}
                            />
                          </>
                        )
                      })}
                    </div>
                  )
                })}
              </Col>

              <Col sm={12} md={8} lg={8}>
                {integrationData.queryParams.map((queryParam, ind) => {
                  return (
                    <div key={'query-param-' + ind} id="query-param">
                      {Object.keys(queryParam).map((queryParamKey, index) => {
                        return (
                          <>
                            <CHybridInput
                              key={'header-' + queryParamKey + index}
                              id={'header-' + queryParamKey + index}
                              name={queryParamKey}
                              disabled={true}
                              placeholder={'Enter a ' + queryParamKey}
                              value={queryParam[queryParamKey]}
                            />
                          </>
                        )
                      })}
                    </div>
                  )
                })}
              </Col>

              <Col sm={6} md={6} lg={6}>
                <CHybridTextArea
                  id="header"
                  placeholder="Request Body"
                  value={integrationData.requestBody}
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

export default memo(DetailsModal)
