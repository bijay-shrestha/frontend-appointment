import {AppointmentDetailActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'

export const fetchAppointmentRefundList = (
    path,
    pagination,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRefundFetchingStart());
    try {
        const response = await Axios.putWithPagination(path, pagination, data);
        dispatch(
            AppointmentDetailActions.appointmentRefundFetchingSuccess(response.data)
        )
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentRefundFetchingError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
};

export const clearAppointmentRefundPending = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentSuccessMessage())
};

export const fetchAppointmentApprovalList = (
    path,
    pagination,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentApprovalFetchingStart());
    try {
        const response = await Axios.putWithPagination(path, pagination, data);
        dispatch(
            AppointmentDetailActions.appointmentApprovalFetchingSuccess(response.data)
        )
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentApprovalFetchingError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
};

export const clearAppointmentApprovalMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentApprovalMessage())
};

export const fetchAppointmentLogList = (
    path,
    pagination,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentLogFetchingStart());
    try {
        const response = await Axios.putWithPagination(path, pagination, data);
        dispatch(
            AppointmentDetailActions.appointmentLogFetchingSuccess(response.data)
        )
    } catch (e) {
        console.log(e);
        dispatch(
            AppointmentDetailActions.appointmentLogFetchingError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
};

export const clearAppointmentLogMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentLogMessage())
};

export const fetchAppointmentStatusList = (path, data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentStatusFetchingStart());
    try {
        const response = await Axios.put(path, data);
        dispatch(AppointmentDetailActions.appointmentStatusFetchingSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(AppointmentDetailActions.appointmentStatusFetchingError(e.errorMessage || 'Sorry Internal Server Problem'))
    }
};

export const clearAppointmentStatusMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentStatusMessage())
};

export const appointmentRejectRefund = (
    path,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRefundRejectStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            AppointmentDetailActions.appointmentRefundRejectSuccess('Refund Reject Successfully')
        )
        return response
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentRefundRejectError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
        throw e;
    }
}

export const appointmentRefund = (
    path,
    id
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRefundStart())
    try {
        const response = await Axios.getWithPathVariables(path, id)
        dispatch(
            AppointmentDetailActions.appointmentRefundSuccess('Refunded Successfully')
        )
        return response;
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentRefundError(
                e.errorMessage ? e.errorMessage : 'Sorry Internal Server Problem'
            )
        )
        throw e;
    }
}

export const clearAppointmentRefundRejectMessage = () => async dispatch => {
    dispatch({type: 'CLEAR_REFUND_REJECT_MESSAGE'})
};

export const clearAppointmentRefundMessage = () => async dispatch => {
    dispatch({type: 'CLEAR_REFUND_MESSAGE'})
};

export const searchRescheduleLog = (path,paginationData, searchParam) => async dispatch => {
    dispatch(AppointmentDetailActions.searchRescheduleStart());
    try {
        const response = await Axios.putWithPagination(path,paginationData, searchParam);
        dispatch(AppointmentDetailActions.searchRescheduleSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(AppointmentDetailActions.searchRescheduleError(e.errorMessage ? e.errorMessage : "Sorry internal server error!"));
        throw e;
    }
};
export const clearRescheduleLogMessage = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearRescheduleLogMessage())
};

export const appointmentApprove= (
    path,
    id
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentApproveStart())
    try {
        const response = await Axios.getWithPathVariables(path, id)
        dispatch(
            AppointmentDetailActions.appointmentApproveSuccess('Appointment Approved Successfully')
        )
        return response;
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentApproveError(
                e.errorMessage ? e.errorMessage : 'Sorry Internal Server Problem'
            )
        )
        throw e;
    }
}

export const appointmentReject= (
    path,
    data
) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRejectStart())
    try {
        const response = await Axios.put(path, data)
        dispatch(
            AppointmentDetailActions.appointmentRejectSuccess('Appointment Reject Succesfully')
        )
        return response;
    } catch (e) {
        dispatch(
            AppointmentDetailActions.appointmentRejectError(
                e.errorMessage ? e.errorMessage : 'Sorry Internal Server Problem'
            )
        )
        throw e;
    }
}

export const clearAppointmentRejectMessage = () => async dispatch => {
    dispatch({type: 'CLEAR_APPOINTMENT_REJECT_MESSAGE'})
};

export const clearAppointmentApproveMessage = () => async dispatch => {
    dispatch({type: 'CLEAR_APPOINTMENT_APPROVE_MESSAGE'})
};