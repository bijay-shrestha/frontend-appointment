import {StringUtils} from '@frontend-appointment/helpers'

export const constructAppointmentCheckInData = (data, requestBody) => {
    // console.log("data",data);
    requestBody.name = data.patientName;
    requestBody.age = Number(data.patientAge ? data.patientAge.replace("years", "") : data.age);
    requestBody.wardNo = data.ward ? data.ward : "0"
    requestBody.roomNo = data.roomNumber ? data.roomNumber : '10'
    requestBody.patientId = data.hospitalNumber
    requestBody.sex = StringUtils.toTitleCase(data.patientGender ? data.patientGender : data.gender)
    requestBody.section = data.hospitalDepartmentName ? data.hospitalDepartmentName : "ENT"
    requestBody.mobileNo = data.mobileNumber
    requestBody.appointmentNo = data.appointmentNumber
    requestBody.phoneNo = data.mobileNumber
    requestBody.emailAddress = "abc@fakemail.com"
    requestBody.vdc = "Kathmandu Metro"
    requestBody.district = "Kathmandu"
    requestBody.ageDay = data.ageDay ? data.ageDay : "0"
    requestBody.ageMonth = data.ageMonth ? data.ageMonth : "0";
    requestBody.address = data.address ? data.address: "Samakhushi"
    return requestBody;
}
