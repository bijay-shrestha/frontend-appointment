import {
  CompanyAdminSetupActions,
  companyAdminSetupActionConstants
} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
const {
  COMPANY_ADMIN_CLEAR_DELETE_MESSAGES,
  COMPANY_ADMIN_CLEAR_EDIT_MESSAGES,
  COMPANY_ADMIN_CLEAR_PREVIEW_MESSAGES,
  COMPANY_ADMIN_CLEAR_ADMIN_METADROPDOWN
} = companyAdminSetupActionConstants


export const createCompanyAdmin = (
  path,
  adminData,
  formData
) => async dispatch => {
  dispatch(CompanyAdminSetupActions.createCompanyAdminPending())
  try {
    let response = await Axios.postForMultipart(
      path,
      'request',
      adminData,
      formData
    )
    dispatch(
      CompanyAdminSetupActions.creatingCompanyAdminSuccess(
        'Company Admin Created Successfully.'
      )
    )
    return response
  } catch (e) {
    dispatch(CompanyAdminSetupActions.creatingCompanyAdminError(e.errorMessage))
    throw e
  }
}

export const fetchCompanyAdminList = (
  path,
  queryParams,
  searchData
) => async dispatch => {
  dispatch(CompanyAdminSetupActions.companyAdminListPending())
  try {
    const response = await Axios.putWithRequestParam(
      path,
      queryParams,
      searchData
    )
    dispatch(CompanyAdminSetupActions.companyAdminListSuccess(response.data))
    return response
  } catch (e) {
    dispatch(CompanyAdminSetupActions.companyAdminListError(e.errorMessage))
  }
}

export const deleteCompanyAdmin = (path, deleteData) => async dispatch => {
  dispatch(CompanyAdminSetupActions.companyAdminDeletePending())
  try {
    const response = await Axios.del(path, deleteData)
    dispatch(
      CompanyAdminSetupActions.companyAdminDeleteSuccess(
        response.data ? response.data : 'Company Admin deleted successfully.'
      )
    )
    return response
  } catch (e) {
    dispatch(CompanyAdminSetupActions.companyAdminDeleteError(e.errorMessage))
    throw e
  }
}

export const editCompanyAdmin = (
  path,
  editData,
  formData
) => async dispatch => {
  dispatch(CompanyAdminSetupActions.companyAdminEditPending())
  try {
    const response = await Axios.putWithMultiPart(
      path,
      'request',
      editData,
      formData
    )
    dispatch(CompanyAdminSetupActions.companyAdminEditSuccess('Company Admin Edited Successfully'))
    return response
  } catch (e) {
    dispatch(
      CompanyAdminSetupActions.companyAdminEditError(
        e.errorMessage
          ? e.errorMessage
          : 'Sorry error occurred while editing admin.'
      )
    )
    throw e
  }
}

export const previewCompanyAdmin = (path, id) => async dispatch => {
  dispatch(CompanyAdminSetupActions.companyAdminPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(CompanyAdminSetupActions.companyAdminPreviewSuccess(response.data))
    return response
  } catch (e) {
    dispatch(
      CompanyAdminSetupActions.companyAdminPreviewSuccess(
        e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error!'
      )
    )
    throw e
  }
}

export const fetchCompanyAdminMetaInfo = path => async dispatch => {
  dispatch(CompanyAdminSetupActions.companyAdminMetaInfoFetchPending())
  try {
    const response = await Axios.get(path)
    dispatch(
      CompanyAdminSetupActions.companyAdminMetaInfoFetchSuccess(response.data)
    )
    return response
  } catch (e) {
    dispatch(
      CompanyAdminSetupActions.companyAdminMetaInfoFetchError(
        e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error!'
      )
    )
    throw e
  }
}

export const fetchCompanyAdminMetaInfoById = path => async dispatch => {
dispatch(CompanyAdminSetupActions.companyAdminMetaInfoByCompanyIdFetchPending())
try{
  const response = await Axios.getWithPathVariables(path,id);
  dispatch(CompanyAdminSetupActions.companyAdminMetaInfoCompanyIdFetchSuccess(response.data))
}catch(e){
  dispatch(CompanyAdminSetupActions.companyAdminMetaInfoCompanyIdFetchError(e.errorMessage||'Sorry, Internal Server Error'))
}

}

export const clearAdminSuccessErrorMessagesFromStore = () => dispatch => {
  dispatch({type: COMPANY_ADMIN_CLEAR_DELETE_MESSAGES})
  dispatch({type: COMPANY_ADMIN_CLEAR_ADMIN_METADROPDOWN})
  dispatch({type: COMPANY_ADMIN_CLEAR_EDIT_MESSAGES})
  dispatch({type: COMPANY_ADMIN_CLEAR_PREVIEW_MESSAGES})
}
