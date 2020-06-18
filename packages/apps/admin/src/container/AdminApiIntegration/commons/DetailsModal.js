import React, {memo} from 'react'
import {
    CForm,
    CHybridInput,
    CHybridSelect,
    CFLabel, CRadioButton
} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'
import {AuditableEntityHoc} from '@frontend-appointment/commons'

const DetailsModal = ({
                          integrationData,
                          type,
                          isRequestBodyByFeatureLoading,
                          requestBodyByFeatureErrorMessage
                      }) => {
    const requestMethod = type === 'A' ? integrationData.requestMethod.label : integrationData.requestMethod
    return (
        <>
            <Container-fluid>
                <CForm id="department-info" className="mt-2 api-info">
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={3}>
                                {type !== 'P' ? (
                                    <CHybridSelect
                                        id="appointmentMode"
                                        label="Appointment Mode"
                                        value={integrationData.appointmentModeId}
                                        isDisabled={true}
                                    />
                                ) : (
                                    <CHybridInput
                                        id="appointmentMode"
                                        value={integrationData.appointmentModeId || 'N/A'}
                                        disabled={true}
                                        placeholder={'Appointment Mode'}
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
                                        placeholder={'Integration Type'}
                                    />
                                )}
                            </Col>

                            {type !== 'P' ?
                                <>
                                    {
                                        integrationData.integrationTypeId.value === 1 ?
                                            <Col sm={12} md={3}>
                                                <CHybridInput
                                                    id="client"
                                                    value={integrationData.hospital.label}
                                                    disabled={true}
                                                    placeholder={'Client'}
                                                />
                                            </Col> : ''
                                    }
                                </>
                                :
                                <>
                                    {
                                        integrationData.hospital ?
                                            <Col sm={12} md={3}>
                                                <CHybridInput
                                                    id="client"
                                                    value={integrationData.hospital.label}
                                                    disabled={true}
                                                    placeholder={'Client'}
                                                />
                                            </Col>
                                            : ""
                                    }
                                </>
                            }

                            <Col sm={3}>
                                {type !== 'P' ? (
                                    <CHybridSelect
                                        id="integrationChannelId"
                                        name="integrationChannelIdPreview"
                                        label="Integration Channel "
                                        value={integrationData.integrationChannelId}
                                        isDisabled={true}
                                    />
                                ) : (
                                    <CHybridInput
                                        id="integrationChannelId"
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

                            <CFLabel labelName="Status" id="status"/>
                            <div>
                                <CRadioButton
                                    id="radio1"
                                    label="Active"
                                    type="radio"
                                    name="status"
                                    value="Y"
                                    checked={integrationData.status === 'Y'}
                                    readOnly={true}
                                    disabled={true}
                                />
                                <CRadioButton
                                    checked={integrationData.status === 'N'}
                                    id="radio2"
                                    label="Inactive"
                                    type="radio"
                                    name="status"
                                    value="N"
                                    readOnly={true}
                                    disabled={true}
                                />
                            </div>

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
                            {integrationData.headers.length ? (
                                <div className="underline  px-3 mb-3 mt-1">Headers</div>
                            ) : null}
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
                                                                name={headerKey.replace("Param", "")}
                                                                placeholder={headerKey.replace("Param", "")}
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
                            {integrationData.queryParams.length ? (
                                <div className="underline px-3 my-3">Query Param</div>
                            ) : null}

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
                                                                name={queryParamKey.replace("Param", "")}
                                                                disabled={true}
                                                                placeholder={queryParamKey.replace("Param", "")}
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
                            {requestMethod !== 'GET' ? (
                                <Col sm={12} className="mt-4">
                                    <CFLabel id="preId" labelName="Request Body"/>
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
