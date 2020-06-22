import React from 'react'
import DepartmentAppointmentCheckInDataTable from './AppointmentDepartmentCheckInDataTable'
import DepartmentAppointmentCheckInHoc from './AppointmentDepartmentCheckinHoc'
import DepartmentAppointmentSearchFilter from './AppointmentDepartmentSearchFilter'
import {Col, Row} from 'react-bootstrap'

const DepartmentAppointmentCheckInLog = props => {
    const DepartmentAppoinmentCheckIn= DepartmentAppointmentCheckInHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <div className="quick-search">
                  <DepartmentAppointmentSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <DepartmentAppointmentCheckInDataTable
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

    return <DepartmentAppoinmentCheckIn/>
}

export default DepartmentAppointmentCheckInLog
