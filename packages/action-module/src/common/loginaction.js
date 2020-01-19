import { loginActionConstant } from './actionconstants';

const {PENDING,SUCESS,ERROR} = loginActionConstant
export const isLoginSuccess = (data) => ({
    type : SUCESS,
    payload:{
        data:data,
        status:'SUCCESS'
    }
});

export const isLoginError = (data) => ({
    type :ERROR,
    payload:{
        data:data,
        status:'ERROR'
    }
});

export const isLoginPending = (data) => ({
    type :PENDING,
    payload: {
      data:data,
      status:'PENDING'
    }
});
