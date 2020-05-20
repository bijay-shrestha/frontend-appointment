import {hospitalApiIntegrationActionConstants} from './hospitalApiIntegrationConstant'

const {
  HOSPITAL_API_SAVE_ERROR,
  HOSPITAL_API_SAVE_PENDING,
  HOSPITAL_API_SAVE_SUCCESS,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_ERROR,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_PENDING,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_SUCCESS,
  HOSPTIAL_FEATURE_TYPE_DROPDOWN_ERROR,
  HOSPTIAL_FEATURE_TYPE_DROPDOWN_PENDING,
  HOSPTIAL_FEATURE_TYPE_DROPDOWN_SUCCESS
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
  type: HOSPTIAL_FEATURE_TYPE_DROPDOWN_SUCCESS,
  payload: {
    data
  }
})

export const hospitalFeatureTypeDropdownError = message => ({
  type: HOSPTIAL_FEATURE_TYPE_DROPDOWN_ERROR,
  payload: {
    message
  }
})

export const hospitalFeatureTypeDropdownPending = () => ({
  type: HOSPTIAL_FEATURE_TYPE_DROPDOWN_PENDING
})
