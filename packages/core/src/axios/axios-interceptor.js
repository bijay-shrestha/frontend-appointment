import axios from 'axios';

axios.defaults.baseURL = "";

axios.interceptors.request.use(
    requestConfig => {
          let token = localStorage.getItem('auth-token');
           requestConfig.headers.Authorization = token?token.toString():'';
        // requestConfig.headers.Origin = "url Of Other Domain";
          console.log(requestConfig)
        console.log("Request Interceptor", requestConfig);
        return requestConfig;
    }, error => {
        // return ApiError.errorHandler(error);
        throw error;
    }
);

axios.interceptors.response.use(
    response => {
        // TO STORE THE JWT TOKEN FROM RESPONSE
        // let jwtToken = response.headers.Authorization;
        console.log("Response Interceptor", response);
        return response;
    }, error => {
        // return ApiError.errorHandler(error);
        throw error;
    }
);
