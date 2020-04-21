import {adminSetupActionConstants} from "./adminSetupActionConstant";

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


export const createAdminPending = () => {
    return {
        type: CREATE_ADMIN_PENDING
    }
};

export const creatingAdminSuccess = message => {
    return {
        type: CREATE_ADMIN_SUCCESS,
        payload: {
            successMessage: message
        }
    }
};

export const creatingAdminError = message => {
    return {
        type: CREATE_ADMIN_ERROR,
        payload: {
            errorMessage: message
        }
    }
};

export const clearAdminCreateSuccessMessage = () => {
    return {
        type: CLEAR_ADMIN_CREATE_SUCCESS_MESSAGE
    }
};

export const clearAdminCreateErrorMessage = () => {
    return {
        type: CLEAR_ADMIN_CREATE_ERROR_MESSAGE
    }
};

export const adminListSuccess = message => {
    return {
        type: ADMIN_LIST_SUCCESS,
        payload: {
            data: message
        }
    }
};

export const adminListError = message => {
    return {
        type: ADMIN_LIST_ERROR,
        payload: {
            data: message
        }
    }
};

export const adminListPending = () => {
    return {
        type: ADMIN_LIST_PENDING,
        payload: {
            data: []
        }
    }
};

export const clearAdminListFetchErrorMessage = () => {
    return {
        type: CLEAR_ADMIN_LIST_FETCH_ERROR_MESSAGE
    }
};

export const adminDeletePending = () => {
    return {
        type: ADMIN_DELETE_PENDING,
        payload: {
            data: []
        }
    }
};

export const adminDeleteSuccess = success => {
    return {
        type: ADMIN_DELETE_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const adminDeleteError = errorMessage => {
    return {
        type: ADMIN_DELETE_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const adminEditError = errorMessage => {
    return {
        type: ADMIN_EDIT_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const adminEditSuccess = success => {
    return {
        type: ADMIN_EDIT_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const adminEditPending = () => {
    return {
        type: ADMIN_EDIT_PENDING,
        payload: {
            data: ''
        }
    }
};

export const clearAdminEditSuccessMessage = () => {
    return {
        type: CLEAR_ADMIN_EDIT_SUCCESS_MESSAGE
    }
};

export const clearAdminEditErrorMessage = () => {
    return {
        type: CLEAR_ADMIN_EDIT_ERROR_MESSAGE
    }
};

export const adminPreviewPending = () => {
    return {
        type: ADMIN_PREVIEW_PENDING,
        payload: {
            data: ''
        }
    }
};

export const adminPreviewSuccess = success => {
    return {
        type: ADMIN_PREVIEW_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const adminPreviewError = errorMsg => {
    return {
        type: ADMIN_PREVIEW_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const clearAdminPreviewErrorMessage = () => {
    return {
        type: CLEAR_ADMIN_PREVIEW_ERROR_MESSAGE
    }
};

export const clearAdminDeleteErrorMessage = () => {
    return {
        type: CLEAR_ADMIN_DELETE_ERROR_MESSAGE
    }
};
export const clearAdminDeleteSuccessMessage = () => {
    return {
        type: CLEAR_ADMIN_DELETE_SUCCESS_MESSAGE
    }
};

export const adminMetaInfoFetchPending = () => {
    return {
        type: FETCH_ADMIN_META_INFO_PENDING
    }
};

export const adminMetaInfoFetchSuccess = data => {
    return {
        type: FETCH_ADMIN_META_INFO_SUCCESS,
        payload: {
            data
        }
    }
};

export const adminMetaInfoFetchError = errorMsg => {
    return {
        type: FETCH_ADMIN_META_INFO_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const adminMetaInfoByHospitalIdFetchPending = () => {
    return {
        type: FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_PENDING
    }
};

export const adminMetaInfoFetchHospitalIdFetchSuccess = data => {
    return {
        type: FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_SUCCESS,
        payload: {
            data
        }
    }
};

export const adminMetaInfoFetchHospitalIdError = errorMsg => {
    return {
        type: FETCH_ADMIN_META_INFO_WITH_HOSPITAL_ID_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

