import {Axios} from "@frontend-appointment/core";
import {SalutationAction} from "@frontend-appointment/action-module";

export const fetchSalutationForDropdown = path => async dispatch => {
    dispatch(SalutationAction.fetchSalutationPending());
    try {
        const response = await Axios.get(path);
        dispatch(SalutationAction.fetchSalutationSuccess(response.data));
        return response;
    } catch (e) {
        dispatch(SalutationAction.fetchSalutationError(e.errorMessage
            ? e.errorMessage : 'Sorry,Internal Server Problem!'));
        throw e;
    }
};
