import {ddrShiftWiseActionConstants} from "@frontend-appointment/action-module";

const {
    SAVE_DDR_WEEKDAYS_PENDING,
    SAVE_DDR_WEEKDAYS_SUCCESS,
    SAVE_DDR_WEEKDAYS_ERROR,
    CLEAR_DDR_WEEKDAYS_SAVE_MESSAGE,
    SAVE_DDR_OVERRIDE_ROSTER_PENDING,
    SAVE_DDR_OVERRIDE_ROSTER_SUCCESS,
    SAVE_DDR_OVERRIDE_ROSTER_ERROR,
    CLEAR_DDR_OVERRIDE_ROSTER_SAVE_MESSAGE,
    DDR_CHECK_AVAILABILITY_PENDING,
    DDR_CHECK_AVAILABILITY_SUCCESS,
    DDR_CHECK_AVAILABILITY_ERROR,
    CLEAR_DDR_CHECK_AVAILABILITY_MESSAGE,
    FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_SUCCESS,
    FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_PENDING,
    FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_ERROR,
    CLEAR_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_FETCH_MESSAGE,
    FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_PENDING,
    FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_SUCCESS,
    FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_ERROR,
    CLEAR_WEEKDAYS_INFORMATION_FETCH_BY_DDR_SHIFT_ID_MESSAGE,
    FETCH_WEEKDAYS_BREAK_DETAIL_PENDING,
    FETCH_WEEKDAYS_BREAK_DETAIL_SUCCESS,
    FETCH_WEEKDAYS_BREAK_DETAIL_ERROR,
    CLEAR_WEEKDAYS_BREAK_DETAIL_FETCH_MESSAGE,
    FETCH_OVERRIDE_BREAK_DETAIL_SUCCESS,
    FETCH_OVERRIDE_BREAK_DETAIL_ERROR,
    FETCH_OVERRIDE_BREAK_DETAIL_PENDING,
    CLEAR_OVERRIDE_BREAK_DETAIL_FETCH_MESSAGE
} = ddrShiftWiseActionConstants;

let ddrSaveState = {
    isSaveDDRWeekdaysLoading: false,
    saveWeekdaysErrorMessage: '',
    saveWeekdaysSuccessMessage: '',
    isSaveDDROverrideLoading: false,
    saveOverrideErrorMessage: '',
    saveOverrideSuccessMessage: '',
};

let ddrExistingAvailabilityState = {
    isCheckExistingAvailabilityLoading: false,
    existingRosters: [],
    hasExistingRosters: false,
    existingAvailabilityErrorMessage: '',
    isFetchShiftAndOverrideInformationLoading: false,
    shiftAndOverrideDetail: '',
    shiftAndOverrideFetchErrorMessage: ''
};

let ddrWeekdaysInformationState = {
    isFetchWeekdaysDetailByShiftIdLoading: false,
    shiftWeekdaysDetail: [],
    weekdaysDetailByShiftIdFetchErrorMessage: ''
};

let ddrBreakDetailState = {
    isFetchWeekdaysBreakDetailLoading: false,
    weekdaysBreakDetails: [],
    weekdaysBreakDetailsFetchErrorMessage: '',
    isFetchOverrideBreakDetailLoading: false,
    overrideBreakDetails: [],
    overrideBreakDetailsFetchErrorMessage: ''
};

export const DDRSaveReducer = (state = {...ddrSaveState}, action) => {
    switch (action.type) {
        case SAVE_DDR_WEEKDAYS_PENDING:
            return {
                ...state,
                isSaveDDRWeekdaysLoading: true,
                saveWeekdaysErrorMessage: '',
                saveWeekdaysSuccessMessage: '',
            };
        case SAVE_DDR_WEEKDAYS_SUCCESS:
            return {
                ...state,
                isSaveDDRWeekdaysLoading: false,
                saveWeekdaysErrorMessage: '',
                saveWeekdaysSuccessMessage: action.payload.successMessage,
            };
        case SAVE_DDR_WEEKDAYS_ERROR:
            return {
                ...state,
                isSaveDDRWeekdaysLoading: false,
                saveWeekdaysErrorMessage: action.payload.errorMessage,
                saveWeekdaysSuccessMessage: '',
            };
        case CLEAR_DDR_WEEKDAYS_SAVE_MESSAGE:
            return {
                ...state,
                saveWeekdaysErrorMessage: '',
                saveWeekdaysSuccessMessage: '',
            };
        case SAVE_DDR_OVERRIDE_ROSTER_PENDING:
            return {
                ...state,
                isSaveDDROverrideLoading: true,
                saveOverrideErrorMessage: '',
                saveOverrideSuccessMessage: '',
            };
        case SAVE_DDR_OVERRIDE_ROSTER_SUCCESS:
            return {
                ...state,
                isSaveDDROverrideLoading: false,
                saveOverrideErrorMessage: '',
                saveOverrideSuccessMessage: action.payload.successMessage,
            };
        case SAVE_DDR_OVERRIDE_ROSTER_ERROR:
            return {
                ...state,
                isSaveDDROverrideLoading: false,
                saveOverrideErrorMessage: action.payload.errorMessage,
                saveOverrideSuccessMessage: '',
            };
        case CLEAR_DDR_OVERRIDE_ROSTER_SAVE_MESSAGE:
            return {
                ...state,
                saveOverrideErrorMessage: '',
                saveOverrideSuccessMessage: '',
            };
        default:
            return {
                ...state
            }

    }
};

