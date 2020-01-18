import axios from 'axios'

const SERVER_DOMAIN = process.env.REACT_APP_SERVER_DOMAIN || ''
const APP_PORT = process.env.PORT || ''

let Axios = axios.create({
  baseURL: SERVER_DOMAIN,
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
    let token = localStorage.getItem('auth-token') || ''
    requestConfig.headers.Authorization = token.toString()
    return requestConfig
  },
  error => {
    // return ApiError.errorHandler(error);
    throw error
  }
)

axios.interceptors.response.use(
  response => {
    // TO STORE THE JWT TOKEN FROM RESPONSE
    let jwtToken = response.headers.Authorization
    localStorage.setItem('auth-token', jwtToken)
    return response
  },
  error => {
    // return ApiError.errorHandler(error);
    throw error
  }
)
export default Axios
