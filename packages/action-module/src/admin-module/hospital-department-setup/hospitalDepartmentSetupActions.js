import {hospitalDepartmentSetupActionConstants} from './hospitalDepartmentSetupActionConstants';

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
    CLEAR_PREVIEW_HOSPITAL_DEPARTMENT_MESSAGE,
    PREVIEW_HOSPITAL_DEPARTMENT_ERROR,
    PREVIEW_HOSPITAL_DEPARTMENT_PENDING,
    PREVIEW_HOSPITAL_DEPARTMENT_SUCCESS,
    FETCH_ALL_HOSPITAL_DEPARTMENT_PENDING,
    FETCH_ALL_HOSPITAL_DEPARTMENT_SUCCESS,
    FETCH_ALL_HOSPITAL_DEPARTMENT_ERROR,
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_ERROR,
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_PENDING,
    FETCH_ACTIVE_HOSPITAL_DEPARTMENT_SUCCESS
} = hospitalDepartmentSetupActionConstants;

export const saveHospitalDepartmentPending = () => {
    return {
        type: SAVE_HOSPITAL_DEPARTMENT_PENDING,
    }
};

export const saveHospitalDepartmentSuccess = (successMessage) => {
    return {
        type: SAVE_HOSPITAL_DEPARTMENT_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const saveHospitalDepartmentError = (errorMessage) => {
    return {
        type: SAVE_HOSPITAL_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSaveHospitalDepartmentMessage = () => {
    return {
        type: CLEAR_SAVE_HOSPITAL_DEPARTMENT_MESSAGE,
    }
};

export const editHospitalDepartmentPending = () => {
    return {
        type: EDIT_HOSPITAL_DEPARTMENT_PENDING,
    }
};

export const editHospitalDepartmentSuccess = (successMessage) => {
    return {
        type: EDIT_HOSPITAL_DEPARTMENT_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const editHospitalDepartmentError = (errorMessage) => {
    return {
        type: EDIT_HOSPITAL_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearEditHospitalDepartmentMessage = () => {
    return {
        type: CLEAR_EDIT_HOSPITAL_DEPARTMENT_MESSAGE,
    }
};

export const deleteHospitalDepartmentPending = () => {
    return {
        type: DELETE_HOSPITAL_DEPARTMENT_PENDING,
    }
};

export const deleteHospitalDepartmentSuccess = (successMessage) => {
    return {
        type: DELETE_HOSPITAL_DEPARTMENT_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const deleteHospitalDepartmentError = (errorMessage) => {
    return {
        type: DELETE_HOSPITAL_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearDeleteHospitalDepartmentMessage = () => {
    return {
        type: CLEAR_DELETE_HOSPITAL_DEPARTMENT_MESSAGE,
    }
};

export const searchHospitalDepartmentPending = () => {
    return {
        type: SEARCH_HOSPITAL_DEPARTMENT_PENDING,
    }
};

export const searchHospitalDepartmentSuccess = (data) => {
    return {
        type: SEARCH_HOSPITAL_DEPARTMENT_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchHospitalDepartmentError = (errorMessage) => {
    return {
        type: SEARCH_HOSPITAL_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSearchHospitalDepartmentMessage = () => {
    return {
        type: CLEAR_SEARCH_HOSPITAL_DEPARTMENT_MESSAGE,
    }
};

export const fetchAllHospitalDepartmentPending = () => {
    return {
        type: FETCH_ALL_HOSPITAL_DEPARTMENT_PENDING
    }
};

export const fetchAllHospitalDepartmentSuccess = (data) => {
    return {
        type: FETCH_ALL_HOSPITAL_DEPARTMENT_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchAllHospitalDepartmentError = (errorMessage) => {
    return {
        type: FETCH_ALL_HOSPITAL_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};


export const previewHospitalDepartmentPending = () => {
    return {
        type: PREVIEW_HOSPITAL_DEPARTMENT_PENDING,
    }
};

export const previewHospitalDepartmentSuccess = (data) => {
    return {
        type: PREVIEW_HOSPITAL_DEPARTMENT_SUCCESS,
        payload: {
            data
        }
    }
};

export const previewHospitalDepartmentError = (errorMessage) => {
    return {
        type: PREVIEW_HOSPITAL_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearpreviewHospitalDepartmentMessage = () => {
    return {
        type: CLEAR_PREVIEW_HOSPITAL_DEPARTMENT_MESSAGE,
    }
};

export const fetchActiveHospitalDepartmentPending = () => {
    return {
        type: FETCH_ACTIVE_HOSPITAL_DEPARTMENT_PENDING
    }
};

export const fetchActiveHospitalDepartmentSuccess = (data) => {
    return {
        type: FETCH_ACTIVE_HOSPITAL_DEPARTMENT_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveHospitalDepartmentError = (errorMessage) => {
    return {
        type: FETCH_ACTIVE_HOSPITAL_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};


