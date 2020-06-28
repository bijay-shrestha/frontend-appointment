import {favouritesActionConstants} from './favouritesActionConstants';

const {
    FETCH_FAVOURITES_FOR_DROPDOWN_ERROR,
    FETCH_FAVOURITES_FOR_DROPDOWN_PENDING,
    FETCH_FAVOURITES_FOR_DROPDOWN_SUCCESS,
    SAVE_FAVOURITES_ERROR,
    SAVE_FAVOURITES_PENDING,
    SAVE_FAVOURITES_SUCCESS,
    UPDATE_FAVOURITES_ERROR,
    UPDATE_FAVOURITES_PENDING,
    UPDATE_FAVOURITES_SUCCESS
} = favouritesActionConstants;

export const saveFavouritesPending = () => {
    return {
        type: SAVE_FAVOURITES_PENDING
    }
}

export const saveFavouritesSuccess = successMessage => {
    return {
        type: SAVE_FAVOURITES_SUCCESS,
        payload: {
            successMessage
        }
    }
}

export const saveFavouritesError = errorMessage => {
    return {
        type: SAVE_FAVOURITES_ERROR,
        payload: {
            errorMessage
        }
    }
}

export const updateFavouritesPending = () => {
    return {
        type: UPDATE_FAVOURITES_PENDING
    }
}

export const updateFavouritesSuccess = successMessage => {
    return {
        type: UPDATE_FAVOURITES_SUCCESS,
        payload: {
            successMessage
        }
    }
}

export const updateFavouritesError = errorMessage => {
    return {
        type: UPDATE_FAVOURITES_ERROR,
        payload: {
            errorMessage
        }
    }
}
export const fetchFavouritesForDropdownPending = () => {
    return {
        type: FETCH_FAVOURITES_FOR_DROPDOWN_PENDING
    }
}

export const fetchFavouritesForDropdownSuccess = data => {
    return {
        type: FETCH_FAVOURITES_FOR_DROPDOWN_SUCCESS,
        payload: {
            data
        }
    }
}

export const fetchFavouritesForDropdownError = errorMessage => {
    return {
        type: FETCH_FAVOURITES_FOR_DROPDOWN_ERROR,
        payload: {
            errorMessage
        }
    }
}

