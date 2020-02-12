import {patientDetailsConstants} from './patientDetailActionConstants';

const {
 PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR,
 PATIENT_ACTIVE_DROPDOWN_META_FETCH_START,
 PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS,
 PATIENT_CLEAR_DROPDOWN_META 
} = patientDetailsConstants;

export const patientActiveDropdownFetchingStart = () => {
    return {
        type: PATIENT_ACTIVE_DROPDOWN_META_FETCH_START
    }
};

export const patientActiveDropdownFetchingSuccess = data => {
    return {
        type: PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS,
        payload:{data}
    }
};

export const patientActiveDropdownFetchingError = message => {
    return {
        type:  PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR,
        payload: {
            data: message
        }
    }
};

export const clearPatientDropdownSuccessMessage = () => {
    return {
        type: PATIENT_CLEAR_DROPDOWN_META
    }
};

