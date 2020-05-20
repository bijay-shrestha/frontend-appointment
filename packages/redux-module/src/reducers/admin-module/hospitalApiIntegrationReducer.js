import {hospitalApiIntegrationActionConstants} from '@frontend-appointment/action-module'
import {createReducerFactory} from '../reducer-factory'
const {
  HOSPITAL_API_SAVE_ERROR,
  HOSPITAL_API_SAVE_PENDING,
  HOSPITAL_API_SAVE_SUCCESS,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_ERROR,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_PENDING,
  HOSPITAL_REQUEST_METHOD_DROPDOWN_SUCCESS,
  HOSPTIAL_FEATURE_TYPE_DROPDOWN_ERROR,
  HOSPTIAL_FEATURE_TYPE_DROPDOWN_PENDING,
  HOSPTIAL_FEATURE_TYPE_DROPDOWN_SUCCESS
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
  }
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
  [HOSPTIAL_FEATURE_TYPE_DROPDOWN_PENDING]: state => ({
    ...state,
    isFeatureTypeDropdownLoading: true,
    featureTypeDropdownData: [],
    featureTypeDropdownError: ''
  }),
  [HOSPTIAL_FEATURE_TYPE_DROPDOWN_SUCCESS]: (state, action) => ({
    ...state,
    isFeatureTypeDropdownLoading: false,
    featureTypeDropdownData: action.payload.data,
    featureTypeDropdownError: ''
  }),
  [HOSPTIAL_FEATURE_TYPE_DROPDOWN_ERROR]: (state, action) => ({
    ...state,
    isFeatureTypeDropdownLoading: false,
    featureTypeDropdownData: [],
    featureTypeDropdownError: action.payload.message
  })
}
const requestMethodDropdownHandler = {
  [HOSPITAL_REQUEST_METHOD_DROPDOWN_PENDING]: state => ({
    ...state,
    isRequestMethodDropdownLoading: true,
    requestMethodData: [],
    requestMethodDropdownError: ''
  }),
  [HOSPITAL_REQUEST_METHOD_DROPDOWN_SUCCESS]: (state, action) => ({
    ...state,
    isRequestMethodDropdownLoading: false,
    requestMethodData: action.payload.data,
    requestMethodDropdownError: ''
  }),
  [HOSPITAL_REQUEST_METHOD_DROPDOWN_ERROR]: (state, action) => ({
    ...state,
    appointmentTransferTime: [],
    isAppointmentTransferTimeLoading: false,
    appointmentTransferTimeError: action.payload.message
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
  hostialFeatureTypeDropdownReducers: createReducerFactory(
    featureTypeDropdownHandler,
    initialState.featureTypeDropdown
  )
}
