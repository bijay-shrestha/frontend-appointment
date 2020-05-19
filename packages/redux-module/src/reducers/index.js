import {loginReducers} from './common/loginreducers'
import * as ForgotPasswordVerification from './common/forgotPasswordReducer'
import {
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfileListReducer,
    ProfilePreviewReducer,
    ProfileSetupReducer
} from './admin-module/profileSetupReducer'
import {
    SpecializationDeleteReducer,
    SpecializationDropdownReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer
} from './admin-module/specializationSetupReducer'
import {
    HospitalDeleteReducer,
    HospitalDropdownReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer
} from './admin-module/hospitalSetupReducer'
import {
    DoctorDeleteReducer,
    DoctorDropdownReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer
} from './admin-module/doctorSetupReducer'
import {
    DepartmentDeleteReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer,
    DepartmentDropdownReducer
} from './admin-module/departmentSetupReducer'
import {
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminPreviewReducer,
    AdminSetupReducer
} from './admin-module/adminSetupReducer'
import {
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    DoctorDutyRosterSaveReducer
} from './admin-module/doctorDutyRosterReducer'

import {
    DashboardAppointmentQueueReducer,
    DashboardAppointmentStatisticsReducer,
    DashboardRegisteredPatientReducer,
    DashboardRevenueGeneratedByDoctorReducer,
    DashboardRevenueGeneratedDayReducer,
    DashboardRevenueGeneratedMonthReducer,
    DashboardRevenueGeneratedWeekReducer,
    DashboardRevenueGeneratedYearReducer,
    DashboardRevenueStatisticsReducer,
    DashboardFeaturesByAdminReducer,
    DashboardFeaturesReducer
} from './admin-module/dashboardDetailsReducer'
import * as CompanyAdminReducer from './admin-module/companyAdminSetupReducer'
import {
    CountryCodeDropdownReducer,
    QualificationDeleteReducer,
    QualificationDropdownReducer,
    QualificationEditReducer,
    QualificationPreviewReducer,
    QualificationSaveReducer,
    QualificationSearchReducer,
    UniversitiesForDropdownReducer
} from './admin-module/qualificationSetupReducer'

import {
    AppointmentApprovalListReducer,
    AppointmentApproveReducer,
    AppointmentLogListReducer,
    AppointmentRefundListReducer,
    AppointmentRefundReducer,
    AppointmentRefundRejectReducer,
    AppointmentRejectReducer,
    AppointmentStatusListReducer,
    RescheduleLogReducer,
    AppointmentDetailReducer,
    AppointmentRefundDetailReducer,
    TransactionLogReducer
} from './admin-module/appointmentDetailsReducer'
import {loggedInAdminInfoReducer} from './common/loggedInAdminInfoReducer'
import {logoutReducer} from './common/logoutReducer'
import {WeekdaysReducer} from './common/weekdaysReducer'
import {
    PatientDetailReducer,
    PatientDropdownListReducer,
    PatientDropdownWithoutHospitalListReducer,
    PatientEditReducer,
    PatientPreviewReducer,
    PatientSearchReducer
} from './admin-module/patientSetupReducer'

import {
    QualificationAliasDeleteReducer,
    QualificationAliasDropdownReducer,
    QualificationAliasEditReducer,
    QualificationAliasSaveReducer,
    QualificationAliasSearchReducer
} from './admin-module/qualificationAliasSetupReducer'

import {
    CompanyProfileCreateReducer,
    CompanyProfileDeleteReducer,
    CompanyProfileDropdownReducer,
    CompanyProfileEditReducer,
    CompanyProfilePreviewReducer,
    CompanyProfileSearchReducer
} from './admin-module/companyProfileSetupReducer'

import {
    companyDeleteReducer,
    companyDropdownReducer,
    companyPreviewReducer,
    companySaveReducer,
    companySearchReducer,
    companyUpdateReducer
} from './admin-module/companySetupReducers'
import {
    AdminLoggingSearchReducer,
    AdminLoggingStatsSearchReducer,
    AdminLoggingDiagramSearchReducer
} from './admin-module/adminLoggingReducer'
import {
    UniversityDeleteReducer,
    UniversityDropdownReducer,
    UniversityEditReducer,
    UniversitySaveReducer,
    UniversitySearchReducer,
    UniversityPreviewReducer
} from './admin-module/universitySetupReducer'

import {CountryDropdownReducer} from './common/countryReducer'

import {AppointmentTransferReducers} from './admin-module/appointmentTransferReducer';
import {
    AppointmentModeDeleteReducer,
    AppointmentModeDropdownReducer,
    AppointmentModeEditReducer,
    AppointmentModePreviewReducer,
    AppointmentModeSaveReducer,
    AppointmentModeSearchReducer
} from './admin-module/appointmentModeReducer';

