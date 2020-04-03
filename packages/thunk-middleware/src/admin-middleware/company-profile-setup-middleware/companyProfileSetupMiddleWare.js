import {CompanyProfileSetupActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";

export const createCompanyProfile = (path, profileData) => async dispatch => {
    dispatch(CompanyProfileSetupActions.createProfilePending());
    try {
        let response = await Axios.post(path, profileData);
        dispatch(CompanyProfileSetupActions.createProfileSuccess("Company Profile Created Successfully."));
        return response;
    } catch (e) {
        dispatch(CompanyProfileSetupActions.createProfileError(
            e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error Occurred!'));
        throw e;
    }
};

export const editCompanyProfile = (path, profileData) => async dispatch => {
    dispatch(CompanyProfileSetupActions.editProfilePending());
    try {
        let response = await Axios.put(path, profileData);
        dispatch(CompanyProfileSetupActions.editProfileSuccess("Company Profile Updated Successfully."));
        return response;
    } catch (e) {
        dispatch(CompanyProfileSetupActions.editProfileError(
            e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error Occurred!'));
        throw e;
    }
};

export const deleteCompanyProfile = (path, profileData) => async dispatch => {
    dispatch(CompanyProfileSetupActions.deleteProfilePending());
    try {
        let response = await Axios.del(path, profileData);
        dispatch(CompanyProfileSetupActions.deleteProfileSuccess("Company Profile Deleted Successfully."));
        return response;
    } catch (e) {
        dispatch(CompanyProfileSetupActions.deleteProfileError(
            e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error Occurred!'));
        throw e;
    }
};

export const previewCompanyProfileById = (path, profileId) => async dispatch => {
    dispatch(CompanyProfileSetupActions.previewProfilePending());
    try {
        let response = await Axios.getWithPathVariables(path, profileId);
        dispatch(CompanyProfileSetupActions.previewProfileSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(CompanyProfileSetupActions.previewProfileError(
            e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error Occurred!'));
        throw e;
    }
};

export const searchCompanyProfiles = (path, pageObj, searchData,) => async dispatch => {
    dispatch(CompanyProfileSetupActions.searchProfilePending());
    try {
        let response = await Axios.putWithPagination(path, pageObj, searchData);
        dispatch(CompanyProfileSetupActions.searchProfileSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(CompanyProfileSetupActions.searchProfileError(
            e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error Occurred!'));
        throw e;
    }
};

export const fetchCompanyProfileListForDropdown = (path) => async dispatch => {
    dispatch(CompanyProfileSetupActions.fetchCompanyProfileForDropdownPending());
    try {
        let response = await Axios.get(path);
        dispatch(CompanyProfileSetupActions.fetchCompanyProfileForDropdownSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(CompanyProfileSetupActions.fetchCompanyProfileForDropdownError(
            e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error Occurred!'));
        throw e;
    }
};

export const fetchActiveCompanyProfileListByCompanyIdForDropdown = (path) => async dispatch => {
    dispatch(CompanyProfileSetupActions.fetchCompanyProfileByCompanyIdForDropdownPending());
    try {
        let response = await Axios.get(path);
        dispatch(CompanyProfileSetupActions.fetchCompanyProfileByCompanyIdForDropdownSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(CompanyProfileSetupActions.fetchCompanyProfileByComapanyIdForDropdownError(
            e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Error Occurred!'));
        throw e;
    }
};

export const clearSuccessErrorMessageFromStore = () => async dispatch => {
    dispatch(CompanyProfileSetupActions.clearProfileCreateMessages());
    dispatch(CompanyProfileSetupActions.clearProfileDeleteMessages());
    dispatch(CompanyProfileSetupActions.clearProfileEditMessages());
    dispatch(CompanyProfileSetupActions.clearProfilePreviewMessages());
    // dispatch(CompanyProfileSetupActions.clearProfileSearchMessages());
};
