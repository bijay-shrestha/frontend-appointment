export const DoctorRevenueAppointmentAmount = props => {
    const {successfulAppointments,cancelledAppointments}=props.node.data 
     return(
       <ul>
        <li>Successfull Appointments:{successfulAppointments}</li>
        <li>Cancelled Appointments:{cancelledAppointments}</li>   
       </ul>
   )
 }