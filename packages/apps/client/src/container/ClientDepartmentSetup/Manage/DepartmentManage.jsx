import React from 'react';
import DepartmentSetupHOC from "../DepartmentSetupHOC";
import {DepartmentSetupComponents} from "@frontend-appointment/ui-components";

const DepartmentManage = props => {
    const HospitalDepartmentManage = DepartmentSetupHOC(
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
                        : ''
                }

            </>,
        props, 'MANAGE');

    return <HospitalDepartmentManage/>
};

export default DepartmentManage;
