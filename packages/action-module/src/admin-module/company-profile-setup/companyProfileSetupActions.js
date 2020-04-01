import {companyProfileSetupActionConstants} from "./companyProfileSetupActionConstants";

const {
    CLEAR_COMPANY_PROFILE_CREATE_SUCCESS_ERROR_MESSAGES,
    CLEAR_COMPANY_PROFILE_DELETE_SUCCESS_ERROR_MESSAGES,
    CLEAR_COMPANY_PROFILE_EDIT_SUCCESS_ERROR_MESSAGES,
    CLEAR_COMPANY_PROFILE_PREVIEW_SUCCESS_ERROR_MESSAGES,
    CLEAR_COMPANY_PROFILE_SEARCH_SUCCESS_ERROR_MESSAGES,
    CREATE_COMPANY_PROFILE_ERROR,
    CREATE_COMPANY_PROFILE_PENDING,
    CREATE_COMPANY_PROFILE_SUCCESS,
    DELETE_COMPANY_PROFILE_ERROR,
    DELETE_COMPANY_PROFILE_PENDING,
    DELETE_COMPANY_PROFILE_SUCCESS,
    EDIT_COMPANY_PROFILE_ERROR,
    EDIT_COMPANY_PROFILE_PENDING,
    EDIT_COMPANY_PROFILE_SUCCESS,
    FETCH_COMPANY_PROFILE_FOR_DROPDOWN_ERROR,
    FETCH_COMPANY_PROFILE_FOR_DROPDOWN_PENDING,
    FETCH_COMPANY_PROFILE_FOR_DROPDOWN_SUCCESS,
    FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_ERROR,
    FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_PENDING,
    FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_SUCCESS,
    PREVIEW_COMPANY_PROFILE_ERROR,
    PREVIEW_COMPANY_PROFILE_PENDING,
    PREVIEW_COMPANY_PROFILE_SUCCESS,
    SEARCH_COMPANY_PROFILE_ERROR,
    SEARCH_COMPANY_PROFILE_PENDING,
    SEARCH_COMPANY_PROFILE_SUCCESS
} = companyProfileSetupActionConstants;


export const createProfilePending = () => {
    return {
        type: CREATE_COMPANY_PROFILE_PENDING
    }
};

export const createProfileSuccess = successMessage => {
    return {
        type: CREATE_COMPANY_PROFILE_SUCCESS,
        payload: {
            successMessage
        }
    }
};

export const createProfileError = errorMessage => {
    return {
        type: CREATE_COMPANY_PROFILE_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const searchProfileSuccess = data => {
    return {
        type: SEARCH_COMPANY_PROFILE_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchProfileError = errorMessage => {
    return {
        type: SEARCH_COMPANY_PROFILE_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const searchProfilePending = () => {
    return {
        type: SEARCH_COMPANY_PROFILE_PENDING,
    }
};

export const clearProfileCreateMessages = () => {
    return {
        type: CLEAR_COMPANY_PROFILE_CREATE_SUCCESS_ERROR_MESSAGES
    }
};

export const clearProfileEditMessages = () => {
    return {
        type: CLEAR_COMPANY_PROFILE_EDIT_SUCCESS_ERROR_MESSAGES
    }
};

export const clearProfileSearchMessages = () => {
    return {
        type: CLEAR_COMPANY_PROFILE_SEARCH_SUCCESS_ERROR_MESSAGES
    }
};

export const clearProfileDeleteMessages = () => {
    return {
        type: CLEAR_COMPANY_PROFILE_DELETE_SUCCESS_ERROR_MESSAGES
    }
};

export const clearProfilePreviewMessages = () => {
    return {
        type: CLEAR_COMPANY_PROFILE_PREVIEW_SUCCESS_ERROR_MESSAGES
    }
};

export const deleteProfilePending = () => {
    return {
        type: DELETE_COMPANY_PROFILE_PENDING,
    }
};

export const deleteProfileSuccess = successMessage => {
    return {
        type: DELETE_COMPANY_PROFILE_SUCCESS,
        payload: {
            successMessage
        }
    }
};

export const deleteProfileError = errorMessage => {
    return {
        type: DELETE_COMPANY_PROFILE_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const editProfileError = errorMessage => {
    return {
        type: EDIT_COMPANY_PROFILE_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const editProfileSuccess = successMessage => {
    return {
        type: EDIT_COMPANY_PROFILE_SUCCESS,
        payload: {
            successMessage
        }
    }
};

export const editProfilePending = () => {
    return {
        type: EDIT_COMPANY_PROFILE_PENDING,
    }
};


export const previewProfilePending = () => {
    return {
        type: PREVIEW_COMPANY_PROFILE_PENDING,
    }
};

export const previewProfileSuccess = data => {
    return {
        type: PREVIEW_COMPANY_PROFILE_SUCCESS,
        payload: {
            data
        }
    }
};

export const previewProfileError = errorMessage => {
    return {
        type: PREVIEW_COMPANY_PROFILE_ERROR,
        payload: {
            errorMessage
        }
    }
};


export const fetchCompanyProfileForDropdownPending = () => {
    return {
        type: FETCH_COMPANY_PROFILE_FOR_DROPDOWN_PENDING
    }
};

export const fetchCompanyProfileForDropdownSuccess = data => {
    return {
        type: FETCH_COMPANY_PROFILE_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchCompanyProfileForDropdownError = errorMessage => {
    return {
        type: FETCH_COMPANY_PROFILE_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};
export const fetchCompanyProfileByCompanyIdForDropdownPending = () => {
    return {
        type: FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_PENDING
    }
};

export const fetchCompanyProfileByCompanyIdForDropdownSuccess = data => {
    return {
        type: FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchCompanyProfileByComapanyIdForDropdownError = errorMessage => {
    return {
        type: FETCH_COMPANY_PROFILE_BY_COMPANY_ID_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};


