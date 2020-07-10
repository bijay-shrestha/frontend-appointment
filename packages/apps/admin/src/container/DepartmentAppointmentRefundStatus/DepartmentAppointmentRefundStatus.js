import React from 'react'
import AppointmentLogSearchFilter from './DepartmentAppointmentRefundStatusSearchFilter'
import AppointmentRefundDataTable from './DepartmentAppointmentRefundStatusDataTable'
import AppointRefundApprovalHoc from './DepartmentAppointmentStatusRefundHoc'

const AppointmentRefundLog = props => {
    const AppointmentRefund = AppointRefundApprovalHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <div>
                    <AppointmentLogSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <AppointmentRefundDataTable
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

export default AppointmentRefundLog
