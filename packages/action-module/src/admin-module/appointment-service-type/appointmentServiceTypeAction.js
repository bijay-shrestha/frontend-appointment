import {appointmentServiceTypeActionConstants} from './appointmentServiceTypeActionConstants';

const {
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_SUCCESS
} = appointmentServiceTypeActionConstants;

export const fetchActiveAppointmentServiceTypePending = () => ({
    type: FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_PENDING
});

export const fetchActiveAppointmentServiceTypeSuccess = data => ({
    type: FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_SUCCESS,
    payload: {
        data
    }
});

export const fetchActiveAppointmentServiceTypeError = errorMessage => ({
    type: FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_ERROR,
    payload: {
        errorMessage
    }
});
