import {doctorSetupConstants} from '@frontend-appointment/action-module'

const {
    CREATE_CN_ERROR,
    CREATE_CN_PENDING,
    CREATE_CN_SUCCESS,
    CLEAR_CN_CREATE_MESSAGE,
    CN_EDIT_ERROR,
    CN_EDIT_PENDING,
    CN_EDIT_SUCCESS,
    CLEAR_CN_EDIT_MESSAGE,
    CN_DELETE_ERROR,
    CN_DELETE_PENDING,
    CN_DELETE_SUCCESS,
    CLEAR_CN_DELETE_MESSAGE,
    CN_PREVIEW_ERROR,
    CN_PREVIEW_SUCCESS,
    CN_PREVIEW_PENDING,
    CLEAR_CN_PREVIEW_MESSAGE,
    CN_LIST_ERROR,
    CN_LIST_PENDING,
    CN_LIST_SUCCESS,
    CLEAR_CN_LIST_MESSAGE,
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN_SUCCESS,
    FETCH_DOCTORS_BY_SPECIALIZATION_FOR_DROPDOWN_SUCCESS,
    FETCH_DOCTORS_BY_SPECIALIZATION_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_DOCTORS_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_DOCTORS_BY_HOSPITAL_FOR_DROPDOWN_ERROR,
    FETCH_ALL_DOCTORS_FOR_DROPDOWN_SUCCESS,
    FETCH_ALL_DOCTORS_FOR_DROPDOWN_PENDING,
    FETCH_ALL_DOCTORS_FOR_DROPDOWN_ERROR,
    FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT_FOR_DROPDOWN_SUCCESS,
    FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT_FOR_DROPDOWN_PENDING,
    FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT_FOR_DROPDOWN_ERROR
} = doctorSetupConstants;

const initialState = {
    createConsultantLoading: false,
    createConsultanterrorMessage: '', //departmentCreate error message
    createConsultantsuccessMessage: '',
    isSearchLoading: true,
    consultantList: [],
    searchErrorMessage: '',
    deleteErrorMessage: '',
    deleteSuccessMessage: '',
    isDeleteLoading: true,
    isConsultantEditLoading: false,
    consultantEditErrorMessage: '', //department edit error message
    consultantEditSuccessMessage: '',
    consultantPreviewData: null,
    isPreviewLoading: true,
    consultantPreviewErrorMessage: '',
    activeDoctorsForDropdown: [],
    doctorsBySpecializationForDropdown: [],
    activeDoctorsByHospitalForDropdown: [],
    doctorDropdownErrorMessage: '',
    isAllDoctorDropdownPending: false,
    allDoctorsForDropdown: [],
    allDoctorDropdownErrorMessage: '',
    isActiveDoctorFetchByDepartmentPending: false,
    activeDoctorsByDepartment: [],
    activeDoctorsByDepartmentErrorMessage: ''
};

