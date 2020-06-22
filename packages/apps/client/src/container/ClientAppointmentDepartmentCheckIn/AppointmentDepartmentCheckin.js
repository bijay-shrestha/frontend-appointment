import React from 'react'
import DepartmentAppointmentCheckInDataTable from './AppointmentDepartmentCheckInDataTable'
import DepartmentAppointmentCheckInHoc from './AppointmentDepartmentCheckinHoc'
import DepartmentAppointmentSearchFilter from './AppointmentDepartmentSearchFilter'

const DepartmentAppointmentCheckInLog = props => {
    const DepartmentAppoinmentCheckIn= DepartmentAppointmentCheckInHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                  <DepartmentAppointmentSearchFilter searchHandler={searchHandler}/>
                

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
