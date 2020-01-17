import axios from 'axios'

let Axios = axios;
 
const SERVER_DOMAIN =  process.env.REACT_APP_SERVER_DOMAIN ||'';
const APP_PORT= process.env.PORT || '';
Axios.defaults.baseURL = SERVER_DOMAIN
Axios.defaults.proxy={
    host:'http://localhost',
    port:APP_PORT
};
Axios.defaults.crossDomain=true;
Axios.default.crossOrigin=true;

Axios.interceptors.request.use(
  requestConfig => {
    let token = localStorage.getItem('auth-token')||''
    requestConfig.headers.Authorization = token.toString()
    return requestConfig;
  },
  error => {
    // return ApiError.errorHandler(error);
    throw error
  }
)

axios.interceptors.response.use(
  response => {
    // TO STORE THE JWT TOKEN FROM RESPONSE
    let jwtToken = response.headers.Authorization;
    localStorage.setItem('auth-token',jwtToken);
    return response;
  },
  error => {
    // return ApiError.errorHandler(error);
    throw error
  }
)
export default Axios;