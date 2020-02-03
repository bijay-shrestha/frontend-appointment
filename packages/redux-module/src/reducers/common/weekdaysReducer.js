import {weekdaysActionConstants} from '@frontend-appointment/action-module';

const {
    FETCH_WEEK_DAYS_SUCCESS,
    FETCH_WEEK_DAYS_ERROR
} = weekdaysActionConstants;

const initialState = {
    weekdaysList: [],
    weekdaysErrorMessage: ''
};

export const WeekdaysReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_WEEK_DAYS_SUCCESS:
            return {
                ...state,
                weekdaysList: [...action.payload.data],
                weekdaysErrorMessage: ''
            };
        case FETCH_WEEK_DAYS_ERROR:
            return {
                ...state,
                weekdaysList: [],
                weekdaysErrorMessage: action.payload.errorMessage
            };
        default:
            return {...state}
    }
};
