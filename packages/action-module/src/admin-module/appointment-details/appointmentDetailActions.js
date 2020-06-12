import {appointmentDetailsConstants} from './appointmentDetailActionConstants'

const {
  REFUND_FETCH_START,
  REFUND_FETCH_SUCCESS,
  REFUND_FETCH_ERROR,
  CLEAR_REFUND_LIST_MESSAGE,
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
  REFUND_START,
  REFUND_SUCCESS,
  REFUND_REJECT_ERROR,
  REFUND_REJECT_START,
  REFUND_REJECT_SUCCESS,
  SEARCH_RESCHEDULE_LOG_START,
  SEARCH_RESCHEDULE_LOG_SUCCESS,
  SEARCH_RESCHEDULE_LOG_ERROR,
  CLEAR_RESCHEDULE_LOG_MESSAGE,
  APPROVE_ERROR,
  APPROVE_START,
  APPROVE_SUCCESS,
  REJECT_ERROR,
  REJECT_START,
  REJECT_SUCCESS,
  APPROVAL_DETAIL_FETCH_START,
  APPROVAL_DETAIL_FETCH_ERROR,
  APPROVAL_DETAIL_FETCH_SUCCESS,
  CLEAR_APPROVAL_DETAIL_MESSAGE,

  REFUND_DETAIL_FETCH_ERROR,
  REFUND_DETAIL_FETCH_START,
  REFUND_DETAIL_FETCH_SUCCESS,
  CLEAR_TRANSACTION_LOGS_MESSAGE,
  FETCH_TRANSACTION_LOGS_ERROR,
  FETCH_TRANSACTION_LOGS_PENDING,
  FETCH_TRANSACTION_LOGS_SUCCESS,
  
} = appointmentDetailsConstants

export const appointmentRefundFetchingStart = () => {
  return {
    type: REFUND_FETCH_START
  }
}

export const appointmentRefundFetchingSuccess = data => {
  return {
    type: REFUND_FETCH_SUCCESS,
    payload: {data}
  }
}

