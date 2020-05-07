import {Axios} from "@frontend-appointment/core";
import {ShiftSetupActions} from "@frontend-appointment/action-module";

export const saveShift = (path, data) => async dispatch => {
    dispatch(ShiftSetupActions.saveShiftPending());
    try {
        const response = await Axios.post(path, data);
        dispatch(ShiftSetupActions.saveShiftSuccess(
            "Shift saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(ShiftSetupActions.saveShiftError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const editShift = (path, data) => async dispatch => {
    dispatch(ShiftSetupActions.editShiftPending());
    try {
        const response = await Axios.put(path, data);
        dispatch(ShiftSetupActions.editShiftSuccess(
            "Shift edited successfully."));
        return response.data;
    } catch (e) {
        dispatch(ShiftSetupActions.editShiftError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const deleteShift = (path, data) => async dispatch => {
    dispatch(ShiftSetupActions.deleteShiftPending());
    try {
        const response = await Axios.del(path, data);
        dispatch(ShiftSetupActions.deleteShiftSuccess(
            "Shift deleted successfully."));
        return response.data;
    } catch (e) {
        dispatch(ShiftSetupActions.deleteShiftError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const searchShift = (path, data, paginationData) => async dispatch => {
    dispatch(ShiftSetupActions.searchShiftPending());
    try {
        const response = await Axios.putWithPagination(path, paginationData, data);
        dispatch(ShiftSetupActions.searchShiftSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(ShiftSetupActions.searchShiftError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

// export const fetchShiftDetailsByShiftId = (path, shiftId) => async dispatch => {
//     dispatch(ShiftSetupActions.previewShiftPending());
//     try {
//         const response = await Axios.getWithPathVariables(path, shiftId);
//         dispatch(ShiftSetupActions.previewShiftSuccess(response.data));
//         return response.data;
//     } catch (e) {
//         dispatch(ShiftSetupActions.previewShiftError(
//             e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
//         throw e;
//     }
// };

export const fetchActiveShiftByDoctorIdForDropdown = (path) => async dispatch => {
    dispatch(ShiftSetupActions.fetchActiveShiftByDoctorIdForDropdownPending());
    try {
        const response = await Axios.get(path);
        dispatch(ShiftSetupActions.fetchActiveShiftByDoctorIdForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(ShiftSetupActions.fetchActiveShiftByDoctorIdForDropdownError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveShiftByHospitalIdForDropdown = (path) => async dispatch => {
    dispatch(ShiftSetupActions.fetchActiveShiftByHospitalIdForDropdownPending());
    try {
        const response = await Axios.get(path);
        dispatch(ShiftSetupActions.fetchActiveShiftByHospitalIdForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(ShiftSetupActions.fetchActiveShiftByHospitalIdForDropdownError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const clearSuccessErrorMessageFormStore = () => async dispatch => {
    dispatch(ShiftSetupActions.clearDeleteShiftMessage());
    dispatch(ShiftSetupActions.clearEditShiftMessage());
    dispatch(ShiftSetupActions.clearSaveShiftMessage());
    dispatch(ShiftSetupActions.clearSearchShiftMessage());
};
