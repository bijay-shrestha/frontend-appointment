import React from 'react'
import './print.scss';
class AppointmentCheckInPrint extends React.PureComponent {
  render () {
    //const {data} = this.props
    return (
      // <div
      //  className="outPopUp"
      // >
      // <div className="appt-detail">
      //   <p>Appt. Number:<span> {data.appointmentNumber}</span> </p>
      //   <p>Appt. Date:<span> May 13,2020 , 11.50 PM</span> </p>
      //   <p>Dr. Sanjeev Upreti , Ortho </p>
      //   </div>
      // <div className="separtor"></div>
      //  <div className="patient-detail">
      //   <p> Name: <span>{data.patientName}</span> </p>
      //   <p> Address: <span>Kohalpur,Nepalgunj</span></p>
      //   <p> Age: <span>{data.patientAge}</span> </p>        
      //   <p> Sex: <span>{data.patientGender} </span></p>
      //  </div>      
      // </div>

      <div
      class="outPopUp">
     <div class="appt-detail">
         <p class="title">Appt. Details</p>
       <p>Appt. No :<span> 1213213213</span> </p>
       <p>Appt. Date:<span> May 13,2020 , 11.50 PM</span> </p>
       <p>Room No:<span> 5</span> </p>
       <p>Dr. Sanjeev Upreti , Ortho </p>
    
       </div>
     <div class="separtor"></div>
      <div class="patient-detail">
        <p class="title">Patient Details</p>
       <p> Name: <span>Sudin Shakya</span> </p>
       <p> Address: <span>Kohalpur,Nepalgunj</span></p>
       <p> Age: <span>45yrs</span> </p>        
       <p> Sex: <span>Male</span></p>
      </div>

       
      
     </div>
  
    )
  }
}
export default AppointmentCheckInPrint
