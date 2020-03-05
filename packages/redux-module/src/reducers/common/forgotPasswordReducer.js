import {forgotPasswordAndVerificationConstants} from '@frontend-appointment/action-module';

const {
    FORGOT_PASSWORD_ERROR,
    FORGOT_PASSWORD_PENDING,
    FORGOT_PASSWORD_SUCCESS,
    PASSWORD_VERIFICATION_ERROR,
    PASSWORD_VERIFICATION_PENDING,
    PASSWORD_VERIFICATION_SUCCESS
}=forgotPasswordAndVerificationConstants;
let initialForgotPassword = {
   message:'',
   status:''
}

export const ForgotPasswordReducer= (state={...initialForgotPassword},action) => {
   switch(action.type){
       default: return state;
   }
}

export const VerificationCodeReducer = (state={...initialForgotPassword},action) => {
    switch(action.type){
        default: return state;
    }
 }
