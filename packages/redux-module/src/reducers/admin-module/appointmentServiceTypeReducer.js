import {appointmentServiceTypeActionConstants} from '@frontend-appointment/action-module';

const {
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_ERROR
} = appointmentServiceTypeActionConstants;

const initialState = {
    isFetchAppointmentServiceTypeLoading: true,
    activeAppointmentServiceTypeForDropdown: [],
    dropdownErrorMessage: ''
};

export const AppointmentServiceTypeDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_PENDING :
            return {
                ...state,
                isFetchAppointmentServiceTypeLoading: true,
                activeAppointmentServiceTypeForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                isFetchAppointmentServiceTypeLoading: false,
                activeAppointmentServiceTypeForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                isFetchAppointmentServiceTypeLoading: false,
                activeAppointmentServiceTypeForDropdown: [],
                dropdownErrorMessage: action.payload.errorMessage
            };
        default:
            return state
    }
};
