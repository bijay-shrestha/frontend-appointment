import React, {PureComponent} from 'react'
import {
    CButton,
    CForm,
    CHybridSelect
} from '@frontend-appointment/ui-elements'
import {Button, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'

class QualificationAliasSearchFilter extends PureComponent {
    state = {
        isSearchFormExpanded: false
    };

    toggleSearchForm = async () => {
        const searchFilter = document.getElementById('advanced-search');
        if (searchFilter) searchFilter.classList.toggle('collapsed');
        await this.setState({
            isSearchFormExpanded: !this.state.isSearchFormExpanded
        })
    };

    handleSearchButtonClick = () => {
        this.props.searchData.onSearchClick();
        this.toggleSearchForm()
    };

    render() {
        const {
            onInputChange,
            searchParameters,
            resetSearchForm,
            handleEnter,
            qualificationsAliasForDropdown,
            dropdownErrorMessage
        } = this.props.searchData;
        return (
            <>
                {this.state.isSearchFormExpanded ? (
                    <div id="advanced-search" className="advanced-search">
                        <div className="search-header d-flex justify-content-between">
                            <h5 className="title">Search Qualification Alias</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant="outline-secondary"
                                    size="sm"
                                    name=""
                                    onClickHandler={resetSearchForm}
                                >
                                    {' '}
                                    <i className="fa fa-refresh"/>&nbsp;Reset
                                </CButton>
                            </div>
                        </div>
                        <CForm id="qualification-alias-search" className="profile-info mt-4">
                            <Container-fluid>
                                <Row>
                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="qualification-alias-name"
                                            name="name"
                                            onKeyDown={event => handleEnter(event)}
                                            onChange={event => onInputChange(event, 'SEARCH')}
                                            label="Qualification Alias"
                                            placeholder={"Select Qualification Alias"}
                                            value={searchParameters.name}
                                            options={qualificationsAliasForDropdown}
                                            noOptionsMessage={() => dropdownErrorMessage}
                                        />
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="status"
                                            name="status"
                                            onKeyDown={event => handleEnter(event)}
                                            onChange={event => onInputChange(event, 'SEARCH')}
                                            value={searchParameters.status}
                                            options={[
                                                {value: 'A', label: 'All'},
                                                {value: 'Y', label: 'Active'},
                                                {value: 'N', label: 'Inactive'}
                                            ]}
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
                                                id="close-search-alias"
                                                variant="light"
                                                size="sm"
                                                className=" btn-action mr-2"
                                                name="Close"
                                                onClickHandler={this.toggleSearchForm}
                                            />
                                            <CButton
                                                id="search-alias"
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
                    // TODO: TO BE MADE DYNAMIC

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
                            {searchParameters.name && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>Qualification Alias</Tooltip>
                                        )}
                                    >
                                        <Button id="light-search-filters" variant="secondary">
                                            {searchParameters.name.label}
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

export default QualificationAliasSearchFilter;
