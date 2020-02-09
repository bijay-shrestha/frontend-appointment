
import React, { PureComponent } from 'react';

import { Col, Container, Row ,Badge} from "react-bootstrap";
import { CButton,CDataTable} from "@frontend-appointment/ui-elements";
import "./appointment-log.scss";

class AppointmentLogDataTable extends PureComponent {


    render() {

        return <>
           <div className="manage-details">
               <Container fluid>  
               <Row>
                   <Col className="p-0"><h5 className="title">Appointment Log Details</h5></Col>
                   <Col>
                   <CButton
                    id="downloadExcel"
                    name="DownloadExcel"
                    // onClickHandler={props.exportExcel}
                    className="float-right"
                    variant='outline-secondary'
                > <i className='fa fa-download'/>
                </CButton>
                </Col>
                </Row>    
                  
           
                     
         <Row>
            <Col >
            <div className="appointment-badge float-right">
            <span><Badge variant="primary">PA</Badge> : Pending Approval</span>
            <span><Badge variant="success">A</Badge> : Approved</span>
            <span><Badge variant="danger">C</Badge> : Canceled</span>
            <span><Badge variant="warning">RE</Badge> : Rejected</span>
            <span><Badge variant="dark">R</Badge> : Refunded</span>
            </div>
            </Col>
        
            </Row>
            <Row>
                   {/* <div>
           <CDataTable
                    classes="ag-theme-balham"
                    id="roles-table"
                    width="100%"
                    height="460px"
                    enableSorting
                    editType
                    />
           </div> */}
            </Row>
            </Container>
            </div>

           
          
           

          
</>

    }

}
export default AppointmentLogDataTable