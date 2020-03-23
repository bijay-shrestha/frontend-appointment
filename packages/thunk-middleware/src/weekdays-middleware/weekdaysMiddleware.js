import {Axios} from "@frontend-appointment/core";
import {WeekdaysActions} from "@frontend-appointment/action-module";

export const fetchWeekdays = path => async dispatch => {
    try {
        const response = await Axios.get(path);
        dispatch(WeekdaysActions.fetchWeekdaysSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(WeekdaysActions.fetchWeekdaysError(e.errorMessage ? e.errorMessage : 'Error fetching weekdays.'));
        throw e;
    }
};

export const fetchWeekdaysData = path => async dispatch => {
    try {
        const response = await Axios.get(path);
        dispatch(WeekdaysActions.fetchWeekdaysDataSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(WeekdaysActions.fetchWeekdaysDataError(e.errorMessage ? e.errorMessage : 'Error fetching weekdays data.'));
        throw e;
    }
};

