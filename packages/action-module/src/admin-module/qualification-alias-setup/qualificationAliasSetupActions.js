import {qualificationAliasSetupConstants} from './qualificationAliasSetupConstants';

const {
    SAVE_QUALIFICATION_ALIAS_PENDING,
    SAVE_QUALIFICATION_ALIAS_SUCCESS,
    SAVE_QUALIFICATION_ALIAS_ERROR,
    CLEAR_SAVE_QUALIFICATION_ALIAS_MESSAGE,
    EDIT_QUALIFICATION_ALIAS_PENDING,
    EDIT_QUALIFICATION_ALIAS_SUCCESS,
    EDIT_QUALIFICATION_ALIAS_ERROR,
    CLEAR_EDIT_QUALIFICATION_ALIAS_MESSAGE,
    DELETE_QUALIFICATION_ALIAS_PENDING,
    DELETE_QUALIFICATION_ALIAS_SUCCESS,
    DELETE_QUALIFICATION_ALIAS_ERROR,
    CLEAR_DELETE_QUALIFICATION_ALIAS_MESSAGE,
    SEARCH_QUALIFICATION_ALIAS_PENDING,
    SEARCH_QUALIFICATION_ALIAS_SUCCESS,
    SEARCH_QUALIFICATION_ALIAS_ERROR,
    CLEAR_SEARCH_QUALIFICATION_ALIAS_MESSAGE,
    FETCH_QUALIFICATION_ALIAS_PENDING,
    FETCH_QUALIFICATION_ALIAS_SUCCESS,
    FETCH_QUALIFICATION_ALIAS_ERROR,
} = qualificationAliasSetupConstants;

export const saveQualificationAliasPending = () => {
    return {
        type: SAVE_QUALIFICATION_ALIAS_PENDING,
    }
};

export const saveQualificationAliasSuccess = (successMessage) => {
    return {
        type: SAVE_QUALIFICATION_ALIAS_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const saveQualificationAliasError = (errorMessage) => {
    return {
        type: SAVE_QUALIFICATION_ALIAS_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSaveQualificationAliasMessage = () => {
    return {
        type: CLEAR_SAVE_QUALIFICATION_ALIAS_MESSAGE,
    }
};

export const editQualificationAliasPending = () => {
    return {
        type: EDIT_QUALIFICATION_ALIAS_PENDING,
    }
};

export const editQualificationAliasSuccess = (successMessage) => {
    return {
        type: EDIT_QUALIFICATION_ALIAS_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const editQualificationAliasError = (errorMessage) => {
    return {
        type: EDIT_QUALIFICATION_ALIAS_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearEditQualificationAliasMessage = () => {
    return {
        type: CLEAR_EDIT_QUALIFICATION_ALIAS_MESSAGE,
    }
};

export const deleteQualificationAliasPending = () => {
    return {
        type: DELETE_QUALIFICATION_ALIAS_PENDING,
    }
};

export const deleteQualificationAliasSuccess = (successMessage) => {
    return {
        type: DELETE_QUALIFICATION_ALIAS_SUCCESS,
        payload: {
            message: successMessage
        }
    }
};

export const deleteQualificationAliasError = (errorMessage) => {
    return {
        type: DELETE_QUALIFICATION_ALIAS_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearDeleteQualificationAliasMessage = () => {
    return {
        type: CLEAR_DELETE_QUALIFICATION_ALIAS_MESSAGE,
    }
};

export const searchQualificationAliasPending = () => {
    return {
        type: SEARCH_QUALIFICATION_ALIAS_PENDING,
    }
};

export const searchQualificationAliasSuccess = (data) => {
    return {
        type: SEARCH_QUALIFICATION_ALIAS_SUCCESS,
        payload: {
            data
        }
    }
};

export const searchQualificationAliasError = (errorMessage) => {
    return {
        type: SEARCH_QUALIFICATION_ALIAS_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

export const clearSearchQualificationAliasMessage = () => {
    return {
        type: CLEAR_SEARCH_QUALIFICATION_ALIAS_MESSAGE,
    }
};

export const fetchQualificationAliasPending = () => {
    return {
        type: FETCH_QUALIFICATION_ALIAS_PENDING
    }
};

export const fetchQualificationAliasSuccess = (data) => {
    return {
        type: FETCH_QUALIFICATION_ALIAS_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchQualificationAliasError = (errorMessage) => {
    return {
        type: FETCH_QUALIFICATION_ALIAS_ERROR,
        payload: {
            message: errorMessage
        }
    }
};

