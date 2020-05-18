import {appointmentTransferConstant} from '@frontend-appointment/action-module'
import {createReducerFactory} from '../reducer-factory'
const {
  APPOINTMENT_TRANSFER_CHARGE_ERROR,
  APPOINTMENT_TRANSFER_CHARGE_PENDING,
  APPOINTMENT_TRANSFER_CHARGE_SUCCESS,
  APPOINTMENT_TRANSFER_DATE_ERROR,
  APPOINTMENT_TRANSFER_DATE_PENDING,
  APPOINTMENT_TRANSFER_DATE_SUCCESS,
  APPOINTMENT_TRANSFER_ERROR,
  APPOINTMENT_TRANSFER_PENDING,
  APPOINTMENT_TRANSFER_SUCCESS,
  APPOINTMENT_TRANSFER_TIME_ERROR,
  APPOINTMENT_TRANSFER_TIME_PENDING,
  APPOINTMENT_TRANSFER_TIME_SUCCESS,
  APPOINTMENT_TRANSFER_PREVIEW_ERROR,
  APPOINTMENT_TRANSFER_PREVIEW_PENDING,
  APPOINTMENT_TRANSFER_PREVIEW_SUCCESS,
  APPOINTMENT_TRANSFER_SEARCH_ERROR,
  APPOINTMENT_TRANSFER_SEARCH_PENDING,
  APPOINTMENT_TRANSFER_SEARCH_SUCCESS
} = appointmentTransferConstant
//State
const initialState = {
  transferInitialData: {
    appointmentTransferSucessMessage: '',
    isAppointmentTransferLoading: false,
    appointmentTransferErrorMessage: ''
  },
  transferCharge: {
    appointmentTransferCharge: 0,
    isAppointmentTransferChargeLoading: false,
    appointmentTransferChargeError: ''
  },
  transferDate: {
    appointmentTransferDate: [],
    isAppointmentTransferDateLoading: false,
    appointmentTransferDateError: ''
  },
  transferTime: {
    appointmentTransferTime: [],
    isAppointmentTransferTimeLoading: false,
    appointmentTransferTimeError: ''
  },
  transferInfo: {
    appointmentTransferInfo: null,
    isAppointmentTransferInfoLoading: true,
    appointmentTransferInfoErrorMessage: ''
  },
  transferSearch: {
    totalItems:0,
    appointmentTransferList: [],
    isAppointmentTransferSearchLoading: true,
    appointmentTransferSearchErrorMessage: ''
  }
}
//Handlers
const appointmentTransferhandlers = {
  [APPOINTMENT_TRANSFER_PENDING]: state => ({
    ...state,
    appointmentTransferSucessMessage: '',
    isAppointmentTransferLoading: true,
    appointmentTransferErrorMessage: ''
  }),
  [APPOINTMENT_TRANSFER_SUCCESS]: (state, action) => ({
    ...state,
    appointmentTransferSucessMessage: action.payload.message,
    isAppointmentTransferLoading: false,
    appointmentTransferErrorMessage: ''
  }),
  [APPOINTMENT_TRANSFER_ERROR]: (state, action) => ({
    ...state,
    appointmentTransferSucessMessage: '',
    isAppointmentTransferLoading: false,
    appointmentTransferErrorMessage: action.payload.message
  })
}
const appointmentTransferDatehandlers = {
  [APPOINTMENT_TRANSFER_DATE_PENDING]: state => ({
    ...state,
    appointmentTransferDate: [],
    isAppointmentTransferDateLoading: true,
    appointmentTransferDateError: ''
  }),
  [APPOINTMENT_TRANSFER_DATE_SUCCESS]: (state, action) => ({
    ...state,
    appointmentTransferDate: action.payload.data,
    isAppointmentTransferDateLoading: false,
    appointmentTransferDateError: ''
  }),
  [APPOINTMENT_TRANSFER_DATE_ERROR]: (state, action) => ({
    ...state,
    appointmentTransferDate: [],
    isAppointmentTransferDateLoading: false,
    appointmentTransferDateError: action.payload.message
  })
}
const appointmentTransferTimehandlers = {
  [APPOINTMENT_TRANSFER_TIME_PENDING]: state => ({
    ...state,
    appointmentTransferTime: [],
    isAppointmentTransferTimeLoading: true,
    appointmentTransferTimeError: ''
  }),
  [APPOINTMENT_TRANSFER_TIME_SUCCESS]: (state, action) => ({
    ...state,
    appointmentTransferTime: action.payload.data,
    isAppointmentTransferTimeLoading: false,
    appointmentTransferTimeError: ''
  }),
  [APPOINTMENT_TRANSFER_TIME_ERROR]: (state, action) => ({
    ...state,
    appointmentTransferTime: [],
    isAppointmentTransferTimeLoading: false,
    appointmentTransferTimeError: action.payload.message
  })
}

