import React, { PureComponent } from 'react';
import { Col, Container, Row } from "react-bootstrap";
import { CButton, CHybridSelect, CForm } from "@frontend-appointment/ui-elements";
import { CEnglishDatePicker } from "@frontend-appointment/ui-components";

import "./appointment-status.scss";

class AppointmentLog extends PureComponent {


    render() {

        return <>
            <div id="advanced-search" className='advanced-search'>
                <div className='search-header d-flex justify-content-between'>
                    <h5 className="title">Search Appointment Status</h5>
                    <div>
                        <CButton
                            id="reset-form"
                            variant='outline-secondary'
                            size='sm'
                            name='Reset'

                        >
                            {' '}
                            <i className='fa fa-refresh' />
                        </CButton>
                    </div>

                </div>
                <CForm id='' className=' mt-4'>
                    <Container-fluid>
                        <Row>
                            <Col sm={12} md={6} xl={4}>
                                <CHybridSelect
                                    id="admin-meta-info"
                                    name="metaInfo"
                                    label="Hospital"
                                    placeholder="Select Hospital"

                                />
                            </Col>
                            <Col sm={12} md={6} xl={4}>
                                <div className="d-flex">
                                    <CEnglishDatePicker
                                        id="from-date"
                                        name="fromDate"
                                        label="From Date"
                                        dateFormat="yyyy-MM-dd"
                                        minDate={0}
                                        showDisabledMonthNavigation={true}
                                        // selected={doctorInfoData.fromDate}
                                        peekNextMonth={true}
                                        showMonthDropdown={true}
                                        showYearDropdown={true}
                                        dropdownMode="select"
                                    // onKeyDown={(event) => onEnterKeyPress(event)}
                                    // onChange={(date) => onDateChange(date, "fromDate")}
                                    />
                                    &nbsp;&nbsp;
                        <CEnglishDatePicker
                                        id="to-date"
                                        name="toDate"
                                        label="To Date"
                                        dateFormat="yyyy-MM-dd"
                                        minDate={0}
                                        showDisabledMonthNavigation={true}
                                        // selected={doctorInfoData.toDate}
                                        peekNextMonth={true}
                                        showMonthDropdown={true}
                                        showYearDropdown={true}
                                        dropdownMode="select"
                                    // onKeyDown={(event) => onEnterKeyPress(event)}
                                    // onChange={(date) => onDateChange(date, "toDate")}
                                    />
                                </div>
                            </Col>
                            <Col sm={12} md={6} xl={4} className="hide-on-md">
                                {/* //should be empty */}
                            </Col>
                           
                            <Col sm={12} md={6} xl={6}>
                                <CHybridSelect
                                    id="Doctor"
                                    label="Doctor"
                                    name="Doctor"
                                    // onKeyDown={(event) => this.handleEnter(event)}
                                    // onChange={(event) => onInputChange(event)}
                                    // options={hospitalList}
                                    // value={searchParameters.hospital}
                                    placeholder="Select Doctor."
                                />
                            </Col>

                            <Col sm={12} md={6} xl={6}>
                                <CHybridSelect
                                    id="Specialization"
                                    label="Specialization"
                                    name="Specialization"
                                    // onKeyDown={(event) => this.handleEnter(event)}
                                    // onChange={(event) => onInputChange(event)}
                                    // options={departmentList}
                                    // value={searchParameters.department}
                                    placeholder="Select Specialization."
                                />
                            </Col>

                           

                            

                            <Col
                                sm={12}
                                md={{ span: 8, offset: 4 }}
                                xl={{ span: 6, offset: 6 }}
                            >
                                <div className="pull-right">
                                    <CButton
                                        id="toggle-search-profiles"
                                        variant='light'
                                        size='sm'
                                        className=' btn-action mr-2'
                                        // children={<i className='fa fa-chevron-up fa-lg'/>}
                                        name='Close'
                                    // onClickHandler={this.toggleSearchForm}
                                    />
                                    <CButton
                                        id="search-profiles"
                                        variant='primary'
                                        className='btn-action'
                                        name='Search'
                                    // onClickHandler={this.handleSearchButtonClick}
                                    >

                                    </CButton>
                                </div>
                            </Col>
                        </Row>
                    </Container-fluid>
                    <div className="search-toggle-btn">

                    </div>
                </CForm>
            </div>
        </>

    }

}
export default AppointmentLog