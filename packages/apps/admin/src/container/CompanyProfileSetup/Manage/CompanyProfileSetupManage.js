import React from 'react';
import CompanyProfileSetupHOC from "../CompanyProfileSetupHOC";
import CompanyProfileSetupSearchFilter from "./CompanyProfileSetupSearchFilter";
import CompanyProfileSetupDataTable from "./CompanyProfileSetupDataTable";
import CompanyProfileSetupEditModal from "./CompanyProfileSetupEditModal";

const CompanyProfileSetupManage = props => {
    const CompanyProfileSetupManage = CompanyProfileSetupHOC(
        ({
             searchData,
             tableData,
             updateData,
             commonData,
             profileInfoFormData,
             profileMenuAssignmentData,
         }) => <>
            <div className="">
                <CompanyProfileSetupSearchFilter searchData={searchData}/>
            </div>
            <div className=" mb-2">
                <CompanyProfileSetupDataTable tableData={tableData}/>
                {
                    updateData.showEditModal ?
                        <CompanyProfileSetupEditModal
                            profileInfoFormData={profileInfoFormData}
                            updateData={updateData}
                            commonData={commonData}
                            profileMenuAssignmentData={profileMenuAssignmentData}
                        />
                        : ''
                }
            </div>
        </>,
        props,
        'MANAGE'
    );

    return <CompanyProfileSetupManage/>
};

export default CompanyProfileSetupManage;
