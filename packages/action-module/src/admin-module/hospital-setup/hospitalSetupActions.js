import {hospitalSetupConstants} from './hospitalSetupConstant'

const {
  CREATE_HP_ERROR,
  CREATE_HP_PENDING,
  CREATE_HP_SUCCESS,
  CLEAR_HP_CREATE_MESSAGE,
  CLEAR_HP_EDIT_MESSAGE,
  CLEAR_HP_PREVIEW_MESSAGE,
  CLEAR_HP_DELETE_MESSAGE,
  HP_DELETE_ERROR,
  HP_DELETE_PENDING,
  HP_DELETE_SUCCESS,
  HP_EDIT_ERROR,
  HP_EDIT_PENDING,
  HP_EDIT_SUCCESS,
  HP_LIST_ERROR,
  HP_LIST_PENDING,
  HP_LIST_SUCCESS,
  HP_PREVIEW_ERROR,
  HP_PREVIEW_PENDING,
  HP_PREVIEW_SUCCESS,
  CLEAR_HP_LIST_MESSAGE
} = hospitalSetupConstants

export const clearHospitalCreateMessage = () => {
  return {
    type: CLEAR_HP_CREATE_MESSAGE
  }
}

export const createHospitalSuccess = data => {
  return {
    type: CREATE_HP_SUCCESS,
    payload: {
      status: 'S',
      message: 'Hospital Created Successfully'
    }
  }
}

export const createHospitalPending = () => {
  return {
    type: CREATE_HP_PENDING,
    payload: {
      message: 'Loading',
      status: 'P'
    }
  }
}

export const createHospitalError = message => {
  return {
    type: CREATE_HP_ERROR,
    payload: {
      message: message,
      status: 'E'
    }
  }
}

export const clearHospitalEditMessage = () => {
  return {
    type: CLEAR_HP_EDIT_MESSAGE
  }
}

export const createHospitalEditSuccess = data => {
  return {
    type: HP_EDIT_SUCCESS,
    payload: {
      status: 'S',
      message: 'Hospital Modified Successfully'
    }
  }
}

export const createHospitalEditError = message => {
  return {
    type: HP_EDIT_ERROR,
    payload: {
      message: message,
      status: 'E'
    }
  }
}

export const createHospitalEditPending = () => {
  return {
    type: HP_EDIT_PENDING,
    payload: {
      message: 'Loading',
      status: 'P'
    }
  }
}

export const clearHospitalListMessage = () => {
  return {
    type: CLEAR_HP_LIST_MESSAGE
  }
}

export const createHospitalSearchSuccess = data => {
  return {
    type: HP_LIST_SUCCESS,
    payload: {
      status: 'S',
      data
    }
  }
}

export const createHospitalSearchPending = () => {
  return {
    type: HP_LIST_PENDING,
    payload: {
      data: [],
      status: 'P'
    }
  }
}

export const createHospitalListError = message => {
  return {
    type: HP_LIST_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}

export const clearHospitalPreviewMessage = () => {
  return {
    type: CLEAR_HP_PREVIEW_MESSAGE
  }
}

export const createHospitalPreviewSuccess = data => {
  return {
    type: HP_PREVIEW_SUCCESS,
    payload: {
      status: 'S',
      data
    }
  }
}

export const createHospitalPreviewPending = () => {
  return {
    type: HP_PREVIEW_PENDING,
    payload: {
      data:null,
      status: 'P'
    }
  }
}

export const createHospitalPreviewError = message => {
  return {
    type: HP_PREVIEW_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}

export const clearHospitalDeleteMessage = () => {
  return {
    type: CLEAR_HP_DELETE_MESSAGE
  }
}

export const createHospitalDeleteSucess = () => {
  return {
    type: HP_DELETE_SUCCESS,
    payload: {
      status: 'S',
      message: 'Hospital Deleted SucessFully'
    }
  }
}

export const createHospitalDeletePending = () => {
  return {
    type: HP_DELETE_PENDING,
    payload: {
      status: 'P'
    }
  }
}

export const createHospitalDeleteError = message => {
  return {
    type: HP_DELETE_ERROR,
    payload: {
      message,
      status: 'E'
    }
  }
}
