import {hospitalSetupConstants} from '@frontend-appointment/action-module'

const {
    CREATE_HP_ERROR,
    CREATE_HP_PENDING,
    CREATE_HP_SUCCESS,
    CLEAR_HP_CREATE_MESSAGE,
    HP_EDIT_ERROR,
    HP_EDIT_PENDING,
    HP_EDIT_SUCCESS,
    CLEAR_HP_EDIT_MESSAGE,
    HP_DELETE_ERROR,
    HP_DELETE_PENDING,
    HP_DELETE_SUCCESS,
    CLEAR_HP_DELETE_MESSAGE,
    HP_PREVIEW_ERROR,
    HP_PREVIEW_SUCCESS,
    HP_PREVIEW_PENDING,
    CLEAR_HP_PREVIEW_MESSAGE,
    HP_LIST_ERROR,
    HP_LIST_PENDING,
    HP_LIST_SUCCESS,
    CLEAR_HP_LIST_MESSAGE,
    FETCH_HOSPITALS_DROPDOWN_ERROR,
    FETCH_HOSPITALS_DROPDOWN_SUCCESS,
    FETCH_ALL_HOSPITALS_DROPDOWN_SUCCESS,
    FETCH_ALL_HOSPITALS_DROPDOWN_PENDING,
    FETCH_ALL_HOSPITALS_DROPDOWN_ERROR
} = hospitalSetupConstants

const initialState = {
    createHospitalLoading: false,
    createHospitalerrorMessage: '', //departmentCreate error message
    createHospitalsuccessMessage: '',
    isSearchLoading: true,
    hospitalList: [],
    searchErrorMessage: '',
    deleteErrorMessage: '',
    deleteSuccessMessage: '',
    isDeleteLoading: false,
    isHospitalEditLoading: false,
    hospitalEditErrorMessage: '', //department edit error message
    hospitalEditSuccessMessage: '',
    hospitalPreviewData: null,
    isPreviewLoading: true,
    hospitalPreviewErrorMessage: '',
    hospitalsForDropdown: [],
    isAllHospitalFetchLoading: false,
    allHospitalsForDropdown: [],
    allHospitalDropdownErrorMessage: ''
}

export const HospitalSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case CREATE_HP_PENDING:
            return {
                ...state,
                createHospitalLoading: true,
                createHospitalerrorMessage: '',
                createHospitalsuccessMessage: ''
            }
        case CREATE_HP_SUCCESS:
            return {
                ...state,
                createHospitalLoading: false,
                createHospitalerrorMessage: '',
                createHospitalsuccessMessage: action.payload.message
            }
        case CREATE_HP_ERROR:
            return {
                ...state,
                createHospitalLoading: false,
                createHospitalerrorMessage: action.payload.message,
                createHospitalsuccessMessage: ''
            }
        case CLEAR_HP_CREATE_MESSAGE:
            return {
                ...state,
                createHospitalLoading: false,
                createHospitalerrorMessage: '',
                createHospitalsuccessMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const HospitalEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case HP_EDIT_PENDING:
            return {
                ...state,
                isHospitalEditLoading: true,
                hospitalEditErrorMessage: '',
                hospitalEditSuccessMessage: ''
            }
        case HP_EDIT_SUCCESS:
            return {
                ...state,
                isHospitalEditLoading: false,
                hospitalEditErrorMessage: '', //department edit error message
                hospitalEditSuccessMessage: action.payload.message
            }
        case HP_EDIT_ERROR:
            return {
                ...state,
                isHospitalEditLoading: false,
                hospitalEditErrorMessage: action.payload.message,
                hospitalEditSuccessMessage: ''
            }
        case CLEAR_HP_EDIT_MESSAGE:
            return {
                ...state,
                isHospitalEditLoading: false,
                hospitalEditErrorMessage: '',
                hospitalEditSuccessMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const HospitalPreviewReducer = (
    state = {...initialState},
    action
) => {
    switch (action.type) {
        case HP_PREVIEW_PENDING:
            return {
                ...state,
                hospitalPreviewData: null,
                isPreviewLoading: true,
                HospitalPreviewErrorMessage: ''
            }
        case HP_PREVIEW_SUCCESS:
            return {
                ...state,
                hospitalPreviewData: action.payload.data,
                isPreviewLoading: false,
                hospitalPreviewErrorMessage: ''
            }
        case HP_PREVIEW_ERROR:
            return {
                ...state,
                hospitalPreviewData: null,
                isPreviewLoading: false,
                hospitalPreviewErrorMessage: action.payload.message
            }
        case CLEAR_HP_PREVIEW_MESSAGE:
            return {
                ...state,
                hospitalPreviewData: null,
                isPreviewLoading: false,
                hospitalPreviewErrorMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const HospitalSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case HP_LIST_PENDING:
            return {
                ...state,
                isSearchLoading: true,
                hospitalList: [],
                searchErrorMessage: ''
            }
        case HP_LIST_SUCCESS:
            return {
                ...state,
                isSearchLoading: false,
                hospitalList: action.payload.data,
                searchErrorMessage: ''
            }
        case HP_LIST_ERROR:
            return {
                ...state,
                isSearchLoading: false,
                hospitalList: [],
                searchErrorMessage: action.payload.message
            }
        case CLEAR_HP_LIST_MESSAGE:
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

export const HospitalDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case HP_DELETE_PENDING:
            return {
                ...state,
                isDeleteLoading: true,
                deleteErrorMessage: '',
                deleteSuccessMessage: ''
            }
        case HP_DELETE_SUCCESS:
            return {
                ...state,
                isDeleteLoading: false,
                deleteErrorMessage: '',
                deleteSuccessMessage: action.payload.message
            }
        case HP_DELETE_ERROR:
            return {
                ...state,
                isDeleteLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: ''
            }
        case CLEAR_HP_DELETE_MESSAGE:
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
};

export const HospitalDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_HOSPITALS_DROPDOWN_SUCCESS:
            return {
                ...state,
                hospitalsForDropdown: [...action.payload.data]
            };
        case FETCH_HOSPITALS_DROPDOWN_ERROR:
            return {
                ...state,
                hospitalsForDropdown: []
            };
        case FETCH_ALL_HOSPITALS_DROPDOWN_PENDING:
            return {
                isAllHospitalFetchLoading: true,
                allHospitalsForDropdown: [],
                allHospitalDropdownErrorMessage: ''
            };
        case FETCH_ALL_HOSPITALS_DROPDOWN_SUCCESS:
            return {
                ...state,
                isAllHospitalFetchLoading: false,
                allHospitalsForDropdown: [...action.payload.data],
                allHospitalDropdownErrorMessage: ''
            };
        case FETCH_ALL_HOSPITALS_DROPDOWN_ERROR:
            return {
                ...state,
                isAllHospitalFetchLoading: false,
                allHospitalsForDropdown: [],
                allHospitalDropdownErrorMessage: action.payload.errorMessage
            };
        default:
            return state
    }
};
