import React from 'react';
import RescheduleLogHOC from "./RescheduleLogHOC";
import RescheduleLogSearchFilter from "./RescheduleLogSearchFilter";
import RescheduleLogDataTable from "./RescheduleLogDataTable";


const RescheduleLog = props => {
    const RescheduleLog = RescheduleLogHOC(
        ({
             searchHandler,
             rescheduleLogData,
             paginationProps
         }) =>
            <>
                <div>
                    <RescheduleLogSearchFilter
                        searchHandler={searchHandler}/>
                </div>
                <div className="">
                    <RescheduleLogDataTable
                        rescheduleLogData={rescheduleLogData}
                        paginationProps={paginationProps}/>
                </div>
            </>,
        props, '');
    return <RescheduleLog/>
};
export default RescheduleLog;














