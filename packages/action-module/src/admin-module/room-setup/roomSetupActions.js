import {roomSetupActionConstants} from './roomSetupActionConstants';

const {
    SAVE_ROOM_NUMBER_PENDING,
    SAVE_ROOM_NUMBER_SUCCESS,
    SAVE_ROOM_NUMBER_ERROR,
    CLEAR_SAVE_ROOM_NUMBER_MESSAGE,
    EDIT_ROOM_NUMBER_PENDING,
    EDIT_ROOM_NUMBER_SUCCESS,
    EDIT_ROOM_NUMBER_ERROR,
    CLEAR_EDIT_ROOM_NUMBER_MESSAGE,
    DELETE_ROOM_NUMBER_PENDING,
    DELETE_ROOM_NUMBER_SUCCESS,
    DELETE_ROOM_NUMBER_ERROR,
    CLEAR_DELETE_ROOM_NUMBER_MESSAGE,
    SEARCH_ROOM_NUMBER_PENDING,
    SEARCH_ROOM_NUMBER_SUCCESS,
    SEARCH_ROOM_NUMBER_ERROR,
    CLEAR_SEARCH_ROOM_NUMBER_MESSAGE,
    FETCH_ALL_ROOM_NUMBER_PENDING,
    FETCH_ALL_ROOM_NUMBER_SUCCESS,
    FETCH_ALL_ROOM_NUMBER_ERROR,
    FETCH_ACTIVE_ROOM_NUMBER_ERROR,
    FETCH_ACTIVE_ROOM_NUMBER_PENDING,
    FETCH_ACTIVE_ROOM_NUMBER_SUCCESS,
    FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_ERROR,
    FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_PENDING,
    FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_SUCCESS,
    FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_ERROR,
    FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_PENDING,
    FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_SUCCESS
} = roomSetupActionConstants;

export const saveRoomNumberPending = () => {
    return {
        type: SAVE_ROOM_NUMBER_PENDING,
    }
};

export const saveRoomNumberSuccess = (successMessage) => {
    return {
        type: SAVE_ROOM_NUMBER_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const saveRoomNumberError = (errorMessage) => {
    return {
        type: SAVE_ROOM_NUMBER_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSaveRoomNumberMessage = () => {
    return {
        type: CLEAR_SAVE_ROOM_NUMBER_MESSAGE,
    }
};

export const editRoomNumberPending = () => {
    return {
        type: EDIT_ROOM_NUMBER_PENDING,
    }
};

export const editRoomNumberSuccess = (successMessage) => {
    return {
        type: EDIT_ROOM_NUMBER_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const editRoomNumberError = (errorMessage) => {
    return {
        type: EDIT_ROOM_NUMBER_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearEditRoomNumberMessage = () => {
    return {
        type: CLEAR_EDIT_ROOM_NUMBER_MESSAGE,
    }
};

export const deleteRoomNumberPending = () => {
    return {
        type: DELETE_ROOM_NUMBER_PENDING,
    }
};

export const deleteRoomNumberSuccess = (successMessage) => {
    return {
        type: DELETE_ROOM_NUMBER_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const deleteRoomNumberError = (errorMessage) => {
    return {
        type: DELETE_ROOM_NUMBER_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearDeleteRoomNumberMessage = () => {
    return {
        type: CLEAR_DELETE_ROOM_NUMBER_MESSAGE,
    }
};

export const searchRoomNumberPending = () => {
    return {
        type: SEARCH_ROOM_NUMBER_PENDING,
    }
};

export const searchRoomNumberSuccess = (data) => {
    return {
        type: SEARCH_ROOM_NUMBER_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchRoomNumberError = (errorMessage) => {
    return {
        type: SEARCH_ROOM_NUMBER_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSearchRoomNumberMessage = () => {
    return {
        type: CLEAR_SEARCH_ROOM_NUMBER_MESSAGE,
    }
};

export const fetchAllRoomNumberPending = () => {
    return {
        type: FETCH_ALL_ROOM_NUMBER_PENDING
    }
};

export const fetchAllRoomNumberSuccess = (data) => {
    return {
        type: FETCH_ALL_ROOM_NUMBER_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchAllRoomNumberError = (errorMessage) => {
    return {
        type: FETCH_ALL_ROOM_NUMBER_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const fetchActiveRoomNumberPending = () => {
    return {
        type: FETCH_ACTIVE_ROOM_NUMBER_PENDING
    }
};

export const fetchActiveRoomNumberSuccess = (data) => {
    return {
        type: FETCH_ACTIVE_ROOM_NUMBER_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveRoomNumberError = (errorMessage) => {
    return {
        type: FETCH_ACTIVE_ROOM_NUMBER_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const fetchActiveRoomNumberByDepartmentPending = () => {
    return {
        type: FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_PENDING
    }
};

export const fetchActiveRoomNumberByDepartmentSuccess = (data) => {
    return {
        type: FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveRoomNumberByDepartmentError = (errorMessage) => {
    return {
        type: FETCH_ACTIVE_ROOM_NUMBER_BY_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};


export const fetchAllRoomNumberByDepartmentPending = () => {
    return {
        type: FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_PENDING
    }
};

export const fetchAllRoomNumberByDepartmentSuccess = (data) => {
    return {
        type: FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchAllRoomNumberByDepartmentError = (errorMessage) => {
    return {
        type: FETCH_ALL_ROOM_NUMBER_BY_DEPARTMENT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};
