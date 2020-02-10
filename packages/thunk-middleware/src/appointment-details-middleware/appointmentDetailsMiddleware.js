import {AppointmentDetailActions} from "@frontend-appointment/action-module";
import {Axios} from "@frontend-appointment/core";

export const fetchAppointmentRefundList = (path,pagination,data) => async dispatch => {
    dispatch(AppointmentDetailActions.appointmentRefundFetchingStart());
    try {
        const response = await Axios.putWithPagination(path,pagination,data);
        dispatch(AppointmentDetailActions.appointmentRefundFetchingSuccess(response.data));
    } catch (e) {
        dispatch(AppointmentDetailActions.appointmentRefundFetchingError(e.errorMessage||"Sorry Internal Server Problem"));
    }
};

export const clearAppointmentRefundPending = () => async dispatch => {
    dispatch(AppointmentDetailActions.clearAppointmentSuccessMessage());
}