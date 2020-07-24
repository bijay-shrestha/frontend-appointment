import React from 'react';
import AppointmentApprovalSearchFilter from './AppointmentCheckInSearchFilter';
import AppointmentApprovalDataTable from './AppointmentCheckInDataTable';
import AppointmentApprovalHoc from './AppointmentCheckInHoc';

const AppointmentCheckIn = props => {
    const AppoinmentApproval = AppointmentApprovalHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <div>
                    <AppointmentApprovalSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <AppointmentApprovalDataTable
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

    return <AppoinmentApproval/>
}

export default AppointmentCheckIn
