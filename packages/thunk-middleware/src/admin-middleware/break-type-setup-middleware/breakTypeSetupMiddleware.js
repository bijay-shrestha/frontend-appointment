import {Axios} from "@frontend-appointment/core";
import {BreakTypeSetupActions} from "@frontend-appointment/action-module";

export const saveBreakType = (path, data) => async dispatch => {
    dispatch(BreakTypeSetupActions.saveBreakTypePending());
    try {
        const response = await Axios.post(path, data);
        dispatch(BreakTypeSetupActions.saveBreakTypeSuccess(
            "BreakType saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(BreakTypeSetupActions.saveBreakTypeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const editBreakType = (path, data) => async dispatch => {
    dispatch(BreakTypeSetupActions.editBreakTypePending());
    try {
        const response = await Axios.put(path, data);
        dispatch(BreakTypeSetupActions.editBreakTypeSuccess(
            "BreakType edited successfully."));
        return response.data;
    } catch (e) {
        dispatch(BreakTypeSetupActions.editBreakTypeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const deleteBreakType = (path, data) => async dispatch => {
    dispatch(BreakTypeSetupActions.deleteBreakTypePending());
    try {
        const response = await Axios.del(path, data);
        dispatch(BreakTypeSetupActions.deleteBreakTypeSuccess(
            "BreakType deleted successfully."));
        return response.data;
    } catch (e) {
        dispatch(BreakTypeSetupActions.deleteBreakTypeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const searchBreakType = (path, data, paginationData) => async dispatch => {
    dispatch(BreakTypeSetupActions.searchBreakTypePending());
    try {
        const response = await Axios.putWithPagination(path, paginationData, data);
        dispatch(BreakTypeSetupActions.searchBreakTypeSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(BreakTypeSetupActions.searchBreakTypeError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

// export const fetchBreakTypeDetailsByBreakTypeId = (path, breakTypeId) => async dispatch => {
//     dispatch(BreakTypeSetupActions.previewBreakTypePending());
//     try {
//         const response = await Axios.getWithPathVariables(path, breakTypeId);
//         dispatch(BreakTypeSetupActions.previewBreakTypeSuccess(response.data));
//         return response.data;
//     } catch (e) {
//         dispatch(BreakTypeSetupActions.previewBreakTypeError(
//             e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
//         throw e;
//     }
// };

export const fetchActiveBreakTypeByHospitalIdForDropdown = (path, hospitalId) => async dispatch => {
    dispatch(BreakTypeSetupActions.fetchActiveBreakTypeByHospitalIdForDropdownPending());
    try {
        const response = await Axios.getWithPathVariables(path, hospitalId);
        dispatch(BreakTypeSetupActions.fetchActiveBreakTypeByHospitalIdForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(BreakTypeSetupActions.fetchActiveBreakTypeByHospitalIdForDropdownError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const clearSuccessErrorMessageFormStore = () => async dispatch => {
    dispatch(BreakTypeSetupActions.clearDeleteBreakTypeMessage());
    dispatch(BreakTypeSetupActions.clearEditBreakTypeMessage());
    dispatch(BreakTypeSetupActions.clearSaveBreakTypeMessage());
    dispatch(BreakTypeSetupActions.clearSearchBreakTypeMessage());
};
