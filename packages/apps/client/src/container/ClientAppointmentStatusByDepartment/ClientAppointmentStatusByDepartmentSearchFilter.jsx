import React, {PureComponent} from 'react'
import {Button, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import {
  CButton,
  CForm,
  CHybridSelect,
  CHybridInput
  //CHybridSelectWithImage
} from '@frontend-appointment/ui-elements'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'

import './appointment-status.scss'
import {
  appointmentStatusList,
  DateTimeFormatterUtils,
  EnterKeyPressUtils
} from '@frontend-appointment/helpers'

class ClientSearchAppointmentStatus extends PureComponent {
  state = {
    isSearchFormExpanded: false
  }

  handleEnter = event => {
    EnterKeyPressUtils.handleEnter(event)
  }

  toggleSearchForm = async () => {
    const searchFilter = document.getElementById('advanced-search')
    if (searchFilter) searchFilter.classList.toggle('collapsed')
    await this.setState({
      isSearchFormExpanded: !this.state.isSearchFormExpanded
    })
  }

  handleSearchButtonClick = () => {
    this.props.searchHandler.searchAppointmentStatus()
    this.toggleSearchForm()
  }

  render () {
    const {
      handleSearchFormChange,
      resetSearchForm,
      // searchAppointmentStatus,
      //hospitalList,
      // doctorList,
      // doctorDropdownErrorMessage,
      // specializationList,
      // specializationDropdownErrorMessage,
      searchParameters,
      //isFetchActiveHospitalDepartmentLoading,
      activeHospitalDepartmentForDropdown,
      activeDepartmentDropdownErrorMessage
      // isFetchActiveRoomNumberByDepartmentLoading,
      //activeRoomNumberForDropdownByDepartment,
      //activeRoomsByDepartmentDropdownErrorMessage
    } = this.props.searchHandler
    return (
      <>
        {this.state.isSearchFormExpanded ? (
          <div id="advanced-search" className="advanced-search">
            <div className="search-header d-flex justify-content-between">
              <h5 className="title">Search Appointment Status</h5>
              <div>
                <CButton
                  id="reset-form"
                  variant="outline-secondary"
                  size="sm"
                  name=""
                  onClickHandler={resetSearchForm}
                >
                  <>
                    {' '}
                    <i className="fa fa-refresh" />
                    &nbsp;Reset
                  </>
                </CButton>
              </div>
            </div>
            <CForm id="" className=" mt-4">
              <Container-fluid>
                <Row>
                  <Col sm={12} md={4} xl={4}>
                    <CHybridInput
                      id="appointmentNumber"
                      name="appointmentNumber"
                      placeholder="Enter the appointment number"
                      onKeyDown={this.handleEnter}
                      onChange={event => handleSearchFormChange(event)}
                      value={searchParameters.appointmentNumber}
                    />
                  </Col>
                  <Col sm={12} md={4} xl={4}>
                    <div className="d-flex">
                      <CEnglishDatePicker
                        id="from-date"
                        name="fromDate"
                        label="From Date"
                        dateFormat="yyyy-MM-dd"
                        // minDate={0}
                        showDisabledMonthNavigation={true}
                        selected={searchParameters.fromDate}
                        peekNextMonth={true}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        dropdownMode="select"
                        onKeyDown={event => this.handleEnter(event)}
                        onChange={date =>
                          handleSearchFormChange(date, 'fromDate')
                        }
                      />{' '}
                      &nbsp;&nbsp;
                      <CEnglishDatePicker
                        id="to-date"
                        name="toDate"
                        label="To Date"
                        minDate={DateTimeFormatterUtils.getNoOfDaysBetweenGivenDatesExclusive(
                          searchParameters.fromDate,
                          new Date()
                        )}
                        showDisabledMonthNavigation={true}
                        selected={
                          DateTimeFormatterUtils.isFirstDateGreaterThanSecondOrEqual(
                            searchParameters.fromDate,
                            searchParameters.toDate
                          )
                            ? DateTimeFormatterUtils.addDate(
                                searchParameters.toDate,
                                7
                              )
                            : searchParameters.toDate
                        }
                        peekNextMonth={false}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        dropdownMode="select"
                        onKeyDown={event => this.handleEnter(event)}
                        onChange={date =>
                          handleSearchFormChange(date, 'toDate')
                        }
                      />
                    </div>
                  </Col>

                  {/* <Col sm={12} md={4} xl={4}>
                    <CHybridSelect
                      id="hospital"
                      label="Client"
                      name="hospitalId"
                      options={hospitalList}
                      placeholder={
                        hospitalList.length
                          ? 'Select client.'
                          : 'No Client(s) available.'
                      }
                      isDisabled={!hospitalList.length}
                      onKeyDown={this.handleEnter}
                      onChange={event => handleSearchFormChange(event)}
                      value={searchParameters.hospitalId}
                    />
                  </Col> */}

                  <Col sm={12} md={4} xl={4}>
                    <CHybridSelect
                      id="departmentIdHospital"
                      label="Department"
                      name="hospitalDepartmentId"
                      options={activeHospitalDepartmentForDropdown}
                      placeholder={
                        activeHospitalDepartmentForDropdown.length
                          ? 'Select Department.'
                          : 'No Department(s) available.'
                      }
                      noOptionsMessage={() =>
                        activeDepartmentDropdownErrorMessage
                      }
                      onKeyDown={this.handleEnter}
                      onChange={event => handleSearchFormChange(event)}
                      value={searchParameters.hospitalDepartmentId}
                      isDisabled={!activeHospitalDepartmentForDropdown.length}
                    />
                  </Col>

                  {/* <Col sm={12} md={4} xl={4}>
                    <CHybridSelect
                      id="departmentIdHospital"
                      label="Department"
                      name="hospitalDepartmentId"
                      options={activeRoomNumberForDropdownByDepartment}
                      placeholder={
                        !searchParameters.hospitalDepartmentId
                          ? 'Select client first.'
                          : activeRoomNumberForDropdownByDepartment.length
                          ? 'Select Department.'
                          : 'No Department(s) available.'
                      }
                      noOptionsMessage={() =>
                        activeDepartmentDropdownErrorMessage
                      }
                      onKeyDown={this.handleEnter}
                      onChange={event => handleSearchFormChange(event)}
                      value={searchParameters.hospitalDepartmentRoomInfoId}
                      isDisabled={
                        !searchParameters.hospitalDepartmentId ||
                        !activeRoomNumberForDropdownByDepartment.length
                      }
                    />
                  </Col> */}

                  <Col sm={12} md={4} xl={4}>
                    <CHybridSelect
                      id="status"
                      name="status"
                      onKeyDown={this.handleEnter}
                      onChange={event => handleSearchFormChange(event)}
                      value={searchParameters.status}
                      options={appointmentStatusList}
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
                <CButton id="filter" variant="primary" name="">
                  <>
                    <i className="fa fa-sliders" />
                    &nbsp; Filter
                  </>
                </CButton>
              </li>
              
              {searchParameters.appointmentNumber && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Appointment Number</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                     {searchParameters.appointmentNumber}
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
                      {DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
                        searchParameters.fromDate
                      )}
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
                      {DateTimeFormatterUtils.convertDateToStringMonthDateYearFormat(
                        searchParameters.toDate
                      )}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}
              {/* {searchParameters && searchParameters.hospitalId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => <Tooltip {...props}>Client</Tooltip>}
                  >
                    <Button id="button-search-filters" variant="secondary">
                      {searchParameters.hospitalId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )} */}

              {/* {searchParameters && searchParameters.doctorId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => <Tooltip {...props}>Doctor</Tooltip>}
                  >
                    <Button id="button-search-filters" variant="secondary">
                      {searchParameters.doctorId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )} */}

              {searchParameters && searchParameters.hospitalDepartmentId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => <Tooltip {...props}>Department</Tooltip>}
                  >
                    <Button id="button-search-filters" variant="secondary">
                      {searchParameters.hospitalDepartmentId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}

              {searchParameters && searchParameters.status && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => <Tooltip {...props}>Status</Tooltip>}
                  >
                    <Button id="button-search-filters" variant="secondary">
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

export default ClientSearchAppointmentStatus
