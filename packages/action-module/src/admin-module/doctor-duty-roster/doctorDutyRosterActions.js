import {doctorDutyRosterActionConstants} from './doctorDutyRosterActionConstants';

const {
    CREATE_DOCTOR_DUTY_ROSTER_PENDING,
    CREATE_DOCTOR_DUTY_ROSTER_SUCCESS,
    CREATE_DOCTOR_DUTY_ROSTER_ERROR,
    CLEAR_DDR_CREATE_ERROR_MESSAGE,
    CLEAR_DDR_CREATE_SUCCESS_MESSAGE,
    UPDATE_DOCTOR_DUTY_ROSTER_PENDING,
    UPDATE_DOCTOR_DUTY_ROSTER_SUCCESS,
    UPDATE_DOCTOR_DUTY_ROSTER_ERROR,
    CLEAR_DDR_UPDATE_SUCCESS_MESSAGE,
    CLEAR_DDR_UPDATE_ERROR_MESSAGE,
    DELETE_DOCTOR_DUTY_ROSTER_PENDING,
    DELETE_DOCTOR_DUTY_ROSTER_SUCCESS,
    DELETE_DOCTOR_DUTY_ROSTER_ERROR,
    CLEAR_DDR_DELETE_SUCCESS_MESSAGE,
    CLEAR_DDR_DELETE_ERROR_MESSAGE,
    SEARCH_DOCTOR_DUTY_ROSTER_PENDING,
    SEARCH_DOCTOR_DUTY_ROSTER_SUCCESS,
    SEARCH_DOCTOR_DUTY_ROSTER_ERROR,
    CLEAR_DDR_SEARCH_SUCCESS_MESSAGE,
    CLEAR_DDR_SEARCH_ERROR_MESSAGE,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_PENDING,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_SUCCESS,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_ERROR,
    CLEAR_DDR_DETAIL_SUCCESS_MESSAGE,
    CLEAR_DDR_DETAIL_ERROR_MESSAGE
} = doctorDutyRosterActionConstants;

export const createDoctorDutyRosterPending = () => {
    return {
        type: CREATE_DOCTOR_DUTY_ROSTER_PENDING
    }
};

export const createDoctorDutyRosterSuccess = data => {
    return {
        type: CREATE_DOCTOR_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const createDoctorDutyRosterError = errorMessage => {
    return {
        type: CREATE_DOCTOR_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDoctorDutyRosterCreateSuccessMessage = () => {
    return {
        type: CLEAR_DDR_CREATE_SUCCESS_MESSAGE
    }
};

export const clearDoctorDutyRosterCreateErrorMessage = () => {
    return {
        type: CLEAR_DDR_CREATE_ERROR_MESSAGE
    }
};

export const updateDoctorDutyRosterPending = () => {
    return {
        type: UPDATE_DOCTOR_DUTY_ROSTER_PENDING
    }
};

export const updateDoctorDutyRosterSuccess = data => {
    return {
        type: UPDATE_DOCTOR_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const updateDoctorDutyRosterError = errorMessage => {
    return {
        type: UPDATE_DOCTOR_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDoctorDutyRosterUpdateSuccessMessage = () => {
    return {
        type: CLEAR_DDR_UPDATE_SUCCESS_MESSAGE
    }
};

export const clearDoctorDutyRosterUpdateErrorMessage = () => {
    return {
        type: CLEAR_DDR_UPDATE_ERROR_MESSAGE
    }
};

export const deleteDoctorDutyRosterPending = () => {
    return {
        type: DELETE_DOCTOR_DUTY_ROSTER_PENDING
    }
};

export const deleteDoctorDutyRosterSuccess = data => {
    return {
        type: DELETE_DOCTOR_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const deleteDoctorDutyRosterError = errorMessage => {
    return {
        type: DELETE_DOCTOR_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDoctorDutyRosterDeleteSuccessMessage = () => {
    return {
        type: CLEAR_DDR_DELETE_SUCCESS_MESSAGE
    }
};

export const clearDoctorDutyRosterDeleteErrorMessage = () => {
    return {
        type: CLEAR_DDR_DELETE_ERROR_MESSAGE
    }
};

export const searchDoctorDutyRosterPending = () => {
    return {
        type: SEARCH_DOCTOR_DUTY_ROSTER_PENDING
    }
};

export const searchDoctorDutyRosterSuccess = data => {
    return {
        type: SEARCH_DOCTOR_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchDoctorDutyRosterError = errorMessage => {
    return {
        type: SEARCH_DOCTOR_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDoctorDutyRosterSearchSuccessMessage = () => {
    return {
        type: CLEAR_DDR_SEARCH_SUCCESS_MESSAGE
    }
};

export const clearDoctorDutyRosterSearchErrorMessage = () => {
    return {
        type: CLEAR_DDR_SEARCH_ERROR_MESSAGE
    }
};

export const fetchDoctorDutyRosterDetailPending = () => {
    return {
        type: FETCH_DOCTOR_DUTY_ROSTER_DETAIL_PENDING
    }
};

export const fetchDoctorDutyRosterDetailSuccess = data => {
    return {
        type: FETCH_DOCTOR_DUTY_ROSTER_DETAIL_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchDoctorDutyRosterDetailError = errorMessage => {
    return {
        type: FETCH_DOCTOR_DUTY_ROSTER_DETAIL_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDoctorDutyRosterDetailSuccessMessage = () => {
    return {
        type: CLEAR_DDR_DETAIL_SUCCESS_MESSAGE
    }
};

export const clearDoctorDutyRosterDetailErrorMessage = () => {
    return {
        type: CLEAR_DDR_DETAIL_ERROR_MESSAGE
    }
};

