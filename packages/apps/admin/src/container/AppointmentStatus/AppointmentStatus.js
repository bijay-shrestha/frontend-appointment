import React, { PureComponent } from 'react';
import AppointmentStatusSearchFilter from "./AppointmentStatusSearchFilter";
import AppointmentStatusDataTable from "./AppointmentStatusDataTable";
import { Col, Container, Row } from "react-bootstrap";

import "./appointment-status.scss";

class AppointmentStatus extends PureComponent {


    render() {

        return <>
            <div>
            <AppointmentStatusSearchFilter/>

            </div>

            <div className="">
                <AppointmentStatusDataTable/>
                </div>
        </>

    }

}
export default AppointmentStatus














