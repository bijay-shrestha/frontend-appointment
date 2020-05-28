import {requestBOdyApiIntegrationActionConstants} from './RequestBodyIntegrationActionConstants'

const {
  REQUEST_BODY_INTEGRATION_DELETE_ERROR,
  //REQUEST_BODY_INTEGRATION_DELETE_MESSAGE,
  REQUEST_BODY_INTEGRATION_DELETE_PENDING,
  REQUEST_BODY_INTEGRATION_DELETE_SUCCESS,
  REQUEST_BODY_INTEGRATION_DROPDOWN_ERROR,
  REQUEST_BODY_INTEGRATION_DROPDOWN_PENDING,
  REQUEST_BODY_INTEGRATION_DROPDOWN_SUCCESS,
  REQUEST_BODY_INTEGRATION_EDIT_ERROR,
//   REQUEST_BODY_INTEGRATION_EDIT_MESSAGE,
  REQUEST_BODY_INTEGRATION_EDIT_PENDING,
  REQUEST_BODY_INTEGRATION_EDIT_SUCCESS,
  REQUEST_BODY_INTEGRATION_ERROR,
  REQUEST_BODY_INTEGRATION_PENDING,
  REQUEST_BODY_INTEGRATION_PREVIEW_ERROR,
//   REQUEST_BODY_INTEGRATION_PREVIEW_MESSAGE,
  REQUEST_BODY_INTEGRATION_PREVIEW_PENDING,
  REQUEST_BODY_INTEGRATION_PREVIEW_SUCCESS,
  REQUEST_BODY_INTEGRATION_SEARCH_ERROR,
  REQUEST_BODY_INTEGRATION_SEARCH_PENDING,
  REQUEST_BODY_INTEGRATION_SEARCH_SUCCESS,
  REQUEST_BODY_INTEGRATION_SUCCESS
} = requestBOdyApiIntegrationActionConstants

export const requestBodyApiIntegrationSaveSuccess = message => ({
  type: REQUEST_BODY_INTEGRATION_SUCCESS,
  payload: {
    message
  }
})

export const requestBodyApiIntegrationSaveError = message => ({
  type: REQUEST_BODY_INTEGRATION_ERROR,
  payload: {
    message
  }
})

export const requestBodyApiIntegrationSavePending = () => ({
  type: REQUEST_BODY_INTEGRATION_PENDING
})

export const requestBodyDropdownSuccess = data => ({
  type: REQUEST_BODY_INTEGRATION_DROPDOWN_SUCCESS,
  payload: {
    data
  }
})

export const requestBodyDropdownError = message => ({
  type: REQUEST_BODY_INTEGRATION_DROPDOWN_ERROR,
  payload: {
    message
  }
})

export const requestBodyDropdownPending = () => ({
  type: REQUEST_BODY_INTEGRATION_DROPDOWN_PENDING
})

export const requestBodyIntegrationSearchSuccess = data => ({
  type: REQUEST_BODY_INTEGRATION_SEARCH_SUCCESS,
  payload: {
    data
  }
})

export const requestBodyIntegrationSearchError = message => ({
  type: REQUEST_BODY_INTEGRATION_SEARCH_ERROR,
  payload: {
    message
  }
})

export const requestBodyIntegrationSearchPending = () => ({
  type: REQUEST_BODY_INTEGRATION_SEARCH_PENDING
})

export const requestBodyIntegrationPreviewPending = () => ({
  type: REQUEST_BODY_INTEGRATION_PREVIEW_PENDING
})

export const requestBodyIntegrationPreviewSuccess = data => ({
  type: REQUEST_BODY_INTEGRATION_PREVIEW_SUCCESS,
  payload: {
    data
  }
})

export const requestBodyIntegrationPreviewError = message => ({
  type: REQUEST_BODY_INTEGRATION_PREVIEW_ERROR,
  payload: {
    message
  }
})

export const requestBodyIntegrationEditError = message => ({
  type: REQUEST_BODY_INTEGRATION_EDIT_ERROR,
  payload: {
    message
  }
})

export const requestBodyIntegrationEditPending = () => ({
  type: REQUEST_BODY_INTEGRATION_EDIT_PENDING
})

export const requestBodyIntegrationEditSuccess = message => ({
  type: REQUEST_BODY_INTEGRATION_EDIT_SUCCESS,
  payload: {
    message
  }
})

export const requestBodyIntegrationDeleteError = message => ({
  type: REQUEST_BODY_INTEGRATION_DELETE_ERROR,
  payload: {
    message
  }
})

export const requestBodyIntegrationDeletePending = () => ({
  type: REQUEST_BODY_INTEGRATION_DELETE_PENDING
})

export const requestBodyIntegrationDeleteSuccess = message => ({
  type: REQUEST_BODY_INTEGRATION_DELETE_SUCCESS,
  payload: {
    message
  }
})
