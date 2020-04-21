import React from 'react'
import AppointmentLogSearchFilter from './AppointmentRefundSearchFilter'
import AppointmentRefundDataTable from './AppointmentRefundDataTable'
import AppointRefundApprovalHoc from './AppointmentRefundHoc'

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
