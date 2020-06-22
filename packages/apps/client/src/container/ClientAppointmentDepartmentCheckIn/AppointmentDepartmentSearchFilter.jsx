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

import './appointment-approval.scss'
import {
  appointmentStatusList,
  DateTimeFormatterUtils,
  EnterKeyPressUtils
} from '@frontend-appointment/helpers'

class DepartmentAppointmentSearchFilter extends PureComponent {
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
    this.props.searchHandler.searchAppointment()
    this.toggleSearchForm()
  }

  render () {
    const {
      handleSearchFormChange,
      resetSearch,
      // searchAppointmentStatus,
      //hospitalList,
      // doctorList,
      // doctorDropdownErrorMessage,
      // specializationList,
      // specializationDropdownErrorMessage,
      searchParameters,
      //isFetchActiveHospitalDepartmentLoading,
      //isFetchAllHospitalDepartmentLoading,
      allHospitalDepartmentForDropdown,
      allDepartmentDropdownErrorMessage
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
                  onClickHandler={resetSearch}
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
                  <Col sm={12} md={4} xl={4}>
                    <CHybridSelect
                      id="departmentIdHospital"
                      label="Department"
                      name="hospitalDepartmentId"
                      options={allHospitalDepartmentForDropdown}
                      placeholder={
                        allHospitalDepartmentForDropdown.length
                          ? 'Select Department.'
                          : 'No Department(s) available.'
                      }
                      noOptionsMessage={() => allDepartmentDropdownErrorMessage}
                      onKeyDown={this.handleEnter}
                      onChange={event => handleSearchFormChange(event)}
                      value={searchParameters.hospitalDepartmentId}
                      isDisabled={!allHospitalDepartmentForDropdown.length}
                    />
                  </Col>
                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="patientType"
                      label="Patient Type"
                      name="patientType"
                      value={searchParameters.patientType}
                      options={[
                        {value: 'N', label: 'New'},
                        {value: 'Y', label: 'Registered'}
                      ]}
                      placeholder="Select Patient Type."
                      onChange={handleSearchFormChange}
                      onEnter={this.handleEnter}
                    />
                  </Col>

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

              {searchParameters && searchParameters.patientType && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => (
                      <Tooltip {...props}>Patient Type</Tooltip>
                    )}
                  >
                    <Button id="button-search-filters" variant="secondary">
                      {searchParameters.patientType.label}
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

export default DepartmentAppointmentSearchFilter
