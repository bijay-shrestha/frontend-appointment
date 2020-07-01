import {
    CompanySetupActions,
    companySetupConstants
} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
import {MinioMiddleware} from '../../../index'
import {CommonUtils} from '@frontend-appointment/helpers'

const {
    CLEAR_DELETE_MESSAGE,
    CLEAR_EDIT_MESSAGE,
    CLEAR_PREVIEW_MESSAGE
} = companySetupConstants
export const saveCompany = (path, data) => async dispatch => {
    dispatch(CompanySetupActions.saveCompanyPending())
    try {
        await Axios.post(path, data)
        dispatch(
            CompanySetupActions.saveCompanySuccess('Company Added Successfully!')
        )
    } catch (e) {
        const error = e.errorMessage || 'Sorry Some Error Occurred In Server!'
        dispatch(CompanySetupActions.saveCompanyError(error))
        throw e;
    }

}

export const updateCompany = (path, data) => async dispatch => {
    dispatch(CompanySetupActions.updateCompanyPending())
    try {
        await Axios.put(path, data)
        dispatch(
            CompanySetupActions.udpateCompanySuccess('Company Edited Successfully!')
        )

    } catch (e) {
        const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
        dispatch(CompanySetupActions.updateCompanyError(error))
        throw error;
    }
}

export const searchCompany = (path, queryParams, searchData) => async dispatch => {
    dispatch(CompanySetupActions.searchCompanyPending())
    try {
        const response = await Axios.putWithRequestParam(path, queryParams, searchData)
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(response.data, queryParams.page, queryParams.size)
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "fileUri");
        dispatch(CompanySetupActions.searchCompanySuccess(dataWithPresignedUrl))
    } catch (e) {
        const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
        dispatch(CompanySetupActions.searchCompanyError(error))
    }
}

export const previewCompany = (path, id) => async dispatch => {
    dispatch(CompanySetupActions.previewCompanyPending())
    try {
        const response = await Axios.getWithPathVariables(path, id)
        let dataWithFileUri = response.data
        dataWithFileUri.companyLogo = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.companyLogo)
        dispatch(CompanySetupActions.previewCompanySuccess(response.data))
    } catch (e) {
        const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
        dispatch(CompanySetupActions.previewCompanyError(error))
        throw e;
    }
}

export const companyDropdown = path => async dispatch => {
    dispatch(CompanySetupActions.dropdownCompanyPending())
    try {
        const response = await Axios.get(path)
        dispatch(CompanySetupActions.dropdownCompanySuccess(response.data))
    } catch (e) {
        const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
        dispatch(CompanySetupActions.dropdownCompanyError(error))
    }
}

export const companyDelete = (path, id) => async dispatch => {
    dispatch(CompanySetupActions.deleteCompanyPending())
    try {
        await Axios.del(path, id)
        dispatch(
            CompanySetupActions.deleteCompanySuccess('Company Deleted Successfully')
        )
    } catch (e) {
        console.log(e);
        const error = e.errorMessage || 'Sorry Some Error Occured In Server!'
        dispatch(CompanySetupActions.deleteCompanyError(error))
        throw error;
    }
}

export const clearMessages = () => dispatch => {
    dispatch({type: CLEAR_EDIT_MESSAGE})
    dispatch({type: CLEAR_DELETE_MESSAGE})
    dispatch({type: CLEAR_PREVIEW_MESSAGE})
}
