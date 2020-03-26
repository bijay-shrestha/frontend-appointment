import {CompanySetupActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
export const saveCompany = (path, data, formData) => async dispatch => {
  dispatch(CompanySetupActions.saveCompanyPending());
  try {
    await Axios.postForMultipart(path, 'request', data, formData);
    dispatch(CompanySetupActions.saveCompanySuccess('Company Added Successfully!'))
  } catch (e) {
    const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
    dispatch(CompanySetupActions.saveCompanyError(error))
  }
}

export const updateCompany = (path, data, formData) => async dispatch => {
    dispatch(CompanySetupActions.updateCompanyPending());
    try {
      await Axios.putWithMultiPart(path, 'request', data, formData);
      dispatch(CompanySetupActions.udpateCompanySuccess('Company Edited Successfully!'))
    } catch (e) {
      const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
      dispatch(CompanySetupActions.updateCompanyError(error))
    }
}

export const searchCompany = (path, data) => async dispatch => {
    dispatch(CompanySetupActions.searchCompanyPending());
    try {
      const response = await Axios.put(path,data);
      dispatch(CompanySetupActions.searchCompanySuccess(response.data))
    } catch (e) {
      const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
      dispatch(CompanySetupActions.searchCompanyError(error))
    }
}

export const previewCompany = (path, id) => async dispatch => {
    dispatch(CompanySetupActions.previewCompanyPending());
    try {
      const response = await Axios.getWithPathVariables(path,id);
      dispatch(CompanySetupActions.previewCompanySuccess(response.data))
    } catch (e) {
      const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
      dispatch(CompanySetupActions.previewCompanyError(error))
    }
}

export const companyDropdown = (path) => async dispatch => {
    dispatch(CompanySetupActions.dropdownCompanyPending());
    try {
      const response = await Axios.get(path);
      dispatch(CompanySetupActions.dropdownCompanySuccess(response.data))
    } catch (e) {
      const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
      dispatch(CompanySetupActions.dropdownCompanyError(error))
    }
}

export const companyDelete = (path) => async dispatch => {
    dispatch(CompanySetupActions.deleteCompanyPending());
    try {
      await Axios.delete(path);
      dispatch(CompanySetupActions.deleteCompanySuccess('Company Deleted Successfully'))
    } catch (e) {
      const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
      dispatch(CompanySetupActions.deleteCompanyError(error))
    }
}


