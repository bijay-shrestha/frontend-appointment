import {appointmentDetailsConstants} from '@frontend-appointment/action-module'

const {
  CLEAR_REFUND_LIST_MESSAGE,
  REFUND_FETCH_ERROR,
  REFUND_FETCH_START,
  REFUND_FETCH_SUCCESS
} = appointmentDetailsConstants

const initialState = {
  refundList:[],
  isRefundListLoading: true,
  refundErrorMessage: '',
  totalRefundAmount:'',
  totalItems:''
};

export const AppointmentRefundListReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case REFUND_FETCH_START:
            return {
                ...state,
                refundList: [],
                isRefundListLoading: true,
                refundErrorMessage: '',
                totalRefundAmount:'',
                totalItems:''
            };
        case REFUND_FETCH_SUCCESS:
            return {
                ...state,
                refundList: [...action.payload.data.refundAppointments],
                isRefundListLoading: false,
                refundErrorMessage: '',
                totalRefundAmount:action.payload.data.totalRefundAmount,
                totalItems:action.payload.data.totalItems
            };
        case REFUND_FETCH_ERROR:
            return {
                ...state,
                refundList: [],
                isRefundListLoading: false,
                refundErrorMessage: action.payload.data,
                totalRefundAmount:'',
                totalItems:''
            };
        case CLEAR_REFUND_LIST_MESSAGE:
            return {
                ...state,
                refundErrorMessage: '',

            };
        default:
            return {...state}
    }
};
