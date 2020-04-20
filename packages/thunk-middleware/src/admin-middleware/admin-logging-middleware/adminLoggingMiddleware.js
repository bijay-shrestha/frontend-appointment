import {AdminLoggingSetupActions} from '@frontend-appointment/action-module'
import {convertObjectToRequestParam} from '@frontend-appointment/core'
import {
  LocalStorageSecurity,
  EnvironmentVariableGetter
} from '@frontend-appointment/helpers'
import axios from 'axios'
const base_url = 'http://localhost:9093'
export const fetchAdminLog = (
  path,
  queryParams,
  searchData
) => async dispatch => {
  dispatch(AdminLoggingSetupActions.logFetchStart())
  try {
    const response = await axios.put(
      base_url + convertObjectToRequestParam(path, queryParams),
      searchData,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization:
            LocalStorageSecurity.localStorageDecoder(
              EnvironmentVariableGetter.AUTH_TOKEN
            ) || ''
        }
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
          : 'Sorry Something Error Occured In Server'
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
    const response = await axios.put(base_url + path, searchData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          LocalStorageSecurity.localStorageDecoder(
            EnvironmentVariableGetter.AUTH_TOKEN
          ) || ''
      }
    })
    dispatch(AdminLoggingSetupActions.logStatsFetchSuccess(response.data))
    return response
  } catch (e) {
    let errorData = e.response
    let error = ''
    error = errorData
      ? errorData.data
        ? errorData.data.errorMessage
          ? errorData.data.errorMessage
          : 'Sorry Something Error Occured In Server'
        : 'Network Error'
      : 'Network Error'
    dispatch(
      AdminLoggingSetupActions.logStatsFetchError(
        error || 'Something Wrong In Server!!'
      )
    )
  }
}
