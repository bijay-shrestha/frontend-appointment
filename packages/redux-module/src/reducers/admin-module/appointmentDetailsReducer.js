import {appointmentDetailsConstants} from '@frontend-appointment/action-module'

const {
  CLEAR_REFUND_LIST_MESSAGE,
  REFUND_FETCH_ERROR,
  REFUND_FETCH_START,
  REFUND_FETCH_SUCCESS
} = appointmentDetailsConstants

const initialState = {
  refundList: [],
  isRefundListLoading: true,
  refundErrorMessage: ''
};

export const AppointmentRefundListReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case REFUND_FETCH_START:
            return {
                ...state,
                refundList: [...state.refundList],
                isRefundListLoading: true,
                refundErrorMessage: ''
            };
        case REFUND_FETCH_SUCCESS:
            return {
                ...state,
                refundList: [...action.payload.data],
                isRefundListLoading: false,
                refundErrorMessage: ''
            };
        case REFUND_FETCH_ERROR:
            return {
                ...state,
                refundList: [...state.refundList],
                isRefundListLoading: false,
                refundErrorMessage: action.payload.data
            };
        case CLEAR_REFUND_LIST_MESSAGE:
            return {
                ...state,
                refundErrorMessage: ''
            };
        default:
            return {...state}
    }
};
