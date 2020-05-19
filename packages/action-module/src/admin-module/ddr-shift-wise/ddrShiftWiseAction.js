import {ddrShiftWiseActionConstants} from './ddrShiftWiseActionConstants';

const {
    DDR_CHECK_AVAILABILITY_PENDING,
    DDR_CHECK_AVAILABILITY_SUCCESS,
    DDR_CHECK_AVAILABILITY_ERROR,
    CLEAR_DDR_CHECK_AVAILABILITY_MESSAGE,
    SAVE_DDR_WEEKDAYS_PENDING,
    SAVE_DDR_WEEKDAYS_ERROR,
    SAVE_DDR_WEEKDAYS_SUCCESS,
    CLEAR_DDR_WEEKDAYS_SAVE_MESSAGE,
    SAVE_DDR_OVERRIDE_ROSTER_ERROR,
    SAVE_DDR_OVERRIDE_ROSTER_PENDING,
    SAVE_DDR_OVERRIDE_ROSTER_SUCCESS,
    CLEAR_DDR_OVERRIDE_ROSTER_SAVE_MESSAGE,
    FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_ERROR,
    FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_PENDING,
    FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_SUCCESS,
    CLEAR_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_FETCH_MESSAGE,
    FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_PENDING,
    FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_SUCCESS,
    FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_ERROR,
    CLEAR_WEEKDAYS_INFORMATION_FETCH_BY_DDR_SHIFT_ID_MESSAGE,
    FETCH_WEEKDAYS_BREAK_DETAIL_PENDING,
    FETCH_WEEKDAYS_BREAK_DETAIL_ERROR,
    FETCH_WEEKDAYS_BREAK_DETAIL_SUCCESS,
    CLEAR_WEEKDAYS_BREAK_DETAIL_FETCH_MESSAGE,
    FETCH_OVERRIDE_BREAK_DETAIL_PENDING,
    FETCH_OVERRIDE_BREAK_DETAIL_ERROR,
    FETCH_OVERRIDE_BREAK_DETAIL_SUCCESS,
    CLEAR_OVERRIDE_BREAK_DETAIL_FETCH_MESSAGE,
} = ddrShiftWiseActionConstants;

export const ddrCheckAvailabilityPending = () => {
    return {
        type: DDR_CHECK_AVAILABILITY_PENDING
    }
};

export const ddrCheckAvailabilitySuccess = data => {
    return {
        type: DDR_CHECK_AVAILABILITY_SUCCESS,
        payload: {
            data
        }
    }
};

export const ddrCheckAvailabilityError = errorMessage => {
    return {
        type: DDR_CHECK_AVAILABILITY_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDDRCheckAvailabilityMessage = () => {
    return {
        type: CLEAR_DDR_CHECK_AVAILABILITY_MESSAGE
    }
};

export const saveDDRWeekdaysPending = () => {
    return {
        type: SAVE_DDR_WEEKDAYS_PENDING
    }
};

export const saveDDRWeekdaysSuccess = successMessage => {
    return {
        type: SAVE_DDR_WEEKDAYS_SUCCESS,
        payload: {
            successMessage
        }
    }
};

export const saveDDRWeekdaysError = errorMessage => {
    return {
        type: SAVE_DDR_WEEKDAYS_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearSaveDDRWeekdaysMessage = () => {
    return {
        type: CLEAR_DDR_WEEKDAYS_SAVE_MESSAGE
    }
};

export const saveDDROverrideRosterPending = () => {
    return {
        type: SAVE_DDR_OVERRIDE_ROSTER_PENDING
    }
};

export const saveDDROverrideRosterSuccess = successMessage => {
    return {
        type: SAVE_DDR_OVERRIDE_ROSTER_SUCCESS,
        payload: {
            successMessage
        }
    }
};

export const saveDDROverrideRosterError = errorMessage => {
    return {
        type: SAVE_DDR_OVERRIDE_ROSTER_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearSaveDDROverrideRosterMessage = () => {
    return {
        type: CLEAR_DDR_OVERRIDE_ROSTER_SAVE_MESSAGE
    }
};

export const fetchExistingRosterShiftAndOverrideInformationPending = () => {
    return {
        type: FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_PENDING
    }
};

export const fetchExistingRosterShiftAndOverrideInformationSuccess = data => {
    return {
        type: FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchExistingRosterShiftAndOverrideInformationError = errorMessage => {
    return {
        type: FETCH_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearFetchExistingRosterShiftAndOverrideInformationMessage = () => {
    return {
        type: CLEAR_EXISTING_ROSTER_SHIFT_AND_OVERRIDE_INFORMATION_FETCH_MESSAGE
    }
};

export const fetchWeekdaysInformationByDDRShiftIdPending = () => {
    return {
        type: FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_PENDING
    }
};

export const fetchWeekdaysInformationByDDRShiftIdSuccess = data => {
    return {
        type: FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchWeekdaysInformationByDDRShiftIdError = errorMessage => {
    return {
        type: FETCH_WEEKDAYS_INFORMATION_BY_DDR_SHIFT_ID_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearFetchWeekdaysInformationMessage = () => {
    return {
        type: CLEAR_WEEKDAYS_INFORMATION_FETCH_BY_DDR_SHIFT_ID_MESSAGE
    }
};

export const fetchWeekdaysBreakDetailsPending = () => {
    return {
        type: FETCH_WEEKDAYS_BREAK_DETAIL_PENDING
    }
};

export const fetchWeekdaysBreakDetailsSuccess = data => {
    return {
        type: FETCH_WEEKDAYS_BREAK_DETAIL_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchWeekdaysBreakDetailsError = errorMessage => {
    return {
        type: FETCH_WEEKDAYS_BREAK_DETAIL_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearFetchWeekdaysBreakDetailMessage = () => {
    return {
        type: CLEAR_WEEKDAYS_BREAK_DETAIL_FETCH_MESSAGE
    }
};

export const fetchOverrideBreakDetailsPending = () => {
    return {
        type: FETCH_OVERRIDE_BREAK_DETAIL_PENDING
    }
};

export const fetchOverrideBreakDetailsSuccess = data => {
    return {
        type: FETCH_OVERRIDE_BREAK_DETAIL_SUCCESS,
        payload: {
            data
        }
    }
};

export const fetchOverrideBreakDetailsError = errorMessage => {
    return {
        type: FETCH_OVERRIDE_BREAK_DETAIL_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearFetchOverrideBreakDetailMessage = () => {
    return {
        type: CLEAR_OVERRIDE_BREAK_DETAIL_FETCH_MESSAGE
    }
};

