import {Axios} from "@frontend-appointment/core";
import {HospitalDepartmentSetupActions} from "@frontend-appointment/action-module";

export const saveHospitalDepartment = (path, data) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.saveHospitalDepartmentPending());
    try {
        const response = await Axios.post(path, data);
        dispatch(HospitalDepartmentSetupActions.saveHospitalDepartmentSuccess(
            "HospitalDepartment saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.saveHospitalDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const editHospitalDepartment = (path, data) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.editHospitalDepartmentPending());
    try {
        const response = await Axios.put(path, data);
        dispatch(HospitalDepartmentSetupActions.editHospitalDepartmentSuccess(
            "HospitalDepartment edited successfully."));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.editHospitalDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const deleteHospitalDepartment = (path, data) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.deleteHospitalDepartmentPending());
    try {
        const response = await Axios.del(path, data);
        dispatch(HospitalDepartmentSetupActions.deleteHospitalDepartmentSuccess(
            "HospitalDepartment deleted successfully."));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.deleteHospitalDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const searchHospitalDepartment = (path, data, paginationData) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.searchHospitalDepartmentPending());
    try {
        const response = await Axios.putWithPagination(path, paginationData, data);
        dispatch(HospitalDepartmentSetupActions.searchHospitalDepartmentSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.searchHospitalDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchHospitalDepartmentDetailsByHospitalDepartmentId = (path, universityId) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.previewHospitalDepartmentPending());
    try {
        const response = await Axios.getWithPathVariables(path, universityId);
        dispatch(HospitalDepartmentSetupActions.previewHospitalDepartmentSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.previewHospitalDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchAllHospitalDepartmentForDropdown = (path) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.fetchAllHospitalDepartmentPending());
    try {
        const response = await Axios.get(path);
        dispatch(HospitalDepartmentSetupActions.fetchAllHospitalDepartmentSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.fetchAllHospitalDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveHospitalDepartmentForDropdown = (path) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.fetchActiveHospitalDepartmentPending());
    try {
        const response = await Axios.get(path);
        dispatch(HospitalDepartmentSetupActions.fetchActiveHospitalDepartmentSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.fetchActiveHospitalDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const clearSuccessErrorMessageFormStore = () => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.clearDeleteHospitalDepartmentMessage());
    dispatch(HospitalDepartmentSetupActions.clearEditHospitalDepartmentMessage());
    dispatch(HospitalDepartmentSetupActions.clearSaveHospitalDepartmentMessage());
    dispatch(HospitalDepartmentSetupActions.clearSearchHospitalDepartmentMessage());
};
