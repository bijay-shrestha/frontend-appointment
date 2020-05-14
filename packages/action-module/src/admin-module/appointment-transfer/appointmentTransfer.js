import {appointmentTransferConstant} from './appointmentTransferActionConstant'

const {
  APPOINTMENT_TRANSFER_CHARGE_ERROR,
  APPOINTMENT_TRANSFER_CHARGE_PENDING,
  APPOINTMENT_TRANSFER_CHARGE_SUCCESS,
  APPOINTMENT_TRANSFER_DATE_ERROR,
  APPOINTMENT_TRANSFER_DATE_PENDING,
  APPOINTMENT_TRANSFER_DATE_SUCCESS,
  APPOINTMENT_TRANSFER_INFO_ERROR,
  APPOINTMENT_TRANSFER_INFO_PENDING,
  APPOINTMENT_TRANSFER_INFO_SUCCESS,
  APPOINTMENT_TRANSFER_ERROR,
  APPOINTMENT_TRANSFER_PENDING,
  APPOINTMENT_TRANSFER_SUCCESS,
  APPOINTMENT_TRANSFER_TIME_ERROR,
  APPOINTMENT_TRANSFER_TIME_PENDING,
  APPOINTMENT_TRANSFER_TIME_SUCCESS
} = appointmentTransferConstant

export const appointmentTransferChargeSuccess = data => ({
  type: APPOINTMENT_TRANSFER_CHARGE_SUCCESS,
  payload: {
    data: data
  }
})

export const appointmentTransferChargePending = () => ({
  type: APPOINTMENT_TRANSFER_CHARGE_PENDING
})

export const appointmentTransferChargeError = errorMessage => ({
  type: APPOINTMENT_TRANSFER_CHARGE_ERROR,
  payload:{
    message:errorMessage
  } 
})

export const appointmentTransferDateSuccess = data => ({
  type: APPOINTMENT_TRANSFER_DATE_SUCCESS,
  payload: {
    data: [...data]
  }
})

export const appointmentTransferDatePending = () => ({
  type: APPOINTMENT_TRANSFER_DATE_PENDING
})

export const appointmentTransferDateError = errorMessage => ({
  type: APPOINTMENT_TRANSFER_DATE_ERROR,
  payload:{message: errorMessage}
})

export const appointmentTransferTimeSuccess = data => ({
  type: APPOINTMENT_TRANSFER_TIME_SUCCESS,
  payload: {
    data: [...data]
  }
})

export const appointmentTransferTimePending = () => ({
  type: APPOINTMENT_TRANSFER_TIME_PENDING
})

export const appointmentTransferTimeError = errorMessage => ({
  type: APPOINTMENT_TRANSFER_TIME_ERROR,
  payload:{message: errorMessage}
})

export const appointmentTransferInfoSuccess = data => ({
  type: APPOINTMENT_TRANSFER_INFO_SUCCESS,
  payload: {
    data: data
  }
})

export const appointmentTransferInfoPending = () => ({
  type: APPOINTMENT_TRANSFER_INFO_PENDING
})

export const appointmentTransferInfoError = errorMessage => ({
  type: APPOINTMENT_TRANSFER_INFO_ERROR,
  payload:{ message:errorMessage}
})

export const appointmentTransferSuccess = message => ({
  type: APPOINTMENT_TRANSFER_SUCCESS,
  payload: {
    message: message
  }
})

export const appointmentTransferPending = () => ({
  type: APPOINTMENT_TRANSFER_PENDING
})

export const appointmentTransferError = errorMessage => ({
  type: APPOINTMENT_TRANSFER_ERROR,
  payload:{
  message: errorMessage
  }
})
