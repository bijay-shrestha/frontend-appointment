import {ddrShiftWiseActionConstants} from './ddrShiftWiseActionConstants';

const {
    DDR_CHECK_AVAILABILITY_PENDING,
    DDR_CHECK_AVAILABILITY_SUCCESS,
    DDR_CHECK_AVAILABILITY_ERROR,
    CLEAR_DDR_CHECK_AVAILABILITY_MESSAGE,
    SAVE_DDR_WEEKDAYS_PENDING,
    SAVE_DDR_WEEKDAYS_ERROR,
    SAVE_DDR_WEEKDAYS_SUCCESS,
    CLEAR_DDR_WEEKDAYS_SAVE_MESSAGE
} = ddrShiftWiseActionConstants;

export const ddrCheckAvailablityPending = () => {
    return {
        type: DDR_CHECK_AVAILABILITY_PENDING
    }
};

export const ddrCheckAvailablitySuccess = data => {
    return {
        type: DDR_CHECK_AVAILABILITY_SUCCESS,
        payload: {
            data
        }
    }
};

export const ddrCheckAvailablityError = errorMessage => {
    return {
        type: DDR_CHECK_AVAILABILITY_ERROR,
        payload: {
            errorMessage
        }
    }
};

export const clearDDRCheckAvailablityMessage = () => {
    return {
        type: CLEAR_DDR_CHECK_AVAILABILITY_MESSAGE
    }
};

export const saveDDRWeekdaysPending = () => {
    return {
        type: SAVE_DDR_WEEKDAYS_PENDING
    }
};

export const saveDDRWeekdaysSuccess = data => {
    return {
        type: SAVE_DDR_WEEKDAYS_SUCCESS,
        payload: {
            data
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
