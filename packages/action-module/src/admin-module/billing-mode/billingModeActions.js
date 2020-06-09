import {billingModeActionConstants} from './billingModeActionConstants';

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
    FETCH_ALL_BILLING_MODE_PENDING,
    FETCH_ALL_BILLING_MODE_SUCCESS,
    FETCH_ALL_BILLING_MODE_ERROR,
    FETCH_ACTIVE_BILLING_MODE_ERROR,
    FETCH_ACTIVE_BILLING_MODE_PENDING,
    FETCH_ACTIVE_BILLING_MODE_SUCCESS,
    FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_ERROR,
    FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_PENDING,
    FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_SUCCESS,
    FETCH_ALL_BILLING_MODE_BY_HOSPITAL_ERROR,
    FETCH_ALL_BILLING_MODE_BY_HOSPITAL_PENDING,
    FETCH_ALL_BILLING_MODE_BY_HOSPITAL_SUCCESS,
    PREVIEW_BILLING_MODE_ERROR,
    PREVIEW_BILLING_MODE_PENDING,
    PREVIEW_BILLING_MODE_SUCCESS,
    CLEAR_PREVIEW_BILLING_MODE_MESSAGE
} = billingModeActionConstants;

export const saveBillingModePending = () => {
    return {
        type: SAVE_BILLING_MODE_PENDING,
    }
};

export const saveBillingModeSuccess = (successMessage) => {
    return {
        type: SAVE_BILLING_MODE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const saveBillingModeError = (errorMessage) => {
    return {
        type: SAVE_BILLING_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSaveBillingModeMessage = () => {
    return {
        type: CLEAR_SAVE_BILLING_MODE_MESSAGE,
    }
};

export const editBillingModePending = () => {
    return {
        type: EDIT_BILLING_MODE_PENDING,
    }
};

export const editBillingModeSuccess = (successMessage) => {
    return {
        type: EDIT_BILLING_MODE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const editBillingModeError = (errorMessage) => {
    return {
        type: EDIT_BILLING_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearEditBillingModeMessage = () => {
    return {
        type: CLEAR_EDIT_BILLING_MODE_MESSAGE,
    }
};

export const deleteBillingModePending = () => {
    return {
        type: DELETE_BILLING_MODE_PENDING,
    }
};

export const deleteBillingModeSuccess = (successMessage) => {
    return {
        type: DELETE_BILLING_MODE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const deleteBillingModeError = (errorMessage) => {
    return {
        type: DELETE_BILLING_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearDeleteBillingModeMessage = () => {
    return {
        type: CLEAR_DELETE_BILLING_MODE_MESSAGE,
    }
};

export const searchBillingModePending = () => {
    return {
        type: SEARCH_BILLING_MODE_PENDING,
    }
};

export const searchBillingModeSuccess = (data) => {
    return {
        type: SEARCH_BILLING_MODE_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchBillingModeError = (errorMessage) => {
    return {
        type: SEARCH_BILLING_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSearchBillingModeMessage = () => {
    return {
        type: CLEAR_SEARCH_BILLING_MODE_MESSAGE,
    }
};

export const previewBillingModePending = () => {
    return {
        type: PREVIEW_BILLING_MODE_PENDING,
    }
};

export const previewBillingModeSuccess = (data) => {
    return {
        type: PREVIEW_BILLING_MODE_SUCCESS,
        payload: {
            data
        }
    }
};

export const previewBillingModeError = (errorMessage) => {
    return {
        type: PREVIEW_BILLING_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearPreviewBillingModeMessage = () => {
    return {
        type: CLEAR_PREVIEW_BILLING_MODE_MESSAGE,
    }
};

export const fetchAllBillingModePending = () => {
    return {
        type: FETCH_ALL_BILLING_MODE_PENDING
    }
};

export const fetchAllBillingModeSuccess = (data) => {
    return {
        type: FETCH_ALL_BILLING_MODE_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchAllBillingModeError = (errorMessage) => {
    return {
        type: FETCH_ALL_BILLING_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const fetchActiveBillingModePending = () => {
    return {
        type: FETCH_ACTIVE_BILLING_MODE_PENDING
    }
};

export const fetchActiveBillingModeSuccess = (data) => {
    return {
        type: FETCH_ACTIVE_BILLING_MODE_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveBillingModeError = (errorMessage) => {
    return {
        type: FETCH_ACTIVE_BILLING_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const fetchActiveBillingModeByHospitalPending = () => {
    return {
        type: FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_PENDING
    }
};

export const fetchActiveBillingModeByHospitalSuccess = (data) => {
    return {
        type: FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveBillingModeByHospitalError = (errorMessage) => {
    return {
        type: FETCH_ACTIVE_BILLING_MODE_BY_HOSPITAL_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const fetchAllBillingModeByHospitalPending = () => {
    return {
        type: FETCH_ALL_BILLING_MODE_BY_HOSPITAL_PENDING
    }
};

export const fetchAllBillingModeByHospitalSuccess = (data) => {
    return {
        type: FETCH_ALL_BILLING_MODE_BY_HOSPITAL_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchAllBillingModeByHospitalError = (errorMessage) => {
    return {
        type: FETCH_ALL_BILLING_MODE_BY_HOSPITAL_ERROR,
        payload: {
            message: errorMessage
        }
    }
};
