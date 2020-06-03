import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {
  //CFLabel,
  CForm,
  CHybridInput,
  CHybridSelect,
  //CHybridTextArea,
  CButton,
  CCheckbox,
  CFLabel
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
  //regexForCommaSeperation,
  //featureTypeDropdownError,
  //isFeatureTypeDropdownLoading,
  //isRequestMethodDropdownLoading,
  requestMethodData,
  //regexForApiUrl,
  //requestMethodDropdownError,
  // formValid,
  // isHospitalApiSaveLoading,
  //onConfirmHandler,
  // onSaveHandler,
  requestParamsIsSelected,
  requestHeadersIsSelected,
  changeRequestHandler,

  //isIntegrationChannelDropdownLoading,
  integrationChannelData,
  integrationTypeData,
  apppointmentModeApiIntegrationData
  // integrationChannelDropdownError,
  //isIntegrationTypeDropdownLoading,

  //integrationTypeDropdownError
  //isRequestBodyByFeatureLoading,
  //requestBodyByFeatureData
  //requestBodyByFeatureErrorMessage
}) => {
  return (
    <>
      <Container-fluid>
        <Row sm="12 p-0">
          <h5 className="title"> Admin API Integration </h5>
        </Row>
        <CForm id="profile-info spec" className="mt-2 profile-info">
          <Container-fluid>
            <Row>
              <Col sm={12} md={3}>
                <CHybridSelect
                  id="client"
                  label="Appointment Mode"
                  name="appointmentModeId"
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  options={apppointmentModeApiIntegrationData}
                  value={integrationData.appointmentModeId}
                  isDisabled={!apppointmentModeApiIntegrationData.length}
                  placeholder={
                    apppointmentModeApiIntegrationData.length
                      ? 'Select Appointment Mode.'
                      : 'No Appointment Mode(s) Found'
                  }
                />
              </Col>
              <Col sm={12} md={3}>
                <CHybridSelect
                  id="integrationTypeId"
                  label="Integration Type"
                  name="integrationTypeId"
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  options={integrationTypeData}
                  value={integrationData.integrationTypeId}
                  isDisabled={
                    !integrationTypeData.length ||
                    !integrationData.appointmentModeId
                  }
                  placeholder={
                    !integrationData.appointmentModeId
                      ? 'Select Client First.'
                      : integrationTypeData.length
                      ? 'Select Integration Type'
                      : 'No Integration Types(s) Found'
                  }
                />
              </Col>
              <Col sm={3} md={3}>
                <CHybridSelect
                  id="integrationChannelId"
                  name="integrationChannelId"
                  value={integrationData.integrationChannelId}
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  label={'Ingtegration Channel'}
                  placeholder={
                    !integrationData.appointmentModeId
                      ? 'Select Client First.'
                      : integrationChannelData.length
                      ? 'Select Integration Channel'
                      : 'No Integration Channel(s) Found'
                  }
                  options={integrationChannelData}
                  isDisabled={
                    !integrationData.appointmentModeId ||
                    !integrationChannelData.length
                  }
                />
              </Col>

              <Col sm={12} md={3}>
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
                    !integrationData.integrationTypeId.value ||
                    !featureTypeDropdownData.length
                  }
                  placeholder={
                    !integrationData.integrationTypeId
                      ? 'Select Integration Type Id First.'
                      : featureTypeDropdownData.length
                      ? 'Select Feature Type'
                      : 'No Feature Types(s) Found'
                  }
                />
              </Col>

              <Col sm={12} md={3}>
                <CHybridSelect
                  id="client"
                  label="Request Method"
                  name="requestMethod"
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  options={requestMethodData}
                  value={integrationData.requestMethod}
                  isDisabled={
                    !integrationData.appointmentModeId.value ||
                    !requestMethodData.length
                  }
                  placeholder={
                    !integrationData.appointmentModeId
                      ? 'Select Client First.'
                      : requestMethodData.length
                      ? 'Select Req. method'
                      : 'No Req. Method(s) Found'
                  }
                />
              </Col>

              <Col sm={12} md={9}>
                <CHybridInput
                  id="apiUrl"
                  name="apiUrl"
                  value={integrationData.apiUrl}
                  onChange={(event, validity) =>
                    onChangeHandler(event, validity)
                  }
                  placeholder={'Enter Request URL'}
                  // fieldValuePattern={regexForApiUrl}
                  // hasValidation={true}
                  // errorMessagePassed={'Value Should be Request Url'}
                />
              </Col>
            </Row>

            <Row>
              <Col>
                <CCheckbox
                  id="c-checkbox-done"
                  name="c-checkbox done"
                  label="Headers"
                  className="module fw-500"
                  checked={requestHeadersIsSelected}
                  onChange={() =>
                    changeRequestHandler('requestHeadersIsSelected', 'headers')
                  }
                />
              </Col>
              <Col>
                {requestHeadersIsSelected ? (
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
                ) : (
                  ''
                )}
              </Col>
            </Row>

            <Row>
              {integrationData.headers.map((header, ind) => {
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
                              onChange={event =>
                                onChangeHandlerHeaderOrQueryParams(
                                  event,
                                  ind,
                                  'headers'
                                )
                              }
                              placeholder={headerKey.replace('Param', '')}
                              value={header[headerKey]}
                              required={true}
                            />
                          </div>
                        </>
                      )
                    })}

                    {integrationData.headers.length !== 1 ? (
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
                    ) : (
                      ''
                    )}
                  </div>
                )
              })}
            </Row>
            <Row>
              <Col>
                <CCheckbox
                  id="c-checkbox-done2"
                  name="c-checkbox done2"
                  label="Query Parameters"
                  className="module fw-500"
                  checked={requestParamsIsSelected}
                  onChange={() =>
                    changeRequestHandler(
                      'requestParamsIsSelected',
                      'queryParams'
                    )
                  }
                />
              </Col>
              <Col>
                {requestParamsIsSelected ? (
                  <CButton
                    id="add-header"
                    name=""
                    size="sm"
                    variant="outline-secondary"
                    className="float-right mb-2"
                    onClickHandler={() =>
                      onAddHeaderOrQueryParams('queryParams')
                    }
                  >
                    <i className="fa fa-plus" />
                    &nbsp;Add
                  </CButton>
                ) : (
                  ''
                )}
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
                            <div className="header-fields">
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
                                placeholder={queryParamKey.replace('Param', '')}
                                value={queryParam[queryParamKey]}
                                required={true}
                              />
                            </div>
                          </>
                        )
                      })}

                      {integrationData.queryParams.length !== 1 ? (
                        <CButton
                          id="remove-header"
                          name=""
                          size="lg"
                          variant="outline-danger"
                          className="float-right remove-button"
                          onClickHandler={() =>
                            onRemoveHandlerHeaderOrQueryParams(
                              ind,
                              'queryParams'
                            )
                          }
                        >
                          <i className="fa fa-times" />
                        </CButton>
                      ) : (
                        ''
                      )}

                      {/* <div className="line-gap"></div> */}
                    </div>
                  )
                })}
              </Row>
            </div>
            {integrationData.requestBody ? (
              <Row className="mt-4">
                <Col sm={12}>
                  {/* <CHybridTextArea
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
                <p className="note">Note: Should be in comma separed format</p> */}
                  <CFLabel id="preId" labelName="Request Body" />
                  <div className="request-body-code">
                    <code>{integrationData.requestBody}</code>
                  </div>
                </Col>
              </Row>
            ) : null}
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default memo(ClientApiIntegrationForm)
