import React from 'react';
import AppointmentModeSearchFilter from "./AppointmentModeSearchFilter";
import AppointmentModeDataTable from "./AppointmentModeDataTable";
import AppointmentModeHOC from "./AppointmentModeHOC";

const AppointmentMode = (props) => {
    const AppointmentMode = AppointmentModeHOC(
        ({
             searchParams,
             tableData,
             filteredAction
         }) =>
            <>
                <AppointmentModeSearchFilter
                    searchData={searchParams}
                />
                <AppointmentModeDataTable
                    tableData={tableData}
                    filteredAction={filteredAction}
                />
            </>
        , props);
    return <AppointmentMode/>;
};

export default AppointmentMode;
