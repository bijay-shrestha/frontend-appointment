import axios from 'axios'
import {
  EnvironmentVariableGetter,
  LocalStorageSecurity
} from '@frontend-appointment/helpers'
import ApiError from './axios-helper/api-error'

const SERVER_DOMAIN = EnvironmentVariableGetter.SERVER_DOMAIN || ''
const BASE_DOMAIN = EnvironmentVariableGetter.REACT_APP_MODULE_CODE
  ?"/"+EnvironmentVariableGetter.REACT_APP_MODULE_CODE.toString().toLowerCase()
  : ''
//const APP_PORT = process.env.PORT || ''
let Axios = axios.create({
  baseURL: SERVER_DOMAIN+BASE_DOMAIN,
  proxy: {
    host: 'localhost',
    port: 3301
  },
  withCredentials: false,
  crossDomain: true,
  crossOrigin: true
})

Axios.interceptors.request.use(
  requestConfig => {
    let token =
      LocalStorageSecurity.localStorageDecoder(
        EnvironmentVariableGetter.AUTH_TOKEN
      ) || ''
    requestConfig.headers.Authorization = token ? token : ''
    return requestConfig
  },
  error => {
    return ApiError.errorHandler(error)
  }
)

Axios.interceptors.response.use(
  response => {
    // TO STORE THE JWT TOKEN FROM RESPONSE
    return response
  },
  error => {
    return ApiError.errorHandler(error)
  }
)
export default Axios
