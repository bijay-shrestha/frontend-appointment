import React from 'react'
import DepartmentAppointmentCheckInDataTable from './DepartmentAppointmentCheckInDataTable'
import DepartmentAppointmentCheckInHoc from './DepartmentAppointmentCheckInHoc'
import DepartmentAppointmentCheckInSearchFilter from './DepartmentAppointmentCheckInSearchFilter'

const DepartmentAppointmentCheckIn = props => {
    const DepartmentAppointmentCheckIn = DepartmentAppointmentCheckInHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <DepartmentAppointmentCheckInSearchFilter searchHandler={searchHandler}/>

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

    return <DepartmentAppointmentCheckIn/>
}

export default DepartmentAppointmentCheckIn
