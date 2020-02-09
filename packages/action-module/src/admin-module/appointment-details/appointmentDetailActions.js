import {appointmentDetailsConstants} from './appointmentDetailActionConstants';

const {
    REFUND_FETCH_START,
    REFUND_FETCH_SUCCESS,
    REFUND_FETCH_ERROR,
    CLEAR_REFUND_LIST_MESSAGE
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

