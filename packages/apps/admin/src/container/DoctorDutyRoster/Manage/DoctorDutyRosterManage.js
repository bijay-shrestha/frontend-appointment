import React, { PureComponent } from 'react';
import { Col, Container, Row ,Form} from "react-bootstrap";
import "./../doctor-duty-roster.scss";
import {CFLabel, CForm, CHybridInput,
     CHybridSelect, CRadioButton, CInputGroup, 
     CDataTable,
    CButton, CCheckbox} 
    from "@frontend-appointment/ui-elements";
import DoctorDutyRosterSearchFilter   from "./DoctorDutyRosterSearchFilter";
import DoctorDutyRosterDataTable from "./DoctorDutyRosterDataTable";
import EditDoctorDutyRoster from "./EditDoctorDutyRoster";

class DoctorDutyRosterManage extends PureComponent {
   
    render() {
       
        return <>
         <DoctorDutyRosterSearchFilter/>
         <DoctorDutyRosterDataTable/>
        </>

        }
    }

    export default DoctorDutyRosterManage         
