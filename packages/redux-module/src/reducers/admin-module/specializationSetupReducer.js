import {specializationSetupConstants} from '@frontend-appointment/action-module'

const {
  CREATE_SP_ERROR,
  CREATE_SP_PENDING,
  CREATE_SP_SUCCESS,
  CLEAR_SP_CREATE_MESSAGE,
  SP_EDIT_ERROR,
  SP_EDIT_PENDING,
  SP_EDIT_SUCCESS,
  CLEAR_SP_EDIT_MESSAGE,
  SP_DELETE_ERROR,
  SP_DELETE_PENDING,
  SP_DELETE_SUCCESS,
  CLEAR_SP_DELETE_MESSAGE,
  SP_PREVIEW_ERROR,
  SP_PREVIEW_SUCCESS,
  SP_PREVIEW_PENDING,
  CLEAR_SP_PREVIEW_MESSAGE,
  SP_LIST_ERROR,
  SP_LIST_PENDING,
  SP_LIST_SUCCESS,
  CLEAR_SP_LIST_MESSAGE
} = specializationSetupConstants

const initialState = {
  createSpecializationLoading: true,
  createSpecializationerrorMessage: '', //departmentCreate error message
  createSpecializationsuccessMessage: '',
  isSearchLoading: true,
  specializationList: [],
  searchErrorMessage: '',
  deleteErrorMessage: '',
  deleteSuccessMessage: '',
  isDeleteLoading: true,
  isSpecializationEditLoading: true,
  specializationEditErrorMessage: '', //department edit error message
  specializationEditSuccessMessage: '',
  specializationPreviewData: null,
  isPreviewLoading: true,
  specializationPreviewErrorMessage: ''
}

export const SpecializationSaveReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case CREATE_SP_PENDING:
      return {
        ...state,
        createSpecializationLoading: true,
        createSpecializationerrorMessage: '',
        createSpecializationsuccessMessage: ''
      }
    case CREATE_SP_SUCCESS:
      return {
        ...state,
        createSpecializationLoading: false,
        createSpecializationerrorMessage: '',
        createSpecializationsuccessMessage: action.payload.message
      }
    case CREATE_SP_ERROR:
      return {
        ...state,
        createSpecializationLoading: false,
        createSpecializationerrorMessage: action.payload.message,
        createSpecializationsuccessMessage: ''
      }
    case CLEAR_SP_CREATE_MESSAGE:
      return {
        ...state,
        createSpecializationLoading: false,
        createSpecializationerrorMessage: '',
        createSpecializationsuccessMessage: ''
      }
    default:
      return {
       ...state
      }
  }
}

export const SpecializationEditReducer = (state = {...initialState}, action) => {
  switch (action.type) {
    case SP_EDIT_PENDING:
      return {
        ...state,
        isSpecializationEditLoading: true,
        specializationEditErrorMessage: '',
        specializationEditSuccessMessage: ''
      }
    case SP_EDIT_SUCCESS:
      return {
        ...state,
        isSpecializationEditLoading: false,
        specializationEditErrorMessage: '', //department edit error message
        specializationEditSuccessMessage: action.payload.message
      }
    case SP_EDIT_ERROR:
      return {
        ...state,
        isSpecializationEditLoading: false,
        specializationEditErrorMessage: action.payload.message,
        specializationEditSuccessMessage: ''
      }
    case CLEAR_SP_EDIT_MESSAGE:
      return {
        ...state,
        isSpecializationEditLoading: false,
        specializationEditErrorMessage: '',
        specializationEditSuccessMessage: ''
      }
    default:
      return {
       ...state
      }
  }
}

export const SpecializationPreviewReducer = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case SP_PREVIEW_PENDING:
      return {
        ...state,
        specializationPreviewData: null,
        isPreviewLoading: true,
        specializationPreviewErrorMessage: ''
      }
    case SP_PREVIEW_SUCCESS:
      return {
        ...state,
        specializationPreviewData: action.payload.data,
        isPreviewLoading: false,
        specializationPreviewErrorMessage: ''
      }
    case SP_PREVIEW_ERROR:
      return {
        ...state,
        specializationPreviewData: null,
        isPreviewLoading: false,
        specializationPreviewErrorMessage: action.payload.message
      }
    case CLEAR_SP_PREVIEW_MESSAGE:
      return {
        ...state,
        specializationPreviewData: null,
        isPreviewLoading: false,
        specializationPreviewErrorMessage: ''
      }
    default:
      return {
       ...state
      }
  }
}

export const SpecializationSearchReducer = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case SP_LIST_PENDING:
      return {
        ...state,
        isSearchLoading: true,
        specializationList: [],
        searchErrorMessage: ''
      }
    case SP_LIST_SUCCESS:
      return {
        ...state,
        isSearchLoading: false,
        specializationList: action.payload.data,
        searchErrorMessage: ''
      }
    case SP_LIST_ERROR:
      return {
        ...state,
        isSearchLoading: false,
        specializationList: [],
        searchErrorMessage: action.payload.message
      }
    case CLEAR_SP_LIST_MESSAGE:
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

export const SpecializationDeleteReducer = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case SP_DELETE_PENDING:
      return {
        ...state,
        isDeleteLoading: true,
        deleteErrorMessage: '',
        deleteSuccessMessage:'',
      }
    case SP_DELETE_SUCCESS:
      return {
        ...state,
        isDeleteLoading: false,
        deleteErrorMessage: '',
        deleteSuccessMessage: action.payload.message,
      }
    case SP_DELETE_ERROR:
      return {
        ...state,
        isDeleteLoading: false,
        deleteErrorMessage: action.payload.message,
        deleteSuccessMessage: '',
      }
    case CLEAR_SP_DELETE_MESSAGE:
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
