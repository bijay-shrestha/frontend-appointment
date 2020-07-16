import {Axios} from '@frontend-appointment/core'

export const fetchHmacTokenByAppointmentId = async(path, appointmentId) => {
    try {
        const response = await Axios.getWithPathVariables(path, appointmentId);
        return response.data;
    } catch (e) {
        throw e
    }
}
