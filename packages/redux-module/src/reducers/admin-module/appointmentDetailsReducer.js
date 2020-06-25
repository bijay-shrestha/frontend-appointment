import {appointmentDetailsConstants} from '@frontend-appointment/action-module'

const {
  CLEAR_REFUND_LIST_MESSAGE,
  REFUND_FETCH_ERROR,
  REFUND_FETCH_START,
  REFUND_FETCH_SUCCESS,
  APPROVAL_FETCH_ERROR,
  APPROVAL_FETCH_START,
  APPROVAL_FETCH_SUCCESS,
  CLEAR_APPROVAL_LIST_MESSAGE,
  CLEAR_LOG_LIST_MESSAGE,
  CLEAR_STATUS_LIST_MESSAGE,
  LOG_FETCH_ERROR,
  LOG_FETCH_START,
  LOG_FETCH_SUCCESS,
  STATUS_FETCH_ERROR,
  STATUS_FETCH_START,
  STATUS_FETCH_SUCCESS,
  REFUND_ERROR,
  REFUND_REJECT_ERROR,
  REFUND_REJECT_START,
  REFUND_REJECT_SUCCESS,
  REFUND_START,
  REFUND_SUCCESS,
  SEARCH_RESCHEDULE_LOG_ERROR,
  SEARCH_RESCHEDULE_LOG_SUCCESS,
  SEARCH_RESCHEDULE_LOG_START,
  CLEAR_RESCHEDULE_LOG_MESSAGE,
  REJECT_ERROR,
  REJECT_START,
  REJECT_SUCCESS,
  APPROVE_ERROR,
  APPROVE_START,
  APPROVE_SUCCESS,
  APPROVAL_DETAIL_FETCH_SUCCESS,
  APPROVAL_DETAIL_FETCH_ERROR,
  APPROVAL_DETAIL_FETCH_START,
  CLEAR_APPROVAL_DETAIL_MESSAGE,
  REFUND_DETAIL_FETCH_SUCCESS,
  REFUND_DETAIL_FETCH_START,
  REFUND_DETAIL_FETCH_ERROR,
  FETCH_TRANSACTION_LOGS_SUCCESS,
  FETCH_TRANSACTION_LOGS_PENDING,
  FETCH_TRANSACTION_LOGS_ERROR,
  CLEAR_TRANSACTION_LOGS_MESSAGE,
  FETCH_APPOINTMENT_STATUS_BY_DEPARTMENT_ERROR,
  //CLEAR_REFUND_DETAIL_MESSAGE,
  FETCH_APPOINTMENT_STATUS_BY_DEPARTMENT_PENDING,
  FETCH_APPOINTMENT_STATUS_BY_DEPARTMENT_SUCCESS,
  FETCH_APPOINTMENT_STATUS_BY_ROOM_ERROR,
  FETCH_APPOINTMENT_STATUS_BY_ROOM_PENDING,
  FETCH_APPOINTMENT_STATUS_BY_ROOM_SUCCESS
} = appointmentDetailsConstants

const initialState = {
  refundList: [],
  isRefundListLoading: true,
  refundErrorMessage: '',
  totalRefundAmount: '',
  totalItems: ''
}
const refundRejectState = {
  refundRejectSuccess: '',
  refundRejectError: '',
  isRefundRejectLoading: false
}
const refundState = {
  refundSuccess: '',
  refundError: '',
  isRefundLoading: ''
}
const appointmentLogState = {
  logList: [],
  isLogListLoading: true,
  logErrorMessage: '',
  appointmentStatistics: '',
  totalItems: ''
}

const transactionLogState = {
  logList: [],
  isLogListLoading: true,
  logErrorMessage: '',
  appointmentStatistics: '',
  totalItems: ''
}

const appointmentApprovalState = {
  approvalList: [],
  isApprovalListLoading: true,
  approvalErrorMessage: '',
  totalAmount: '',
  totalItems: ''
}

const appointmentStatusState = {
  statusList: null,
  isStatusListLoading: false,
  statusErrorMessage: '',
  totalAmount: '',
  totalItems: ''
}

const appointmentStatusByDepartment = {
  apptStatusInfo: [],
  doctorStatusInfo: [],
  isAppointmentStatusListLoading: false,
  isAppointmentStatusErrorMessage: ''
}

const appointmentStatusByRoom = {
  apptRoomStatusInfo: [],
  isAppointmentStatusByRoomListLoading: false,
  isAppointmentStatusByRoomErrorMessage: ''
}

const rescheduleLogState = {
  rescheduleLogList: [],
  isRescheduleLogLoading: false,
  rescheduleLogErrorMessage: '',
  totalAmount: '',
  totalItems: ''
}

const appointmentApproveState = {
  isApproveLoading: true,
  approveSuccessMessage: '',
  approveErrorMessage: ''
}

