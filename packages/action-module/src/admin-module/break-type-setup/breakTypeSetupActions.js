import {breakTypeSetupActionConstants} from './breakTypeSetupActionConstants';

const {
    SAVE_BREAK_TYPE_PENDING,
    SAVE_BREAK_TYPE_SUCCESS,
    SAVE_BREAK_TYPE_ERROR,
    CLEAR_SAVE_BREAK_TYPE_MESSAGE,
    EDIT_BREAK_TYPE_PENDING,
    EDIT_BREAK_TYPE_SUCCESS,
    EDIT_BREAK_TYPE_ERROR,
    CLEAR_EDIT_BREAK_TYPE_MESSAGE,
    DELETE_BREAK_TYPE_PENDING,
    DELETE_BREAK_TYPE_SUCCESS,
    DELETE_BREAK_TYPE_ERROR,
    CLEAR_DELETE_BREAK_TYPE_MESSAGE,
    SEARCH_BREAK_TYPE_PENDING,
    SEARCH_BREAK_TYPE_SUCCESS,
    SEARCH_BREAK_TYPE_ERROR,
    CLEAR_SEARCH_BREAK_TYPE_MESSAGE,
    FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS
    // CLEAR_PREVIEW_BREAK_TYPE_MESSAGE,
    // PREVIEW_BREAK_TYPE_ERROR,
    // PREVIEW_BREAK_TYPE_PENDING,
    // PREVIEW_BREAK_TYPE_SUCCESS
} = breakTypeSetupActionConstants;

export const saveBreakTypePending = () => {
    return {
        type: SAVE_BREAK_TYPE_PENDING,
    }
};

export const saveBreakTypeSuccess = (successMessage) => {
    return {
        type: SAVE_BREAK_TYPE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const saveBreakTypeError = (errorMessage) => {
    return {
        type: SAVE_BREAK_TYPE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSaveBreakTypeMessage = () => {
    return {
        type: CLEAR_SAVE_BREAK_TYPE_MESSAGE,
    }
};

export const editBreakTypePending = () => {
    return {
        type: EDIT_BREAK_TYPE_PENDING,
    }
};

export const editBreakTypeSuccess = (successMessage) => {
    return {
        type: EDIT_BREAK_TYPE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const editBreakTypeError = (errorMessage) => {
    return {
        type: EDIT_BREAK_TYPE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearEditBreakTypeMessage = () => {
    return {
        type: CLEAR_EDIT_BREAK_TYPE_MESSAGE,
    }
};

export const deleteBreakTypePending = () => {
    return {
        type: DELETE_BREAK_TYPE_PENDING,
    }
};

export const deleteBreakTypeSuccess = (successMessage) => {
    return {
        type: DELETE_BREAK_TYPE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const deleteBreakTypeError = (errorMessage) => {
    return {
        type: DELETE_BREAK_TYPE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearDeleteBreakTypeMessage = () => {
    return {
        type: CLEAR_DELETE_BREAK_TYPE_MESSAGE,
    }
};

export const searchBreakTypePending = () => {
    return {
        type: SEARCH_BREAK_TYPE_PENDING,
    }
};

export const searchBreakTypeSuccess = (data) => {
    return {
        type: SEARCH_BREAK_TYPE_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchBreakTypeError = (errorMessage) => {
    return {
        type: SEARCH_BREAK_TYPE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSearchBreakTypeMessage = () => {
    return {
        type: CLEAR_SEARCH_BREAK_TYPE_MESSAGE,
    }
};

export const fetchActiveBreakTypeByHospitalIdForDropdownPending = () => {
    return {
        type: FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_PENDING
    }
};

export const fetchActiveBreakTypeByHospitalIdForDropdownSuccess = (data) => {
    return {
        type: FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveBreakTypeByHospitalIdForDropdownError = (errorMessage) => {
    return {
        type: FETCH_ACTIVE_BREAK_TYPE_BY_HOSPITAL_FOR_DROPDOWN_ERROR,
        payload: {
            message: errorMessage
        }
    }
};


// export const previewBreakTypePending = () => {
//     return {
//         type: PREVIEW_BREAK_TYPE_PENDING,
//     }
// };
//
// export const previewBreakTypeSuccess = (data) => {
//     return {
//         type: PREVIEW_BREAK_TYPE_SUCCESS,
//         payload: {
//             data
//         }
//     }
// };
//
// export const previewBreakTypeError = (errorMessage) => {
//     return {
//         type: PREVIEW_BREAK_TYPE_ERROR,
//         payload: {
//             message: errorMessage
//         }
//     }
// };
//
// export const clearPreviewBreakTypeMessage = () => {
//     return {
//         type: CLEAR_PREVIEW_BREAK_TYPE_MESSAGE,
//     }
// };
//
