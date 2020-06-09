import {doctorSetupConstants} from './doctorSetupConstant'

const {
    CREATE_CN_ERROR,
    CREATE_CN_PENDING,
    CREATE_CN_SUCCESS,
    CLEAR_CN_CREATE_MESSAGE,
    CLEAR_CN_EDIT_MESSAGE,
    CLEAR_CN_PREVIEW_MESSAGE,
    CLEAR_CN_DELETE_MESSAGE,
    CN_DELETE_ERROR,
    CN_DELETE_PENDING,
    CN_DELETE_SUCCESS,
    CN_EDIT_ERROR,
    CN_EDIT_PENDING,
    CN_EDIT_SUCCESS,
    CN_LIST_ERROR,
    CN_LIST_PENDING,
    CN_LIST_SUCCESS,
    CN_PREVIEW_ERROR,
    CN_PREVIEW_PENDING,
    CN_PREVIEW_SUCCESS,
    CLEAR_CN_LIST_MESSAGE,
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN_SUCCESS,
    FETCH_DOCTORS_BY_SPECIALIZATION_FOR_DROPDOWN_SUCCESS,
    FETCH_DOCTORS_BY_SPECIALIZATION_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_DOCTORS_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_DOCTORS_BY_HOSPITAL_FOR_DROPDOWN_ERROR,
    FETCH_ALL_DOCTORS_FOR_DROPDOWN_ERROR,
    FETCH_ALL_DOCTORS_FOR_DROPDOWN_PENDING,
    FETCH_ALL_DOCTORS_FOR_DROPDOWN_SUCCESS
} = doctorSetupConstants;

export const clearConsultantCreateMessage = () => {
    return {
        type: CLEAR_CN_CREATE_MESSAGE
    }
};

export const createConsultantSuccess = () => {
    return {
        type: CREATE_CN_SUCCESS,
        payload: {
            status: 'S',
            message: 'Doctor Created Successfully'
        }
    }
}

export const createConsultantPending = () => {
    return {
        type: CREATE_CN_PENDING,
        payload: {
            message: 'Loading',
            status: 'P'
        }
    }
}

export const createConsultantError = message => {
    return {
        type: CREATE_CN_ERROR,
        payload: {
            message: message,
            status: 'E'
        }
    }
}

export const clearConsultantEditMessage = () => {
    return {
        type: CLEAR_CN_EDIT_MESSAGE
    }
}

export const createConsultantEditSuccess = data => {
    return {
        type: CN_EDIT_SUCCESS,
        payload: {
            status: 'S',
            message: 'Doctor Modified Successfully'
        }
    }
}

export const createConsultantEditError = message => {
    return {
        type: CN_EDIT_ERROR,
        payload: {
            message: message,
            status: 'E'
        }
    }
}

export const createConsultantEditPending = () => {
    return {
        type: CN_EDIT_PENDING,
        payload: {
            message: 'Loading',
            status: 'P'
        }
    }
}

export const clearConsultantListMessage = () => {
    return {
        type: CLEAR_CN_LIST_MESSAGE
    }
}

export const createConsultantSearchSuccess = data => {
    return {
        type: CN_LIST_SUCCESS,
        payload: {
            status: 'S',
            data
        }
    }
}

export const createConsultantSearchPending = () => {
    return {
        type: CN_LIST_PENDING,
        payload: {
            data: [],
            status: 'P'
        }
    }
}

export const createConsultantListError = message => {
    return {
        type: CN_LIST_ERROR,
        payload: {
            message,
            status: 'E'
        }
    }
}

export const clearConsultantPreviewMessage = () => {
    return {
        type: CLEAR_CN_PREVIEW_MESSAGE
    }
}

export const createConsultantPreviewSuccess = data => {
    return {
        type: CN_PREVIEW_SUCCESS,
        payload: {
            status: 'S',
            data
        }
    }
}

export const createConsultantPreviewPending = () => {
    return {
        type: CN_PREVIEW_PENDING,
        payload: {
            data: null,
            status: 'P'
        }
    }
}

export const createConsultantPreviewError = message => {
    return {
        type: CN_PREVIEW_ERROR,
        payload: {
            message,
            status: 'E'
        }
    }
}

export const clearConsultantDeleteMessage = () => {
    return {
        type: CLEAR_CN_DELETE_MESSAGE
    }
}

export const createConsultantDeleteSucess = () => {
    return {
        type: CN_DELETE_SUCCESS,
        payload: {
            status: 'S',
            message: 'Doctor Deleted SucessFully'
        }
    }
}

export const createConsultantDeletePending = () => {
    return {
        type: CN_DELETE_PENDING,
        payload: {
            status: 'P'
        }
    }
}

export const createConsultantDeleteError = message => {
    return {
        type: CN_DELETE_ERROR,
        payload: {
            message,
            status: 'E'
        }
    }
}

export const fetchActiveDoctorsForDropdownSuccess = data => {
    return {
        type: FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveDoctorsForDropdownError = errorMessage => {
    return {
        type: FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const fetchDoctorsBySpecializationForDropdownSuccess = data => {
    return {
        type: FETCH_DOCTORS_BY_SPECIALIZATION_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchDoctorsBySpecializationForDropdownError = errorMessage => {
    return {
        type: FETCH_DOCTORS_BY_SPECIALIZATION_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const fetchActiveDoctorsByHospitalForDropdownSuccess = data => {
    return {
        type: FETCH_ACTIVE_DOCTORS_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchActiveDoctorsByHospitalForDropdownError = errorMessage => {
    return {
        type: FETCH_ACTIVE_DOCTORS_BY_HOSPITAL_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const fetchAllDoctorsByHospitalForDropdownPending = () => {
    return {
        type: FETCH_ALL_DOCTORS_FOR_DROPDOWN_PENDING
    }
};

export const fetchAllDoctorsByHospitalForDropdownSuccess = data => {
    return {
        type: FETCH_ALL_DOCTORS_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchAllDoctorsByHospitalForDropdownError = errorMessage => {
    return {
        type: FETCH_ALL_DOCTORS_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
};
