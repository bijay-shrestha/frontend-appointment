import {forgotPasswordAndVerificationConstants} from '@frontend-appointment/action-module';

const {
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_PENDING,
    FORGOT_PASSWORD_SUCCESS,
    PASSWORD_VERIFICATION_ERROR,
    PASSWORD_VERIFICATION_PENDING,
    PASSWORD_VERIFICATION_SUCCESS,
    CHANGE_PASSWORD_ERROR,
    CHANGE_PASSWORD_PENDING,
    CHANGE_PASSWORD_SUCCESS
} = forgotPasswordAndVerificationConstants;

let initialForgotPasswordAndVerification = {
    message: '',
    status: ''
}


export const ForgotPasswordReducer = (state = {...initialForgotPasswordAndVerification}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_PENDING:
            return {
                ...state,
                status: 'PENDING'
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload.data,
                status: 'SUCCESS'
            }
        case FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                message: action.payload.error,
                status: 'ERROR'
            }

        default:
            return state;
    }
}

export const VerificationCodeReducer = (state = {...initialForgotPasswordAndVerification}, action) => {
    switch (action.type) {
        case PASSWORD_VERIFICATION_PENDING:
            return {
                ...state,
                status: 'PENDING'
            }

        case PASSWORD_VERIFICATION_SUCCESS:
            return {
                ...state,
                message: action.payload.data,
                status: 'SUCCESS'
            }

        case PASSWORD_VERIFICATION_ERROR :
            return {
                ...state,
                message: action.payload.error,
                status: 'ERROR'
            }

        default:
            return state;
    }
}

export const ChangePasswordForgotReducer = (state = {...initialForgotPasswordAndVerification}, action) => {
    switch (action.type) {
        case CHANGE_PASSWORD_PENDING:
            return {
                ...state,
                status: 'PENDING'
            }

        case CHANGE_PASSWORD_SUCCESS:
            return {
                ...state,
                message: action.payload.data,
                status: 'SUCCESS'
            }

        case CHANGE_PASSWORD_ERROR :
            return {
                ...state,
                message: action.payload.error,
                status: 'ERROR'
            }

        default:
            return state;
    }
}
