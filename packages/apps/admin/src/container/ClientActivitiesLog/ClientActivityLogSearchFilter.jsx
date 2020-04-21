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

class AppointmentLogListSearchFilter extends PureComponent {
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
    this.props.searchHandler.searchAdminActivityLog(1,'A');
    this.props.searchHandler.searchAdminActivityLog(1,'B');
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
      parentList,
      roles,
      adminMetaInfoByHospitalIdForDropdown
    } = searchHandler

    return (
      <>
        {this.state.isSearchFormExpanded ? (
          <div id="advanced-search" className="advanced-search">
            <div className="search-header d-flex justify-content-between">
              <h5 className="title">Search Admin Activity Log List</h5>
              <div>
                <CButton
                  id="reset-form"
                  variant="outline-secondary"
                  size="sm"
                  name="Reset"
                  onClickHandler={resetSearch}
                >
                  &nbsp; <i className="fa fa-refresh" />
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
                      label="Hospital"
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
                      id="adminMetaInfoId"
                      name="adminMetaInfoId"
                      label="Admin Meta Info"
                      placeholder={
                        searchParameters.hospitalId
                          ? 'Select Admin Meta Info'
                          : 'Select Hospital First'
                      }
                      options={adminMetaInfoByHospitalIdForDropdown}
                      isDisabled={
                        adminMetaInfoByHospitalIdForDropdown.length
                          ? false
                          : true
                      }
                      value={searchParameters.adminMetaInfoId}
                      onChange={handleSearchFormChange}
                      onKeyDown={handleEnter}
                    />
                  </Col>
                  <Col sm={12} md={6} xl={4}>
                    <div className="d-flex">
                      <CEnglishDatePicker
                        id="from-date"
                        name="fromDate"
                        label="From Date"
                        dateFormat="yyyy-MM-dd"
                        // maxDate={0}
                        showDisabledMonthNavigation={true}
                        peekNextMonth={true}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        dropdownMode="select"
                        selected={searchParameters.fromDate}
                        onKeyDown={event => handleEnter(event)}
                        onChange={date =>
                          handleSearchFormChange(date, 'fromDate')
                        }
                      />
                      &nbsp;&nbsp;
                      <CEnglishDatePicker
                        id="to-date"
                        name="toDate"
                        label="To Date"
                        dateFormat="yyyy-MM-dd"
                        // maxDate={0}
                        showDisabledMonthNavigation={true}
                        selected={searchParameters.toDate}
                        peekNextMonth={true}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        dropdownMode="select"
                        onKeyDown={event => handleEnter(event)}
                        onChange={date =>
                          handleSearchFormChange(date, 'toDate')
                        }
                      />
                    </div>
                  </Col>

                  {/* <Col sm={12} md={6} xl={4}>
                    <CHybridInput
                      id="userName"
                      name="userName"
                      placeholder="Username/Mobile/Email"
                      value={searchParameters.userName}
                      onChange={handleSearchFormChange}
                      onKeyDown={handleEnter}
                    />
                  </Col> */}

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="parentId"
                      label="Select Features/Menu"
                      name="parentId"
                      onKeyDown={event => handleEnter(event)}
                      options={parentList}
                      value={searchParameters.parentId}
                      isDisabled={
                        parentList && (parentList.length ? false : true)
                      }
                      onChange={handleSearchFormChange}
                      onEnter={handleEnter}
                      placeholder="Select Features/Menu"
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="roleId"
                      label="Select Action Type"
                      name="roleId"
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => handleSearchFormChange(event)}
                      options={roles}
                      value={searchParameters.roleId}
                      isDisabled={roles.length ? false : true}
                      onEnter={handleEnter}
                      placeholder="Select Action Type."
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
                      />
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
              {searchParameters.userName && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => <Tooltip {...props}>Username</Tooltip>}
                  >
                    <Button id="light-search-filters" variant="secondary">
                      {searchParameters.userName}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}

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
              {searchParameters.fromDate && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">From Date</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.fromDate.toLocaleDateString()}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}
              {searchParameters.toDate && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">To Date</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.toDate.toLocaleDateString()}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}
              {searchParameters.parentId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Features/Menu</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.parentId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}
              {searchParameters.roleId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Action Type</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.roleId.label}
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

export default AppointmentLogListSearchFilter
