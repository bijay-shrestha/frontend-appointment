import {
  clearErrorMessageForDropdown,
  clearSuccessErrorMessagesFromStore,
  createProfile,
  deleteProfile,
  editProfile,
  fetchActiveProfileListForDropdown,
  fetchProfileList,
  fetchProfileListBySubDepartmentId,
  previewProfile,
  fetchAllProfileListForSearchDropdown
} from './profile-setup-middleware/profileSetupMiddleware'

import {
  clearAdminSuccessErrorMessagesFromStore,
  createAdmin,
  deleteAdmin,
  editAdmin,
  fetchAdminList,
  fetchAdminMetaInfo,
  previewAdmin
} from './admin-setup-middleware/adminSetupMiddleware'

import * as SpecializationSetupMiddleware from './specialization-setup-middleware/specializationSetupMiddleware'
import * as HospitalSetupMiddleware from './hospital-setup-middleware/hospitalSetupMiddleware'
import * as ConsultantMiddleware from './consultant-setup-middleware/consultantSetupMiddleware'
import * as departmentSetupMiddleware from './department-setup-middleware/departmentSetupMiddleware'
import * as QualificationSetupMiddleware from './qualification-setup-middleware/qualificationSetupMiddleware'
export {
  createProfile,
  fetchProfileList,
  deleteProfile,
  editProfile,
  previewProfile,
  fetchAllProfileListForSearchDropdown,
  clearSuccessErrorMessagesFromStore,
  fetchActiveProfileListForDropdown,
  fetchProfileListBySubDepartmentId,
  clearErrorMessageForDropdown,
  clearAdminSuccessErrorMessagesFromStore,
  createAdmin,
  deleteAdmin,
  editAdmin,
  fetchAdminList,
  previewAdmin,
  fetchAdminMetaInfo,
  SpecializationSetupMiddleware,
  HospitalSetupMiddleware,
  ConsultantMiddleware,
  departmentSetupMiddleware,
  QualificationSetupMiddleware
}
