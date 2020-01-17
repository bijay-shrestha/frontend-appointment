import {Axios} from '@frontend-appointment/core';
import {MenuActions} from '@frontend-appointment/action-module';
import {UserMenusFilter} from '@frontend-appointment/helpers';


export const fetchUserMenus = (path, code) => async dispatch => {
    dispatch(MenuActions.isMenuLoading(null));
    try {
        const response = await Axios.put(path, code);
        const userMenus = UserMenusFilter(response.data);
        dispatch(MenuActions.isMenuSucces(userMenus));
        //return response;
    } catch (error) {
        dispatch(MenuActions.isMenuError(error));

    }
};
