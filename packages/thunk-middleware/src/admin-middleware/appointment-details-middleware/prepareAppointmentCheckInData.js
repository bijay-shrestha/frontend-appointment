import {StringUtils} from '@frontend-appointment/helpers'

export const constructAppointmentCheckInData = (data, requestBody) => {
    // console.log("data",data);
    requestBody.name = data.patientName;
    requestBody.age = data.patientAge ? Number(data.patientAge.replace("years", "")) : data.age;
    requestBody.wardNo = data.wardNumber
    requestBody.roomNo = data.roomNumber && data.roomNumber.includes('-') ? (data.roomNumber.split('-')[1]).trim() : data.roomNumber
    requestBody.patientId = data.hospitalNumber || ''
    requestBody.sex = StringUtils.toTitleCase(data.gender || data.patientGender)
    requestBody.section = data.hospitalDepartmentName || ''
    requestBody.mobileNo = data.mobileNumber || ''
    requestBody.appointmentNo = data.appointmentNumber
    requestBody.phoneNo = data.mobileNumber
    requestBody.email = data.emailAddress || 'abc@gmail.com'
    requestBody.vdc = "Kathmandu Metro"  //data.vdcOrMunicipality
    requestBody.district = "Kathmandu"// data.district
    requestBody.ageDay = data.ageDay
    requestBody.ageMonth = data.ageMonth;
    requestBody.address = data.address
    return requestBody;
}
