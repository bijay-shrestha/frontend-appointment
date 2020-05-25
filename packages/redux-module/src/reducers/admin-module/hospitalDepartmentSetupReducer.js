import {hospitalDepartmentSetupActionConstants} from '@frontend-appointment/action-module';

const {
    SAVE_HOSPITAL_DEPARTMENT_PENDING,
    SAVE_HOSPITAL_DEPARTMENT_SUCCESS,
    SAVE_HOSPITAL_DEPARTMENT_ERROR,
    CLEAR_SAVE_HOSPITAL_DEPARTMENT_MESSAGE,
    EDIT_HOSPITAL_DEPARTMENT_PENDING,
    EDIT_HOSPITAL_DEPARTMENT_SUCCESS,
    EDIT_HOSPITAL_DEPARTMENT_ERROR,
    CLEAR_EDIT_HOSPITAL_DEPARTMENT_MESSAGE,
    DELETE_HOSPITAL_DEPARTMENT_PENDING,
    DELETE_HOSPITAL_DEPARTMENT_SUCCESS,
    DELETE_HOSPITAL_DEPARTMENT_ERROR,
    CLEAR_DELETE_HOSPITAL_DEPARTMENT_MESSAGE,
    SEARCH_HOSPITAL_DEPARTMENT_PENDING,
    SEARCH_HOSPITAL_DEPARTMENT_SUCCESS,
    SEARCH_HOSPITAL_DEPARTMENT_ERROR,
    CLEAR_SEARCH_HOSPITAL_DEPARTMENT_MESSAGE,
    PREVIEW_HOSPITAL_DEPARTMENT_SUCCESS,
    PREVIEW_HOSPITAL_DEPARTMENT_PENDING,
    PREVIEW_HOSPITAL_DEPARTMENT_ERROR,
    CLEAR_PREVIEW_HOSPITAL_DEPARTMENT_MESSAGE,
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_SUCCESS,
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_PENDING,
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_ERROR,
    FETCH_ALL_HOSPITAL_DEPARTMENT_ERROR,
    FETCH_ALL_HOSPITAL_DEPARTMENT_PENDING,
    FETCH_ALL_HOSPITAL_DEPARTMENT_SUCCESS
} = hospitalDepartmentSetupActionConstants;

const initialState = {
    isSaveHospitalDepartmentLoading: false,
    saveSuccessMessage: '',
    saveErrorMessage: '',
    isEditHospitalDepartmentLoading: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isDeleteHospitalDepartmentLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isSearchHospitalDepartmentLoading: false,
    hospitalDepartmentList: [],
    totalRecords:'',
    searchErrorMessage: '',
    isFetchHospitalDepartmentLoading: false,
    activeHospitalDepartmentForDropdown: [],
    activeDepartmentDropdownErrorMessage: '',
    isPreviewHospitalDepartmentLoading: false,
    previewHospitalDepartmentErrorMessage: '',
    hospitalDepartmentDetails: {},
    isFetchAllHospitalDepartmentLoading: false,
    allHospitalDepartmentForDropdown: [],
    allDepartmentDropdownErrorMessage: '',
};

export const HospitalDepartmentSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_HOSPITAL_DEPARTMENT_PENDING:
            return {
                ...state,
                isSaveHospitalDepartmentLoading: true,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        case SAVE_HOSPITAL_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isSaveHospitalDepartmentLoading: false,
                saveSuccessMessage: action.payload.message,
                saveErrorMessage: ''
            };
        case SAVE_HOSPITAL_DEPARTMENT_ERROR:
            return {
                ...state,
                isSaveHospitalDepartmentLoading: false,
                saveErrorMessage: action.payload.message,
                saveSuccessMessage: '',
            };
        case CLEAR_SAVE_HOSPITAL_DEPARTMENT_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const HospitalDepartmentEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_HOSPITAL_DEPARTMENT_PENDING:
            return {
                ...state,
                isEditHospitalDepartmentLoading: true,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        case EDIT_HOSPITAL_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isEditHospitalDepartmentLoading: false,
                editSuccessMessage: action.payload.message,
                editErrorMessage: ''
            };
        case EDIT_HOSPITAL_DEPARTMENT_ERROR:
            return {
                ...state,
                isEditHospitalDepartmentLoading: false,
                editErrorMessage: action.payload.message,
                editSuccessMessage: '',
            };
        case CLEAR_EDIT_HOSPITAL_DEPARTMENT_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return state
    }
};

