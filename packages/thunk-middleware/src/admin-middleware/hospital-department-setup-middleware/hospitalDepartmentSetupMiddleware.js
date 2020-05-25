import {Axios} from "@frontend-appointment/core";
import {HospitalDepartmentSetupActions} from "@frontend-appointment/action-module";
import {CommonUtils} from "@frontend-appointment/helpers";

export const saveHospitalDepartment = (path, data) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.saveHospitalDepartmentPending());
    try {
        const response = await Axios.post(path, data);
        dispatch(HospitalDepartmentSetupActions.saveHospitalDepartmentSuccess(
            "Hospital Department saved successfully."));
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
            "Hospital Department edited successfully."));
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
            "Hospital Department deleted successfully."));
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
        const apiResponse = await Axios.putWithPagination(path, paginationData, data);
        let dataWithSerialNumber = CommonUtils.appendSerialNumberToDataList(apiResponse.data.hospitalDepartmentList,
            paginationData.page, paginationData.size);
        dispatch(HospitalDepartmentSetupActions.searchHospitalDepartmentSuccess({
            ...apiResponse.data,
            hospitalDepartmentList: dataWithSerialNumber
        }));
        return apiResponse.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.searchHospitalDepartmentError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchHospitalDepartmentDetailsByHospitalDepartmentId = (path, departmentId) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.previewHospitalDepartmentPending());
    try {
        const response = await Axios.getWithPathVariables(path, departmentId);
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

export const fetchAllHospitalDepartmentForDropdownByHospitalId = (path, hospitalId) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.fetchAllHospitalDepartmentPending());
    try {
        const response = await Axios.getWithPathVariables(path, hospitalId);
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

export const fetchAvailableRoomsForDropdown = (path) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.fetchAvailableRoomsForDropdownPending());
    try {
        const response = await Axios.get(path);
        dispatch(HospitalDepartmentSetupActions.fetchAvailableRoomsForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.fetchAvailableRoomsForDropdownError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchAvailableRoomsByHospitalIdForDropdown = (path,hospitalId) => async dispatch => {
    dispatch(HospitalDepartmentSetupActions.fetchAvailableRoomsForDropdownPending());
    try {
        const response = await Axios.getWithPathVariables(path,hospitalId);
        dispatch(HospitalDepartmentSetupActions.fetchAvailableRoomsForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(HospitalDepartmentSetupActions.fetchAvailableRoomsForDropdownError(
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
