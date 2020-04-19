import {appointmentModeActionConstants} from './appointmentModeActionConstants';

const {
    SAVE_APPOINTMENT_MODE_PENDING,
    SAVE_APPOINTMENT_MODE_SUCCESS,
    SAVE_APPOINTMENT_MODE_ERROR,
    CLEAR_SAVE_APPOINTMENT_MODE_MESSAGE,
    EDIT_APPOINTMENT_MODE_PENDING,
    EDIT_APPOINTMENT_MODE_SUCCESS,
    EDIT_APPOINTMENT_MODE_ERROR,
    CLEAR_EDIT_APPOINTMENT_MODE_MESSAGE,
    DELETE_APPOINTMENT_MODE_PENDING,
    DELETE_APPOINTMENT_MODE_SUCCESS,
    DELETE_APPOINTMENT_MODE_ERROR,
    CLEAR_DELETE_APPOINTMENT_MODE_MESSAGE,
    SEARCH_APPOINTMENT_MODE_PENDING,
    SEARCH_APPOINTMENT_MODE_SUCCESS,
    SEARCH_APPOINTMENT_MODE_ERROR,
    CLEAR_SEARCH_APPOINTMENT_MODE_MESSAGE,
    FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_ERROR,
    FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_PENDING,
    FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_SUCCESS,
    CLEAR_PREVIEW_APPOINTMENT_MODE_MESSAGE,
    PREVIEW_APPOINTMENT_MODE_ERROR,
    PREVIEW_APPOINTMENT_MODE_PENDING,
    PREVIEW_APPOINTMENT_MODE_SUCCESS
} = appointmentModeActionConstants;

export const saveAppointmentModePending = () => {
    return {
        type: SAVE_APPOINTMENT_MODE_PENDING,
    }
};

export const saveAppointmentModeSuccess = (successMessage) => {
    return {
        type: SAVE_APPOINTMENT_MODE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const saveAppointmentModeError = (errorMessage) => {
    return {
        type: SAVE_APPOINTMENT_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSaveAppointmentModeMessage = () => {
    return {
        type: CLEAR_SAVE_APPOINTMENT_MODE_MESSAGE,
    }
};

export const editAppointmentModePending = () => {
    return {
        type: EDIT_APPOINTMENT_MODE_PENDING,
    }
};

export const editAppointmentModeSuccess = (successMessage) => {
    return {
        type: EDIT_APPOINTMENT_MODE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const editAppointmentModeError = (errorMessage) => {
    return {
        type: EDIT_APPOINTMENT_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearEditAppointmentModeMessage = () => {
    return {
        type: CLEAR_EDIT_APPOINTMENT_MODE_MESSAGE,
    }
};

export const deleteAppointmentModePending = () => {
    return {
        type: DELETE_APPOINTMENT_MODE_PENDING,
    }
};

export const deleteAppointmentModeSuccess = (successMessage) => {
    return {
        type: DELETE_APPOINTMENT_MODE_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const deleteAppointmentModeError = (errorMessage) => {
    return {
        type: DELETE_APPOINTMENT_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearDeleteAppointmentModeMessage = () => {
    return {
        type: CLEAR_DELETE_APPOINTMENT_MODE_MESSAGE,
    }
};

export const searchAppointmentModePending = () => {
    return {
        type: SEARCH_APPOINTMENT_MODE_PENDING,
    }
};

export const searchAppointmentModeSuccess = (data) => {
    return {
        type: SEARCH_APPOINTMENT_MODE_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchAppointmentModeError = (errorMessage) => {
    return {
        type: SEARCH_APPOINTMENT_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSearchAppointmentModeMessage = () => {
    return {
        type: CLEAR_SEARCH_APPOINTMENT_MODE_MESSAGE,
    }
};

export const fetchAppointmentModePending = () => {
    return {
        type: FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_PENDING
    }
};

export const fetchAppointmentModeSuccess = (data) => {
    return {
        type: FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchAppointmentModeError = (errorMessage) => {
    return {
        type: FETCH_APPOINTMENT_MODE_FOR_DROPDOWN_ERROR,
        payload: {
            message: errorMessage
        }
    }
};


export const previewAppointmentModePending = () => {
    return {
        type: PREVIEW_APPOINTMENT_MODE_PENDING,
    }
};

export const previewAppointmentModeSuccess = (data) => {
    return {
        type: PREVIEW_APPOINTMENT_MODE_SUCCESS,
        payload: {
            data
        }
    }
};

export const previewAppointmentModeError = (errorMessage) => {
    return {
        type: PREVIEW_APPOINTMENT_MODE_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearPreviewAppointmentModeMessage = () => {
    return {
        type: CLEAR_PREVIEW_APPOINTMENT_MODE_MESSAGE,
    }
};

