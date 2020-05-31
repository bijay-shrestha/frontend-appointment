import {hospitalApiIntegrationActionConstants} from '@frontend-appointment/action-module'
import {createReducerFactory} from '../reducer-factory'
const {
  HOSPITAL_API_SAVE_ERROR,
  HOSPITAL_API_SAVE_PENDING,
  HOSPITAL_API_SAVE_SUCCESS,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_ERROR,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_PENDING,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_SUCCESS,
  HOSPITAL_FEATURE_TYPE_DROPDOWN_ERROR,
  HOSPITAL_FEATURE_TYPE_DROPDOWN_PENDING,
  HOSPITAL_FEATURE_TYPE_DROPDOWN_SUCCESS,
  HOSPITAL_API_INTEGRATION_EDIT_ERROR,
  HOSPITAL_API_INTEGRATION_EDIT_PENDING,
  HOSPITAL_API_INTEGRATION_EDIT_SUCCESS,
  HOSPITAL_API_INTEGRATION_PREVIEW_ERROR,
  HOSPITAL_API_INTEGRATION_PREVIEW_PENDING,
  HOSPITAL_API_INTEGRATION_PREVIEW_SUCCESS,
  HOSPITAL_API_INTEGRATION_SEARCH_ERROR,
  HOSPITAL_API_INTEGRATION_SEARCH_SUCCESS,
  HOSPITAL_API_INTEGRATION_SEARCH_PENDING,
  HOSPITAL_API_INTEGRATION_DELETE_ERROR,
  HOSPITAL_API_INTEGRATION_DELETE_PENDING,
  HOSPITAL_API_INTEGRATION_DELETE_SUCCESS,
  API_INTEGRATION_CHANNEL_DROPDOWN_ERROR,
  API_INTEGRATION_CHANNEL_DROPDOWN_PENDING,
  API_INTEGRATION_CHANNEL_DROPDOWN_SUCCESS,
  API_INTEGRATION_TYPE_DROPDOWN_ERROR,
  API_INTEGRATION_TYPE_DROPDOWN_PENDING,
  API_INTEGRATION_TYPE_DROPDOWN_SUCCESS,
  CLEAR_HOSPITAL_API_DELETE_MESSAGE,
  CLEAR_HOSPITAL_API_EDIT_MESSAGE,
  CLEAR_HOSPITAL_API_PREVIEW_MESSAGE
} = hospitalApiIntegrationActionConstants
//State
const initialState = {
  hospitalApiData: {
    hospitalApiSaveSucessMessage: '',
    isHospitalApiSaveLoading: false,
    hospitalApiErrorMessage: ''
  },
  featureTypeDropdown: {
    isFeatureTypeDropdownLoading: true,
    featureTypeDropdownData: [],
    featureTypeDropdownError: ''
  },
  requestMethodDropdown: {
    isRequestMethodDropdownLoading: true,
    requestMethodData: [],
    requestMethodDropdownError: ''
  },
  searchApiIntegration: {
    isSearchApiIntegrationLoading: true,
    searchApiIntegrationData: [],
    totalItems: 0,
    searchApiIntegrationMessageError: ''
  },
  editApiIntegration: {
    isEditApiIntegrationLoading: false,
    editApiIntegrationSuccessMessage: '',
    editApiIntegrationErrorMessage: ''
  },
  previewApiIntegration: {
    isPreviewApiIntegrationLoading: true,
    previewApiIntegrationData: null,
    previewApiIntegrationErorrMessage: ''
  },
  deleteApiIntegration: {
    isDeleteApiIntegrationLoading: false,
    deleteApiIntegrationSuccessMessage: '',
    deleteApiIntegrationErrorMessage: ''
  },
  integrationChannelDropdown: {
    isIntegrationChannelDropdownLoading: true,
    integrationChannelData: [],
    integrationChannelDropdownError: ''
  },
  integrationTypeDropdown: {
    isIntegrationTypeDropdownLoading: true,
    integrationTypeData: [],
    integrationTypeDropdownError: ''
  },
}

//Handlers
const hospitalApiIntegrationSaveHandler = {
  [HOSPITAL_API_SAVE_PENDING]: state => ({
    ...state,
    hospitalApiSaveSucessMessage: '',
    isHospitalApiSaveLoading: true,
    hospitalApiErrorMessage: ''
  }),
  [HOSPITAL_API_SAVE_SUCCESS]: (state, action) => ({
    ...state,
    hospitalApiSaveSucessMessage: action.payload.message,
    isHospitalApiSaveLoading: false,
    hospitalApiErrorMessage: ''
  }),
  [HOSPITAL_API_SAVE_ERROR]: (state, action) => ({
    ...state,
    hospitalApiSaveSucessMessage: '',
    isHospitalApiSaveLoading: false,
    hospitalApiErrorMessage: action.payload.message
  })
}

