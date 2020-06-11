import React from 'react'
import AppointmentCheckInFastDataTable from './AppointmentCheckInFastDataTable'
import AppointmentCheckInFastHoc from './AppointmentCheckinFastHoc'
import {CButton,CHybridInput} from '@frontend-appointment/ui-elements'
import {Col,Row} from 'react-bootstrap'
const AppointmentCheckInFastLog = props => {
  const AppoinmentCheckInFast = AppointmentCheckInFastHoc(
    ({searchHandler, paginationProps, tableHandler}) => (
      <>
        <Row >
          <Col lg ={{span:8,offset:2}}className="search-bar">
            <div  className="appt-search">
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
              onClickHandler={()=>searchHandler.searchAppointment(1)}              
            >
            <i className="fa fa-search"></i>&nbsp;Search
            </CButton>
            </Col>
        </Row>

        <div className="">
          <AppointmentCheckInFastDataTable
            tableHandler={tableHandler}
            paginationProps={paginationProps}
          />
        </div>
      </>
    ),
    props,
    ''
  )

  return <AppoinmentCheckInFast />
}

export default AppointmentCheckInFastLog
