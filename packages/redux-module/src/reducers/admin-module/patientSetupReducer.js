import {patientDetailsConstants} from '@frontend-appointment/action-module'

const {
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR,
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS,
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_START,
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR_WITHOUT_HOSPITAL_ID,
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_START_WITHOUT_HOSPITAL_ID,
  PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS_WITHOUT_HOSPITAL_ID,
  PATIENT_CLEAR_DROPDOWN_META,
  CLEAR_PATIENT_EDIT_MESSAGE,
  CLEAR_PATIENT_PREVIEW_MESSAGE,
  PATIENT_EDIT_ERROR,
  PATIENT_EDIT_PENDING,
  PATIENT_EDIT_SUCCESS,
  PATIENT_LIST_ERROR,
  PATIENT_LIST_PENDING,
  PATIENT_LIST_SUCCESS,
  PATIENT_PREVIEW_ERROR,
  PATIENT_PREVIEW_PENDING,
  PATIENT_PREVIEW_SUCCESS
} = patientDetailsConstants

const initialState = {
  patientList: [],
  patientDropdownErrorMessage: ''
}

const dropdownWithoutHospital = {
  patientListWithoutHospitalDropdown: [],
  patientListWithoutHospitalDropdownErrorMessage: ''
}

const searchState = {
  patientSearchList: [],
  isPatientSearchLoading: true,
  patientSearchErrorMessage: ''
}

const editState = {
  patientSuccessMessage: '',
  isPatientEditLoading: true,
  patientEditErrorMessage: ''
}

const previewState = {
  patientPreviewData: null,
  isPatientPreviewLoading: true,
  patientPreviewErrorMessage: ''
}

export const PatientDropdownListReducer = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case PATIENT_ACTIVE_DROPDOWN_META_FETCH_START:
      return {
        ...state,
        patientList: [],
        patientDropdownErrorMessage: ''
      }
    case PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS:
      return {
        ...state,
        patientList: [...action.payload.data],
        patientDropdownErrorMessage: ''
      }
    case PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR:
      return {
        ...state,
        patientList: [],
        patientDropdownErrorMessage: action.payload.data
      }
    case PATIENT_CLEAR_DROPDOWN_META:
      return {
        ...state,
        patientDropdownErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const PatientDropdownWithoutHospitalListReducer = (
  state = {...dropdownWithoutHospital},
  action
) => {
  switch (action.type) {
    case PATIENT_ACTIVE_DROPDOWN_META_FETCH_START_WITHOUT_HOSPITAL_ID:
      return {
        patientListWithoutHospitalDropdown: [],
        patientListWithoutHospitalDropdownErrorMessage: '',
        ...state
      }
    case PATIENT_ACTIVE_DROPDOWN_META_FETCH_SUCCESS_WITHOUT_HOSPITAL_ID:
      return {
        patientListWithoutHospitalDropdown: action.payload.data,
        patientListWithoutHospitalDropdownErrorMessage: '',
        ...state
      }
    case PATIENT_ACTIVE_DROPDOWN_META_FETCH_ERROR_WITHOUT_HOSPITAL_ID:
      return {
        ...state,
        patientListWithoutHospitalDropdown: [],
        patientListWithoutHospitalDropdownErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const PatientSearchReducer = (state = {...searchState}, action) => {
  switch (action.type) {
    case PATIENT_LIST_PENDING:
      return {
        ...state,
        patientSearchList: [],
        isPatientSearchLoading: true,
        patientSearchErrorMessage: ''
      }
    case PATIENT_LIST_SUCCESS:
      return {
        ...state,
        patientSearchList: action.payload.data,
        isPatientSearchLoading: false,
        patientSearchErrorMessage: ''
      }
    case PATIENT_LIST_ERROR:
      return {
        ...state,
        patientSearchList: [],
        isPatientSearchLoading: false,
        patientSearchErrorMessage: action.payload.data
      }
    default:
      return {...state}
  }
}

export const PatientEditReducer = (state = {...editState}, action) => {
  switch (action.type) {
    case PATIENT_EDIT_PENDING:
      return {
        ...state,
        patientSuccessMessage: '',
        isPatientEditLoading: true,
        patientEditErrorMessage: ''
      }
    case PATIENT_EDIT_SUCCESS:
      return {
        ...state,
        patientSuccessMessage: 'Patiend Updated Successfully!!',
        isPatientEditLoading: false,
        patientEditErrorMessage: ''
      }
    case PATIENT_EDIT_ERROR:
      return {
        ...state,
        patientSuccessMessage: '',
        isPatientEditLoading: false,
        patientEditErrorMessage: action.payload.data
      }
    case CLEAR_PATIENT_EDIT_MESSAGE:
      return {
        ...state,
        patientEditErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const PatientPreviewReducer = (state = {...previewState}, action) => {
  switch (action.type) {
    case PATIENT_PREVIEW_PENDING:
      return {
        ...state,
        patientPreviewData: null,
        isPatientPreviewLoading: true,
        patientPreviewErrorMessage: ''
      }
    case PATIENT_PREVIEW_SUCCESS:
      return {
        ...state,
        patientPreviewData: action.payload.data,
        isPatientPreviewLoading: false,
        patientPreviewErrorMessage: ''
      }
    case PATIENT_PREVIEW_ERROR:
      return {
        ...state,
        patientPreviewData: null,
        isPatientPreviewLoading: false,
        patientPreviewErrorMessage: action.payload.data
      }
    case CLEAR_PATIENT_PREVIEW_MESSAGE:
      return {
        ...state,
        patientPreviewErrorMessage: ''
      }
    default:
      return {...state}
  }
}
