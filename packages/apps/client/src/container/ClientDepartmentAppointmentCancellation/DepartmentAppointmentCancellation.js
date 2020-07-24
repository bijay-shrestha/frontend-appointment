import React from 'react'
import DepartmentAppointmentSearchFilter from './DepartmentAppointmentCancellationSearchFilter'
import DepartmentAppointmentCancellationDataTable from './DepartmentAppointmentCancellationDataTable'
import DepartmentAppointmentCancellationHoc from './DepartmentAppointmentCancellationHoc'

const DepartmentAppointmentCancellation = props => {
    const DepartmentAppointmentCancellation = DepartmentAppointmentCancellationHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <div>
                    <DepartmentAppointmentSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <DepartmentAppointmentCancellationDataTable
                        tableHandler={tableHandler}
                        paginationProps={paginationProps}
                    />
                </div>
            </>
        ),
        props,
        ''
    );

    return <DepartmentAppointmentCancellation/>
};

export default DepartmentAppointmentCancellation
