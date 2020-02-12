import {patientDetailsConstants} from '@frontend-appointment/action-module'

const {
 PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR,
 PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS,
 PATIENT_ACTIVE_DROPDOWN_META_FETCH_START,
 PATIENT_CLEAR_DROPDOWN_META
} = patientDetailsConstants

const initialState = {
  patientList: [],
  patientDropdownErrorMessage: ''
};

export const PatientDropdownListReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PATIENT_ACTIVE_DROPDOWN_META_FETCH_START:
            return {
                ...state,
                patientList: [],
                patientDropdownErrorMessage: '',
                
            };
        case PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS:
            return {
                ...state,
                patientList: [...action.payload.data],
                patientDropdownErrorMessage:''
            };
        case PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR:
            return {
                ...state,
                patientList:  [],
                patientDropdownErrorMessage:action.payload.data
            };
        case PATIENT_CLEAR_DROPDOWN_META:
            return {
                ...state,
                patientDropdownErrorMessage: ''
            };
        default:
            return {...state}
    }
};
