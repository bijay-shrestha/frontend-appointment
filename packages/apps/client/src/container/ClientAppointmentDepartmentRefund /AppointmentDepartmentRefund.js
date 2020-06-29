import React from 'react'
import AppointmentDepartmentLogSearchFilter from './AppointmentDepartmentSearchFilter'
import AppointmentDepartmentRefundDataTable from './AppointmentDepartmentRefundDataTable'
import AppointDepartmentRefundApprovalHoc from './AppointmentDepartmentRefundHoc'

const AppointmentDepartmentRefundLog = props => {
    const AppointmentRefund = AppointRefundApprovalHoc(
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

    return <AppointDepartmentRefundApprovalHoc/>
};

export default AppointmentDepartmentRefundLog
