import React from 'react';
import BillingModeHOC from "./BillingModeHOC";
import BillingModeSearchFilter from "./BillingModeSearchFilter";
import BillingModeDataTable from "./BillingModeDataTable";

const BillingMode = (props) => {
    const BillingMode = BillingModeHOC(
        ({
             filteredAction,
             searchData,
             tableData,
         }) =>
            <>
                <BillingModeSearchFilter searchData={searchData}/>
                <BillingModeDataTable filteredAction={filteredAction} tableData={tableData}/>
            </>, props, '');
    return <BillingMode/>
};

export default BillingMode;
