import {PatientDetailsActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";

export const fetchPatientMetaList = (path,id) => async dispatch => {
    dispatch(PatientDetailsActions.patientActiveDropdownFetchingStart());
    clearPatientDetails();
    try {
        const response = await Axios.getWithPathVariables(path,id);
        dispatch(PatientDetailsActions.patientActiveDropdownFetchingSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(PatientDetailsActions.patientActiveDropdownFetchingError(e.errorMessage||"Sorry Internal Server Problem"));
    }
};

export const clearPatientDetails = () => async dispatch => {
    dispatch(PatientDetailsActions.clearPatientDropdownSuccessMessage());
}