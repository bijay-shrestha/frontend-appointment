import {AppointmentDetailActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'

export const fetchAppointmentRefundList = (
  path,
  pagination,
  data
) => async dispatch => {
  dispatch(AppointmentDetailActions.appointmentRefundFetchingStart())
  try {
    const response = await Axios.putWithPagination(path, pagination, data)
    dispatch(
      AppointmentDetailActions.appointmentRefundFetchingSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      AppointmentDetailActions.appointmentRefundFetchingError(
        e.errorMessage || 'Sorry Internal Server Problem'
      )
    )
  }
}

export const clearAppointmentRefundPending = () => async dispatch => {
  dispatch(AppointmentDetailActions.clearAppointmentSuccessMessage())
}

export const fetchAppointmentApprovalList = (
  path,
  pagination,
  data
) => async dispatch => {
  dispatch(AppointmentDetailActions.appointmentApprovalFetchingStart())
  try {
    const response = await Axios.putWithPagination(path, pagination, data)
    dispatch(
      AppointmentDetailActions.appointmentApprovalFetchingSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      AppointmentDetailActions.appointmentApprovalFetchingError(
        e.errorMessage || 'Sorry Internal Server Problem'
      )
    )
  }
}

export const clearAppointmentApprovalMessage = () => async dispatch => {
  dispatch(AppointmentDetailActions.clearAppointmentApprovalMessage())
}

export const fetchAppointmentLogList = (
  path,
  pagination,
  data
) => async dispatch => {
  dispatch(AppointmentDetailActions.appointmentLogFetchingStart())
  try {
    const response = await Axios.putWithPagination(path, pagination, data)
    dispatch(
      AppointmentDetailActions.appointmentLogFetchingSuccess(response.data)
    )
  } catch (e) {
    console.log(e)
    dispatch(
      AppointmentDetailActions.appointmentLogFetchingError(
        e.errorMessage || 'Sorry Internal Server Problem'
      )
    )
  }
}

export const clearAppointmentLogMessage = () => async dispatch => {
  dispatch(AppointmentDetailActions.clearAppointmentLogMessage())
}

export const fetchAppointmentStatusList = (
  path,
  pagination,
  data
) => async dispatch => {
  dispatch(AppointmentDetailActions.appointmentStatusFetchingStart())
  try {
    const response = await Axios.putWithPagination(path, pagination, data)
    dispatch(
      AppointmentDetailActions.appointmentStatusFetchingSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      AppointmentDetailActions.appointmentStatusFetchingError(
        e.errorMessage || 'Sorry Internal Server Problem'
      )
    )
  }
}

export const clearAppointmentStatusMessage = () => async dispatch => {
  dispatch(AppointmentDetailActions.clearAppointmentStatusMessage())
}
