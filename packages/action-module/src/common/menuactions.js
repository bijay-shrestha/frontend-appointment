import { userMenusActionConstant } from './actionconstants';

const {PENDING,SUCESS,ERROR} = userMenusActionConstant;

export const isMenuSucces = (data) => ({
    type : SUCESS,
    payload:{
        data:data,
        status:'SUCCESS'
    }
});

export const isMenuError = (data) => ({
    type :ERROR,
    payload:{
        data:data,
        status:'ERROR'
    }
});

export const isMenuLoading = () => ({
    type :PENDING,
    payload: {
      data:null,
      status:'PENDING'
    }
});
