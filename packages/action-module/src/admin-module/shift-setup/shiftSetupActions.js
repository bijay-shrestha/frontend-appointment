import {shiftSetupActionConstants} from './shiftSetupActionConstants';

const {
    SAVE_SHIFT_PENDING,
    SAVE_SHIFT_SUCCESS,
    SAVE_SHIFT_ERROR,
    CLEAR_SAVE_SHIFT_MESSAGE,
    EDIT_SHIFT_PENDING,
    EDIT_SHIFT_SUCCESS,
    EDIT_SHIFT_ERROR,
    CLEAR_EDIT_SHIFT_MESSAGE,
    DELETE_SHIFT_PENDING,
    DELETE_SHIFT_SUCCESS,
    DELETE_SHIFT_ERROR,
    CLEAR_DELETE_SHIFT_MESSAGE,
    SEARCH_SHIFT_PENDING,
    SEARCH_SHIFT_SUCCESS,
    SEARCH_SHIFT_ERROR,
    CLEAR_SEARCH_SHIFT_MESSAGE,
    FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS
    // CLEAR_PREVIEW_SHIFT_MESSAGE,
    // PREVIEW_SHIFT_ERROR,
    // PREVIEW_SHIFT_PENDING,
    // PREVIEW_SHIFT_SUCCESS
} = shiftSetupActionConstants;

export const saveShiftPending = () => {
    return {
        type: SAVE_SHIFT_PENDING,
    }
};

export const saveShiftSuccess = (successMessage) => {
    return {
        type: SAVE_SHIFT_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const saveShiftError = (errorMessage) => {
    return {
        type: SAVE_SHIFT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSaveShiftMessage = () => {
    return {
        type: CLEAR_SAVE_SHIFT_MESSAGE,
    }
};

export const editShiftPending = () => {
    return {
        type: EDIT_SHIFT_PENDING,
    }
};

export const editShiftSuccess = (successMessage) => {
    return {
        type: EDIT_SHIFT_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const editShiftError = (errorMessage) => {
    return {
        type: EDIT_SHIFT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearEditShiftMessage = () => {
    return {
        type: CLEAR_EDIT_SHIFT_MESSAGE,
    }
};

export const deleteShiftPending = () => {
    return {
        type: DELETE_SHIFT_PENDING,
    }
};

export const deleteShiftSuccess = (successMessage) => {
    return {
        type: DELETE_SHIFT_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const deleteShiftError = (errorMessage) => {
    return {
        type: DELETE_SHIFT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearDeleteShiftMessage = () => {
    return {
        type: CLEAR_DELETE_SHIFT_MESSAGE,
    }
};

export const searchShiftPending = () => {
    return {
        type: SEARCH_SHIFT_PENDING,
    }
};

export const searchShiftSuccess = (data) => {
    return {
        type: SEARCH_SHIFT_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchShiftError = (errorMessage) => {
    return {
        type: SEARCH_SHIFT_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSearchShiftMessage = () => {
    return {
        type: CLEAR_SEARCH_SHIFT_MESSAGE,
    }
};

export const fetchActiveShiftByDoctorIdForDropdownPending = () => {
    return {
        type: FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_PENDING
    }
};

export const fetchActiveShiftByDoctorIdForDropdownSuccess = (data) => {
    return {
        type: FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveShiftByDoctorIdForDropdownError = (errorMessage) => {
    return {
        type: FETCH_ACTIVE_SHIFT_BY_DOCTOR_FOR_DROPDOWN_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const fetchActiveShiftByHospitalIdForDropdownPending = () => {
    return {
        type: FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_PENDING
    }
};

export const fetchActiveShiftByHospitalIdForDropdownSuccess = (data) => {
    return {
        type: FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveShiftByHospitalIdForDropdownError = (errorMessage) => {
    return {
        type: FETCH_ACTIVE_SHIFT_BY_HOSPITAL_FOR_DROPDOWN_ERROR,
        payload: {
            message: errorMessage
        }
    }
};


// export const previewShiftPending = () => {
//     return {
//         type: PREVIEW_SHIFT_PENDING,
//     }
// };
//
// export const previewShiftSuccess = (data) => {
//     return {
//         type: PREVIEW_SHIFT_SUCCESS,
//         payload: {
//             data
//         }
//     }
// };
//
// export const previewShiftError = (errorMessage) => {
//     return {
//         type: PREVIEW_SHIFT_ERROR,
//         payload: {
//             message: errorMessage
//         }
//     }
// };
//
// export const clearpreviewShiftMessage = () => {
//     return {
//         type: CLEAR_PREVIEW_SHIFT_MESSAGE,
//     }
// };
//
