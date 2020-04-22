import {departmentSetupConstants} from '@frontend-appointment/action-module'

const {
    DATA_FETCH_START,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_ERROR,
    SAVE_DEPARTMENTS,
    CREATE_DEPARTMENT_PENDING,
    CREATE_DEPARTMENT_SUCCESS,
    CREATE_DEPARTMENT_ERROR,
    DEPARTMENT_LIST_PENDING,
    DEPARTMENT_LIST_SUCCESS,
    DEPARTMENT_LIST_ERROR,
    DEPARTMENT_EDIT_PENDING,
    DEPARTMENT_EDIT_SUCCESS,
    DEPARTMENT_EDIT_ERROR,
    DEPARTMENT_DELETE_PENDING,
    DEPARTMENT_DELETE_SUCCESS,
    DEPARTMENT_DELETE_ERROR,
    DEPARTMENT_PREVIEW_ERROR,
    DEPARTMENT_PREVIEW_SUCCESS,
    DEPARTMENT_PREVIEW_PENDING,
    CLEAR_DEPARTMENT_CREATE_SUCCESS_MESSAGE,
    CLEAR_DEPARTMENT_CREATE_ERROR_MESSAGE,
    CLEAR_DEPARTMENT_LIST_FETCH_ERROR_MESSAGE,
    CLEAR_DEPARTMENT_EDIT_SUCCESS_MESSAGE,
    CLEAR_DEPARTMENT_EDIT_ERROR_MESSAGE,
    CLEAR_DEPARTMENT_PREVIEW_ERROR_MESSAGE,
    CLEAR_DEPARTMENT_DELETE_ERROR_MESSAGE,
    CLEAR_DEPARTMENT_DELETE_SUCCESS_MESSAGE,
    FETCH_DEPARTMENTS_BY_HOSPITAL_ID_SUCCESS,
    FETCH_DEPARTMENTS_BY_HOSPITAL_ID_ERROR,
    FETCH_ACTIVE_DEPARTMENTS_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_DEPARTMENTS_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_DEPARTMENTS_FOR_DROPDOWN_SUCCESS
} = departmentSetupConstants;

const initialState = {
    departments: [],
    isCreateDepartmentLoading: false,
    errorMessage: '',//departmentCreate error message
    successMessage: '',
    isSearchLoading: false,
    departmentList: [],
    searchErrorMessage: '',
    deleteErrorMessage: '',
    deleteSuccessMessage: '',
    isDeleteLoading: false,
    isDepartmentEditLoading: false,
    departmentErrorMessage: '',//department edit error message
    departmentSuccessMessage: '',
    departmentPreviewData: {},
    departmentPreviewErrorMessage: '',
    departmentPreviewOpen: false,
    departmentsByHospital: [],
    errorMessageForDropdown: '',
    isFetchActiveDepartmentsForDropdownPending: false,
    activeDepartmentsForDropdown: [],
    dropdownErrorMessage: ''
};

export const DepartmentSetupReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_DEPARTMENTS:
            return {
                ...state,
                departments: [...action.payload.data]
            };
        case DATA_FETCH_ERROR:
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            };
        case CREATE_DEPARTMENT_PENDING:
            return {
                ...state,
                isCreateDepartmentLoading: true,
            };
        case CREATE_DEPARTMENT_SUCCESS:
            return {
                ...state,
                isCreateDepartmentLoading: false,
                successMessage: action.payload.successMessage
            };
        case CLEAR_DEPARTMENT_CREATE_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: ''
            };
        case CREATE_DEPARTMENT_ERROR:
            return {
                ...state,
                isCreateDepartmentLoading: false,
                errorMessage: action.payload.errorMessage
            };
        case CLEAR_DEPARTMENT_CREATE_ERROR_MESSAGE:
            return {
                ...state,
                isCreateDepartmentLoading: false,
                errorMessage: ''
            };
        case FETCH_DEPARTMENTS_BY_HOSPITAL_ID_SUCCESS:
            return {
                ...state,
                departmentsByHospital: [...action.payload.data]
            };
        case FETCH_DEPARTMENTS_BY_HOSPITAL_ID_ERROR:
            return {
                ...state,
                departmentsByHospital: [],
                errorMessageForDropdown: action.payload.errorMessage
            };
        default:
            return state
    }
};

