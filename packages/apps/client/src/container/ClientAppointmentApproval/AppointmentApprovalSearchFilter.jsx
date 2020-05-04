import React, {PureComponent} from 'react'
import {
<<<<<<< HEAD
  Col,
 // Container,
  Row,
  OverlayTrigger,
  Tooltip,
  Button
=======
    Col,
    Container,
    Row,
    OverlayTrigger,
    Tooltip,
    Button
>>>>>>> 690b7a62e43d95876b219e314bced34335f553c8
} from 'react-bootstrap'
import {
    CButton,
    CHybridSelect,
    CForm,
    CHybridInput, CHybridSelectWithImage
} from '@frontend-appointment/ui-elements'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'
import {DateTimeFormatterUtils} from '@frontend-appointment/helpers'

class AppointmentApprovalListSearchFilter extends PureComponent {
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

<<<<<<< HEAD
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
      patientListDropdown,
      //patientDropdownErrorMessage
    } = searchHandler
=======
    render() {
        const {searchHandler} = this.props
        const {
            handleEnter,
            handleSearchFormChange,
            resetSearch,
            doctorsDropdown,
            doctorDropdownErrorMessage,
            activeSpecializationList,
            specializationDropdownErrorMessage,
            searchParameters,
            patientListDropdown,
            patientDropdownErrorMessage
        } = searchHandler
>>>>>>> 690b7a62e43d95876b219e314bced34335f553c8

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
                                    <i className="fa fa-refresh"/>
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
                                            placeholder={doctorsDropdown.length ? "Select doctor." : "No doctor(s) available."}
                                            noOptionsMessage={() => "No Doctor(s) found."}
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
                                            onEnter={handleEnter}
                                        />
                                    </Col>

                                    {/*<Col sm={12} md={6} xl={4}>*/}
                                    {/*    <CHybridSelect*/}
                                    {/*        id="patientCategory"*/}
                                    {/*        label="Appointment Category"*/}
                                    {/*        name="patientCategory"*/}
                                    {/*        options={[*/}
                                    {/*            {value: 'Y', label: 'Self'},*/}
                                    {/*            {value: 'N', label: 'Others'}*/}
                                    {/*        ]}*/}
                                    {/*        value={searchParameters.patientCategory}*/}
                                    {/*        placeholder="Select Patient Category."*/}
                                    {/*        onChange={handleSearchFormChange}*/}
                                    {/*        onEnter={handleEnter}*/}
                                    {/*    />*/}
                                    {/*</Col>*/}

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
                            <div className="search-toggle-btn"/>
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
                                        <i className="fa fa-sliders"/>
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
                            {searchParameters.patientCategory && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={<Tooltip id="name">Patient Type</Tooltip>}
                                    >
                                        <Button
                                            id="search-param-button-filters"
                                            variant="secondary"
                                        >
                                            {searchParameters.patientCategory.label}
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

export default AppointmentApprovalListSearchFilter
