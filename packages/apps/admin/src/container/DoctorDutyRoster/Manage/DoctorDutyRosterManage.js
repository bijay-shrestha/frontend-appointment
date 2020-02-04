import React from 'react';
import DoctorDutyRosterSearchFilter from "./DoctorDutyRosterSearchFilter";
import DoctorDutyRosterDataTable from "./DoctorDutyRosterDataTable";
import DoctorDutyRosterHOC from "../DoctorDutyRosterHOC";
import "./../doctor-duty-roster.scss";

function DoctorDutyRosterManage(props) {
    const DoctorDutyRosterManage = DoctorDutyRosterHOC(
        ({}) =>
            <>
                <DoctorDutyRosterSearchFilter/>
                <DoctorDutyRosterDataTable/>
            </>
        , props);
    return <DoctorDutyRosterManage/>;

}

export default DoctorDutyRosterManage
