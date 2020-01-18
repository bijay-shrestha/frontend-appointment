import {ConsultantSetupActions} from '@cogent/action-module';
import {Axios} from '@cogent/core';

export const createConsultant = (path, profileData) => async dispatch => {
  dispatch(ConsultantSetupActions.createConsultantPending())
  try {
    let response = await Axios.postRaw(path, profileData)
    dispatch(ConsultantSetupActions.createConsultantSuccess())
    return response
  } catch (e) {
    dispatch(ConsultantSetupActions.createConsultantError(e.errorMessage))
    throw e
  }
}

export const clearConsultantCreateMessage = () => dispatch => {
  dispatch(ConsultantSetupActions.clearConsultantCreateMessage())
  dispatch(ConsultantSetupActions.clearConsultantDeleteMessage())
  dispatch(ConsultantSetupActions.clearConsultantEditMessage())
  dispatch(ConsultantSetupActions.clearConsultantListMessage())
  dispatch(ConsultantSetupActions.clearConsultantPreviewMessage())
}

export const editConsultant = (path, data) => async dispatch => {
  dispatch(ConsultantSetupActions.createConsultantEditPending())
  try {
    const response = await Axios.put(path, data)
    dispatch(
      ConsultantSetupActions.createConsultantEditSuccess(response.data)
    )
    return response
  } catch (e) {
    dispatch(
      ConsultantSetupActions.createConsultantEditError(e.errorMessage)
    )
    throw e
  }
}

export const previewConsultant = (path, id) => async dispatch => {
  dispatch(ConsultantSetupActions.createConsultantPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id);
    dispatch(
      ConsultantSetupActions.createConsultantPreviewSuccess(response.data)
    )
    return response
  } catch (e) {
    dispatch(
      ConsultantSetupActions.createConsultantPreviewError(e.errorMessage)
    )
    throw e
  }
}

export const searchConsultant = (
  path,
  queryParams,
  data
) => async dispatch => {
  dispatch(ConsultantSetupActions.createConsultantSearchPending())
  try {
    const response = await Axios.putWithRequestParam(path, queryParams, data)
    dispatch(
      ConsultantSetupActions.createConsultantSearchSuccess(response.data)
    )
    return response
  } catch (e) {
    dispatch(
      ConsultantSetupActions.createConsultantListError(e.errorMessage)
    )
    throw e
  }
}

export const deleteConsultant = (path, id) => async dispatch => {
  dispatch(ConsultantSetupActions.createConsultantDeletePending())
  try {
    const response = await Axios.del(path, id)
    dispatch(ConsultantSetupActions.createConsultantDeleteSucess())
    return response
  } catch (e) {
    dispatch(
      ConsultantSetupActions.createConsultantDeleteError(e.errorMessage)
    )
    throw e
  }
}
export const downloadExcelForConsultants = (path) => async () => {
  try {
      return await Axios.getFile(path);
  } catch (e) {
      throw e;
  }
};
