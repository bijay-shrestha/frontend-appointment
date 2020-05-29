import React, {PureComponent} from 'react'
import {
  CButton,
  CForm,
  CHybridSelect
} from '@frontend-appointment/ui-elements'
import {Button, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'

class RequestBodySearchFilter extends PureComponent {
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
    this.props.searchRequestBody()
    this.toggleSearchForm()
  }

  render () {
    const {
      searchParameters,
      handleSearchFormChange,
      handleSearchFormReset,
      featureTypeDropdownData,
      requestBodyDropdownData,
      onEnterKeyPress
    } = this.props
    return (
      <>
        {this.state.isSearchFormExpanded ? (
          // TODO: TO BE MADE DYNAMIC
          <div id="advanced-search" className="advanced-search">
            <div className="search-header d-flex justify-content-between">
              <h5 className="title">Search Request Body</h5>
              <div>
                <CButton
                  id="reset-form"
                  variant="outline-secondary"
                  size="sm"
                  name=""
                  onClickHandler={handleSearchFormReset}
                >
                  {' '}
                  <i className="fa fa-refresh" />
                  &nbsp;Reset
                </CButton>
              </div>
            </div>
            <CForm id="specialization-info" className="profile-info mt-4">
              <Container-fluid>
                <Row>
                  <Col sm={12} md={4} xl={4}>
                    <CHybridSelect
                      id="Feature Type"
                      label="Feature Type"
                      name="featureType"
                      onKeyDown={onEnterKeyPress}
                      onChange={(event, validity) =>
                        handleSearchFormChange(event, validity)
                      }
                      options={featureTypeDropdownData}
                      value={searchParameters.featureTypeId}
                      isDisabled={!featureTypeDropdownData.length}
                      placeholder={
                        featureTypeDropdownData.length
                          ? 'Select Feature Type'
                          : 'No Feature Type(s) Found'
                      }
                    />
                  </Col>
                  <Col sm={12} md={4} xl={4}>
                    <CHybridSelect
                      id="requestBody"
                      label="Request Body"
                      name="Request Body"
                      onKeyDown={onEnterKeyPress}
                      onChange={(event, validity) =>
                        handleSearchFormChange(event, validity)
                      }
                      options={requestBodyDropdownData}
                      value={searchParameters.featureTypeId}
                      isDisabled={!requestBodyDropdownData.length}
                      placeholder={
                        requestBodyDropdownData.length
                          ? 'Select Request Body'
                          : 'No Request Body(ies) Found'
                      }
                    />
                  </Col>
                  <Col sm={12} md={4} xl={4}>
                    <CHybridSelect
                      id="status"
                      label="status"
                      name="status"
                      onKeyDown={onEnterKeyPress}
                      onChange={(event, validity) =>
                        handleSearchFormChange(event, validity)
                      }
                      options={[
                        {value: '', label: 'ALL'},
                        {value: 'Y', label: 'Active'},
                        {value: 'N', label: 'Inactive'}
                      ]}
                      value={searchParameters.status}
                      isDisabled={!featureTypeDropdownData.length}
                      placeholder={'Select Status'}
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
              {searchParameters.featureType && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => (
                      <Tooltip {...props}>Feature Type</Tooltip>
                    )}
                  >
                    <Button id="light-search-filters" variant="secondary">
                      {searchParameters.featureType.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}

              {searchParameters.requestBody && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => (
                      <Tooltip {...props}>Request Body</Tooltip>
                    )}
                  >
                    <Button id="light-search-filters" variant="secondary">
                      {searchParameters.requestBody.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}

              {searchParameters.status && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Status</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.status.value === 'Y'
                        ? 'Active'
                        : searchParameters.status.value === 'N'
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

export default RequestBodySearchFilter
