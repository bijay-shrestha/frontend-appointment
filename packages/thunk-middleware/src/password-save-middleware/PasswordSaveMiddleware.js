import {Axios} from "@frontend-appointment/core";

export const verifyToken = (path, param) => async dispatch => {
    try {
        return await Axios.getWithRequestParams(path, {token: param});
    } catch (e) {
        throw e;
    }
};

export const savePassword = (path, data) => async dispatch => {
    try {
        return await Axios.post(path, data);
    } catch (e) {
        throw e;
    }
};

export const resetPassword = (path, data) => async dispatch => {
    try {
        return Axios.put(path, data);
    } catch (e) {
        throw e
    }
};

export const changePassword = (path, data) => async dispatch => {
    try {
        return Axios.put(path, data);
    } catch (e) {
        throw e
    }
};
