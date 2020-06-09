import React from 'react';
import HospitalDepartmentSetupHOC from "../HospitalDepartmentSetupHOC";
import {HospitalDepartmentSetupComponents} from "@frontend-appointment/ui-components";

const HospitalDepartmentManage = props => {
    const HospitalDepartmentManage = HospitalDepartmentSetupHOC(
        ({
             searchData,
             tableData,
             updateData,
             departmentChargeProps
         }) =>
            <>
                <div className="">
                    <HospitalDepartmentSetupComponents.HospitalDepartmentSetupSearchFilter searchData={searchData}/>
                </div>
                <div className=" mb-2">
                    <HospitalDepartmentSetupComponents.HospitalDepartmentSetupDataTable tableData={tableData}/>
                </div>
                {
                    updateData.showEditModal ?
                        <HospitalDepartmentSetupComponents.HospitalDepartmentSetupEditModal
                            updateData={updateData}
                            departmentChargeProps={departmentChargeProps}/>
                        :''
                }

            </>,
        props, 'MANAGE');

    return <HospitalDepartmentManage/>
};

export default HospitalDepartmentManage;
