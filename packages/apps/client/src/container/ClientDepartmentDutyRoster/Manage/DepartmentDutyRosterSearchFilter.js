import React, {PureComponent} from 'react'
import {CButton, CForm, CHybridSelect} from '@frontend-appointment/ui-elements'
import {Button, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'
import {DateTimeFormatterUtils, EnterKeyPressUtils} from '@frontend-appointment/helpers'
import {CEnglishDatePicker} from '@frontend-appointment/ui-components'

class DepartmentDutyRosterSearchFilter extends PureComponent {
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
        this.props.searchFilterProps.onSearchClick();
        this.toggleSearchForm()
    }

    render() {
        const {
            onSearchInputChange,
            searchParameters,
            resetSearchForm,
            departmentList,
            // roomList
        } = this.props.searchFilterProps;
        return (
            <>
                {this.state.isSearchFormExpanded ? (
                    <div id="advanced-search" className="advanced-search">
                        <div className="search-header d-flex justify-content-between">
                            <h5 className="title">Search Department Duty Roster</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant="outline-secondary"
                                    size="sm"
                                    name=""
                                    onClickHandler={resetSearchForm}
                                >
                                    {' '}
                                    <i className="fa fa-refresh"/>
                                    &nbsp;Reset
                                </CButton>
                            </div>
                        </div>
                        <CForm id="department-info" className="add-info mt-4">
                            <Container-fluid>
                                <Row>
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
                                                onChange={date => onSearchInputChange(date, 'fromDate')}
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
                                                onChange={date => onSearchInputChange(date, 'toDate')}
                                            />
                                        </div>
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="department"
                                            label="Department"
                                            name="department"
                                            options={departmentList}
                                            placeholder={departmentList.length ? 'Select Department.'
                                                : 'No Department(s) available.'}
                                            isDisabled={!departmentList.length}
                                            noOptionsMessage={() => 'No Department(s) available.'}
                                            onKeyDown={this.handleEnter}
                                            onChange={event => onSearchInputChange(event)}
                                            value={searchParameters.department}
                                        />
                                    </Col>

                                    {/*<Col sm={12} md={4} xl={4}>*/}
                                    {/*    <CHybridSelect*/}
                                    {/*        id="room"*/}
                                    {/*        label="Room Number"*/}
                                    {/*        name="room"*/}
                                    {/*        options={roomList}*/}
                                    {/*        placeholder={*/}
                                    {/*            !searchParameters.hospital*/}
                                    {/*                ? 'Select Client first.'*/}
                                    {/*                : roomList.length*/}
                                    {/*                ? 'Select Room Number.'*/}
                                    {/*                : 'No Room Number(s) available.'*/}
                                    {/*        }*/}
                                    {/*        isDisabled={*/}
                                    {/*            !searchParameters.hospital || !roomList.length*/}
                                    {/*        }*/}
                                    {/*        noOptionsMessage={() => 'No Room Number(s) available.'}*/}
                                    {/*        onKeyDown={this.handleEnter}*/}
                                    {/*        onChange={event => onSearchInputChange(event)}*/}
                                    {/*        value={searchParameters.room}*/}
                                    {/*    />*/}
                                    {/*</Col>*/}

                                    <Col sm={12} md={6} xl={4}>
                                        <CHybridSelect
                                            id="status"
                                            name="status"
                                            onKeyDown={this.handleEnter}
                                            onChange={event => onSearchInputChange(event)}
                                            value={searchParameters.status}
                                            options={[
                                                {value: 'A', label: 'All'},
                                                {value: 'Y', label: 'Active'},
                                                {value: 'N', label: 'Inactive'}
                                            ]}
                                            label="Status"
                                            placeholder={'Select Status.'}
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
                                        <i className="fa fa-sliders"/>
                                        &nbsp; Filter
                                    </>
                                </CButton>
                            </li>

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

                            {searchParameters && searchParameters.department && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>Department</Tooltip>
                                        )}
                                    >
                                        <Button id="button-search-filters" variant="secondary">
                                            {searchParameters.department.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}
                            {searchParameters && searchParameters.room && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => <Tooltip {...props}>Room</Tooltip>}
                                    >
                                        <Button id="button-search-filters" variant="secondary">
                                            {searchParameters.room.label}
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

export default DepartmentDutyRosterSearchFilter
