import React, {PureComponent} from 'react'
import {
    CButton,
    CForm,
    CHybridSelect
} from '@frontend-appointment/ui-elements'
import {Button, Col, OverlayTrigger, Row, Tooltip} from 'react-bootstrap'

class SpecializationSetupSearchFilter extends PureComponent {
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
        this.props.onSearchClick()
        this.toggleSearchForm()
    }

    render() {
        const {
            onInputChange,
            searchParameters,
            resetSearchForm,
            handleEnter,
            qualificationsAliasForDropdown,
            qualificationsForDropdown,
            universitiesDropdown
        } = this.props;

        return (
            <>
                {this.state.isSearchFormExpanded ? (
                    <div id="advanced-search" className="advanced-search">
                        <div className="search-header d-flex justify-content-between">
                            <h5 className="title">Search Qualification</h5>
                            <div>
                                <CButton
                                    id="reset-form"
                                    variant="outline-secondary"
                                    size="sm"
                                    name="Reset"
                                    onClickHandler={resetSearchForm}
                                >
                                    {' '}
                                    <i className="fa fa-refresh"/>
                                </CButton>
                            </div>
                        </div>
                        <CForm id="qualification-info" className="profile-info mt-4">
                            <Container-fluid>
                                <Row>
                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="qualification-name"
                                            name="name"
                                            onKeyDown={event => handleEnter(event)}
                                            onChange={event => onInputChange(event)}
                                            label="Qualification"
                                            value={searchParameters.name}
                                            options={qualificationsForDropdown}
                                            placeholder={qualificationsForDropdown.length ? "Select Qualification." : "No Qualification(s)."}
                                            isDisabled={!qualificationsForDropdown.length}
                                        />
                                    </Col>

                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="university-id"
                                            name="universityId"
                                            onKeyDown={event => handleEnter(event)}
                                            onChange={event => onInputChange(event)}
                                            label="University"
                                            value={searchParameters.universityId}
                                            options={universitiesDropdown}
                                            placeholder={universitiesDropdown.length ? "Select University." : "No University."}
                                            isDisabled={!universitiesDropdown.length}
                                        />
                                    </Col>
                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="qualification-alias"
                                            name="qualificationAliasId"
                                            onKeyDown={event => handleEnter(event)}
                                            onChange={event => onInputChange(event)}
                                            label="Qualification Alias"
                                            value={searchParameters.qualificationAliasId}
                                            options={qualificationsAliasForDropdown}
                                            placeholder={qualificationsAliasForDropdown.length ? "Select Qualification Alias." : "No Qualification Alias."}
                                            isDisabled={!qualificationsAliasForDropdown.length}
                                        />
                                    </Col>
                                    <Col sm={12} md={4} xl={4}>
                                        <CHybridSelect
                                            id="status"
                                            name="status"
                                            onKeyDown={event => handleEnter(event)}
                                            onChange={event => onInputChange(event)}
                                            value={searchParameters.status}
                                            options={[
                                                {value: 'A', label: 'All'},
                                                {value: 'Y', label: 'Active'},
                                                {value: 'N', label: 'Inactive'}
                                            ]}
                                            label="Status"
                                            placeholder={"Select status."}
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
                                                // children={<i className='fa fa-chevron-up fa-lg'/>}
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
                    // TODO: TO BE MADE DYNAMIC

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
                            {searchParameters.name && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>Qualification</Tooltip>
                                        )}
                                    >
                                        <Button id="light-search-filters" variant="secondary">
                                            {searchParameters.name.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}

                            {searchParameters.universityId && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>University</Tooltip>
                                        )}
                                    >
                                        <Button id="button-search-filters" variant="secondary">
                                            {searchParameters.universityId.label}
                                        </Button>
                                    </OverlayTrigger>
                                </li>
                            )}

                            {searchParameters.qualificationAliasId && (
                                <li>
                                    <OverlayTrigger
                                        placement="top"
                                        delay={{show: 250, hide: 400}}
                                        overlay={props => (
                                            <Tooltip {...props}>Qualification Alias</Tooltip>
                                        )}
                                    >
                                        <Button id="button-search-filters" variant="secondary">
                                            {searchParameters.qualificationAliasId.label}
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

export default SpecializationSetupSearchFilter
