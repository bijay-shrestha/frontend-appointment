import {Axios} from "@frontend-appointment/core";
import {AppointmentServiceTypeAction} from "@frontend-appointment/action-module";

export const fetchActiveAppointmentServiceType = (path) => async dispatch => {
    dispatch(AppointmentServiceTypeAction.fetchActiveAppointmentServiceTypePending());
    try {
        const response = await Axios.get(path);
        dispatch(AppointmentServiceTypeAction.fetchActiveAppointmentServiceTypeSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(AppointmentServiceTypeAction.fetchActiveAppointmentServiceTypeError(
            e.errorMessage ? e.errorMessage : 'Sorry, Internal Server Problem occurred!'))
    

    }
};

export const fetchActiveAppointmentServiceTypeWithCode = (path) => async dispatch => {
    dispatch(AppointmentServiceTypeAction.fetchActiveAppointmentServiceTypePendingWithCode());
    try {
        const response = await Axios.get(path);
        dispatch(AppointmentServiceTypeAction.fetchActiveAppointmentServiceTypeSuccessWithCode(response.data));
        return response;
    } catch (e) {
        dispatch(AppointmentServiceTypeAction.fetchActiveAppointmentServiceTypeErrorWithCode(
            e.errorMessage ? e.errorMessage : 'Sorry, Internal Server Problem occurred!'))
     

    }
};

