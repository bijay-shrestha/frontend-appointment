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
    CLEAR_RESCHEDULE_LOG_MESSAGE
} = appointmentDetailsConstants;

const initialState = {
    refundList: [],
    isRefundListLoading: true,
    refundErrorMessage: '',
    totalRefundAmount: '',
    totalItems: ''
};
const refundRejectState = {
    refundRejectSuccess: '',
    refundRejectError: '',
    isRefundRejectLoading: false
};
const refundState = {
    refundSuccess: '',
    refundError: '',
    isRefundLoading: ''
};
const appointmentLogState = {
    logList: [],
    isLogListLoading: true,
    logErrorMessage: '',
    totalAmount: '',
    totalItems: ''
};

const appointmentApprovalState = {
    approvalList: [],
    isApprovalListLoading: true,
    approvalErrorMessage: '',
    totalAmount: '',
    totalItems: ''
};

const appointmentStatusState = {
    statusList:null,
    isStatusListLoading: false,
    statusErrorMessage: '',
    totalAmount: '',
    totalItems: ''
};

const rescheduleLogState = {
    rescheduleLogList: [],
    isRescheduleLogLoading: false,
    rescheduleLogErrorMessage: '',
    totalAmount: '',
    totalItems: ''
};

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
                refundRejectError: action.payload.data.message,
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

export const AppointmentRefundReducer = (
    state = {...refundState},
    action
) => {
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
                refundError: action.payload.data.message,
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
                totalAmount: '',
                totalItems: ''
            }
        case LOG_FETCH_SUCCESS:
            return {
                ...state,
                logList: [...action.payload.data.appointmentLogs],
                isLogListLoading: false,
                logErrorMessage: '',
                totalAmount: action.payload.data.totalAmount,
                totalItems: action.payload.data.totalItems
            }
        case LOG_FETCH_ERROR:
            return {
                ...state,
                logList: [],
                isLogListLoading: false,
                logErrorMessage: action.payload.data,
                totalAmount: '',
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
                statusList:null,
                isStatusListLoading: true,
                statusErrorMessage: '',
                totalAmount: '',
                totalItems: ''
            };
        case STATUS_FETCH_SUCCESS:
            return {
                ...state,
                statusList: action.payload.data,
                isStatusListLoading: false,
                statusErrorMessage: '',
                totalAmount: '',
                totalItems: ''
            };
        case STATUS_FETCH_ERROR:
            return {
                ...state,
                statusList:null,
                isStatusListLoading: false,
                statusErrorMessage: action.payload.errorMessage,
                totalAmount: '',
                totalItems: ''
            };
        case CLEAR_STATUS_LIST_MESSAGE:
            return {
                ...state,
                statusErrorMessage: ''
            };
        default:
            return {...state}
    }
};

export const RescheduleLogReducer = (state = {...rescheduleLogState}, action) => {
    switch (action.type) {
        case SEARCH_RESCHEDULE_LOG_START:
            return {
                ...state,
                rescheduleLogList: [],
                isRescheduleLogLoading: true,
                rescheduleLogErrorMessage: '',
                totalAmount: '',
                totalItems: ''
            };
        case SEARCH_RESCHEDULE_LOG_SUCCESS:
            return {
                ...state,
                rescheduleLogList: [...action.payload.data.appointmentRescheduleLogDTOS],
                isRescheduleLogLoading: false,
                rescheduleLogErrorMessage: '',
                totalAmount: action.payload.data.totalAmount,
                totalItems: action.payload.data.totalItems
            };
        case SEARCH_RESCHEDULE_LOG_ERROR:
            return {
                ...state,
                rescheduleLogList: [],
                isRescheduleLogLoading: false,
                rescheduleLogErrorMessage: action.payload.errorMessage,
                totalAmount: '',
                totalItems: ''
            };
        case CLEAR_RESCHEDULE_LOG_MESSAGE:
            return {
                ...state,
                rescheduleLogErrorMessage: ''
            };
        default:
            return {...state}
    }
};
