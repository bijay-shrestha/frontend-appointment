import {weekdaysActionConstants} from './weekdaysActionConstants';

const {FETCH_WEEK_DAYS_ERROR, FETCH_WEEK_DAYS_SUCCESS} = weekdaysActionConstants;

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
