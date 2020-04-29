import React from 'react'
import AppointmentLogSearchFilter from './AppointmentLogSearchFilter'
import AppointmentLogDataTable from './AppointmentLogDataTable'
import AppointmentLogHoc from './AppointmentLogHoc'
import {Col, Container} from 'react-bootstrap';
import {RevenueDetailsTotalBlock} from "@frontend-appointment/ui-components";

const AppointmentRefundLog = props => {
    const AppointmentLog = AppointmentLogHoc(
        ({searchHandler, paginationProps, tableHandler, appointmentStatistics}) => (
            <>
                <div>
                    <AppointmentLogSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <AppointmentLogDataTable
                        tableHandler={tableHandler}
                        paginationProps={paginationProps}
                    />
                </div>
                {
                    tableHandler.appointmentLogList && tableHandler.appointmentLogList.length ?
                        <RevenueDetailsTotalBlock appointmentStatistics={{
                            ...appointmentStatistics,
                            totalRecords: paginationProps.totalRecords
                        }}/>
                        : ""}
            </>
        ),
        props,
        ''
    )

    return <AppointmentLog/>
}

export default AppointmentRefundLog
