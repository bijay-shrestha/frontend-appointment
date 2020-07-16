import React from 'react';
export const DepartmentRevenueNoOfAppointments = props => {
    const {successfulAppointments,cancelledAppointments,totalAppointments}=props.node.data 
     return(
      
       <div id="appointmentNumberId" className="dr-number">{totalAppointments}
       <ul id="appointmentBreakDownId" className="dr-details">
        <li><i className="fa fa-check-circle-o"></i>{successfulAppointments}</li>
        <li><i className="fa fa-close"></i>{cancelledAppointments}</li>   
       </ul>
       </div>  
     
   )
 }