export const appointmentRefundFetchingError = message => {
  return {
    type: REFUND_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const clearAppointmentSuccessMessage = () => {
  return {
    type: CLEAR_REFUND_LIST_MESSAGE
  }
}

export const appointmentApprovalFetchingStart = () => {
  return {
    type: APPROVAL_FETCH_START
  }
}

export const appointmentApprovalFetchingSuccess = data => {
  return {
    type: APPROVAL_FETCH_SUCCESS,
    payload: {data}
  }
}

export const appointmentApprovalFetchingError = message => {
  return {
    type: APPROVAL_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const clearAppointmentApprovalMessage = () => {
  return {
    type: CLEAR_APPROVAL_LIST_MESSAGE
  }
}

export const appointmentLogFetchingStart = () => {
  return {
    type: LOG_FETCH_START
  }
}

export const appointmentLogFetchingSuccess = data => {
  return {
    type: LOG_FETCH_SUCCESS,
    payload: {data}
  }
}

export const appointmentLogFetchingError = message => {
  return {
    type: LOG_FETCH_ERROR,
    payload: {
      data: message
    }
  }
}

export const clearAppointmentLogMessage = () => {
  return {
    type: CLEAR_LOG_LIST_MESSAGE
  }
}

export const appointmentStatusFetchingStart = () => {
  return {
    type: STATUS_FETCH_START
  }
}

export const appointmentStatusFetchingSuccess = data => {
  return {
    type: STATUS_FETCH_SUCCESS,
    payload: {data}
  }
}

export const appointmentStatusFetchingError = message => {
  return {
    type: STATUS_FETCH_ERROR,
    payload: {
      errorMessage: message
    }
  }
}

export const clearAppointmentStatusMessage = () => {
  return {
    type: CLEAR_STATUS_LIST_MESSAGE
  }
}

export const appointmentRefundRejectStart = () => {
  return {
    type: REFUND_REJECT_START
  }
}

export const appointmentRefundRejectSuccess = message => {
  return {
    type: REFUND_REJECT_SUCCESS,
    payload: {data: message}
  }
}

export const appointmentRefundRejectError = message => {
  return {
    type: REFUND_REJECT_ERROR,
    payload: {
      data: message
    }
  }
}

export const appointmentRefundStart = () => {
  return {
    type: REFUND_START
  }
}

export const appointmentRefundSuccess = message => {
  return {
    type: REFUND_SUCCESS,
    payload: {data: message}
  }
}

export const appointmentRefundError = message => {
  return {
    type: REFUND_ERROR,
    payload: {
      data: message
    }
  }
}

export const searchRescheduleStart = () => {
  return {
    type: SEARCH_RESCHEDULE_LOG_START
  }
}

export const searchRescheduleSuccess = data => {
  return {
    type: SEARCH_RESCHEDULE_LOG_SUCCESS,
    payload: {
      data
    }
  }
}

export const searchRescheduleError = errorMessage => {
  return {
    type: SEARCH_RESCHEDULE_LOG_ERROR,
    payload: {
      errorMessage
    }
  }
}

export const clearRescheduleLogMessage = () => {
  return {
    type: CLEAR_RESCHEDULE_LOG_MESSAGE
  }
}

export const appointmentApproveStart = () => {
  return {
    type: APPROVE_START
  }
}

export const appointmentApproveSuccess = message => {
  return {
    type: APPROVE_SUCCESS,
    payload: {data: message}
  }
}

export const appointmentApproveError = message => {
  return {
    type: APPROVE_ERROR,
    payload: {
      data: message
    }
  }
}

export const appointmentRejectStart = () => {
  return {
    type: REJECT_START
  }
}

export const appointmentRejectSuccess = message => {
  return {
    type: REJECT_SUCCESS,
    payload: {data: message}
  }
}

export const appointmentRejectError = message => {
  return {
    type: REJECT_ERROR,
    payload: {
      data: message
    }
  }
}

export const appointmentApprovaldDetailFetchingStart = () => {
  return {
    type: APPROVAL_DETAIL_FETCH_START
  }
}

export const appointmentApprovalDetailFetchingSuccess = data => {
  return {
    type: APPROVAL_DETAIL_FETCH_SUCCESS,
    payload: {data}
  }
}

export const appointmentApprovalDetailFetchingError = message => {
  return {
    type: APPROVAL_DETAIL_FETCH_ERROR,
    payload: {
      errorMessage: message
    }
  }
}

export const clearAppointmentApprovalDetailMessage = message => {
  return {
    type: CLEAR_APPROVAL_DETAIL_MESSAGE,
    payload: {
      errorMessage: message
    }
  }
}

export const appointmentRefundDetailFetchingStart = () => {
  return {
    type: REFUND_DETAIL_FETCH_START
  }
}

export const appointmentRefundDetailFetchingSuccess = data => {
  return {
    type: REFUND_DETAIL_FETCH_SUCCESS,
    payload: {data}
  }
}

export const appointmentRefundDetailFetchingError = message => {
  return {
    type: REFUND_DETAIL_FETCH_ERROR,
    payload: {
      errorMessage: message
    }
  }
}

export const clearAppointmentRefundDetailMessage = message => {
  return {
    type: CLEAR_REFUND_LIST_MESSAGE,
    payload: {
      errorMessage: message
    }
  }
}

export const transactionLogFetchingStart = () => {
  return {
    type: FETCH_TRANSACTION_LOGS_PENDING
  }
}

export const transactionLogFetchingSuccess = data => {
  return {
    type: FETCH_TRANSACTION_LOGS_SUCCESS,
    payload: {data}
  }
}

export const transactionLogFetchingError = message => {
  return {
    type: FETCH_TRANSACTION_LOGS_ERROR,
    payload: {
      data: message
    }
  }
}

export const clearTransactionLogMessage = () => {
  return {
    type: CLEAR_TRANSACTION_LOGS_MESSAGE
  }
}
