import React from 'react';
import UniversitySetupHOC from "./UniversitySetupHOC";

const UniversitySetup = (props) => {
    const UniversitySetup = UniversitySetupHOC(({}) =>
            <>
            </>
        , props);
    return <UniversitySetup/>;
};

export default UniversitySetup;
