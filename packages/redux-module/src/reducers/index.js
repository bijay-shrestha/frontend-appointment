import {loginReducers} from './common/loginreducers'
import {
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfileListReducer,
  ProfilePreviewReducer,
  ProfileSetupReducer
} from './admin-module/profileSetupReducer'
import {
  SpecializationDeleteReducer,
  SpecializationEditReducer,
  SpecializationPreviewReducer,
  SpecializationSaveReducer,
  SpecializationSearchReducer
} from './admin-module/specializationSetupReducer'
import {
  HospitalDeleteReducer,
  HospitalEditReducer,
  HospitalPreviewReducer,
  HospitalSaveReducer,
  HospitalSearchReducer,
  HospitalDropdownReducer
} from './admin-module/hospitalSetupReducer'
import {
  ConsultantDeleteReducer,
  ConsultantEditReducer,
  ConsultantPreviewReducer,
  ConsultantSaveReducer,
  ConsultantSearchReducer
} from './admin-module/consultantSetupReducer'
import {
  DepartmentDeleteReducer,
  DepartmentEditReducer,
  DepartmentListReducer,
  DepartmentPreviewReducer,
  DepartmentSetupReducer
} from './admin-module/departmentSetupReducer'
import {
  AdminDeleteReducer,
  AdminEditReducer,
  AdminListReducer,
  AdminPreviewReducer,
  AdminSetupReducer
} from './admin-module/adminSetupReducer'

import {
  QualificationSaveReducer,
  QualificationEditReducer,
  QualificationPreviewReducer,
  QualificationSearchReducer,
  QualificationDeleteReducer,
  CountryCodeDropdownReducer,
  QualificationAliasDropdownReducer,
  QualificationDropdownReducer,
  UniversitiesForDropdownReducer
} from './admin-module/qualificationSetupReducer'

import {loggedInAdminInfoReducer} from './common/loggedInAdminInfoReducer'
import {logoutReducer} from './common/logoutReducer'

export {
  loginReducers,
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
  AdminDeleteReducer,
  AdminEditReducer,
  AdminListReducer,
  AdminPreviewReducer,
  AdminSetupReducer,
  loggedInAdminInfoReducer,
  logoutReducer,
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
}
