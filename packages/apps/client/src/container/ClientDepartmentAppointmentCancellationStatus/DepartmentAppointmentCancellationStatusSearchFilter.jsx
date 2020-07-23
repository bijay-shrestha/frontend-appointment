import React, {PureComponent} from 'react'
import {Button, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import {
  CButton,
  CForm,
  CHybridInput,
  CHybridSelect
} from '@frontend-appointment/ui-elements'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'

class DepartmentAppointmentCancellationStatusSearchFilter extends PureComponent {
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
    this.props.searchHandler.searchAppointment(1)
    this.toggleSearchForm()
  }

  render () {
    const {searchHandler} = this.props
    const {
      handleEnter,
      handleSearchFormChange,
      resetSearch,
      // doctorDropdownErrorMessage,

      //specializationDropdownErrorMessage,
      activeAppointmentModeForDropdown,
      searchParameters,
      patientListDropdown,
      activeHospitalDepartmentForDropdown,
      activeRoomNumberForDropdownByDepartment
      //patientDropdownErrorMessage
    } = searchHandler

    return (
      <>
        {this.state.isSearchFormExpanded ? (
          <div id="advanced-search" className="advanced-search">
            <div className="search-header d-flex justify-content-between">
              <h5 className="title">Search Appointment Cancellation</h5>
              <div>
                <CButton
                  id="reset-form"
                  variant="outline-secondary"
                  size="sm"
                  name=""
                  onClickHandler={resetSearch}
                >
                  <i className="fa fa-refresh" />
                  &nbsp;Reset
                </CButton>
              </div>
            </div>
            <CForm id="" className=" mt-4">
              <Container-fluid>
                <Row>
                  <Col sm={12} md={6} xl={4}>
                    <CHybridInput
                      id="appointmentNumber"
                      name="appointmentNumber"
                      placeholder="Appointment Number"
                      value={searchParameters.appointmentNumber}
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

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="hospitalDepartmentId"
                      label="Hospital Department"
                      name="hospitalDepartmentId"
                      placeholder={
                        activeHospitalDepartmentForDropdown.length
                          ? 'Select Hospital Department.'
                          : 'No Hospital Department(s) available.'
                      }
                      onKeyDown={event => handleEnter(event)}
                      options={activeHospitalDepartmentForDropdown}
                      value={searchParameters.hospitalDepartmentId}
                      isDisabled={
                        activeHospitalDepartmentForDropdown.length
                          ? false
                          : true
                      }
                      onChange={handleSearchFormChange}
                      onEnter={handleEnter}
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="roomId"
                      label="Room"
                      name="roomId"
                      placeholder={
                        !searchParameters.hospitalDepartmentId
                          ? 'Select Department First..'
                          : activeRoomNumberForDropdownByDepartment.length
                          ? 'Select Room Number.'
                          : 'No Room(s) available.'
                      }
                      noOptionsMessage={() => 'No Room(s) found.'}
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => handleSearchFormChange(event)}
                      options={activeRoomNumberForDropdownByDepartment}
                      value={searchParameters.roomId}
                      isDisabled={
                        !searchParameters.hospitalDepartmentId ||
                        !activeRoomNumberForDropdownByDepartment.length
                      }
                      onEnter={handleEnter}
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="appointment-mode"
                      name="appointmentModeId"
                      label="Appointment mode"
                      placeholder={
                        activeAppointmentModeForDropdown.length
                          ? 'Select Appointment Mode'
                          : 'No Appointment Mode(s) available.'
                      }
                      options={activeAppointmentModeForDropdown}
                      value={searchParameters.appointmentModeId}
                      isDisabled={
                        activeAppointmentModeForDropdown.length ? false : true
                      }
                      onChange={handleSearchFormChange}
                      onEnter={handleEnter}
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridInput
                      id="esewaId"
                      name="esewaId"
                      placeholder="Esewa Id"
                      value={searchParameters.esewaId}
                      onChange={handleSearchFormChange}
                      onKeyDown={handleEnter}
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="admin-meta-info"
                      name="patientMetaInfoId"
                      label="Patients Detail"
                      placeholder={
                        searchParameters.hospitalId
                          ? patientListDropdown.length
                            ? 'Name, Mobile no Or Reg. no'
                            : 'No patient(s) available.'
                          : 'Select client first.'
                      }
                      options={patientListDropdown}
                      value={searchParameters.patientMetaInfoId}
                      isDisabled={patientListDropdown.length ? false : true}
                      onChange={handleSearchFormChange}
                      onEnter={handleEnter}
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="patientType"
                      label="Select Patient Type"
                      name="patientType"
                      value={searchParameters.patientType}
                      options={[
                        {value: 'N', label: 'New'},
                        {value: 'Y', label: 'Registered'}
                      ]}
                      placeholder="Select Patient Type."
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
                    <i className="fa fa-sliders"></i>
                    &nbsp; Filter
                  </>
                </CButton>
              </li>
              {searchParameters.appointmentNumber && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    delay={{show: 250, hide: 400}}
                    overlay={props => (
                      <Tooltip {...props}>Appointment Number</Tooltip>
                    )}
                  >
                    <Button id="light-search-filters" variant="secondary">
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

              {searchParameters.hospitalDepartmentId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="name">Hospital Department Name</Tooltip>
                    }
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.hospitalDepartmentId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}

              {searchParameters.roomId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Room Number</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.roomId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}

              {searchParameters.appointmentModeId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Appointment Mode </Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.appointmentModeId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}
              {searchParameters.esewaId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Esewa Id </Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.esewaId}
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

              {searchParameters.patientType && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Patient Type</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.patientType.label}
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

export default DepartmentAppointmentCancellationStatusSearchFilter
