import {adminLoggingConstant} from './adminLoggingConstant';
const {
USER_LOG_FETCH_ERROR,
USER_LOG_FETCH_START,
USER_LOG_FETCH_SUCCESS,
USER_LOG_STATS_FETCH_ERROR,
USER_LOG_STATS_FETCH_START,
USER_LOG_STATS_FETCH_SUCCESS
}=adminLoggingConstant

export const logFetchStart = () => {
    return {
        type: USER_LOG_FETCH_START
    }
};

export const logFetchSuccess = data => {
    return {
        type: USER_LOG_FETCH_SUCCESS,
        payload: {
            data
        }
    }
};

export const logFetchError = message => {
    return {
        type: USER_LOG_FETCH_ERROR,
        payload: {
            message:message
        }
    }
};

export const logStatsFetchStart = () => {
    return {
        type: USER_LOG_STATS_FETCH_START
    }
};

export const logStatsFetchSuccess = data => {
    return {
        type: USER_LOG_STATS_FETCH_SUCCESS,
        payload: {
            data
        }
    }
};

export const logStatsFetchError = message => {
    return {
        type: USER_LOG_STATS_FETCH_ERROR,
        payload: {
            message:message
        }
    }
};