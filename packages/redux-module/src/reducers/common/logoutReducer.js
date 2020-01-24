import {logoutActionConstants} from "@frontend-appointment//action-module";

const initialState = {
    status: '',
    errorMessage: ''
};

const {SUCCESS, ERROR, PENDING, CLEAR_ERROR_MESSAGE} = logoutActionConstants;

export const logoutReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PENDING:
            return ({
                ...state,
                status: action.payload.status
            });
        case SUCCESS:
            return ({
                ...state,
                status: action.payload.status
            });
        case ERROR:
            return ({
                ...state,
                status: action.payload.status,
                errorMessage: action.payload.errorMessage
            });
        case CLEAR_ERROR_MESSAGE:
            return ({
                ...state,
                status: '',
                errorMessage: ''
            });
        default:
            return state;
    }
};
