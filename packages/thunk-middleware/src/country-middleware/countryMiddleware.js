import {Axios} from "@frontend-appointment/core";
import {CountryActions} from "@frontend-appointment/action-module";

export const fetchCountryForDropdown = path => async dispatch => {
    dispatch(CountryActions.fetchCountryPending());
    try {
        const response = await Axios.get(path);
        dispatch(CountryActions.fetchCountrySuccess(response.data));
        return response;
    } catch (e) {
        dispatch(CountryActions.fetchCountryError(e.errorMessage ? e.errorMessage : 'Sorry,Internal Server Problem!'));
        throw e;
    }
};
