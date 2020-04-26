import {QualificationSetupActions} from '@frontend-appointment/action-module'
import {Axios} from '@frontend-appointment/core'

export const createQualification = (
    path,
    QualificationData
) => async dispatch => {
    dispatch(QualificationSetupActions.createQualificationPending())
    try {
        const response = await Axios.post(
            path,
            QualificationData,
        )
        dispatch(QualificationSetupActions.createQualificationSuccess())
        return response
    } catch (e) {
        dispatch(QualificationSetupActions.createQualificationError(e.errorMessage ? e.errorMessage : "Sorry,Internal Server Problem!"))
        throw e
    }
};

export const clearQualificationCreateMessage = () => dispatch => {
    dispatch(QualificationSetupActions.clearQualificationCreateMessage());
    dispatch(QualificationSetupActions.clearQualificationDeleteMessage());
    dispatch(QualificationSetupActions.clearQualificationEditMessage());
    dispatch(QualificationSetupActions.clearQualificationListMessage());
    dispatch(QualificationSetupActions.clearQualificationPreviewMessage())
}

export const editQualification = (path, data) => async dispatch => {
    dispatch(QualificationSetupActions.createQualificationEditPending())
    try {
        const response = await Axios.put(path, data)
        dispatch(QualificationSetupActions.createQualificationEditSuccess(response.data))
        return response
    } catch (e) {
        dispatch(QualificationSetupActions.createQualificationEditError(e.errorMessage ? e.errorMessage : "Sorry,Internal Server Problem!"))
        throw e
    }
};

export const previewQualification = (path, id) => async dispatch => {
    dispatch(QualificationSetupActions.createQualificationPreviewPending());
    try {
        const response = await Axios.getWithPathVariables(path, id)
        dispatch(QualificationSetupActions.createQualificationPreviewSuccess(response.data))
        return response;
    } catch (e) {
        dispatch(QualificationSetupActions.createQualificationPreviewError(e.errorMessage ? e.errorMessage : "Sorry,Internal Server Problem!"));
        throw e
    }
};

export const searchQualification = (path, queryParams, data) => async dispatch => {
    dispatch(QualificationSetupActions.createQualificationSearchPending());
    try {
        const response = await Axios.putWithRequestParam(path, queryParams, data);
        dispatch(QualificationSetupActions.createQualificationSearchSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(QualificationSetupActions.createQualificationListError(e.errorMessage ? e.errorMessage : "Sorry,Internal Server Problem!"));
     
    }
};

export const deleteQualification = (path, id) => async dispatch => {
    dispatch(QualificationSetupActions.createQualificationDeletePending());
    try {
        const response = await Axios.del(path, id);
        dispatch(QualificationSetupActions.createQualificationDeleteSucess());
        return response
    } catch (e) {
        dispatch(QualificationSetupActions.createQualificationDeleteError(e.errorMessage ? e.errorMessage : "Sorry,Internal Server Problem!"));
        throw e
    }
};


export const fetchActiveQualificationsForDropdown = (path) => async dispatch => {
    try {
        const response = await Axios.get(path);
        dispatch(QualificationSetupActions.qualificationFetchForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(QualificationSetupActions.qualificationFetchForDropdownError("Error fetching qualifications"));
    }
};

export const fetchActiveCountryCodeForDropdown = (path) => async dispatch => {
    try {
        const response = await Axios.get(path);
        dispatch(QualificationSetupActions.countryCodeFetchForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(QualificationSetupActions.countryCodeFetchForDropdownError("Error fetching country code"));
    }
};

// export const fetchActiveQualificationAliasForDropdown = (path) => async dispatch => {
//   try {
//     const response = await Axios.get(path);
//     dispatch(QualificationSetupActions.qualificationAliasFetchForDropdownSuccess(response.data));
//     return response.data;
//   } catch (e) {
//     dispatch(QualificationSetupActions.qualificationAliasFetchForDropdownError("Error fetching qualification alias"));
//   }
// };

export const fetchActiveUniversityForDropdown = (path) => async dispatch => {
    try {
        const response = await Axios.get(path);
        dispatch(QualificationSetupActions.universityFetchForDropdownSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(QualificationSetupActions.universityFetchForDropdownError("Error fetching university"));
    }
};
