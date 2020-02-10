import {
    clearErrorMessageForDropdown,
    clearSuccessErrorMessagesFromStore,
    createProfile,
    deleteProfile,
    editProfile,
    fetchActiveProfileListForDropdown,
    fetchActiveProfilesByDepartmentId,
    fetchAllProfileListForSearchDropdown,
    fetchProfileList,
    fetchProfileListBySubDepartmentId,
    previewProfile
} from './profile-setup-middleware/profileSetupMiddleware';

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
import * as DoctorMiddleware from './doctor-setup-middleware/doctorSetupMiddleware';
import * as DepartmentSetupMiddleware from "./department-setup-middleware/departmentSetupMiddleware";
import * as DoctorDutyRosterMiddleware from "./doctor-duty-roster-middleware/doctorDutyRosterMiddleware";
import * as QualificationSetupMiddleware from './qualification-setup-middleware/qualificationSetupMiddleware';
import * as PatientDetailsMiddleware from './patient-details-middleware/patientDetailsMiddleware'
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
    fetchActiveProfilesByDepartmentId,
    SpecializationSetupMiddleware,
    HospitalSetupMiddleware,
    DoctorMiddleware,
    DepartmentSetupMiddleware,
    QualificationSetupMiddleware,
    DoctorDutyRosterMiddleware,
    PatientDetailsMiddleware
};
