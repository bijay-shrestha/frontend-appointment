import {companyProfileSetupActionConstants} from "@frontend-appointment/action-module";

const {
    CREATE_COMPANY_PROFILE_PENDING,
    CREATE_COMPANY_PROFILE_SUCCESS,
    CREATE_COMPANY_PROFILE_ERROR,
    CLEAR_COMPANY_PROFILE_CREATE_SUCCESS_ERROR_MESSAGES,
    EDIT_COMPANY_PROFILE_PENDING,
    EDIT_COMPANY_PROFILE_SUCCESS,
    EDIT_COMPANY_PROFILE_ERROR,
    CLEAR_COMPANY_PROFILE_EDIT_SUCCESS_ERROR_MESSAGES,
    DELETE_COMPANY_PROFILE_PENDING,
    DELETE_COMPANY_PROFILE_SUCCESS,
    DELETE_COMPANY_PROFILE_ERROR,
    CLEAR_COMPANY_PROFILE_DELETE_SUCCESS_ERROR_MESSAGES,
    PREVIEW_COMPANY_PROFILE_PENDING,
    PREVIEW_COMPANY_PROFILE_SUCCESS,
    PREVIEW_COMPANY_PROFILE_ERROR,
    CLEAR_COMPANY_PROFILE_PREVIEW_SUCCESS_ERROR_MESSAGES,
    SEARCH_COMPANY_PROFILE_PENDING,
    SEARCH_COMPANY_PROFILE_SUCCESS,
    SEARCH_COMPANY_PROFILE_ERROR,
    CLEAR_COMPANY_PROFILE_SEARCH_SUCCESS_ERROR_MESSAGES,
    FETCH_COMPANY_PROFILE_FOR_DROPDOWN_SUCCESS,
    FETCH_COMPANY_PROFILE_FOR_DROPDOWN_PENDING,
    FETCH_COMPANY_PROFILE_FOR_DROPDOWN_ERROR,
    FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_SUCCESS,
    FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_PENDING,
    FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_ERROR
} = companyProfileSetupActionConstants;

const initialState = {
    createCompanyProfileLoading: false,
    createCompanyProfileSuccessMessage: '',
    createCompanyProfileErrorMessage: '',
    editCompanyProfileLoading: false,
    editCompanyProfileSuccessMessage: '',
    editCompanyProfileErrorMessage: '',
    deleteCompanyProfileLoading: false,
    deleteCompanyProfileSuccessMessage: '',
    deleteCompanyProfileErrorMessage: '',
    previewCompanyProfileLoading: false,
    previewCompanyProfileErrorMessage: '',
    searchCompanyProfileLoading: false,
    searchCompanyProfileErrorMessage: '',
    fetchCompanyProfileForDropdownLoading: false,
    fetchCompanyProfileByCompanyForDropdownLoading: false,
    dropdownErrorMessage: '',
    profileByCompanyIdDropdownErrorMessage: '',
    companyProfileDetail: {},
    companyProfileList: [],
    activeCompanyProfileListForDropdown: [],
    activeCompanyProfileListByCompanyIdForDropdown: []
};

export const CompanyProfileCreateReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case CREATE_COMPANY_PROFILE_PENDING:
            return {
                ...state,
                createCompanyProfileLoading: true,
                createCompanyProfileSuccessMessage: '',
                createCompanyProfileErrorMessage: ''
            };
        case CREATE_COMPANY_PROFILE_SUCCESS:
            return {
                ...state,
                createCompanyProfileLoading: false,
                createCompanyProfileSuccessMessage: action.payload.successMessage,
                createCompanyProfileErrorMessage: ''
            };
        case CREATE_COMPANY_PROFILE_ERROR:
            return {
                ...state,
                createCompanyProfileLoading: false,
                createCompanyProfileSuccessMessage: '',
                createCompanyProfileErrorMessage: action.payload.errorMessage
            };
        case CLEAR_COMPANY_PROFILE_CREATE_SUCCESS_ERROR_MESSAGES:
            return {
                createCompanyProfileSuccessMessage: '',
                createCompanyProfileErrorMessage: ''
            };
        default:
            return state
    }

};

export const CompanyProfileEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_COMPANY_PROFILE_PENDING :
            return {
                ...state,
                editCompanyProfileLoading: true,
                editCompanyProfileSuccessMessage: '',
                editCompanyProfileErrorMessage: '',
            };
        case EDIT_COMPANY_PROFILE_SUCCESS:
            return {
                ...state,
                editCompanyProfileLoading: false,
                editCompanyProfileSuccessMessage: action.payload.successMessage,
                editCompanyProfileErrorMessage: ''
            };
        case EDIT_COMPANY_PROFILE_ERROR:
            return {
                ...state,
                editCompanyProfileLoading: false,
                editCompanyProfileSuccessMessage: '',
                editCompanyProfileErrorMessage: action.payload.errorMessage
            };
        case CLEAR_COMPANY_PROFILE_EDIT_SUCCESS_ERROR_MESSAGES:
            return {
                editCompanyProfileSuccessMessage: '',
                editCompanyProfileErrorMessage: ''
            };
        default:
            return state
    }
};

