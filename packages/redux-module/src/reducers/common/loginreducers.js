 import {loginActionConstant} from '@frontend-appointment/action-module';

 export const loginReducers = (state = {}, action) => {

   switch (action.type) {
      case loginActionConstant.PENDING:return({
         ...state,
         ...action.payload
      });
      case loginActionConstant.SUCESS:return({
         ...state,
         ...action.payload
      });
      case loginActionConstant.ERROR:return({
         ...state,
         ...action.payload
      });
      default: return state
   }

};
