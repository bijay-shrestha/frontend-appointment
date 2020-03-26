import {companySetupConstants} from '@frontend-appointment/action-module'
const {
  COMPANY_DROPDOWN_ERROR,
  COMPANY_DROPDOWN_PENDING,
  COMPANY_DROPDOWN_SUCCESS,
  COMPANY_PREVIEW_ERROR,
  COMPANY_PREVIEW_PENDING,
  COMPANY_PREVIEW_SUCCESS,
  SAVE_COMPANY_ERROR,
  SAVE_COMPANY_PENDING,
  SAVE_COMPANY_SUCCESS,
  SEARCH_COMPANY_ERROR,
  SEARCH_COMPANY_PENDING,
  SEARCH_COMPANY_SUCCESS,
  UPDATE_COMPANY_ERROR,
  UPDATE_COMPANY_PENDING,
  UPDATE_COMPANY_SUCCESS,
  DELETE_COMPANY_ERROR,
  DELETE_COMPANY_PENDING,
  DELETE_COMPANY_SUCCESS,
  CLEAR_DELETE_MESSAGE,
  CLEAR_EDIT_MESSAGE,
  CLEAR_PREVIEW_MESSAGE
} = companySetupConstants
const intialSaveCompany = {
  isCompanySaveLoading: true,
  companySaveSuccessMessage: '',
  companySaveErrorMessage: ''
}

const initialPreviewCompany = {
  isCompanyPreviewLoading: true,
  companyPreviewData: null,
  companySaveErrorMessage: ''
}

const initialUpdateCompany = {
  isCompanyEditLoading: true,
  companyEditSuccessMessage: '',
  companyEditErrorMessage: ''
}

const initialDeleteCompany = {
  isCompanyDeleteLoading: true,
  companyDeleteSuccessMessage: '',
  companyDeleteErrorMessage: ''
}

const initialSearchCompany = {
  isCompanySearchLoading: true,
  companySearchData: [],
  totalItems: [],
  companySearchErrorMessage: ''
}

const initialDropdownCompany = {
  isCompanyDropdownLoading: true,
  companyDropdownData: '',
  companyDropdownErrorMessage: ''
}

export const companySaveReducer = (state = {...intialSaveCompany}, action) => {
  switch (action.type) {
    case SAVE_COMPANY_PENDING:
      return {
        ...state
      }
    case SAVE_COMPANY_SUCCESS:
      return {
        isCompanySaveLoading: false,
        companySaveSuccessMessage: action.payload.message,
        companySaveErrorMessage: ''
      }
    case SAVE_COMPANY_ERROR:
      return {
        isCompanySaveLoading: false,
        companySaveSuccessMessage: '',
        companySaveErrorMessage: action.payload.message
      }
  }
}

export const companyUpdateReducer = (
  state = {...initialUpdateCompany},
  action
) => {
  switch (action.type) {
    case UPDATE_COMPANY_PENDING:
      return {
        ...state
      }
    case UPDATE_COMPANY_SUCCESS:
      return {
        isCompanyEditLoading: false,
        companyEditSuccessMessage: action.payload.message,
        companyEditErrorMessage: ''
      }
    case UPDATE_COMPANY_ERROR:
      return {
        isCompanyEditLoading: false,
        companyEditSuccessMessage: '',
        companyEditErrorMessage: action.payload.message
      }
    case CLEAR_EDIT_MESSAGE:
       return {
        companyEditSuccessMessage: '',
        companyEditErrorMessage: ''
       }  
      
  }
}

export const companyPreviewReducer = (
  state = {...initialPreviewCompany},
  action
) => {
  switch (action.type) {
    case COMPANY_PREVIEW_PENDING:
      return {
        ...state
      }
    case COMPANY_PREVIEW_SUCCESS:
      return {
        isCompanyPreviewLoading: false,
        companyPreviewData: action.payload.data,
        companyPreviewErrorMessage: ''
      }
    case COMPANY_PREVIEW_ERROR:
      return {
        isCompanyPreviewLoading: false,
        companyPreviewData: null,
        companyPreviewErrorMessage: action.payload.message
      }
     case CLEAR_PREVIEW_MESSAGE:
        return {
          companyPreviewData: null,
          companyPreviewErrorMessage:''
        } 
  }
}

export const companySearchReducer = (
  state = {...initialSearchCompany},
  action
) => {
  switch (action.type) {
    case SEARCH_COMPANY_PENDING:
      return {
        ...state
      }
    case SEARCH_COMPANY_SUCCESS:
      return {
        isCompanySearchLoading: false,
        companySearchData: action.payload.data,
        companySearchErrorMessage: ''
      }
    case SEARCH_COMPANY_ERROR:
      return {
        isCompanySearchLoading: false,
        companySearchData: null,
        companySearchErrorMessage: action.payload.message
      }
  }
}

export const companyDropdownReducer = (
    state = {...initialDropdownCompany},
    action
  ) => {
    switch (action.type) {
      case COMPANY_DROPDOWN_PENDING:
        return {
          ...state
        }
      case COMPANY_DROPDOWN_SUCCESS:
        return {
          isCompanyDropdownLoading: false,
          companyDropdownData: action.payload.data,
          companyDropdownErrorMessage: ''
        }
      case COMPANY_DROPDOWN_ERROR:
        return {
          isCompanyDropdownLoading: false,
          companyDropdownData: null,
          companyDropdownErrorMessage: action.payload.message
        }
    }
  }
  
  export const companyDeleteReducer = (state = {...initialDeleteCompany}, action) => {
    switch (action.type) {
      case DELETE_COMPANY_PENDING:
        return {
          ...state
        }
      case DELETE_COMPANY_SUCCESS:
        return {
          isCompanyDeleteLoading: false,
          companyDeleteSuccessMessage: action.payload.message,
          companyDeleteErrorMessage: ''
        }
      case DELETE_COMPANY_ERROR:
        return {
          isCompanyDeleteLoading: false,
          companyDeleteSuccessMessage: '',
          companyDeleteErrorMessage: action.payload.message
        }
       case CLEAR_DELETE_MESSAGE:
          return {
            companyDeleteErrorMessage:'',
            companyDeleteSuccessMessage:''
          } 
    }
  }