export const DDRExistingAvailabilityReducer = (state = {...ddrExistingAvailabilityState}, action) => {
    switch (action.type) {
        case DDR_CHECK_AVAILABILITY_PENDING:
            return {
                ...state,
                isCheckExistingAvailabilityLoading: true,
                existingRosters: [],
            };
        case DDR_CHECK_AVAILABILITY_SUCCESS:
            return {
                ...state,
                isCheckExistingAvailabilityLoading: false,
                existingRosters: [...action.payload.data.existingRosters],
                hasExistingRosters: action.payload.data.hasExistingRosters,
            };
        case DDR_CHECK_AVAILABILITY_ERROR:
            return {
                ...state,
                isCheckExistingAvailabilityLoading: false,
                existingRosters: [],
                hasExistingRosters: false,
                existingAvailabilityErrorMessage: action.payload.errorMessage
            };
        case CLEAR_DDR_CHECK_AVAILABILITY_MESSAGE:
            return {
                ...state,
                existingAvailabilityErrorMessage: ''
            };
        case FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_PENDING:
            return {
                ...state,
                isFetchShiftAndOverrideInformationLoading: true,
                shiftAndOverrideDetail: '',
                shiftAndOverrideFetchErrorMessage: ''
            };
        case FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_SUCCESS:
            return {
                ...state,
                isFetchShiftAndOverrideInformationLoading: false,
                shiftAndOverrideDetail: {...action.payload.data},
                shiftAndOverrideFetchErrorMessage: ''
            };
        case FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_ERROR:
            return {
                ...state,
                isFetchShiftAndOverrideInformationLoading: false,
                shiftAndOverrideDetail: '',
                shiftAndOverrideFetchErrorMessage: action.payload.errorMessage
            };
        case CLEAR_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_FETCH_MESSAGE:
            return {
                ...state,
                shiftAndOverrideFetchErrorMessage: ''
            };
        default:
            return {
                ...state
            }
    }
};

export const DDRWeekdaysReducer = (state = {...ddrWeekdaysInformationState}, action) => {
    switch (action.type) {
        case FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_PENDING:
            return {
                ...state,
                isFetchWeekdaysDetailByShiftIdLoading: true,
                shiftWeekdaysDetail: [],
                weekdaysDetailByShiftIdFetchErrorMessage: ''
            }
        case FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_SUCCESS:
            return {
                ...state,
                isFetchWeekdaysDetailByShiftIdLoading: false,
                shiftWeekdaysDetail: [...action.payload.data],
                weekdaysDetailByShiftIdFetchErrorMessage: ''
            }
        case FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_ERROR:
            return {
                ...state,
                isFetchWeekdaysDetailByShiftIdLoading: false,
                shiftWeekdaysDetail: [],
                weekdaysDetailByShiftIdFetchErrorMessage: action.payload.errorMessage
            }
        case CLEAR_WEEKDAYS_INFORMATION_FETCH_BY_DDR_SHIFT_ID_MESSAGE:
            return {
                ...state,
                weekdaysDetailByShiftIdFetchErrorMessage: ''
            }
        default:
            return {
                ...state
            }
    }
};

export const DDRBreakReducer = (state = {...ddrBreakDetailState}, action) => {
    switch (action.type) {
        case FETCH_WEEKDAYS_BREAK_DETAIL_PENDING:
            return {
                ...state,
                isFetchWeekdaysBreakDetailLoading: true,
                weekdaysBreakDetails: [],
                weekdaysBreakDetailsFetchErrorMessage: ''
            }
        case FETCH_WEEKDAYS_BREAK_DETAIL_SUCCESS:
            return {
                ...state,
                isFetchWeekdaysBreakDetailLoading: false,
                weekdaysBreakDetails: [...action.payload.data],
                weekdaysBreakDetailsFetchErrorMessage: ''
            }
        case FETCH_WEEKDAYS_BREAK_DETAIL_ERROR:
            return {
                ...state,
                isFetchWeekdaysBreakDetailLoading: false,
                weekdaysBreakDetails: [],
                weekdaysBreakDetailsFetchErrorMessage: action.payload.errorMessage
            }
        case CLEAR_WEEKDAYS_BREAK_DETAIL_FETCH_MESSAGE:
            return {
                ...state,
                weekdaysBreakDetailsFetchErrorMessage: ''
            }
        case FETCH_OVERRIDE_BREAK_DETAIL_PENDING:
            return {
                ...state,
                isFetchOverrideBreakDetailLoading: true,
                overrideBreakDetails: [],
                overrideBreakDetailsFetchErrorMessage: ''
            }
        case FETCH_OVERRIDE_BREAK_DETAIL_SUCCESS:
            return {
                ...state,
                isFetchOverrideBreakDetailLoading: false,
                overrideBreakDetails: [...action.payload.data],
                overrideBreakDetailsFetchErrorMessage: ''
            }
        case FETCH_OVERRIDE_BREAK_DETAIL_ERROR:
            return {
                ...state,
                isFetchOverrideBreakDetailLoading: false,
                overrideBreakDetails: [],
                overrideBreakDetailsFetchErrorMessage: action.payload.errorMessage
            }
        case CLEAR_OVERRIDE_BREAK_DETAIL_FETCH_MESSAGE:
            return {
                ...state,
                overrideBreakDetailsFetchErrorMessage: ''
            }
        default:
            return {
                ...state
            }
    }
};
