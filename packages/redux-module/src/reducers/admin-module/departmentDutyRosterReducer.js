import {departmentDutyRosterActionConstants} from '@frontend-appointment/action-module';

const {
    CREATE_DEPARTMENT_DUTY_ROSTER_PENDING,
    CREATE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    CREATE_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_CREATE_MESSAGE,
    UPDATE_DEPARTMENT_DUTY_ROSTER_PENDING,
    UPDATE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    UPDATE_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_UPDATE_MESSAGE,
    DELETE_DEPARTMENT_DUTY_ROSTER_PENDING,
    DELETE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    DELETE_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_DELETE_MESSAGE,
    SEARCH_DEPARTMENT_DUTY_ROSTER_PENDING,
    SEARCH_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    SEARCH_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_SEARCH_MESSAGE,
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_PENDING,
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_SUCCESS,
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_DETAIL_MESSAGE,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_ERROR,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_PENDING,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    CLEAR_EXISTING_DEPARTMENT_DUTY_ROSTER_MESSAGE,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_ERROR,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_PENDING,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_SUCCESS,
    CLEAR_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_MESSAGE,
    UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
    UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING,
    UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
    CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_UPDATE_MESSAGE,
    DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
    DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING,
    DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
    CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_DELETE_MESSAGE,
    REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
    REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING,
    REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
    CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_REVERT_MESSAGE
} = departmentDutyRosterActionConstants;

const initialState = {
    isSaveRosterLoading: false,
    saveErrorMessage: '',
    saveSuccessMessage: '',
    isSearchRosterLoading: false,
    departmentDutyRosterList: [],
    searchErrorMessage: '',
    isDeleteRosterLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isEditRosterPending: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isPreviewRosterLoading: false,
    departmentDutyRosterPreviewData: {},
    previewErrorMessage: '',
    isFetchExistingRosterLoading: false,
    existingDepartmentDutyRosterList: [],
    existingRostersFetchErrorMessage: '',
    isFetchExistingRosterDetailLoading: false,
    existingDepartmentDutyRosterDetails: {},
    existingRostersDetailErrorMessage: '',
    isUpdateOverrideLoading: false,
    overrideUpdateErrorMessage: '',
    overrideUpdateSuccessMessage: '',
    isDeleteOverrideLoading: false,
    overrideDeleteErrorMessage: '',
    overrideDeleteSuccessMessage: '',
    isRevertOverrideLoading: false,
    overrideRevertErrorMessage: '',
    overrideRevertSuccessMessage: '',
};

export const DepartmentDutyRosterSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case CREATE_DEPARTMENT_DUTY_ROSTER_PENDING:
            return {
                ...state,
                isSaveRosterLoading: true,
            };
        case CREATE_DEPARTMENT_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                isSaveRosterLoading: false,
                saveSuccessMessage: action.payload.successMessage
            };
        case CREATE_DEPARTMENT_DUTY_ROSTER_ERROR:
            return {
                ...state,
                isSaveRosterLoading: false,
                saveErrorMessage: action.payload.errorMessage
            };
        case CLEAR_DEPARTMENT_DUTY_ROSTER_CREATE_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const DepartmentDutyRosterListReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_DEPARTMENT_DUTY_ROSTER_PENDING:
            return {
                ...state,
                departmentDutyRosterList: [],
                isSearchRosterLoading: true,
                searchErrorMessage: '',
            };
        case SEARCH_DEPARTMENT_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                departmentDutyRosterList: [...action.payload.data],
                isSearchRosterLoading: false,
                searchErrorMessage: ''
            };
        case SEARCH_DEPARTMENT_DUTY_ROSTER_ERROR:
            return {
                ...state,
                departmentDutyRosterList: [],
                isSearchRosterLoading: false,
                searchErrorMessage: action.payload.errorMessage
            };
        case CLEAR_DEPARTMENT_DUTY_ROSTER_SEARCH_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const DepartmentDutyRosterDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_DEPARTMENT_DUTY_ROSTER_PENDING:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: '',
                isDeleteRosterLoading: true
            };
        case DELETE_DEPARTMENT_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                deleteSuccessMessage: action.payload.data,
                deleteErrorMessage: '',
                isDeleteRosterLoading: false
            };
        case DELETE_DEPARTMENT_DUTY_ROSTER_ERROR:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: action.payload.errorMessage,
                isDeleteRosterLoading: false
            };
        case CLEAR_DEPARTMENT_DUTY_ROSTER_DELETE_MESSAGE:
            return {
                ...state,
                deleteErrorMessage: '',
                deleteSuccessMessage
            };
        default:
            return {
                ...state
            }
    }
};

