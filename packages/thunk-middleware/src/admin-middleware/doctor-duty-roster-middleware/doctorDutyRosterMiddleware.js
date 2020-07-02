import {DoctorDutyRosterActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";
import {MinioMiddleware} from '../../../index'
import {CommonUtils} from '@frontend-appointment/helpers'

export const createDoctorDutyRoster = (path, doctorDutyRosterData) => async dispatch => {
    dispatch(DoctorDutyRosterActions.createDoctorDutyRosterPending());
    try {
        const response = await Axios.post(path, doctorDutyRosterData);
        dispatch(DoctorDutyRosterActions.createDoctorDutyRosterSuccess("Doctor Duty Roster created Successfully."));
        return response;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.createDoctorDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const fetchDoctorDutyRosterList = (path, searchData, pageObj) => async dispatch => {
    dispatch(DoctorDutyRosterActions.searchDoctorDutyRosterPending());
    try {
        const response = await Axios.putWithPagination(path, searchData, pageObj);
        let dataWithSN = CommonUtils.appendSerialNumberToDataList(response.data, pageObj.page, pageObj.size);
        const dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSN, "fileUri");
        dispatch(DoctorDutyRosterActions.searchDoctorDutyRosterSuccess(dataWithPresignedUrl));
        return response.data;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.searchDoctorDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const fetchDoctorDutyRosterDetailById = (path, doctorDutyRosterId) => async dispatch => {
    dispatch(DoctorDutyRosterActions.fetchDoctorDutyRosterDetailPending());
    try {
        const response = await Axios.getWithPathVariables(path, doctorDutyRosterId);
        let dataWithFileUri = response.data.doctorDutyRosterInfo
        dataWithFileUri.fileUri = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.fileUri)
        dispatch(DoctorDutyRosterActions.fetchDoctorDutyRosterDetailSuccess(
            {...response.data, doctorDutyRosterInfo: dataWithFileUri}));
        return response.data;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.fetchDoctorDutyRosterDetailError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const updateDoctorDutyRoster = (path, updateDoctorDutyRosterData) => async dispatch => {
    dispatch(DoctorDutyRosterActions.updateDoctorDutyRosterPending());
    try {
        const response = await Axios.put(path, updateDoctorDutyRosterData);
        dispatch(DoctorDutyRosterActions.updateDoctorDutyRosterSuccess('Doctor Duty roster edited successfully.'));
        return response.data;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.updateDoctorDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const deleteDoctorDutyRoster = (path, deleteRosterData) => async dispatch => {
    dispatch(DoctorDutyRosterActions.deleteDoctorDutyRosterPending());
    try {
        const response = await Axios.del(path, deleteRosterData);
        dispatch(DoctorDutyRosterActions.deleteDoctorDutyRosterSuccess('Doctor Duty roster deleted successfully.'));
        return response.data;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.deleteDoctorDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const fetchExistingDoctorDutyRoster = (path, requestDTO) => async dispatch => {
    // TODO Add action and reducers?
    try {
        const response = await Axios.put(path, requestDTO);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const fetchExistingDoctorDutyRosterDetails = (path, doctorDutyRosterId) => async dispatch => {
    try {
        const response = await Axios.getWithPathVariables(path, doctorDutyRosterId);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const updateDoctorDutyRosterOverride = (path, data) => async dispatch => {
    try {
        const response = await Axios.put(path, data);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const revertDoctorDutyRosterOverrideUpdate = (path, data) => async dispatch => {
    try {
        const response = await Axios.put(path, data);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const deleteDoctorDutyRosterOverride = (path, data) => async dispatch => {
    try {
        const response = await Axios.del(path, data);
        return response.data;
    } catch (e) {
        throw e;
    }
};

export const clearDDRSuccessErrorMessage = () => async dispatch => {
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterCreateErrorMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterCreateSuccessMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterDeleteErrorMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterDeleteSuccessMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterDetailErrorMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterDetailSuccessMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterSearchErrorMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterSearchSuccessMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterUpdateErrorMessage());
    dispatch(DoctorDutyRosterActions.clearDoctorDutyRosterUpdateSuccessMessage());
};