const appointmentRejectState = {
  isAppointmentRejectLoading: true,
  appointmentRejectSuccessMessage: '',
  appointmentRejectErrorMessage: ''
}

const appointmentApprovalDetailState = {
  isAppointmentDetailFetchLoading: false,
  appointmentDetail: {},
  appointmentDetailErrorMessage: ''
}

const appointmentRefundDetailState = {
  isRefundDetailFetchLoading: false,
  refundDetail: {},
  refundDetailErrorMessage: ''
}

export const AppointmenStatusByDepartmentListReducer = (
  state = {...appointmentStatusByDepartment},
  action
) => {
  switch (action.type) {
    case FETCH_APPOINTMENT_STATUS_BY_DEPARTMENT_PENDING:
      return {
        ...state,
        apptStatusInfo: [],
        doctorStatusInfo: [],
        isAppointmentStatusListLoading: true,
        isAppointmentStatusErrorMessage: ''
      }
    case FETCH_APPOINTMENT_STATUS_BY_DEPARTMENT_SUCCESS:
      return {
        ...state,
        apptStatusInfo: action.payload.data.hospitalDeptDutyRosterInfo,
        doctorStatusInfo: action.payload.data.hospitalDeptAndDoctorInfo,
        isAppointmentStatusListLoading: false,
        isAppointmentStatusErrorMessage: ''
      }
    case FETCH_APPOINTMENT_STATUS_BY_DEPARTMENT_ERROR:
      return {
        ...state,
        apptStatusInfo: [],
        doctorStatusInfo: [],
        isAppointmentStatusListLoading: false,
        isAppointmentStatusErrorMessage: action.payload.message
      }
    default:
      return {...state}
  }
}

export const AppointmenStatusByRoomListReducer = (
  state = {...appointmentStatusByRoom},
  action
) => {
  switch (action.type) {
    case FETCH_APPOINTMENT_STATUS_BY_ROOM_PENDING:
      return {
        apptRoomStatusInfo: [],
        isAppointmentStatusByRoomListLoading: true,
        isAppointmentStatusByRoomErrorMessage: ''
      }
    case FETCH_APPOINTMENT_STATUS_BY_ROOM_SUCCESS:
      return {
        ...state,
        apptRoomStatusInfo: action.payload.data,
        isAppointmentStatusByRoomListLoading: false,
        isAppointmentStatusByRoomErrorMessage: ''
      }
    case FETCH_APPOINTMENT_STATUS_BY_ROOM_ERROR:
      return {
        ...state,
        apptRoomStatusInfo: [],
        isAppointmentStatusByRoomListLoading: false,
        isAppointmentStatusByRoomErrorMessage:action.payload.message
      }
    default:
      return {...state}
  }
}

