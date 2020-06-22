import {Axios} from "@frontend-appointment/core";
import {RoomSetupActions} from "@frontend-appointment/action-module";

export const saveRoomNumber = (path, data) => async dispatch => {
    dispatch(RoomSetupActions.saveRoomNumberPending());
    try {
        const response = await Axios.post(path, data);
        dispatch(RoomSetupActions.saveRoomNumberSuccess(
            "Room Number saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.saveRoomNumberError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const editRoomNumber = (path, data) => async dispatch => {
    dispatch(RoomSetupActions.editRoomNumberPending());
    try {
        const response = await Axios.put(path, data);
        dispatch(RoomSetupActions.editRoomNumberSuccess(
            "Room Number edited successfully."));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.editRoomNumberError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const deleteRoomNumber = (path, data) => async dispatch => {
    dispatch(RoomSetupActions.deleteRoomNumberPending());
    try {
        const response = await Axios.del(path, data);
        dispatch(RoomSetupActions.deleteRoomNumberSuccess(
            "Room Number deleted successfully."));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.deleteRoomNumberError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const searchRoomNumber = (path, data, paginationData) => async dispatch => {
    dispatch(RoomSetupActions.searchRoomNumberPending());
    try {
        const response = await Axios.putWithPagination(path, paginationData, data);
        dispatch(RoomSetupActions.searchRoomNumberSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.searchRoomNumberError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveRoomNumberForDropdownByHospitalId = (path, hospitalId) => async dispatch => {
    dispatch(RoomSetupActions.fetchActiveRoomNumberPending());
    try {
        const response = await Axios.getWithPathVariables(path, hospitalId);
        dispatch(RoomSetupActions.fetchActiveRoomNumberSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.fetchActiveRoomNumberError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveRoomNumberForDropdown = (path) => async dispatch => {
    dispatch(RoomSetupActions.fetchActiveRoomNumberPending());
    try {
        const response = await Axios.get(path);
        dispatch(RoomSetupActions.fetchActiveRoomNumberSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.fetchActiveRoomNumberError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchAllRoomNumberForDropdownByHospitalId = (path, hospitalId) => async dispatch => {
    dispatch(RoomSetupActions.fetchAllRoomNumberPending());
    try {
        const response = await Axios.getWithPathVariables(path, hospitalId);
        dispatch(RoomSetupActions.fetchAllRoomNumberSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.fetchAllRoomNumberError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchAllRoomNumberForDropdown = (path) => async dispatch => {
    dispatch(RoomSetupActions.fetchAllRoomNumberPending());
    try {
        const response = await Axios.get(path);
        dispatch(RoomSetupActions.fetchAllRoomNumberSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.fetchAllRoomNumberError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveRoomNumberForDropdownByDepartmentId = (path, departmentId) => async dispatch => {
    dispatch(RoomSetupActions.fetchActiveRoomNumberByDepartmentPending());
    try {
        const response = await Axios.getWithPathVariables(path, departmentId);
        dispatch(RoomSetupActions.fetchActiveRoomNumberByDepartmentSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.fetchActiveRoomNumberByDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchAllRoomNumberForDropdownByDepartmentId = (path, departmentId) => async dispatch => {
    dispatch(RoomSetupActions.fetchActiveRoomNumberByDepartmentPending());
    try {
        const response = await Axios.getWithPathVariables(path, departmentId);
        dispatch(RoomSetupActions.fetchActiveRoomNumberByDepartmentSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(RoomSetupActions.fetchActiveRoomNumberByDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const clearSuccessErrorMessageFormStore = () => async dispatch => {
    dispatch(RoomSetupActions.clearDeleteRoomNumberMessage());
    dispatch(RoomSetupActions.clearEditRoomNumberMessage());
    dispatch(RoomSetupActions.clearSaveRoomNumberMessage());
    dispatch(RoomSetupActions.clearSearchRoomNumberMessage());
};
