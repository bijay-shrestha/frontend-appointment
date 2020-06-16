import {salutationActionConstants} from './salutationActionConstants';

const {
    FETCH_SALUTATION_ERROR,
    FETCH_SALUTATION_PENDING,
    FETCH_SALUTATION_SUCCESS
} = salutationActionConstants;

export const fetchSalutationSuccess = data => {
    return {
        type: FETCH_SALUTATION_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchSalutationError = errorMessage => {
    return {
        type: FETCH_SALUTATION_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const fetchSalutationPending = () => {
    return {
        type: FETCH_SALUTATION_PENDING,
    }
};

