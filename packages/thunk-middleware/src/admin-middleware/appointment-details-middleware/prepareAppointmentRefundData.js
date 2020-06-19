import {StringUtils} from '@frontend-appointment/helpers'
export const constructAppointmentRefundData =(data,requestBody)=>{
    requestBody.txn_amount= data.patientName;
    requestBody.refund_amount=Number(data.patientAge.replace("years",""));
    requestBody.product_code="5"
    requestBody.esewa_id= "10"
    requestBody.is_refund= data.hospitalNumber
    requestBody.remarks= StringUtils.toTitleCase(data.patientGender)
    requestBody.properties= {
        hospitalName:'',
        appointmentId:''
    }
    return requestBody;
}
