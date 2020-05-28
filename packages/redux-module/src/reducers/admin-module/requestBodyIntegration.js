import {requestBOdyApiIntegrationActionConstants} from '@frontend-appointment/action-module'
import {createReducerFactory} from '../reducer-factory'
const {
  REQUEST_BODY_INTEGRATION_DELETE_ERROR,
  REQUEST_BODY_INTEGRATION_DELETE_MESSAGE,
  REQUEST_BODY_INTEGRATION_DELETE_PENDING,
  REQUEST_BODY_INTEGRATION_DELETE_SUCCESS,
  REQUEST_BODY_INTEGRATION_DROPDOWN_ERROR,
  REQUEST_BODY_INTEGRATION_DROPDOWN_PENDING,
  REQUEST_BODY_INTEGRATION_DROPDOWN_SUCCESS,
  REQUEST_BODY_INTEGRATION_EDIT_ERROR,
  REQUEST_BODY_INTEGRATION_EDIT_MESSAGE,
  REQUEST_BODY_INTEGRATION_EDIT_PENDING,
  REQUEST_BODY_INTEGRATION_EDIT_SUCCESS,
  REQUEST_BODY_INTEGRATION_ERROR,
  REQUEST_BODY_INTEGRATION_PENDING,
  REQUEST_BODY_INTEGRATION_PREVIEW_ERROR,
  REQUEST_BODY_INTEGRATION_PREVIEW_MESSAGE,
  REQUEST_BODY_INTEGRATION_PREVIEW_PENDING,
  REQUEST_BODY_INTEGRATION_PREVIEW_SUCCESS,
  REQUEST_BODY_INTEGRATION_SEARCH_ERROR,
  REQUEST_BODY_INTEGRATION_SEARCH_PENDING,
  REQUEST_BODY_INTEGRATION_SEARCH_SUCCESS,
  REQUEST_BODY_INTEGRATION_SUCCESS
} = requestBOdyApiIntegrationActionConstants
//State
const initialState = {
  requestBodyApiData: {
    requestBodyApiSaveSucessMessage: '',
    isrequestBodyApiSaveLoading: false,
    hospitalApiErrorMessage: ''
  },
  requestBodyDropdown: {
    isRequestBodyDropdownLoading: true,
    requestBodyData: [],
    requestBodyDropdownError: ''
  },
  searchRequestBodyIntegration: {
    isSearchRequestBodyLoading: true,
    searchRequestBodyData: [],
    totalItems: 0,
    searchRequestBodyMessageError: ''
  },
  editRequestBodyIntegration: {
    isEditRequestBodyIntegrationLoading: false,
    editRequestBodySuccessMessage: '',
    editRequestBodyErrorMessage: ''
  },
  previewRequestBodyIntegration: {
    isPreviewRequestBodyIntegrationLoading: true,
    previewRequestBodyIntegrationData: null,
    previewRequestIntegrationErorrMessage: ''
  },
  deleteRequestBodyIntegration: {
    isDeleteRequestBodyIntegrationLoading: false,
    deleteRequestBodyIntegrationSuccessMessage: '',
    deleteRequestBodyIntegrationErrorMessage: ''
  }
}
//Handlers
const requestBodyApiSaveIntegrationSaveHandler = {
  [REQUEST_BODY_INTEGRATION_PENDING]: state => ({
    ...state,
    requestBodyApiSaveSucessMessage: '',
    isrequestBodyApiSaveLoading: true,
    requestBodyApiSaveErrorMessage: ''
  }),
  [REQUEST_BODY_INTEGRATION_SUCCESS]: (state, action) => ({
    ...state,
    requestBodyApiSaveSucessMessage: action.payload.message,
    isrequestBodyApiSaveLoading: false,
    requestBodyApiSaveErrorMessage: ''
  }),
  [REQUEST_BODY_INTEGRATION_ERROR]: (state, action) => ({
    ...state,
    requestBodyApiSaveSucessMessage: '',
    isrequestBodyApiSaveLoading: false,
    requestBodyApiSaveErrorMessage: action.payload.message
  })
}

const requestBodyDropdownHandler = {
  [REQUEST_BODY_INTEGRATION_DROPDOWN_PENDING]: state => ({
    ...state,
    isRequestBodyDropdownLoading: true,
    requestBodyData: [],
    requestBodyDropdownError: ''
  }),
  [REQUEST_BODY_INTEGRATION_DROPDOWN_SUCCESS]: (state, action) => {
    console.log('action.payload.data', action.payload.data)
    return {
      ...state,
      isRequestBodyDropdownLoading: false,
      requestBodyData: action.payload.data,
      requestBodyDropdownError: ''
    }
  },
  [REQUEST_BODY_INTEGRATION_DROPDOWN_ERROR]: (state, action) => ({
    ...state,
    isRequestBodyDropdownLoading: false,
    requestBodyData: [],
    requestBodyDropdownError: action.payload.message
  })
}

