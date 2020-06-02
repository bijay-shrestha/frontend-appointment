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
import * as UnitSetupMiddleware from "./unit-setup-middleware/unitSetupMiddleware";
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
import * as AppointmentTransferMiddleware from './appointment-transfer-middleware/appointmentTransferMiddleware'
import * as RoomSetupMiddleware from './room-setup-middleware/roomSetupMiddleware';
import * as HospitalDepartmentSetupMiddleware
    from './hospital-department-setup-middleware/hospitalDepartmentSetupMiddleware';
import * as DepartmentDutyRosterMiddleware from './department-duty-roster-middleware/departmentDutyRosterMiddleware';
import * as BillingModeMiddleware from './billing-mode-middleware/billingModeMiddleware';
import * as AppointmentServiceTypeMiddleware from './appointment-service-type-middleware/appointmentServiceTypeMiddleware';

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
    UnitSetupMiddleware,
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
    AppointmentTransferMiddleware,
    RoomSetupMiddleware,
    HospitalDepartmentSetupMiddleware,
    DepartmentDutyRosterMiddleware,
    BillingModeMiddleware,
    AppointmentServiceTypeMiddleware
}
