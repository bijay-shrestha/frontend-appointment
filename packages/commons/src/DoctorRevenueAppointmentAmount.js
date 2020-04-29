import React from 'react';

export const DoctorRevenueAppointmentAmount = props => {
   const {cancelledRevenue,doctorRevenue}=props.node.data 
    return(
      <ul>
       <li>Successfull Revenue:{cancelledRevenue}</li>
       <li>Cancelled Revenue:{doctorRevenue}</li>   
      </ul>
  )
}
