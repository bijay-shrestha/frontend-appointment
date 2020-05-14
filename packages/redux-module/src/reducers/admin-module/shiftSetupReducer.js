import {shiftSetupActionConstants} from '@frontend-appointment/action-module';

const {
    SAVE_SHIFT_PENDING,
    SAVE_SHIFT_SUCCESS,
    SAVE_SHIFT_ERROR,
    CLEAR_SAVE_SHIFT_MESSAGE,
    EDIT_SHIFT_PENDING,
    EDIT_SHIFT_SUCCESS,
    EDIT_SHIFT_ERROR,
    CLEAR_EDIT_SHIFT_MESSAGE,
    DELETE_SHIFT_PENDING,
    DELETE_SHIFT_SUCCESS,
    DELETE_SHIFT_ERROR,
    CLEAR_DELETE_SHIFT_MESSAGE,
    SEARCH_SHIFT_PENDING,
    SEARCH_SHIFT_SUCCESS,
    SEARCH_SHIFT_ERROR,
    CLEAR_SEARCH_SHIFT_MESSAGE,
    FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_ERROR,
    ASSIGN_SHIFTS_TO_DOCTOR_SUCCESS,
    ASSIGN_SHIFTS_TO_DOCTOR_PENDING,
    ASSIGN_SHIFTS_TO_DOCTOR_ERROR,
    CLEAR_ASSIGN_SHIFTS_TO_DOCTOR_MESSAGE
    // PREVIEW_SHIFT_SUCCESS,
    // PREVIEW_SHIFT_PENDING,
    // PREVIEW_SHIFT_ERROR,
    // CLEAR_PREVIEW_SHIFT_MESSAGE
} = shiftSetupActionConstants;

const initialState = {
    isSaveShiftLoading: false,
    saveSuccessMessage: '',
    saveErrorMessage: '',
    isEditShiftLoading: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isDeleteShiftLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isSearchShiftLoading: false,
    shiftList: [],
    searchErrorMessage: '',
    isFetchShiftLoading: false,
    activeShiftByDoctorIdForDropdown: [],
    activeShiftByHospitalIdForDropdown: [],
    dropdownErrorMessage: '',
    isPreviewShiftLoading: false,
    previewShiftErrorMessage: '',
    shiftDetails: {},
    isAssignShiftsToDoctorLoading: false,
    assignShiftsToDoctorErrorMessage: '',
    assignShiftsToDoctorSuccessMessage: '',
};

export const ShiftSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_SHIFT_PENDING:
            return {
                ...state,
                isSaveShiftLoading: true,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        case SAVE_SHIFT_SUCCESS:
            return {
                ...state,
                isSaveShiftLoading: false,
                saveSuccessMessage: action.payload.message,
                saveErrorMessage: ''
            };
        case SAVE_SHIFT_ERROR:
            return {
                ...state,
                isSaveShiftLoading: false,
                saveErrorMessage: action.payload.message,
                saveSuccessMessage: '',
            };
        case CLEAR_SAVE_SHIFT_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const ShiftEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_SHIFT_PENDING:
            return {
                ...state,
                isEditShiftLoading: true,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        case EDIT_SHIFT_SUCCESS:
            return {
                ...state,
                isEditShiftLoading: false,
                editSuccessMessage: action.payload.message,
                editErrorMessage: ''
            };
        case EDIT_SHIFT_ERROR:
            return {
                ...state,
                isEditShiftLoading: false,
                editErrorMessage: action.payload.message,
                editSuccessMessage: '',
            };
        case CLEAR_EDIT_SHIFT_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return state
    }
};

export const ShiftDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_SHIFT_PENDING :
            return {
                ...state,
                isDeleteShiftLoading: true,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        case DELETE_SHIFT_SUCCESS:
            return {
                ...state,
                isDeleteShiftLoading: false,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: ''
            };
        case DELETE_SHIFT_ERROR:
            return {
                ...state,
                isDeleteShiftLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            };
        case CLEAR_DELETE_SHIFT_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        default:
            return state
    }
};

export const ShiftSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_SHIFT_PENDING :
            return {
                ...state,
                isSearchShiftLoading: true,
                shiftList: [],
                searchErrorMessage: ''
            };
        case SEARCH_SHIFT_SUCCESS:
            return {
                ...state,
                isSearchShiftLoading: false,
                shiftList: [...action.payload.data],
                searchErrorMessage: ''
            };
        case SEARCH_SHIFT_ERROR:
            return {
                ...state,
                isSearchShiftLoading: false,
                shiftList: [],
                searchErrorMessage: action.payload.message
            };
        case CLEAR_SEARCH_SHIFT_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return state
    }
};

// export const ShiftPreviewReducer = (state = {...initialState}, action) => {
//     switch (action.type) {
//         case PREVIEW_SHIFT_PENDING :
//             return {
//                 ...state,
//                 isPreviewShiftLoading:true,
//                 previewShiftErrorMessage:'',
//                 shiftDetails:{}
//             };
//         case PREVIEW_SHIFT_SUCCESS:
//             return {
//                 ...state,
//                 isPreviewShiftLoading:false,
//                 previewShiftErrorMessage:'',
//                 shiftDetails:{...action.payload.data}
//             };
//         case PREVIEW_SHIFT_ERROR:
//             return {
//                 ...state,
//                 isPreviewShiftLoading:false,
//                 previewShiftErrorMessage:action.payload.errorMessage,
//                 shiftDetails:{}
//             };
//         case CLEAR_PREVIEW_SHIFT_MESSAGE:
//             return {
//                 ...state,
//                 previewShiftErrorMessage: ''
//             };
//         default:
//             return state
//     }
// };

export const ShiftDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_PENDING :
            return {
                ...state,
                isFetchShiftLoading: true,
                activeShiftByDoctorIdForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                isFetchShiftLoading: false,
                activeShiftByDoctorIdForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                isFetchShiftLoading: false,
                activeShiftByDoctorIdForDropdown: [],
                dropdownErrorMessage: action.payload.message
            };
        case FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_PENDING :
            return {
                ...state,
                isFetchShiftLoading: true,
                activeShiftByHospitalIdForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                isFetchShiftLoading: false,
                activeShiftByHospitalIdForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                isFetchShiftLoading: false,
                activeShiftByHospitalIdForDropdown: [],
                dropdownErrorMessage: action.payload.message
            };
        default:
            return state
    }
};

export const AssignShiftsToDoctorReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case ASSIGN_SHIFTS_TO_DOCTOR_PENDING:
            return {
                ...state,
                isAssignShiftsToDoctorLoading: true,
                assignShiftsToDoctorErrorMessage: '',
                assignShiftsToDoctorSuccessMessage: '',
            };
        case ASSIGN_SHIFTS_TO_DOCTOR_SUCCESS:
            return {
                ...state,
                isAssignShiftsToDoctorLoading: false,
                assignShiftsToDoctorSuccessMessage: action.payload.message,
                assignShiftsToDoctorErrorMessage: '',
            };
        case ASSIGN_SHIFTS_TO_DOCTOR_ERROR:
            return {
                ...state,
                isAssignShiftsToDoctorLoading: false,
                assignShiftsToDoctorSuccessMessage: '',
                assignShiftsToDoctorErrorMessage: action.payload.message,
            };
        case CLEAR_ASSIGN_SHIFTS_TO_DOCTOR_MESSAGE:
            return {
                ...state,
                assignShiftsToDoctorSuccessMessage: '',
                assignShiftsToDoctorErrorMessage: ''
            };
        default:
            return state
    }
};