const appointmentTransferChargehandlers = {
  [APPOINTMENT_TRANSFER_CHARGE_PENDING]: state => ({
    ...state,
    appointmentTransferCharge: 0,
    isAppointmentTransferChargeLoading: true,
    appointmentTransferChargeError: ''
  }),
  [APPOINTMENT_TRANSFER_CHARGE_SUCCESS]: (state, action) => ({
    ...state,
    appointmentTransferCharge: action.payload.data,
    isAppointmentTransferChargeLoading: false,
    appointmentTransferChargeError: ''
  }),
  [APPOINTMENT_TRANSFER_CHARGE_ERROR]: (state, action) => ({
    ...state,
    appointmentTransferCharge: 0,
    isAppointmentTransferChargeLoading: false,
    appointmentTransferChargeError: action.payload.message
  })
}

const appointmentSearchHandlers = {
  [APPOINTMENT_TRANSFER_SEARCH_PENDING]: state => ({
    ...state,
    appointmentTransferList: [],
    isAppointmentTransferSearchLoading: true,
    appointmentTransferSearchErrorMessage: '',
    totalItems:0,
  }),
  [APPOINTMENT_TRANSFER_SEARCH_SUCCESS]: (state, action) => ({
    ...state,
    appointmentTransferList: action.payload.data.response,
    isAppointmentTransferSearchLoading: false,
    appointmentTransferSearchErrorMessage: '',
    totalItems:action.payload.data.totalItems
  }),
  [APPOINTMENT_TRANSFER_SEARCH_ERROR]: (state, action) => ({
    ...state,
    appointmentTransferList: [],
    isAppointmentTransferSearchLoading: false,
    appointmentTransferSearchErrorMessage: action.payload.message,
    totalItems:0
  })
}

const appointmentTransferPreviewHandler = {
  [APPOINTMENT_TRANSFER_PREVIEW_PENDING]: state => ({
    ...state,
    appointmentTransferInfo: null,
    isAppointmentTransferInfoLoading: true,
    appointmentTransferInfoErrorMessage: ''
  }),
  [APPOINTMENT_TRANSFER_PREVIEW_SUCCESS]: (state, action) => ({
    ...state,
    appointmentTransferInfo: action.payload.data,
    isAppointmentTransferInfoLoading: false,
    appointmentTransferInfoErrorMessage: ''
  }),
  [APPOINTMENT_TRANSFER_PREVIEW_ERROR]: (state, action) => ({
    ...state,
    appointmentTransferInfo: null,
    isAppointmentTransferInfoLoading: false,
    appointmentTransferInfoErrorMessage: action.payload.message
  })
}

//Reducers
export const AppointmentTransferReducers = {
  appointmentTransferReducer: createReducerFactory(
    appointmentTransferhandlers,
    initialState.transferInitialData
  ),
  appointmentTransferDateReducer: createReducerFactory(
    appointmentTransferDatehandlers,
    initialState.transferDate
  ),
  appointmentTransferTimeReducer: createReducerFactory(
    appointmentTransferTimehandlers,
    initialState.transferTime
  ),
  appointmentTransferChargeReducer: createReducerFactory(
    appointmentTransferChargehandlers,
    initialState.transferCharge
  ),

  appointmentTransferPreviewReducer: createReducerFactory(
    appointmentTransferPreviewHandler,
    initialState.transferInfo
  ),
  appointmentTransferSearchReducer: createReducerFactory(
    appointmentSearchHandlers,
    initialState.transferSearch
  )
}
