import {Axios} from "@frontend-appointment/core";
import {QualificationAliasSetupActions} from "@frontend-appointment/action-module";

export const saveQualificationAlias = (path, data) => async dispatch => {
    dispatch(QualificationAliasSetupActions.saveQualificationAliasPending());
    try {
        const response = await Axios.post(path, data);
        dispatch(QualificationAliasSetupActions.saveQualificationAliasSuccess(
            "Qualification Alias saved successfully."));
        return response.data;
    } catch (e) {
        dispatch(QualificationAliasSetupActions.saveQualificationAliasError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const editQualificationAlias = (path, data) => async dispatch => {
    dispatch(QualificationAliasSetupActions.editQualificationAliasPending());
    try {
        const response = await Axios.put(path, data);
        dispatch(QualificationAliasSetupActions.editQualificationAliasSuccess(
            "Qualification Alias edited successfully."));
        return response.data;
    } catch (e) {
        dispatch(QualificationAliasSetupActions.editQualificationAliasError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const deleteQualificationAlias = (path, data) => async dispatch => {
    dispatch(QualificationAliasSetupActions.deleteQualificationAliasPending());
    try {
        const response = await Axios.del(path, data);
        dispatch(QualificationAliasSetupActions.deleteQualificationAliasSuccess(
            "Qualification Alias deleted successfully."));
        return response.data;
    } catch (e) {
        dispatch(QualificationAliasSetupActions.deleteQualificationAliasError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const searchQualificationAlias = (path, data, paginationData) => async dispatch => {
    dispatch(QualificationAliasSetupActions.searchQualificationAliasPending());
    try {
        const response = await Axios.putWithPagination(path, paginationData, data);
        dispatch(QualificationAliasSetupActions.searchQualificationAliasSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(QualificationAliasSetupActions.searchQualificationAliasError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const fetchActiveQualificationAliasForDropdown = (path) => async dispatch => {
    dispatch(QualificationAliasSetupActions.fetchQualificationAliasPending());
    try {
        const response = await Axios.get(path);
        dispatch(QualificationAliasSetupActions.fetchQualificationAliasSuccess(response.data));
        return response.data;
    } catch (e) {
        dispatch(QualificationAliasSetupActions.fetchQualificationAliasError(
            e.errorMessage ? e.errorMessage : "Sorry, internal server error!"));
        throw e;
    }
};

export const clearSuccessErrorMessageFormStore = () => async dispatch => {
  dispatch(QualificationAliasSetupActions.clearDeleteQualificationAliasMessage());
  dispatch(QualificationAliasSetupActions.clearEditQualificationAliasMessage());
  dispatch(QualificationAliasSetupActions.clearSaveQualificationAliasMessage());
  dispatch(QualificationAliasSetupActions.clearSearchQualificationAliasMessage());
};
