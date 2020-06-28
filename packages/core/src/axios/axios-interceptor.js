import axios from 'axios'
import {
  EnvironmentVariableGetter,
  LocalStorageSecurity
} from '@frontend-appointment/helpers'
import ApiError from './axios-helper/api-error'
import {createLogHeader} from './axios-helper/create-log-header'

const SERVER_DOMAIN = EnvironmentVariableGetter.SERVER_DOMAIN || ''
const BASE_DOMAIN = process.env.NODE_ENV==="development"? '/' +
    EnvironmentVariableGetter.REACT_APP_MODULE_CODE.toString().toLowerCase()
  : ''

  console.log("Enviroment",process.env.NODE_ENV);
//const APP_PORT = process.env.PORT || ''
let Axios = axios.create({
  baseURL: SERVER_DOMAIN + BASE_DOMAIN,
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
    if (requestConfig.url) {
      console.log("requestconfigurl",requestConfig.url)
      if (!requestConfig.url.includes('/login') && !requestConfig.url.includes('/postticket'))
        requestConfig.headers.Authorization = token ? token : ''
      let logHeader = createLogHeader(requestConfig)
      if (
        logHeader ||
        requestConfig.url.includes('/forgot') ||
        requestConfig.url.includes('/login') ||
        requestConfig.url.includes('/logout')
      ) {
        if (logHeader)
          requestConfig.headers['log-header'] = JSON.stringify(logHeader)
        let ipKey = 'clientIp'
        if (EnvironmentVariableGetter.REACT_APP_MODULE_CODE === 'ADMIN') {
          ipKey = 'adminIp'
        }
        requestConfig.headers[
          'X-Forwarded-For'
        ] = LocalStorageSecurity.localStorageDecoder(ipKey)
      }
    }
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
