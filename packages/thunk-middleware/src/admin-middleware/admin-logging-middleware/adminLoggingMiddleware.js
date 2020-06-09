import {AdminLoggingSetupActions} from '@frontend-appointment/action-module'
import {convertObjectToRequestParam} from '@frontend-appointment/core'
import {
  LocalStorageSecurity,
  EnvironmentVariableGetter
} from '@frontend-appointment/helpers'
import axios from 'axios'
const LOGGING_DOMAIN = EnvironmentVariableGetter.LOGGING_SERVER_DOMAIN || ''
const LOG_BASE = EnvironmentVariableGetter.LOGGING_BASE || ''
const BASE_DOMAIN = LOGGING_DOMAIN + LOG_BASE
export const fetchAdminLog = (
  path,
  queryParams,
  searchData
) => async dispatch => {
  dispatch(AdminLoggingSetupActions.logFetchStart())
  try {
    const response = await axios.put(
      BASE_DOMAIN + convertObjectToRequestParam(path, queryParams),
      searchData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            LocalStorageSecurity.localStorageDecoder(
              EnvironmentVariableGetter.AUTH_TOKEN
            ) || '',

        },
        crossDomain: true,
        crossOrigin: true
      }
    )
    dispatch(AdminLoggingSetupActions.logFetchSuccess(response.data))
    return response
  } catch (e) {
    let errorData = e.response
    let error = ''
    error = errorData
      ? errorData.data
        ? errorData.data.errorMessage
          ? errorData.data.errorMessage
          : 'Sorry, Internal Server Problem occurred.'
        : 'Network Error'
      : 'Network Error'
    dispatch(
      AdminLoggingSetupActions.logFetchError(
        error || 'Something Wrong In Server!!'
      )
    )
  }
}

export const fetchAdminLogStatistics = (
  path,
  queryParams,
  searchData
) => async dispatch => {
  dispatch(AdminLoggingSetupActions.logStatsFetchStart())
  try {
    const response = await axios.put(
        BASE_DOMAIN + convertObjectToRequestParam(path, queryParams),
      searchData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            LocalStorageSecurity.localStorageDecoder(
              EnvironmentVariableGetter.AUTH_TOKEN
            ) || ''
        },
        crossDomain: true,
        crossOrigin: true
      }
    )
    dispatch(AdminLoggingSetupActions.logStatsFetchSuccess(response.data))
    return response
  } catch (e) {
    let errorData = e.response
    let error = ''
    error = errorData
      ? errorData.data
        ? errorData.data.errorMessage
          ? errorData.data.errorMessage
          : 'Sorry, Internal Server Problem occurred.'
        : 'Network Error'
      : 'Network Error'
    dispatch(
      AdminLoggingSetupActions.logStatsFetchError(
        error || 'Something Wrong In Server!!'
      )
    )
  }
}

export const fetchAdminDiagramStatistics = (
  path,
  searchData
) => async dispatch => {
  dispatch(AdminLoggingSetupActions.logDiagramFetchStart())
  try {
    const response = await axios.put(BASE_DOMAIN + path, searchData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          LocalStorageSecurity.localStorageDecoder(
            EnvironmentVariableGetter.AUTH_TOKEN
          ) || ''
      },
      crossDomain: true,
      crossOrigin: true
    })
    dispatch(AdminLoggingSetupActions.logDiagramFetchSuccess(response.data))
    return response
  } catch (e) {
    let errorData = e.response
    let error = ''
    error = errorData
      ? errorData.data
        ? errorData.data.errorMessage
          ? errorData.data.errorMessage
          : 'Sorry, Internal Server Problem occurred.'
        : 'Network Error'
      : 'Network Error'
    dispatch(
      AdminLoggingSetupActions.logDiagramFetchError(
        error || 'Something Wrong In Server!!'
      )
    )
  }
}
