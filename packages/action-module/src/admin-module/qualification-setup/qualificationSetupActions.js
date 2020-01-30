import {qualificationSetupConstants} from './qualificationSetupConstant'

const {
  CREATE_QF_ERROR,
  CREATE_QF_PENDING,
  CREATE_QF_SUCCESS,
  CLEAR_QF_CREATE_MESSAGE,
  CLEAR_QF_EDIT_MESSAGE,
  CLEAR_QF_PREVIEW_MESSAGE,
  CLEAR_QF_DELETE_MESSAGE,
  QF_DELETE_ERROR,
  QF_DELETE_PENDING,
  QF_DELETE_SUCCESS,
  QF_EDIT_ERROR,
  QF_EDIT_PENDING,
  QF_EDIT_SUCCESS,
  QF_LIST_ERROR,
  QF_LIST_PENDING,
  QF_LIST_SUCCESS,
  QF_PREVIEW_ERROR,
  QF_PREVIEW_PENDING,
  QF_PREVIEW_SUCCESS,
  CLEAR_QF_LIST_MESSAGE,
  FETCH_QUALIFICATION_ALIAS_DROPDOWN_PENDING,
  FETCH_QUALIFICATION_ALIAS_DROPDOWN_SUCCESS,
  FETCH_QUALIFICATION_ALIAS_DROPDOWN_ERROR,
  FETCH_COUNTRY_CODE_DROPDOWN_SUCCESS,
  FETCH_COUNTRY_CODE_DROPDOWN_PENDING,
  FETCH_COUNTRY_CODE_DROPDOWN_ERROR,
  FETCH_UNIVERSITY_DROPDOWN_SUCCESS,
  FETCH_UNIVERSITY_DROPDOWN_ERROR,
  FETCH_QF_DROPDOWN_SUCCESS,
  FETCH_QF_DROPDOWN_ERROR
} = qualificationSetupConstants

export const clearQualificationCreateMessage = () => {
  return {
    type: CLEAR_QF_CREATE_MESSAGE
  }
}

export const createQualificationSuccess = data => {
  return {
    type: CREATE_QF_SUCCESS,
    payload: {
      status: 'S',
      message: 'Qualification Created Successfully'
    }
  }
}

export const createQualificationPending = () => {
  return {
    type: CREATE_QF_PENDING,
    payload: {
      message: 'Loading',
      status: 'P'
    }
  }
}

export const createQualificationError = message => {
  return {
    type: CREATE_QF_ERROR,
    payload: {
      message: message,
      status: 'E'
    }
  }
}

export const clearQualificationEditMessage = () => {
  return {
    type: CLEAR_QF_EDIT_MESSAGE
  }
}

export const createQualificationEditSuccess = data => {
  return {
    type: QF_EDIT_SUCCESS,
    payload: {
      status: 'S',
      message: 'Qualification Modified Successfully'
    }
  }
}

export const createQualificationEditError = message => {
  return {
    type: QF_EDIT_ERROR,
    payload: {
      message: message,
      status: 'E'
    }
  }
}

export const createQualificationEditPending = () => {
  return {
    type: QF_EDIT_PENDING,
    payload: {
      message: 'Loading',
      status: 'P'
    }
  }
}

export const clearQualificationListMessage = () => {
  return {
    type: CLEAR_QF_LIST_MESSAGE
  }
}

export const createQualificationSearchSuccess = data => {
  return {
    type: QF_LIST_SUCCESS,
    payload: {
      status: 'S',
      data
    }
  }
}

export const createQualificationSearchPending = () => {
  return {
    type: QF_LIST_PENDING,
    payload: {
      data: [],
      status: 'P'
    }
  }
}

export const createQualificationListError = message => {
  return {
    type: QF_LIST_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}

export const clearQualificationPreviewMessage = () => {
  return {
    type: CLEAR_QF_PREVIEW_MESSAGE
  }
}

export const createQualificationPreviewSuccess = data => {
  return {
    type: QF_PREVIEW_SUCCESS,
    payload: {
      status: 'S',
      data
    }
  }
}

export const createQualificationPreviewPending = () => {
  return {
    type: QF_PREVIEW_PENDING,
    payload: {
      data: null,
      status: 'P'
    }
  }
}

export const createQualificationPreviewError = message => {
  return {
    type: QF_PREVIEW_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}

export const clearQualificationDeleteMessage = () => {
  return {
    type: CLEAR_QF_DELETE_MESSAGE
  }
}

export const createQualificationDeleteSucess = () => {
  return {
    type: QF_DELETE_SUCCESS,
    payload: {
      status: 'S',
      message: 'Qualification Deleted SucessFully'
    }
  }
}

export const createQualificationDeletePending = () => {
  return {
    type: QF_DELETE_PENDING,
    payload: {
      status: 'P'
    }
  }
}

export const createQualificationDeleteError = message => {
  return {
    type: QF_DELETE_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}

export const qualificationAliasFetchForDropdownPending = () => {
  return {
    type: FETCH_QUALIFICATION_ALIAS_DROPDOWN_PENDING
  }
}

export const qualificationAliasFetchForDropdownSuccess = data => {
  return {
    type: FETCH_QUALIFICATION_ALIAS_DROPDOWN_SUCCESS,
    payload: {
      data
    }
  }
}

export const qualificationAliasFetchForDropdownError = message => {
  return {
    type: FETCH_QUALIFICATION_ALIAS_DROPDOWN_ERROR,
    payload: {
      errorMessage: message
    }
  }
}

export const countryCodeFetchForDropdownPending = () => {
  return {
    type: FETCH_COUNTRY_CODE_DROPDOWN_PENDING
  }
}

export const countryCodeFetchForDropdownSuccess = data => {
  return {
    type: FETCH_COUNTRY_CODE_DROPDOWN_SUCCESS,
    payload: {
      data
    }
  }
}

export const countryCodeFetchForDropdownError = message => {
  return {
    type: FETCH_COUNTRY_CODE_DROPDOWN_ERROR,
    payload: {
      errorMessage: message
    }
  }
}

export const universityFetchForDropdownSuccess = data => {
  return {
    type: FETCH_UNIVERSITY_DROPDOWN_SUCCESS,
    payload: {
      data
    }
  }
}

export const universityFetchForDropdownError = message => {
  return {
    type: FETCH_UNIVERSITY_DROPDOWN_ERROR,
    payload: {
      errorMessage: message
    }
  }
}

export const qualificationFetchForDropdownSuccess = data => {
  return {
    type: FETCH_QF_DROPDOWN_SUCCESS,
    payload: {
      data
    }
  }
}

export const qualificationFetchForDropdownError = message => {
  return {
    type: FETCH_QF_DROPDOWN_ERROR,
    payload: {
      errorMessage: message
    }
  }
}
