import {DepartmentDutyRosterActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";
import {CommonUtils} from "@frontend-appointment/helpers";
import {MinioMiddleware} from '../../../index'

export const createDepartmentDutyRoster = (path, departmentDutyRosterData) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.createDepartmentDutyRosterPending());
    try {
        const response = await Axios.post(path, departmentDutyRosterData);
        dispatch(DepartmentDutyRosterActions.createDepartmentDutyRosterSuccess("Department Duty Roster created Successfully."));
        return response;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.createDepartmentDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const searchDepartmentDutyRoster = (path, searchData, pageObj) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.searchDepartmentDutyRosterPending());
    try {
        const response = await Axios.putWithPagination(path, searchData, pageObj);
        let dataWithSN = CommonUtils.appendSerialNumberToDataList(response.data, pageObj.page, pageObj.size);
        dispatch(DepartmentDutyRosterActions.searchDepartmentDutyRosterSuccess(dataWithSN));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.searchDepartmentDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

const getWeekDaysDoctorInfoWithPresignedUrl = async weekDaysRosters => {
    const doctorInfoWithPresignedUrl = weekDaysRosters.map(async weekDaysRoster => {
        weekDaysRoster.weekDaysDoctorInfo = await MinioMiddleware.getDataListWithPresignedFileUri(weekDaysRoster.weekDaysDoctorInfo, 'fileUri')
        return weekDaysRoster;
    })
    return Promise.all(doctorInfoWithPresignedUrl)
}

export const fetchDepartmentDutyRosterDetailById = (path, departmentDutyRosterId) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.fetchDepartmentDutyRosterDetailPending());
    try {
        const response = await Axios.getWithPathVariables(path, departmentDutyRosterId);
        const doctorInfoWithPresignedUrl = await getWeekDaysDoctorInfoWithPresignedUrl(response.data.weekDaysRosters)
        dispatch(DepartmentDutyRosterActions.fetchDepartmentDutyRosterDetailSuccess({
            ...response.data,
            weekDaysRosters: doctorInfoWithPresignedUrl
        }));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.fetchDepartmentDutyRosterDetailError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const updateDepartmentDutyRoster = (path, updateDepartmentDutyRosterData) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.updateDepartmentDutyRosterPending());
    try {
        const response = await Axios.put(path, updateDepartmentDutyRosterData);
        dispatch(DepartmentDutyRosterActions.updateDepartmentDutyRosterSuccess('Department Duty Roster edited successfully.'));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.updateDepartmentDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const deleteDepartmentDutyRoster = (path, deleteRosterData) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.deleteDepartmentDutyRosterPending());
    try {
        const response = await Axios.del(path, deleteRosterData);
        dispatch(DepartmentDutyRosterActions.deleteDepartmentDutyRosterSuccess('Department Duty Roster deleted successfully.'));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.deleteDepartmentDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const fetchExistingDepartmentDutyRoster = (path, requestDTO) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.fetchExistingDepartmentDutyRosterPending());
    try {
        const response = await Axios.put(path, requestDTO);
        dispatch(DepartmentDutyRosterActions.fetchExistingDepartmentDutyRosterSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.fetchExistingDepartmentDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const fetchExistingDepartmentDutyRosterDetails = (path, departmentDutyRosterId) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.fetchExistingDepartmentDutyRosterDetailByIdPending());
    try {
        const response = await Axios.getWithPathVariables(path, departmentDutyRosterId);
        dispatch(DepartmentDutyRosterActions.fetchExistingDepartmentDutyRosterDetailByIdSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.fetchExistingDepartmentDutyRosterDetailByIdError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const updateDepartmentDutyRosterOverride = (path, data) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.updateDepartmentDutyRosterOverridePending());
    try {
        const response = await Axios.put(path, data);
        dispatch(DepartmentDutyRosterActions.updateDepartmentDutyRosterOverrideSuccess(response.data, "Override Saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.updateDepartmentDutyRosterOverrideError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const revertDepartmentDutyRosterOverrideUpdate = (path, data) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.revertDepartmentDutyRosterOverridePending());
    try {
        const response = await Axios.put(path, data);
        dispatch(DepartmentDutyRosterActions.revertDepartmentDutyRosterOverrideSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.revertDepartmentDutyRosterOverrideError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const deleteDepartmentDutyRosterOverride = (path, data) => async dispatch => {
    dispatch(DepartmentDutyRosterActions.deleteDepartmentDutyRosterOverridePending());
    try {
        const response = await Axios.del(path, data);
        dispatch(DepartmentDutyRosterActions.deleteDepartmentDutyRosterOverrideError(response.data));
        return response.data;
    } catch (e) {
        dispatch(DepartmentDutyRosterActions.deleteDepartmentDutyRosterOverrideError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const clearDepartmentDutyRosterMessages = () => async dispatch => {
    dispatch(DepartmentDutyRosterActions.clearDepartmentDutyRosterCreateMessage());
    dispatch(DepartmentDutyRosterActions.clearDepartmentDutyRosterDeleteMessage());
    dispatch(DepartmentDutyRosterActions.clearDepartmentDutyRosterUpdateMessage());
    dispatch(DepartmentDutyRosterActions.clearDepartmentDutyRosterDetailMessage());
    dispatch(DepartmentDutyRosterActions.clearDepartmentDutyRosterSearchMessage());
    dispatch(DepartmentDutyRosterActions.clearExistingDepartmentDutyRosterMessage());
    dispatch(DepartmentDutyRosterActions.clearExistingDepartmentDutyRosterDetailByIdMessage());
    dispatch(DepartmentDutyRosterActions.clearDepartmentDutyRosterOverrideUpdateMessage());
    dispatch(DepartmentDutyRosterActions.clearDepartmentDutyRosterOverrideDeleteMessage());
    dispatch(DepartmentDutyRosterActions.clearDepartmentDutyRosterOverrideRevertMessage());
};
