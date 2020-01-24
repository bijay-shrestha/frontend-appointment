import {departmentSetupConstants} from './departmentSetupActionConstants';

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
    CLEAR_DEPARTMENT_DELETE_SUCCESS_MESSAGE
} = departmentSetupConstants;

export const departmentFetchingStart = () => {
    return {
        type: DATA_FETCH_START
    }
};

export const departmentFetchingSuccess = message => {
    return {
        type: DATA_FETCH_SUCCESS
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

export const createDepartmentPending = () => {
    return {
        type: CREATE_DEPARTMENT_PENDING
    }
};

export const creatingDepartmentSuccess = message => {
    return {
        type: CREATE_DEPARTMENT_SUCCESS,
        payload: {
            successMessage: message
        }
    }
};

export const clearDepartmentCreateSuccessMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_CREATE_SUCCESS_MESSAGE
    }
};

export const clearDepartmentCreateErrorMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_CREATE_ERROR_MESSAGE
    }
};

export const creatingDepartmentError = message => {
    return {
        type: CREATE_DEPARTMENT_ERROR,
        payload: {
            errorMessage: message
        }
    }
};

export const departmentListSuccess = message => {
    return {
        type: DEPARTMENT_LIST_SUCCESS,
        payload: {
            data: message
        }
    }
};

export const departmentListError = message => {
    return {
        type: DEPARTMENT_LIST_ERROR,
        payload: {
            data: message
        }
    }
};

export const departmentListPending = () => {
    return {
        type: DEPARTMENT_LIST_PENDING,
        payload: {
            data: []
        }
    }
};

export const clearDepartmentListFetchErrorMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_LIST_FETCH_ERROR_MESSAGE
    }
};

export const departmentDeletePending = () => {
    return {
        type: DEPARTMENT_DELETE_PENDING,
        payload: {
            data: []
        }
    }
};

export const departmentDeleteSuccess = success => {
    return {
        type: DEPARTMENT_DELETE_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const departmentDeleteError = errorMessage => {
    return {
        type: DEPARTMENT_DELETE_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const departmentEditError = errorMessage => {
    return {
        type: DEPARTMENT_EDIT_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const departmentEditSuccess = success => {
    return {
        type: DEPARTMENT_EDIT_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const departmentEditPending = () => {
    return {
        type: DEPARTMENT_EDIT_PENDING,
        payload: {
            data: ''
        }
    }
};

export const clearDepartmentEditSuccessMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_EDIT_SUCCESS_MESSAGE
    }
};

export const clearDepartmentEditErrorMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_EDIT_ERROR_MESSAGE
    }
};

export const departmentPreviewPending = () => {
    return {
        type: DEPARTMENT_PREVIEW_PENDING,
        payload: {
            data: ''
        }
    }
};

export const departmentPreviewSuccess = success => {
    return {
        type: DEPARTMENT_PREVIEW_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const departmentPreviewError = errorMsg => {
    return {
        type: DEPARTMENT_PREVIEW_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const clearDepartmentPreviewErrorMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_PREVIEW_ERROR_MESSAGE
    }
};

export const clearDepartmentDeleteErrorMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DELETE_ERROR_MESSAGE
    }
};
export const clearDepartmentDeleteSuccessMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DELETE_SUCCESS_MESSAGE
    }
};
