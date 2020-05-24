import {HospitalApiIntegrationActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";

export const fetchFeatureTypeForDrodown = (path) => async dispatch => {
    dispatch(HospitalApiIntegrationActions.hospitalFeatureTypeDropdownPending());
    try {
        const response = await Axios.get(path);
        dispatch(HospitalApiIntegrationActions.hospitalFeatureTypeDropdownSuccess(response.data));
       // return response.data;
    } catch (e) {
        dispatch(HospitalApiIntegrationActions.hospitalFeatureTypeDropdownError(e.errorMessage));
    }
};

export const saveHospitalIntegration = (path, integrationData) => async dispatch => {
    dispatch(HospitalApiIntegrationActions.hospitalApiSavePending());
    try {
        let response = await Axios.post(path, integrationData);
        dispatch(HospitalApiIntegrationActions.hospitalApiSaveSuccess("Hospital Api Integrated Successfully."));
        return response;
    } catch (e) {
        dispatch(HospitalApiIntegrationActions.hospitalApiSaveError(e.errorMessage));
        throw e;
    }
};


export const fetchRequestMethodDropdown = (path) => async dispatch => {
    dispatch(HospitalApiIntegrationActions.hospitalRequestMethodDropdownPending())
    try {
        const response= await Axios.get(path);
        dispatch(HospitalApiIntegrationActions.hospitalRequestMethodDropdownSuccess(response.data))
    } catch (e) {
        dispatch(HospitalApiIntegrationActions.hospitalRequestMethodDropdownError(e.errorMessage));
    }
};

