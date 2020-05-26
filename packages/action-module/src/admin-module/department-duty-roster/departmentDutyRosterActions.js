import {departmentDutyRosterActionConstants} from './departmentDutyRosterActionConstants';

const {
    CREATE_DEPARTMENT_DUTY_ROSTER_PENDING,
    CREATE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    CREATE_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_CREATE_MESSAGE,
    UPDATE_DEPARTMENT_DUTY_ROSTER_PENDING,
    UPDATE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    UPDATE_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_UPDATE_MESSAGE,
    DELETE_DEPARTMENT_DUTY_ROSTER_PENDING,
    DELETE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    DELETE_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_DELETE_MESSAGE,
    SEARCH_DEPARTMENT_DUTY_ROSTER_PENDING,
    SEARCH_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    SEARCH_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_SEARCH_MESSAGE,
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_PENDING,
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_SUCCESS,
    FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_DETAIL_MESSAGE,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_PENDING,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_SUCCESS,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_ERROR,
    CLEAR_EXISTING_DEPARTMENT_DUTY_ROSTER_MESSAGE,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_PENDING,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_SUCCESS,
    FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_ERROR,
    CLEAR_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_MESSAGE,
    UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING,
    UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
    UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_UPDATE_MESSAGE,
    DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING,
    DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
    DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_DELETE_MESSAGE,
    REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING,
    REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
    REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
    CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_REVERT_MESSAGE
} = departmentDutyRosterActionConstants;

export const createDepartmentDutyRosterPending = () => {
    return {
        type: CREATE_DEPARTMENT_DUTY_ROSTER_PENDING
    }
};

export const createDepartmentDutyRosterSuccess = data => {
    return {
        type: CREATE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const createDepartmentDutyRosterError = errorMessage => {
    return {
        type: CREATE_DEPARTMENT_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDepartmentDutyRosterCreateMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DUTY_ROSTER_CREATE_MESSAGE
    }
};

export const updateDepartmentDutyRosterPending = () => {
    return {
        type: UPDATE_DEPARTMENT_DUTY_ROSTER_PENDING
    }
};

export const updateDepartmentDutyRosterSuccess = data => {
    return {
        type: UPDATE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const updateDepartmentDutyRosterError = errorMessage => {
    return {
        type: UPDATE_DEPARTMENT_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDepartmentDutyRosterUpdateMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DUTY_ROSTER_UPDATE_MESSAGE
    }
};

export const deleteDepartmentDutyRosterPending = () => {
    return {
        type: DELETE_DEPARTMENT_DUTY_ROSTER_PENDING
    }
};

export const deleteDepartmentDutyRosterSuccess = data => {
    return {
        type: DELETE_DEPARTMENT_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const deleteDepartmentDutyRosterError = errorMessage => {
    return {
        type: DELETE_DEPARTMENT_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDepartmentDutyRosterDeleteMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DUTY_ROSTER_DELETE_MESSAGE
    }
};

export const searchDepartmentDutyRosterPending = () => {
    return {
        type: SEARCH_DEPARTMENT_DUTY_ROSTER_PENDING
    }
};

export const searchDepartmentDutyRosterSuccess = data => {
    return {
        type: SEARCH_DEPARTMENT_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchDepartmentDutyRosterError = errorMessage => {
    return {
        type: SEARCH_DEPARTMENT_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDepartmentDutyRosterSearchMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DUTY_ROSTER_SEARCH_MESSAGE
    }
};

export const fetchDepartmentDutyRosterDetailPending = () => {
    return {
        type: FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_PENDING
    }
};

export const fetchDepartmentDutyRosterDetailSuccess = data => {
    return {
        type: FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchDepartmentDutyRosterDetailError = errorMessage => {
    return {
        type: FETCH_DEPARTMENT_DUTY_ROSTER_DETAIL_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDepartmentDutyRosterDetailMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DUTY_ROSTER_DETAIL_MESSAGE
    }
};

export const fetchExistingDepartmentDutyRosterPending = () => {
    return {
        type: FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_PENDING
    }
};

export const fetchExistingDepartmentDutyRosterSuccess = data => {
    return {
        type: FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchExistingDepartmentDutyRosterError = errorMessage => {
    return {
        type: FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearExistingDepartmentDutyRosterMessage = () => {
    return {
        type: CLEAR_EXISTING_DEPARTMENT_DUTY_ROSTER_MESSAGE
    }
};

export const fetchExistingDepartmentDutyRosterDetailByIdPending = () => {
    return {
        type: FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_PENDING
    }
};

export const fetchExistingDepartmentDutyRosterDetailByIdSuccess = data => {
    return {
        type: FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchExistingDepartmentDutyRosterDetailByIdError = errorMessage => {
    return {
        type: FETCH_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearExistingDepartmentDutyRosterDetailByIdMessage = () => {
    return {
        type: CLEAR_EXISTING_DEPARTMENT_DUTY_ROSTER_DETAIL_BY_ID_MESSAGE
    }
};

export const updateDepartmentDutyRosterOverridePending = () => {
    return {
        type: UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING
    }
};

export const updateDepartmentDutyRosterOverrideSuccess = data => {
    return {
        type: UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
        payload: {
            data
        }
    }
};

export const updateDepartmentDutyRosterOverrideError = errorMessage => {
    return {
        type: UPDATE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDepartmentDutyRosterOverrideUpdateMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_UPDATE_MESSAGE
    }
};

export const deleteDepartmentDutyRosterOverridePending = () => {
    return {
        type: DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING
    }
};

export const deleteDepartmentDutyRosterOverrideSuccess = data => {
    return {
        type: DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
        payload: {
            data
        }
    }
};

export const deleteDepartmentDutyRosterOverrideError = errorMessage => {
    return {
        type: DELETE_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDepartmentDutyRosterOverrideDeleteMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_DELETE_MESSAGE
    }
};

export const revertDepartmentDutyRosterOverridePending = () => {
    return {
        type: REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_PENDING
    }
};

export const revertDepartmentDutyRosterOverrideSuccess = data => {
    return {
        type: REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_SUCCESS,
        payload: {
            data
        }
    }
};

export const revertDepartmentDutyRosterOverrideError = errorMessage => {
    return {
        type: REVERT_DEPARTMENT_DUTY_ROSTER_OVERRIDE_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDepartmentDutyRosterOverrideRevertMessage = () => {
    return {
        type: CLEAR_DEPARTMENT_DUTY_ROSTER_OVERRIDE_REVERT_MESSAGE
    }
};



