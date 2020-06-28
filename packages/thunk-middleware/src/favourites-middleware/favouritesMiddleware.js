import {Axios} from '@frontend-appointment/core'
import {FavouritesActions} from '@frontend-appointment/action-module'

export const saveFavourites = (path, data) => async dispatch => {
    dispatch(FavouritesActions.saveFavouritesPending())
    try {
        const response = await Axios.post(path, data);
        dispatch(FavouritesActions.saveFavouritesSuccess("Favourites added successfully."))
        return response
    } catch (e) {
        dispatch(FavouritesActions.saveFavouritesError(e.errorMessage ? e.errorMessage
            : "Sorry, Internal Server Problem."))
        throw e
    }
}

export const updateFavourites = (path, data) => async dispatch => {
    dispatch(FavouritesActions.updateFavouritesPending())
    try {
        const response = await Axios.put(path, data);
        dispatch(FavouritesActions.updateFavouritesSuccess("Favourites updated successfully."))
        return response
    } catch (e) {
        dispatch(FavouritesActions.updateFavouritesError(e.errorMessage ? e.errorMessage
            : "Sorry, Internal Server Problem."))
        throw e
    }
}

export const fetchFavouritesByAdminId = (path) => async dispatch => {
    dispatch(FavouritesActions.fetchFavouritesForDropdownPending())
    try {
        const response = await Axios.get(path);
        dispatch(FavouritesActions.fetchFavouritesForDropdownSuccess(response.data))
        return response
    } catch (e) {
        dispatch(FavouritesActions.fetchFavouritesForDropdownError(e.errorMessage ? e.errorMessage
            : "Sorry, Internal Server Problem."))
        throw e
    }
}
