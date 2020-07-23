import React from 'react'
import DepartmentAppointmentCancellationStatusSearchFilter from './DepartmentAppointmentCancellationStatusSearchFilter'
import DepartmentAppointmentCancellationStatusDataTable from './DepartmentAppointmentCancellationStatusDataTable'
import DepartmentAppointmentCancellationStatusHoc from './DepartmentAppointmentCancellationStatusHoc'

const DepartmentAppointmentCancellationStatus = props => {
    const AppointmentDepartmentRefund = DepartmentAppointmentCancellationStatusHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <div>
                    <DepartmentAppointmentCancellationStatusSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <DepartmentAppointmentCancellationStatusDataTable
                        tableHandler={tableHandler}
                        paginationProps={paginationProps}
                    />
                </div>
            </>
        ),
        props,
        ''
    );

    return <AppointmentDepartmentRefund/>
};

export default DepartmentAppointmentCancellationStatus
