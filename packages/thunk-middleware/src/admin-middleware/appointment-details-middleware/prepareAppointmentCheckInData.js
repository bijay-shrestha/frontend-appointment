import {StringUtils} from '@frontend-appointment/helpers'
export const constructAppointmentCheckInData =(data,requestBody)=>{
  // console.log("data",data);
  requestBody.name=data.patientName+""+Math.random();
  requestBody.age=data.patientAge?Number(data.patientAge.replace("years","")):data.age;
  requestBody.wardNo=data.wardNo
  requestBody.roomNo= data.roomNo
  requestBody.patientId= data.hospitalNumber
  requestBody.sex= StringUtils.toTitleCase(data.patientGender||data.gender)
  requestBody.section= data.section
  requestBody.mobileNo= data.mobileNumber
  requestBody.appointmentNo= data.appointmentNumber
  requestBody.phoneNo= data.mobileNumber
  requestBody.emailAddress=data.emailAddress
  requestBody.vdc= data.vdc
  requestBody.district= data.district
  requestBody.ageDay= data.ageDay
  requestBody.ageMonth= data.ageMonth;
  requestBody.address=data.address
  return requestBody;
}
