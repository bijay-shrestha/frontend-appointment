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
              <Col sm={12} md={6} lg={6}>
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

              <Col sm={12} md={6} lg={6}>
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

              
            </Row>
            <Row>
            <Col sm={4} md={4} lg={4}>
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
              <Col sm={8} md={8}>
                <CHybridInput
                  id="apiUrl"
                  name="apiUrl"
                  value={integrationData.apiUrl}
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  placeholder={'Enter Request URL'}
                  fieldValuePattern={regexForApiUrl}
                  hasValidation={true}
                  errorMessagePassed={'Value Should be Api Url'}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <div className="underline">Headers</div>
              </Col>
              <Col>
              <CButton
                  id="add-header"
                  name=""
                  size="sm"
                  variant="outline-secondary"
                  className="float-right mb-2 add-button"
                  onClickHandler={() => onAddHeaderOrQueryParams('headers')}
                >
                  <i className="fa fa-plus" />
                  &nbsp;Add
                </CButton>
             </Col>
            </Row>
           
            <Row >
              {integrationData.headers.map((header, ind) => {
                return (
                  <div key={'header' + ind} id="header" className="header">
                    {Object.keys(header).map((headerKey, index) => {
                      return (
                        <>
                          <div className="header-fields" >
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
                              placeholder={ headerKey}
                              value={header[headerKey]}
                              required={true}
                            />
                          </div>
                        </>
                      )
                    })}
                   
                      <CButton
                        id="remove-header"
                        name=""
                        size="lg"
                        variant="outline-danger"
                        className="float-right  remove-button"
                        onClickHandler={() =>
                          onRemoveHandlerHeaderOrQueryParams(ind, 'headers')
                        }
                      >
                        <i className="fa fa-times" />
                        {/* &nbsp;Remove */}
                      </CButton>
                
                  </div>
                )
              })}
            </Row>
            <Row >
              <Col>
                <div className="underline"> Query Parameters</div>
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
            <div className="">
            
                <Row>
              {integrationData.queryParams.map((queryParam, ind) => {
                return (
                  <div
                    key={'query-param-' + ind}
                    id="query-param"
                    className="header"
                  >
                    {Object.keys(queryParam).map((queryParamKey, index) => {
                      return (
                        <>
                          <div className="header-fields" >
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
                              placeholder={ queryParamKey}
                              value={queryParam[queryParamKey]}
                              required={true}
                            />
                          </div>
                        </>
                      )
                    })}
                 
                      <CButton
                        id="remove-header"
                        name=""
                        size="sm"
                        variant="outline-danger"
                        className="float-right  remove-button"
                        onClickHandler={() =>
                          onRemoveHandlerHeaderOrQueryParams(ind, 'queryParams')
                        }
                      >
                        <i className="fa fa-times" />
                       
                      </CButton>
                  
                    {/* <div className="line-gap"></div> */}
                  </div>
                )
              })}
              </Row>
            </div>
            <Row className="mt-4">
              <Col sm={12} >
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
                <p className="note">Note: Should be in  comma separed format</p>
              </Col>
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default memo(ClientApiIntegrationForm)
