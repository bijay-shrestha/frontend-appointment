import React, {PureComponent} from 'react'
import {
  Col,
  // Container,
  Row,
  OverlayTrigger,
  Tooltip,
  Button
} from 'react-bootstrap'
import {
  CButton,
  CHybridSelect,
  CForm,
  CHybridInput,
  CHybridSelectWithImage
} from '@frontend-appointment/ui-elements'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'

class AppointmentTransferListSearchFilter extends PureComponent {
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
      doctorsDropdown,
      //doctorDropdownErrorMessage,
      activeSpecializationList,
      //specializationDropdownErrorMessage,
      searchParameters,
      patientListDropdown
      //patientDropdownErrorMessage
    } = searchHandler

    return (
      <>
        {this.state.isSearchFormExpanded ? (
          <div id="advanced-search" className="advanced-search">
            <div className="search-header d-flex justify-content-between">
              <h5 className="title">Search Appointment Check-In List</h5>
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
                    <div className="d-flex">
                      <CEnglishDatePicker
                        id="from-date"
                        name="appointmentFromDate"
                        label="From Date"
                        dateFormat="yyyy-MM-dd"
                        // maxDate={0}
                        showDisabledMonthNavigation={true}
                        peekNextMonth={true}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        dropdownMode="select"
                        selected={searchParameters.appointmentFromDate}
                        onKeyDown={event => handleEnter(event)}
                        onChange={date =>
                          handleSearchFormChange(date, 'appointmentFromDate')
                        }
                      />
                      &nbsp;&nbsp;
                      <CEnglishDatePicker
                        id="to-date"
                        name="appointmentToDate"
                        label="To Date"
                        minDate={DateTimeFormatterUtils.getNoOfDaysBetweenGivenDatesExclusive(
                          searchParameters.appointmentFromDate,
                          new Date()
                        )}
                        showDisabledMonthNavigation={true}
                        selected={
                          DateTimeFormatterUtils.isFirstDateGreaterThanSecondOrEqual(
                            searchParameters.appointmentFromDate,
                            searchParameters.appointmentToDate
                          )
                            ? DateTimeFormatterUtils.addDate(
                                searchParameters.appointmentToDate,
                                7
                              )
                            : searchParameters.appointmentToDate
                        }
                        peekNextMonth={false}
                        showMonthDropdown={true}
                        showYearDropdown={true}
                        dropdownMode="select"
                        onKeyDown={event => this.handleEnter(event)}
                        onChange={date =>
                          handleSearchFormChange(date, 'appointmentToDate')
                        }
                      />
                    </div>
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelect
                      id="specializationId"
                      label="Specialization"
                      name="specializationId"
                      placeholder={
                        activeSpecializationList.length
                          ? 'Select specialization'
                          : 'No specialization(s) available.'
                      }
                      onKeyDown={event => handleEnter(event)}
                      options={activeSpecializationList}
                      value={searchParameters.specializationId}
                      isDisabled={
                        activeSpecializationList.length ? false : true
                      }
                      onChange={handleSearchFormChange}
                      onEnter={handleEnter}
                    />
                  </Col>

                  <Col sm={12} md={6} xl={4}>
                    <CHybridSelectWithImage
                      id="doctorId"
                      label="Doctor"
                      name="doctorId"
                      placeholder={
                        doctorsDropdown.length
                          ? 'Select doctor.'
                          : 'No doctor(s) available.'
                      }
                      noOptionsMessage={() => 'No Doctor(s) found.'}
                      onKeyDown={event => handleEnter(event)}
                      onChange={event => handleSearchFormChange(event)}
                      options={doctorsDropdown}
                      value={searchParameters.doctorId}
                      isDisabled={!doctorsDropdown.length}
                      onEnter={handleEnter}
                    />
                  </Col>

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
              <div className="search-toggle-btn" />
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
                    <i className="fa fa-sliders" />
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
              {searchParameters.appointmentFromDate && (
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
                        searchParameters.appointmentFromDate
                      )}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}
              {searchParameters.appointmentToDate && (
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
                        searchParameters.appointmentToDate
                      )}
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
              {searchParameters.doctorId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Doctor Name</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.doctorId.label}
                    </Button>
                  </OverlayTrigger>
                </li>
              )}
              {searchParameters.specializationId && (
                <li>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip id="name">Specialization Name</Tooltip>}
                  >
                    <Button
                      id="search-param-button-filters"
                      variant="secondary"
                    >
                      {searchParameters.specializationId.label}
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

export default AppointmentTransferListSearchFilter