export const AppointmentRefundListReducer = (
  state = {...initialState},
  action
) => {
  switch (action.type) {
    case REFUND_FETCH_START:
      return {
        ...state,
        refundList: [],
        isRefundListLoading: true,
        refundErrorMessage: '',
        totalRefundAmount: '',
        totalItems: ''
      }
    case REFUND_FETCH_SUCCESS:
      return {
        ...state,
        refundList: [...action.payload.data.refundAppointments],
        isRefundListLoading: false,
        refundErrorMessage: '',
        totalRefundAmount: action.payload.data.totalRefundAmount,
        totalItems: action.payload.data.totalItems
      }
    case REFUND_FETCH_ERROR:
      return {
        ...state,
        refundList: [],
        isRefundListLoading: false,
        refundErrorMessage: action.payload.data,
        totalRefundAmount: '',
        totalItems: ''
      }
    case CLEAR_REFUND_LIST_MESSAGE:
      return {
        ...state,
        refundErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentRefundRejectReducer = (
  state = {...refundRejectState},
  action
) => {
  switch (action.type) {
    case REFUND_REJECT_START:
      return {
        ...state,
        refundRejectSuccess: '',
        refundRejectError: '',
        isRefundRejectLoading: true
      }
    case REFUND_REJECT_SUCCESS:
      return {
        ...state,
        refundRejectSuccess: 'Refund Rejected Successfully',
        refundRejectError: '',
        isRefundRejectLoading: true
      }
    case REFUND_REJECT_ERROR:
      return {
        ...state,
        refundRejectSuccess: '',
        refundRejectError: action.payload.message,
        isRefundRejectLoading: true
      }
    case 'CLEAR_REFUND_REJECT_MESSAGE':
      return {
        ...state,
        refundRejectError: '',
        refundRejectSuccess: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentRefundReducer = (state = {...refundState}, action) => {
  switch (action.type) {
    case REFUND_START:
      return {
        ...state,
        refundSuccess: '',
        refundError: '',
        isRefundLoading: true
      }
    case REFUND_SUCCESS:
      return {
        ...state,
        refundSuccess: 'Refunded Successfully',
        refundError: '',
        isRefundLoading: false
      }
    case REFUND_ERROR:
      return {
        ...state,
        refundSuccess: '',
        refundError: action.payload.message,
        isRefundLoading: false
      }
    case 'CLEAR_REFUND_MESSAGE':
      return {
        ...state,
        refundSuccess: '',
        refundError: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentLogListReducer = (
  state = {...appointmentLogState},
  action
) => {
  switch (action.type) {
    case LOG_FETCH_START:
      return {
        ...state,
        logList: [],
        isLogListLoading: true,
        logErrorMessage: '',
        appointmentStatistics: '',
        totalItems: ''
      }
    case LOG_FETCH_SUCCESS:
      return {
        ...state,
        logList: [...action.payload.data.appointmentLogs],
        isLogListLoading: false,
        logErrorMessage: '',
        appointmentStatistics: {
          bookedInfo: action.payload.data.bookedInfo,
          checkedInInfo: action.payload.data.checkedInInfo,
          cancelledInfo: action.payload.data.cancelledInfo,
          refundInfo: action.payload.data.refundInfo,
          revenueFromRefundInfo: action.payload.data.revenueFromRefundInfo,
          totalAmount: action.payload.data.totalAmount
        },
        totalItems: action.payload.data.totalItems
      }
    case LOG_FETCH_ERROR:
      return {
        ...state,
        logList: [],
        isLogListLoading: false,
        logErrorMessage: action.payload.data,
        appointmentStatistics: '',
        totalItems: ''
      }
    case CLEAR_LOG_LIST_MESSAGE:
      return {
        ...state,
        logErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentApprovalListReducer = (
  state = {...appointmentApprovalState},
  action
) => {
  switch (action.type) {
    case APPROVAL_FETCH_START:
      return {
        ...state,
        approvalList: [],
        isApprovalListLoading: true,
        approvalErrorMessage: '',
        totalAmount: '',
        totalItems: ''
      }
    case APPROVAL_FETCH_SUCCESS:
      return {
        ...state,
        approvalList: [...action.payload.data.pendingAppointmentApprovals],
        isApprovalListLoading: false,
        approvalErrorMessage: '',
        totalAmount: action.payload.data.totalAmount,
        totalItems: action.payload.data.totalItems
      }
    case APPROVAL_FETCH_ERROR:
      return {
        ...state,
        approvalList: [],
        isApprovalListLoading: false,
        approvalErrorMessage: action.payload.data,
        totalAmount: '',
        totalItems: ''
      }
    case CLEAR_APPROVAL_LIST_MESSAGE:
      return {
        ...state,
        approvalErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentStatusListReducer = (
  state = {...appointmentStatusState},
  action
) => {
  switch (action.type) {
    case STATUS_FETCH_START:
      return {
        ...state,
        statusList: null,
        isStatusListLoading: true,
        statusErrorMessage: '',
        totalAmount: '',
        totalItems: ''
      }
    case STATUS_FETCH_SUCCESS:
      return {
        ...state,
        statusList: action.payload.data,
        isStatusListLoading: false,
        statusErrorMessage: '',
        totalAmount: '',
        totalItems: ''
      }
    case STATUS_FETCH_ERROR:
      return {
        ...state,
        statusList: null,
        isStatusListLoading: false,
        statusErrorMessage: action.payload.errorMessage,
        totalAmount: '',
        totalItems: ''
      }
    case CLEAR_STATUS_LIST_MESSAGE:
      return {
        ...state,
        statusErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const RescheduleLogReducer = (
  state = {...rescheduleLogState},
  action
) => {
  switch (action.type) {
    case SEARCH_RESCHEDULE_LOG_START:
      return {
        ...state,
        rescheduleLogList: [],
        isRescheduleLogLoading: true,
        rescheduleLogErrorMessage: '',
        totalAmount: '',
        totalItems: ''
      }
    case SEARCH_RESCHEDULE_LOG_SUCCESS:
      return {
        ...state,
        rescheduleLogList: [
          ...action.payload.data.appointmentRescheduleLogDTOS
        ],
        isRescheduleLogLoading: false,
        rescheduleLogErrorMessage: '',
        totalAmount: action.payload.data.totalAmount,
        totalItems: action.payload.data.totalItems
      }
    case SEARCH_RESCHEDULE_LOG_ERROR:
      return {
        ...state,
        rescheduleLogList: [],
        isRescheduleLogLoading: false,
        rescheduleLogErrorMessage: action.payload.errorMessage,
        totalAmount: '',
        totalItems: ''
      }
    case CLEAR_RESCHEDULE_LOG_MESSAGE:
      return {
        ...state,
        rescheduleLogErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentRejectReducer = (
  state = {...appointmentRejectState},
  action
) => {
  switch (action.type) {
    case REJECT_START:
      return {
        ...state,
        isAppointmentRejectLoading: true,
        appointmentRejectSuccessMessage: '',
        appointmentRejectErrorMessage: ''
      }
    case REJECT_SUCCESS:
      return {
        ...state,
        isAppointmentRejectLoading: true,
        appointmentRejectSuccessMessage: 'Appointment Rejected Successfully',
        appointmentRejectErrorMessage: ''
      }
    case REJECT_ERROR:
      return {
        ...state,
        isAppointmentRejectLoading: true,
        appointmentRejectSuccessMessage: '',
        appointmentRejectErrorMessage: action.payload.data
      }
    case 'CLEAR_APPOINTMENT_REJECT_MESSAGE':
      return {
        ...state,
        appointmentRejectSuccessMessage: '',
        appointmentRejectErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentApproveReducer = (
  state = {...appointmentApproveState},
  action
) => {
  switch (action.type) {
    case APPROVE_START:
      return {
        ...state,
        isApproveLoading: true,
        approveSuccessMessage: '',
        approveErrorMessage: ''
      }
    case APPROVE_SUCCESS:
      return {
        ...state,
        isApproveLoading: true,
        approveSuccessMessage: 'Checked-In Successfully',
        approveErrorMessage: ''
      }
    case APPROVE_ERROR:
      return {
        ...state,
        isApproveLoading: true,
        approveSuccessMessage: '',
        approveErrorMessage: action.payload.data
      }
    case 'CLEAR_APPOINTMENT_APPROVE_MESSAGE':
      return {
        ...state,
        approveSuccessMessage: '',
        approveErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentDetailReducer = (
  state = {...appointmentApprovalDetailState},
  action
) => {
  switch (action.type) {
    case APPROVAL_DETAIL_FETCH_START:
      return {
        ...state,
        isAppointmentDetailFetchLoading: true,
        appointmentDetail: {},
        appointmentDetailErrorMessage: ''
      }
    case APPROVAL_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        isAppointmentDetailFetchLoading: false,
        appointmentDetail: {...action.payload.data},
        appointmentDetailErrorMessage: ''
      }
    case APPROVAL_DETAIL_FETCH_ERROR:
      return {
        ...state,
        isAppointmentDetailFetchLoading: false,
        appointmentDetail: {},
        appointmentDetailErrorMessage: action.payload.errorMessage
      }
    case CLEAR_APPROVAL_DETAIL_MESSAGE:
      return {
        ...state,
        appointmentDetailErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const AppointmentRefundDetailReducer = (
  state = {...appointmentRefundDetailState},
  action
) => {
  switch (action.type) {
    case REFUND_DETAIL_FETCH_START:
      return {
        ...state,
        isRefundDetailFetchLoading: true,
        refundDetail: {},
        refundDetailErrorMessage: ''
      }
    case REFUND_DETAIL_FETCH_SUCCESS:
      return {
        ...state,
        isRefundDetailFetchLoading: false,
        refundDetail: {...action.payload.data},
        refundDetailErrorMessage: ''
      }
    case REFUND_DETAIL_FETCH_ERROR:
      return {
        ...state,
        isRefundDetailFetchLoading: false,
        refundDetail: {},
        refundDetailErrorMessage: action.payload.errorMessage
      }
    case CLEAR_REFUND_LIST_MESSAGE:
      return {
        ...state,
        refundDetailErrorMessage: ''
      }
    default:
      return {...state}
  }
}

export const TransactionLogReducer = (
  state = {...transactionLogState},
  action
) => {
  switch (action.type) {
    case FETCH_TRANSACTION_LOGS_PENDING:
      return {
        ...state,
        logList: [],
        isLogListLoading: true,
        logErrorMessage: '',
        appointmentStatistics: '',
        totalItems: ''
      }
    case FETCH_TRANSACTION_LOGS_SUCCESS:
      return {
        ...state,
        logList: [...action.payload.data.transactionLogs],
        isLogListLoading: false,
        logErrorMessage: '',
        appointmentStatistics: {
          bookedInfo: action.payload.data.bookedInfo,
          checkedInInfo: action.payload.data.checkedInInfo,
          cancelledInfo: action.payload.data.cancelledInfo,
          refundInfo: action.payload.data.refundInfo,
          revenueFromRefundInfo: action.payload.data.revenueFromRefundInfo,
          totalAmount: action.payload.data.totalAmount
        },
        totalItems: action.payload.data.totalItems
      }
    case FETCH_TRANSACTION_LOGS_ERROR:
      return {
        ...state,
        logList: [],
        isLogListLoading: false,
        logErrorMessage: action.payload.data,
        appointmentStatistics: '',
        totalItems: ''
      }
    case CLEAR_TRANSACTION_LOGS_MESSAGE:
      return {
        ...state,
        logErrorMessage: ''
      }
    default:
      return {...state}
  }
}
