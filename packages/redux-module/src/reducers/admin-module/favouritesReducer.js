import {favouritesActionConstants} from '@frontend-appointment/action-module'
import {createReducerFactory} from '../reducer-factory'

const {
    UPDATE_FAVOURITES_SUCCESS,
    UPDATE_FAVOURITES_PENDING,
    UPDATE_FAVOURITES_ERROR,
    SAVE_FAVOURITES_SUCCESS,
    SAVE_FAVOURITES_PENDING,
    SAVE_FAVOURITES_ERROR,
    FETCH_FAVOURITES_FOR_DROPDOWN_SUCCESS,
    FETCH_FAVOURITES_FOR_DROPDOWN_PENDING,
    FETCH_FAVOURITES_FOR_DROPDOWN_ERROR
} = favouritesActionConstants;

const initialState = {
    saveInitialState: {
        isSaveFavouritesPending: false,
        saveSuccessMessage: '',
        saveErrorMessage: "",
    },
    updateInitialState: {
        isUpdateFavouritesPending: false,
        updateSuccessMessage: '',
        updateErrorMessage: ""
    },
    dropdownInitialState: {
        isFetchFavouritesForDropdownPending: false,
        favouritesList: [],
        fetchErrorMessage: ''
    }
}

const saveFavouritesReducerHandler = {
    [SAVE_FAVOURITES_PENDING]: state => ({
        ...state,
        isSaveFavouritesPending: true,
        saveSuccessMessage: '',
        saveErrorMessage: "",
    }),
    [SAVE_FAVOURITES_SUCCESS]: (state, action) => ({
        ...state,
        isSaveFavouritesPending: false,
        saveSuccessMessage: action.payload.successMessage,
        saveErrorMessage: "",
    }),
    [SAVE_FAVOURITES_ERROR]: (state, action) => ({
        ...state,
        isSaveFavouritesPending: false,
        saveSuccessMessage: "",
        saveErrorMessage: action.payload.errorMessage,
    }),
}

const updateFavouritesReducerHandler = {
    [UPDATE_FAVOURITES_PENDING]: state => ({
        ...state,
        isUpdateFavouritesPending: true,
        updateSuccessMessage: '',
        updateErrorMessage: "",
    }),
    [UPDATE_FAVOURITES_SUCCESS]: (state, action) => ({
        ...state,
        isUpdateFavouritesPending: false,
        updateSuccessMessage: action.payload.successMessage,
        updateErrorMessage: "",
    }),
    [UPDATE_FAVOURITES_ERROR]: (state, action) => ({
        ...state,
        isUpdateFavouritesPending: false,
        updateSuccessMessage: "",
        updateErrorMessage: action.payload.errorMessage,
    }),
}

const favouritesDropdownReducerHandler = {
    [FETCH_FAVOURITES_FOR_DROPDOWN_PENDING]: state => ({
        ...state,
        isFetchFavouritesForDropdownPending: true,
        favouritesList: [],
        fetchErrorMessage: ''
    }),
    [FETCH_FAVOURITES_FOR_DROPDOWN_SUCCESS]: (state, action) => ({
        ...state,
        isFetchFavouritesForDropdownPending: false,
        favouritesList: [...action.payload.data],
        fetchErrorMessage: ''
    }),
    [FETCH_FAVOURITES_FOR_DROPDOWN_ERROR]: (state, action) => ({
        ...state,
        isFetchFavouritesForDropdownPending: false,
        favouritesList: [],
        fetchErrorMessage: action.payload.errorMessage,
    }),
}

export const FavouritesReducers = {
    FavouritesSaveReducer: createReducerFactory(
        saveFavouritesReducerHandler,
        initialState.saveInitialState
    ),
    FavouritesUpdateReducer: createReducerFactory(
        updateFavouritesReducerHandler,
        initialState.updateInitialState
    ),
    FavouritesDropdownReducer: createReducerFactory(
        favouritesDropdownReducerHandler,
        initialState.dropdownInitialState
    )
}
