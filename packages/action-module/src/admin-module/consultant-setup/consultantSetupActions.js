import {consultantSetupConstants} from './consultantSetupConstant'

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
  CLEAR_CN_LIST_MESSAGE
} = consultantSetupConstants

export const clearHospitalCreateMessage = () => {
  return {
    type: CLEAR_CN_CREATE_MESSAGE
  }
}

export const createHospitalSuccess = data => {
  return {
    type: CREATE_CN_SUCCESS,
    payload: {
      status: 'S',
      message: 'Hospital Created Successfully'
    }
  }
}

export const createHospitalPending = () => {
  return {
    type: CREATE_CN_PENDING,
    payload: {
      message: 'Loading',
      status: 'P'
    }
  }
}

export const createHospitalError = message => {
  return {
    type: CREATE_CN_ERROR,
    payload: {
      message: message,
      status: 'E'
    }
  }
}

export const clearHospitalEditMessage = () => {
  return {
    type: CLEAR_CN_EDIT_MESSAGE
  }
}

export const createHospitalEditSuccess = data => {
  return {
    type: CN_EDIT_SUCCESS,
    payload: {
      status: 'S',
      message: 'Hospital Modified Successfully'
    }
  }
}

export const createHospitalEditError = message => {
  return {
    type: CN_EDIT_ERROR,
    payload: {
      message: message,
      status: 'E'
    }
  }
}

export const createHospitalEditPending = () => {
  return {
    type: CN_EDIT_PENDING,
    payload: {
      message: 'Loading',
      status: 'P'
    }
  }
}

export const clearHospitalListMessage = () => {
  return {
    type: CLEAR_CN_LIST_MESSAGE
  }
}

export const createHospitalSearchSuccess = data => {
  return {
    type: CN_LIST_SUCCESS,
    payload: {
      status: 'S',
      data
    }
  }
}

export const createHospitalSearchPending = () => {
  return {
    type: CN_LIST_PENDING,
    payload: {
      data: [],
      status: 'P'
    }
  }
}

export const createHospitalListError = message => {
  return {
    type: CN_LIST_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}

export const clearHospitalPreviewMessage = () => {
  return {
    type: CLEAR_CN_PREVIEW_MESSAGE
  }
}

export const createHospitalPreviewSuccess = data => {
  return {
    type: CN_PREVIEW_SUCCESS,
    payload: {
      status: 'S',
      data
    }
  }
}

export const createHospitalPreviewPending = () => {
  return {
    type: CN_PREVIEW_PENDING,
    payload: {
      data:null,
      status: 'P'
    }
  }
}

export const createHospitalPreviewError = message => {
  return {
    type: CN_PREVIEW_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}

export const clearHospitalDeleteMessage = () => {
  return {
    type: CLEAR_CN_DELETE_MESSAGE
  }
}

export const createHospitalDeleteSucess = () => {
  return {
    type: CN_DELETE_SUCCESS,
    payload: {
      status: 'S',
      message: 'Hospital Deleted SucessFully'
    }
  }
}

export const createHospitalDeletePending = () => {
  return {
    type: CN_DELETE_PENDING,
    payload: {
      status: 'P'
    }
  }
}

export const createHospitalDeleteError = message => {
  return {
    type: CN_DELETE_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}
