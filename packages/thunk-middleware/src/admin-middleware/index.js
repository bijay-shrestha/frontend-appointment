import {
    clearErrorMessageForDropdown,
    clearSuccessErrorMessagesFromStore,
    createProfile,
    deleteProfile,
    editProfile,
    fetchActiveProfileListForDropdown,
    fetchDepartments,
    fetchProfileList,
    fetchProfileListBySubDepartmentId,
    fetchSubDepartmentsByDepartmentId,
    previewProfile
} from "./profile-setup-middleware/profileSetupMiddleware";

import {
    clearAdminSuccessErrorMessagesFromStore,
    createAdmin,
    deleteAdmin,
    editAdmin,
    fetchAdminList,
    fetchAdminMetaInfo,
    previewAdmin
} from './admin-setup-middleware/adminSetupMiddleware';

import * as SpecializationSetupMiddleware from './specialization-setup-middleware/specializationSetupMiddleware';
import * as HospitalSetupMiddleware from './hospital-setup-middleware/hospitalSetupMiddleware';
import * as ConsultantMiddleware from './consultant-setup-middleware/consultantSetupMiddleware';
import * as departmentSetupMiddleware from "./department-setup-middleware/departmentSetupMiddleware";

export {
    fetchDepartments,
    fetchSubDepartmentsByDepartmentId,
    createProfile,
    fetchProfileList,
    deleteProfile,
    editProfile,
    previewProfile,
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
    departmentSetupMiddleware
}
