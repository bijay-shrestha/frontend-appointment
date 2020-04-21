import React, {PureComponent} from 'react';
import {CButton, CForm, CHybridSelect} from "@frontend-appointment/ui-elements";
import {Button, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";

class ProfileSetupSearchFilter extends PureComponent {

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
        this.props.onSearchClick();
        this.toggleSearchForm();
    };

    render() {
        const {
            onInputChange,
            searchParameters,
            profileList,
            hospitalList,
            departmentList,
            resetSearchForm
        } = this.props;
        return (
            <>
                {this.state.isSearchFormExpanded ?
                    // TODO: TO BE MADE DYNAMIC
                    <div id="advanced-search" className='advanced-search'>
                        <div className='search-header d-flex justify-content-between'>
                            <h5 className="title">Search Client Profiles</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant='outline-secondary'
                                    size='sm'
                                    name='Reset'
                                    onClickHandler={resetSearchForm}>
                                    {' '}
                                    <i className='fa fa-refresh'/>
                                </CButton>
                            </div>

                        </div>
                        <CForm id='profile-info' className='profile-info mt-4'>
                            <Container-fluid>
                                <Row>
                                    <Col sm={6} md={6} xl={3}>
                                        <CHybridSelect
                                            id="profile-name"
                                            label="Profile"
                                            name="profile"
                                            options={profileList}
                                            value={searchParameters.profile}
                                            placeholder="Select profile."
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                        />
                                    </Col>
                                    <Col sm={6} md={6} xl={3}>
                                        <CHybridSelect
                                            id="hospital"
                                            label="Client"
                                            name="hospital"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            options={hospitalList}
                                            value={searchParameters.hospital}
                                            placeholder={'Select Client.'}
                                        />
                                    </Col>

                                    <Col sm={6} md={6} xl={3}>
                                        <CHybridSelect
                                            id="department"
                                            label="Department"
                                            name="department"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            options={departmentList}
                                            value={searchParameters.department}
                                            placeholder="Select department."
                                        />
                                    </Col>

                                    <Col sm={6} md={6} xl={3}>
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
                                <CButton variant="primary" name="">
                                    <><i className="fa fa-filter"></i>
                                        &nbsp; Filter
                                    </>
                                </CButton>

                            </li>
                            {searchParameters.profile &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Profile</Tooltip>}
                                >
                                    <Button id="light-search-filters" variant="secondary">
                                        {searchParameters.profile && searchParameters.profile.label}
                                    </Button>
                                </OverlayTrigger>

                            </li>
                            }
                            {searchParameters.hospital &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Client</Tooltip>}
                                >
                                    <Button id="button-searchs-filters" variant="secondary">
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
                                    <Button id="button-search-filters" variant="secondary">
                                        {searchParameters.department && searchParameters.department.label}
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

export default ProfileSetupSearchFilter;
