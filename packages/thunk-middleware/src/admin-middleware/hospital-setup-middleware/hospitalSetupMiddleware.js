import {HospitalSetupActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
import {CommonUtils} from "@frontend-appointment/helpers";
import {MinioMiddleware} from '../../../index'

export const createHospital = (
    path,
    hospitalData
) => async dispatch => {
    dispatch(HospitalSetupActions.createHospitalPending());
    try {
        const response = await Axios.post(
            path,
            hospitalData
        );
        dispatch(HospitalSetupActions.createHospitalSuccess());
        return response
    } catch (e) {
        dispatch(HospitalSetupActions.createHospitalError(e.errorMessage));
        throw e
    }
};

export const clearHospitalCreateMessage = () => dispatch => {
    dispatch(HospitalSetupActions.clearHospitalCreateMessage());
    dispatch(HospitalSetupActions.clearHospitalDeleteMessage());
    dispatch(HospitalSetupActions.clearHospitalEditMessage());
    dispatch(HospitalSetupActions.clearHospitalListMessage());
    dispatch(HospitalSetupActions.clearHospitalPreviewMessage())
}

export const editHospital = (path, data) => async dispatch => {
    dispatch(HospitalSetupActions.createHospitalEditPending());
    try {
        const response = await Axios.put(path, data);
        dispatch(HospitalSetupActions.createHospitalEditSuccess(response.data));
        return response
    } catch (e) {
        dispatch(HospitalSetupActions.createHospitalEditError(e.errorMessage ? e.errorMessage : "Sorry! Internal Server Problem occurred."));
        throw e
    }
};

export const previewHospital = (path, id) => async dispatch => {
    dispatch(HospitalSetupActions.createHospitalPreviewPending());
    try {
        const response = await Axios.getWithPathVariables(path, id)
        let dataWithFileUri = response.data
        dataWithFileUri.hospitalLogo = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.hospitalLogo)
        dataWithFileUri.hospitalBanner = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.hospitalBanner)
        dispatch(HospitalSetupActions.createHospitalPreviewSuccess(dataWithFileUri))
        return response;
    } catch (e) {
        dispatch(HospitalSetupActions.createHospitalPreviewError(e.errorMessage ? e.errorMessage : "Sorry Internal Server problem occurred!"));
        throw e
    }
};

export const searchHospital = (path, queryParams, data) => async dispatch => {
    dispatch(HospitalSetupActions.createHospitalSearchPending());
    try {
        const response = await Axios.putWithRequestParam(path, queryParams, data);
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(response.data, queryParams.page, queryParams.size)
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "fileUri");
        dispatch(HospitalSetupActions.createHospitalSearchSuccess(dataWithPresignedUrl));
        return response;
    } catch (e) {
        dispatch(HospitalSetupActions.createHospitalListError(e.errorMessage));
        throw e
    }
};

export const deleteHospital = (path, id) => async dispatch => {
    dispatch(HospitalSetupActions.createHospitalDeletePending());
    try {
        const response = await Axios.del(path, id);
        dispatch(HospitalSetupActions.createHospitalDeleteSucess());
        return response
    } catch (e) {
        dispatch(HospitalSetupActions.createHospitalDeleteError(e.errorMessage));
        throw e
    }
};

export const downloadExcelForHospitals = path => async () => {
    try {
        return await Axios.getFile(path)
    } catch (e) {
        throw e
    }
};

export const fetchActiveHospitalsForDropdown = (path) => async dispatch => {
    try {
        const response = await Axios.get(path);
        dispatch(HospitalSetupActions.hospitalsFetchForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(HospitalSetupActions.hospitalsFetchForDropdownError("Error fetching department"));
    }
};

export const fetchAllHospitalsForDropdown = (path) => async dispatch => {
    dispatch(HospitalSetupActions.allHospitalsFetchForDropdownPending());
    try {
        const response = await Axios.get(path);
        dispatch(HospitalSetupActions.allHospitalsFetchForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(HospitalSetupActions.allHospitalsFetchForDropdownError("Error fetching department"));
    }
};
