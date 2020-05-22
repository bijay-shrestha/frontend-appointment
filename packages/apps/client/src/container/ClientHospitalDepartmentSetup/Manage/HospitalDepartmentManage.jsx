import React from 'react';
import HospitalDepartmentSetupHOC from "../HospitalDepartmentSetupHOC";
import {HospitalDepartmentSetupComponents} from "@frontend-appointment/ui-components";

const HospitalDepartmentManage = props => {
    const HospitalDepartmentManage = HospitalDepartmentSetupHOC(
        ({
             searchData,
             tableData
         }) =>
            <>
                <div className="">
                    <HospitalDepartmentSetupComponents.HospitalDepartmentSetupSearchFilter searchData={searchData}/>
                </div>
                <div className=" mb-2">
                    <HospitalDepartmentSetupComponents.HospitalDepartmentSetupDataTable tableData={tableData}/>
                </div>

            </>,
        props, 'MANAGE');

    return <HospitalDepartmentManage/>
};

export default HospitalDepartmentManage;
