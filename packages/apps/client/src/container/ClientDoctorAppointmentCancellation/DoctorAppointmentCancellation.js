import React from 'react'
import DoctorAppointmentCancellationSearchFilter from './DoctorAppointmentCancellationSearchFilter'
import DoctorAppointmentCancellationDataTable from './DoctorAppointmentCancellationDataTable'
import DoctorAppointmentCancellationHoc from './DoctorAppointmentCancellationHoc'

const DoctorAppointmentCancellation = props => {
    const AppointmentRefund = DoctorAppointmentCancellationHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <div>
                    <DoctorAppointmentCancellationSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <DoctorAppointmentCancellationDataTable
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

export default DoctorAppointmentCancellation
