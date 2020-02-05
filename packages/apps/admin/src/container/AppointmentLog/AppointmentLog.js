import React, { PureComponent } from 'react';
import AppointmentLogSearchFilter from "./AppointmentLogSearchFilter";
import AppointmentLogDataTable from "./AppointmentLogDataTable";
import { Col, Container, Row } from "react-bootstrap";

import "./appointment-log.scss";

class AppointmentLog extends PureComponent {


    render() {

        return <>
            <div>

            <AppointmentLogSearchFilter/>
                </div>

            <div className="">
                <AppointmentLogDataTable/>
                </div>
        </>

    }

}
export default AppointmentLog














