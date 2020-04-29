export const DoctorRevenueNoOfAppointments = props => {
    const {successfulAppointments,cancelledAppointments,totalAppointments}=props.node.data 
     return(
       <div>
       <p id="appointmentNumberId" className="showTotal">Total Appointments:{totalAppointments}</p>  
       <ul id="appointmentBreakDownId" className="hideTotal">
        <li>Successfull Appointments:{successfulAppointments}</li>
        <li>Cancelled Appointments:{cancelledAppointments}</li>   
       </ul>
      </div> 
   )
 }