import {Axios} from "@frontend-appointment/core";
import {UniversitySetupActions} from "@frontend-appointment/action-module";

export const saveUniversity = (path, data) => async dispatch => {
    dispatch(UniversitySetupActions.saveUniversityPending());
    try {
        const response = await Axios.post(path, data);
        dispatch(UniversitySetupActions.saveUniversitySuccess(
            "University saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(UniversitySetupActions.saveUniversityError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const editUniversity = (path, data) => async dispatch => {
    dispatch(UniversitySetupActions.editUniversityPending());
    try {
        const response = await Axios.put(path, data);
        dispatch(UniversitySetupActions.editUniversitySuccess(
            "University edited successfully."));
        return response.data;
    } catch (e) {
        dispatch(UniversitySetupActions.editUniversityError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const deleteUniversity = (path, data) => async dispatch => {
    dispatch(UniversitySetupActions.deleteUniversityPending());
    try {
        const response = await Axios.del(path, data);
        dispatch(UniversitySetupActions.deleteUniversitySuccess(
            "University deleted successfully."));
        return response.data;
    } catch (e) {
        dispatch(UniversitySetupActions.deleteUniversityError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const searchUniversity = (path, data, paginationData) => async dispatch => {
    dispatch(UniversitySetupActions.searchUniversityPending());
    try {
        const response = await Axios.putWithPagination(path, paginationData, data);
        dispatch(UniversitySetupActions.searchUniversitySuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(UniversitySetupActions.searchUniversityError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveUniversityForDropdown = (path) => async dispatch => {
    dispatch(UniversitySetupActions.fetchUniversityPending());
    try {
        const response = await Axios.get(path);
        dispatch(UniversitySetupActions.fetchUniversitySuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(UniversitySetupActions.fetchUniversityError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const clearSuccessErrorMessageFormStore = () => async dispatch => {
    dispatch(UniversitySetupActions.clearDeleteUniversityMessage());
    dispatch(UniversitySetupActions.clearEditUniversityMessage());
    dispatch(UniversitySetupActions.clearSaveUniversityMessage());
    dispatch(UniversitySetupActions.clearSearchUniversityMessage());
};
