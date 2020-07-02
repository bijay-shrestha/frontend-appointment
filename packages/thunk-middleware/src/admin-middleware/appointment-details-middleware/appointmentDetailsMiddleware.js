import {AppointmentDetailActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
import {APIUtils, CommonUtils} from '@frontend-appointment/helpers'
import {constructAppointmentCheckInData} from './prepareAppointmentCheckInData';
import {GenericThirdPartyApiMiddleware, MinioMiddleware} from '../../../index'
import {constructAppointmentRefundData} from './prepareAppointmentRefundData'

export const fetchAppointmentRefundList = (
    path,
    pagination,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRefundFetchingStart())
    try {
        const response = await Axios.putWithPagination(path, pagination, data)
        let refundAppointments = response.data.refundAppointments ? response.data.refundAppointments : response.data.cancelledAppointments
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(refundAppointments, pagination.page, pagination.size)
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "fileUri");
        dispatch(
            AppointmentDetailActions.appointmentRefundFetchingSuccess({
                ...response.data,
                refundAppointments: dataWithPresignedUrl,
            })
        )
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentRefundFetchingError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
}

export const clearAppointmentRefundPending = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentSuccessMessage())
}

export const fetchAppointmentApprovalList = (
    path,
    pagination,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentApprovalFetchingStart())
    try {
        const response = await Axios.putWithPagination(path, pagination, data)
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(response.data.pendingAppointmentApprovals || response.data,
            pagination.page, pagination.size);
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "fileUri");
        dispatch(
            AppointmentDetailActions.appointmentApprovalFetchingSuccess({
                pendingAppointmentApprovals: dataWithPresignedUrl,
                totalItems: response.data.totalItems || response.data[0].totalItems
            })
        )
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentApprovalFetchingError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
}

export const thirdPartyApiCallCheckIn = async (data, featureTypeCode, integrationType, clientId) => {
    const requestBodies = APIUtils.getIntegrationValue('requestBody');
    const constructedData = constructAppointmentCheckInData(data, requestBodies)
    try {
        return await GenericThirdPartyApiMiddleware.genericThirdPartyApiCall(
            data,
            featureTypeCode,
            integrationType,
            clientId,
            constructedData);
    } catch (e) {
        console.log("==========",e)
        throw e
    }
}

export const thirdPartyApiCallRefund = async (data, featureTypeCode, integrationType, isRefund, hmacApi) => {
    const requestBodies = APIUtils.getIntegrationValue('requestBody');
    const constructedData = constructAppointmentRefundData(data, requestBodies, isRefund);
    try {
        return await GenericThirdPartyApiMiddleware.genericThirdPartyApiCall(
            data,
            featureTypeCode,
            integrationType,
            data.hospitalId,
            constructedData,
            "%s",
            data.transactionNumber,
            hmacApi);
    } catch (e) {
        throw e
    }
}

export const appointmentApproveIntegration = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentApproveStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            AppointmentDetailActions.appointmentApproveSuccess(response.data)
        )
    } catch (e) {
        // console.log(e)
        dispatch(
            AppointmentDetailActions.appointmentApproveError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
        throw e;
    }
}

export const fetchAppointmentApprovalDetailByAppointmentId = (
    path,
    appointmentId
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentApprovaldDetailFetchingStart())
    try {
        const response = await Axios.getWithPathVariables(path, appointmentId)
        let dataWithFileUri = response.data
        dataWithFileUri.fileUri = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.fileUri)
        dispatch(
            AppointmentDetailActions.appointmentApprovalDetailFetchingSuccess(
                dataWithFileUri
            )
        )
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentApprovalDetailFetchingError(
                e.errorMessage ? e.errorMessage : 'Sorry,Internal Server problem!'
            )
        )
    }
}

export const clearAppointmentApprovalMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentApprovalMessage())
}

export const fetchAppointmentLogList = (
    path,
    pagination,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentLogFetchingStart())
    try {
        const response = await Axios.putWithPagination(path, pagination, data)
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(response.data.appointmentLogs,
            pagination.page, pagination.size);
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "fileUri");
        dispatch(
            AppointmentDetailActions.appointmentLogFetchingSuccess({
                ...response.data,
                appointmentLogs: dataWithPresignedUrl
            })
        )
    } catch (e) {
        console.log(e)
        dispatch(
            AppointmentDetailActions.appointmentLogFetchingError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
}

export const clearAppointmentLogMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentLogMessage())
}

export const fetchAppointmentStatusList = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentStatusFetchingStart())
    try {
        const response = await Axios.put(path, data)
        let dataWithFileUri = await MinioMiddleware.getDataListWithPresignedFileUri(response.data.doctorInfo, 'fileUri')
        dispatch(
            AppointmentDetailActions.appointmentStatusFetchingSuccess({...response.data, doctorInfo: dataWithFileUri})
        )
        return response.data
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentStatusFetchingError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
}

const getDepartmentAndDoctorInfosWithPresignedUrl = async hospitalDeptAndDoctorInfo => {
    const doctorInfoWithPresignedUrl = hospitalDeptAndDoctorInfo.map(async hospitalDeptAndDoctor => {
        hospitalDeptAndDoctor.doctorInfo = await MinioMiddleware.getDataListWithPresignedFileUri(hospitalDeptAndDoctor.doctorInfo, 'fileUri')
        return hospitalDeptAndDoctor;
    })
    return Promise.all(doctorInfoWithPresignedUrl)
}

