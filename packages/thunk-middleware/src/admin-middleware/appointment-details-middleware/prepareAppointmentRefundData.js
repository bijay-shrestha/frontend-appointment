export const constructAppointmentRefundData = (data, requestBody,isRefund) => {
    requestBody.txn_amount = data.appointmentCharge;
    requestBody.refund_amount = data.refundAmount ? data.refundAmount : '';
    requestBody.product_code = "BHERI"
    requestBody.esewa_id = data.esewaId ? data.esewaId : ''
    requestBody.is_refund = isRefund
    requestBody.remarks = ''
    requestBody.properties = {
        hospitalName: data.hospitalName,
        appointmentId: data.appointmentId
    }
    return requestBody;
}
