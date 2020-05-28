import {UnitSetupActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";

export const fetchActiveDepartmentsForDropdown = (path) => async dispatch => {
    dispatch(UnitSetupActions.departmentFetchingStart());
    try {
        const response = await Axios.get(path);
        dispatch(UnitSetupActions.saveDepartments(response.data));
        return response.data;
    } catch (e) {
        dispatch(UnitSetupActions.departmentFetchingError(e.errorMessage ? e.errorMessage : "Sorry, Internal Problem occurred!"));
    }
};

export const createDepartment = (path, departmentData) => async dispatch => {
    dispatch(UnitSetupActions.createDepartmentPending());
    try {
        let response = await Axios.postRaw(path, departmentData);
        dispatch(UnitSetupActions.creatingDepartmentSuccess("Unit Created Successfully."));
        return response;
    } catch (e) {
        dispatch(UnitSetupActions.creatingDepartmentError(e.errorMessage));
        throw e;
    }
};

export const fetchDepartmentList = (path, queryParams, searchData) => async dispatch => {
    dispatch(UnitSetupActions.departmentListPending());
    try {
        const response = await Axios.putWithRequestParam(path, queryParams, searchData);
        dispatch(UnitSetupActions.departmentListSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(UnitSetupActions.departmentListError(e.errorMessage ? e.errorMessage : "Sorry, Internal Problem occurred!"));
    }
};

export const deleteDepartment = (path, deleteData) => async dispatch => {
    dispatch(UnitSetupActions.departmentDeletePending());
    try {
        const response = await Axios.del(path, deleteData);
        dispatch(UnitSetupActions.departmentDeleteSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(UnitSetupActions.departmentDeleteError(e.errorMessage ? e.errorMessage : "Sorry, Internal Problem occurred!"));
        throw e;
    }
};

export const editDepartment = (path, editData) => async dispatch => {
    dispatch(UnitSetupActions.departmentEditPending());
    try {
        const response = await Axios.put(path, editData);
        dispatch(UnitSetupActions.departmentEditSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(UnitSetupActions.departmentEditError(e.errorMessage ? e.errorMessage : "Sorry, Internal Problem occurred!"));
        throw e;
    }
};

export const previewDepartment = (path, id) => async dispatch => {
    dispatch(UnitSetupActions.departmentPreviewPending());
    dispatch(UnitSetupActions.clearDepartmentEditErrorMessage());
    try {
        const response = await Axios.getWithPathVariables(path, id);
        dispatch(UnitSetupActions.departmentPreviewSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(UnitSetupActions.departmentPreviewError(e.errorMessage ? e.errorMessage : "Sorry, Internal Problem occurred!"));
        throw e;
    }
};

export const downloadExcelForDepartments = (path) => async dispatch => {
    try {
        return await Axios.getFile(path);
    } catch (e) {
        throw e;
    }
};

export const clearDepartmentSuccessErrorMessagesFromStore = () => async dispatch => {
    dispatch(UnitSetupActions.clearDepartmentEditSuccessMessage());
    dispatch(UnitSetupActions.clearDepartmentEditErrorMessage());
    dispatch(UnitSetupActions.clearDepartmentPreviewErrorMessage());
    dispatch(UnitSetupActions.clearDepartmentListFetchErrorMessage());
    dispatch(UnitSetupActions.clearDepartmentCreateErrorMessage());
    dispatch(UnitSetupActions.clearDepartmentCreateSuccessMessage());
    dispatch(UnitSetupActions.clearDepartmentDeleteErrorMessage());
    dispatch(UnitSetupActions.clearDepartmentDeleteSuccessMessage());
};

export const fetchActiveDepartmentsByHospitalId = (path, hospitalId) => async dispatch => {
    try {
        const response = await Axios.getWithPathVariables(path, hospitalId);
        dispatch(UnitSetupActions.fetchDepartmentByHospitalIdSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(UnitSetupActions.fetchDepartmentByHospitalIdError(e.errorMessage ?
            e.errorMessage : "Sorry, Internal Problem occurred!"));
    }
};

