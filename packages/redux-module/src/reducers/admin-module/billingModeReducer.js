import {billingModeActionConstants} from '@frontend-appointment/action-module';

const {
    SAVE_BILLING_MODE_PENDING,
    SAVE_BILLING_MODE_SUCCESS,
    SAVE_BILLING_MODE_ERROR,
    CLEAR_SAVE_BILLING_MODE_MESSAGE,
    EDIT_BILLING_MODE_PENDING,
    EDIT_BILLING_MODE_SUCCESS,
    EDIT_BILLING_MODE_ERROR,
    CLEAR_EDIT_BILLING_MODE_MESSAGE,
    DELETE_BILLING_MODE_PENDING,
    DELETE_BILLING_MODE_SUCCESS,
    DELETE_BILLING_MODE_ERROR,
    CLEAR_DELETE_BILLING_MODE_MESSAGE,
    SEARCH_BILLING_MODE_PENDING,
    SEARCH_BILLING_MODE_SUCCESS,
    SEARCH_BILLING_MODE_ERROR,
    CLEAR_SEARCH_BILLING_MODE_MESSAGE,
    PREVIEW_BILLING_MODE_SUCCESS,
    PREVIEW_BILLING_MODE_PENDING,
    PREVIEW_BILLING_MODE_ERROR,
    CLEAR_PREVIEW_BILLING_MODE_MESSAGE,
    FETCH_ACTIVE_BILLING_MODE_SUCCESS,
    FETCH_ACTIVE_BILLING_MODE_PENDING,
    FETCH_ACTIVE_BILLING_MODE_ERROR,
    FETCH_ALL_BILLING_MODE_ERROR,
    FETCH_ALL_BILLING_MODE_PENDING,
    FETCH_ALL_BILLING_MODE_SUCCESS,
    FETCH_ALL_BILLING_MODE_BY_HOSPITAL_SUCCESS,
    FETCH_ALL_BILLING_MODE_BY_HOSPITAL_PENDING,
    FETCH_ALL_BILLING_MODE_BY_HOSPITAL_ERROR,
    FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_SUCCESS,
    FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_PENDING,
    FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_ERROR
} = billingModeActionConstants;

const initialState = {
    isSaveBillingModeLoading: false,
    saveSuccessMessage: '',
    saveErrorMessage: '',
    isEditBillingModeLoading: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isDeleteBillingModeLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isSearchBillingModeLoading: false,
    billingModeList: [],
    searchErrorMessage: '',
    isPreviewBillingModeLoading: false,
    billingModeDetail: '',
    previewErrorMessage: '',
    isFetchActiveBillingModeLoading: false,
    activeBillingModeForDropdown: [],
    dropdownErrorMessage: '',
    isFetchAllBillingModeLoading: false,
    allBillingModeForDropdown: [],
    allRoomDropdownErrorMessage: '',
    totalRecords: '',
    isFetchActiveBillingModeByHospitalLoading: false,
    activeBillingModeForDropdownByHospital: [],
    activeRoomsByHospitalDropdownErrorMessage: '',
    isFetchAllBillingModeByHospitalLoading: false,
    allBillingModeForDropdownByHospital: [],
    allRoomDropdownByHospitalErrorMessage: '',
};

export const BillingModeSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_BILLING_MODE_PENDING:
            return {
                ...state,
                isSaveBillingModeLoading: true,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        case SAVE_BILLING_MODE_SUCCESS:
            return {
                ...state,
                isSaveBillingModeLoading: false,
                saveSuccessMessage: action.payload.message,
                saveErrorMessage: ''
            };
        case SAVE_BILLING_MODE_ERROR:
            return {
                ...state,
                isSaveBillingModeLoading: false,
                saveErrorMessage: action.payload.message,
                saveSuccessMessage: '',
            };
        case CLEAR_SAVE_BILLING_MODE_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const BillingModeEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_BILLING_MODE_PENDING:
            return {
                ...state,
                isEditBillingModeLoading: true,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        case EDIT_BILLING_MODE_SUCCESS:
            return {
                ...state,
                isEditBillingModeLoading: false,
                editSuccessMessage: action.payload.message,
                editErrorMessage: ''
            };
        case EDIT_BILLING_MODE_ERROR:
            return {
                ...state,
                isEditBillingModeLoading: false,
                editErrorMessage: action.payload.message,
                editSuccessMessage: '',
            };
        case CLEAR_EDIT_BILLING_MODE_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return state
    }
};

export const BillingModeDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_BILLING_MODE_PENDING :
            return {
                ...state,
                isDeleteBillingModeLoading: true,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        case DELETE_BILLING_MODE_SUCCESS:
            return {
                ...state,
                isDeleteBillingModeLoading: false,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: ''
            };
        case DELETE_BILLING_MODE_ERROR:
            return {
                ...state,
                isDeleteBillingModeLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            };
        case CLEAR_DELETE_BILLING_MODE_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        default:
            return state
    }
};

