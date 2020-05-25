import React, {PureComponent} from 'react';
import {CButton, CForm, CHybridInput, CHybridSelect, CHybridSelectWithImage} from "@frontend-appointment/ui-elements";
import {Button, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {EnterKeyPressUtils, EnvironmentVariableGetter} from "@frontend-appointment/helpers";

class HospitalDepartmentSetupSearchFilter extends PureComponent {

    state = {
        isSearchFormExpanded: false
    };

    handleEnter = (event) => {
        EnterKeyPressUtils.handleEnter(event);
    };

    toggleSearchForm = async () => {
        const searchFilter = document.getElementById('advanced-search');
        if (searchFilter) searchFilter.classList.toggle('collapsed');
        await this.setState({
            isSearchFormExpanded: !this.state.isSearchFormExpanded
        });

    };

    handleSearchButtonClick = () => {
        this.props.searchData.onSearchClick();
        this.toggleSearchForm();
    };

    render() {
        const {
            onInputChange,
            resetSearchForm,
            searchParameters,
            allHospitalDepartmentForDropdown,
            // allDepartmentDropdownErrorMessage,
            allRoomNumberForDropdown,
            allDoctorsForDropdown,
            hospitalListForDropdown
        } = this.props.searchData;
        return (
            <>
                {this.state.isSearchFormExpanded ?
                    // TODO: TO BE MADE DYNAMIC
                    <div id="advanced-search" className='advanced-search'>
                        <div className='search-header d-flex justify-content-between'>
                            <h5 className="title">Search Departments</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant='outline-secondary'
                                    size='sm'
                                    name=''
                                    onClickHandler={resetSearchForm}>
                                    <>
                                        {' '}
                                        <i className='fa fa-refresh'/>&nbsp;Reset
                                    </>
                                </CButton>
                            </div>

                        </div>
                        <CForm id='profile-info' className='profile-info mt-4'>
                            <Container-fluid>
                                <Row>
                                    {
                                        EnvironmentVariableGetter.REACT_APP_MODULE_CODE === EnvironmentVariableGetter.ADMIN_MODULE_CODE ?
                                            <Col sm={6} md={6} xl={4}>
                                                <CHybridSelect
                                                    id="hospital"
                                                    label="Client"
                                                    name="hospital"
                                                    options={hospitalListForDropdown}
                                                    value={searchParameters.hospital}
                                                    placeholder={hospitalListForDropdown.length ? "Select Client."
                                                        : "No Client(s) available."}
                                                    onKeyDown={this.handleEnter}
                                                    onChange={onInputChange}
                                                />
                                            </Col> : ''
                                    }
                                    <Col sm={6} md={6} xl={4}>
                                        <CHybridSelect
                                            id="hospitalDepartment"
                                            label="Department"
                                            name="department"
                                            options={allHospitalDepartmentForDropdown}
                                            value={searchParameters.department}
                                            placeholder={allHospitalDepartmentForDropdown.length ? "Select Department."
                                                : "No Department(s) available."}
                                            isDisabled={!allHospitalDepartmentForDropdown.length}
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                        />
                                    </Col>

                                    <Col sm={6} md={6} xl={4}>
                                        <CHybridSelectWithImage
                                            id="doctor"
                                            label="Doctor"
                                            name="doctor"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            options={allDoctorsForDropdown}
                                            value={searchParameters.doctor}
                                            placeholder={allDoctorsForDropdown.length ? 'Select Doctor.'
                                                : 'No Doctor(s) available.'}
                                            isDisabled={!allDoctorsForDropdown.length}
                                        />
                                    </Col>

                                    <Col sm={6} md={6} xl={4}>
                                        <CHybridSelect
                                            id="room"
                                            label="Room"
                                            name="room"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            options={allRoomNumberForDropdown}
                                            value={searchParameters.room}
                                            placeholder={allRoomNumberForDropdown.length ? 'Select Room.'
                                                : 'No Room(s) available.'}
                                            isDisabled={!allRoomNumberForDropdown.length}
                                        />
                                    </Col>

                                    <Col sm={6} md={6} xl={4}>
                                        <CHybridInput
                                            id="code"
                                            name="code"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            value={searchParameters.code}
                                            placeholder={"Department Code"}
                                        />
                                    </Col>

                                    <Col sm={6} md={6} xl={4}>
                                        <CHybridSelect
                                            id="status"
                                            name="status"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            value={searchParameters.status}
                                            options={[
                                                {value: 'A', label: 'All'},
                                                {value: 'Y', label: 'Active'},
                                                {value: 'N', label: 'Inactive'}]}
                                            label='Status'
                                        />
                                    </Col>

                                    <Col
                                        sm={12}
                                        // md={{span: 8, offset: 4}}
                                        // xl={{span: 6, offset: 6}}
                                    >
                                        <div className="pull-right">
                                            <CButton
                                                id="search-profiles"
                                                variant='light'
                                                size='sm'
                                                className=' btn-action mr-2'
                                                // children={<i className='fa fa-chevron-up fa-lg'/>}
                                                name='Close'
                                                onClickHandler={this.toggleSearchForm}/>
                                            <CButton
                                                id="search-profiles"
                                                variant='primary'
                                                className='btn-action'
                                                name='Search'
                                                onClickHandler={this.handleSearchButtonClick}
                                            >

                                            </CButton>
                                        </div>
                                    </Col>
                                </Row>
                            </Container-fluid>
                            <div className="search-toggle-btn">

                            </div>
                        </CForm>
                    </div> :
                    // TODO: TO BE MADE DYNAMIC

                    <div className="search-filter-wrapper" onClick={this.toggleSearchForm}>
                        <ul id="" className="search-filter-item">
                            <li>
                                <CButton id="filter" variant="primary" name="">
                                    <><i className="fa fa-sliders"></i>
                                        &nbsp; Filter
                                    </>
                                </CButton>

                            </li>
                            {searchParameters.hospital &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Hospital</Tooltip>}
                                >
                                    <Button id="light-search-filters" variant="secondary">
                                        {searchParameters.hospital && searchParameters.hospital.label}
                                    </Button>
                                </OverlayTrigger>

                            </li>
                            }

                            {searchParameters.department &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Department</Tooltip>}
                                >
                                    <Button id="button-searchs-filters" variant="secondary">
                                        {searchParameters.department && searchParameters.department.label}
                                    </Button>
                                </OverlayTrigger>

                            </li>
                            }

                            {searchParameters.doctor &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Doctor</Tooltip>}
                                >
                                    <Button id="button-searchs-filters" variant="secondary">
                                        {searchParameters.doctor && searchParameters.doctor.label}
                                    </Button>
                                </OverlayTrigger>

                            </li>
                            }

                            {searchParameters.room &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Room</Tooltip>}
                                >
                                    <Button id="button-searchs-filters" variant="secondary">
                                        {searchParameters.room && searchParameters.room.label}
                                    </Button>
                                </OverlayTrigger>

                            </li>
                            }

                            {searchParameters.code &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Code</Tooltip>}
                                >
                                    <Button id="button-searchs-filters" variant="secondary">
                                        {searchParameters.code}
                                    </Button>
                                </OverlayTrigger>

                            </li>
                            }

                            {searchParameters.status &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="name">
                                            Status
                                        </Tooltip>
                                    }
                                >
                                    <Button id="search-param-button-filters" variant="secondary">
                                        {searchParameters.status.value === 'Y' ? "Active"
                                            : searchParameters.status.value === 'A' ? "All" : "Inactive"}
                                    </Button>
                                </OverlayTrigger>
                            </li>
                            }
                        </ul>
                    </div>
                }
            </>
        );
    }
}

export default HospitalDepartmentSetupSearchFilter;
