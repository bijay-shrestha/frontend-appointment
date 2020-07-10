import React from 'react'
import AppointmentDepartmentLogSearchFilter from './ClientAppointmentDepartmentRefundStatusSearchFilter'
import AppointmentDepartmentRefundDataTable from './ClientAppointmentDepartmentRefundStatusDataTable'
import AppointDepartmentRefundApprovalHoc from './ClientAppointmentDepartmentRefundStatusHoc'

const AppointmentDepartmentRefundLog = props => {
    const AppointmentDepartmentRefund = AppointDepartmentRefundApprovalHoc(
        ({searchHandler, paginationProps, tableHandler}) => (
            <>
                <div>
                    <AppointmentDepartmentLogSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <AppointmentDepartmentRefundDataTable
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

export default AppointmentDepartmentRefundLog
