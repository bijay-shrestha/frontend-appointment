import {adminLoggingConstant} from '@frontend-appointment/action-module'

const {
  USER_LOG_FETCH_ERROR,
  USER_LOG_FETCH_START,
  USER_LOG_FETCH_SUCCESS,
  USER_LOG_STATS_FETCH_ERROR,
  USER_LOG_STATS_FETCH_START,
  USER_LOG_STATS_FETCH_SUCCESS
} = adminLoggingConstant

const initialLogSearchState = {
  isLogSearchSearchLoading: true,
  logSearchData: [],
  logSearchErrorMessage: ''
}
const initialLogStatsSearchState = {
    isLogStatsSearchSearchLoading: true,
    logStatsSearchData: [],
    logStatsSearchErrorMessage: ''
  }

export const AdminLoggingSearchReducer = (
  state = {...initialLogSearchState},
  action
) => {
  switch (action.type) {
    case USER_LOG_FETCH_START:
      return {...state}
    case USER_LOG_FETCH_SUCCESS:
      return {
        ...state,
        isLogSearchSearchLoading: false,
        logSearchData: action.payload.data,
        logSearchErrorMessage: ''
      }
    case USER_LOG_FETCH_ERROR:
      return {
        ...state,
        isLogSearchSearchLoading: false,
        logSearchData: [],
        logSearchErrorMessage: action.payload.message
      }
    default:return state;  
  }
 
}

export const AdminLoggingStatsSearchReducer = (
    state = {...initialLogStatsSearchState},
    action
  ) => {
    switch (action.type) {
      case USER_LOG_STATS_FETCH_START:
        return {...state}
      case USER_LOG_STATS_FETCH_SUCCESS:
        return {
          ...state,
          isLogStatsSearchSearchLoading: false,
          logStatsSearchData: action.payload.data,
          logStatsSearchErrorMessage: ''
        }
      case USER_LOG_STATS_FETCH_ERROR:
        return {
          ...state,
          isLogStatsSearchSearchLoading: false,
          logStatsSearchData: [],
          logStatsSearchErrorMessage: action.payload.messages
        }
        default:return state;  
    }
  }
