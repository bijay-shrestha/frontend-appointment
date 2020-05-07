import {breakTypeSetupActionConstants} from '@frontend-appointment/action-module';

const {
    SAVE_BREAK_TYPE_PENDING,
    SAVE_BREAK_TYPE_SUCCESS,
    SAVE_BREAK_TYPE_ERROR,
    CLEAR_SAVE_BREAK_TYPE_MESSAGE,
    EDIT_BREAK_TYPE_PENDING,
    EDIT_BREAK_TYPE_SUCCESS,
    EDIT_BREAK_TYPE_ERROR,
    CLEAR_EDIT_BREAK_TYPE_MESSAGE,
    DELETE_BREAK_TYPE_PENDING,
    DELETE_BREAK_TYPE_SUCCESS,
    DELETE_BREAK_TYPE_ERROR,
    CLEAR_DELETE_BREAK_TYPE_MESSAGE,
    SEARCH_BREAK_TYPE_PENDING,
    SEARCH_BREAK_TYPE_SUCCESS,
    SEARCH_BREAK_TYPE_ERROR,
    CLEAR_SEARCH_BREAK_TYPE_MESSAGE,
    FETCH_ACTIVE_BREAK_TYPE_BY_DOCTOR_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_BREAK_TYPE_BY_DOCTOR_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_BREAK_TYPE_BY_DOCTOR_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_ERROR
    // PREVIEW_BREAK_TYPE_SUCCESS,
    // PREVIEW_BREAK_TYPE_PENDING,
    // PREVIEW_BREAK_TYPE_ERROR,
    // CLEAR_PREVIEW_BREAK_TYPE_MESSAGE
} = breakTypeSetupActionConstants;

const initialState = {
    isSaveBreakTypeLoading: false,
    saveSuccessMessage: '',
    saveErrorMessage: '',
    isEditBreakTypeLoading: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isDeleteBreakTypeLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isSearchBreakTypeLoading: false,
    shiftList: [],
    searchErrorMessage: '',
    isFetchBreakTypeLoading: false,
    activeBreakTypeByHospitalIdForDropdown: [],
    dropdownErrorMessage: '',
    isPreviewBreakTypeLoading: false,
    previewBreakTypeErrorMessage: '',
    shiftDetails: {}
};

export const BreakTypeSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_BREAK_TYPE_PENDING:
            return {
                ...state,
                isSaveBreakTypeLoading: true,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        case SAVE_BREAK_TYPE_SUCCESS:
            return {
                ...state,
                isSaveBreakTypeLoading: false,
                saveSuccessMessage: action.payload.message,
                saveErrorMessage: ''
            };
        case SAVE_BREAK_TYPE_ERROR:
            return {
                ...state,
                isSaveBreakTypeLoading: false,
                saveErrorMessage: action.payload.message,
                saveSuccessMessage: '',
            };
        case CLEAR_SAVE_BREAK_TYPE_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const BreakTypeEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_BREAK_TYPE_PENDING:
            return {
                ...state,
                isEditBreakTypeLoading: true,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        case EDIT_BREAK_TYPE_SUCCESS:
            return {
                ...state,
                isEditBreakTypeLoading: false,
                editSuccessMessage: action.payload.message,
                editErrorMessage: ''
            };
        case EDIT_BREAK_TYPE_ERROR:
            return {
                ...state,
                isEditBreakTypeLoading: false,
                editErrorMessage: action.payload.message,
                editSuccessMessage: '',
            };
        case CLEAR_EDIT_BREAK_TYPE_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return state
    }
};

export const BreakTypeDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_BREAK_TYPE_PENDING :
            return {
                ...state,
                isDeleteBreakTypeLoading: true,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        case DELETE_BREAK_TYPE_SUCCESS:
            return {
                ...state,
                isDeleteBreakTypeLoading: false,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: ''
            };
        case DELETE_BREAK_TYPE_ERROR:
            return {
                ...state,
                isDeleteBreakTypeLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            };
        case CLEAR_DELETE_BREAK_TYPE_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        default:
            return state
    }
};

export const BreakTypeSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_BREAK_TYPE_PENDING :
            return {
                ...state,
                isSearchBreakTypeLoading: true,
                shiftList: [],
                searchErrorMessage: ''
            };
        case SEARCH_BREAK_TYPE_SUCCESS:
            return {
                ...state,
                isSearchBreakTypeLoading: false,
                shiftList: [...action.payload.data],
                searchErrorMessage: ''
            };
        case SEARCH_BREAK_TYPE_ERROR:
            return {
                ...state,
                isSearchBreakTypeLoading: false,
                shiftList: [],
                searchErrorMessage: action.payload.message
            };
        case CLEAR_SEARCH_BREAK_TYPE_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return state
    }
};

// export const BreakTypePreviewReducer = (state = {...initialState}, action) => {
//     switch (action.type) {
//         case PREVIEW_BREAK_TYPE_PENDING :
//             return {
//                 ...state,
//                 isPreviewBreakTypeLoading:true,
//                 previewBreakTypeErrorMessage:'',
//                 shiftDetails:{}
//             };
//         case PREVIEW_BREAK_TYPE_SUCCESS:
//             return {
//                 ...state,
//                 isPreviewBreakTypeLoading:false,
//                 previewBreakTypeErrorMessage:'',
//                 shiftDetails:{...action.payload.data}
//             };
//         case PREVIEW_BREAK_TYPE_ERROR:
//             return {
//                 ...state,
//                 isPreviewBreakTypeLoading:false,
//                 previewBreakTypeErrorMessage:action.payload.errorMessage,
//                 shiftDetails:{}
//             };
//         case CLEAR_PREVIEW_BREAK_TYPE_MESSAGE:
//             return {
//                 ...state,
//                 previewBreakTypeErrorMessage: ''
//             };
//         default:
//             return state
//     }
// };

export const BreakTypeDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_PENDING :
            return {
                ...state,
                isFetchBreakTypeLoading: true,
                activeBreakTypeByHospitalIdForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                isFetchBreakTypeLoading: false,
                activeBreakTypeByHospitalIdForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                isFetchBreakTypeLoading: false,
                activeBreakTypeByHospitalIdForDropdown: [],
                dropdownErrorMessage: action.payload.message
            };
        default:
            return state
    }
};




