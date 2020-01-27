import {HospitalSetupActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'

export const createHospital = (
  path,
  hospitalData,
  formData
) => async dispatch => {
  dispatch(HospitalSetupActions.createHospitalPending())
  try {
    const response = await Axios.postForMultipart(
      path,
      'request',
      hospitalData,
      formData
    )
    dispatch(HospitalSetupActions.createHospitalSuccess())
    return response
  } catch (e) {
    dispatch(HospitalSetupActions.createHospitalError(e.errorMessage))
    throw e
  }
}

export const clearHospitalCreateMessage = () => dispatch => {
  dispatch(HospitalSetupActions.clearHospitalCreateMessage())
  dispatch(HospitalSetupActions.clearHospitalDeleteMessage())
  dispatch(HospitalSetupActions.clearHospitalEditMessage())
  dispatch(HospitalSetupActions.clearHospitalListMessage())
  dispatch(HospitalSetupActions.clearHospitalPreviewMessage())
}

export const editHospital = (path, data) => async dispatch => {
  dispatch(HospitalSetupActions.createHospitalEditPending())
  try {
    const response = await Axios.put(path, data)
    dispatch(HospitalSetupActions.createHospitalEditSuccess(response.data))
    return response
  } catch (e) {
    dispatch(HospitalSetupActions.createHospitalEditError(e.errorMessage))
    throw e
  }
}

export const previewHospital = (path, id) => async dispatch => {
  dispatch(HospitalSetupActions.createHospitalPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id)
    dispatch(HospitalSetupActions.createHospitalPreviewSuccess(response.data))
    return response
  } catch (e) {
    dispatch(HospitalSetupActions.createHospitalPreviewError(e.errorMessage))
    throw e
  }
}

export const searchHospital = (path, queryParams, data) => async dispatch => {
  dispatch(HospitalSetupActions.createHospitalSearchPending())
  try {
    const response = await Axios.putWithRequestParam(path, queryParams, data)
    dispatch(HospitalSetupActions.createHospitalSearchSuccess(response.data))
    return response
  } catch (e) {
    dispatch(HospitalSetupActions.createHospitalListError(e.errorMessage))
    throw e
  }
}

export const deleteHospital = (path, id) => async dispatch => {
  dispatch(HospitalSetupActions.createHospitalDeletePending())
  try {
    const response = await Axios.del(path, id)
    dispatch(HospitalSetupActions.createHospitalDeleteSucess())
    return response
  } catch (e) {
    dispatch(HospitalSetupActions.createHospitalDeleteError(e.errorMessage))
    throw e
  }
}
export const downloadExcelForHospitals = path => async () => {
  try {
    return await Axios.getFile(path)
  } catch (e) {
    throw e
  }
}
