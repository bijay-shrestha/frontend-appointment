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
  APPOINTMENT_TRANSFER_INFO_ERROR,
  APPOINTMENT_TRANSFER_INFO_PENDING,
  APPOINTMENT_TRANSFER_INFO_SUCCESS,
  APPOINTMENT_TRANSFER_PENDING,
  APPOINTMENT_TRANSFER_SUCCESS,
  APPOINTMENT_TRANSFER_TIME_ERROR,
  APPOINTMENT_TRANSFER_TIME_PENDING,
  APPOINTMENT_TRANSFER_TIME_SUCCESS
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
    isAppointmentTransferInfoLoading: false,
    appointmentTransferInfoErrorMessage: ''
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

const appointmentTransferInfohandlers = {
    [APPOINTMENT_TRANSFER_INFO_PENDING]: state => ({
      ...state,
      appointmentTransferInfo:[],
      isAppointmentTransferInfoLoading: true,
      appointmentTransferInfoErrorMessage: ''
    }),
    [APPOINTMENT_TRANSFER_INFO_SUCCESS]: (state, action) => ({
      ...state,
      appointmentTransferInfo:action.payload.data,
      isAppointmentTransferInfoLoading: false,
      appointmentTransferInfoErrorMessage: ''
    }),
    [APPOINTMENT_TRANSFER_INFO_ERROR]: (state, action) => ({
      ...state,
      appointmentTransferInfo:[],
      isAppointmentTransferInfoLoading: false,
      appointmentTransferInfoErrorMessage:action.payload.message
    })
  }
  
//Reducers
export const AppointmentTransferReducers={
  appointmentTransferReducer : createReducerFactory(
  appointmentTransferhandlers,
  initialState.transferInitialData
),
  appointmentTransferDateReducer:createReducerFactory(
  appointmentTransferDatehandlers,
  initialState.transferDate
),
appointmentTrasferTimeReducer:createReducerFactory(
  appointmentTransferTimehandlers,
  initialState.transferTime
),
appointmentTrasferChargeReducer:createReducerFactory(
    appointmentTransferChargehandlers,
    initialState.transferCharge
),
appointmentTrasferInfoReducer:createReducerFactory(
    appointmentTransferInfohandlers,
    initialState.transferInfo
)
}  