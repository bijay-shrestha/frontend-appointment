import {salutationActionConstants} from '@frontend-appointment/action-module';

const {
    FETCH_SALUTATION_SUCCESS,
    FETCH_SALUTATION_PENDING,
    FETCH_SALUTATION_ERROR
} = salutationActionConstants;

const initialState = {
    isSalutationDropdownPending: false,
    salutationList: [],
    salutationDropdownMessage: '',
};

export const SalutationDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_SALUTATION_PENDING:
            return {
                ...state,
                isSalutationDropdownPending: true,
                salutationList: [],
                salutationDropdownMessage: '',
            };
        case FETCH_SALUTATION_ERROR:
            return {
                ...state,
                isSalutationDropdownPending: false,
                salutationList: [],
                salutationDropdownMessage: action.payload.errorMessage,
            };
        case FETCH_SALUTATION_SUCCESS:
            return {
                ...state,
                isSalutationDropdownPending: false,
                salutationList: [...action.payload.data],
                salutationDropdownMessage: '',
            };
        default:
            return {...state}
    }
};
