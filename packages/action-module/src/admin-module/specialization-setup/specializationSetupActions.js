import {specializationSetupConstants} from './specializationSetupConstant'

const {
    CREATE_SP_ERROR,
    CREATE_SP_PENDING,
    CREATE_SP_SUCCESS,
    CLEAR_SP_CREATE_MESSAGE,
    CLEAR_SP_EDIT_MESSAGE,
    CLEAR_SP_PREVIEW_MESSAGE,
    CLEAR_SP_DELETE_MESSAGE,
    SP_DELETE_ERROR,
    SP_DELETE_PENDING,
    SP_DELETE_SUCCESS,
    SP_EDIT_ERROR,
    SP_EDIT_PENDING,
    SP_EDIT_SUCCESS,
    SP_LIST_ERROR,
    SP_LIST_PENDING,
    SP_LIST_SUCCESS,
    SP_PREVIEW_ERROR,
    SP_PREVIEW_PENDING,
    SP_PREVIEW_SUCCESS,
    CLEAR_SP_LIST_MESSAGE,
    FETCH_ACTIVE_SPECIALIZATION_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_SPECIALIZATION_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_SPECIALIZATION_HOSPITAL_WISE_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_SPECIALIZATION_HOSPITAL_WISE_FOR_DROPDOWN_SUCCESS
} = specializationSetupConstants;

export const clearSpecializationCreateMessage = () => {
    return {
        type: CLEAR_SP_CREATE_MESSAGE
    }
}

export const createSpecializationSuccess = data => {
    return {
        type: CREATE_SP_SUCCESS,
        payload: {
            status: 'S',
            message: 'Specialization Created Successfully'
        }
    }
}

export const createSpecializationPending = () => {
    return {
        type: CREATE_SP_PENDING,
        payload: {
            message: 'Loading',
            status: 'P'
        }
    }
}

export const createSpecializationError = message => {
    return {
        type: CREATE_SP_ERROR,
        payload: {
            message: message,
            status: 'E'
        }
    }
}

export const clearSpecializationEditMessage = () => {
    return {
        type: CLEAR_SP_EDIT_MESSAGE
    }
}

export const createSpecializationEditSuccess = data => {
    return {
        type: SP_EDIT_SUCCESS,
        payload: {
            status: 'S',
            message: 'Specialization Modified Successfully'
        }
    }
}

export const createSpecializationEditError = message => {
    return {
        type: SP_EDIT_ERROR,
        payload: {
            message: message,
            status: 'E'
        }
    }
}

export const createSpecializationEditPending = () => {
    return {
        type: SP_EDIT_PENDING,
        payload: {
            message: 'Loading',
            status: 'P'
        }
    }
}

export const clearSpecializationListMessage = () => {
    return {
        type: CLEAR_SP_LIST_MESSAGE
    }
}

export const createSpecializationSearchSuccess = data => {
    return {
        type: SP_LIST_SUCCESS,
        payload: {
            status: 'S',
            data
        }
    }
}

export const createSpecializationSearchPending = () => {
    return {
        type: SP_LIST_PENDING,
        payload: {
            data: [],
            status: 'P'
        }
    }
}

export const createSpecializationListError = message => {
    return {
        type: SP_LIST_ERROR,
        payload: {
            message,
            status: 'E'
        }
    }
}

export const clearSpecializationPreviewMessage = () => {
    return {
        type: CLEAR_SP_PREVIEW_MESSAGE
    }
}

export const createSpecializationPreviewSuccess = data => {
    return {
        type: SP_PREVIEW_SUCCESS,
        payload: {
            status: 'S',
            data
        }
    }
}

export const createSpecializationPreviewPending = () => {
    return {
        type: SP_PREVIEW_PENDING,
        payload: {
            data: null,
            status: 'P'
        }
    }
}

export const createSpecializationPreviewError = message => {
    return {
        type: SP_PREVIEW_ERROR,
        payload: {
            message,
            status: 'E'
        }
    }
}

export const clearSpecializationDeleteMessage = () => {
    return {
        type: CLEAR_SP_DELETE_MESSAGE
    }
}

export const createSpecializationDeleteSucess = () => {
    return {
        type: SP_DELETE_SUCCESS,
        payload: {
            status: 'S',
            message: 'Specialization Deleted SucessFully'
        }
    }
}

export const createSpecializationDeletePending = () => {
    return {
        type: SP_DELETE_PENDING,
        payload: {
            status: 'P'
        }
    }
}

export const createSpecializationDeleteError = message => {
    return {
        type: SP_DELETE_ERROR,
        payload: {
            message,
            status: 'E'
        }
    }
}

export const fetchActiveSpecializationForDropdownSuccess = data => {
    return {
        type: FETCH_ACTIVE_SPECIALIZATION_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveSpecializationForDropdownError = errorMessage => {
    return {
        type: FETCH_ACTIVE_SPECIALIZATION_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const fetchActiveSpecializationHospitalWiseForDropdownSuccess = data => {
    return {
        type: FETCH_ACTIVE_SPECIALIZATION_HOSPITAL_WISE_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveSpecializationHospitalWiseForDropdownError = errorMessage => {
    return {
        type: FETCH_ACTIVE_SPECIALIZATION_HOSPITAL_WISE_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};
