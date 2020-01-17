import {userMenusActionConstant} from '@frontend-appointment/action-module'
const initialState = {
  userMenus: [],
  status: ''
}
export const userMenuReducers = (state = {...initialState}, action) => {
  switch (action.type) {
    case userMenusActionConstant.PENDING:
      return {
        ...state,
        userMenus: [],
        status: action.payload.status
      }
    case userMenusActionConstant.SUCESS:
      return {
        ...state,
        userMenus: [...action.payload],
        status: action.payload.status
      }
    case userMenusActionConstant.ERROR:
      return {
        ...state,
        userMenus: [],
        status: action.payload.status
      }
    default:
      return state
  }
}
