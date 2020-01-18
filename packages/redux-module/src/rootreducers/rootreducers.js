import {combineReducers} from 'redux'
import {
  loginReducers as login,
  ProfileSetupReducer,
  ProfileListReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfilePreviewReducer,
  SpecializationDeleteReducer,
  SpecializationEditReducer,
  SpecializationPreviewReducer,
  SpecializationSaveReducer,
  SpecializationSearchReducer,
  HospitalDeleteReducer,
  HospitalEditReducer,
  HospitalPreviewReducer,
  HospitalSaveReducer,
  HospitalSearchReducer
} from '../reducers'

export const rootReducers = combineReducers({
  loginReducers: login,
  ProfileSetupReducer,
  ProfileListReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfilePreviewReducer,
  SpecializationDeleteReducer,
  SpecializationEditReducer,
  SpecializationPreviewReducer,
  SpecializationSaveReducer,
  SpecializationSearchReducer,
  HospitalDeleteReducer,
  HospitalEditReducer,
  HospitalPreviewReducer,
  HospitalSaveReducer,
  HospitalSearchReducer
})
