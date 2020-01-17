import { combineReducers } from 'redux'
import {
  loginReducers as login,
  ProfileSetupReducer,
  ProfileListReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfilePreviewReducer
} from '../reducers'

export const rootReducers = combineReducers({
  loginReducers: login,
  ProfileSetupReducer,
  ProfileListReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfilePreviewReducer
});
