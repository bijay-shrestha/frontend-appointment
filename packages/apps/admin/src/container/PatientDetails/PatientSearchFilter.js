import React, {PureComponent} from 'react'
import {
  Col,
  Container,
  Row,
  OverlayTrigger,
  Tooltip,
  Button
} from 'react-bootstrap'
import {
  CButton,
  CHybridSelect,
  CForm,
  CHybridInput
} from '@frontend-appointment/ui-elements'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'

class PatientSearchFilter extends PureComponent {
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
    this.props.searchHandler.searchPatient(1);
    this.toggleSearchForm()
  }

  render () {
    const {searchHandler} = this.props
    const {
      handleEnter,
      handleSearchFormChange,
      resetSearch,
      hospitalsDropdown,
      searchParameters,
      patientListDropdown
    } = searchHandler

    return (
      <>
        {this.state.isSearchFormExpanded ? (
          <div id="advanced-search" className="advanced-search">
            <div className="search-header d-flex justify-content-between">
              <h5 className="title">Search Patient Information List</h5>
              <div>
                <CButton
                  id="reset-form"
                  variant="outline-secondary"
                  size="sm"
                  name="Reset"
                  onClickHandler={resetSearch}
                >&nbsp;<i className="fa fa-refresh" />
                </CButton>
              </div>
            </div>
            <CForm id="" className=" mt-4">
              <Container-fluid>
                <Row>
                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="hospitalId"
                      name="hospitalId"
                      label="Select Hospital"
                      placeholder="Select Hospital"
                      options={hospitalsDropdown}
                      isDisabled={hospitalsDropdown.length ? false : true}
                      value={searchParameters.hospitalId}
                      onChange={handleSearchFormChange}
                      onKeyDown={handleEnter}
                    />
                  </Col>
                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="admin-meta-info"
                      name="patientMetaInfoId"
                      label="Patients Detail"
                      placeholder="Name, Mobile no Or Reg. no"
                      options={patientListDropdown}
                      value={searchParameters.patientMetaInfoId}
                      isDisabled={patientListDropdown.length ? false : true}
                      onChange={handleSearchFormChange}
                      onEnter={handleEnter}
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridInput
                      id="esewaId"
                      placeholder="Esewa Id"
                      name="esewaId"
                      value={searchParameters.esewaId}
                      onChange={handleSearchFormChange}
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="status"
                      label="Select Status"
                      name="status"
                      value={searchParameters.status}
                      options={[
                        {value: 'N', label: 'Inactive'},
                        {value: '', label: 'All'},
                        {value: 'Y', label: 'Active'}
                      ]}
                      onChange={handleSearchFormChange}
                      onEnter={handleEnter}
                    />
                  </Col>
                  <Col
                    sm={12}
                    md={{span: 8, offset: 4}}
                    xl={{span: 6, offset: 6}}
                  >
                    <div className="pull-right">
                      <CButton
                        id="toggle-search-profiles"
                        variant="light"
                        size="sm"
                        className=" btn-action mr-2"
                        name="Close"
                        onClickHandler={this.toggleSearchForm}
                      />
                      <CButton
                        id="search-profiles"
                        variant="primary"
                        className="btn-action"
                        name="Search"
                        onClickHandler={this.handleSearchButtonClick}
                      ></CButton>
                    </div>
                  </Col>
                </Row>
              </Container-fluid>
              <div className="search-toggle-btn"></div>
            </CForm>
          </div>
        ) : (
          <div
            className="search-filter-wrapper"
            onClick={this.toggleSearchForm}
          >
            <ul id="" className="search-filter-item">
              <li>
                <CButton id="spec-filter" variant="primary" name="">
                  <>
                    <i className="fa fa-filter"></i>
                    &nbsp; Filter
                  </>
                </CButton>
              </li>
              {searchParameters.hospitalId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Hospital Name</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.hospitalId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}
              {searchParameters.patienMetaInfoId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Patient Meta Info</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.patientMetaInfoId.label}
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
                      {searchParameters.status.label}
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
export default PatientSearchFilter
