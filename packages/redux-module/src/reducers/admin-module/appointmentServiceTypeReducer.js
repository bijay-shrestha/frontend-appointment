import {appointmentServiceTypeActionConstants} from '@frontend-appointment/action-module';

const {
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_WITH_CODE_ERROR,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_WITH_CODE_PENDING,
    FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_WITH_CODE_SUCCESS
} = appointmentServiceTypeActionConstants;

const initialState = {
    isFetchAppointmentServiceTypeLoading: true,
    activeAppointmentServiceTypeForDropdown: [],
    dropdownErrorMessage: '',
    isFetchAppointmentServiceTypeWithCodeLoading: true,
    activeAppointmentServiceTypeWithCodeForDropdown: [],
    dropdownWithCodeErrorMessage: ''
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
        case FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_WITH_CODE_PENDING:return{
            isFetchAppointmentServiceTypeWithCodeLoading: true,
            activeAppointmentServiceTypeWithCodeForDropdown: [],
            dropdownWithCodeErrorMessage: ''
        }
        case FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_WITH_CODE_SUCCESS:return{
            isFetchAppointmentServiceTypeWithCodeLoading: false,
            activeAppointmentServiceTypeWithCodeForDropdown: [...action.payload.data],
            dropdownWithCodeErrorMessage: ''
        }
        case FETCH_ACTIVE_APPOINTMENT_SERVICE_TYPE_FOR_DROPDOWN_WITH_CODE_ERROR:return{
            isFetchAppointmentServiceTypeWithCodeLoading: false,
            activeAppointmentServiceTypeWithCodeForDropdown: [],
            dropdownWithCodeErrorMessage:action.payload.errorMessage
        }  
        default:
            return state
    }
};
