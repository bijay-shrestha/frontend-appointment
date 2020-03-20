import {forgotPasswordAndVerificationConstants} from './actionconstants'

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
} = forgotPasswordAndVerificationConstants

export const isForgotPasswordSuccess = data => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: {
    data: data,
    status: 'success'
  }
})

export const isForgotPasswordError = data => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: {
    error: data,
    status: 'error'
  }
})

export const isForgotPasswordPending = () => ({
  type: FORGOT_PASSWORD_PENDING,
  payload: {
    data: '',
    status: 'loading'
  }
})

export const isVerificationCodeSuccess = data => ({
  type: PASSWORD_VERIFICATION_SUCCESS,
  payload: {
    data: data,
    status: 'success'
  }
})

export const isVerificationCodeError = data => ({
  type: PASSWORD_VERIFICATION_ERROR,
  payload: {
    error: data,
    status: 'error'
  }
})

export const isVerificationCodePending = () => ({
  type: PASSWORD_VERIFICATION_PENDING,
  payload: {
    data: '',
    status: 'loading'
  }
})

export const isChangePasswordSuccess = data => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: {
    data: data,
    status: 'success'
  }
})

export const isChangePasswordError = data => ({
  type: CHANGE_PASSWORD_ERROR,
  payload: {
    error: data,
    status: 'error'
  }
})

export const isChangePasswordPending = () => ({
  type: CHANGE_PASSWORD_PENDING,
  payload: {
    data: '',
    status: 'loading'
  }
})
