import React, {PureComponent} from 'react'
import {Col, Container, Row, OverlayTrigger, Tooltip, Button} from 'react-bootstrap'
import {CButton, CHybridSelect, CForm, CHybridInput} from '@frontend-appointment/ui-elements'
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
        this.props.searchHandler.searchAppointment(1)
        this.toggleSearchForm()
    }

    render() {
        const {searchHandler} = this.props
        const {
            handleEnter,
            handleSearchFormChange,
            resetSearch,
            hospitalsDropdown,
            doctorsDropdown,
            doctorDropdownErrorMessage,
            activeSpecializationList,
            specializationDropdownErrorMessage,
            searchParameters,
            patientListDropdown,
            patientDropdownErrorMessage
        } = searchHandler

        return (
            <>
                {this.state.isSearchFormExpanded ? (
                    <div id="advanced-search" className="advanced-search">
                        <div className="search-header d-flex justify-content-between">
                            <h5 className="title">Search Appointment Log List</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant="outline-secondary"
                                    size="sm"
                                    name="Reset"
                                    onClickHandler={resetSearch}
                                >
                                    <i className="fa fa-refresh"/>
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
                                            placeholder="Select Appointment Number"
                                            value={searchParameters.appointmentNumber}
                                            onChange={handleSearchFormChange}
                                            onKeyDown={handleEnter}
                                        />
                                    </Col>
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
                                        <div className="d-flex">
                                            <CEnglishDatePicker
                                                id="from-date"
                                                name="fromDate"
                                                label="From Date"
                                                dateFormat="yyyy-MM-dd"
                                                maxDate={0}
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
                                                maxDate={0}
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
                                            id="doctorId"
                                            label="Select a Doctor"
                                            name="doctorId"
                                            onKeyDown={event => handleEnter(event)}
                                            onChange={event => handleSearchFormChange(event)}
                                            options={doctorsDropdown}
                                            value={searchParameters.doctorId}
                                            isDisabled={doctorsDropdown.length ? false : true}
                                            onChange={handleSearchFormChange}
                                            onEnter={handleEnter}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="specializationId"
                                            label="Select Specialization"
                                            name="specializationId"
                                            onKeyDown={event => handleEnter(event)}
                                            options={activeSpecializationList}
                                            value={searchParameters.specializationId}
                                            isDisabled={activeSpecializationList && (activeSpecializationList.length ? false : true)}
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
                                            placeholder="Select PatientType."
                                            onChange={handleSearchFormChange}
                                            onEnter={handleEnter}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="patientCategory"
                                            label="Patient Category"
                                            name="patientCategory"
                                            options={[
                                                {value: 'Y', label: 'Self'},
                                                {value: 'N', label: 'Others'}
                                            ]}
                                            label="Select Patient Category."
                                            placeholder="Select Patient Category."
                                            onChange={handleSearchFormChange}
                                            onEnter={handleEnter}
                                        />
                                    </Col>

                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="status"
                                            label="Select Status"
                                            name="status"
                                            options={[
                                                {value: 'PA', label: 'Pending Approval'},
                                                {value: 'A', label: 'Approved'},
                                                {value: 'RE', label: 'Rejected'},
                                                {value: 'C', label: 'Cancelled'},
                                                {value: 'R', label: 'Refunded'}
                                            ]}
                                            onChange={handleSearchFormChange}
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
                                        overlay={<Tooltip id="name">Patient Category</Tooltip>}
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

export default AppointmentLogListSearchFilter
