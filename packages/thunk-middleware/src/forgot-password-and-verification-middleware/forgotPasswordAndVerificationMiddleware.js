import {Axios} from '@frontend-appointment/core'
import {ForgotPasswordActions} from '@frontend-appointment/action-module'

export const ForgotPassword = (path, data) => async dispatch => {
  dispatch(forgotPasswordActions.isForgotPasswordPending())
  try {
    await Axios.postWithRequestParams(path, data)
    dispatch(
      ForgotPasswordActions.isForgotPasswordSuccess(
        'Password Forgot Successfully'
      )
    )
  } catch (e) {
    dispatch(ForgotPasswordActions.isForgotPasswordError(e.errorMessage))
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
  }
}
