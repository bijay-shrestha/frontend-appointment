import {ProfileSetupActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";

export const fetchDepartments = (path) => async dispatch => {
    dispatch(ProfileSetupActions.departmentFetchingStart());
    try {
        const response = await Axios.get(path);
        dispatch(ProfileSetupActions.saveDepartments(response.data));
        return response.data;
    } catch (e) {
        dispatch(ProfileSetupActions.departmentFetchingError("Error fetching department"));
    }
};

export const fetchSubDepartmentsByDepartmentId = (path, departmentId) => async dispatch => {
    dispatch(ProfileSetupActions.subDepartmentFetchingStart());
    try {
        const response = await Axios.getWithPathVariables(path, departmentId);
        return response.data;
    } catch (e) {
        dispatch(ProfileSetupActions.subDepartmentFetchingError("Error fetching department"));
    }
};

export const createProfile = (path, profileData) => async dispatch => {
    dispatch(ProfileSetupActions.createProfileLoading());
    try {
        let response = await Axios.postRaw(path, profileData);
        dispatch(ProfileSetupActions.creatingProfileSuccess("Profile Created Successfully."));
        return response;
    } catch (e) {
        dispatch(ProfileSetupActions.creatingProfileError(e.errorMessage));
        throw e;
    }
};

export const fetchProfileList = (path, queryParams, searchData) => async dispatch => {
    dispatch(ProfileSetupActions.profileListLoading());
    try {
        const response = await Axios.putWithRequestParam(path, queryParams, searchData);
        dispatch(ProfileSetupActions.profileListSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(ProfileSetupActions.profileListError(e.errorMessage));
    }
};

export const deleteProfile = (path, deleteData) => async dispatch => {
    dispatch(ProfileSetupActions.profileDeleteLoading());
    try {
        const response = await Axios.del(path, deleteData);
        dispatch(ProfileSetupActions.profileDeleteSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(ProfileSetupActions.profileDeleteError(e.errorMessage));
        throw e;
    }
};

export const editProfile = (path, editData) => async dispatch => {
    dispatch(ProfileSetupActions.profileEditLoading());
    try {
        const response = await Axios.put(path, editData);
        dispatch(ProfileSetupActions.profileEditSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(ProfileSetupActions.profileEditError(e.errorMessage));
        throw e;
    }
};

export const previewProfile = (path, id) => async dispatch => {
    dispatch(ProfileSetupActions.profilePreviewLoading());
    dispatch(ProfileSetupActions.clearProfileEditErrorMessage());
    try {
        const response = await Axios.getWithPathVariables(path, id);
        dispatch(ProfileSetupActions.profilePreviewSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(ProfileSetupActions.profilePreviewError(e.errorMessage));
        throw e;
    }
};

export const clearSuccessErrorMessagesFromStore = () => async dispatch => {
    dispatch(ProfileSetupActions.clearProfileEditSuccessMessage());
    dispatch(ProfileSetupActions.clearProfileEditErrorMessage());
    dispatch(ProfileSetupActions.clearProfilePreviewErrorMessage());
    dispatch(ProfileSetupActions.clearProfileListFetchErrorMessage());
    dispatch(ProfileSetupActions.clearProfileCreateErrorMessage());
    dispatch(ProfileSetupActions.clearProfileCreateSuccessMessage());
    dispatch(ProfileSetupActions.clearProfileDeleteErrorMessage());
    dispatch(ProfileSetupActions.clearProfileDeleteSuccessMessage());
};

