import {combineReducers} from 'redux'
import {
  AdminDeleteReducer,
  AdminEditReducer,
  AdminListReducer,
  AdminPreviewReducer,
  AdminSetupReducer,
  AppointmentApprovalListReducer,
  AppointmentLogListReducer,
  AppointmentRefundListReducer,
  AppointmentRefundReducer,
  AppointmentRefundRejectReducer,
  AppointmentStatusListReducer,
  AppointmentApproveReducer,
  AppointmentRejectReducer,
  AppointmentRefundDetailReducer,
  CountryCodeDropdownReducer,
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
  DepartmentDeleteReducer,
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
  HospitalDeleteReducer,
  HospitalDropdownReducer,
  HospitalEditReducer,
  HospitalPreviewReducer,
  HospitalSaveReducer,
  HospitalSearchReducer,
  loggedInAdminInfoReducer,
  loginReducers as login,
  logoutReducer,
  PatientDetailReducer,
  PatientDropdownListReducer,
  PatientEditReducer,
  PatientPreviewReducer,
  PatientSearchReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfileListReducer,
  ProfilePreviewReducer,
  ProfileSetupReducer,
  QualificationDeleteReducer,
  QualificationDropdownReducer,
  QualificationEditReducer,
  QualificationPreviewReducer,
  QualificationSaveReducer,
  QualificationSearchReducer,
  RescheduleLogReducer,
  SpecializationDeleteReducer,
  SpecializationDropdownReducer,
  SpecializationEditReducer,
  SpecializationPreviewReducer,
  SpecializationSaveReducer,
  SpecializationSearchReducer,
  PatientDropdownWithoutHospitalListReducer,
  UniversitiesForDropdownReducer,
  WeekdaysReducer,
  QualificationAliasDeleteReducer,
  QualificationAliasDropdownReducer,
  QualificationAliasEditReducer,
  QualificationAliasSaveReducer,
  QualificationAliasSearchReducer,
  ForgotPasswordVerification,
  CompanyProfileCreateReducer,
  CompanyProfileDeleteReducer,
  CompanyProfileDropdownReducer,
  CompanyProfileEditReducer,
  CompanyProfilePreviewReducer,
  CompanyProfileSearchReducer,
  companyDeleteReducer,
  companyDropdownReducer,
  companyPreviewReducer,
  companySaveReducer,
  companySearchReducer,
  companyUpdateReducer,
  CompanyAdminReducer,
  AppointmentDetailReducer
} from '../reducers'
const {
  ForgotPasswordReducer,
  VerificationCodeReducer,
  ChangePasswordForgotReducer
} = ForgotPasswordVerification
const {
  CompanyAdminDeleteReducer,
  CompanyAdminEditReducer,
  CompanyAdminListReducer,
  CompanyAdminPreviewReducer,
  CompanyAdminSetupReducer,
  CompanyAdminMetaInfoReducer
} = CompanyAdminReducer
export const rootReducers = combineReducers({
  AdminDeleteReducer,
  AdminEditReducer,
  AdminListReducer,
  AdminPreviewReducer,
  AdminSetupReducer,
  AppointmentApprovalListReducer,
  AppointmentLogListReducer,
  AppointmentRefundListReducer,
  AppointmentRefundReducer,
  AppointmentRefundRejectReducer,
  AppointmentStatusListReducer,
  AppointmentApproveReducer,
  AppointmentRejectReducer,
  companyDeleteReducer,
  companyDropdownReducer,
  companyPreviewReducer,
  companySaveReducer,
  companySearchReducer,
  companyUpdateReducer,
  CountryCodeDropdownReducer,
  ChangePasswordForgotReducer,
  DashboardAppointmentStatisticsReducer,
  DashboardRegisteredPatientReducer,
  DashboardRevenueGeneratedDayReducer,
  DashboardRevenueGeneratedMonthReducer,
  DashboardRevenueGeneratedWeekReducer,
  DashboardRevenueGeneratedYearReducer,
  DashboardRevenueStatisticsReducer,
  DashboardRevenueGeneratedByDoctorReducer,
  DashboardAppointmentQueueReducer,
  DepartmentDeleteReducer,
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
  DashboardFeaturesByAdminReducer,
  DashboardFeaturesReducer,
  DoctorSearchReducer,
  ForgotPasswordReducer,
  HospitalDeleteReducer,
  HospitalDropdownReducer,
  HospitalEditReducer,
  HospitalPreviewReducer,
  HospitalSaveReducer,
  HospitalSearchReducer,
  loggedInAdminInfoReducer,
  loginReducers: login,
  logoutReducer,
  PatientDetailReducer,
  PatientDropdownListReducer,
  PatientEditReducer,
  PatientPreviewReducer,
  PatientSearchReducer,
  ProfileDeleteReducer,
  ProfileEditReducer,
  ProfileListReducer,
  ProfilePreviewReducer,
  ProfileSetupReducer,
  QualificationDeleteReducer,
  QualificationDropdownReducer,
  QualificationEditReducer,
  QualificationPreviewReducer,
  QualificationSaveReducer,
  QualificationSearchReducer,
  RescheduleLogReducer,
  SpecializationDeleteReducer,
  SpecializationDropdownReducer,
  SpecializationEditReducer,
  SpecializationPreviewReducer,
  SpecializationSaveReducer,
  SpecializationSearchReducer,
  UniversitiesForDropdownReducer,
  PatientDropdownWithoutHospitalListReducer,
  VerificationCodeReducer,
  WeekdaysReducer,
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
  CompanyAdminDeleteReducer,
  CompanyAdminEditReducer,
  CompanyAdminListReducer,
  CompanyAdminPreviewReducer,
  CompanyAdminSetupReducer,
  CompanyAdminMetaInfoReducer,
  AppointmentDetailReducer,
  AppointmentRefundDetailReducer
})
