import {consultantSetupConstants} from '@cogent/action-module'

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
  CLEAR_CN_LIST_MESSAGE
} = consultantSetupConstants

const initialState = {
  createConsultantLoading: true,
  createConsultanterrorMessage: '', //departmentCreate error message
  createConsultantsuccessMessage: '',
  isSearchLoading: true,
  consultantList: [],
  searchErrorMessage: '',
  deleteErrorMessage: '',
  deleteSuccessMessage: '',
  isDeleteLoading: true,
  isConsultantEditLoading: true,
  consultantEditErrorMessage: '', //department edit error message
  consultantEditSuccessMessage: '',
  ConsultantPreviewData: null,
  isPreviewLoading: true,
  consultantPreviewErrorMessage: ''
}

export const ConsultantSaveReducer = (state = {...initialState}, action) => {
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

export const ConsultantEditReducer = (state = {...initialState}, action) => {
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

export const ConsultantPreviewReducer = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case CN_PREVIEW_PENDING:
      return {
        ...state,
        consultantPreviewData: null,
        iPreviewLoading: true,
        onsultantPreviewErrorMessage: ''
      }
    case CN_PREVIEW_SUCCESS:
      return {
        ...state,
        consultantPreviewData: action.payload.data,
        iPreviewLoading: false,
        consultantPreviewErrorMessage: ''
      }
    case CN_PREVIEW_ERROR:
      return {
        ...state,
        consultantPreviewData: null,
        iPreviewLoading: false,
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

export const ConsultantSearchReducer = (
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

export const ConsultantDeleteReducer = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case CN_DELETE_PENDING:
      return {
        ...state,
        isDeleteLoading: true,
        deleteErrorMessage: '',
        deleteSuccessMessage:'',
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
        deleteSuccessMessage:'',
      }
    default:
      return {
        ...state
      }
  }
}
