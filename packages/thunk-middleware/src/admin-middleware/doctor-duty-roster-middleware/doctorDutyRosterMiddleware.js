import {DoctorDutyRosterActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";

export const createDoctorDutyRoster = (path, doctorDutyRosterData) => async dispatch => {
    dispatch(DoctorDutyRosterActions.createDoctorDutyRosterPending());
    try {
        let response = await Axios.post(path, doctorDutyRosterData);
        dispatch(DoctorDutyRosterActions.createDoctorDutyRosterSuccess("Doctor Duty Roster created Successfully."));
        return response;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.createDoctorDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const fetchDoctorDutyRosterList = (path, searchData) => async dispatch => {
    dispatch(DoctorDutyRosterActions.searchDoctorDutyRosterPending());
    try {
        let response = await Axios.put(path, searchData);
        dispatch(DoctorDutyRosterActions.searchDoctorDutyRosterSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.searchDoctorDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const fetchDoctorDutyRosterDetailById = (path, doctorDutyRosterId) => async dispatch => {
    dispatch(DoctorDutyRosterActions.fetchDoctorDutyRosterDetailPending());
    try {
        let response = await Axios.getWithPathVariables(path, doctorDutyRosterId);
        dispatch(DoctorDutyRosterActions.fetchDoctorDutyRosterDetailSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.fetchDoctorDutyRosterDetailError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const updateDoctorDutyRoster = (path, updateDoctorDutyRosterData) => async dispatch => {
    dispatch(DoctorDutyRosterActions.updateDoctorDutyRosterPending());
    try {
        let response = await Axios.put(path, updateDoctorDutyRosterData);
        dispatch(DoctorDutyRosterActions.updateDoctorDutyRosterSuccess('Doctor Duty roster edited successfully.'));
        return response;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.updateDoctorDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};

export const deleteDoctorDutyRoster = (path, deleteRosterData) => async dispatch => {
    dispatch(DoctorDutyRosterActions.deleteDoctorDutyRosterPending());
    try {
        let response = await Axios.del(path, deleteRosterData);
        dispatch(DoctorDutyRosterActions.deleteDoctorDutyRosterSuccess('Doctor Duty roster deleted successfully.'));
        return response;
    } catch (e) {
        dispatch(DoctorDutyRosterActions.deleteDoctorDutyRosterError(e.errorMessage ? e.errorMessage
            : "Sorry something wrong in the server!"));
        throw e;
    }
};
