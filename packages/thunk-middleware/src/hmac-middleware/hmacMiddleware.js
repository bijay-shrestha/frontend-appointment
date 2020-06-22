import {Axios} from '@frontend-appointment/core'

export const fetchHmacTokenByAppointmentId = (path, appointmentId) => async dispatch => {
    try {
        const response = await Axios.getWithPathVariables(path, appointmentId);
        return response.data;
    } catch (e) {
        throw e
    }
}
