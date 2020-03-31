import React from 'react';
import CompanyProfileSetupHOC from "../CompanyProfileSetupHOC";
import CompanyProfileSetupSearchFilter from "./CompanyProfileSetupSearchFilter";
import CompanyProfileSetupDatTable from "./CompanyProfileSetupDataTable";

const CompanyProfileSetupManage = props => {
    const CompanyProfileSetupManage = CompanyProfileSetupHOC(
        ({
             searchData,
             tableData
         }) => <>
            <div className="">
                <CompanyProfileSetupSearchFilter searchData={searchData}/>
            </div>
            <div className=" mb-2">
                <CompanyProfileSetupDatTable tableData={tableData}/>
            </div>
        </>,
        props,
        'MANAGE'
    );

    return <CompanyProfileSetupManage/>
};

export default CompanyProfileSetupManage;
