import {companyAdminSetupActionConstants} from './companyAdminSetupActionConstant'

const {
  //COMPANY_ADMIN_CLEAR_MESSAGES,
  COMPANY_ADMIN_CREATE_ERROR,
  COMPANY_ADMIN_CREATE_SUCCESS,
  COMPANY_ADMIN_CREATE_PENDING,
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
  FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_SUCCESS
  
} = companyAdminSetupActionConstants

export const createCompanyAdminPending = () => {
  return {
    type: COMPANY_ADMIN_CREATE_PENDING
  }
}

export const creatingCompanyAdminSuccess = message => {
  return {
    type: COMPANY_ADMIN_CREATE_SUCCESS,
    payload: {
      message: message
    }
  }
}

export const creatingCompanyAdminError = message => {
  return {
    type: COMPANY_ADMIN_CREATE_ERROR,
    payload: {
      message: message
    }
  }
}

export const companyAdminListSuccess = data => {
  return {
    type: COMPANY_ADMIN_LIST_SUCCESS,
    payload: {
      data
    }
  }
}

export const companyAdminListError = message => {
  return {
    type: COMPANY_ADMIN_LIST_ERROR,
    payload: {
      message: message
    }
  }
}

export const companyAdminListPending = () => {
  return {
    type: COMPANY_ADMIN_LIST_PENDING
  }
}

export const companyAdminDeletePending = () => {
  return {
    type: COMPANY_ADMIN_DELETE_PENDING
  }
}

export const companyAdminDeleteSuccess = message => {
  return {
    type: COMPANY_ADMIN_DELETE_SUCCESS,
    payload: {
      message: message
    }
  }
}

export const companyAdminDeleteError = message => {
  return {
    type: COMPANY_ADMIN_DELETE_ERROR,
    payload: {
      message: message
    }
  }
}

export const companyAdminEditError = message => {
  return {
    type: COMPANY_ADMIN_EDIT_ERROR,
    payload: {
      message: message
    }
  }
}

export const companyAdminEditSuccess = message => {
  return {
    type: COMPANY_ADMIN_EDIT_SUCCESS,
    payload: {
      message: message
    }
  }
}

export const companyAdminEditPending = () => {
  return {
    type: COMPANY_ADMIN_EDIT_PENDING
  }
}

// export const clearCompanyAdminEditSuccessMessage = () => {
//     return {
//         type: CLEAR_COMPANY_ADMIN_EDIT_SUCCESS_MESSAGE
//     }
// };

// export const clearCompanyAdminEditErrorMessage = () => {
//     return {
//         type: CLEAR_COMPANY_ADMIN_EDIT_ERROR_MESSAGE
//     }
// };

export const companyAdminPreviewPending = () => {
  return {
    type: COMPANY_ADMIN_PREVIEW_PENDING
  }
}

export const companyAdminPreviewSuccess = data => {
  return {
    type: COMPANY_ADMIN_PREVIEW_SUCCESS,
    payload: {
      data
    }
  }
}

export const companyAdminPreviewError = message => {
  return {
    type: COMPANY_ADMIN_PREVIEW_ERROR,
    payload: {
      message: message
    }
  }
}

export const companyAdminMetaInfoFetchPending = () => {
  return {
    type: FETCH_COMPANY_ADMIN_META_INFO_PENDING
  }
}

export const companyAdminMetaInfoFetchSuccess = data => {
  return {
    type: FETCH_COMPANY_ADMIN_META_INFO_SUCCESS,
    payload: {
      data
    }
  }
}

export const companyAdminMetaInfoFetchError = message => {
  return {
    type: FETCH_COMPANY_ADMIN_META_INFO_ERROR,
    payload: {
      message: message
    }
  }
}

export const companyAdminMetaInfoByCompanyIdFetchPending = () => {
  return {
    type: FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_PENDING
  }
}

export const companyAdminMetaInfoCompanyIdFetchSuccess = data => {
  return {
    type: FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_SUCCESS,
    payload: {
      data
    }
  }
}

export const companyAdminMetaInfoCompanyIdFetchError = message => {
  return {
    type: FETCH_COMPANY_ADMIN_META_INFO_WITH_COMPANY_ID_ERROR,
    payload: {
      message: message
    }
  }
}
