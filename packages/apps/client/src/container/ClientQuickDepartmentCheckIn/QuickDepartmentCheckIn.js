import React from 'react'
import QuickDepartmentCheckInDataTable from './QuickDepartmentCheckInDataTable'
import QuickDepartmentCheckInHoc from './QuickDepartmentCheckInHoc'
import QuickDepartmentCheckInSearchFilter from './QuickDepartmentCheckInSearchFilter'

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