export const DepartmentListReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DEPARTMENT_LIST_PENDING:
            return {
                ...state,
                departmentList: [...state.departmentList],
                isSearchLoading: true,
                searchErrorMessage: ''
            };
        case DEPARTMENT_LIST_SUCCESS:
            return {
                ...state,
                departmentList: [...action.payload.data],
                isSearchLoading: false,
                searchErrorMessage: ''
            };
        case DEPARTMENT_LIST_ERROR:
            return {
                ...state,
                departmentList: [...state.departmentList],
                isSearchLoading: false,
                searchErrorMessage: action.payload.data
            };
        case CLEAR_DEPARTMENT_LIST_FETCH_ERROR_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const DepartmentDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DEPARTMENT_DELETE_PENDING:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: '',
                isDeleteLoading: true
            };
        case DEPARTMENT_DELETE_SUCCESS:
            return {
                ...state,
                deleteSuccessMessage: action.payload.data,
                deleteErrorMessage: '',
                isDeleteLoading: false
            };
        case DEPARTMENT_DELETE_ERROR:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: action.payload.data,
                isDeleteLoading: false
            };
        case CLEAR_DEPARTMENT_DELETE_ERROR_MESSAGE:
            return {
                ...state,
                deleteErrorMessage: ''
            };
        case CLEAR_DEPARTMENT_DELETE_SUCCESS_MESSAGE:
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

export const DepartmentEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DEPARTMENT_EDIT_PENDING:
            return {
                ...state,
                isDepartmentEditLoading: true,
                departmentErrorMessage: '',
                departmentSuccessMessage: ''
            };
        case DEPARTMENT_EDIT_SUCCESS:
            return {
                ...state,
                isDepartmentEditLoading: false,
                departmentErrorMessage: '',
                departmentSuccessMessage: "Department Edited successfully."
            };
        case DEPARTMENT_EDIT_ERROR:
            return {
                ...state,
                isDepartmentEditLoading: false,
                departmentErrorMessage: action.payload.data,
                departmentSuccessMessage: ''
            };
        case CLEAR_DEPARTMENT_EDIT_SUCCESS_MESSAGE:
            return {
                ...state,
                departmentSuccessMessage: ''
            };
        case CLEAR_DEPARTMENT_EDIT_ERROR_MESSAGE:
            return {
                ...state,
                departmentErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const DepartmentPreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DEPARTMENT_PREVIEW_PENDING :
            return {
                ...state,
                departmentPreviewOpen: false,
                departmentPreviewData: {}
            };
        case DEPARTMENT_PREVIEW_SUCCESS:
            return {
                ...state,
                departmentPreviewErrorMessage: '',
                departmentPreviewOpen: true,
                departmentPreviewData: {...action.payload.data}
            };
        case DEPARTMENT_PREVIEW_ERROR:
            return {
                ...state,
                departmentPreviewErrorMessage: action.payload.errorMessage,
                departmentPreviewOpen: false,
                departmentPreviewData: {}
            };
        case CLEAR_DEPARTMENT_PREVIEW_ERROR_MESSAGE:
            return {
                ...state,
                departmentPreviewErrorMessage: ''
            };
        default:
            return {...state}
    }
};

// todo to be used after refactoring department setup
export const DepartmentDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_DEPARTMENTS_FOR_DROPDOWN_PENDING:
            return {
                ...state,
                isFetchActiveDepartmentsForDropdownPending: true,
                activeDepartmentsForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_DEPARTMENTS_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                isFetchActiveDepartmentsForDropdownPending: false,
                activeDepartmentsForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_DEPARTMENTS_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                isFetchActiveDepartmentsForDropdownPending: false,
                activeDepartmentsForDropdown: [],
                dropdownErrorMessage: action.payload.errorMessage
            };
        default:
            return state
    }
};
