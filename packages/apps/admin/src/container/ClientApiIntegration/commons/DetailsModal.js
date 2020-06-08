import React, {memo} from 'react'
import {
  CForm,
  CHybridInput,
  CHybridSelect,
  CFLabel
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import {AuditableEntityHoc} from '@frontend-appointment/commons'

const DetailsModal = ({
  integrationData,
  type,
  isRequestBodyByFeatureLoading,
  requestBodyByFeatureErrorMessage
}) => {
  return (
    <>
      <Container-fluid>
        <CForm id="department-info" className="mt-2 api-info">
          <Container-fluid>
            <Row>
              <Col sm={12} md={3}>
                {type !== 'P' ? (
                  <CHybridSelect
                    id="hospital"
                    label="Client"
                    value={integrationData.clientId}
                    isDisabled={true}
                  />
                ) : (
                  <CHybridInput
                    id="hospital"
                    value={integrationData.clientId || 'N/A'}
                    disabled={true}
                    placeholder={'Client'}
                  />
                )}
              </Col>
              <Col sm={12} md={3}>
                {type !== 'P' ? (
                  <CHybridSelect
                    id="integrationType"
                    name="integrationType"
                    label="Integration Type"
                    value={integrationData.integrationTypeId}
                    isDisabled={true}
                  />
                ) : (
                  <CHybridInput
                    id="featureType"
                    value={integrationData.integrationTypeId}
                    disabled={true}
                    placeholder={'Feature Type'}
                  />
                )}
              </Col>

              <Col sm={3}>
                {type !== 'P' ? (
                  <CHybridSelect
                    id="integrationChannelId"
                    name="integrationChannelIdPreview"
                    label="Integation Channel "
                    value={integrationData.integrationChannelId}
                    isDisabled={true}
                  />
                ) : (
                  <CHybridInput
                    id="iintegrationChannelId"
                    value={integrationData.integrationChannelId}
                    disabled={true}
                    placeholder="Integration Channel"
                  />
                )}
              </Col>

              <Col sm={12} md={3}>
                {type !== 'P' ? (
                  <CHybridSelect
                    id="featureType"
                    name="name"
                    label="Feature Type"
                    value={integrationData.featureType}
                    isDisabled={true}
                  />
                ) : (
                  <CHybridInput
                    id="featureType"
                    value={integrationData.featureType}
                    disabled={true}
                    placeholder={'Feature Type'}
                  />
                )}
              </Col>

              <Col sm={3}>
                {type !== 'P' ? (
                  <CHybridSelect
                    id="requestMethod"
                    name="requestmethod"
                    label="Request Method"
                    value={integrationData.requestMethod}
                    isDisabled={true}
                  />
                ) : (
                  <CHybridInput
                    id="requestMethod"
                    value={integrationData.requestMethod}
                    disabled={true}
                    placeholder="Request Method"
                  />
                )}
              </Col>

              <Col sm={9}>
                <CHybridInput
                  placeholder="Request Url"
                  name="Request Url"
                  value={integrationData.apiUrl || 'N/A'}
                  disabled={true}
                />
              </Col>
            </Row>

            <Row>
              {integrationData.headers.length?<div className="underline  px-3 mb-3 mt-1">Headers</div>:null}
              {integrationData.headers.length
                ? integrationData.headers.map((header, ind) => {
                    return (
                      <div key={'header' + ind} id="header" className="header">
                        {Object.keys(header).map((headerKey, index) => {
                          return (
                            <>
                              <div className="header-fields">
                                <CHybridInput
                                  key={'header-' + headerKey + index}
                                  id={'header-' + headerKey + index}
                                  name={headerKey}
                                  placeholder={headerKey}
                                  value={header[headerKey]}
                                  required={true}
                                  disabled={true}
                                />
                              </div>
                            </>
                          )
                        })}
                      </div>
                    )
                  })
                : null}
            </Row>
            <Row>
              {integrationData.queryParams.length?<div className="underline px-3 my-3">Query Params</div>:null}
              {integrationData.queryParams.length
                ? integrationData.queryParams.map((queryParam, ind) => {
                    return (
                      <div
                        key={'query-param-' + ind}
                        id="query-param"
                        className="header"
                      >
                        {Object.keys(queryParam).map((queryParamKey, index) => {
                          return (
                            <>
                              <div className="header-fields">
                                <CHybridInput
                                  key={'header-' + queryParamKey + index}
                                  id={'header-' + queryParamKey + index}
                                  name={queryParamKey}
                                  disabled={true}
                                  placeholder={queryParamKey}
                                  value={queryParam[queryParamKey]}
                                />
                              </div>
                            </>
                          )
                        })}
                      </div>
                    )
                  })
                : null}
            </Row>
            <Row>
              {integrationData.requestMethod.label !== 'GET' &&
              integrationData.requestMethod !== 'GET' ? (
                <Col sm={12} className="mt-4">
                  <CFLabel id="preId" labelName="Request Body" />
                  <div className="request-body-code">
                    {integrationData.requestBody &&
                    !isRequestBodyByFeatureLoading &&
                    !requestBodyByFeatureErrorMessage ? (
                      <code>{integrationData.requestBody}</code>
                    ) : !isRequestBodyByFeatureLoading &&
                      requestBodyByFeatureErrorMessage ? (
                      <code color="red">
                        {requestBodyByFeatureErrorMessage}
                      </code>
                    ) : (
                      <code>Loading....</code>
                    )}
                  </div>

                  {/* <CHybridTextArea
                  id="header"
                  placeholder="Request Body"
                  value={integrationData.requestBody}
                  disabled={true}
                /> */}
                </Col>
              ) : null}
            </Row>
            <Row className="mt-4">{AuditableEntityHoc(integrationData)}</Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default memo(DetailsModal)