const featureTypeDropdownHandler = {
  [HOSPITAL_FEATURE_TYPE_DROPDOWN_PENDING]: state => ({
    ...state,
    isFeatureTypeDropdownLoading: true,
    featureTypeDropdownData: [],
    featureTypeDropdownError: ''
  }),
  [HOSPITAL_FEATURE_TYPE_DROPDOWN_SUCCESS]: (state, action) => ({
    ...state,
    isFeatureTypeDropdownLoading: false,
    featureTypeDropdownData: action.payload.data,
    featureTypeDropdownError: ''
  }),
  [HOSPITAL_FEATURE_TYPE_DROPDOWN_ERROR]: (state, action) => ({
    ...state,
    isFeatureTypeDropdownLoading: false,
    featureTypeDropdownData: [],
    featureTypeDropdownError: action.payload.message
  })
}

const integrationTypeDropdownHandler = {
  [API_INTEGRATION_TYPE_DROPDOWN_PENDING]: state => ({
    ...state,
    isIntegrationTypeDropdownLoading: true,
    integrationTypeData: [],
    integrationTypeDropdownError: ''
  }),
  [API_INTEGRATION_TYPE_DROPDOWN_SUCCESS]: (state, action) => ({
    ...state,
    isIntegrationTypeDropdownLoading: false,
    integrationTypeData: action.payload.data,
    integrationTypeDropdownError: ''
  }),
  [API_INTEGRATION_TYPE_DROPDOWN_ERROR]: (state, action) => ({
    ...state,
    isIntegrationTypeDropdownLoading: false,
    integrationTypeData: [],
    integrationTypeDropdownError: action.payload.message
  })
}

const integrationChannelDropdownHandler = {
  [API_INTEGRATION_CHANNEL_DROPDOWN_PENDING]: state => ({
    ...state,
    isIntegrationChannelDropdownLoading: true,
    integrationChannelData: [],
    integrationChannelDropdownError: ''
  }),
  [API_INTEGRATION_CHANNEL_DROPDOWN_SUCCESS]: (state, action) => ({
    ...state,
    isIntegrationChannelDropdownLoading: true,
    integrationChannelData: action.payload.data,
    integrationChannelDropdownError: ''
  }),
  [API_INTEGRATION_TYPE_DROPDOWN_ERROR]: (state, action) => ({
    ...state,
    isIntegrationChannelDropdownLoading: true,
    integrationChannelData: [],
    integrationChannelDropdownError: action.payload.message
  })
}
const requestMethodDropdownHandler = {
  [HOSPITAL_REQUEST_METHOD_DROPDOWN_PENDING]: state => ({
    ...state,
    isRequestMethodDropdownLoading: true,
    requestMethodData: [],
    requestMethodDropdownError: ''
  }),
  [HOSPITAL_REQUEST_METHOD_DROPDOWN_SUCCESS]: (state, action) => {
    console.log('action.payload.data', action.payload.data)
    return {
      ...state,
      isRequestMethodDropdownLoading: false,
      requestMethodData: action.payload.data,
      requestMethodDropdownError: ''
    }
  },
  [HOSPITAL_REQUEST_METHOD_DROPDOWN_ERROR]: (state, action) => ({
    ...state,
    isRequestMethodDropdownLoading: false,
    requestMethodData: [],
    requestMethodDropdownError: action.payload.data
  })
}

const searchApiIntegrationHandler = {
  [HOSPITAL_API_INTEGRATION_SEARCH_PENDING]: state => ({
    ...state,
    isSearchApiIntegrationLoading: true,
    searchApiIntegrationData: [],
    totalItems: 0,
    searchApiIntegrationMessageError: ''
  }),
  [HOSPITAL_API_INTEGRATION_SEARCH_SUCCESS]: (state, action) => ({
    ...state,
    isSearchApiIntegrationLoading: false,
    searchApiIntegrationData: action.payload.data.searchResponseDTOS,
    totalItems: action.payload.data.totalItems,
    searchApiIntegrationMessageError: ''
  }),
  [HOSPITAL_API_INTEGRATION_SEARCH_ERROR]: (state, action) => ({
    ...state,
    isSearchApiIntegrationLoading: false,
    searchApiIntegrationData: [],
    totalItems: 0,
    searchApiIntegrationMessageError: action.payload.message
  })
}

