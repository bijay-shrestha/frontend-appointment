import {profileSetupConstants} from '@frontend-appointment/action-module'

const {
    SAVE_DEPARTMENTS,
    DATA_FETCH_ERROR,
    CREATE_PROFILE_START,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_ERROR,
    PROFILE_LIST_ERROR,
    PROFILE_LIST_SUCCESS,
    PROFILE_LIST_LOADING,
    PROFILE_DELETE_ERROR,
    PROFILE_DELETE_SUCCESS,
    PROFILE_DELETE_LOADING,
    PROFILE_EDIT_ERROR,
    PROFILE_EDIT_LOADING,
    PROFILE_EDIT_SUCCESS,
    PROFILE_PREVIEW_ERROR,
    PROFILE_PREVIEW_LOADING,
    PROFILE_PREVIEW_SUCCESS,
    CLEAR_PROFILE_CREATE_SUCCESS_MESSAGE,
    CLEAR_PROFILE_CREATE_ERROR_MESSAGE,
    CLEAR_PROFILE_LIST_FETCH_ERROR_MESSAGE,
    CLEAR_PROFILE_EDIT_SUCCESS_MESSAGE,
    CLEAR_PROFILE_EDIT_ERROR_MESSAGE,
    CLEAR_PROFILE_PREVIEW_ERROR_MESSAGE,
    CLEAR_PROFILE_DELETE_ERROR_MESSAGE,
    CLEAR_PROFILE_DELETE_SUCCESS_MESSAGE
} = profileSetupConstants;

const initialState = {
    departments: [],
    subDepartments: [],
    isCreateProfileLoading: true,
    errorMessage: '',//profileCreate error message
    successMessage: '',
    isSearchLoading: true,
    profileList: [],
    searchErrorMessage: '',
    deleteErrorMessage: '',
    deleteSuccessMessage: '',
    isDeleteLoading: true,
    isProfileEditLoading: true,
    profileErrorMessage: '',//profile edit error message
    profileSuccessMessage: '',
    profilePreviewData: {},
    profilePreviewErrorMessage: '',
    profilePreviewOpen: false
};

export const ProfileSetupReducer = (state = {...initialState}, action) => {
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
        case CREATE_PROFILE_START:
            return {
                ...state,
                isCreateProfileLoading: true,
            };
        case CREATE_PROFILE_SUCCESS:
            return {
                ...state,
                isCreateProfileLoading: false,
                successMessage: action.payload.successMessage
            };
        case CLEAR_PROFILE_CREATE_SUCCESS_MESSAGE:
            return {
                ...state,
                successMessage: ''
            };
        case CREATE_PROFILE_ERROR:
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            };
        case CLEAR_PROFILE_CREATE_ERROR_MESSAGE:
            return {
                ...state,
                isCreateProfileLoading: false,
                errorMessage: ''
            };
        default:
            return state
    }
};

export const ProfileListReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PROFILE_LIST_LOADING:
            return {
                ...state,
                profileList: [...state.profileList],
                isSearchLoading: true,
                searchErrorMessage: ''
            };
        case PROFILE_LIST_SUCCESS:
            return {
                ...state,
                profileList: [...action.payload.data],
                isSearchLoading: false,
                searchErrorMessage: ''
            };
        case PROFILE_LIST_ERROR:
            return {
                ...state,
                profileList: [...state.profileList],
                isSearchLoading: false,
                searchErrorMessage: action.payload.data
            };
        case CLEAR_PROFILE_LIST_FETCH_ERROR_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const ProfileDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PROFILE_DELETE_LOADING:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: '',
                isDeleteLoading: true
            };
        case PROFILE_DELETE_SUCCESS:
            return {
                ...state,
                deleteSuccessMessage: action.payload.data,
                deleteErrorMessage: '',
                isDeleteLoading: false
            };
        case PROFILE_DELETE_ERROR:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: action.payload.data,
                isDeleteLoading: false
            };
        case CLEAR_PROFILE_DELETE_ERROR_MESSAGE:
            return {
                ...state,
                deleteErrorMessage: ''
            };
        case CLEAR_PROFILE_DELETE_SUCCESS_MESSAGE:
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

export const ProfileEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PROFILE_EDIT_LOADING:
            return {
                ...state,
                isProfileEditLoading: true,
                profileErrorMessage: '',
                profileSuccessMessage: ''
            };
        case PROFILE_EDIT_SUCCESS:
            return {
                ...state,
                isProfileEditLoading: false,
                profileErrorMessage: '',
                profileSuccessMessage: "Profile Edited successfully."
            };
        case PROFILE_EDIT_ERROR:
            return {
                ...state,
                isProfileEditLoading: false,
                profileErrorMessage: action.payload.data,
                profileSuccessMessage: ''
            };
        case CLEAR_PROFILE_EDIT_SUCCESS_MESSAGE:
            return {
                ...state,
                profileSuccessMessage: ''
            };
        case CLEAR_PROFILE_EDIT_ERROR_MESSAGE:
            return {
                ...state,
                profileErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const ProfilePreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PROFILE_PREVIEW_LOADING:
            return {
                ...state,
                profilePreviewOpen: false,
                profilePreviewData: {}
            };
        case PROFILE_PREVIEW_SUCCESS:
            return {
                ...state,
                profilePreviewErrorMessage: '',
                profilePreviewOpen: true,
                profilePreviewData: {...action.payload.data}
            };
        case PROFILE_PREVIEW_ERROR:
            return {
                ...state,
                profilePreviewErrorMessage: action.payload.errorMessage,
                profilePreviewOpen: false,
                profilePreviewData: {}
            };
        case CLEAR_PROFILE_PREVIEW_ERROR_MESSAGE:
            return {
                ...state,
                profilePreviewErrorMessage: ''
            };
        default:
            return {...state}
    }
};
