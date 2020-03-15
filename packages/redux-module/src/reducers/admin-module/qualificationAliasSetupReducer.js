import {qualificationAliasSetupConstants} from '@frontend-appointment/action-module';

const {
    SAVE_QUALIFICATION_ALIAS_PENDING,
    SAVE_QUALIFICATION_ALIAS_SUCCESS,
    SAVE_QUALIFICATION_ALIAS_ERROR,
    CLEAR_SAVE_QUALIFICATION_ALIAS_MESSAGE,
    EDIT_QUALIFICATION_ALIAS_PENDING,
    EDIT_QUALIFICATION_ALIAS_SUCCESS,
    EDIT_QUALIFICATION_ALIAS_ERROR,
    CLEAR_EDIT_QUALIFICATION_ALIAS_MESSAGE,
    DELETE_QUALIFICATION_ALIAS_PENDING,
    DELETE_QUALIFICATION_ALIAS_SUCCESS,
    DELETE_QUALIFICATION_ALIAS_ERROR,
    CLEAR_DELETE_QUALIFICATION_ALIAS_MESSAGE,
    SEARCH_QUALIFICATION_ALIAS_PENDING,
    SEARCH_QUALIFICATION_ALIAS_SUCCESS,
    SEARCH_QUALIFICATION_ALIAS_ERROR,
    CLEAR_SEARCH_QUALIFICATION_ALIAS_MESSAGE,
    FETCH_QUALIFICATION_ALIAS_ERROR,
    FETCH_QUALIFICATION_ALIAS_SUCCESS,
    FETCH_QUALIFICATION_ALIAS_PENDING
} = qualificationAliasSetupConstants;

const initialState = {
    isSaveQualificationAliasLoading: false,
    saveSuccessMessage: '',
    saveErrorMessage: '',
    isEditQualificationAliasLoading: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isDeleteQualificationAliasLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isSearchQualificationAliasLoading: false,
    qualificationAliasList: [],
    searchErrorMessage: '',
    isFetchQualificationAliasLoading: false,
    activeQualificationAliasForDropdown: [],
    dropdownErrorMessage: ''
};

export const QualificationAliasSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_QUALIFICATION_ALIAS_PENDING:
            return {
                ...state,
                isSaveQualificationAliasLoading: true,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        case SAVE_QUALIFICATION_ALIAS_SUCCESS:
            return {
                ...state,
                isSaveQualificationAliasLoading: false,
                saveSuccessMessage: action.payload.message,
                saveErrorMessage: ''
            };
        case SAVE_QUALIFICATION_ALIAS_ERROR:
            return {
                ...state,
                isSaveQualificationAliasLoading: false,
                saveErrorMessage: action.payload.message,
                saveSuccessMessage: '',
            };
        case CLEAR_SAVE_QUALIFICATION_ALIAS_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const QualificationAliasEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_QUALIFICATION_ALIAS_PENDING:
            return {
                ...state,
                isEditQualificationAliasLoading: true,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        case EDIT_QUALIFICATION_ALIAS_SUCCESS:
            return {
                ...state,
                isEditQualificationAliasLoading: false,
                editSuccessMessage: action.payload.message,
                editErrorMessage: ''
            };
        case EDIT_QUALIFICATION_ALIAS_ERROR:
            return {
                ...state,
                isEditQualificationAliasLoading: false,
                editErrorMessage: action.payload.message,
                editSuccessMessage: '',
            };
        case CLEAR_EDIT_QUALIFICATION_ALIAS_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return state
    }
};

export const QualificationAliasDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_QUALIFICATION_ALIAS_PENDING :
            return {
                ...state,
                isDeleteQualificationAliasLoading: true,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        case DELETE_QUALIFICATION_ALIAS_SUCCESS:
            return {
                ...state,
                isDeleteQualificationAliasLoading: false,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: ''
            };
        case DELETE_QUALIFICATION_ALIAS_ERROR:
            return {
                ...state,
                isDeleteQualificationAliasLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            };
        case CLEAR_DELETE_QUALIFICATION_ALIAS_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        default:
            return state
    }
};

export const QualificationAliasSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_QUALIFICATION_ALIAS_PENDING :
            return {
                ...state,
                isSearchQualificationAliasLoading: true,
                qualificationAliasList: [],
                searchErrorMessage: ''
            };
        case SEARCH_QUALIFICATION_ALIAS_SUCCESS:
            return {
                ...state,
                isSearchQualificationAliasLoading: false,
                qualificationAliasList: [...action.payload.data],
            };
        case SEARCH_QUALIFICATION_ALIAS_ERROR:
            return {
                ...state,
                isSearchQualificationAliasLoading: false,
                qualificationAliasList: [],
                searchErrorMessage: action.payload.message
            };
        case CLEAR_SEARCH_QUALIFICATION_ALIAS_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return state
    }
};

export const QualificationAliasDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_QUALIFICATION_ALIAS_PENDING :
            return {
                ...state,
                isFetchQualificationAliasLoading: true,
                activeQualificationAliasForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_QUALIFICATION_ALIAS_SUCCESS:
            return {
                ...state,
                isFetchQualificationAliasLoading: false,
                activeQualificationAliasForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_QUALIFICATION_ALIAS_ERROR:
            return {
                ...state,
                isFetchQualificationAliasLoading: false,
                activeQualificationAliasForDropdown: [],
                dropdownErrorMessage: action.payload.message
            };
        default:
            return state
    }
};


