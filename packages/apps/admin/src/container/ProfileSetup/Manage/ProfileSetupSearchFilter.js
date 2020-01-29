import React, {PureComponent} from 'react';
import {CButton, CForm, CHybridInput, CHybridSelect} from "@frontend-appointment/ui-elements";
import {Button, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";

class ProfileSetupSearchFilter extends PureComponent {

    state = {
        isSearchFormExpanded: false
    };

    handleEnter = (event) => {
        let increment = 1;
        if (event.keyCode === 13) {
            const form = event.target.form;
            const index = Array.prototype.indexOf.call(form, event.target);
            increment = event.currentTarget.children.length ? 2 : 1;
            form.elements[index + increment].focus();
            if (increment !== 2)
                event.preventDefault();
        }
    };

    toggleSearchForm = async () => {

        const searchFilter = document.getElementById('advanced-search');
        if (searchFilter) searchFilter.classList.toggle('collapsed')
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
            departmentList,
            subDepartmentList,
            resetSearchForm
        } = this.props;
        return (
            <>
                {this.state.isSearchFormExpanded ?
                    // TODO: TO BE MADE DYNAMIC
                    <div id="advanced-search" className='advanced-search'>
                        <div className='search-header d-flex justify-content-between'>
                            <h5 className="title">Search Profiles</h5>
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
                                        <CHybridInput
                                            id="profile-name"
                                            name="profileName"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            placeholder="Profile Name"
                                            value={searchParameters.profileName}
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

                                    <Col sm={6} md={6} xl={3}>
                                        <CHybridSelect
                                            id="department"
                                            label="Department"
                                            name="selectedDepartment"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            options={departmentList}
                                            value={searchParameters.selectedDepartment}
                                            placeholder="Select department"
                                        />
                                    </Col>

                                    <Col sm={6} md={6} xl={3}>
                                        <CHybridSelect
                                            id="sub-department"
                                            isDisabled={!searchParameters.selectedDepartment}
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            label="Sub Department"
                                            name="selectedSubDepartment"
                                            onChange={(event) => onInputChange(event)}
                                            options={subDepartmentList}
                                            value={searchParameters.selectedSubDepartment}
                                            placeholder={!searchParameters.selectedDepartment ? 'Select department first.' : 'Select Sub Department'}
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
                                                variant='outline-secondary'
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
                            {searchParameters.profileName &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Profile Name</Tooltip>}
                                >
                                    <Button id="light-search-filters" variant="secondary">
                                        {searchParameters.profileName}
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

                            {searchParameters.selectedDepartment &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Department</Tooltip>}
                                >
                                    <Button id="button-search-filters" variant="secondary">
                                        {searchParameters.selectedDepartment && searchParameters.selectedDepartment.label}
                                    </Button>
                                </OverlayTrigger>

                            </li>
                            }

                            {searchParameters.selectedSubDepartment &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Sub Department</Tooltip>}
                                >
                                    <Button id="button-searchs-filters" variant="secondary">
                                        {searchParameters.selectedSubDepartment && searchParameters.selectedSubDepartment.label}
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
