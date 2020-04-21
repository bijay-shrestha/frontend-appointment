import {adminSetupActionConstants} from '@frontend-appointment/action-module'

const {
    CREATE_ADMIN_PENDING,
    CREATE_ADMIN_SUCCESS,
    CREATE_ADMIN_ERROR,
    ADMIN_LIST_ERROR,
    ADMIN_LIST_PENDING,
    ADMIN_LIST_SUCCESS,
    ADMIN_DELETE_ERROR,
    ADMIN_EDIT_ERROR,
    ADMIN_DELETE_SUCCESS,
    ADMIN_EDIT_SUCCESS,
    ADMIN_DELETE_PENDING,
    ADMIN_EDIT_PENDING,
    ADMIN_PREVIEW_ERROR,
    ADMIN_PREVIEW_PENDING,
    ADMIN_PREVIEW_SUCCESS,
    CLEAR_ADMIN_CREATE_SUCCESS_MESSAGE,
    CLEAR_ADMIN_CREATE_ERROR_MESSAGE,
    CLEAR_ADMIN_LIST_FETCH_ERROR_MESSAGE,
    CLEAR_ADMIN_EDIT_SUCCESS_MESSAGE,
    CLEAR_ADMIN_EDIT_ERROR_MESSAGE,
    CLEAR_ADMIN_PREVIEW_ERROR_MESSAGE,
    CLEAR_ADMIN_DELETE_ERROR_MESSAGE,
    CLEAR_ADMIN_DELETE_SUCCESS_MESSAGE,
    FETCH_ADMIN_META_INFO_PENDING,
    FETCH_ADMIN_META_INFO_SUCCESS,
    FETCH_ADMIN_META_INFO_ERROR,
    FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_ERROR,
    FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_PENDING,
    FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_SUCCESS
} = adminSetupActionConstants;

const initialState = {
    isCreateAdminLoading: false,
    errorMessage: '',//profileCreate error message
    successMessage: '',
    isSearchLoading: true,
    adminList: [],
    searchErrorMessage: '',
    deleteErrorMessage: '',
    deleteSuccessMessage: '',
    isDeleteLoading: true,
    isAdminEditLoading: false,
    adminErrorMessage: '',//profile edit error message
    adminSuccessMessage: '',
    adminPreviewData: {},
    adminPreviewErrorMessage: '',
    adminPreviewOpen: false,
    adminMetaInfoForDropdown: [],
    errorMessageForDropdown: '',
    adminMetaInfoByHospitalIdForDropdown:[],
    errorMessageByHospitalIdForDropdown:''
};

export const AdminSetupReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case CREATE_ADMIN_PENDING:
            return {
                ...state,
                isCreateAdminLoading: true,
            };
        case CREATE_ADMIN_SUCCESS:
            return {
                ...state,
                isCreateAdminLoading: false,
                successMessage: action.payload.successMessage
            };
        case CLEAR_ADMIN_CREATE_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: ''
            };
        case CREATE_ADMIN_ERROR:
            return {
                ...state,
                isCreateAdminLoading: false,
                errorMessage: action.payload.errorMessage
            };
        case CLEAR_ADMIN_CREATE_ERROR_MESSAGE:
            return {
                ...state,
                isCreateAdminLoading: false,
                errorMessage: ''
            };
        case FETCH_ADMIN_META_INFO_PENDING:
            return {
                ...state
            };
        case FETCH_ADMIN_META_INFO_SUCCESS:
            return {
                ...state,
                adminMetaInfoForDropdown: [...action.payload.data]
            };
        case FETCH_ADMIN_META_INFO_ERROR:
            return {
                ...state,
                errorMessageForDropdown: action.payload.errorMessage
            };
        case FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_PENDING:
             return {...state}
        case FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_SUCCESS:
          return {
              ...state,
              adminMetaInfoByHospitalIdForDropdown:[...action.payload.dta]
          }     
        case FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_ERROR:
            return {
                ...state,
                errorMessageByHospitalIdForDropdown:action.payload.errorMessage
            }      
        default:
            return state
    }
};

export const AdminListReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case ADMIN_LIST_PENDING:
            return {
                ...state,
                adminList: [...state.adminList],
                isSearchLoading: true,
                searchErrorMessage: ''
            };
        case ADMIN_LIST_SUCCESS:
            return {
                ...state,
                adminList: [...action.payload.data],
                isSearchLoading: false,
                searchErrorMessage: ''
            };
        case ADMIN_LIST_ERROR:
            return {
                ...state,
                adminList: [...state.adminList],
                isSearchLoading: false,
                searchErrorMessage: action.payload.data
            };
        case CLEAR_ADMIN_LIST_FETCH_ERROR_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const AdminDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case ADMIN_DELETE_PENDING:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: '',
                isDeleteLoading: true
            };
        case ADMIN_DELETE_SUCCESS:
            return {
                ...state,
                deleteSuccessMessage: action.payload.data,
                deleteErrorMessage: '',
                isDeleteLoading: false
            };
        case ADMIN_DELETE_ERROR:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: action.payload.data,
                isDeleteLoading: false
            };
        case CLEAR_ADMIN_DELETE_ERROR_MESSAGE:
            return {
                ...state,
                deleteErrorMessage: ''
            };
        case CLEAR_ADMIN_DELETE_SUCCESS_MESSAGE:
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

export const AdminEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case ADMIN_EDIT_PENDING:
            return {
                ...state,
                isAdminEditLoading: true,
                adminErrorMessage: '',
                adminSuccessMessage: ''
            };
        case ADMIN_EDIT_SUCCESS:
            return {
                ...state,
                isAdminEditLoading: false,
                adminErrorMessage: '',
                adminSuccessMessage: "Admin Edited successfully."
            };
        case ADMIN_EDIT_ERROR:
            return {
                ...state,
                isAdminEditLoading: false,
                adminErrorMessage: action.payload.data,
                adminSuccessMessage: ''
            };
        case CLEAR_ADMIN_EDIT_SUCCESS_MESSAGE:
            return {
                ...state,
                adminSuccessMessage: ''
            };
        case CLEAR_ADMIN_EDIT_ERROR_MESSAGE:
            return {
                ...state,
                adminErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const AdminPreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case ADMIN_PREVIEW_PENDING:
            return {
                ...state,
                adminPreviewOpen: false,
                adminPreviewData: {}
            };
        case ADMIN_PREVIEW_SUCCESS:
            return {
                ...state,
                adminPreviewErrorMessage: '',
                adminPreviewOpen: true,
                adminPreviewData: {...action.payload.data}
            };
        case ADMIN_PREVIEW_ERROR:
            return {
                ...state,
                adminPreviewErrorMessage: action.payload.errorMessage,
                adminPreviewOpen: false,
                adminPreviewData: {}
            };
        case CLEAR_ADMIN_PREVIEW_ERROR_MESSAGE:
            return {
                ...state,
                adminPreviewErrorMessage: ''
            };
        default:
            return {...state}
    }
};
