import React from 'react';
import CompanyProfileSetupHOC from "../CompanyProfileSetupHOC";

const CompanyProfileSetupManage = props => {
    const CompanyProfileSetupManage = CompanyProfileSetupHOC(
        ({}) => <></>,
        props,
        'MANAGE'
    );

    return <CompanyProfileSetupManage/>
};

export default CompanyProfileSetupManage;
