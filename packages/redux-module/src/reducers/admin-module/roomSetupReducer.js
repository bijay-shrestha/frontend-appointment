import {roomSetupActionConstants} from '@frontend-appointment/action-module';

const {
    SAVE_ROOM_NUMBER_PENDING,
    SAVE_ROOM_NUMBER_SUCCESS,
    SAVE_ROOM_NUMBER_ERROR,
    CLEAR_SAVE_ROOM_NUMBER_MESSAGE,
    EDIT_ROOM_NUMBER_PENDING,
    EDIT_ROOM_NUMBER_SUCCESS,
    EDIT_ROOM_NUMBER_ERROR,
    CLEAR_EDIT_ROOM_NUMBER_MESSAGE,
    DELETE_ROOM_NUMBER_PENDING,
    DELETE_ROOM_NUMBER_SUCCESS,
    DELETE_ROOM_NUMBER_ERROR,
    CLEAR_DELETE_ROOM_NUMBER_MESSAGE,
    SEARCH_ROOM_NUMBER_PENDING,
    SEARCH_ROOM_NUMBER_SUCCESS,
    SEARCH_ROOM_NUMBER_ERROR,
    CLEAR_SEARCH_ROOM_NUMBER_MESSAGE,
    FETCH_ACTIVE_ROOM_NUMBER_SUCCESS,
    FETCH_ACTIVE_ROOM_NUMBER_PENDING,
    FETCH_ACTIVE_ROOM_NUMBER_ERROR,
    FETCH_ALL_ROOM_NUMBER_ERROR,
    FETCH_ALL_ROOM_NUMBER_PENDING,
    FETCH_ALL_ROOM_NUMBER_SUCCESS
} = roomSetupActionConstants;

const initialState = {
    isSaveRoomNumberLoading: false,
    saveSuccessMessage: '',
    saveErrorMessage: '',
    isEditRoomNumberLoading: false,
    editSuccessMessage: '',
    editErrorMessage: '',
    isDeleteRoomNumberLoading: false,
    deleteSuccessMessage: '',
    deleteErrorMessage: '',
    isSearchRoomNumberLoading: false,
    roomNumberList: [],
    searchErrorMessage: '',
    isFetchActiveRoomNumberLoading: false,
    activeRoomNumberForDropdown: [],
    dropdownErrorMessage: '',
    isFetchAllRoomNumberLoading: false,
    allRoomNumberForDropdown: [],
    allRoomDropdownErrorMessage: '',
    totalRecords:''
};

export const RoomNumberSaveReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SAVE_ROOM_NUMBER_PENDING:
            return {
                ...state,
                isSaveRoomNumberLoading: true,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        case SAVE_ROOM_NUMBER_SUCCESS:
            return {
                ...state,
                isSaveRoomNumberLoading: false,
                saveSuccessMessage: action.payload.message,
                saveErrorMessage: ''
            };
        case SAVE_ROOM_NUMBER_ERROR:
            return {
                ...state,
                isSaveRoomNumberLoading: false,
                saveErrorMessage: action.payload.message,
                saveSuccessMessage: '',
            };
        case CLEAR_SAVE_ROOM_NUMBER_MESSAGE:
            return {
                ...state,
                saveSuccessMessage: '',
                saveErrorMessage: ''
            };
        default:
            return state
    }
};

export const RoomNumberEditReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case EDIT_ROOM_NUMBER_PENDING:
            return {
                ...state,
                isEditRoomNumberLoading: true,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        case EDIT_ROOM_NUMBER_SUCCESS:
            return {
                ...state,
                isEditRoomNumberLoading: false,
                editSuccessMessage: action.payload.message,
                editErrorMessage: ''
            };
        case EDIT_ROOM_NUMBER_ERROR:
            return {
                ...state,
                isEditRoomNumberLoading: false,
                editErrorMessage: action.payload.message,
                editSuccessMessage: '',
            };
        case CLEAR_EDIT_ROOM_NUMBER_MESSAGE:
            return {
                ...state,
                editSuccessMessage: '',
                editErrorMessage: ''
            };
        default:
            return state
    }
};

export const RoomNumberDeleteReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case DELETE_ROOM_NUMBER_PENDING :
            return {
                ...state,
                isDeleteRoomNumberLoading: true,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        case DELETE_ROOM_NUMBER_SUCCESS:
            return {
                ...state,
                isDeleteRoomNumberLoading: false,
                deleteSuccessMessage: action.payload.message,
                deleteErrorMessage: ''
            };
        case DELETE_ROOM_NUMBER_ERROR:
            return {
                ...state,
                isDeleteRoomNumberLoading: false,
                deleteErrorMessage: action.payload.message,
                deleteSuccessMessage: '',
            };
        case CLEAR_DELETE_ROOM_NUMBER_MESSAGE:
            return {
                ...state,
                deleteSuccessMessage: '',
                deleteErrorMessage: ''
            };
        default:
            return state
    }
};

export const RoomNumberSearchReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case SEARCH_ROOM_NUMBER_PENDING :
            return {
                ...state,
                isSearchRoomNumberLoading: true,
                roomNumberList: [],
                searchErrorMessage: '',
                totalRecords:''
            };
        case SEARCH_ROOM_NUMBER_SUCCESS:
            return {
                ...state,
                isSearchRoomNumberLoading: false,
                roomNumberList: [...action.payload.data.response],
                totalRecords:action.payload.data.totalItems,
                searchErrorMessage: ''
            };
        case SEARCH_ROOM_NUMBER_ERROR:
            return {
                ...state,
                isSearchRoomNumberLoading: false,
                roomNumberList: [],
                totalRecords:'',
                searchErrorMessage: action.payload.message
            };
        case CLEAR_SEARCH_ROOM_NUMBER_MESSAGE:
            return {
                ...state,
                searchErrorMessage: ''
            };
        default:
            return state
    }
};

export const RoomNumberDropdownReducer = (state = {...initialState}, action) => {
    switch (action.type) {
        case FETCH_ACTIVE_ROOM_NUMBER_PENDING :
            return {
                ...state,
                isFetchActiveRoomNumberLoading: true,
                activeRoomNumberForDropdown: [],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_ROOM_NUMBER_SUCCESS:
            return {
                ...state,
                isFetchActiveRoomNumberLoading: false,
                activeRoomNumberForDropdown: [...action.payload.data],
                dropdownErrorMessage: ''
            };
        case FETCH_ACTIVE_ROOM_NUMBER_ERROR:
            return {
                ...state,
                isFetchActiveRoomNumberLoading: false,
                activeRoomNumberForDropdown: [],
                dropdownErrorMessage: action.payload.message
            };
        case FETCH_ALL_ROOM_NUMBER_PENDING :
            return {
                ...state,
                isFetchAllRoomNumberLoading: true,
                allRoomNumberForDropdown: [],
                allRoomDropdownErrorMessage: ''
            };
        case FETCH_ALL_ROOM_NUMBER_SUCCESS:
            return {
                ...state,
                isFetchAllRoomNumberLoading: false,
                allRoomNumberForDropdown: [...action.payload.data],
                allRoomDropdownErrorMessage: ''
            };
        case FETCH_ALL_ROOM_NUMBER_ERROR:
            return {
                ...state,
                isFetchAllRoomNumberLoading: false,
                allRoomNumberForDropdown: [],
                allRoomDropdownErrorMessage: action.payload.message
            };
        default:
            return state
    }
};


