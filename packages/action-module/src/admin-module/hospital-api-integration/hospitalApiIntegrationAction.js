import {hospitalApiIntegrationActionConstants} from './hospitalApiIntegrationConstant'

const {
  HOSPITAL_API_SAVE_ERROR,
  HOSPITAL_API_SAVE_PENDING,
  HOSPITAL_API_SAVE_SUCCESS,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_ERROR,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_PENDING,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_SUCCESS,
  HOSPITAL_API_INTEGRATION_EDIT_ERROR,
  HOSPITAL_API_INTEGRATION_EDIT_PENDING,
  HOSPITAL_API_INTEGRATION_EDIT_SUCCESS,
  HOSPITAL_API_INTEGRATION_PREVIEW_ERROR,
  HOSPITAL_API_INTEGRATION_PREVIEW_PENDING,
  HOSPITAL_API_INTEGRATION_PREVIEW_SUCCESS,
  HOSPITAL_API_INTEGRATION_SEARCH_ERROR,
  HOSPITAL_API_INTEGRATION_SEARCH_PENDING,
  HOSPITAL_API_INTEGRATION_SEARCH_SUCCESS,
  HOSPITAL_FEATURE_TYPE_DROPDOWN_ERROR,
  HOSPITAL_FEATURE_TYPE_DROPDOWN_PENDING,
  HOSPITAL_FEATURE_TYPE_DROPDOWN_SUCCESS,
  HOSPITAL_API_INTEGRATION_DELETE_ERROR,
  HOSPITAL_API_INTEGRATION_DELETE_PENDING,
  HOSPITAL_API_INTEGRATION_DELETE_SUCCESS,
  API_INTEGRATION_CHANNEL_DROPDOWN_ERROR,
  API_INTEGRATION_CHANNEL_DROPDOWN_PENDING,
  API_INTEGRATION_CHANNEL_DROPDOWN_SUCCESS,
  API_INTEGRATION_TYPE_DROPDOWN_ERROR,
  API_INTEGRATION_TYPE_DROPDOWN_PENDING,
  API_INTEGRATION_TYPE_DROPDOWN_SUCCESS,  
} = hospitalApiIntegrationActionConstants

export const hospitalApiSaveSuccess = message => ({
  type: HOSPITAL_API_SAVE_SUCCESS,
  payload: {
    message
  }
})

export const hospitalApiSaveError = message => ({
  type: HOSPITAL_API_SAVE_ERROR,
  payload: {
    message
  }
})

export const hospitalApiSavePending = () => ({
  type: HOSPITAL_API_SAVE_PENDING
})

export const hospitalRequestMethodDropdownSuccess = data => ({
  type: HOSPITAL_REQUEST_METHOD_DROPDOWN_SUCCESS,
  payload: {
    data
  }
})

export const hospitalRequestMethodDropdownError = message => ({
  type: HOSPITAL_REQUEST_METHOD_DROPDOWN_ERROR,
  payload: {
    message
  }
})

export const hospitalRequestMethodDropdownPending = () => ({
  type: HOSPITAL_REQUEST_METHOD_DROPDOWN_PENDING
})

export const hospitalFeatureTypeDropdownSuccess = data => ({
  type: HOSPITAL_FEATURE_TYPE_DROPDOWN_SUCCESS,
  payload: {
    data
  }
})

export const hospitalFeatureTypeDropdownError = message => ({
  type: HOSPITAL_FEATURE_TYPE_DROPDOWN_ERROR,
  payload: {
    message
  }
})

export const hospitalFeatureTypeDropdownPending = () => ({
  type: HOSPITAL_FEATURE_TYPE_DROPDOWN_PENDING
})

export const hospitalApiSearchSuccess = data => ({
  type: HOSPITAL_API_INTEGRATION_SEARCH_SUCCESS,
  payload: {
    data
  }
})

export const hospitalApiSearchError = message => ({
  type: HOSPITAL_API_INTEGRATION_SEARCH_ERROR,
  payload: {
    message
  }
})

export const hospitalApiSearchPending = () => ({
  type: HOSPITAL_API_INTEGRATION_SEARCH_PENDING
})

export const hospitalApiPreviewPending = () => ({
  type: HOSPITAL_API_INTEGRATION_PREVIEW_PENDING
})

export const hospitalApiPreviewSuccess = data => ({
  type: HOSPITAL_API_INTEGRATION_PREVIEW_SUCCESS,
  payload: {
    data
  }
})

export const hopitalApiPreviewError = message => ({
  type: HOSPITAL_API_INTEGRATION_PREVIEW_ERROR,
  payload: {
    message
  }
})

export const hospitalApiEditError = message => ({
  type: HOSPITAL_API_INTEGRATION_EDIT_ERROR,
  payload: {
    message
  }
})

export const hospitalApiEditPending = () => ({
  type: HOSPITAL_API_INTEGRATION_EDIT_PENDING
})

export const hospitalApiEditSuccess = message => ({
  type: HOSPITAL_API_INTEGRATION_EDIT_SUCCESS,
  payload: {
    message
  }
})

export const hospitalApiDeleteError = message => ({
  type: HOSPITAL_API_INTEGRATION_DELETE_ERROR,
  payload: {
    message
  }
})

export const hospitalApiDeletePending = () => ({
  type: HOSPITAL_API_INTEGRATION_DELETE_PENDING
})

export const hospitalApiDeleteSuccess = message => ({
  type: HOSPITAL_API_INTEGRATION_DELETE_SUCCESS,
  payload: {
    message
  }
})

export const apiIntegrationTypeError = message => ({
  type: API_INTEGRATION_TYPE_DROPDOWN_ERROR,
  payload: {
    message
  }
})

export const apiIntegrationTypePending = () => ({
  type: API_INTEGRATION_TYPE_DROPDOWN_PENDING
})

export const apiIntegrationTypeSuccess = data => ({
  type: API_INTEGRATION_TYPE_DROPDOWN_SUCCESS,
  payload: {
    data
  }
})

export const apiIntegrationChannelError = message => ({
  type: API_INTEGRATION_CHANNEL_DROPDOWN_ERROR,
  payload: {
    message
  }
})

export const apiIntegrationChannelPending = () => ({
  type: API_INTEGRATION_CHANNEL_DROPDOWN_PENDING
})

export const apiIntegrationChannelSuccess = data => ({
  type: API_INTEGRATION_CHANNEL_DROPDOWN_SUCCESS,
  payload: {
    data
  }
})
