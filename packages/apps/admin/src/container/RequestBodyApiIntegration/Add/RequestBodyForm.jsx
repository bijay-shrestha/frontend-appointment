import React, {memo} from 'react'
import {Col, Row} from 'react-bootstrap'
import {
  CForm,
  CHybridSelect
} from '@frontend-appointment/ui-elements'

const RequestBodyForm = ({
  requestBodyData,
  onEnterKeyPress,
  handleOnChange,
  featureTypeDropdownData,
  requestBodyDropdownData
}) => {
  return (
    <>
      <Container-fluid>
        <Row sm="12 p-0">
          <h5 className="title">Request Body Information</h5>
        </Row>
        <CForm id="profile-info spec" className="mt-2 profile-info">
          <Container-fluid>
            <Row>
              <Col sm={12} md={6} lg={4}>
                <CHybridSelect
                  id="featureTypeId"
                  label="Feature Type"
                  name="featureTypeId"
                  onKeyDown={onEnterKeyPress}
                  onChange={(event, validity) => handleOnChange(event)}
                  isDisabled={!featureTypeDropdownData.length}
                  options={featureTypeDropdownData}
                  value={requestBodyData.featureTypeId}
                  placeholder={
                    featureTypeDropdownData.length
                      ? 'Select Feature.'
                      : 'No Feature Type(s) Found'
                  }
                />
              </Col>

              <Col sm={12} md={6} lg={4}>
                <CHybridSelect
                  id="requestBodysId"
                  label="Request Body"
                  name="requestBodys"
                  onKeyDown={onEnterKeyPress}
                  onChange={(event, validity) => handleOnChange(event)}
                  options={requestBodyDropdownData}
                  isDisabled={!requestBodyDropdownData.length}
                  value={requestBodyData.requestBodys}
                  isMulti={true}
                  placeholder={
                    requestBodyDropdownData.length
                      ? 'Select Request Body'
                      : 'No Request Body(ies) Found'
                  }
                />
              </Col>
            </Row>
          </Container-fluid>
        </CForm>
      </Container-fluid>
    </>
  )
}

export default memo(RequestBodyForm)
