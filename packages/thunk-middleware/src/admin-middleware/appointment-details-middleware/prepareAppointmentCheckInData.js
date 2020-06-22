import {StringUtils} from '@frontend-appointment/helpers'
export const constructAppointmentCheckInData =(data,requestBody)=>{
  // console.log("data",data);
  requestBody.name=data.patientName+""+Math.random();
  requestBody.age=data.patientAge?Number(data.patientAge.replace("years","")):data.age;
  requestBody.wardNo="5"
  requestBody.roomNo= "10"
  requestBody.patientId= data.hospitalNumber
  requestBody.sex= StringUtils.toTitleCase(data.patientGender||data.gender)
  requestBody.section= "ENT"
  requestBody.mobileNo= data.mobileNumber
  requestBody.appointmentNo= data.appointmentNumber
  requestBody.phoneNo= data.mobileNumber
  requestBody.emailAddress="abc@fakemail.com"
  requestBody.vdc= "Kathmandu Metro"
  requestBody.district= "Kathmandu"
  requestBody.ageDay= 3
  requestBody.ageMonth= 1;
  requestBody.address="Samakhushi"
  return requestBody;
}
