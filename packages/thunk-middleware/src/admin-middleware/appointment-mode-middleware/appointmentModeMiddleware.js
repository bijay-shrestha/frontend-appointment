import {Axios} from "@frontend-appointment/core";
import {AppointmentModeActions} from "@frontend-appointment/action-module";

export const saveAppointmentMode = (path, data) => async dispatch => {
    dispatch(AppointmentModeActions.saveAppointmentModePending());
    try {
        const response = await Axios.post(path, data);
        dispatch(AppointmentModeActions.saveAppointmentModeSuccess(
            "Appointment Mode saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(AppointmentModeActions.saveAppointmentModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const editAppointmentMode = (path, data) => async dispatch => {
    dispatch(AppointmentModeActions.editAppointmentModePending());
    try {
        const response = await Axios.put(path, data);
        dispatch(AppointmentModeActions.editAppointmentModeSuccess(
            "Appointment Mode edited successfully."));
        return response.data;
    } catch (e) {
        dispatch(AppointmentModeActions.editAppointmentModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const deleteAppointmentMode = (path, data) => async dispatch => {
    dispatch(AppointmentModeActions.deleteAppointmentModePending());
    try {
        const response = await Axios.del(path, data);
        dispatch(AppointmentModeActions.deleteAppointmentModeSuccess(
            "Appointment Mode deleted successfully."));
        return response.data;
    } catch (e) {
        dispatch(AppointmentModeActions.deleteAppointmentModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const searchAppointmentMode = (path, data, paginationData) => async dispatch => {
    dispatch(AppointmentModeActions.searchAppointmentModePending());
    try {
        const response = await Axios.putWithPagination(path, paginationData, data);
        dispatch(AppointmentModeActions.searchAppointmentModeSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(AppointmentModeActions.searchAppointmentModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchAppointmentModeDetailsByAppointmentModeId = (path, universityId) => async dispatch => {
    dispatch(AppointmentModeActions.previewAppointmentModePending());
    try {
        const response = await Axios.getWithPathVariables(path, universityId);
        dispatch(AppointmentModeActions.previewAppointmentModeSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(AppointmentModeActions.previewAppointmentModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveAppointmentModeForDropdown = (path) => async dispatch => {
    dispatch(AppointmentModeActions.fetchAppointmentModePending());
    try {
        const response = await Axios.get(path);
        dispatch(AppointmentModeActions.fetchAppointmentModeSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(AppointmentModeActions.fetchAppointmentModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const clearSuccessErrorMessageFormStore = () => async dispatch => {
    dispatch(AppointmentModeActions.clearDeleteAppointmentModeMessage());
    dispatch(AppointmentModeActions.clearEditAppointmentModeMessage());
    dispatch(AppointmentModeActions.clearSaveAppointmentModeMessage());
    dispatch(AppointmentModeActions.clearSearchAppointmentModeMessage());
};
