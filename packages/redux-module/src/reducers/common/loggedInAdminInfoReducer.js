import {loggedInAdminInfoActionConstants} from '@frontend-appointment/action-module';

const initialState = {
    loggedInAdminInfo: {},
    status: ''
};

const {
    PENDING, SUCCESS, ERROR
} = loggedInAdminInfoActionConstants;

export const loggedInAdminInfoReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PENDING:
            return {
                ...state,
                loggedInAdminInfo: {},
                status: action.payload.status
            };
        case SUCCESS:
            return {
                ...state,
                loggedInAdminInfo: {...action.payload},
                status: action.payload.status
            };
        case ERROR:
            return {
                ...state,
                loggedInAdminInfo: {},
                status: action.payload.status
            };
        default:
            return state
    }
};
