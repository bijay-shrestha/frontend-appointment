import {unitSetupConstants} from './unitSetupActionConstants';

const {
    DATA_FETCH_START,
    DATA_FETCH_SUCCESS,
    DATA_FETCH_ERROR,
    SAVE_UNITS,
    CREATE_UNIT_PENDING,
    CREATE_UNIT_SUCCESS,
    CREATE_UNIT_ERROR,
    UNIT_LIST_PENDING,
    UNIT_LIST_SUCCESS,
    UNIT_LIST_ERROR,
    UNIT_EDIT_PENDING,
    UNIT_EDIT_SUCCESS,
    UNIT_EDIT_ERROR,
    UNIT_DELETE_PENDING,
    UNIT_DELETE_SUCCESS,
    UNIT_DELETE_ERROR,
    UNIT_PREVIEW_ERROR,
    UNIT_PREVIEW_SUCCESS,
    UNIT_PREVIEW_PENDING,
    CLEAR_UNIT_CREATE_SUCCESS_MESSAGE,
    CLEAR_UNIT_CREATE_ERROR_MESSAGE,
    CLEAR_UNIT_LIST_FETCH_ERROR_MESSAGE,
    CLEAR_UNIT_EDIT_SUCCESS_MESSAGE,
    CLEAR_UNIT_EDIT_ERROR_MESSAGE,
    CLEAR_UNIT_PREVIEW_ERROR_MESSAGE,
    CLEAR_UNIT_DELETE_ERROR_MESSAGE,
    CLEAR_UNIT_DELETE_SUCCESS_MESSAGE,
    FETCH_UNIT_BY_HOSPITAL_ID_ERROR,
    FETCH_UNIT_BY_HOSPITAL_ID_SUCCESS,
    FETCH_ACTIVE_UNIT_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_UNIT_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_UNIT_FOR_DROPDOWN_ERROR
} = unitSetupConstants;

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
        type: SAVE_UNITS,
        payload: {
            data
        }
    }
};

export const createDepartmentPending = () => {
    return {
        type: CREATE_UNIT_PENDING
    }
};

export const creatingDepartmentSuccess = message => {
    return {
        type: CREATE_UNIT_SUCCESS,
        payload: {
            successMessage: message
        }
    }
};

export const clearDepartmentCreateSuccessMessage = () => {
    return {
        type: CLEAR_UNIT_CREATE_SUCCESS_MESSAGE
    }
};

export const clearDepartmentCreateErrorMessage = () => {
    return {
        type: CLEAR_UNIT_CREATE_ERROR_MESSAGE
    }
};

export const creatingDepartmentError = message => {
    return {
        type: CREATE_UNIT_ERROR,
        payload: {
            errorMessage: message
        }
    }
};

export const departmentListSuccess = message => {
    return {
        type: UNIT_LIST_SUCCESS,
        payload: {
            data: message
        }
    }
};

export const departmentListError = message => {
    return {
        type: UNIT_LIST_ERROR,
        payload: {
            data: message
        }
    }
};

export const departmentListPending = () => {
    return {
        type: UNIT_LIST_PENDING,
        payload: {
            data: []
        }
    }
};

export const clearDepartmentListFetchErrorMessage = () => {
    return {
        type: CLEAR_UNIT_LIST_FETCH_ERROR_MESSAGE
    }
};

export const departmentDeletePending = () => {
    return {
        type: UNIT_DELETE_PENDING,
        payload: {
            data: []
        }
    }
};

export const departmentDeleteSuccess = success => {
    return {
        type: UNIT_DELETE_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const departmentDeleteError = errorMessage => {
    return {
        type: UNIT_DELETE_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const departmentEditError = errorMessage => {
    return {
        type: UNIT_EDIT_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const departmentEditSuccess = success => {
    return {
        type: UNIT_EDIT_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const departmentEditPending = () => {
    return {
        type: UNIT_EDIT_PENDING,
        payload: {
            data: ''
        }
    }
};

export const clearDepartmentEditSuccessMessage = () => {
    return {
        type: CLEAR_UNIT_EDIT_SUCCESS_MESSAGE
    }
};

export const clearDepartmentEditErrorMessage = () => {
    return {
        type: CLEAR_UNIT_EDIT_ERROR_MESSAGE
    }
};

export const departmentPreviewPending = () => {
    return {
        type: UNIT_PREVIEW_PENDING,
        payload: {
            data: ''
        }
    }
};

export const departmentPreviewSuccess = success => {
    return {
        type: UNIT_PREVIEW_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const departmentPreviewError = errorMsg => {
    return {
        type: UNIT_PREVIEW_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const clearDepartmentPreviewErrorMessage = () => {
    return {
        type: CLEAR_UNIT_PREVIEW_ERROR_MESSAGE
    }
};

export const clearDepartmentDeleteErrorMessage = () => {
    return {
        type: CLEAR_UNIT_DELETE_ERROR_MESSAGE
    }
};
export const clearDepartmentDeleteSuccessMessage = () => {
    return {
        type: CLEAR_UNIT_DELETE_SUCCESS_MESSAGE
    }
};

export const fetchDepartmentByHospitalIdSuccess = data => {
    return {
        type: FETCH_UNIT_BY_HOSPITAL_ID_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchDepartmentByHospitalIdError = errorMsg => {
    return {
        type: FETCH_UNIT_BY_HOSPITAL_ID_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const fetchActiveDepartmentsForDropdownPending = data => {
    return {
        type: FETCH_ACTIVE_UNIT_FOR_DROPDOWN_PENDING
    }
};

export const fetchActiveDepartmentsForDropdownSuccess = data => {
    return {
        type: FETCH_ACTIVE_UNIT_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveDepartmentsForDropdownError = errorMessage => {
    return {
        type: FETCH_ACTIVE_UNIT_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};
