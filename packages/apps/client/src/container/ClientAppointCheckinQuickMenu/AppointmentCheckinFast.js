import React from 'react'
import AppointmentCheckInFastDataTable from './AppointmentCheckInFastDataTable'
import AppointmentCheckInFastHoc from './AppointmentCheckinFastHoc'
import {CButton,CHybridInput} from '@frontend-appointment/ui-elements'
import {Col} from 'react-bootstrap'
const AppointmentCheckInFastLog = props => {
  const AppoinmentCheckInFast = AppointmentCheckInFastHoc(
    ({searchHandler, paginationProps, tableHandler}) => (
      <>
        <div>
          <Col sm={12} md={6} xl={4}>
            <CHybridInput
              id="appointmentNumber"
              name="appointmentNumber"
              placeholder="Appointment Number"
              value={searchHandler.searchParameters.appointmentNumber}
              onChange={searchHandler.handleSearchFormChange}
            />
            <CButton
              id="search-profiles"
              variant="primary"
              className="btn-action"
              name="Search"
              onClickHandler={()=>searchHandler.searchAppointment(1)}
            />
          </Col>
        </div>

        <div className="">
          <AppointmentCheckInFastDataTable
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

  return <AppoinmentCheckInFast />
}

export default AppointmentCheckInFastLog