export const DoctorSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case CREATE_CN_PENDING:
            return {
                ...state,
                createConsultantLoading: true,
                createConsultanterrorMessage: '',
                createConsultantsuccessMessage: ''
            }
        case CREATE_CN_SUCCESS:
            return {
                ...state,
                createConsultantLoading: false,
                createConsultanterrorMessage: '',
                createConsultantsuccessMessage: action.payload.message
            }
        case CREATE_CN_ERROR:
            return {
                ...state,
                createConsultantLoading: false,
                createConsultanterrorMessage: action.payload.message,
                createConsultantsuccessMessage: ''
            }
        case CLEAR_CN_CREATE_MESSAGE:
            return {
                ...state,
                createConsultantLoading: false,
                createConsultanterrorMessage: '',
                createConsultantsuccessMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const DoctorEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case CN_EDIT_PENDING:
            return {
                ...state,
                isConsultantEditLoading: true,
                consultantEditErrorMessage: '',
                consultantEditSuccessMessage: ''
            }
        case CN_EDIT_SUCCESS:
            return {
                ...state,
                isConsultantEditLoading: false,
                consultantEditErrorMessage: '', //department edit error message
                consultantEditSuccessMessage: action.payload.message
            }
        case CN_EDIT_ERROR:
            return {
                ...state,
                isConsultantEditLoading: false,
                consultantEditErrorMessage: action.payload.message,
                consultantEditSuccessMessage: ''
            }
        case CLEAR_CN_EDIT_MESSAGE:
            return {
                ...state,
                isConsultantEditLoading: false,
                consultantEditErrorMessage: '',
                consultantEditSuccessMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const DoctorPreviewReducer = (
    state = {...initialState},
    action
) => {
    switch (action.type) {
        case CN_PREVIEW_PENDING:
            return {
                ...state,
                consultantPreviewData: null,
                isPreviewLoading: true,
                onsultantPreviewErrorMessage: ''
            }
        case CN_PREVIEW_SUCCESS:
            return {
                ...state,
                consultantPreviewData: action.payload.data,
                isPreviewLoading: false,
                consultantPreviewErrorMessage: ''
            }
        case CN_PREVIEW_ERROR:
            return {
                ...state,
                consultantPreviewData: null,
                isPreviewLoading: false,
                consultantPreviewErrorMessage: action.payload.message
            }
        case CLEAR_CN_PREVIEW_MESSAGE:
            return {
                ...state,
                consultantPreviewData: null,
                isPreviewLoading: false,
                consultantPreviewErrorMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const DoctorSearchReducer = (
    state = {...initialState},
    action
) => {
    switch (action.type) {
        case CN_LIST_PENDING:
            return {
                ...state,
                isSearchLoading: true,
                consultantList: [],
                searchErrorMessage: ''
            }
        case CN_LIST_SUCCESS:
            return {
                ...state,
                isSearchLoading: false,
                consultantList: action.payload.data,
                searchErrorMessage: ''
            }
        case CN_LIST_ERROR:
            return {
                ...state,
                isSearchLoading: false,
                consultantList: [],
                searchErrorMessage: action.payload.message
            }
        case CLEAR_CN_LIST_MESSAGE:
            return {
                ...state,
                isSearchLoading: false,
                searchErrorMessage: ''
            }
        default:
            return {
                ...state
            }
    }
}

export const DoctorDeleteReducer = (
    state = {...initialState},
    action
) => {
    switch (action.type) {
        case CN_DELETE_PENDING:
            return {
                ...state,
                isDeleteLoading: true,
                deleteErrorMessage: '',
                deleteSuccessMessage: '',
            }
        case CN_DELETE_SUCCESS:
            return {
                ...state,
                isDeleteLoading: false,
                deleteErrorMessage: '',
                deleteSuccessMessage: action.payload.message,
            }
        case CN_DELETE_ERROR:
            return {
                ...state,
                isDeleteLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            }
        case CLEAR_CN_DELETE_MESSAGE:
            return {
                ...state,
                isDeleteLoading: false,
                deleteErrorMessage: '',
                deleteSuccessMessage: '',
            }
        default:
            return {
                ...state
            }
    }
};

export const DoctorDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                activeDoctorsForDropdown: [...action.payload.data],
                doctorDropdownErrorMessage: '',
            };
        case FETCH_ACTIVE_DOCTORS_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                activeDoctorsForDropdown: [],
                doctorDropdownErrorMessage: action.payload.errorMessage,
            };
        case FETCH_DOCTORS_BY_SPECIALIZATION_FOR_DROPDOWN_SUCCESS:
            // console.log('Doctor By Specializaiton',action.payload.data)
            return {
                ...state,
                doctorsBySpecializationForDropdown: [...action.payload.data],
                doctorDropdownErrorMessage: '',
            };
        case FETCH_DOCTORS_BY_SPECIALIZATION_FOR_DROPDOWN_ERROR:

            return {
                ...state,
                doctorsBySpecializationForDropdown: [],
                doctorDropdownErrorMessage: action.payload.errorMessage,
            };
        case FETCH_ACTIVE_DOCTORS_BY_HOSPITAL_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                activeDoctorsByHospitalForDropdown: [...action.payload.data],
                doctorDropdownErrorMessage: '',
            };
        case FETCH_ACTIVE_DOCTORS_BY_HOSPITAL_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                activeDoctorsByHospitalForDropdown: [],
                doctorDropdownErrorMessage: action.payload.errorMessage,
            };
        case FETCH_ALL_DOCTORS_FOR_DROPDOWN_PENDING:
            return {
                ...state,
                isAllDoctorDropdownPending: true,
                allDoctorsForDropdown: [],
                allDoctorDropdownErrorMessage: ''
            };
        case FETCH_ALL_DOCTORS_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                isAllDoctorDropdownPending: false,
                allDoctorsForDropdown: [...action.payload.data],
                allDoctorDropdownErrorMessage: ''
            };
        case FETCH_ALL_DOCTORS_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                isAllDoctorDropdownPending: false,
                allDoctorsForDropdown: [],
                allDoctorDropdownErrorMessage: action.payload.errorMessage
            };
        case FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT_FOR_DROPDOWN_PENDING:
            return {
                ...state,
                isActiveDoctorFetchByDepartmentPending: true,
                activeDoctorsByDepartment: [],
                activeDoctorsByDepartmentErrorMessage: ''
            };
        case FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT_FOR_DROPDOWN_SUCCESS:
            return {
                ...state,
                isActiveDoctorFetchByDepartmentPending: false,
                activeDoctorsByDepartment: [...action.payload.data],
                activeDoctorsByDepartmentErrorMessage: ''
            };
        case FETCH_ACTIVE_DOCTORS_BY_DEPARTMENT_FOR_DROPDOWN_ERROR:
            return {
                ...state,
                isActiveDoctorFetchByDepartmentPending: false,
                activeDoctorsByDepartment: [],
                activeDoctorsByDepartmentErrorMessage: action.payload.errorMessage
            };
        default:
            return {
                ...state
            }
    }
};
