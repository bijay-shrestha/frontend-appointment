import {qualificationSetupConstants} from '@frontend-appointment/action-module'

const {
    CREATE_QF_ERROR,
    CREATE_QF_PENDING,
    CREATE_QF_SUCCESS,
    CLEAR_QF_CREATE_MESSAGE,
    CLEAR_QF_EDIT_MESSAGE,
    CLEAR_QF_PREVIEW_MESSAGE,
    CLEAR_QF_DELETE_MESSAGE,
    QF_DELETE_ERROR,
    QF_DELETE_PENDING,
    QF_DELETE_SUCCESS,
    QF_EDIT_ERROR,
    QF_EDIT_PENDING,
    QF_EDIT_SUCCESS,
    QF_LIST_ERROR,
    QF_LIST_PENDING,
    QF_LIST_SUCCESS,
    QF_PREVIEW_ERROR,
    QF_PREVIEW_PENDING,
    QF_PREVIEW_SUCCESS,
    CLEAR_QF_LIST_MESSAGE,
    FETCH_COUNTRY_CODE_DROPDOWN_SUCCESS,
    FETCH_COUNTRY_CODE_DROPDOWN_ERROR,
    FETCH_UNIVERSITY_DROPDOWN_SUCCESS,
    FETCH_UNIVERSITY_DROPDOWN_ERROR,
    FETCH_QF_DROPDOWN_SUCCESS,
    FETCH_QF_DROPDOWN_ERROR
} = qualificationSetupConstants

const initialState = {
    createQualificationLoading: true,
    createQualificationErrorMessage: '', //departmentCreate error message
    createQualificationSuccessMessage: '',
    isSearchLoading: true,
    qualificationList: [],
    searchErrorMessage: '',
    deleteErrorMessage: '',
    deleteSuccessMessage: '',
    isDeleteLoading: true,
    isQualificationEditLoading: true,
    qualificationEditErrorMessage: '', //department edit error message
    qualificationEditSuccessMessage: '',
    qualificationPreviewData: null,
    isPreviewLoading: true,
    qualificationPreviewErrorMessage: '',
    qualificationsForDropdown: [],
    countryCodeForDropdown: [],
    universitiesDropdown: []
};

export const QualificationSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case CREATE_QF_PENDING:
            return {
                ...state,
                createQualificationLoading: true,
                createQualificationErrorMessage: '',
                createQualificationSuccessMessage: ''
            }
        case CREATE_QF_SUCCESS:
            return {
                ...state,
                createQualificationLoading: false,
                createQualificationErrorMessage: '',
                createQualificationSuccessMessage: action.payload.message
            }
        case CREATE_QF_ERROR:
            return {
                ...state,
                createQualificationLoading: false,
                createQualificationErrorMessage: action.payload.message,
                createQualificationSuccessMessage: ''
            }
        case CLEAR_QF_CREATE_MESSAGE:
            return {
                ...state,
                createQualificationLoading: false,
                createQualificationErrorMessage: '',
                createQualificationSuccessMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const QualificationEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case QF_EDIT_PENDING:
            return {
                ...state,
                isQualificationEditLoading: true,
                qualificationEditErrorMessage: '',
                qualificationEditSuccessMessage: ''
            }
        case QF_EDIT_SUCCESS:
            return {
                ...state,
                isQualificationEditLoading: false,
                qualificationEditErrorMessage: '', //department edit error message
                qualificationEditSuccessMessage: action.payload.message
            }
        case QF_EDIT_ERROR:
            return {
                ...state,
                isQualificationEditLoading: false,
                qualificationEditErrorMessage: action.payload.message,
                qualificationEditSuccessMessage: ''
            }
        case CLEAR_QF_EDIT_MESSAGE:
            return {
                ...state,
                isQualificationEditLoading: false,
                qualificationEditErrorMessage: '',
                qualificationEditSuccessMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const QualificationPreviewReducer = (
    state = {...initialState},
    action
) => {
    switch (action.type) {
        case QF_PREVIEW_PENDING:
            return {
                ...state,
                qualificationPreviewData: null,
                isPreviewLoading: true,
                qualificationPreviewErrorMessage: ''
            }
        case QF_PREVIEW_SUCCESS:
            return {
                ...state,
                qualificationPreviewData: action.payload.data,
                isPreviewLoading: false,
                qualificationPreviewErrorMessage: ''
            }
        case QF_PREVIEW_ERROR:
            return {
                ...state,
                qualificationPreviewData: null,
                isPreviewLoading: false,
                qualificationPreviewErrorMessage: action.payload.message
            }
        case CLEAR_QF_PREVIEW_MESSAGE:
            return {
                ...state,
                qualificationPreviewData: null,
                isPreviewLoading: false,
                qualificationPreviewErrorMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const QualificationSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case QF_LIST_PENDING:
            return {
                ...state,
                isSearchLoading: true,
                qualificationList: [],
                searchErrorMessage: ''
            }
        case QF_LIST_SUCCESS:
            return {
                ...state,
                isSearchLoading: false,
                qualificationList: action.payload.data,
                searchErrorMessage: ''
            }
        case QF_LIST_ERROR:
            return {
                ...state,
                isSearchLoading: false,
                qualificationList: [],
                searchErrorMessage: action.payload.message
            }
        case CLEAR_QF_LIST_MESSAGE:
            return {
                ...state,
                isSearchLoading: false,
                searchErrorMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const QualificationDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case QF_DELETE_PENDING:
            return {
                ...state,
                isDeleteLoading: true,
                deleteErrorMessage: '',
                deleteSuccessMessage: ''
            }
        case QF_DELETE_SUCCESS:
            return {
                ...state,
                isDeleteLoading: false,
                deleteErrorMessage: '',
                deleteSuccessMessage: action.payload.message
            }
        case QF_DELETE_ERROR:
            return {
                ...state,
                isDeleteLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: ''
            }
        case CLEAR_QF_DELETE_MESSAGE:
            return {
                ...state,
                isDeleteLoading: false,
                deleteErrorMessage: '',
                deleteSuccessMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const QualificationDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_QF_DROPDOWN_SUCCESS:
            return {
                ...state,
                qualificationsForDropdown: [...action.payload.data]
            }
        case FETCH_QF_DROPDOWN_ERROR:
            return {
                ...state,
                qualificationsForDropdown: []
            }
        default:
            return state
    }
}

export const CountryCodeDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_COUNTRY_CODE_DROPDOWN_SUCCESS:
            return {
                ...state,
                countryCodeForDropdown: [...action.payload.data]
            }
        case FETCH_COUNTRY_CODE_DROPDOWN_ERROR:
            return {
                ...state,
                countryCodeForDropdown: []
            }
        default:
            return state
    }
}

export const UniversitiesForDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_UNIVERSITY_DROPDOWN_SUCCESS:
            return {
                ...state,
                universitiesDropdown: [...action.payload.data]
            }
        case FETCH_UNIVERSITY_DROPDOWN_ERROR:
            return {
                ...state,
                universitiesDropdown: []
            }
        default:
            return state
    }
}