export const BillingModeSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_BILLING_MODE_PENDING :
            return {
                ...state,
                isSearchBillingModeLoading: true,
                billingModeList: [],
                searchErrorMessage: '',
                totalRecords: ''
            };
        case SEARCH_BILLING_MODE_SUCCESS:
            return {
                ...state,
                isSearchBillingModeLoading: false,
                billingModeList: [...action.payload.data.response],
                totalRecords: action.payload.data.totalItems,
                searchErrorMessage: ''
            };
        case SEARCH_BILLING_MODE_ERROR:
            return {
                ...state,
                isSearchBillingModeLoading: false,
                billingModeList: [],
                totalRecords: '',
                searchErrorMessage: action.payload.message
            };
        case CLEAR_SEARCH_BILLING_MODE_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return state
    }
};

export const BillingModePreviewReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case PREVIEW_BILLING_MODE_PENDING :
            return {
                ...state,
                isPreviewBillingModeLoading: true,
                billingModeDetail: '',
                previewErrorMessage: '',
            };
        case PREVIEW_BILLING_MODE_SUCCESS:
            return {
                ...state,
                isPreviewBillingModeLoading: false,
                billingModeDetail: {...action.payload.data.response},
                previewErrorMessage: ''
            };
        case PREVIEW_BILLING_MODE_ERROR:
            return {
                ...state,
                isPreviewBillingModeLoading: false,
                billingModeDetail: '',
                previewErrorMessage: action.payload.message
            };
        case CLEAR_PREVIEW_BILLING_MODE_MESSAGE:
            return {
                ...state,
                previewErrorMessage: ''
            };
        default:
            return state
    }
};

export const BillingModeDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_BILLING_MODE_PENDING :
            return {
                ...state,
                isFetchActiveBillingModeLoading: true,
                activeBillingModeForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_BILLING_MODE_SUCCESS:
            return {
                ...state,
                isFetchActiveBillingModeLoading: false,
                activeBillingModeForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_BILLING_MODE_ERROR:
            return {
                ...state,
                isFetchActiveBillingModeLoading: false,
                activeBillingModeForDropdown: [],
                dropdownErrorMessage: action.payload.message
            };
        case FETCH_ALL_BILLING_MODE_PENDING :
            return {
                ...state,
                isFetchAllBillingModeLoading: true,
                allBillingModeForDropdown: [],
                allRoomDropdownErrorMessage: ''
            };
        case FETCH_ALL_BILLING_MODE_SUCCESS:
            return {
                ...state,
                isFetchAllBillingModeLoading: false,
                allBillingModeForDropdown: [...action.payload.data],
                allRoomDropdownErrorMessage: ''
            };
        case FETCH_ALL_BILLING_MODE_ERROR:
            return {
                ...state,
                isFetchAllBillingModeLoading: false,
                allBillingModeForDropdown: [],
                allRoomDropdownErrorMessage: action.payload.message
            };
        case FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_PENDING :
            return {
                ...state,
                isFetchActiveBillingModeByHospitalLoading: true,
                activeBillingModeForDropdownByHospital: [],
                activeRoomsByHospitalDropdownErrorMessage: '',
            };
        case FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_SUCCESS:
            return {
                ...state,
                isFetchActiveBillingModeByHospitalLoading: false,
                activeBillingModeForDropdownByHospital: [...action.payload.data],
                activeRoomsByHospitalDropdownErrorMessage: '',
            };
        case FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_ERROR:
            return {
                ...state,
                isFetchActiveBillingModeByHospitalLoading: false,
                activeBillingModeForDropdownByHospital: [],
                activeRoomsByHospitalDropdownErrorMessage: action.payload.message,
            };
        case FETCH_ALL_BILLING_MODE_BY_HOSPITAL_PENDING :
            return {
                ...state,
                isFetchAllBillingModeByHospitalLoading: true,
                allBillingModeForDropdownByHospital: [],
                allRoomDropdownByHospitalErrorMessage: '',
            };
        case FETCH_ALL_BILLING_MODE_BY_HOSPITAL_SUCCESS:
            return {
                ...state,
                isFetchAllBillingModeByHospitalLoading: false,
                allBillingModeForDropdownByHospital: [...action.payload.data],
                allRoomDropdownByHospitalErrorMessage: '',
            };
        case FETCH_ALL_BILLING_MODE_BY_HOSPITAL_ERROR:
            return {
                ...state,
                isFetchAllBillingModeByHospitalLoading: false,
                allBillingModeForDropdownByHospital: [],
                allRoomDropdownByHospitalErrorMessage: action.payload.errorMessage,
            };
        default:
            return state
    }
};


