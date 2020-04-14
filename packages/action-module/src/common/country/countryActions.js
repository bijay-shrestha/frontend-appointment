import {countryActionConstants} from './countryActionConstants';

const {
    FETCH_COUNTRY_ERROR,
    FETCH_COUNTRY_PENDING,
    FETCH_COUNTRY_SUCCESS
} = countryActionConstants;

export const fetchCountrySuccess = data => {
    return {
        type: FETCH_COUNTRY_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchCountryError = errorMessage => {
    return {
        type: FETCH_COUNTRY_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const fetchCountryPending = () => {
    return {
        type: FETCH_COUNTRY_PENDING,
    }
};

