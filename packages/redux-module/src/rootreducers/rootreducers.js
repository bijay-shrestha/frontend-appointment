import {combineReducers} from 'redux'
import {
  AdminDeleteReducer,
  AdminEditReducer,
  AdminListReducer,
  AdminPreviewReducer,
  AdminSetupReducer,
  ConsultantDeleteReducer,
  ConsultantEditReducer,
  ConsultantPreviewReducer,
  ConsultantSaveReducer,
  ConsultantSearchReducer,
  DepartmentDeleteReducer,
  DepartmentEditReducer,
  DepartmentListReducer,
  DepartmentPreviewReducer,
  DepartmentSetupReducer,
  HospitalDeleteReducer,
  HospitalEditReducer,
  HospitalPreviewReducer,
  HospitalSaveReducer,
  HospitalSearchReducer,
  loggedInAdminInfoReducer,
  loginReducers as login,
  logoutReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfileListReducer,
  ProfilePreviewReducer,
  ProfileSetupReducer,
  SpecializationDeleteReducer,
  SpecializationEditReducer,
  SpecializationPreviewReducer,
  SpecializationSaveReducer,
  SpecializationSearchReducer,
  HospitalDropdownReducer,
  QualificationSaveReducer,
  QualificationEditReducer,
  QualificationPreviewReducer,
  QualificationSearchReducer,
  QualificationDeleteReducer,
  CountryCodeDropdownReducer,
  QualificationAliasDropdownReducer,
  QualificationDropdownReducer,
  UniversitiesForDropdownReducer
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
  HospitalSearchReducer,
  HospitalDropdownReducer,
  ConsultantDeleteReducer,
  ConsultantEditReducer,
  ConsultantPreviewReducer,
  ConsultantSaveReducer,
  ConsultantSearchReducer,
  DepartmentDeleteReducer,
  DepartmentEditReducer,
  DepartmentListReducer,
  DepartmentPreviewReducer,
  DepartmentSetupReducer,
  AdminSetupReducer,
  AdminEditReducer,
  AdminDeleteReducer,
  AdminListReducer,
  AdminPreviewReducer,
  loggedInAdminInfoReducer,
  logoutReducer,
  QualificationSaveReducer,
  QualificationEditReducer,
  QualificationPreviewReducer,
  QualificationSearchReducer,
  QualificationDeleteReducer,
  CountryCodeDropdownReducer,
  QualificationAliasDropdownReducer,
  QualificationDropdownReducer,
  UniversitiesForDropdownReducer
})