import {
    BreakTypeDeleteReducer,
    BreakTypeDropdownReducer,
    BreakTypeEditReducer,
    BreakTypeSaveReducer,
    BreakTypeSearchReducer
} from './admin-module/breakTypeSetupReducer';

import {
    AssignShiftsToDoctorReducer,
    ShiftDeleteReducer,
    ShiftDropdownReducer,
    ShiftEditReducer,
    ShiftSaveReducer,
    ShiftSearchReducer
} from './admin-module/shiftSetupReducer';

import {
    DDRBreakReducer,
    DDRExistingAvailabilityReducer,
    DDRSaveReducer,
    DDRWeekdaysReducer
} from './admin-module/ddrShiftWiseReducer';

export {
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminLoggingDiagramSearchReducer,
    AdminLoggingSearchReducer,
    AdminLoggingStatsSearchReducer,
    AdminPreviewReducer,
    AdminSetupReducer,
    AppointmentApprovalListReducer,
    AppointmentApproveReducer,
    AppointmentDetailReducer,
    AppointmentLogListReducer,
    AppointmentModeDeleteReducer,
    AppointmentModeDropdownReducer,
    AppointmentModeEditReducer,
    AppointmentModePreviewReducer,
    AppointmentModeSaveReducer,
    AppointmentModeSearchReducer,
    AppointmentRefundDetailReducer,
    AppointmentRefundListReducer,
    AppointmentRefundReducer,
    AppointmentRefundRejectReducer,
    AppointmentRejectReducer,
    AppointmentStatusListReducer,
    AssignShiftsToDoctorReducer,
    BreakTypeDeleteReducer,
    BreakTypeDropdownReducer,
    BreakTypeEditReducer,
    BreakTypeSaveReducer,
    BreakTypeSearchReducer,
    CompanyAdminReducer,
    companyDeleteReducer,
    companyDropdownReducer,
    companyPreviewReducer,
    CompanyProfileCreateReducer,
    CompanyProfileDeleteReducer,
    CompanyProfileDropdownReducer,
    CompanyProfileEditReducer,
    CompanyProfilePreviewReducer,
    CompanyProfileSearchReducer,
    companySaveReducer,
    companySearchReducer,
    companyUpdateReducer,
    CountryCodeDropdownReducer,
    CountryDropdownReducer,
    DashboardAppointmentQueueReducer,
    DashboardAppointmentStatisticsReducer,
    DashboardFeaturesByAdminReducer,
    DashboardFeaturesReducer,
    DashboardRegisteredPatientReducer,
    DashboardRevenueGeneratedByDoctorReducer,
    DashboardRevenueGeneratedDayReducer,
    DashboardRevenueGeneratedMonthReducer,
    DashboardRevenueGeneratedWeekReducer,
    DashboardRevenueGeneratedYearReducer,
    DashboardRevenueStatisticsReducer,
    DepartmentDeleteReducer,
    DepartmentDropdownReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer,
    DoctorDeleteReducer,
    DoctorDropdownReducer,
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    DoctorDutyRosterSaveReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    ForgotPasswordVerification,
    HospitalDeleteReducer,
    HospitalDropdownReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    loggedInAdminInfoReducer,
    loginReducers,
    logoutReducer,
    PatientDetailReducer,
    PatientDropdownListReducer,
    PatientDropdownWithoutHospitalListReducer,
    PatientEditReducer,
    PatientPreviewReducer,
    PatientSearchReducer,
    ProfileDeleteReducer,
    ProfileEditReducer,
    ProfileListReducer,
    ProfilePreviewReducer,
    ProfileSetupReducer,
    QualificationAliasDeleteReducer,
    QualificationAliasDropdownReducer,
    QualificationAliasEditReducer,
    QualificationAliasSaveReducer,
    QualificationAliasSearchReducer,
    QualificationDeleteReducer,
    QualificationDropdownReducer,
    QualificationEditReducer,
    QualificationPreviewReducer,
    QualificationSaveReducer,
    QualificationSearchReducer,
    RescheduleLogReducer,
    ShiftDeleteReducer,
    ShiftDropdownReducer,
    ShiftEditReducer,
    ShiftSaveReducer,
    ShiftSearchReducer,
    SpecializationDeleteReducer,
    SpecializationDropdownReducer,
    SpecializationEditReducer,
    SpecializationPreviewReducer,
    SpecializationSaveReducer,
    SpecializationSearchReducer,
    TransactionLogReducer,
    UniversitiesForDropdownReducer,
    UniversityDeleteReducer,
    UniversityDropdownReducer,
    UniversityEditReducer,
    UniversityPreviewReducer,
    UniversitySaveReducer,
    UniversitySearchReducer,
    WeekdaysReducer,
    AppointmentTransferReducers,
    DDRBreakReducer,
    DDRExistingAvailabilityReducer,
    DDRSaveReducer,
    DDRWeekdaysReducer
}