const searchRequestBodyIntegrationHandler = {
  [REQUEST_BODY_INTEGRATION_SEARCH_PENDING]: state => ({
    ...state,
    isSearchRequestBodyLoading: true,
    searchRequestBodyData: [],
    totalItems: 0,
    searchRequestBodyMessageError: ''
  }),
  [REQUEST_BODY_INTEGRATION_SEARCH_SUCCESS]: (state, action) => ({
    ...state,
    isSearchRequestBodyLoading: false,
    searchRequestBodyData: action.payload.data.searchResponseDTOS,
    totalItems: action.payload.data.totalItems,
    searchRequestBodyMessageError: ''
  }),
  [REQUEST_BODY_INTEGRATION_SEARCH_ERROR]: (state, action) => ({
    ...state,
    isSearchRequestBodyLoading: false,
    searchRequestBodyData: [],
    totalItems: 0,
    searchRequestBodyMessageError: action.payload.message
  })
}

const previewRequestBodyIntegrationHandler = {
  [REQUEST_BODY_INTEGRATION_PREVIEW_PENDING]: state => ({
    ...state,
    isPreviewRequestBodyIntegrationLoading: true,
    previewRequestBodyIntegrationData: null,
    previewRequestIntegrationErorrMessage: ''
  }),
  [REQUEST_BODY_INTEGRATION_PREVIEW_SUCCESS]: (state, action) => ({
    ...state,
    isPreviewRequestBodyIntegrationLoading: false,
    previewRequestBodyIntegrationData: action.payload.data,
    previewRequestIntegrationErorrMessage: ''
  }),
  [REQUEST_BODY_INTEGRATION_PREVIEW_ERROR]: (state, action) => ({
    ...state,
    isPreviewRequestBodyIntegrationLoading: true,
    previewRequestBodyIntegrationData: null,
    previewRequestIntegrationErorrMessage: action.payload.message
  }),
  [REQUEST_BODY_INTEGRATION_EDIT_MESSAGE]: state => ({
    ...state,
    previewRequestIntegrationErorrMessage: ''
  })
}

const editRequestBodyIntegrationHandler = {
  [REQUEST_BODY_INTEGRATION_EDIT_PENDING]: state => ({
    ...state,
    isEditRequestBodyIntegrationLoading: false,
    editRequestBodySuccessMessage: '',
    editRequestBodyErrorMessage: ''
  }),
  [REQUEST_BODY_INTEGRATION_EDIT_SUCCESS]: (state, action) => ({
    ...state,
    isEditRequestBodyIntegrationLoading: false,
    editRequestBodySuccessMessage: action.payload.message,
    editRequestBodyErrorMessage: ''
  }),
  [REQUEST_BODY_INTEGRATION_EDIT_ERROR]: (state, action) => ({
    ...state,
    isEditRequestBodyIntegrationLoading: false,
    editRequestBodySuccessMessage: '',
    editRequestBodyErrorMessage: action.payload.message
  }),
  [REQUEST_BODY_INTEGRATION_EDIT_ERROR]: state => ({
    ...state,
    editRequestBodySuccessMessage: '',
    editRequestBodyErrorMessage: ''
  })
}

const deleteRequestBodyHandler = {
  [REQUEST_BODY_INTEGRATION_DELETE_PENDING]: state => ({
    ...state,
    isDeleteRequestBodyIntegrationLoading: true,
    deleteRequestBodyIntegrationSuccessMessage: '',
    deleteRequestBodyIntegrationErrorMessage: ''
  }),
  [REQUEST_BODY_INTEGRATION_DELETE_SUCCESS]: (state, action) => ({
    ...state,
    isDeleteRequestBodyIntegrationLoading: false,
    deleteRequestBodyIntegrationSuccessMessage: action.payload.message,
    deleteRequestBodyIntegrationErrorMessage: ''
  }),
  [REQUEST_BODY_INTEGRATION_DELETE_ERROR]: (state, action) => ({
    ...state,
    isDeleteRequestBodyIntegrationLoading: false,
    deleteRequestBodyIntegrationSuccessMessage: '',
    deleteRequestBodyIntegrationErrorMessage: action.payload.message
  }),
  [REQUEST_BODY_INTEGRATION_DELETE_MESSAGE]: state => ({
    ...state,
    deleteRequestBodyIntegrationSuccessMessage: '',
    deleteRequestBodyIntegrationErrorMessage: ''
  })
}

//Reducers
export const HospitalApiIntegrationReducers = {
  RequestBodyIntegrationSaveReducers: createReducerFactory(
    requestBodyApiSaveIntegrationSaveHandler,
    initialState.requestBodyApiData
  ),
  RequestBodyDropdownReducers: createReducerFactory(
    requestBodyDropdownHandler,
    initialState.requestBodyDropdown
  ),
  RequestBodyEditReducers: createReducerFactory(
    editRequestBodyIntegrationHandler,
    initialState.editRequestBodyIntegration
  ),
  RequestBodyDeleteReducers: createReducerFactory(
    deleteRequestBodyHandler,
    initialState.deleteRequestBodyIntegration
  ),
  RequestBodyPreviewReducers: createReducerFactory(
    previewRequestBodyIntegrationHandler,
    initialState.previewRequestBodyIntegration
  ),
  RequestBodySearchReducers: createReducerFactory(
    searchRequestBodyIntegrationHandler,
    initialState.searchRequestBodyIntegration
  )
}
