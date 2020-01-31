import {doctorDutyRosterActionConstants} from '@frontend-appointment/action-module';

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
    CLEAR_DDR_SEARCH_ERROR_MESSAGE,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_PENDING,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_SUCCESS,
    FETCH_DOCTOR_DUTY_ROSTER_DETAIL_ERROR,
    CLEAR_DDR_DETAIL_ERROR_MESSAGE,
} = doctorDutyRosterActionConstants;

const initialState = {
    isSaveRosterLoading: false,
    saveErrorMessage: '',
    saveSuccessMessage: '',
    isSearchRosterLoading: false,
    doctorDutyRosterList: [],
    searchErrorMessage: '',
    isDeleteRosterLoading: true,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isEditRosterPending: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isPreviewRosterLoading: false,
    doctorDutyRosterPreviewData: {},
    previewErrorMessage: ''
};

export const DoctorDutyRosterSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case CREATE_DOCTOR_DUTY_ROSTER_PENDING:
            return {
                ...state,
                isSaveRosterLoading: true,
            };
        case CREATE_DOCTOR_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                isSaveRosterLoading: false,
                saveSuccessMessage: action.payload.successMessage
            };
        case CREATE_DOCTOR_DUTY_ROSTER_ERROR:
            return {
                ...state,
                isSaveRosterLoading: false,
                saveErrorMessage: action.payload.errorMessage
            };
        case CLEAR_DDR_CREATE_SUCCESS_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: ''
            };
        case CLEAR_DDR_CREATE_ERROR_MESSAGE:
            return {
                ...state,
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const DoctorDutyRosterListReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_DOCTOR_DUTY_ROSTER_PENDING:
            return {
                ...state,
                doctorDutyRosterList: [],
                isSearchRosterLoading: true,
                searchErrorMessage: '',
            };
        case SEARCH_DOCTOR_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                doctorDutyRosterList: [...action.payload.data],
                isSearchRosterLoading: false,
                searchErrorMessage: ''
            };
        case SEARCH_DOCTOR_DUTY_ROSTER_ERROR:
            return {
                ...state,
                doctorDutyRosterList: [],
                isSearchRosterLoading: false,
                searchErrorMessage: action.payload.errorMessage
            };
        case CLEAR_DDR_SEARCH_ERROR_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const DoctorDutyRosterDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_DOCTOR_DUTY_ROSTER_PENDING:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: '',
                isDeleteRosterLoading: true
            };
        case DELETE_DOCTOR_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                deleteSuccessMessage: action.payload.data,
                deleteErrorMessage: '',
                isDeleteRosterLoading: false
            };
        case DELETE_DOCTOR_DUTY_ROSTER_ERROR:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: action.payload.errorMessage,
                isDeleteRosterLoading: false
            };
        case CLEAR_DDR_DELETE_ERROR_MESSAGE:
            return {
                ...state,
                deleteErrorMessage: ''
            };
        case CLEAR_DDR_DELETE_SUCCESS_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: ''
            };
        default:
            return {
                ...state
            }
    }
};

export const DoctorDutyRosterEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case UPDATE_DOCTOR_DUTY_ROSTER_PENDING:
            return {
                ...state,
                isEditRosterPending: true,
                editSuccessMessage: '',
                editErrorMessage: '',
            };
        case UPDATE_DOCTOR_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                isEditRosterPending: false,
                editSuccessMessage: action.payload.data,
                editErrorMessage: '',
            };
        case UPDATE_DOCTOR_DUTY_ROSTER_ERROR:
            return {
                ...state,
                isEditRosterPending: false,
                editSuccessMessage: '',
                editErrorMessage: action.payload.errorMessage,
            };
        case CLEAR_DDR_UPDATE_SUCCESS_MESSAGE:
            return {
                ...state,
                editSuccessMessage: ''
            };
        case CLEAR_DDR_UPDATE_ERROR_MESSAGE:
            return {
                ...state,
                editErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const DoctorDutyRosterPreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_DOCTOR_DUTY_ROSTER_DETAIL_PENDING:
            return {
                ...state,
                isPreviewRosterLoading: true,
                doctorDutyRosterPreviewData: {},
                previewErrorMessage: ''
            };
        case FETCH_DOCTOR_DUTY_ROSTER_DETAIL_SUCCESS:
            return {
                ...state,
                isPreviewRosterLoading: false,
                doctorDutyRosterPreviewData: {...action.payload.data},
                previewErrorMessage: ''
            };
        case FETCH_DOCTOR_DUTY_ROSTER_DETAIL_ERROR:
            return {
                ...state,
                isPreviewRosterLoading: false,
                doctorDutyRosterPreviewData: {},
                previewErrorMessage: action.payload.errorMessage
            };
        case CLEAR_DDR_DETAIL_ERROR_MESSAGE:
            return {
                ...state,
                previewErrorMessage: ''
            };
        default:
            return {...state}
    }
};

