import {AdminSetupActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'

export const createAdmin = (path, adminData, formData) => async dispatch => {
  dispatch(AdminSetupActions.createAdminPending())
  try {
    let response = await Axios.postForMultipart(
      path,
      'request',
      adminData,
      formData
    )
    dispatch(
      AdminSetupActions.creatingAdminSuccess('Admin Created Successfully.')
    )
    return response
  } catch (e) {
    dispatch(AdminSetupActions.creatingAdminError(e.errorMessage))
    throw e
  }
}

export const fetchAdminList = (
  path,
  queryParams,
  searchData
) => async dispatch => {
  dispatch(AdminSetupActions.adminListPending())
  try {
    const response = await Axios.putWithRequestParam(
      path,
      queryParams,
      searchData
    )
    dispatch(AdminSetupActions.adminListSuccess(response.data))
    return response
  } catch (e) {
    dispatch(AdminSetupActions.adminListError(e.errorMessage))
  }
}

export const deleteAdmin = (path, deleteData) => async dispatch => {
  dispatch(AdminSetupActions.adminDeletePending())
  try {
    const response = await Axios.del(path, deleteData)
    dispatch(
      AdminSetupActions.adminDeleteSuccess(
        response.data ? response.data : 'Admin deleted successfully.'
      )
    )
    return response
  } catch (e) {
    dispatch(AdminSetupActions.adminDeleteError(e.errorMessage))
    throw e
  }
}

export const editAdmin = (path, editData, formData) => async dispatch => {
  dispatch(AdminSetupActions.adminEditPending())
  try {
    const response = await Axios.putWithMultiPart(
      path,
      'request',
      editData,
      formData
    )
    dispatch(AdminSetupActions.adminEditSuccess(response.data))
    return response
  } catch (e) {
    dispatch(
      AdminSetupActions.adminEditError(
        e.errorMessage
          ? e.errorMessage
          : 'Sorry error occurred while editing admin.'
      )
    )
    throw e
  }
}

export const previewAdmin = (path, id) => async dispatch => {
  dispatch(AdminSetupActions.adminPreviewPending())
  dispatch(AdminSetupActions.clearAdminEditErrorMessage())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(AdminSetupActions.adminPreviewSuccess(response.data))
    return response
  } catch (e) {
    dispatch(
      AdminSetupActions.adminPreviewError(
        e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error!'
      )
    )
    throw e
  }
}

export const fetchAdminMetaInfo = path => async dispatch => {
  dispatch(AdminSetupActions.adminMetaInfoFetchPending())
  try {
    const response = await Axios.get(path)
    dispatch(AdminSetupActions.adminMetaInfoFetchSuccess(response.data))
    return response
  } catch (e) {
    dispatch(
      AdminSetupActions.adminMetaInfoFetchError(
        e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error!'
      )
    )
    throw e
  }
}

export const fetchAdminMetaInfoByHospitalId = (path, id) => async dispatch => {
  dispatch(AdminSetupActions.adminMetaInfoByHospitalIdFetchPending())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(
      AdminSetupActions.adminMetaInfoByFetchHospitalIdFetchSuccess(
        response.data
      )
    )
    return response
  } catch (e) {
    dispatch(
      AdminSetupActions.adminMetaInfoByFetchHospitalIdFetchError(
        e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error!'
      )
    )
    throw e
  }
}

export const clearAdminSuccessErrorMessagesFromStore = () => async dispatch => {
  dispatch(AdminSetupActions.clearAdminEditSuccessMessage())
  dispatch(AdminSetupActions.clearAdminEditErrorMessage())
  dispatch(AdminSetupActions.clearAdminPreviewErrorMessage())
  dispatch(AdminSetupActions.clearAdminListFetchErrorMessage())
  dispatch(AdminSetupActions.clearAdminCreateErrorMessage())
  dispatch(AdminSetupActions.clearAdminCreateSuccessMessage())
  dispatch(AdminSetupActions.clearAdminDeleteErrorMessage())
  dispatch(AdminSetupActions.clearAdminDeleteSuccessMessage())
}
