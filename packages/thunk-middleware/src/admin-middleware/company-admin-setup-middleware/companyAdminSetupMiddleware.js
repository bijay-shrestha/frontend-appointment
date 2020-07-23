import {
  CompanyAdminSetupActions,
  companyAdminSetupActionConstants
} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
import {MinioMiddleware} from '../../../index'
import {CommonUtils} from '@frontend-appointment/helpers'

const {
  COMPANY_ADMIN_CLEAR_DELETE_MESSAGES,
  COMPANY_ADMIN_CLEAR_EDIT_MESSAGES,
  COMPANY_ADMIN_CLEAR_PREVIEW_MESSAGES,
  COMPANY_ADMIN_CLEAR_ADMIN_METADROPDOWN
} = companyAdminSetupActionConstants

export const createCompanyAdmin = (path, adminData) => async dispatch => {
  dispatch(CompanyAdminSetupActions.createCompanyAdminPending())
  try {
    let response = await Axios.post(path, adminData)
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
    let dataWithSn = CommonUtils.appendSerialNumberToDataList(
      response.data,
      queryParams.page,
      queryParams.size
    )
    const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(
      dataWithSn,
      'fileUri'
    )
    dispatch(
      CompanyAdminSetupActions.companyAdminListSuccess(dataWithPresignedUrl)
    )
    return response
  } catch (e) {
    dispatch(
      CompanyAdminSetupActions.companyAdminListError(
        e.errorMessage || 'Sorry Internal Server Error'
      )
    )
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

export const editCompanyAdmin = (path, editData) => async dispatch => {
  dispatch(CompanyAdminSetupActions.companyAdminEditPending())
  try {
    const response = await Axios.put(path, editData)
    dispatch(
      CompanyAdminSetupActions.companyAdminEditSuccess(
        'Company Admin Edited Successfully'
      )
    )
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
    let dataWithFileUri = response.data
    dataWithFileUri.fileUri = await MinioMiddleware.fetchPresignedUrlForGetOperation(
      dataWithFileUri.fileUri
    )
    dispatch(
      CompanyAdminSetupActions.companyAdminPreviewSuccess(dataWithFileUri)
    )
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

export const fetchCompanyAdminMetaInfoById = (path, id) => async dispatch => {
  dispatch(
    CompanyAdminSetupActions.companyAdminMetaInfoByCompanyIdFetchPending()
  )
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(
      CompanyAdminSetupActions.companyAdminMetaInfoCompanyIdFetchSuccess(
        response.data
      )
    )
  } catch (e) {
    dispatch(
      CompanyAdminSetupActions.companyAdminMetaInfoCompanyIdFetchError(
        e.errorMessage || 'Sorry, Internal Server Error'
      )
    )
  }
}

export const clearAdminSuccessErrorMessagesFromStore = () => dispatch => {
  dispatch({type: COMPANY_ADMIN_CLEAR_DELETE_MESSAGES})
  dispatch({type: COMPANY_ADMIN_CLEAR_ADMIN_METADROPDOWN})
  dispatch({type: COMPANY_ADMIN_CLEAR_EDIT_MESSAGES})
  dispatch({type: COMPANY_ADMIN_CLEAR_PREVIEW_MESSAGES})
  dispatch({type: 'CLEAR_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID'})
}
