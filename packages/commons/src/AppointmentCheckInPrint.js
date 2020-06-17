import React from 'react'
import './print.scss';
class AppointmentCheckInPrint extends React.PureComponent {
  render () {
    const {data} = this.props
    return (
      <div
       className="outPopUp"
      >
        <div className="appt-detail">
        <p>Appt. Number:<span> {data.appointmentNumber}</span> </p>
        <p>Appt. Date:<span> May 13,2020 , 11.50 PM</span> </p>
        </div>
       <div className="patient-detail">
        <p> Name: <span>{data.patientName}</span> </p>
        <p> Address: <span>Kohalpur,Nepalgunj</span></p>
        <p> Age: <span>{data.patientAge}</span> </p>        
        <p> Sex: <span>{data.patientGender} </span></p>
       </div>
        
       
      </div>
    )
  }
}
export default AppointmentCheckInPrint