const previewApiIntegrationHandler = {
  [HOSPITAL_API_INTEGRATION_PREVIEW_PENDING]: state => ({
    ...state,
    isPreviewApiIntegrationLoading: true,
    previewApiIntegrationData: null,
    previewApiIntegrationErorrMessage: '',
    
  }),
  [HOSPITAL_API_INTEGRATION_PREVIEW_SUCCESS]: (state, action) => ({
    ...state,
    isPreviewApiIntegrationLoading: false,
    previewApiIntegrationData: action.payload.data,
    previewApiIntegrationErorrMessage: ''
  }),
  [HOSPITAL_API_INTEGRATION_PREVIEW_ERROR]: (state, action) => ({
    ...state,
    isPreviewApiIntegrationLoading: false,
    previewApiIntegrationData: null,
    previewApiIntegrationErorrMessage: action.payload.message
  }),
  [CLEAR_HOSPITAL_API_PREVIEW_MESSAGE]: (state) => ({
    ...state,
    previewApiIntegrationErorrMessage: ''
  })

}

const editApiIntegrationHandler = {
  [HOSPITAL_API_INTEGRATION_EDIT_PENDING]: state => ({
    ...state,
    isEditApiIntegrationLoading: true,
    editApiIntegrationSuccessMessage: '',
    editApiIntegrationErrorMessage: ''
  }),
  [HOSPITAL_API_INTEGRATION_EDIT_SUCCESS]: (state, action) => ({
    ...state,
    isEditApiIntegrationLoading: false,
    editApiIntegrationSuccessMessage: action.payload.message,
    editApiIntegrationErrorMessage: ''
  }),
  [HOSPITAL_API_INTEGRATION_EDIT_ERROR]: (state, action) => ({
    ...state,
    isEditApiIntegrationLoading: false,
    editApiIntegrationSuccessMessage: '',
    editApiIntegrationErrorMessage: action.payload.message
  }),
  [CLEAR_HOSPITAL_API_EDIT_MESSAGE]: (state) => ({
    ...state,
    editApiIntegrationSuccessMessage: '',
    editApiIntegrationErrorMessage:''
  })
}

const deleteApiIntegrationHandler = {
  [HOSPITAL_API_INTEGRATION_DELETE_PENDING]: state => ({
    ...state,
    isDeleteApiIntegrationLoading: true,
    deleteApiIntegrationSuccessMessage: '',
    deleteApiIntegrationErrorMessage: ''
  }),
  [HOSPITAL_API_INTEGRATION_DELETE_SUCCESS]: (state, action) => ({
    ...state,
    isDeleteApiIntegrationLoading: false,
    deleteApiIntegrationSuccessMessage: action.payload.message,
    deleteApiIntegrationErrorMessage: ''
  }),
  [HOSPITAL_API_INTEGRATION_DELETE_ERROR]: (state, action) => ({
    ...state,
    isDeleteApiIntegrationLoading: false,
    deleteApiIntegrationSuccessMessage: '',
    deleteApiIntegrationErrorMessage:action.payload.message
  }),
  [CLEAR_HOSPITAL_API_DELETE_MESSAGE]: (state) => ({
    ...state,
    deleteApiIntegrationSuccessMessage: '',
    deleteApiIntegrationErrorMessage:''
  })
}

//Reducers
export const HospitalApiIntegrationReducers = {
  hospitalApiIntegrationSaveReducers: createReducerFactory(
    hospitalApiIntegrationSaveHandler,
    initialState.hospitalApiData
  ),
  hospitalRequestMethodDropdownReducers: createReducerFactory(
    requestMethodDropdownHandler,
    initialState.requestMethodDropdown
  ),
  hospitalFeatureTypeDropdownReducers: createReducerFactory(
    featureTypeDropdownHandler,
    initialState.featureTypeDropdown
  ),
  hospitalEditApiIntegrationReducers: createReducerFactory(
    editApiIntegrationHandler,
    initialState.editApiIntegration
  ),
  hospitalPreviewApiIntegrationReducers: createReducerFactory(
    previewApiIntegrationHandler,
    initialState.previewApiIntegration
  ),
  hospitalSearchApiIntegrationReducers: createReducerFactory(
    searchApiIntegrationHandler,
    initialState.searchApiIntegration
  ),
  hospitalDeleteApiIntegrationReducers: createReducerFactory(
    deleteApiIntegrationHandler,
    initialState.deleteApiIntegration
  ),
  integrationChannelReducers:createReducerFactory(
    integrationChannelDropdownHandler,
    initialState.integrationChannelDropdown
  ),
  integrationTypeReducers:createReducerFactory(
    integrationTypeDropdownHandler,
    initialState.integrationTypeDropdown
  )
}
