import React from 'react'
import './print.scss';
import kaushal from './kaushal.jpeg'
class AppointmentCheckInPrint extends React.PureComponent {
  render () {
    const {data} = this.props
    return (
      <div
       className="outPopUp"
      >
        {/* <img src={kaushal} alt="patientImage" className="patient-image"></img> */}
        <p> Name: {data.patientName} </p>
        <p> Age: {data.patientAge} </p>
        <p> Sex: {data.patientGender} </p>
        <p>Appt. Number: {data.appointmentNumber} </p>
      </div>
    )
  }
}
export default AppointmentCheckInPrint
