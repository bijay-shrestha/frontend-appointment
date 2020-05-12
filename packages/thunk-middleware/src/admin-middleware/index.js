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
    previewAdmin,
    fetchAdminMetaInfoByHospitalId
} from './admin-setup-middleware/adminSetupMiddleware';

import * as SpecializationSetupMiddleware from './specialization-setup-middleware/specializationSetupMiddleware';
import * as HospitalSetupMiddleware from './hospital-setup-middleware/hospitalSetupMiddleware';
import * as DoctorMiddleware from './doctor-setup-middleware/doctorSetupMiddleware';
import * as DepartmentSetupMiddleware from "./department-setup-middleware/departmentSetupMiddleware";
import * as DoctorDutyRosterMiddleware from "./doctor-duty-roster-middleware/doctorDutyRosterMiddleware";
import * as QualificationSetupMiddleware from './qualification-setup-middleware/qualificationSetupMiddleware';
import * as PatientDetailsMiddleware from './patient-details-middleware/patientDetailsMiddleware'
import * as CompanySetupMiddleware from './company-setup-middleware/companySetupMiddleware'
import * as QualificationAliasSetupMiddleware
    from './qualification-alias-setup-middleware/qualificationAliasSetupMiddleware'
import * as CompanyProfileSetupMiddleware from './company-profile-setup-middleware/companyProfileSetupMiddleWare'
import * as CompanyAdminSetupMiddleware from './company-admin-setup-middleware/companyAdminSetupMiddleware'
import * as AdminLoggingMiddleware from './admin-logging-middleware/adminLoggingMiddleware';
import * as UniversitySetupMiddleware from './university-setup-middleware/universitySetupMiddleware';
import * as AppointmentModeMiddleware from './appointment-mode-middleware/appointmentModeMiddleware';
import * as AppointmentTransferMiddleware from './appointment-transfer-middleware'
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
    CompanySetupMiddleware,
    DoctorMiddleware,
    DepartmentSetupMiddleware,
    QualificationSetupMiddleware,
    DoctorDutyRosterMiddleware,
    PatientDetailsMiddleware,
    QualificationAliasSetupMiddleware,
    CompanyProfileSetupMiddleware,
    CompanyAdminSetupMiddleware,
    AdminLoggingMiddleware,
    UniversitySetupMiddleware,
    fetchAdminMetaInfoByHospitalId,
    AppointmentModeMiddleware,
    AppointmentTransferMiddleware
}
