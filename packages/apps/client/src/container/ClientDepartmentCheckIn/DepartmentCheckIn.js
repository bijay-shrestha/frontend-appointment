import React from 'react'
import QuickDepartmentCheckInDataTable from './DepartmentCheckInDataTable'
import QuickDepartmentCheckInHoc from './DepartmentCheckInHoc'
import QuickDepartmentCheckInSearchFilter from './DepartmentCheckInSearchFilter'

const DepartmentAppointmentCheckInLog = props => {
    const DepartmentAppoinmentCheckIn = QuickDepartmentCheckInHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <QuickDepartmentCheckInSearchFilter searchHandler={searchHandler}/>


                <div className="">
                    <QuickDepartmentCheckInDataTable
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