export const DepartmentDutyRosterEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case UPDATE_DEPARTMENT_DUTY_ROSTER_PENDING:
            return {
                ...state,
                isEditRosterPending: true,
                editSuccessMessage: '',
                editErrorMessage: '',
            };
        case UPDATE_DEPARTMENT_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                isEditRosterPending: false,
                editSuccessMessage: action.payload.data,
                editErrorMessage: '',
            };
        case UPDATE_DEPARTMENT_DUTY_ROSTER_ERROR:
            return {
                ...state,
                isEditRosterPending: false,
                editSuccessMessage: '',
                editErrorMessage: action.payload.errorMessage,
            };
        case CLEAR_DEPARTMENT_DUTY_ROSTER_UPDATE_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const DepartmentDutyRosterPreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_PENDING:
            return {
                ...state,
                isPreviewRosterLoading: true,
                departmentDutyRosterPreviewData: {},
                previewErrorMessage: ''
            };
        case FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_SUCCESS:
            return {
                ...state,
                isPreviewRosterLoading: false,
                departmentDutyRosterPreviewData: {...action.payload.data},
                previewErrorMessage: ''
            };
        case FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_ERROR:
            return {
                ...state,
                isPreviewRosterLoading: false,
                departmentDutyRosterPreviewData: {},
                previewErrorMessage: action.payload.errorMessage
            };
        case CLEAR_DEPARTMENT_DUTY_ROSTER_DETAIL_MESSAGE:
            return {
                ...state,
                previewErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const DepartmentDutyRosterExistingReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_PENDING:
            return {
                ...state,
                isFetchExistingRosterLoading: true,
                existingDepartmentDutyRosterList: [],
                existingRostersFetchErrorMessage: '',
            };
        case FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_SUCCESS:
            return {
                ...state,
                isFetchExistingRosterLoading: false,
                existingDepartmentDutyRosterList: [...action.payload.data],
                existingRostersFetchErrorMessage: '',
            };
        case FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_ERROR:
            return {
                ...state,
                isFetchExistingRosterLoading: false,
                existingDepartmentDutyRosterList: [],
                existingRostersFetchErrorMessage: action.payload.errorMessage,
            };
        case CLEAR_EXISTING_DEPARTMENT_DUTY_ROSTER_MESSAGE:
            return {
                ...state,
                existingRostersFetchErrorMessage: ''
            };
        case FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_PENDING:
            return {
                ...state,
                isFetchExistingRosterDetailLoading: true,
                existingDepartmentDutyRosterDetails: {},
                existingRostersDetailErrorMessage: '',
            };
        case FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_SUCCESS:
            return {
                ...state,
                isFetchExistingRosterDetailLoading: false,
                existingDepartmentDutyRosterDetails: {...action.payload.data},
                existingRostersDetailErrorMessage: '',
            };
        case FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_ERROR:
            return {
                ...state,
                isFetchExistingRosterDetailLoading: false,
                existingDepartmentDutyRosterDetails: {},
                existingRostersDetailErrorMessage: action.payload.errorMessage,
            };
        case CLEAR_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_MESSAGE:
            return {
                ...state,
                existingRostersDetailErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const DepartmentDutyRosterOverrideUpdateReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING:
            return {
                ...state,
                isUpdateOverrideLoading: true,
                overrideUpdateErrorMessage: '',
                overrideUpdateSuccessMessage: '',
            };
        case UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS:
            return {
                ...state,
                isUpdateOverrideLoading: false,
                overrideUpdateErrorMessage: '',
                overrideUpdateSuccessMessage: action.payload.successMessage,
            };
        case UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR:
            return {
                ...state,
                isUpdateOverrideLoading: false,
                overrideUpdateErrorMessage: action.payload.errorMessage,
                overrideUpdateSuccessMessage: '',
            };
        case CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_UPDATE_MESSAGE:
            return {
                ...state,
                overrideUpdateErrorMessage: '',
                overrideUpdateSuccessMessage: '',
            };
        default:
            return {
                ...state
            }
    }
};

export const DepartmentDutyRosterOverrideDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING:
            return {
                ...state,
                isDeleteOverrideLoading: true,
                overrideDeleteErrorMessage: '',
                overrideDeleteSuccessMessage: '',
            };
        case DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS:
            return {
                ...state,
                isDeleteOverrideLoading: false,
                overrideDeleteErrorMessage: '',
                overrideDeleteSuccessMessage: action.payload.successMessage,
            };
        case DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR:
            return {
                ...state,
                isDeleteOverrideLoading: false,
                overrideUpdateErrorMessage: action.payload.errorMessage,
                overrideDeleteSuccessMessage: '',
            };
        case CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_DELETE_MESSAGE:
            return {
                ...state,
                overrideDeleteErrorMessage: '',
                overrideDeleteSuccessMessage: '',
            };
        default:
            return {
                ...state
            }
    }
};

export const DepartmentDutyRosterOverrideRevertReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING:
            return {
                ...state,
                isRevertOverrideLoading: true,
                overrideRevertErrorMessage: '',
                overrideRevertSuccessMessage: '',
            };
        case REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS:
            return {
                ...state,
                isRevertOverrideLoading: false,
                overrideRevertErrorMessage: '',
                overrideRevertSuccessMessage: action.payload.successMessage,
            };
        case REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR:
            return {
                ...state,
                isRevertOverrideLoading: false,
                overrideRevertErrorMessage: action.payload.errorMessage,
                overrideRevertSuccessMessage: '',
            };
        case CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_REVERT_MESSAGE:
            return {
                ...state,
                overrideRevertErrorMessage: '',
                overrideRevertSuccessMessage: '',
            };
        default:
            return {
                ...state
            }
    }
};

