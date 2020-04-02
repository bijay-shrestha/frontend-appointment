import {companyAdminSetupActionConstants} from "./companyAdminSetupActionConstant";

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
   FETCH_COMPANY_ADMIN_META_INFO_SUCCESS
} = companyAdminSetupActionConstants;


export const createCompanyAdminPending = () => {
    return {
        type: COMPANY_ADMIN_CREATE_PENDING
    }
};

export const creatingCompanyAdminSuccess = message => {
    return {
        type: COMPANY_ADMIN_CREATE_SUCCESS,
        payload: {
            successMessage: message
        }
    }
};

export const creatingCompanyAdminError = message => {
    return {
        type: COMPANY_ADMIN_CREATE_ERROR,
        payload: {
            errorMessage: message
        }
    }
};

export const companyAdminListSuccess = message => {
    return {
        type: COMPANY_ADMIN_LIST_SUCCESS,
        payload: {
            data: message
        }
    }
};

export const companyAdminListError = message => {
    return {
        type: COMPANY_ADMIN_LIST_ERROR,
        payload: {
            data: message
        }
    }
};

export const companyAdminListPending = () => {
    return {
        type: COMPANY_ADMIN_LIST_PENDING,
        payload: {
            data: []
        }
    }
};



export const companyAdminDeletePending = () => {
    return {
        type: COMPANY_ADMIN_DELETE_PENDING,
        payload: {
            data: []
        }
    }
};

export const companyAdminDeleteSuccess = success => {
    return {
        type: COMPANY_ADMIN_DELETE_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const companyAdminDeleteError = errorMessage => {
    return {
        type: COMPANY_ADMIN_DELETE_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const companyAdminEditError = errorMessage => {
    return {
        type: COMPANY_ADMIN_EDIT_ERROR,
        payload: {
            data: errorMessage
        }
    }
};

export const companyAdminEditSuccess = success => {
    return {
        type: COMPANY_ADMIN_EDIT_SUCCESS,
        payload: {
            data: success
        }
    }
};

export const companyAdminEditPending = () => {
    return {
        type: COMPANY_ADMIN_EDIT_PENDING,
        payload: {
            data: ''
        }
    }
};

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
        type: COMPANY_ADMIN_PREVIEW_PENDING,
        payload: {
            data: ''
        }
    }
};

export const companyAdminPreviewSuccess = data => {
    return {
        type: COMPANY_ADMIN_PREVIEW_SUCCESS,
        payload: {
            data
        }
    }
};

export const companyAdminPreviewError = errorMsg => {
    return {
        type: COMPANY_ADMIN_PREVIEW_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

export const companyAdminMetaInfoFetchPending = () => {
    return {
        type: FETCH_COMPANY_ADMIN_META_INFO_PENDING
    }
};

export const companyAdminMetaInfoFetchSuccess = data => {
    return {
        type: FETCH_COMPANY_ADMIN_META_INFO_SUCCESS,
        payload: {
            data
        }
    }
};

export const companyAdminMetaInfoFetchError = errorMsg => {
    return {
        type: FETCH_COMPANY_ADMIN_META_INFO_ERROR,
        payload: {
            errorMessage: errorMsg
        }
    }
};

