import React,{memo} from 'react'
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
        <CForm id="department-info" className="mt-2 api-info">
          <Container-fluid>
            <Row>
            <Col sm={12} md={4}>
                <CHybridSelect
                  id="hospital"
                  label="Hospital"
                  value={integrationData.clientId}
                  isDisabled={true}
                />
              </Col>

              <Col sm={12} md={4}>
                Integration Type
                </Col>

              <Col sm={12} md={4}>
                <CHybridSelect
                  id="featureType"
                  name="name"
                  label="Feature Type"
                  value={integrationData.featureType}
                  isDisabled={true}
                />
              </Col>

              <Col sm={3} >
                <CHybridSelect
                  id="requestMethod"
                  name="requestmethod"
                  label="Request Method"
                  value={integrationData.requestMethod}
                  isDisabled={true}
                />
              </Col>

              <Col sm={9}>
                <CHybridInput
                  label="Request Url"
                  name="Request Url"
                  value={integrationData.apiUrl}
                  isDisabled={true}
                />
              </Col>
              </Row>

            <Row>
              <div className="underline  px-3 my-3">Headers</div>
                {integrationData.headers.length &&
                  integrationData.headers.map((header, ind) => {
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
                  })}
          
              </Row>
              <Row>
              <div className="underline px-3 my-3">Query Param</div>
              
                {integrationData.queryParams.length &&
                  integrationData.queryParams.map((queryParam, ind) => {
                    return (
                      <div key={'query-param-' + ind} id="query-param" className="header">
                        {Object.keys(queryParam).map((queryParamKey, index) => {
                          return (
                            <>
                             <div className="header-fields" >
                              <CHybridInput
                                key={'header-' + queryParamKey + index}
                                id={'header-' + queryParamKey + index}
                                name={queryParamKey}
                                disabled={true}
                                placeholder={ queryParamKey}
                                value={queryParam[queryParamKey]}
                              />
                              </div>
                            </>
                          )
                        })}
                      </div>
                    )
                  })}
           
              </Row>
              <Row>
              <Col sm={12} className="mt-4">
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
