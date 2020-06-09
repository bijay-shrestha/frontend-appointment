import {Axios} from "@frontend-appointment/core";
import {BillingModeActions} from "@frontend-appointment/action-module";

export const saveBillingMode = (path, data) => async dispatch => {
    dispatch(BillingModeActions.saveBillingModePending());
    try {
        const response = await Axios.post(path, data);
        dispatch(BillingModeActions.saveBillingModeSuccess(
            "Billing Mode saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.saveBillingModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const editBillingMode = (path, data) => async dispatch => {
    dispatch(BillingModeActions.editBillingModePending());
    try {
        const response = await Axios.put(path, data);
        dispatch(BillingModeActions.editBillingModeSuccess(
            "Billing Mode edited successfully."));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.editBillingModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const deleteBillingMode = (path, data) => async dispatch => {
    dispatch(BillingModeActions.deleteBillingModePending());
    try {
        const response = await Axios.del(path, data);
        dispatch(BillingModeActions.deleteBillingModeSuccess(
            "Billing Mode deleted successfully."));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.deleteBillingModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const searchBillingMode = (path, data, paginationData) => async dispatch => {
    dispatch(BillingModeActions.searchBillingModePending());
    try {
        const response = await Axios.putWithPagination(path, paginationData, data);
        dispatch(BillingModeActions.searchBillingModeSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.searchBillingModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const previewBillingMode = (path, billingModeId) => async dispatch => {
    dispatch(BillingModeActions.previewBillingModePending());
    try {
        const response = await Axios.getWithPathVariables(path, billingModeId);
        dispatch(BillingModeActions.previewBillingModeSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.previewBillingModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveBillingModeForDropdown = (path) => async dispatch => {
    dispatch(BillingModeActions.fetchActiveBillingModePending());
    try {
        const response = await Axios.get(path);
        dispatch(BillingModeActions.fetchActiveBillingModeSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.fetchActiveBillingModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchAllBillingModeForDropdown = (path) => async dispatch => {
    dispatch(BillingModeActions.fetchAllBillingModePending());
    try {
        const response = await Axios.get(path);
        dispatch(BillingModeActions.fetchAllBillingModeSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.fetchAllBillingModeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveBillingModeForDropdownByHospitalId = (path, hospitalId) => async dispatch => {
    dispatch(BillingModeActions.fetchActiveBillingModeByHospitalPending());
    try {
        const response = await Axios.getWithPathVariables(path, hospitalId);
        dispatch(BillingModeActions.fetchActiveBillingModeByHospitalSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.fetchActiveBillingModeByHospitalError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchAllBillingModeForDropdownByHospitalId = (path, hospitalId) => async dispatch => {
    dispatch(BillingModeActions.fetchAllBillingModeByHospitalPending());
    try {
        const response = await Axios.getWithPathVariables(path, hospitalId);
        dispatch(BillingModeActions.fetchAllBillingModeByHospitalSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(BillingModeActions.fetchAllBillingModeByHospitalError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const clearSuccessErrorMessageFormStore = () => async dispatch => {
    dispatch(BillingModeActions.clearDeleteBillingModeMessage());
    dispatch(BillingModeActions.clearEditBillingModeMessage());
    dispatch(BillingModeActions.clearSaveBillingModeMessage());
    dispatch(BillingModeActions.clearSearchBillingModeMessage());
    dispatch(BillingModeActions.clearPreviewBillingModeMessage());
};
