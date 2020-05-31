import {
  requestBOdyApiIntegrationActionConstants,
  RequestBodyIntegration
} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
const {
  REQUEST_BODY_INTEGRATION_PREVIEW_MESSAGE,
  REQUEST_BODY_INTEGRATION_DELETE_MESSAGE,
  REQUEST_BODY_INTEGRATION_EDIT_MESSAGE
} = requestBOdyApiIntegrationActionConstants
export const fetchRequestBodyForDrodown = path => async dispatch => {
  dispatch(RequestBodyIntegration.requestBodyDropdownPending())
  try {
    const response = await Axios.get(path)
    dispatch(RequestBodyIntegration.requestBodyDropdownSuccess(response.data))
    // return response.data;
  } catch (e) {
    dispatch(RequestBodyIntegration.requestBodyDropdownError(e.errorMessage))
  }
}

export const saveRequestBodyIntegration = (
  path,
  integrationData
) => async dispatch => {
  dispatch(RequestBodyIntegration.requestBodyApiIntegrationSavePending())
  try {
    let response = await Axios.post(path, integrationData)
    dispatch(
      RequestBodyIntegration.requestBodyApiIntegrationSaveSuccess(
        'Request Body Integrated Succesfully'
      )
    )
    return response
  } catch (e) {
    dispatch(
      RequestBodyIntegration.requestBodyApiIntegrationSaveError(e.errorMessage)
    )
    throw e
  }
}

export const searchRequestBodyIntegrationData = (
  path,
  pagination,
  searchData
) => async dispatch => {
  dispatch(RequestBodyIntegration.requestBodyIntegrationSearchPending())
  try {
    const response = await Axios.putWithPagination(path, pagination, searchData)
    dispatch(
      RequestBodyIntegration.requestBodyIntegrationSearchSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      RequestBodyIntegration.requestBodyIntegrationSearchError(e.errorMessage)
    )
  }
}

export const editRequestBodyIntegrationData = (
  path,
  data
) => async dispatch => {
  dispatch(RequestBodyIntegration.requestBodyIntegrationEditPending())
  try {
    await Axios.put(path, data)
    dispatch(
      RequestBodyIntegration.requestBodyIntegrationEditSuccess(
        'Request Body Integration Edited Successfully'
      )
    )
  } catch (e) {
    dispatch(
      RequestBodyIntegration.requestBodyIntegrationEditError(e.errorMessage)
    )
    throw e
  }
}



export const deleteRequestBodyIntegrationData = (
  path,
  data
) => async dispatch => {
  dispatch(RequestBodyIntegration.requestBodyIntegrationDeletePending())
  try {
    await Axios.del(path, data)
    dispatch(
      RequestBodyIntegration.requestBodyIntegrationDeleteSuccess(
        'Deleted Request Body Integrated Data Successfully'
      )
    )
  } catch (e) {
    dispatch(
      RequestBodyIntegration.requestBodyIntegrationDeleteError(e.errorMessage)
    )
    throw e
  }
}



export const getRequestBodyByFeatureId = (
  path,
  featureId
) => async dispatch => {
  dispatch(RequestBodyIntegration.requestBodyByFeaturePending())
  try {
    const response = await Axios.getWithPathVariables(path, featureId)
    dispatch(
      RequestBodyIntegration.requestBodyByFeatureSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      RequestBodyIntegration.requestBodyByFeatureError(e.errorMessage)
    )
    
  }
}

export const previewRequestBodyIntegrationData = (
  path,
  id
) => async dispatch => {
  dispatch(RequestBodyIntegration.requestBodyIntegrationPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(
      RequestBodyIntegration.requestBodyIntegrationPreviewSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      RequestBodyIntegration.requestBodyIntegrationPreviewError(e.errorMessage)
    )
    throw e
  }
}

export const clearMessages = () => dispatch => {
  dispatch({type: REQUEST_BODY_INTEGRATION_DELETE_MESSAGE})
  dispatch({type: REQUEST_BODY_INTEGRATION_EDIT_MESSAGE})
  dispatch({type: REQUEST_BODY_INTEGRATION_PREVIEW_MESSAGE})
}
