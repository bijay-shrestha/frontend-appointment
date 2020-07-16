import {AdminSetupActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
import {CommonUtils} from '@frontend-appointment/helpers'
import {MinioMiddleware} from '../../../index'

export const createAdmin = (path, adminData) => async dispatch => {
    dispatch(AdminSetupActions.createAdminPending())
    try {
        let response = await Axios.post(
            path,
            adminData
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
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(response.data, queryParams.page, queryParams.size)
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "fileUri");
        dispatch(AdminSetupActions.adminListSuccess(dataWithPresignedUrl))
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

export const editAdmin = (path, editData) => async dispatch => {
    dispatch(AdminSetupActions.adminEditPending())
    try {
        const response = await Axios.put(
            path,
            editData
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
        let dataWithFileUri = response.data
        dataWithFileUri.fileUri = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.fileUri)
        dispatch(AdminSetupActions.adminPreviewSuccess(dataWithFileUri))
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
