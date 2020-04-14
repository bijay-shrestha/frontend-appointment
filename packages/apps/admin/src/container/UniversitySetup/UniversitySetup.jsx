import React from 'react';
import UniversitySetupHOC from "./UniversitySetupHOC";
import UniversitySetupSearchFilter from "./UniversitySetupSearchFilter";
import UniversitySetupDataTable from "./UniversitySetupDataTable";

const UniversitySetup = (props) => {
    const UniversitySetup = UniversitySetupHOC(
        ({
             searchParams,
             tableData,
             filteredAction
         }) =>
            <>
                <UniversitySetupSearchFilter
                    searchData={searchParams}
                />
                <UniversitySetupDataTable
                    tableData={tableData}
                    filteredAction={filteredAction}
                />
            </>
        , props);
    return <UniversitySetup/>;
};

export default UniversitySetup;
