import React, {PureComponent} from 'react';
import {CButton, CForm, CHybridInput, CHybridSelect} from "@frontend-appointment/ui-elements";
import {Button, Col, OverlayTrigger, Row, Tooltip} from "react-bootstrap";
import {EnterKeyPressUtils} from "@frontend-appointment/helpers";

class UnitSetupSearchFilter extends PureComponent {

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
            resetSearchForm,
            departments
        } = this.props;
        return (
            <>
                {this.state.isSearchFormExpanded ?
                    // TODO: TO BE MADE DYNAMIC
                    <div id="advanced-search" className='advanced-search'>
                        <div className='search-header d-flex justify-content-between'>
                            <h5 className="title">Search Units</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant='outline-secondary'
                                    size='sm'
                                    name=''
                                    onClickHandler={resetSearchForm}>
                                    {' '}
                                    <i className="fa fa-refresh"/>  &nbsp;Reset
                                </CButton>
                            </div>

                        </div>
                        <CForm id='department-info' className='add-info mt-4'>
                            <Container-fluid>
                                <Row>
                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="departmentId"
                                            name="departmentId"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            value={searchParameters.departmentId}
                                            options={departments}
                                            label='Unit'
                                            placeholder={departments.length ? "Select Unit." : "No Unit(s) available."}
                                        />
                                    </Col>
                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridInput
                                            id="department-code"
                                            name="departmentCode"
                                            onKeyDown={(event) => this.handleEnter(event)}
                                            onChange={(event) => onInputChange(event)}
                                            placeholder="Unit Code"
                                            value={searchParameters.departmentCode}
                                        />
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
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
                                        md={{span: 6, offset: 6}}
                                        xl={{span: 6, offset: 6}}
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
                                    <><i className="fa fa-sliders"></i>
                                        &nbsp; Filter
                                    </>
                                </CButton>

                            </li>
                            {searchParameters.departmentId &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Unit</Tooltip>}
                                >
                                    <Button id="light-search-filters" variant="secondary">
                                        {searchParameters.departmentId ? searchParameters.departmentId.label : ''}
                                    </Button>
                                </OverlayTrigger>

                            </li>
                            }

                            {searchParameters.departmentCode &&
                            <li>
                                <OverlayTrigger
                                    placement="top"
                                    delay={{show: 250, hide: 400}}
                                    overlay={(props) => <Tooltip {...props}>Unit Code</Tooltip>}
                                >
                                    <Button id="button-search-filters" variant="secondary">
                                        {searchParameters.departmentCode}
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
                                    <Button id="button-search-filters" variant="secondary">
                                        {searchParameters.hospital.label}
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

export default UnitSetupSearchFilter;
