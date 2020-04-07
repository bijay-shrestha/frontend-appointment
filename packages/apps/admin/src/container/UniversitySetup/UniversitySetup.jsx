import React from 'react';
import UniversitySetupHOC from "./UniversitySetupHOC";
import UniversitySetupSearchFilter from "./UniversitySetupSearchFilter";

const UniversitySetup = (props) => {
    const UniversitySetup = UniversitySetupHOC(({searchParams}) =>
            <>
                <UniversitySetupSearchFilter
                    searchData={searchParams}
                />
            </>
        , props);
    return <UniversitySetup/>;
};

export default UniversitySetup;
