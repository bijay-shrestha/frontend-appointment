import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {
  //CFLabel,
  CForm,
  CHybridInput,
  CHybridSelect,
  CHybridTextArea,
  CButton
} from '@frontend-appointment/ui-elements'

const ClientApiIntegrationForm = ({
  onChangeHandlerHeaderOrQueryParams,
  onRemoveHandlerHeaderOrQueryParams,
  onAddHeaderOrQueryParams,
  onChangeHandler,
  integrationData,
  //   setCloseModal,
  featureTypeDropdownData,
  //resetIntegrationData,
  regexForCommaSeperation,
  //featureTypeDropdownError,
  isFeatureTypeDropdownLoading,
  isRequestMethodDropdownLoading,
  requestMethodData,
  regexForApiUrl,
  //requestMethodDropdownError,
  // formValid,
  // isHospitalApiSaveLoading,
  //onConfirmHandler,
  // onSaveHandler,
  hospitalsForDropdown
}) => {
  return (
    <>
      <Container-fluid>
        <Row sm="12 p-0">
          <h5 className="title"> Client Api Integration </h5>
        </Row>
        <CForm id="profile-info spec" className="mt-2 profile-info">
          <Container-fluid>
            <Row>
              <Col sm={12} md={6} lg={4}>
                <CHybridSelect
                  id="client"
                  label="Client"
                  name="clientId"
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  options={hospitalsForDropdown}
                  value={integrationData.clientId}
                  isDisabled={!hospitalsForDropdown.length}
                  placeholder={'Select Client.'}
                />
              </Col>

              <Col sm={12} md={6} lg={4}>
                <CHybridSelect
                  id="client"
                  label="Feature Type"
                  name="featureType"
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  options={featureTypeDropdownData}
                  value={integrationData.featureType}
                  isDisabled={
                    !integrationData.clientId.value || !requestMethodData.length
                  }
                  placeholder={
                    integrationData.clientId
                      ? 'Select Client First.'
                      : featureTypeDropdownData.length
                      ? 'Select Feature Type'
                      : 'No Feature Types(s) Found'
                  }
                  isLoading={isFeatureTypeDropdownLoading}
                />
              </Col>

              <Col sm={12} md={6} lg={4}>
                <CHybridSelect
                  id="client"
                  label="Request Method"
                  name="requestMethod"
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  options={requestMethodData}
                  value={integrationData.requestMethod}
                  isLoading={isRequestMethodDropdownLoading}
                  isDisabled={
                    !integrationData.clientId.value || !requestMethodData.length
                  }
                  placeholder={
                    integrationData.clientId
                      ? 'Select Client First.'
                      : requestMethodData.length
                      ? 'Select Request method'
                      : 'No Request Method(s) Found'
                  }
                />
              </Col>

              </Row>
              <Row>
              <Col sm={12} md={8} >
                <CHybridInput
                  id="apiUrl"
                  name="apiUrl"
                  value={integrationData.apiUrl}
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  placeholder={'Enter the api url'}
                  fieldValuePattern={regexForApiUrl}
                  hasValidation={true}
                  errorMessagePassed={'Value Should be Api Url'}
                />
              </Col>
              </Row>

              <Row>
                <Col ><div className="underline">Headers</div>
                </Col>
                <Col>
                  <CButton
                    id="add-header"
                    name=""
                    size="sm"
                    variant="outline-secondary"
                    className="float-right mb-2"
                    onClickHandler={() => onAddHeaderOrQueryParams('headers')}
                   
                  >
                  <i className="fa fa-plus" />
                        &nbsp;Add
                        </CButton>
                </Col>
                </Row>
               
                <>
                {integrationData.headers.length &&
                  integrationData.headers.map((header, ind) => {
                    return (
                      <Row key={'header' + ind} id="header">
                        {Object.keys(header).map((headerKey, index) => {
                          return (
                            <>
                            <Col sm={4}>
                              <CHybridInput
                                key={'header-' + headerKey + index}
                                id={'header-' + headerKey + index}
                                name={headerKey}
                                onChange={event =>
                                  onChangeHandlerHeaderOrQueryParams(
                                    event,
                                    ind,
                                    'headers'
                                  )
                                }
                                placeholder={'Enter a ' + headerKey}
                                value={header[headerKey]}
                                required={true}
                              />
                              </Col>
                            </>
                          )
                        })}
                        <Col >
                        <CButton
                          id="remove-header"
                          name=""
                          size="sm"
                          variant="outline-danger"
                          className="float-right  remove-button"
                          onClickHandler={() =>
                            onRemoveHandlerHeaderOrQueryParams(ind, 'headers')
                          }                          
                        >
                         <i className="fa fa-times" />
                        &nbsp;Remove
                        </CButton>
                        </Col>
                      </Row>
                    )
                  })}
              </>
              <Row className="mt-4">
              <Col><div className="underline"> Query Parameters</div>
                </Col>
               
              <Col>
                <CButton
                  id="add-header"
                  name=""
                    size="sm"
                    variant="outline-secondary"
                    className="float-right mb-2"
                  onClickHandler={() => onAddHeaderOrQueryParams('queryParams')}
                >
                  <i className="fa fa-plus" />
                        &nbsp;Add
                </CButton>
                </Col>

                </Row>
                <>
                {integrationData.queryParams.length &&
                  integrationData.queryParams.map((queryParam, ind) => {
                    return (
                      <Row key={'query-param-' + ind} id="query-param" className="mb-4">
                        {Object.keys(queryParam).map((queryParamKey, index) => {
                          return (
                            <>
                              <Col sm={4}>
                              <CHybridInput
                                key={'header-' + queryParamKey + index}
                                id={'header-' + queryParamKey + index}
                                name={queryParamKey}
                                onChange={event =>
                                  onChangeHandlerHeaderOrQueryParams(
                                    event,
                                    ind,
                                    'queryParams'
                                  )
                                }
                                placeholder={'Enter a ' + queryParamKey}
                                value={queryParam[queryParamKey]}
                                required={true}
                              />
                              </Col>
                             
                            </>
                          )
                        })}
                        <Col>
                        <CButton
                          id="remove-header"
                          name=""
                          size="sm"
                          variant="outline-danger"
                          className="float-right  remove-button"
                          onClickHandler={() =>
                            onRemoveHandlerHeaderOrQueryParams(
                              ind,
                              'queryParams'
                            )
                          }
                        >
                          <i className="fa fa-times" />
                        &nbsp;Remove
                        </CButton>
                        </Col>
                        {/* <div className="line-gap"></div> */}
                      </Row>
                   
                   )
                  })}
          
              </>
              <Row className="mt-4">
              <Col sm={12} md={8} lg={8}>
                <CHybridTextArea
                  id="request-body-hospital-integration"
                  name="requestBody"
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  placeholder="Request Body Attributes"
                  value={integrationData.requestBody}
                  required={true}
                  hasValidation={true}
                  fieldValuePattern={regexForCommaSeperation}
                  errorMessagePassed={'Value Should Be Comma Seperated'}
                />
              </Col>
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default memo(ClientApiIntegrationForm)
