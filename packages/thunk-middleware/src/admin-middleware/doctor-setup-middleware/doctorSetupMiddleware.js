import {DoctorSetupActions} from '@frontend-appointment/action-module';
import {Axios} from '@frontend-appointment/core';
//import {DropdownUtils} from "@frontend-appointment/helpers";

export const createConsultant = (
    path,
    doctorData,
    formData
) => async dispatch => {
    dispatch(DoctorSetupActions.createConsultantPending());
    try {
        let response = await Axios.postForMultipart(
            path,
            'request',
            doctorData,
            formData
        );
        dispatch(DoctorSetupActions.createConsultantSuccess());
        return response;
    } catch (e) {
        dispatch(DoctorSetupActions.createConsultantError(e.errorMessage || 'Sorry Internal Server Error'));
        throw e;
    }
};

export const clearConsultantCreateMessage = () => dispatch => {
    dispatch(DoctorSetupActions.clearConsultantCreateMessage());
    dispatch(DoctorSetupActions.clearConsultantDeleteMessage());
    dispatch(DoctorSetupActions.clearConsultantEditMessage());
    dispatch(DoctorSetupActions.clearConsultantListMessage());
    dispatch(DoctorSetupActions.clearConsultantPreviewMessage());
};

export const editConsultant = (path, data, formData) => async dispatch => {
    dispatch(DoctorSetupActions.createConsultantEditPending());
    try {
        const response = await Axios.putWithMultiPart(path, 'request', data, formData);
        dispatch(DoctorSetupActions.createConsultantEditSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DoctorSetupActions.createConsultantEditError(e.errorMessage || 'Sorry Internal Server'));
        throw e;
    }
};

export const previewConsultant = (path, id) => async dispatch => {
    dispatch(DoctorSetupActions.createConsultantPreviewPending());
    try {
        const response = await Axios.getWithPathVariables(path, id);
        dispatch(DoctorSetupActions.createConsultantPreviewSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DoctorSetupActions.createConsultantPreviewError(e.errorMessage || 'Sorry Internal Server Error'));
        throw e;
    }
};

export const searchConsultant = (path, queryParams, data) => async dispatch => {
    dispatch(DoctorSetupActions.createConsultantSearchPending());
    try {
        const response = await Axios.putWithRequestParam(path, queryParams, data);
        dispatch(DoctorSetupActions.createConsultantSearchSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DoctorSetupActions.createConsultantListError(e.errorMessage || 'Sorry Internal Server Error'));
    }
};

export const deleteConsultant = (path, id) => async dispatch => {
    dispatch(DoctorSetupActions.createConsultantDeletePending());
    try {
        const response = await Axios.del(path, id);
        dispatch(DoctorSetupActions.createConsultantDeleteSucess());
        return response;
    } catch (e) {
        dispatch(DoctorSetupActions.createConsultantDeleteError(e.errorMessage || 'Sorry Internal Server Error'));
        throw e;
    }
};

export const downloadExcelForConsultants = path => async () => {
    try {
        return await Axios.getFile(path);
    } catch (e) {
        throw e;
    }
};

export const fetchActiveDoctorsForDropdown = path => async dispatch => {
    try {
        const response = await Axios.get(path);
        dispatch(
            DoctorSetupActions.fetchActiveDoctorsForDropdownSuccess(response.data)
        );
        return response;
    } catch (e) {
        dispatch(
            DoctorSetupActions.fetchActiveDoctorsForDropdownError(
                e.errorMessage ? e.errorMessage : 'Error fetching doctors.'
            )
        );

    }
};

export const fetchAllDoctorsForDropdown = path => async dispatch => {
    dispatch(DoctorSetupActions.fetchAllDoctorsByHospitalForDropdownPending());
    try {
        const response = await Axios.get(path);
        dispatch(DoctorSetupActions.fetchAllDoctorsByHospitalForDropdownSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DoctorSetupActions.fetchAllDoctorsByHospitalForDropdownError(
            e.errorMessage ? e.errorMessage : 'Error fetching doctors.'));
    }
};

export const fetchActiveDoctorsHospitalWiseForDropdown = (path, id) => async dispatch => {
    try {
        const response = await Axios.getWithPathVariables(path, id);
        dispatch(DoctorSetupActions.fetchActiveDoctorsByHospitalForDropdownSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(
            DoctorSetupActions.fetchActiveDoctorsByHospitalForDropdownError(e.errorMessage ?
                e.errorMessage : 'Error fetching doctors.')
        );
        throw e;
    }
};

export const fetchAllDoctorsHospitalWiseForDropdown = (path, id) => async dispatch => {
    dispatch(DoctorSetupActions.fetchAllDoctorsByHospitalForDropdownPending());
    try {
        const response = await Axios.getWithPathVariables(path, id);
        dispatch(DoctorSetupActions.fetchAllDoctorsByHospitalForDropdownSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(
            DoctorSetupActions.fetchAllDoctorsByHospitalForDropdownError(e.errorMessage ?
                e.errorMessage : 'Error fetching doctors.')
        );
        throw e;
    }
};


export const fetchDoctorsBySpecializationIdForDropdown = (path, specializationId) => async dispatch => {
    try {
        const response = await Axios.getWithPathVariables(path, specializationId);
        dispatch(DoctorSetupActions.fetchDoctorsBySpecializationForDropdownSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(DoctorSetupActions.fetchDoctorsBySpecializationForDropdownError(
            e.errorMessage ? e.errorMessage : 'Error fetching doctors.'));
        throw e;
    }
};

export const fetchActiveDoctorsByDepartmentForDropdown = (path, id) => async dispatch => {
    dispatch(DoctorSetupActions.fetchActiveDoctorsByDepartmentForDropdownPending());
    try {
        const response = await Axios.getWithPathVariables(path, id);
        dispatch(DoctorSetupActions.fetchActiveDoctorsByDepartmentForDropdownSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(
            DoctorSetupActions.fetchActiveDoctorsByDepartmentForDropdownError(e.errorMessage ?
                e.errorMessage : 'Error fetching doctors.')
        );
        throw e;
    }
};
