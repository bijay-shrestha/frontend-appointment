export const constructAppointmentRefundData = (data, requestBody, isRefund) => {
    requestBody.txn_amount = data.appointmentCharge;
    requestBody.refund_amount = data.refundAmount ? data.refundAmount : '';
    requestBody.product_code = data.esewaMerchantCode ? data.esewaMerchantCode : "BHERI"
    requestBody.esewa_id = data.esewaId ? data.esewaId : ''
    requestBody.is_refund = isRefund
    requestBody.remarks = data.remarks ? data.remarks : ''
    requestBody.properties = {
        hospitalName: data.hospitalName,
        appointmentId: data.appointmentId
    }
    return requestBody;
}
