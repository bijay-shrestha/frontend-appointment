import React, {PureComponent} from 'react'
import {
    CButton,
    CForm,
    CHybridInput,
    CHybridSelect
} from '@frontend-appointment/ui-elements'
import {Button, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'

class ClientApiIntegrationSearchFilter extends PureComponent {
    state = {
        isSearchFormExpanded: false
    }

    toggleSearchForm = async () => {
        const searchFilter = document.getElementById('advanced-search')
        if (searchFilter) searchFilter.classList.toggle('collapsed')
        await this.setState({
            isSearchFormExpanded: !this.state.isSearchFormExpanded
        })
    }

    handleSearchButtonClick = () => {
        this.props.searchApiIntegration()
        this.toggleSearchForm()
    }

    render() {
        const {
            featureTypeDropdownData,
            requestMethodData,
            hospitalsForDropdown,
            onSearchChangeHandler,
            onSearchResetHandler,
            searchParams,
            //integrationChannelData,
            integrationTypeData
        } = this.props
        return (
            <>
                {this.state.isSearchFormExpanded ? (
                    <div id="advanced-search" className="advanced-search">
                        <div className="search-header d-flex justify-content-between">
                            <h5 className="title">Search Client API Integration</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant="outline-secondary"
                                    size="sm"
                                    name=""
                                    onClickHandler={onSearchResetHandler}
                                >
                                    {' '}
                                    <i className="fa fa-refresh"/>
                                    &nbsp;Reset
                                </CButton>
                            </div>
                        </div>
                        <CForm
                            id="client-api-integraiton-info"
                            className="profile-info mt-4"
                        >
                            <Container-fluid>
                                <Row>
                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="client"
                                            label="Client"
                                            name="hospitalId"
                                            onChange={event => onSearchChangeHandler(event)}
                                            options={hospitalsForDropdown}
                                            value={searchParams.hospitalId}
                                            disabled={!hospitalsForDropdown.length}
                                            placeholder={'Select Client.'}
                                        />
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="apiIntegrationTypeId"
                                            label="Client API Integration Type"
                                            name="apiIntegrationTypeId"
                                            onChange={event => onSearchChangeHandler(event)}
                                            options={integrationTypeData}
                                            value={searchParams.apiIntegrationTypeId}
                                            disabled={!integrationTypeData.length}
                                            placeholder={'Select Client API Integration Type.'}
                                        />
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="featureTypeSearch"
                                            label="Feature Type"
                                            name="featureTypeId"
                                            onChange={event => onSearchChangeHandler(event)}
                                            options={featureTypeDropdownData}
                                            value={searchParams.featureTypeId}
                                            isDisabled={
                                                !searchParams.apiIntegrationTypeId ||
                                                !featureTypeDropdownData.length
                                            }
                                            placeholder={
                                                !searchParams.apiIntegrationTypeId
                                                    ? 'Select Client API Integration Type First.'
                                                    : featureTypeDropdownData.length
                                                    ? 'Select Feature Type'
                                                    : 'No Feature Types(s) Found'
                                            }
                                        />
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="requestMethodSearch"
                                            label="Request Method"
                                            name="requestMethodId"
                                            onChange={event => onSearchChangeHandler(event)}
                                            options={requestMethodData}
                                            value={searchParams.requestMethodId}
                                            disabled={!requestMethodData.length}
                                            placeholder={'Select Request Method.'}
                                        />
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridInput
                                            id="searchApiUrl"
                                            name="apiUrl"
                                            onChange={event => onSearchChangeHandler(event)}
                                            placeholder="Enter API Url"
                                            value={searchParams.apiUrl}
                                        />
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="status"
                                            name="status"
                                            onChange={event => onSearchChangeHandler(event)}
                                            value={searchParams.status}
                                            options={[
                                                {value: 'A', label: 'All'},
                                                {value: 'Y', label: 'Active'},
                                                {value: 'N', label: 'Inactive'}
                                            ]}
                                            label="Status"
                                        />
                                    </Col>

                                    <Col
                                        sm={12}
                                        md={{span: 6, offset: 6}}
                                        xl={{span: 6, offset: 6}}
                                    >
                                        <div className="pull-right">
                                            <CButton
                                                id="search-profiles"
                                                variant="light"
                                                size="sm"
                                                className=" btn-action mr-2"
                                                // children={<i className='fa fa-chevron-up fa-lg'/>}
                                                name="Close"
                                                onClickHandler={this.toggleSearchForm}
                                            />
                                            <CButton
                                                id="search-profiles"
                                                variant="primary"
                                                className="btn-action"
                                                name="Search"
                                                onClickHandler={this.handleSearchButtonClick}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </Container-fluid>
                            <div className="search-toggle-btn"></div>
                        </CForm>
                    </div>
                ) : (
                    // TODO: TO BE MADE DYNAMIC

                    <div
                        className="search-filter-wrapper"
                        onClick={this.toggleSearchForm}
                    >
                        <ul id="" className="search-filter-item">
                            <li>
                                <CButton id="spec-filter" variant="primary" name="">
                                    <>
                                        <i className="fa fa-sliders"></i>
                                        &nbsp; Filter
                                    </>
                                </CButton>
                            </li>
                            {searchParams.hospitalId.value && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => <Tooltip {...props}>Client</Tooltip>}
                                    >
                                        <Button id="light-search-filters" variant="secondary">
                                            {searchParams.hospitalId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}

                            {searchParams.apiIntegrationTypeId.value && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>Client API Integration Type</Tooltip>
                                        )}
                                    >
                                        <Button id="light-search-filters" variant="secondary">
                                            {searchParams.apiIntegrationTypeId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}

                            {searchParams.featureTypeId.value && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>Feature Type</Tooltip>
                                        )}
                                    >
                                        <Button id="light-search-filters" variant="secondary">
                                            {searchParams.featureTypeId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}

                            {searchParams.requestMethodId.value && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>Request Method </Tooltip>
                                        )}
                                    >
                                        <Button id="light-search-filters" variant="secondary">
                                            {searchParams.requestMethodId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParams.apiUrl && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => <Tooltip {...props}>API Url</Tooltip>}
                                    >
                                        <Button id="button-search-filters" variant="secondary">
                                            {searchParams.apiUrl}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}

                            {searchParams.status && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">Status</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParams.status.value === 'Y'
                                                ? 'Active'
                                                : searchParams.status.value === 'N'
                                                    ? 'Inactive'
                                                    : 'All'}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </>
        )
    }
}

export default ClientApiIntegrationSearchFilter
