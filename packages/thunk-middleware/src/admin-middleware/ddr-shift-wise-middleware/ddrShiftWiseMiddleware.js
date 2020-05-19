import {Axios} from "@frontend-appointment/core";
import {DDRShiftWiseAction} from "@frontend-appointment/action-module";

export const checkExistingAvailability = (path, data) => async dispatch => {
    dispatch(DDRShiftWiseAction.ddrCheckAvailabilityPending());
    try {
        const response = await Axios.put(path, data);
        dispatch(DDRShiftWiseAction.ddrCheckAvailabilitySuccess(response.data));
    } catch (e) {
        dispatch(DDRShiftWiseAction.ddrCheckAvailabilityError(e.errorMessage ?
            e.errorMessage : "Sorry,Internal Server Problem occurred!"))
    }
};

export const fetchExistingRosterShiftAndOverrideInformation = (path, ddrId) => async dispatch => {
    dispatch(DDRShiftWiseAction.fetchExistingRosterShiftAndOverrideInformationPending());
    try {
        const response = await Axios.getWithPathVariables(path, ddrId);
        dispatch(DDRShiftWiseAction.fetchExistingRosterShiftAndOverrideInformationSuccess(response.data));
    } catch (e) {
        dispatch(DDRShiftWiseAction.fetchExistingRosterShiftAndOverrideInformationError(e.errorMessage ?
            e.errorMessage : "Sorry,Internal Server Problem occurred!"))
    }
};

export const fetchWeekdaysInformationByDDRShiftId = (path, data) => async dispatch => {
    dispatch(DDRShiftWiseAction.fetchWeekdaysInformationByDDRShiftIdPending());
    try {
        const response = await Axios.put(path, data);
        dispatch(DDRShiftWiseAction.fetchWeekdaysInformationByDDRShiftIdSuccess(response.data));
    } catch (e) {
        dispatch(DDRShiftWiseAction.fetchWeekdaysInformationByDDRShiftIdError(e.errorMessage ?
            e.errorMessage : "Sorry,Internal Server Problem occurred!"))
    }
};

export const fetchWeekdaysBreakDetails = (path, ddrWeekDaysId) => async dispatch => {
    dispatch(DDRShiftWiseAction.fetchWeekdaysBreakDetailsPending());
    try {
        const response = await Axios.getWithPathVariables(path, ddrWeekDaysId);
        dispatch(DDRShiftWiseAction.fetchWeekdaysBreakDetailsSuccess(response.data));
    } catch (e) {
        dispatch(DDRShiftWiseAction.fetchWeekdaysBreakDetailsError(e.errorMessage ?
            e.errorMessage : "Sorry,Internal Server Problem occurred!"))
    }
};

export const fetchOverrideBreakDetails = (path, ddrOverrideId) => async dispatch => {
    dispatch(DDRShiftWiseAction.fetchOverrideBreakDetailsPending());
    try {
        const response = await Axios.getWithPathVariables(path, ddrOverrideId);
        dispatch(DDRShiftWiseAction.fetchOverrideBreakDetailsSuccess(response.data));
    } catch (e) {
        dispatch(DDRShiftWiseAction.fetchOverrideBreakDetailsError(e.errorMessage ?
            e.errorMessage : "Sorry,Internal Server Problem occurred!"))
    }
};

export const saveDDRWeekdays = (path, data) => async dispatch => {
    dispatch(DDRShiftWiseAction.saveDDRWeekdaysPending());
    try {
        const response = await Axios.post(path, data);
        dispatch(DDRShiftWiseAction.saveDDRWeekdaysSuccess(response.data));
    } catch (e) {
        dispatch(DDRShiftWiseAction.saveDDRWeekdaysError(e.errorMessage ?
            e.errorMessage : "Sorry,Internal Server Problem occurred!"))
    }
};

export const saveDDROverrideRoster = (path, data) => async dispatch => {
    dispatch(DDRShiftWiseAction.saveDDROverrideRosterPending());
    try {
        const response = await Axios.post(path, data);
        dispatch(DDRShiftWiseAction.saveDDROverrideRosterSuccess(response.data));
    } catch (e) {
        dispatch(DDRShiftWiseAction.saveDDROverrideRosterError(e.errorMessage ?
            e.errorMessage : "Sorry,Internal Server Problem occurred!"))
    }
};

export const clearSaveDDRMessages = () => async dispatch => {
    dispatch(DDRShiftWiseAction.clearDDRCheckAvailabilityMessage());
    dispatch(DDRShiftWiseAction.clearSaveDDRWeekdaysMessage());
    dispatch(DDRShiftWiseAction.clearSaveDDROverrideRosterMessage());
    dispatch(DDRShiftWiseAction.clearFetchExistingRosterShiftAndOverrideInformationMessage());
    dispatch(DDRShiftWiseAction.clearFetchWeekdaysInformationMessage());
    dispatch(DDRShiftWiseAction.clearFetchWeekdaysBreakDetailMessage());
    dispatch(DDRShiftWiseAction.clearFetchOverrideBreakDetailMessage());
};


