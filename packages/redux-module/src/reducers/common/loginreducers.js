import {loginActionConstant} from '@frontend-appointment/action-module';

const initialState = {
    isLoginPending: false
};

export const loginReducers = (state = {...initialState}, action) => {

    switch (action.type) {
        case loginActionConstant.PENDING:
            return ({
                ...state,
                ...action.payload,
                isLoginPending: true
            });
        case loginActionConstant.SUCESS:
            return ({
                ...state,
                ...action.payload,
                isLoginPending: false
            });
        case loginActionConstant.ERROR:
            return ({
                ...state,
                ...action.payload,
                isLoginPending: false
            });
        default:
            return state
    }

};
