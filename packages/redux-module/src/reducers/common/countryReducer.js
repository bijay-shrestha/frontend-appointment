import {countryActionConstants} from '@frontend-appointment/action-module';

const {
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_PENDING,
    FETCH_COUNTRY_ERROR
} = countryActionConstants;

const initialState = {
    isCountryDropdownPending: false,
    countryList: [],
    countryDropdownMessage: '',
};

export const CountryDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_COUNTRY_PENDING:
            return {
                ...state,
                isCountryDropdownPending: true,
                countryList: [],
                countryDropdownMessage: '',
            };
        case FETCH_COUNTRY_ERROR:
            return {
                ...state,
                isCountryDropdownPending: false,
                countryList: [],
                countryDropdownMessage: action.payload.errorMessage,
            };
        case FETCH_COUNTRY_SUCCESS:
            return {
                ...state,
                isCountryDropdownPending: false,
                countryList: [...action.payload.data],
                countryDropdownMessage: '',
            };
        default:
            return {...state}
    }
};