export const fetchAppointmentStatusListByDepartment = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentStatusByDepartmentSearchPending())
    try {
        const response = await Axios.put(path, data)
        const doctorInfoWithPresignedUrl = await getDepartmentAndDoctorInfosWithPresignedUrl(response.data.hospitalDeptAndDoctorInfo)
        dispatch(
            AppointmentDetailActions.appointmentStatusByDepartmentSearchSuccess(
                {...response.data, hospitalDeptAndDoctorInfo: doctorInfoWithPresignedUrl})
        )
        return response.data
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentStatusByDepartmentSearchError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
}

export const fetchAppointmentStatusListByRoom = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentStatusByRoomSearchPending())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            AppointmentDetailActions.appointmentStatusByRoomSearchSuccess(response.data)
        )
        return response.data
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentStatusByRoomSearchError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
}

export const clearAppointmentStatusMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentStatusMessage())
}

export const appointmentRejectRefund = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRefundRejectStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            AppointmentDetailActions.appointmentRefundRejectSuccess(
                'Refund Reject Successfully'
            )
        )
        return response
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentRefundRejectError(
                e.errorMessage || e.message || 'Sorry Internal Server Problem'
            )
        )
        throw e
    }
}

export const appointmentRefund = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRefundStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            AppointmentDetailActions.appointmentRefundSuccess('Refunded Successfully')
        )
        return response
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentRefundError(
                e.errorMessage || e.message || 'Sorry Internal Server Problem'
            )
        )
        throw e
    }
}

export const clearAppointmentRefundRejectMessage = () => async dispatch => {
    dispatch({type: 'CLEAR_REFUND_REJECT_MESSAGE'})
}

export const clearAppointmentRefundMessage = () => async dispatch => {
    dispatch({type: 'CLEAR_REFUND_MESSAGE'})
}

export const searchRescheduleLog = (
    path,
    paginationData,
    searchParam
) => async dispatch => {
    dispatch(AppointmentDetailActions.searchRescheduleStart())
    try {
        const response = await Axios.putWithPagination(
            path,
            paginationData,
            searchParam
        )
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(response.data.appointmentRescheduleLogDTOS,
            paginationData.page, paginationData.size);
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "fileUri");
        dispatch(AppointmentDetailActions.searchRescheduleSuccess({
            ...response.data,
            appointmentRescheduleLogDTOS: dataWithPresignedUrl
        }))
        return response.data
    } catch (e) {
        dispatch(
            AppointmentDetailActions.searchRescheduleError(
                e.errorMessage ? e.errorMessage : 'Sorry internal server error!'
            )
        )
        throw e
    }
}
export const clearRescheduleLogMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearRescheduleLogMessage())
}

export const appointmentApprove = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentApproveStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(AppointmentDetailActions.appointmentApproveSuccess('Checked-In Successfully'))
        return response
    } catch (e) {
        console.log(e)
        dispatch(AppointmentDetailActions.appointmentApproveError(
            e.errorMessage ? e.errorMessage : 'Sorry Internal Server Problem'))
        throw e
    }
}

export const appointmentReject = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRejectStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(AppointmentDetailActions.appointmentRejectSuccess('Appointment Reject Successfully'))
        return response
    } catch (e) {
        dispatch(AppointmentDetailActions.appointmentRejectError(
            e.errorMessage ? e.errorMessage : 'Sorry Internal Server Problem'))
        throw e
    }
}

export const clearAppointmentRejectMessage = () => async dispatch => {
    dispatch({type: 'CLEAR_APPOINTMENT_REJECT_MESSAGE'})
}

export const clearAppointmentApproveMessage = () => async dispatch => {
    dispatch({type: 'CLEAR_APPOINTMENT_APPROVE_MESSAGE'})
}

export const fetchAppointmentRefundDetailByAppointmentId = (
    path,
    appointmentId
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRefundDetailFetchingStart())
    try {
        const response = await Axios.getWithPathVariables(path, appointmentId)
        dispatch(AppointmentDetailActions.appointmentRefundDetailFetchingSuccess(response.data))
    } catch (e) {
        dispatch(AppointmentDetailActions.appointmentRefundDetailFetchingError(
            e.errorMessage ? e.errorMessage : 'Sorry,Internal Server problem!'))
            throw e;
    }
}

export const clearAppointmentRefundDetailMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentRefundDetailMessage())
}

export const fetchTransactionLogList = (
    path,
    pagination,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.transactionLogFetchingStart())
    try {
        const response = await Axios.putWithPagination(path, pagination, data)
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(response.data.transactionLogs,
            pagination.page, pagination.size);
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "fileUri");
        dispatch(
            AppointmentDetailActions.transactionLogFetchingSuccess({
                ...response.data,
                transactionLogs: dataWithPresignedUrl
            })
        )
    } catch (e) {
        console.log(e)
        dispatch(
            AppointmentDetailActions.transactionLogFetchingError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
}

export const clearTransactionLogMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearTransactionLogMessage())
}


export const fetchDepartmentAppointmentStatusCount = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.fetchAppointmentStatusCountByDepartmentPending())
    try {
        const response = await Axios.put(path, data);
        dispatch(AppointmentDetailActions.fetchAppointmentStatusCountByDepartmentSuccess(response.data))
        return response.data;
    } catch (e) {
        dispatch(AppointmentDetailActions.fetchAppointmentStatusCountByDepartmentError(
            e.errorMessage || 'Sorry Internal Server Problem'))
        throw e
    }
}
