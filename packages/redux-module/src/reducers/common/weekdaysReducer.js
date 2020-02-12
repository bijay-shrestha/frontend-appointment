import {weekdaysActionConstants} from '@frontend-appointment/action-module';

const {
    FETCH_WEEK_DAYS_SUCCESS,
    FETCH_WEEK_DAYS_ERROR,
    FETCH_WEEK_DAYS_DATA_SUCCESS,
    FETCH_WEEK_DAYS_DATA_ERROR
} = weekdaysActionConstants;

const initialState = {
    weekdaysList: [],
    weekdaysErrorMessage: '',
    weekdaysDataList: [],
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

        case FETCH_WEEK_DAYS_DATA_SUCCESS:
            return {
                ...state,
                weekdaysDataList: [...action.payload.data],
                weekdaysErrorMessage: ''
            };
        case FETCH_WEEK_DAYS_DATA_ERROR:
            return {
                ...state,
                weekdaysDataList: [],
                weekdaysErrorMessage: action.payload.errorMessage
            };
        default:
            return {...state}
    }
};
