import React from 'react'
import './let.css';
import kaushal from './kaushal.jpeg'
class AppointmentCheckInPrint extends React.PureComponent {
  render () {
    const {data} = this.props
    return (
      <div
       className="outPopUp"
      >
        <img src={kaushal} alt="patientImage"></img>
        <p> Name: {data.patientName} </p>
        <p> Age: {data.patientAge} </p>
        <p> Sex: {data.patientGender} </p>
        <p> Number: {data.appointmentNumber} </p>
      </div>
    )
  }
}
export default AppointmentCheckInPrint
