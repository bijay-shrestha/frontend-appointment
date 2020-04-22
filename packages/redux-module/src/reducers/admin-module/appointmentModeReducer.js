import {appointmentModeActionConstants} from '@frontend-appointment/action-module';

const {
    SAVE_APPOINTMENT_MODE_PENDING,
    SAVE_APPOINTMENT_MODE_SUCCESS,
    SAVE_APPOINTMENT_MODE_ERROR,
    CLEAR_SAVE_APPOINTMENT_MODE_MESSAGE,
    EDIT_APPOINTMENT_MODE_PENDING,
    EDIT_APPOINTMENT_MODE_SUCCESS,
    EDIT_APPOINTMENT_MODE_ERROR,
    CLEAR_EDIT_APPOINTMENT_MODE_MESSAGE,
    DELETE_APPOINTMENT_MODE_PENDING,
    DELETE_APPOINTMENT_MODE_SUCCESS,
    DELETE_APPOINTMENT_MODE_ERROR,
    CLEAR_DELETE_APPOINTMENT_MODE_MESSAGE,
    SEARCH_APPOINTMENT_MODE_PENDING,
    SEARCH_APPOINTMENT_MODE_SUCCESS,
    SEARCH_APPOINTMENT_MODE_ERROR,
    CLEAR_SEARCH_APPOINTMENT_MODE_MESSAGE,
    FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_ERROR,
    FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_SUCCESS,
    FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_PENDING,
    PREVIEW_APPOINTMENT_MODE_SUCCESS,
    PREVIEW_APPOINTMENT_MODE_PENDING,
    PREVIEW_APPOINTMENT_MODE_ERROR,
    CLEAR_PREVIEW_APPOINTMENT_MODE_MESSAGE
} = appointmentModeActionConstants;

const initialState = {
    isSaveAppointmentModeLoading: false,
    saveSuccessMessage: '',
    saveErrorMessage: '',
    isEditAppointmentModeLoading: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isDeleteAppointmentModeLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isSearchAppointmentModeLoading: false,
    appointmentModeList: [],
    searchErrorMessage: '',
    isFetchAppointmentModeLoading: false,
    activeAppointmentModeForDropdown: [],
    dropdownErrorMessage: '',
    isPreviewAppointmentModeLoading:false,
    previewAppointmentModeErrorMessage:'',
    appointmentModeDetails:{}
};

export const AppointmentModeSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_APPOINTMENT_MODE_PENDING:
            return {
                ...state,
                isSaveAppointmentModeLoading: true,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        case SAVE_APPOINTMENT_MODE_SUCCESS:
            return {
                ...state,
                isSaveAppointmentModeLoading: false,
                saveSuccessMessage: action.payload.message,
                saveErrorMessage: ''
            };
        case SAVE_APPOINTMENT_MODE_ERROR:
            return {
                ...state,
                isSaveAppointmentModeLoading: false,
                saveErrorMessage: action.payload.message,
                saveSuccessMessage: '',
            };
        case CLEAR_SAVE_APPOINTMENT_MODE_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const AppointmentModeEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_APPOINTMENT_MODE_PENDING:
            return {
                ...state,
                isEditAppointmentModeLoading: true,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        case EDIT_APPOINTMENT_MODE_SUCCESS:
            return {
                ...state,
                isEditAppointmentModeLoading: false,
                editSuccessMessage: action.payload.message,
                editErrorMessage: ''
            };
        case EDIT_APPOINTMENT_MODE_ERROR:
            return {
                ...state,
                isEditAppointmentModeLoading: false,
                editErrorMessage: action.payload.message,
                editSuccessMessage: '',
            };
        case CLEAR_EDIT_APPOINTMENT_MODE_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return state
    }
};

export const AppointmentModeDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_APPOINTMENT_MODE_PENDING :
            return {
                ...state,
                isDeleteAppointmentModeLoading: true,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        case DELETE_APPOINTMENT_MODE_SUCCESS:
            return {
                ...state,
                isDeleteAppointmentModeLoading: false,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: ''
            };
        case DELETE_APPOINTMENT_MODE_ERROR:
            return {
                ...state,
                isDeleteAppointmentModeLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            };
        case CLEAR_DELETE_APPOINTMENT_MODE_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        default:
            return state
    }
};

export const AppointmentModeSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_APPOINTMENT_MODE_PENDING :
            return {
                ...state,
                isSearchAppointmentModeLoading: true,
                appointmentModeList: [],
                searchErrorMessage: ''
            };
        case SEARCH_APPOINTMENT_MODE_SUCCESS:
            return {
                ...state,
                isSearchAppointmentModeLoading: false,
                appointmentModeList: [...action.payload.data],
                searchErrorMessage:''
            };
        case SEARCH_APPOINTMENT_MODE_ERROR:
            return {
                ...state,
                isSearchAppointmentModeLoading: false,
                appointmentModeList: [],
                searchErrorMessage: action.payload.message
            };
        case CLEAR_SEARCH_APPOINTMENT_MODE_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return state
    }
};

export const AppointmentModePreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PREVIEW_APPOINTMENT_MODE_PENDING :
            return {
                ...state,
                isPreviewAppointmentModeLoading:true,
                previewAppointmentModeErrorMessage:'',
                appointmentModeDetails:{}
            };
        case PREVIEW_APPOINTMENT_MODE_SUCCESS:
            return {
                ...state,
                isPreviewAppointmentModeLoading:false,
                previewAppointmentModeErrorMessage:'',
                appointmentModeDetails:{...action.payload.data}
            };
        case PREVIEW_APPOINTMENT_MODE_ERROR:
            return {
                ...state,
                isPreviewAppointmentModeLoading:false,
                previewAppointmentModeErrorMessage:action.payload.errorMessage,
                appointmentModeDetails:{}
            };
        case CLEAR_PREVIEW_APPOINTMENT_MODE_MESSAGE:
            return {
                ...state,
                previewAppointmentModeErrorMessage: ''
            };
        default:
            return state
    }
};

export const AppointmentModeDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_PENDING :
            return {
                ...state,
                isFetchAppointmentModeLoading: true,
                activeAppointmentModeForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                isFetchAppointmentModeLoading: false,
                activeAppointmentModeForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                isFetchAppointmentModeLoading: false,
                activeAppointmentModeForDropdown: [],
                dropdownErrorMessage: action.payload.message
            };
        default:
            return state
    }
};


