import {adminModeApiIntegrationActionConstants} from './adminModeApiIntegrationConstant'

const {
  ADMIN_MODE_API_INTEGRATION_DELETE_ERROR,
  ADMIN_MODE_API_INTEGRATION_DELETE_PENDING,
  ADMIN_MODE_API_INTEGRATION_DELETE_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_EDIT_ERROR,
  ADMIN_MODE_API_INTEGRATION_EDIT_PENDING,
  ADMIN_MODE_API_INTEGRATION_EDIT_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_PREVIEW_ERROR,
  ADMIN_MODE_API_INTEGRATION_PREVIEW_PENDING,
  ADMIN_MODE_API_INTEGRATION_PREVIEW_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_SEARCH_ERROR,
  ADMIN_MODE_API_INTEGRATION_SEARCH_PENDING,
  ADMIN_MODE_API_INTEGRATION_SEARCH_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_SAVE_ERROR,
  ADMIN_MODE_API_INTEGRATION_SAVE_PENDING,
  ADMIN_MODE_API_INTEGRATION_SAVE_SUCCESS,
  ADMIN_API_APPOINTMENT_MODE_DROPDOWN_ERROR,
  ADMIN_API_APPOINTMENT_MODE_DROPDOWN_PENDING,
  ADMIN_API_APPOINTMENT_MODE_DROPDOWN_SUCCESS
} = adminModeApiIntegrationActionConstants

export const adminModeApiSaveSuccess = message => ({
  type: ADMIN_MODE_API_INTEGRATION_SAVE_SUCCESS,
  payload: {
    message
  }
})

export const adminModeApiSaveError = message => ({
  type: ADMIN_MODE_API_INTEGRATION_SAVE_ERROR,
  payload: {
    message
  }
})

export const adminModeApiSavePending = () => ({
  type: ADMIN_MODE_API_INTEGRATION_SAVE_PENDING
})

export const adminModeApiSearchSuccess = data => ({
  type: ADMIN_MODE_API_INTEGRATION_SEARCH_SUCCESS,
  payload: {
    data
  }
})

export const adminModeApiSearchError = message => ({
  type: ADMIN_MODE_API_INTEGRATION_SEARCH_ERROR,
  payload: {
    message
  }
})

export const adminModeApiSearchPending = () => ({
  type: ADMIN_MODE_API_INTEGRATION_SEARCH_PENDING
})

export const adminModeApiPreviewPending = () => ({
  type: ADMIN_MODE_API_INTEGRATION_PREVIEW_PENDING
})

export const adminModeApiPreviewSuccess = data => ({
  type: ADMIN_MODE_API_INTEGRATION_PREVIEW_SUCCESS,
  payload: {
    data
  }
})

export const adminModeApiPreviewError = message => ({
  type: ADMIN_MODE_API_INTEGRATION_PREVIEW_ERROR,
  payload: {
    message
  }
})

export const adminModeApiEditError = message => ({
  type: ADMIN_MODE_API_INTEGRATION_EDIT_ERROR,
  payload: {
    message
  }
})

export const adminModeApiEditPending = () => ({
  type: ADMIN_MODE_API_INTEGRATION_EDIT_PENDING
})

export const adminModeApiEditSuccess = message => ({
  type: ADMIN_MODE_API_INTEGRATION_EDIT_SUCCESS,
  payload: {
    message
  }
})

export const adminModeApiDeleteError = message => ({
  type: ADMIN_MODE_API_INTEGRATION_DELETE_ERROR,
  payload: {
    message
  }
})

export const adminModeApiDeletePending = () => ({
  type: ADMIN_MODE_API_INTEGRATION_DELETE_PENDING
})

export const adminModeApiDeleteSuccess = message => ({
  type: ADMIN_MODE_API_INTEGRATION_DELETE_SUCCESS,
  payload: {
    message
  }
})

export const adminModeAppointmentModeDropdownPending = () => ({
  type: ADMIN_API_APPOINTMENT_MODE_DROPDOWN_PENDING
})

export const adminModeAppointmentModeDropdownSuccess = data => ({
  type: ADMIN_API_APPOINTMENT_MODE_DROPDOWN_SUCCESS,
  payload: {
    data
  }
})

export const adminModeAppointmentModeDropdownError = message => ({
  type: ADMIN_API_APPOINTMENT_MODE_DROPDOWN_ERROR,
  payload: {
    message
  }
})
