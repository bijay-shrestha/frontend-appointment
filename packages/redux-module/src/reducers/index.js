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
    AppointmentRefundDetailReducer
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

import {
    AppointmentModeDeleteReducer,
    AppointmentModeDropdownReducer,
    AppointmentModeEditReducer,
    AppointmentModePreviewReducer,
    AppointmentModeSaveReducer,
    AppointmentModeSearchReducer
} from './admin-module/appointmentModeReducer'

export {
    AppointmentApproveReducer,
    AppointmentRejectReducer,
    AppointmentApprovalListReducer,
    AppointmentLogListReducer,
    AdminLoggingSearchReducer,
    AdminLoggingDiagramSearchReducer,
    AdminLoggingStatsSearchReducer,
    AppointmentStatusListReducer,
    AppointmentRefundReducer,
    AppointmentRefundRejectReducer,
    AppointmentRefundListReducer,
    AppointmentDetailReducer,
    AppointmentRefundDetailReducer,
    companyDeleteReducer,
    companyDropdownReducer,
    companyPreviewReducer,
    companySaveReducer,
    companySearchReducer,
    companyUpdateReducer,
    CompanyAdminReducer,
    DashboardAppointmentStatisticsReducer,
    DashboardRegisteredPatientReducer,
    DashboardRevenueGeneratedDayReducer,
    DashboardRevenueGeneratedMonthReducer,
    DashboardRevenueGeneratedWeekReducer,
    DashboardRevenueGeneratedYearReducer,
    DashboardRevenueStatisticsReducer,
    DashboardAppointmentQueueReducer,
    DashboardRevenueGeneratedByDoctorReducer,
    DashboardFeaturesByAdminReducer,
    DashboardFeaturesReducer,
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
    SpecializationDropdownReducer,
    HospitalDeleteReducer,
    HospitalEditReducer,
    HospitalPreviewReducer,
    HospitalSaveReducer,
    HospitalSearchReducer,
    DoctorDeleteReducer,
    DoctorEditReducer,
    DoctorPreviewReducer,
    DoctorSaveReducer,
    DoctorSearchReducer,
    DoctorDropdownReducer,
    DepartmentDeleteReducer,
    DepartmentEditReducer,
    DepartmentListReducer,
    DepartmentPreviewReducer,
    DepartmentSetupReducer,
    DepartmentDropdownReducer,
    DoctorDutyRosterSaveReducer,
    DoctorDutyRosterEditReducer,
    DoctorDutyRosterDeleteReducer,
    DoctorDutyRosterListReducer,
    DoctorDutyRosterPreviewReducer,
    AdminDeleteReducer,
    AdminEditReducer,
    AdminListReducer,
    AdminPreviewReducer,
    AdminSetupReducer,
    loggedInAdminInfoReducer,
    logoutReducer,
    WeekdaysReducer,
    HospitalDropdownReducer,
    QualificationSaveReducer,
    QualificationEditReducer,
    QualificationPreviewReducer,
    QualificationSearchReducer,
    QualificationDeleteReducer,
    CountryCodeDropdownReducer,
    QualificationDropdownReducer,
    UniversitiesForDropdownReducer,
    PatientDropdownListReducer,
    RescheduleLogReducer,
    PatientEditReducer,
    PatientPreviewReducer,
    PatientSearchReducer,
    PatientDetailReducer,
    PatientDropdownWithoutHospitalListReducer,
    ForgotPasswordVerification,
    QualificationAliasDeleteReducer,
    QualificationAliasDropdownReducer,
    QualificationAliasEditReducer,
    QualificationAliasSaveReducer,
    QualificationAliasSearchReducer,
    CompanyProfileCreateReducer,
    CompanyProfileDeleteReducer,
    CompanyProfileDropdownReducer,
    CompanyProfileEditReducer,
    CompanyProfilePreviewReducer,
    CompanyProfileSearchReducer,
    UniversitySearchReducer,
    UniversitySaveReducer,
    UniversityEditReducer,
    UniversityDropdownReducer,
    UniversityDeleteReducer,
    UniversityPreviewReducer,
    CountryDropdownReducer,
    AppointmentModeDeleteReducer,
    AppointmentModeDropdownReducer,
    AppointmentModeEditReducer,
    AppointmentModePreviewReducer,
    AppointmentModeSaveReducer,
    AppointmentModeSearchReducer
}
