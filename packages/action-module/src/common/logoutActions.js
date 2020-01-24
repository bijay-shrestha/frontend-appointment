import {logoutActionConstants} from "./actionconstants";

const {
    ERROR,
    PENDING,
    SUCCESS,
    CLEAR_ERROR_MESSAGE
} = logoutActionConstants;

export const logoutPending = () => ({
    type: PENDING,
    payload: {
        status: 'PENDING'
    }
});

export const logoutSuccess = () => ({
    type: SUCCESS,
    payload: {
        status: 'SUCCESS'
    }
});

export const logoutError = (errorMessage) => ({
    type: ERROR,
    payload: {
        errorMessage,
        status: 'ERROR'
    }
});

export const clearLogoutErrorMessage = () => ({
    type: CLEAR_ERROR_MESSAGE,
});
