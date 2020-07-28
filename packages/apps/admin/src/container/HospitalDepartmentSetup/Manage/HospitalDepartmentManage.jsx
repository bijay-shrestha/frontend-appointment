import React from 'react';
import HospitalDepartmentSetupHOC from "../HospitalDepartmentSetupHOC";
import {DepartmentSetupComponents} from "@frontend-appointment/ui-components";

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
                    <DepartmentSetupComponents.DepartmentSetupSearchFilter searchData={searchData}/>
                </div>
                <div className=" mb-2">
                    <DepartmentSetupComponents.DepartmentSetupDataTable tableData={tableData}/>
                </div>
                {
                    updateData.showEditModal ?
                        <DepartmentSetupComponents.DepartmentSetupEditModal
                            updateData={updateData}
                            departmentChargeProps={departmentChargeProps}/>
                        :''
                }

            </>,
        props, 'MANAGE');

    return <HospitalDepartmentManage/>
};

export default HospitalDepartmentManage;