export const HospitalDepartmentDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_HOSPITAL_DEPARTMENT_PENDING :
            return {
                ...state,
                isDeleteHospitalDepartmentLoading: true,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        case DELETE_HOSPITAL_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isDeleteHospitalDepartmentLoading: false,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: ''
            };
        case DELETE_HOSPITAL_DEPARTMENT_ERROR:
            return {
                ...state,
                isDeleteHospitalDepartmentLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            };
        case CLEAR_DELETE_HOSPITAL_DEPARTMENT_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        default:
            return state
    }
};

export const HospitalDepartmentSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_HOSPITAL_DEPARTMENT_PENDING :
            return {
                ...state,
                isSearchHospitalDepartmentLoading: true,
                hospitalDepartmentList: [],
                totalRecords:'',
                searchErrorMessage: ''
            };
        case SEARCH_HOSPITAL_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isSearchHospitalDepartmentLoading: false,
                hospitalDepartmentList: [...action.payload.data.hospitalDepartmentList],
                totalRecords:action.payload.data.totalItems,
                searchErrorMessage: ''
            };
        case SEARCH_HOSPITAL_DEPARTMENT_ERROR:
            return {
                ...state,
                isSearchHospitalDepartmentLoading: false,
                hospitalDepartmentList: [],
                totalRecords:'',
                searchErrorMessage: action.payload.message
            };
        case CLEAR_SEARCH_HOSPITAL_DEPARTMENT_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return state
    }
};

export const HospitalDepartmentPreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PREVIEW_HOSPITAL_DEPARTMENT_PENDING :
            return {
                ...state,
                isPreviewHospitalDepartmentLoading: true,
                previewHospitalDepartmentErrorMessage: '',
                hospitalDepartmentDetails: {}
            };
        case PREVIEW_HOSPITAL_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isPreviewHospitalDepartmentLoading: false,
                previewHospitalDepartmentErrorMessage: '',
                hospitalDepartmentDetails: {...action.payload.data}
            };
        case PREVIEW_HOSPITAL_DEPARTMENT_ERROR:
            return {
                ...state,
                isPreviewHospitalDepartmentLoading: false,
                previewHospitalDepartmentErrorMessage: action.payload.errorMessage,
                hospitalDepartmentDetails: {}
            };
        case CLEAR_PREVIEW_HOSPITAL_DEPARTMENT_MESSAGE:
            return {
                ...state,
                previewHospitalDepartmentErrorMessage: ''
            };
        default:
            return state
    }
};

export const HospitalDepartmentDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_HOSPITAL_DEPARTMENT_PENDING :
            return {
                ...state,
                isFetchActiveHospitalDepartmentLoading: true,
                activeHospitalDepartmentForDropdown: [],
                activeDepartmentDropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_HOSPITAL_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isFetchActiveHospitalDepartmentLoading: false,
                activeHospitalDepartmentForDropdown: [...action.payload.data],
                activeDepartmentDropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_HOSPITAL_DEPARTMENT_ERROR:
            return {
                ...state,
                isFetchActiveHospitalDepartmentLoading: false,
                activeHospitalDepartmentForDropdown: [],
                activeDepartmentDropdownErrorMessage: action.payload.message
            };
        case FETCH_ALL_HOSPITAL_DEPARTMENT_PENDING :
            return {
                ...state,
                isFetchAllHospitalDepartmentLoading: true,
                allHospitalDepartmentForDropdown: [],
                allDepartmentDropdownErrorMessage: '',
            };
        case FETCH_ALL_HOSPITAL_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isFetchAllHospitalDepartmentLoading: false,
                allHospitalDepartmentForDropdown: [...action.payload.data],
                allDepartmentDropdownErrorMessage: '',
            };
        case FETCH_ALL_HOSPITAL_DEPARTMENT_ERROR:
            return {
                ...state,
                isFetchAllHospitalDepartmentLoading: false,
                allHospitalDepartmentForDropdown: [],
                allDepartmentDropdownErrorMessage: action.payload.message,
            };
        default:
            return state
    }
};


