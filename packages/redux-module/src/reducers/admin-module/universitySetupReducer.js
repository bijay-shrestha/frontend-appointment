import {universitySetupActionConstants} from '@frontend-appointment/action-module';

const {
    SAVE_UNIVERSITY_PENDING,
    SAVE_UNIVERSITY_SUCCESS,
    SAVE_UNIVERSITY_ERROR,
    CLEAR_SAVE_UNIVERSITY_MESSAGE,
    EDIT_UNIVERSITY_PENDING,
    EDIT_UNIVERSITY_SUCCESS,
    EDIT_UNIVERSITY_ERROR,
    CLEAR_EDIT_UNIVERSITY_MESSAGE,
    DELETE_UNIVERSITY_PENDING,
    DELETE_UNIVERSITY_SUCCESS,
    DELETE_UNIVERSITY_ERROR,
    CLEAR_DELETE_UNIVERSITY_MESSAGE,
    SEARCH_UNIVERSITY_PENDING,
    SEARCH_UNIVERSITY_SUCCESS,
    SEARCH_UNIVERSITY_ERROR,
    CLEAR_SEARCH_UNIVERSITY_MESSAGE,
    FETCH_UNIVERSITY_ERROR,
    FETCH_UNIVERSITY_SUCCESS,
    FETCH_UNIVERSITY_PENDING,
    PREVIEW_UNIVERSITY_SUCCESS,
    PREVIEW_UNIVERSITY_PENDING,
    PREVIEW_UNIVERSITY_ERROR,
    CLEAR_PREVIEW_UNIVERSITY_MESSAGE
} = universitySetupActionConstants;

const initialState = {
    isSaveUniversityLoading: false,
    saveSuccessMessage: '',
    saveErrorMessage: '',
    isEditUniversityLoading: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isDeleteUniversityLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isSearchUniversityLoading: false,
    universityList: [],
    searchErrorMessage: '',
    isFetchUniversityLoading: false,
    activeUniversityForDropdown: [],
    dropdownErrorMessage: '',
    isPreviewUniversityLoading:false,
    previewUniversityErrorMessage:'',
    universityDetails:{}
};

export const UniversitySaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_UNIVERSITY_PENDING:
            return {
                ...state,
                isSaveUniversityLoading: true,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        case SAVE_UNIVERSITY_SUCCESS:
            return {
                ...state,
                isSaveUniversityLoading: false,
                saveSuccessMessage: action.payload.message,
                saveErrorMessage: ''
            };
        case SAVE_UNIVERSITY_ERROR:
            return {
                ...state,
                isSaveUniversityLoading: false,
                saveErrorMessage: action.payload.message,
                saveSuccessMessage: '',
            };
        case CLEAR_SAVE_UNIVERSITY_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const UniversityEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_UNIVERSITY_PENDING:
            return {
                ...state,
                isEditUniversityLoading: true,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        case EDIT_UNIVERSITY_SUCCESS:
            return {
                ...state,
                isEditUniversityLoading: false,
                editSuccessMessage: action.payload.message,
                editErrorMessage: ''
            };
        case EDIT_UNIVERSITY_ERROR:
            return {
                ...state,
                isEditUniversityLoading: false,
                editErrorMessage: action.payload.message,
                editSuccessMessage: '',
            };
        case CLEAR_EDIT_UNIVERSITY_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return state
    }
};

export const UniversityDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_UNIVERSITY_PENDING :
            return {
                ...state,
                isDeleteUniversityLoading: true,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        case DELETE_UNIVERSITY_SUCCESS:
            return {
                ...state,
                isDeleteUniversityLoading: false,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: ''
            };
        case DELETE_UNIVERSITY_ERROR:
            return {
                ...state,
                isDeleteUniversityLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            };
        case CLEAR_DELETE_UNIVERSITY_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        default:
            return state
    }
};

export const UniversitySearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_UNIVERSITY_PENDING :
            return {
                ...state,
                isSearchUniversityLoading: true,
                universityList: [],
                searchErrorMessage: ''
            };
        case SEARCH_UNIVERSITY_SUCCESS:
            return {
                ...state,
                isSearchUniversityLoading: false,
                universityList: [...action.payload.data],
                searchErrorMessage:''
            };
        case SEARCH_UNIVERSITY_ERROR:
            return {
                ...state,
                isSearchUniversityLoading: false,
                universityList: [],
                searchErrorMessage: action.payload.message
            };
        case CLEAR_SEARCH_UNIVERSITY_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return state
    }
};

export const UniversityPreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PREVIEW_UNIVERSITY_PENDING :
            return {
                ...state,
                isPreviewUniversityLoading:true,
                previewUniversityErrorMessage:'',
                universityDetails:{}
            };
        case PREVIEW_UNIVERSITY_SUCCESS:
            return {
                ...state,
                isPreviewUniversityLoading:false,
                previewUniversityErrorMessage:'',
                universityDetails:{...action.payload.data}
            };
        case PREVIEW_UNIVERSITY_ERROR:
            return {
                ...state,
                isPreviewUniversityLoading:false,
                previewUniversityErrorMessage:action.payload.errorMessage,
                universityDetails:{}
            };
        case CLEAR_PREVIEW_UNIVERSITY_MESSAGE:
            return {
                ...state,
                previewUniversityErrorMessage: ''
            };
        default:
            return state
    }
};

export const UniversityDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_UNIVERSITY_PENDING :
            return {
                ...state,
                isFetchUniversityLoading: true,
                activeUniversityForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_UNIVERSITY_SUCCESS:
            return {
                ...state,
                isFetchUniversityLoading: false,
                activeUniversityForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_UNIVERSITY_ERROR:
            return {
                ...state,
                isFetchUniversityLoading: false,
                activeUniversityForDropdown: [],
                dropdownErrorMessage: action.payload.message
            };
        default:
            return state
    }
};


