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
  logSearchErrorMessage: '',
  totalItems:0
}
const initialLogStatsSearchState = {
    isLogStatsSearchSearchLoading: true,
    logStatsSearchData: [],
    logStatsSearchErrorMessage: '',
    totalItems:0
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
        logSearchData: action.payload.data.userLogList,
        logSearchErrorMessage: '',
        totalItems:action.payload.data.totalItems
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
          logStatsSearchData: action.payload.data.userMenuCountList,
          logStatsSearchErrorMessage: '',
          totalItems:action.payload.data.totalItems
        }
      case USER_LOG_STATS_FETCH_ERROR:
        return {
          ...state,
          isLogStatsSearchSearchLoading: false,
          logStatsSearchData: [],
          logStatsSearchErrorMessage: action.payload.message
        }
        default:return state;  
    }
  }
