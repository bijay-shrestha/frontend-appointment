import {Axios} from '@frontend-appointment/core'
import {ForgotPasswordActions} from '@frontend-appointment/action-module'

export const forgotPassword = (path, query) => async dispatch => {
    dispatch(ForgotPasswordActions.isForgotPasswordPending())
    try {
        await Axios.getWithRequestParams(path, query)
        dispatch(
            ForgotPasswordActions.isForgotPasswordSuccess(
                'Password Forgot Successfully'
            )
        )
    } catch (e) {
        dispatch(ForgotPasswordActions.isForgotPasswordError(e.errorMessage))
        throw e;
    }
}

export const codeVerification = (path, data) => async dispatch => {
    dispatch(ForgotPasswordActions.isForgotPasswordPending())
    try {
        await Axios.getWithRequestParams(path, data)
        dispatch(
            ForgotPasswordActions.isVerificationCodeSuccess(
                'Password Verified Successfully'
            )
        )
    } catch (e) {
        dispatch(ForgotPasswordActions.isVerificationCodeError(e.errorMessage))
        throw e;
    }
}

export const changePasswordVerification = (path, data) => async dispatch => {
    dispatch(ForgotPasswordActions.isChangePasswordPending())
    try {
        await Axios.put(path, data)
        dispatch(
            ForgotPasswordActions.isChangePasswordSuccess(
                'Password Verified Successfully'
            )
        )
    } catch (e) {
        dispatch(ForgotPasswordActions.isChangePasswordError(e.errorMessage))
        throw e;
    }
}
