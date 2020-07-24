import React from 'react'
import DoctorAppointmentCancellationStatusSearchFilter from './DoctorAppointmentCancellationStatusSearchFilter'
import DoctorAppointmentCancellationStatusDataTable from './DoctorAppointmentCancellationStatusDataTable'
import DoctorAppointmentCancellationStatusHoc from './DoctorAppointmentCancellationStatusHoc'

const DoctorAppointmentCancellationStatus = props => {
    const AppointmentRefund = DoctorAppointmentCancellationStatusHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <div>
                    <DoctorAppointmentCancellationStatusSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <DoctorAppointmentCancellationStatusDataTable
                        tableHandler={tableHandler}
                        paginationProps={paginationProps}
                    />
                </div>
            </>
        ),
        props,
        ''
    );

    return <AppointmentRefund/>
};

export default DoctorAppointmentCancellationStatus
