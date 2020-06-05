import {adminModeApiIntegrationActionConstants} from '@frontend-appointment/action-module'
import {createReducerFactory} from '../reducer-factory'
const {
  ADMIN_API_APPOINTMENT_MODE_DROPDOWN_ERROR,
  ADMIN_API_APPOINTMENT_MODE_DROPDOWN_PENDING,
  ADMIN_API_APPOINTMENT_MODE_DROPDOWN_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_DELETE_ERROR,
  ADMIN_MODE_API_INTEGRATION_DELETE_PENDING,
  ADMIN_MODE_API_INTEGRATION_DELETE_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_EDIT_ERROR,
  ADMIN_MODE_API_INTEGRATION_EDIT_PENDING,
  ADMIN_MODE_API_INTEGRATION_EDIT_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_PREVIEW_ERROR,
  ADMIN_MODE_API_INTEGRATION_PREVIEW_PENDING,
  ADMIN_MODE_API_INTEGRATION_PREVIEW_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_SAVE_ERROR,
  ADMIN_MODE_API_INTEGRATION_SAVE_PENDING,
  ADMIN_MODE_API_INTEGRATION_SAVE_SUCCESS,
  ADMIN_MODE_API_INTEGRATION_SEARCH_ERROR,
  ADMIN_MODE_API_INTEGRATION_SEARCH_PENDING,
  ADMIN_MODE_API_INTEGRATION_SEARCH_SUCCESS,
  CLEAR_ADMIN_MODE_API_DELETE_MESSAGE,
  CLEAR_ADMIN_MODE_API_EDIT_MESSAGE,
  CLEAR_ADMIN_MODE_API_PREVIEW_MESSAGE
} = adminModeApiIntegrationActionConstants
//State
const initialState = {
  adminApiData: {
    adminApiSaveSucessMessage: '',
    adminApiSaveLoading: false,
    adminApiErrorMessage: ''
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
  apppointmentModeApiIntegration: {
    isApppointmentModeApiIntegrationDropdownLoading: true,
    apppointmentModeApiIntegrationData: [],
    apppointmentModeApiIntegrationDropdownError: ''
  }
}

//Handlers
const adminApiIntegrationSaveHandler = {
  [ADMIN_MODE_API_INTEGRATION_SAVE_PENDING]: state => ({
    ...state,
    adminApiSaveSucessMessage: '',
    adminApiSaveLoading: true,
    adminApiErrorMessage: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_SAVE_SUCCESS]: (state, action) => ({
    ...state,
    adminApiSaveSucessMessage: action.payload.message,
    adminApiSaveLoading: false,
    adminApiErrorMessage: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_SAVE_ERROR]: (state, action) => ({
    ...state,
    adminApiSaveSucessMessage: '',
    adminApiSaveLoading: true,
    adminApiErrorMessage: action.payload.message
  })
}

const appointmentModeAdminApiIntegrationDropdownHandler = {
  [ADMIN_API_APPOINTMENT_MODE_DROPDOWN_PENDING]: state => ({
    ...state,
    isApppointmentModeApiIntegrationDropdownLoading: true,
    apppointmentModeApiIntegrationData: [],
    apppointmentModeApiIntegrationDropdownError: ''
  }),
  [ADMIN_API_APPOINTMENT_MODE_DROPDOWN_SUCCESS]: (state, action) => ({
    ...state,
    isApppointmentModeApiIntegrationDropdownLoading: true,
    apppointmentModeApiIntegrationData: action.payload.data,
    apppointmentModeApiIntegrationDropdownError: ''
  }),
  [ADMIN_API_APPOINTMENT_MODE_DROPDOWN_ERROR]: (state, action) => ({
    ...state,
    isApppointmentModeApiIntegrationDropdownLoading: true,
    apppointmentModeApiIntegrationData: [],
    apppointmentModeApiIntegrationDropdownError: action.payload.message
  })
}

const adminApiIntegrationSearchHandler = {
  [ADMIN_MODE_API_INTEGRATION_SEARCH_PENDING]: state => ({
    ...state,
    isSearchApiIntegrationLoading: true,
    searchApiIntegrationData: [],
    totalItems: 0,
    searchApiIntegrationMessageError: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_SEARCH_SUCCESS]: (state, action) => ({
    ...state,
    isSearchApiIntegrationLoading: false,
    searchApiIntegrationData: action.payload.data.searchResponseDTOS,
    totalItems: action.payload.data.totalItems,
    searchApiIntegrationMessageError: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_SEARCH_ERROR]: (state, action) => ({
    ...state,
    isSearchApiIntegrationLoading: false,
    searchApiIntegrationData: [],
    totalItems: 0,
    searchApiIntegrationMessageError: action.payload.message
  })
}

const adminApiIntegrationPreviewHandler = {
  [ADMIN_MODE_API_INTEGRATION_PREVIEW_PENDING]: state => ({
    ...state,
    isPreviewApiIntegrationLoading: true,
    previewApiIntegrationData: null,
    previewApiIntegrationErorrMessage: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_PREVIEW_SUCCESS]: (state, action) => ({
    ...state,
    isPreviewApiIntegrationLoading: false,
    previewApiIntegrationData: action.payload.data,
    previewApiIntegrationErorrMessage: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_PREVIEW_ERROR]: (state, action) => ({
    ...state,
    isPreviewApiIntegrationLoading: false,
    previewApiIntegrationData: null,
    previewApiIntegrationErorrMessage: action.payload.message
  }),
  [CLEAR_ADMIN_MODE_API_PREVIEW_MESSAGE]: state => ({
    ...state,
    previewApiIntegrationErorrMessage: ''
  })
}

const adminApiIntegrationEditHandler = {
  [ADMIN_MODE_API_INTEGRATION_EDIT_PENDING]: state => ({
    ...state,
    isEditApiIntegrationLoading: true,
    editApiIntegrationSuccessMessage: '',
    editApiIntegrationErrorMessage: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_EDIT_SUCCESS]: (state, action) => ({
    ...state,
    isEditApiIntegrationLoading: false,
    editApiIntegrationSuccessMessage: action.payload.message,
    editApiIntegrationErrorMessage: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_EDIT_ERROR]: (state, action) => ({
    ...state,
    isEditApiIntegrationLoading: false,
    editApiIntegrationSuccessMessage: '',
    editApiIntegrationErrorMessage: action.payload.message
  }),
  [CLEAR_ADMIN_MODE_API_EDIT_MESSAGE]: state => ({
    ...state,
    editApiIntegrationSuccessMessage: '',
    editApiIntegrationErrorMessage: ''
  })
}

const adminApiIntegrationDeleteHandler = {
  [ADMIN_MODE_API_INTEGRATION_DELETE_PENDING]: state => ({
    ...state,
    isDeleteApiIntegrationLoading: true,
    deleteApiIntegrationSuccessMessage: '',
    deleteApiIntegrationErrorMessage: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_DELETE_SUCCESS]: (state, action) => ({
    ...state,
    isDeleteApiIntegrationLoading: false,
    deleteApiIntegrationSuccessMessage: action.payload.message,
    deleteApiIntegrationErrorMessage: ''
  }),
  [ADMIN_MODE_API_INTEGRATION_DELETE_ERROR]: (state, action) => ({
    ...state,
    isDeleteApiIntegrationLoading: false,
    deleteApiIntegrationSuccessMessage: '',
    deleteApiIntegrationErrorMessage: action.payload.message
  }),
  [CLEAR_ADMIN_MODE_API_DELETE_MESSAGE]: state => ({
    ...state,
    deleteApiIntegrationSuccessMessage: '',
    deleteApiIntegrationErrorMessage: '',
    isDeleteApiIntegrationLoading: false
  })
}

//Reducers
export const AdminApiIntegrationReducers = {
  AdminApiIntegrationSaveReducers: createReducerFactory(
    adminApiIntegrationSaveHandler,
    initialState.adminApiData
  ),
  AppointmentModeAdminApiDropdownReducers: createReducerFactory(
    appointmentModeAdminApiIntegrationDropdownHandler,
    initialState.apppointmentModeApiIntegration
  ),
  AdminEditApiIntegrationReducers: createReducerFactory(
    adminApiIntegrationEditHandler,
    initialState.editApiIntegration
  ),
  AdminPreviewApiIntegrationReducers: createReducerFactory(
    adminApiIntegrationPreviewHandler,
    initialState.previewApiIntegration
  ),
  AdminSearchApiIntegrationReducers: createReducerFactory(
    adminApiIntegrationSearchHandler,
    initialState.searchApiIntegration
  ),
  AdminDeleteApiIntegrationReducers: createReducerFactory(
    adminApiIntegrationDeleteHandler,
    initialState.deleteApiIntegration
  )
}
