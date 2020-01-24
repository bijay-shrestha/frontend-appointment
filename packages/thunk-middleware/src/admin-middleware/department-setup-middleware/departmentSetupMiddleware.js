import {DepartmentSetupActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";

export const fetchActiveDepartmentsForDropdown = (path) => async dispatch => {
    dispatch(DepartmentSetupActions.departmentFetchingStart());
    try {
        const response = await Axios.get(path);
        dispatch(DepartmentSetupActions.saveDepartments(response.data));
        return response.data;
    } catch (e) {
        dispatch(DepartmentSetupActions.departmentFetchingError("Error fetching department"));
    }
};

export const createDepartment = (path, departmentData) => async dispatch => {
    dispatch(DepartmentSetupActions.createDepartmentPending());
    try {
        let response = await Axios.postRaw(path, departmentData);
        dispatch(DepartmentSetupActions.creatingDepartmentSuccess("Department Created Successfully."));
        return response;
    } catch (e) {
        dispatch(DepartmentSetupActions.creatingDepartmentError(e.errorMessage));
        throw e;
    }
};

export const fetchDepartmentList = (path, queryParams, searchData) => async dispatch => {
    dispatch(DepartmentSetupActions.departmentListPending());
    try {
        const response = await Axios.putWithRequestParam(path, queryParams, searchData);
        dispatch(DepartmentSetupActions.departmentListSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DepartmentSetupActions.departmentListError(e.errorMessage));
    }
};

export const deleteDepartment = (path, deleteData) => async dispatch => {
    dispatch(DepartmentSetupActions.departmentDeletePending());
    try {
        const response = await Axios.del(path, deleteData);
        dispatch(DepartmentSetupActions.departmentDeleteSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DepartmentSetupActions.departmentDeleteError(e.errorMessage));
        throw e;
    }
};

export const editDepartment = (path, editData) => async dispatch => {
    dispatch(DepartmentSetupActions.departmentEditPending());
    try {
        const response = await Axios.put(path, editData);
        dispatch(DepartmentSetupActions.departmentEditSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DepartmentSetupActions.departmentEditError(e.errorMessage));
        throw e;
    }
};

export const previewDepartment = (path, id) => async dispatch => {
    dispatch(DepartmentSetupActions.departmentPreviewPending());
    dispatch(DepartmentSetupActions.clearDepartmentEditErrorMessage());
    try {
        const response = await Axios.getWithPathVariables(path, id);
        dispatch(DepartmentSetupActions.departmentPreviewSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DepartmentSetupActions.departmentPreviewError(e.errorMessage));
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
    dispatch(DepartmentSetupActions.clearDepartmentEditSuccessMessage());
    dispatch(DepartmentSetupActions.clearDepartmentEditErrorMessage());
    dispatch(DepartmentSetupActions.clearDepartmentPreviewErrorMessage());
    dispatch(DepartmentSetupActions.clearDepartmentListFetchErrorMessage());
    dispatch(DepartmentSetupActions.clearDepartmentCreateErrorMessage());
    dispatch(DepartmentSetupActions.clearDepartmentCreateSuccessMessage());
    dispatch(DepartmentSetupActions.clearDepartmentDeleteErrorMessage());
    dispatch(DepartmentSetupActions.clearDepartmentDeleteSuccessMessage());
};

