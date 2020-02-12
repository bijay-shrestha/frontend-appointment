import {weekdaysActionConstants} from './weekdaysActionConstants';

const {
    FETCH_WEEK_DAYS_ERROR,
    FETCH_WEEK_DAYS_SUCCESS,
    FETCH_WEEK_DAYS_DATA_SUCCESS,
    FETCH_WEEK_DAYS_DATA_ERROR
} = weekdaysActionConstants;

export const fetchWeekdaysSuccess = data => {
    return {
        type: FETCH_WEEK_DAYS_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchWeekdaysError = errorMessage => {
    return {
        type: FETCH_WEEK_DAYS_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const fetchWeekdaysDataSuccess = data => {
    return {
        type: FETCH_WEEK_DAYS_DATA_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchWeekdaysDataError = errorMessage => {
    return {
        type: FETCH_WEEK_DAYS_DATA_ERROR,
        payload: {
            errorMessage
        }
    }
};
