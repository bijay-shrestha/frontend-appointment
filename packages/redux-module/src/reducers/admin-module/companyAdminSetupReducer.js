import {companyAdminSetupActionConstants} from '@frontend-appointment/action-module'
const {
  COMPANY_ADMIN_CLEAR_EDIT_MESSAGES,
  COMPANY_ADMIN_CLEAR_PREVIEW_MESSAGES,
  COMPANY_ADMIN_CLEAR_DELETE_MESSAGES,
  COMPANY_ADMIN_CREATE_ERROR,
  COMPANY_ADMIN_CREATE_PENDING,
  COMPANY_ADMIN_CREATE_SUCCESS,
  COMPANY_ADMIN_DELETE_ERROR,
  COMPANY_ADMIN_DELETE_PENDING,
  COMPANY_ADMIN_DELETE_SUCCESS,
  COMPANY_ADMIN_EDIT_ERROR,
  COMPANY_ADMIN_EDIT_PENDING,
  COMPANY_ADMIN_EDIT_SUCCESS,
  COMPANY_ADMIN_LIST_ERROR,
  COMPANY_ADMIN_LIST_PENDING,
  COMPANY_ADMIN_LIST_SUCCESS,
  COMPANY_ADMIN_PREVIEW_ERROR,
  COMPANY_ADMIN_PREVIEW_PENDING,
  COMPANY_ADMIN_PREVIEW_SUCCESS,
  FETCH_COMPANY_ADMIN_META_INFO_ERROR,
  FETCH_COMPANY_ADMIN_META_INFO_PENDING,
  FETCH_COMPANY_ADMIN_META_INFO_SUCCESS,
  FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_ERROR,
  FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_PENDING,
  FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_SUCCESS,
  COMPANY_ADMIN_CLEAR_ADMIN_METADROPDOWN
} = companyAdminSetupActionConstants

const createCompanyAdminState = {
  isCreateAdminLoading:false,
  adminCreateErrorMessage: '', //profileCreate error message
  adminCreateSuccessMessage: ''
}
const searchCompanyAdminState = {
  isAdminSearchLoading: true,
  adminList: [],
  adminSearchErrorMessage: ''
}

const updateCompanyAdminState = {
  isAdminEditLoading: false,
  adminEditErrorMessage: '',
  adminEditSuccessMessage: ''
}

const previewCompanyAdminState = {
  isAdminPreviewLoading: true,
  adminPreviewErrorMessage: '',
  adminPreviewData:null
}
const deleteCompanyAdminState = {
  isDeleteCompanyLoading: true,
  adminDeleteErrorMessage: '',
  adminDeleteSuccessMessage: ''
}

const companyAdminMetaInfoDropDown = {
  companyAdminMetaInfoForDropdown: [],
  errorMessageForCompanyAdminDropdown: '',
  isLoadingForCompanyAdminDropdown: true
}

const companyAdminMetaInfoCompanyIdDropDown = {
  companyAdminMetaInfoByCompanyIdForDropdown: [],
  errorMessageForCompanyAdminByCompanyIdDropdown: '',
  isLoadingForCompanyAdminByCompanyIdDropdown: true
}

export const CompanyAdminMetaInfoReducer = (
  state = {...companyAdminMetaInfoDropDown},
  action
) => {
  switch (action.type) {
    case FETCH_COMPANY_ADMIN_META_INFO_PENDING:
      return {
        ...state
      }
    case FETCH_COMPANY_ADMIN_META_INFO_SUCCESS:
      return {
        ...state,
        companyAdminMetaInfoForDropdown: action.payload.data,
        errorMessageForCompanyAdminDropdown: '',
        isLoadingForCompanyAdminDropdown: false
      }
    case FETCH_COMPANY_ADMIN_META_INFO_ERROR:
      return {
        ...state,
        companyAdminMetaInfoForDropdown: [],
        errorMessageForCompanyAdminDropdown: action.payload.message,
        isLoadingForCompanyAdminDropdown: true
      }
    case COMPANY_ADMIN_CLEAR_ADMIN_METADROPDOWN:
      return {
        ...state,
        companyAdminMetaInfoDropDown: [],
        errorMessageForCompanyAdminDropdown: '',
        isLoadingForCompanyAdminDropdown: true
      }
    default:
      return state
  }
}

