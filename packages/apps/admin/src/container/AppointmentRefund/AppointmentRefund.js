import React, { PureComponent } from 'react';
import AppointmentLogSearchFilter from "./AppointmentRefundSearchFilter";
import AppointmentLogDataTable from "./AppointmentRefundDataTable";
import AppointRefundApprovalHoc from "./AppointmentRefundApprovalHoc";
import { Col, Container, Row } from "react-bootstrap";

import "./appointment-log.scss";

const AppointmentRefundLog = props=> {
  const AppoinmentRefund = AppointRefundApprovalHoc(
  ({searchHandler,paginationProps,tableHandler})=>(
        <>
        <div>

        <AppointmentLogSearchFilter searchHandler={searchHandler}/>
            </div>

        <div className="">
            <AppointmentLogDataTable tableHandler={tableHandler}
            paginationProps={paginationProps}/>
            </div>
    </>

    ),
    props,""
  );

 return <AppoinmentRefund/>

} 

export default AppointmentRefundLog














