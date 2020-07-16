import React from 'react'
import './print.scss';

class AppointmentCheckInPrint extends React.PureComponent {
    render() {
        const {
            appointmentNumber, appointmentDate, appointmentTime, roomNumber, hospitalDepartmentName,
            patientName, address, vdcOrMunicipality, district, province, age, ageMonth, ageDay, gender
        } = this.props.data
        return (
            <div
                class="outPopUp">
                <div class="appt-detail">
                    <p class="title">Appt. Details</p>
                    <p>Appt. No :<span> {appointmentNumber}</span></p>
                    <p>Appt. Date:<span> {appointmentDate} ,{appointmentTime}</span></p>
                    <p>Room No:<span> {roomNumber}</span></p>
                    <p>Department:<span>{hospitalDepartmentName}</span></p>

                </div>
                <div class="separtor"></div>
                <div class="patient-detail">
                    <p class="title">Patient Details</p>
                    <p> Name: <span>{patientName}</span></p>
                    <p> Address: <span>{address}, {vdcOrMunicipality}, {district}, {province}</span></p>
                    <p> Age: <span>{age} yrs, {ageMonth} month, {ageDay} days</span></p>
                    <p> Sex: <span>{gender}</span></p>
                </div>


            </div>

        )
    }
}

export default AppointmentCheckInPrint
