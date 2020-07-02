import React from 'react'
import DepartmentAppointmentCheckInFastDataTable from './AdminAppointmentDepartmentCheckInFastDataTable'
import DepartmentAppointmentCheckInFastHoc from './AdminAppointmentDepartmentCheckinFastHoc'
import {CButton, CHybridInput} from '@frontend-appointment/ui-elements'
import {Col, Row} from 'react-bootstrap'

const DepartmentAppointmentCheckInFastLog = props => {
    const DepartmentAppoinmentCheckInFast = DepartmentAppointmentCheckInFastHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <Row className="quick-search">
                    <Col lg={{span: 8, offset: 2}} className="search-bar">
                        <div className="appt-search">
                            <CHybridInput
                                id="appointmentNumber"
                                name="appointmentNumber"
                                placeholder="Appointment Number"
                                value={searchHandler.searchParameters.appointmentNumber}
                                onChange={searchHandler.handleSearchFormChange}

                            />
                        </div>
                        <CButton
                            id="search-profiles"
                            variant="primary"
                            className="btn-action"
                            name=""
                            onClickHandler={() => searchHandler.searchAppointment(1)}
                        >
                            <>
                                <i className="fa fa-search"/>&nbsp;Search
                            </>
                        </CButton>
                        <CButton
                            id="reset-form"
                            className="btn-reset"
                            variant="outline-secondary"
                            name=""
                            onClickHandler={searchHandler.resetAppointmentNumber}
                        >                        
                            <i className="fa fa-refresh"/> &nbsp;Reset
                        </CButton>
                    </Col>
                </Row>

                <div className="">
                    <DepartmentAppointmentCheckInFastDataTable
                        tableHandler={tableHandler}
                        paginationProps={paginationProps}
                        filteredActions={props.filteredAction}
                    />
                </div>
            </>
        ),
        props,
        ''
    )

    return <DepartmentAppoinmentCheckInFast/>
}

export default DepartmentAppointmentCheckInFastLog
