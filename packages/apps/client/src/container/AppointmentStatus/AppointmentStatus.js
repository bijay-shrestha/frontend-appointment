import React from 'react';
import AppointmentStatusHOC from "./AppointmentStatusHOC";
import AppointmentStatusSearchFilter from "./AppointmentStatusSearchFilter";

import "./appointment-status.scss";
import AppointmentStatusDetails from "./AppointmentStatusDetails";

const AppointmentStatus = props => {
    const AppointmentStatus = AppointmentStatusHOC(
        ({
             searchHandler,
             statusDetailsData
         }) =>
            <>
                <div>
                    <AppointmentStatusSearchFilter
                        searchHandler={searchHandler}/>
                </div>
                <div className="">
                    <AppointmentStatusDetails
                        statusDetailsData={statusDetailsData}/>
                </div>
            </>,
        props, '');
    return <AppointmentStatus/>
};
export default AppointmentStatus














