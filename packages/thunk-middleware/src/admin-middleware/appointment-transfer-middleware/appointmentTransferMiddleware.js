import {AppointmentTransferActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'
import {CommonUtils} from '@frontend-appointment/helpers'
import {MinioMiddleware} from '../../../index'

export const appointmentTransfer = (
    path,
    data
) => async dispatch => {
    dispatch(AppointmentTransferActions.appointmentTransferPending());
    try {
        await Axios.put(path, data);
        dispatch(
            AppointmentTransferActions.appointmentTransferSuccess('Appointment Successfully transfered')
        )
    } catch (e) {
        dispatch(
            AppointmentTransferActions.appointmentTransferError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
        throw e;
    }
};

// export const clearAppointmentRefundPending = () => async dispatch => {
//   //  dispatch(AppointmentDetailActions.clearAppointmentSuccessMessage())
// };

export const fetchAppointmentTransferDate = (
    path,
    data
) => async dispatch => {
    dispatch(AppointmentTransferActions.appointmentTransferDatePending());
    try {
        const response = await Axios.put(path, data);
        dispatch(
            AppointmentTransferActions.appointmentTransferDateSuccess(response.data)
        )
    } catch (e) {
        dispatch(
            AppointmentTransferActions.appointmentTransferDateError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
};

export const fetchAppointmentTransferTime = (path, data) => async dispatch => {
    dispatch(AppointmentTransferActions.appointmentTransferTimePending());
    try {
        const response = await Axios.put(path, data);
        dispatch(AppointmentTransferActions.appointmentTransferTimeSuccess(response.data));
    } catch (e) {
        dispatch(AppointmentTransferActions.appointmentTransferTimeError(e.errorMessage ?
            e.errorMessage : "Sorry,Internal Server problem!"));

    }
};

// export const clearAppointmentApprovalMessage = () => async dispatch => {
//     dispatch(AppointmentDetailActions.clearAppointmentApprovalMessage())
// };

export const fetchAppointmentTransferCharge = (
    path,
    data
) => async dispatch => {
    dispatch(AppointmentTransferActions.appointmentTransferChargePending());
    try {
        const response = await Axios.put(path, data);
        dispatch(
            AppointmentTransferActions.appointmentTransferChargeSuccess(response.data)
        )
    } catch (e) {
        console.log(e);
        dispatch(
            AppointmentTransferActions.appointmentTransferChargeError(
                e.errorMessage || 'Sorry Internal Server Problem'
            )
        )
    }
};

// export const clearAppointmentLogMessage = () => async dispatch => {
//     dispatch(AppointmentDetailActions.clearAppointmentLogMessage())
// };

export const fetchAppointmentTransferSearch = (path, pagination, data) => async dispatch => {
    dispatch(AppointmentTransferActions.appointmentTransferSearchPending());
    try {
        const response = await Axios.putWithPagination(path, pagination, data);
        let dataWithSn = CommonUtils.appendSerialNumberToDataList(response.data.response,
            pagination.page, pagination.size);
        let dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithSn, "transferredFromFileUri");
        dataWithPresignedUrl = await MinioMiddleware.getDataListWithPresignedFileUri(dataWithPresignedUrl, "transferredToFileUri")
        dispatch(AppointmentTransferActions.appointmentTransferSearchSuccess({
            ...response.data,
            response: dataWithPresignedUrl
        }));
        return response.data;
    } catch (e) {
        dispatch(AppointmentTransferActions.appointmentTransferSearchError(e.errorMessage || 'Sorry Internal Server Problem'))
    }
};

export const fetchAppointmentPreviewInfo = (path, id) => async dispatch => {
    dispatch(AppointmentTransferActions.appointmentTransferPreviewPending());
    try {
        const response = await Axios.getWithPathVariables(path, id);
        let dataWithFileUri = response.data
        dataWithFileUri.transferredFromFileUri = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.transferredFromFileUri)
        dataWithFileUri.transferredToFileUri = await MinioMiddleware.fetchPresignedUrlForGetOperation(dataWithFileUri.transferredToFileUri)
        dispatch(AppointmentTransferActions.appointmentTransferPreviewSuccess(dataWithFileUri));
        return response.data;
    } catch (e) {
        dispatch(AppointmentTransferActions.appointmentTransferPreviewError(e.errorMessage || 'Sorry Internal Server Problem'))
    }
}


export const fetchAppointmentTransferDetail = (path, transferId) => async dispatch => {
    dispatch(AppointmentTransferActions.appointmentTransferInfoPending());
    try {
        const response = await Axios.getWithPathVariables(path, transferId);
        dispatch(AppointmentTransferActions.appointmentTransferInfoSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(AppointmentTransferActions.appointmentTransferInfoError(e.errorMessage || 'Sorry Internal Server Problem'))
        throw e;
    }
};

