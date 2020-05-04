import React from 'react'
import TransactionLogSearchFilter from './TransactionLogSearchFilter'
import TransactionLogDataTable from './TransactionLogDataTable'
import TransactionLogHoc from './TransactionLogHoc'
//import {Col, Container} from 'react-bootstrap';
import {RevenueDetailsTotalBlock} from "@frontend-appointment/ui-components";

const TransactionLog = props => {
    const TransactionLog = TransactionLogHoc(
        ({searchHandler, paginationProps, tableHandler, appointmentStatistics}) => (
            <>
                <div>
                    <TransactionLogSearchFilter searchHandler={searchHandler}/>
                </div>

                <div className="">
                    <TransactionLogDataTable
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
                        : ""
                }
            </>
        ),
        props,
        ''
    )

    return <TransactionLog/>
}

export default TransactionLog
