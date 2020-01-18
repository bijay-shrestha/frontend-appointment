import {SpecializationSetupActions} from '@cogent/action-module';
import {Axios} from '@cogent/core';

export const createSpecialization = (path, profileData) => async dispatch => {
  dispatch(SpecializationSetupActions.createSpecializationPending())
  try {
    let response = await Axios.postRaw(path, profileData)
    dispatch(SpecializationSetupActions.createSpecializationSuccess())
    return response
  } catch (e) {
    dispatch(SpecializationSetupActions.createSpecializationError(e.errorMessage))
    throw e
  }
}

export const clearSpecializationCreateMessage = () => dispatch => {
  dispatch(SpecializationSetupActions.clearSpecializationCreateMessage())
  dispatch(SpecializationSetupActions.clearSpecializationDeleteMessage())
  dispatch(SpecializationSetupActions.clearSpecializationEditMessage())
  dispatch(SpecializationSetupActions.clearSpecializationListMessage())
  dispatch(SpecializationSetupActions.clearSpecializationPreviewMessage())
}

export const editSpecialization = (path, data) => async dispatch => {
  dispatch(SpecializationSetupActions.createSpecializationEditPending())
  try {
    const response = await Axios.put(path, data)
    dispatch(
      SpecializationSetupActions.createSpecializationEditSuccess(response.data)
    )
    return response
  } catch (e) {
    dispatch(
      SpecializationSetupActions.createSpecializationEditError(e.errorMessage)
    )
    throw e
  }
}

export const previewSpecialization = (path, id) => async dispatch => {
  dispatch(SpecializationSetupActions.createSpecializationPreviewPending())
  try {
    const response = await Axios.getWithPathVariables(path, id);
    dispatch(
      SpecializationSetupActions.createSpecializationPreviewSuccess(response.data)
    )
    return response
  } catch (e) {
    dispatch(
      SpecializationSetupActions.createSpecializationPreviewError(e.errorMessage)
    )
    throw e
  }
}

export const searchSpecialization = (
  path,
  queryParams,
  data
) => async dispatch => {
  dispatch(SpecializationSetupActions.createSpecializationSearchPending())
  try {
    const response = await Axios.putWithRequestParam(path, queryParams, data)
    dispatch(
      SpecializationSetupActions.createSpecializationSearchSuccess(response.data)
    )
    return response
  } catch (e) {
    dispatch(
      SpecializationSetupActions.createSpecializationListError(e.errorMessage)
    )
    throw e
  }
}

export const deleteSpecialization = (path, id) => async dispatch => {
  dispatch(SpecializationSetupActions.createSpecializationDeletePending())
  try {
    const response = await Axios.del(path, id)
    dispatch(SpecializationSetupActions.createSpecializationDeleteSucess())
    return response
  } catch (e) {
    dispatch(
      SpecializationSetupActions.createSpecializationDeleteError(e.errorMessage)
    )
    throw e
  }
}
export const downloadExcelForSpecializations = (path) => async () => {
  try {
      return await Axios.getFile(path);
  } catch (e) {
      throw e;
  }
};
