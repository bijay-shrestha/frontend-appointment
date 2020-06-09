import {
  AdminModeApiIntegrationActions,
  adminModeApiIntegrationActionConstants
} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
const {
  CLEAR_ADMIN_MODE_API_DELETE_MESSAGE,
  CLEAR_ADMIN_MODE_API_EDIT_MESSAGE,
  CLEAR_ADMIN_MODE_API_PREVIEW_MESSAGE
} = adminModeApiIntegrationActionConstants
export const fetchAppointmentModeAdminForDrodown = path => async dispatch => {
  dispatch(
    AdminModeApiIntegrationActions.adminModeAppointmentModeDropdownPending()
  )
  try {
    let response
    response = await Axios.get(path)
    dispatch(
      AdminModeApiIntegrationActions.adminModeAppointmentModeDropdownSuccess(
        response.data
      )
    )
    // return response.data;
  } catch (e) {
    dispatch(
      AdminModeApiIntegrationActions.adminModeAppointmentModeDropdownError(
        e.errorMessage
      )
    )
  }
}

export const saveAdminApiIntegration = (
  path,
  integrationData
) => async dispatch => {
  dispatch(AdminModeApiIntegrationActions.adminModeApiSavePending())
  try {
    let response = await Axios.post(path, integrationData)
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiSaveSuccess(
        'Admin API Integrated Successfully.'
      )
    )
    return response
  } catch (e) {
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiSaveError(e.errorMessage)
    )
    throw e
  }
}

export const searchAdminApiIntegrationData = (
  path,
  pagination,
  searchData
) => async dispatch => {
  dispatch(AdminModeApiIntegrationActions.adminModeApiSearchPending())
  try {
    const response = await Axios.putWithPagination(path, pagination, searchData)
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiSearchSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiSearchError(e.errorMessage)
    )
  }
}

export const editAdminApiIntegrationData = (path, data) => async dispatch => {
  dispatch(AdminModeApiIntegrationActions.adminModeApiEditPending())
  try {
    await Axios.put(path, data)
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiEditSuccess(
        'Admin API Integration Updated Successfully'
      )
    )
  } catch (e) {
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiEditError(e.errorMessage)
    )
    throw e
  }
}

export const previewAdminApiIntegrationData = (path, id) => async dispatch => {
  dispatch(AdminModeApiIntegrationActions.adminModeApiPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiPreviewSuccess(response.data)
    )
  } catch (e) {
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiPreviewError(e.errorMessage)
    )
    throw e
  }
}

export const deleteAdminApiIntegrationData = (path, data) => async dispatch => {
  dispatch(AdminModeApiIntegrationActions.adminModeApiDeletePending())
  try {
    await Axios.del(path, data)
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiDeleteSuccess(
        'Client API Successfully Removed'
      )
    )
  } catch (e) {
    dispatch(
      AdminModeApiIntegrationActions.adminModeApiDeleteError(e.errorMessage||'Sorry Internal Server Error')
    )
    throw e
  }
}

export const clearMessages = () => dispatch => {
  dispatch({type: CLEAR_ADMIN_MODE_API_DELETE_MESSAGE})
  dispatch({type: CLEAR_ADMIN_MODE_API_EDIT_MESSAGE})
  dispatch({type: CLEAR_ADMIN_MODE_API_PREVIEW_MESSAGE})
}