export const CompanyProfileDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_COMPANY_PROFILE_PENDING :
            return {
                ...state,
                deleteCompanyProfileLoading: true,
                deleteCompanyProfileSuccessMessage: '',
                deleteCompanyProfileErrorMessage: '',
            };
        case DELETE_COMPANY_PROFILE_SUCCESS:
            return {
                ...state,
                deleteCompanyProfileLoading: false,
                deleteCompanyProfileSuccessMessage: action.payload.successMessage,
                deleteCompanyProfileErrorMessage: ''
            };
        case DELETE_COMPANY_PROFILE_ERROR:
            return {
                ...state,
                deleteCompanyProfileLoading: false,
                deleteCompanyProfileSuccessMessage: '',
                deleteCompanyProfileErrorMessage: action.payload.errorMessage
            };
        case CLEAR_COMPANY_PROFILE_DELETE_SUCCESS_ERROR_MESSAGES:
            return {
                deleteCompanyProfileSuccessMessage: '',
                deleteCompanyProfileErrorMessage: ''
            };
        default:
            return state
    }
};

export const CompanyProfilePreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PREVIEW_COMPANY_PROFILE_PENDING :
            return {
                ...state,
                previewCompanyProfileLoading: true,
                previewCompanyProfileErrorMessage: '',
                companyProfileDetail: {}
            };
        case PREVIEW_COMPANY_PROFILE_SUCCESS:
            return {
                ...state,
                previewCompanyProfileLoading: false,
                companyProfileDetail: {...action.payload.data},
                previewCompanyProfileErrorMessage: ''
            };
        case PREVIEW_COMPANY_PROFILE_ERROR:
            return {
                ...state,
                previewCompanyProfileLoading: false,
                companyProfileDetail: {},
                previewCompanyProfileErrorMessage: action.payload.errorMessage
            };
        case CLEAR_COMPANY_PROFILE_PREVIEW_SUCCESS_ERROR_MESSAGES:
            return {
                previewCompanyProfileErrorMessage: '',
            };
        default:
            return state
    }
};

export const CompanyProfileSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_COMPANY_PROFILE_PENDING :
            return {
                ...state,
                searchCompanyProfileLoading: true,
                searchCompanyProfileErrorMessage: '',
                companyProfileList: []
            };
        case SEARCH_COMPANY_PROFILE_SUCCESS:
            return {
                ...state,
                searchCompanyProfileLoading: false,
                companyProfileList: [...action.payload.data],
                searchCompanyProfileErrorMessage: ''
            };
        case SEARCH_COMPANY_PROFILE_ERROR:
            return {
                ...state,
                searchCompanyProfileLoading: false,
                companyProfileList: [],
                searchCompanyProfileErrorMessage: action.payload.errorMessage
            };
        case CLEAR_COMPANY_PROFILE_SEARCH_SUCCESS_ERROR_MESSAGES:
            return {
                searchCompanyProfileErrorMessage: '',
            };
        default:
            return state
    }
};

export const CompanyProfileDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_COMPANY_PROFILE_FOR_DROPDOWN_PENDING :
            return {
                ...state,
                fetchCompanyProfileForDropdownLoading: true,
                dropdownErrorMessage: '',
                activeCompanyProfileListForDropdown: []
            };
        case FETCH_COMPANY_PROFILE_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                fetchCompanyProfileForDropdownLoading: false,
                activeCompanyProfileListForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_COMPANY_PROFILE_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                fetchCompanyProfileForDropdownLoading: false,
                activeCompanyProfileListForDropdown: [],
                dropdownErrorMessage: action.payload.errorMessage
            };
        case FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_PENDING :
            return {
                ...state,
                fetchCompanyProfileByCompanyForDropdownLoading: true,
                profileByCompanyIdDropdownErrorMessage: '',
                activeCompanyProfileListByCompanyIdForDropdown: []
            };
        case FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                fetchCompanyProfileByCompanyForDropdownLoading: false,
                activeCompanyProfileListByCompanyIdForDropdown: [...action.payload.data],
                profileByCompanyIdDropdownErrorMessage: ''
            };
        case FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                fetchCompanyProfileByCompanyForDropdownLoading: false,
                activeCompanyProfileListByCompanyIdForDropdown: [],
                profileByCompanyIdDropdownErrorMessage: action.payload.errorMessage
            };
        default:
            return state
    }
};

