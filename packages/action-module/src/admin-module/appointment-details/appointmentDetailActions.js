import {appointmentDetailsConstants} from './appointmentDetailActionConstants';

const {
    REFUND_FETCH_START,
    REFUND_FETCH_SUCCESS,
    REFUND_FETCH_ERROR,
    CLEAR_REFUND_LIST_MESSAGE,
    APPROVAL_FETCH_ERROR,
    APPROVAL_FETCH_START,
    APPROVAL_FETCH_SUCCESS,
    CLEAR_APPROVAL_LIST_MESSAGE,
    CLEAR_LOG_LIST_MESSAGE,
    CLEAR_STATUS_LIST_MESSAGE,
    LOG_FETCH_ERROR,
    LOG_FETCH_START,
    LOG_FETCH_SUCCESS,
    STATUS_FETCH_ERROR,
    STATUS_FETCH_START,
    STATUS_FETCH_SUCCESS
} = appointmentDetailsConstants;

export const appointmentRefundFetchingStart = () => {
    return {
        type: REFUND_FETCH_START
    }
};

export const appointmentRefundFetchingSuccess = data => {
    return {
        type: REFUND_FETCH_SUCCESS,
        payload:{data}
    }
};

export const appointmentRefundFetchingError = message => {
    return {
        type: REFUND_FETCH_ERROR,
        payload: {
            data: message
        }
    }
};

export const clearAppointmentSuccessMessage = () => {
    return {
        type: CLEAR_REFUND_LIST_MESSAGE
    }
};

export const appointmentApprovalFetchingStart = () => {
    return {
        type: APPROVAL_FETCH_START
    }
};

export const appointmentApprovalFetchingSuccess = data => {
    return {
        type: APPROVAL_FETCH_SUCCESS,
        payload:data
    }
};

export const appointmentApprovalFetchingError = message => {
    return {
        type: APPROVAL_FETCH_ERROR,
        payload: {
            data: message
        }
    }
};

export const clearAppointmentApprovalMessage = () => {
    return {
        type: CLEAR_APPROVAL_LIST_MESSAGE
    }
};

export const appointmentLogFetchingStart = () => {
    return {
        type: LOG_FETCH_START
    }
};

export const appointmentLogFetchingSuccess = data => {
    return {
        type: LOG_FETCH_SUCCESS,
        payload:data
    }
};

export const appointmentLogFetchingError = message => {
    return {
        type: LOG_FETCH_ERROR,
        payload: {
            data: message
        }
    }
};

export const clearAppointmentLogMessage = () => {
    return {
        type: CLEAR_LOG_LIST_MESSAGE
    }
};

export const appointmentStatusFetchingStart = () => {
    return {
        type: STATUS_FETCH_START
    }
};

export const appointmentStatusFetchingSuccess = data => {
    return {
        type: STATUS_FETCH_SUCCESS,
        payload:data
    }
};

export const appointmentStatusFetchingError = message => {
    return {
        type: STATUS_FETCH_ERROR,
        payload: {
            data: message
        }
    }
};

export const clearAppointmentStatusMessage = () => {
    return {
        type: CLEAR_STATUS_LIST_MESSAGE
    }
};