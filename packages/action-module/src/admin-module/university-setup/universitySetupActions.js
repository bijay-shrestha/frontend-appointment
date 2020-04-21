import {universitySetupActionConstants} from './universitySetupActionConstants';

const {
    SAVE_UNIVERSITY_PENDING,
    SAVE_UNIVERSITY_SUCCESS,
    SAVE_UNIVERSITY_ERROR,
    CLEAR_SAVE_UNIVERSITY_MESSAGE,
    EDIT_UNIVERSITY_PENDING,
    EDIT_UNIVERSITY_SUCCESS,
    EDIT_UNIVERSITY_ERROR,
    CLEAR_EDIT_UNIVERSITY_MESSAGE,
    DELETE_UNIVERSITY_PENDING,
    DELETE_UNIVERSITY_SUCCESS,
    DELETE_UNIVERSITY_ERROR,
    CLEAR_DELETE_UNIVERSITY_MESSAGE,
    SEARCH_UNIVERSITY_PENDING,
    SEARCH_UNIVERSITY_SUCCESS,
    SEARCH_UNIVERSITY_ERROR,
    CLEAR_SEARCH_UNIVERSITY_MESSAGE,
    FETCH_UNIVERSITY_PENDING,
    FETCH_UNIVERSITY_SUCCESS,
    FETCH_UNIVERSITY_ERROR,
    CLEAR_PREVIEW_UNIVERSITY_MESSAGE,
    PREVIEW_UNIVERSITY_ERROR,
    PREVIEW_UNIVERSITY_PENDING,
    PREVIEW_UNIVERSITY_SUCCESS
} = universitySetupActionConstants;

export const saveUniversityPending = () => {
    return {
        type: SAVE_UNIVERSITY_PENDING,
    }
};

export const saveUniversitySuccess = (successMessage) => {
    return {
        type: SAVE_UNIVERSITY_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const saveUniversityError = (errorMessage) => {
    return {
        type: SAVE_UNIVERSITY_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSaveUniversityMessage = () => {
    return {
        type: CLEAR_SAVE_UNIVERSITY_MESSAGE,
    }
};

export const editUniversityPending = () => {
    return {
        type: EDIT_UNIVERSITY_PENDING,
    }
};

export const editUniversitySuccess = (successMessage) => {
    return {
        type: EDIT_UNIVERSITY_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const editUniversityError = (errorMessage) => {
    return {
        type: EDIT_UNIVERSITY_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearEditUniversityMessage = () => {
    return {
        type: CLEAR_EDIT_UNIVERSITY_MESSAGE,
    }
};

export const deleteUniversityPending = () => {
    return {
        type: DELETE_UNIVERSITY_PENDING,
    }
};

export const deleteUniversitySuccess = (successMessage) => {
    return {
        type: DELETE_UNIVERSITY_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const deleteUniversityError = (errorMessage) => {
    return {
        type: DELETE_UNIVERSITY_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearDeleteUniversityMessage = () => {
    return {
        type: CLEAR_DELETE_UNIVERSITY_MESSAGE,
    }
};

export const searchUniversityPending = () => {
    return {
        type: SEARCH_UNIVERSITY_PENDING,
    }
};

export const searchUniversitySuccess = (data) => {
    return {
        type: SEARCH_UNIVERSITY_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchUniversityError = (errorMessage) => {
    return {
        type: SEARCH_UNIVERSITY_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSearchUniversityMessage = () => {
    return {
        type: CLEAR_SEARCH_UNIVERSITY_MESSAGE,
    }
};

export const fetchUniversityPending = () => {
    return {
        type: FETCH_UNIVERSITY_PENDING
    }
};

export const fetchUniversitySuccess = (data) => {
    return {
        type: FETCH_UNIVERSITY_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchUniversityError = (errorMessage) => {
    return {
        type: FETCH_UNIVERSITY_ERROR,
        payload: {
            message: errorMessage
        }
    }
};


export const previewUniversityPending = () => {
    return {
        type: PREVIEW_UNIVERSITY_PENDING,
    }
};

export const previewUniversitySuccess = (data) => {
    return {
        type: PREVIEW_UNIVERSITY_SUCCESS,
        payload: {
            data
        }
    }
};

export const previewUniversityError = (errorMessage) => {
    return {
        type: PREVIEW_UNIVERSITY_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearpreviewUniversityMessage = () => {
    return {
        type: CLEAR_PREVIEW_UNIVERSITY_MESSAGE,
    }
};

