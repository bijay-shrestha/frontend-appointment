import {doctorSalutationActionConstants} from './doctorSalutationActionConstants';

const {
    FETCH_DOCTOR_SALUTATION_ERROR,
    FETCH_DOCTOR_SALUTATION_PENDING,
    FETCH_DOCTOR_SALUTATION_SUCCESS
} = doctorSalutationActionConstants;

export const fetchDoctorSalutationSuccess = data => {
    return {
        type: FETCH_DOCTOR_SALUTATION_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchDoctorSalutationError = errorMessage => {
    return {
        type: FETCH_DOCTOR_SALUTATION_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const fetchDoctorSalutationPending = () => {
    return {
        type: FETCH_DOCTOR_SALUTATION_PENDING,
    }
};