export const CompanyAdminMetaInfoByCompanyIdReducer = (
  state = {...companyAdminMetaInfoCompanyIdDropDown},
  action
) => {
  switch (action.type) {
    case FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_PENDING:
      return {
        ...state
      }
    case FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_SUCCESS:
      return {
        ...state,
        companyAdminMetaInfoByCompanyIdForDropdown:action.payload.data,
        errorMessageForCompanyAdminByCompanyIdDropdown: '',
        isLoadingForCompanyAdminByCompanyIdDropdown: false
      }
    case FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_ERROR:
      return {
        ...state,
        companyAdminMetaInfoByCompanyIdForDropdown: [],
        errorMessageForCompanyAdminByCompanyIdDropdown: action.payload.message,
        isLoadingForCompanyAdminByCompanyIdDropdown: false
      }
    case 'CLEAR_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID':
          return {
            companyAdminMetaInfoByCompanyIdForDropdown: [],
            errorMessageForCompanyAdminByCompanyIdDropdown:''
          }
    default:
      return state
  }
}

export const CompanyAdminSetupReducer = (
  state = {...createCompanyAdminState},
  action
) => {
  switch (action.type) {
    case COMPANY_ADMIN_CREATE_PENDING:
      return ({
        ...state,
        isCreateAdminLoading:true
      })
    case COMPANY_ADMIN_CREATE_SUCCESS:
      return {
        ...state,
        isCreateAdminLoading: false,
        adminCreateSuccessMessage: action.payload.message
      }

    case COMPANY_ADMIN_CREATE_ERROR:
      return {
        ...state,
        isCreateAdminLoading: false,
        adminCreateErrorMessage: action.payload.message
      }

    default:
      return {...state}
  }
}

export const CompanyAdminListReducer = (
  state = {...searchCompanyAdminState},
  action
) => {
  switch (action.type) {
    case COMPANY_ADMIN_LIST_PENDING:
      return {
        ...state,
        isAdminSearchLoading: true,
        adminList: [],
        adminSearchErrorMessage: ''
      }
    case COMPANY_ADMIN_LIST_SUCCESS:
      return {
        ...state,
        isAdminSearchLoading: false,
        adminList: [...action.payload.data],
        adminSearchErrorMessage: ''
      }
    case COMPANY_ADMIN_LIST_ERROR:
      return {
        ...state,
        adminList: [],
        isAdminSearchLoading: false,
        adminSearchErrorMessage: action.payload.message
      }

    default:
      return {...state}
  }
}

export const CompanyAdminDeleteReducer = (
  state = {...deleteCompanyAdminState},
  action
) => {
  switch (action.type) {
    case COMPANY_ADMIN_DELETE_PENDING:
      return {
        ...state
      }
    case COMPANY_ADMIN_DELETE_SUCCESS:
      return {
        ...state,
        isDeleteCompanyLoading: false,
        adminDeleteErrorMessage: '',
        adminDeleteSuccessMessage: action.payload.message
      }
    case COMPANY_ADMIN_DELETE_ERROR:
      return {
        ...state,
        isDeleteCompanyLoading: false,
        adminDeleteErrorMessage: action.payload.message,
        adminDeleteSuccessMessage: ''
      }
    case COMPANY_ADMIN_CLEAR_DELETE_MESSAGES:
      return {
        ...state,
        adminDeleteErrorMessage: '',
        adminDeleteSuccessMessage: ''
      }
    default:
      return {
        ...state
      }
  }
}

export const CompanyAdminEditReducer = (
  state = {...updateCompanyAdminState},
  action
) => {
  switch (action.type) {
    case COMPANY_ADMIN_EDIT_PENDING:
      return {
        ...state,
        isAdminEditLoading:true,
      }
    case COMPANY_ADMIN_EDIT_SUCCESS:
      return {
        ...state,
        isAdminEditLoading: false,
        adminEditErrorMessage: '',
        adminEditSuccessMessage: action.payload.message
      }
    case COMPANY_ADMIN_EDIT_ERROR:
      return {
        ...state,
        isAdminEditLoading: false,
        adminEditErrorMessage: action.payload.message,
        adminEditSuccessMessage: ''
      }
    case COMPANY_ADMIN_CLEAR_EDIT_MESSAGES:
      return {
        ...state,
        adminEditErrorMessage: '',
        adminEditSuccessMessage: ''
      }
    default:
      return {...state}
  }
}

export const CompanyAdminPreviewReducer = (
  state = {...previewCompanyAdminState},
  action
) => {
  switch (action.type) {
    case COMPANY_ADMIN_PREVIEW_PENDING:
      return {
        ...state
      }
    case COMPANY_ADMIN_PREVIEW_SUCCESS:
      return {
        ...state,
        isAdminPreviewLoading: false,
        adminPreviewErrorMessage: '',
        adminPreviewData: action.payload.data
      }
    case COMPANY_ADMIN_PREVIEW_ERROR:
      return {
        ...state,
        isAdminPreviewLoading: false,
        adminPreviewErrorMessage: action.payload.data,
        adminPreviewData: ''
      }
    case COMPANY_ADMIN_CLEAR_PREVIEW_MESSAGES:
      return {
        ...state,
        adminPreviewErrorMessage: ''
      }
    default:
      return {...state}
  }
}
