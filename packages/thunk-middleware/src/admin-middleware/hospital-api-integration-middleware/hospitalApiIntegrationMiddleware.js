import {
  HospitalApiIntegrationActions,
  hospitalApiIntegrationActionConstants
} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
const {
  CLEAR_HOSPITAL_API_DELETE_MESSAGE,
  CLEAR_HOSPITAL_API_EDIT_MESSAGE,
  CLEAR_HOSPITAL_API_PREVIEW_MESSAGE
} = hospitalApiIntegrationActionConstants
export const fetchFeatureTypeForDrodown = path => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalFeatureTypeDropdownPending())
  try {
    const response = await Axios.get(path)
    dispatch(
      HospitalApiIntegrationActions.hospitalFeatureTypeDropdownSuccess(
        response.data
      )
    )
    // return response.data;
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hospitalFeatureTypeDropdownError(
        e.errorMessage
      )
    )
  }
}

export const saveHospitalIntegration = (
  path,
  integrationData
) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiSavePending())
  try {
    let response = await Axios.post(path, integrationData)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiSaveSuccess(
        'Hospital Api Integrated Successfully.'
      )
    )
    return response
  } catch (e) {
    dispatch(HospitalApiIntegrationActions.hospitalApiSaveError(e.errorMessage))
    throw e
  }
}

export const fetchRequestMethodDropdown = path => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalRequestMethodDropdownPending())
  try {
    const response = await Axios.get(path)
    dispatch(
      HospitalApiIntegrationActions.hospitalRequestMethodDropdownSuccess(
        response.data
      )
    )
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hospitalRequestMethodDropdownError(
        e.errorMessage
      )
    )
  }
}

export const searchApiIntegrationData = (
  path,
  pagination,
  searchData
) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiSearchPending())
  try {
    const response = await Axios.putWithPagination(path, pagination, searchData)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiSearchSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hospitalApiSearchError(e.errorMessage)
    )
  }
}

export const editApiIntegrationData = (path, data) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiEditPending())
  try {
    await Axios.put(path, data)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiEditSuccess('Api Integration Updated Successfully')
    )
  } catch (e) {
    dispatch(HospitalApiIntegrationActions.hospitalApiEditError(e.errorMessage))
    throw e
  }
}

export const previewApiIntegrationData = (path, id) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiPreviewSuccess(response.data)
    )
  } catch (e) {
    console.log("=========",e);
    dispatch(
      HospitalApiIntegrationActions.hopitalApiPreviewError(e.errorMessage)
    )
    throw e
  }
}

export const deleteApiIntegrationData = (path, data) => async dispatch => {
  dispatch(HospitalApiIntegrationActions.hospitalApiDeletePending())
  try {
    await Axios.del(path, data)
    dispatch(
      HospitalApiIntegrationActions.hospitalApiDeleteSuccess('Client Api Successfully Removed')
    )
  } catch (e) {
    dispatch(
      HospitalApiIntegrationActions.hospitalApiDeleteError(e.errorMessage)
    )
    throw e
  }
}

export const clearMessages = () => dispatch => {
  dispatch({type: CLEAR_HOSPITAL_API_DELETE_MESSAGE})
  dispatch({type: CLEAR_HOSPITAL_API_PREVIEW_MESSAGE})
  dispatch({type: CLEAR_HOSPITAL_API_EDIT_MESSAGE})
}
