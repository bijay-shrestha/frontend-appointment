import {loggedInAdminInfoActionConstants} from './actionconstants';

const {PENDING, SUCCESS, ERROR} = loggedInAdminInfoActionConstants;

export const loggedInAdminInfoFetchSuccess = (data) => ({
    type: SUCCESS,
    payload: {
        data: data,
        status: 'SUCCESS'
    }
});

export const loggedInAdminInfoFetchError = (data) => ({
    type: ERROR,
    payload: {
        data: data,
        status: 'ERROR'
    }
});

export const loggedInAdminInfoFetchPending = () => ({
    type: PENDING,
    payload: {
        data: null,
        status: 'PENDING'
    }
});
