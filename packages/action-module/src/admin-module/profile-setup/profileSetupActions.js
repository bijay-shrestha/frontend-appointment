import {profileSetupConstants} from './profileSetupActionConstants'

const {
    DATA_FETCH_START,
    DATA_FETCH_ERROR,
    SAVE_DEPARTMENTS,
    CREATE_PROFILE_START,
    CREATE_PROFILE_SUCCESS,
    CREATE_PROFILE_ERROR,
    PROFILE_LIST_ERROR,
    PROFILE_LIST_LOADING,
    PROFILE_LIST_SUCCESS,
    PROFILE_DELETE_ERROR,
    PROFILE_EDIT_ERROR,
    PROFILE_DELETE_SUCCESS,
    PROFILE_EDIT_SUCCESS,
    PROFILE_DELETE_LOADING,
    PROFILE_EDIT_LOADING,
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
    CLEAR_PROFILE_DELETE_SUCCESS_MESSAGE,
    FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID_PENDING,
    FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID_SUCCESS,
    FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID_ERROR,
    FETCH_PROFILE_LIST_FOR_DROPDOWN_PENDING,
    FETCH_PROFILE_LIST_FOR_DROPDOWN_SUCCESS,
    FETCH_PROFILE_LIST_FOR_DROPDOWN_ERROR,
    CLEAR_ERROR_MESSAGE_FOR_DROPDOWN,
    FETCH_PROFILE_LIST_FOR_SEARCH_DROPDOWN_SUCCESS,
    FETCH_PROFILE_LIST_FOR_SEARCH_DROPDOWN_ERROR
} = profileSetupConstants;

export const departmentFetchingStart = () => {
    return {
        type: DATA_FETCH_START
    }
};

export const departmentFetchingError = message => {
    return {
        type: DATA_FETCH_ERROR,
        payload: {
            errorMessage: message
        }
    }
};


export const saveDepartments = data => {
    return {
        type: SAVE_DEPARTMENTS,
        payload: {
            data
        }
    }
};

export const subDepartmentFetchingStart = () => {
    return {
        type: DATA_FETCH_START
    }
};

export const subDepartmentFetchingError = message => {
    return {
        type: DATA_FETCH_ERROR,
        payload: {
            errorMessage: message
        }
    }
};

export const createProfileLoading = () => {
    return {
        type: CREATE_PROFILE_START
    }
};

export const creatingProfileSuccess = message => {
    return {
        type: CREATE_PROFILE_SUCCESS,
        payload: {
            successMessage: message
        }
    }
};

export const clearProfileCreateSuccessMessage = () => {
    return {
        type: CLEAR_PROFILE_CREATE_SUCCESS_MESSAGE
    }
};

export const clearProfileCreateErrorMessage = () => {
    return {
        type: CLEAR_PROFILE_CREATE_ERROR_MESSAGE
    }
};

export const creatingProfileError = message => {
    return {
        type: CREATE_PROFILE_ERROR,
        payload: {
            errorMessage: message
        }
    }
};

export const profileListSuccess = message => {
    return {
        type: PROFILE_LIST_SUCCESS,
        payload: {
            data: message
        }
    }
};

export const profileListError = message => {
    return {
        type: PROFILE_LIST_ERROR,
        payload: {
            data: message
        }
    }
};

export const profileListLoading = () => {
    return {
        type: PROFILE_LIST_LOADING,
        payload: {
            data: []
        }
    }
};

export const clearProfileListFetchErrorMessage = () => {
    return {
        type: CLEAR_PROFILE_LIST_FETCH_ERROR_MESSAGE
    }
};

export const profileDeleteLoading = () => {
    return {
        type: PROFILE_DELETE_LOADING,
        payload: {
            data: []
        }
    }
};

export const profileDeleteSuccess = success => {
    return {
        type: PROFILE_DELETE_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const profileDeleteError = errorMessage => {
    return {
        type: PROFILE_DELETE_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const profileEditError = errorMessage => {
    return {
        type: PROFILE_EDIT_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const profileEditSuccess = success => {
    return {
        type: PROFILE_EDIT_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const profileEditLoading = () => {
    return {
        type: PROFILE_EDIT_LOADING,
        payload: {
            data: ''
        }
    }
};

export const clearProfileEditSuccessMessage = () => {
    return {
        type: CLEAR_PROFILE_EDIT_SUCCESS_MESSAGE
    }
};

export const clearProfileEditErrorMessage = () => {
    return {
        type: CLEAR_PROFILE_EDIT_ERROR_MESSAGE
    }
};

export const profilePreviewLoading = () => {
    return {
        type: PROFILE_PREVIEW_LOADING,
        payload: {
            data: ''
        }
    }
};

export const profilePreviewSuccess = success => {
    return {
        type: PROFILE_PREVIEW_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const profilePreviewError = errorMsg => {
    return {
        type: PROFILE_PREVIEW_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const clearProfilePreviewErrorMessage = () => {
    return {
        type: CLEAR_PROFILE_PREVIEW_ERROR_MESSAGE
    }
};

export const clearProfileDeleteErrorMessage = () => {
    return {
        type: CLEAR_PROFILE_DELETE_ERROR_MESSAGE
    }
};
export const clearProfileDeleteSuccessMessage = () => {
    return {
        type: CLEAR_PROFILE_DELETE_SUCCESS_MESSAGE
    }
};

export const fetchProfileListBySubDepartmentIdPending = () => {
    return {
        type: FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID_PENDING
    }
};

export const fetchProfileListBySubDepartmentIdSuccess = data => {
    return {
        type: FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID_SUCCESS,
        payload: {
            data
        }
    }
};


export const fetchProfileListBySubDepartmentIdError = errorMsg => {
    return {
        type: FETCH_PROFILE_LIST_BY_SUB_DEPARTMENT_ID_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const fetchProfileListForDropDownActivePending = () => {
    return {
        type: FETCH_PROFILE_LIST_FOR_DROPDOWN_PENDING
    }
};

export const fetchProfileListForDropDownActiveSuccess = data => {
    return {
        type: FETCH_PROFILE_LIST_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchProfileListForDropDownActiveError = errorMsg => {
    return {
        type: FETCH_PROFILE_LIST_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const clearDropdownErrorMessage = () => {
    return {
        type: CLEAR_ERROR_MESSAGE_FOR_DROPDOWN
    }
};

export const fetchProfileListForSearchDropDownSuccess = data => {
    return {
        type: FETCH_PROFILE_LIST_FOR_SEARCH_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchProfileListForSearchDropDownError = errorMsg => {
    return {
        type: FETCH_PROFILE_LIST_FOR_SEARCH_DROPDOWN_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};
